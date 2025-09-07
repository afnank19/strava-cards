import { cookies } from "next/headers";
import Link from "next/link";
import { dmSans, instrument } from "../fonts";

export default async function Home({ searchParams} : any) {
  const sp = await searchParams;
  let page = sp.page

  if (page == undefined) {
    page = 1;
  }
  console.log("current page", page, typeof(page))

  const cookieStore = await cookies()

  const accessToken = cookieStore.get("strava_token");
  console.log("acc", accessToken)

  const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=5`, {
    headers: {
      "Authorization": "Bearer " + accessToken?.value
    }
  })

  const data = await response.json()

  console.log(data[0]);

  return (
    <div className="">
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col gap-2">
          {data?.map((run: any, idx: number) => {
            return (
              <Link key={idx} href={`/activities/${run.id}`}>
                <div className="p-2 border">
                  <p className={dmSans.className + " font-bold"}>{run.name}</p>
                  <p>Distance: {(run.distance/1000).toFixed(1)}K</p>
                  <p>Avg Heart Rate: {run.average_heartrate} bpm</p>
                  <p>Time: {(run.moving_time / 60).toFixed(1)} min</p>
                </div>
              </Link>
            )
          })}
          <Link href={`/?page=${parseInt(page)+1}`}>Next Page</Link>
        </div>
      </div>
    </div>
  );
}
