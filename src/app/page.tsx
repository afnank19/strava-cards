import { cookies } from "next/headers";
import Link from "next/link";
import { dmSans, instrument, JBMono } from "../fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";

const PER_PAGE = 15;

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
    <div className="px-2">
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <h1 className={dmSans.className + " font-bold text-xl"}>
            ACTIVITIES
          </h1>
          {data?.map((run: any, idx: number) => {
            return (
              // <Link key={idx} href={`/activities/${run.id}`}>
              <div
                key={idx}
                className={`border border-dashed ${JBMono.className}`}
              >
                <p
                  className={
                    dmSans.className +
                    " font-bold text-lg border-b border-dashed px-2 mb-2 bg-neutral-100"
                  }
                >
                  {run.name}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 p-2">
                  <div className="">
                    <p>DISTANCE = {formatDistance(run.distance)}K</p>
                    <p>PACE = {formatPace(run.average_speed)}</p>
                  </div>
                  <div className="">
                    <p>TIME = {formatMovingTime(run.moving_time)}</p>
                    <p>ELAPSED TIME = {formatMovingTime(run.elapsed_time)}</p>
                  </div>
                </div>
                <div className="w-fit m-1 bg-orange-500 text-white border hover:bg-black font-bold">
                  <Link href={`/activities/${run.id}`} className="px-2">DETAILS</Link>
                </div>
              </div>
              // </Link>
            );
          })}
          <div className="flex justify-between mt-4">
            {page > 1 && (
              <Link href={`/?page=${page - 1}`} className="px-3 py-1 border">
                Previous
              </Link>
            )}
            {data.length > 0 && (
              <Link href={`/?page=${page + 1}`} className="px-3 py-1 border">
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
