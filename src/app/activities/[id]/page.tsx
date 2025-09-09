import StravaCard from "@/components/strava-card";
import { dmSans } from "@/fonts";
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
    <div className="px-2">
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <h1 className={dmSans.className + " font-bold text-xl"}>
            MY BROTHER
          </h1>
          <StravaCard run={run} />
        </div>
      </div>
    </div>
  );
}
