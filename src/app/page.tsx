import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("strava_token");
  console.log("acc", accessToken)

  const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {
      "Authorization": "Bearer " + accessToken?.value
    }
  })

  const data = await response.json()

  console.log(data[0]);

  return (
    <div className="p-6">
      <p>Home as hell rn</p>
      {data?.map((run: any, idx: number) => {
        return (
          <Link key={idx} href={`/activities/${run.id}`}>
          <div className="p-2">
            <p>id: {run.id}</p>
            <p>Name: {run.name}</p>
            <p>Distance: {(run.distance/1000).toFixed(1)}K</p>
            <p>Avg Heart Rate: {run.average_heartrate} bpm</p>
          </div>
          </Link>
        )
      })}
    </div>
  );
}
