import { cookies } from "next/headers";

interface ActivityPageProps {
  params: { id: string }; // 👈 id comes from folder name
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("strava_token");
  console.log("getting activity by id with", accessToken, id)

  const response = await fetch(`https://www.strava.com/api/v3/activities/${id}?include_all_efforts=true`, {
    headers: {
      "Authorization": "Bearer " + accessToken?.value
    }
  })

  if (!response.ok) {
    console.log(response.status);

    return <div>Could not find activity</div>
  }

  const run = await response.json()

  console.log(run);

  return (
    <div className="p-6">
      <p>Activity ID hahah</p>
          <div className="p-2">
            <p>Name: {run.name}</p>
            <p>Distance: {(run.distance/1000).toFixed(1)}K</p>
            <p>Avg Heart Rate: {run.average_heartrate} bpm</p>
          </div>
    </div>
  );
}
