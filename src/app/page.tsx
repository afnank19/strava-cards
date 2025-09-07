import { cookies } from "next/headers";
import Link from "next/link";
import { dmSans, instrument } from "../fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";

const PER_PAGE = 5;

export default async function Home({ searchParams }: any) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1) || 1;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("strava_token");
  console.log("acc", accessToken);

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${PER_PAGE}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken?.value,
      },
    }
  );

  const data = await response.json();

  console.log(data[0]);

  return (
    <div className="">
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col gap-2">
          {data?.map((run: any, idx: number) => {
            return (
              <Link key={idx} href={`/activities/${run.id}`}>
                <div className={`p-2 border ${instrument.className} text-xl`}>
                  <p className={dmSans.className + " font-bold text-base"}>{run.name}</p>
                  <div className="flex gap-4">
                    <p>{formatDistance(run.distance)}K</p>
                    {/* <p>Avg Heart Rate: {(run.average_heartrate).toFixed(0)} bpm</p> */}
                    <p>{formatMovingTime(run.moving_time)}</p>
                    <p>{formatPace(run.average_speed)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="flex justify-between mt-4">
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="px-3 py-1 border rounded"
              >
                Previous
              </Link>
            )}
            {data.length > 0 && (
              <Link
                href={`/?page=${page + 1}`}
                className="px-3 py-1 border rounded"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
