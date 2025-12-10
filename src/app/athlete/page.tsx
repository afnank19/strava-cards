import { MR } from "@/fonts";
import { formatDistance, formatMovingTime } from "@/utils/utils";
import { cookies } from "next/headers";

export default async function Athelete() {
  const cookieStore = await cookies();

  const athleteId = cookieStore.get("athlete_id");
  console.log("Athlete Id", athleteId);

  const accessToken = cookieStore.get("strava_token");
  console.log("acc", accessToken);

  const response = await fetch(`https://www.strava.com/api/v3/athlete/`, {
    headers: {
      Authorization: "Bearer " + accessToken?.value,
    },
  });

  const data = await response.json();
  console.log("Athlete data:", data);

  const athleteStatsResponse = await fetch(
    `https://www.strava.com/api/v3/athletes/${athleteId?.value}/stats`,
    {
      headers: {
        Authorization: "Bearer " + accessToken?.value,
      },
    }
  );
  const athleteStats = await athleteStatsResponse.json();

  console.log("athlete stats", athleteStats);

  return (
    <div className={"px-2 " + MR.className}>
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <p>{"Hey " + data.firstname + " " + data.lastname}</p>

          <div >
            <h1 className="text-2xl font-bold">All Time Stats</h1>
            <p className="text-lg font-bold mt-3">Ride Totals</p>
            <p className="text-lg font-medium italic">
              <span>{athleteStats.all_ride_totals.count + " "}</span>
              Rides
            </p>
            <p className="flex items-center justify-between">
              Total Ride Distance
              <span>
                {formatDistance(athleteStats.all_ride_totals.distance)} Km
              </span>
            </p>
            <p className="flex items-center justify-between">
              Elevation Gain
              <span>{athleteStats.all_ride_totals.elevation_gain.toFixed(1)} m</span>
            </p>
            <p className="flex items-center justify-between">
              Moving Time
              <span>
                {formatMovingTime(athleteStats.all_ride_totals.moving_time)}
              </span>
            </p>
            <p className="text-lg font-bold mt-3">Run Totals</p>
            <p className="text-lg font-medium italic">
              <span>{athleteStats.all_run_totals.count + " "}</span>
              Runs
            </p>
            <p className="flex items-center justify-between">
              Total Running Distance
              <span>
                {formatDistance(athleteStats.all_run_totals.distance)} Km
              </span>
            </p>
            <p className="flex items-center justify-between">
              Elevation Gain
              <span>{athleteStats.all_run_totals.elevation_gain.toFixed(1)} m</span>
            </p>
            <p className="flex items-center justify-between">
              Moving Time
              <span>
                {formatMovingTime(athleteStats.all_run_totals.moving_time)}
              </span>
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Last 4 weeks</h1>
            <p className="text-lg font-bold mt-3">Ride Totals</p>
            <p className="text-lg font-medium italic">
              <span>{athleteStats.recent_ride_totals.count + " "}</span>
              Rides
            </p>
            <p className="flex items-center justify-between">
              Total Ride Distance
              <span>
                {formatDistance(athleteStats.recent_ride_totals.distance)} Km
              </span>
            </p>
            <p className="flex items-center justify-between">
              Elevation Gain
              <span>{athleteStats.recent_ride_totals.elevation_gain.toFixed(1)} m</span>
            </p>
            <p className="flex items-center justify-between">
              Moving Time
              <span>
                {formatMovingTime(athleteStats.recent_ride_totals.moving_time)}
              </span>
            </p>
            <p className="text-lg font-bold mt-3">Run Totals</p>
            <p className="text-lg font-medium italic">
              <span>{athleteStats.recent_run_totals.count + " "}</span>
              Runs
            </p>
            <p className="flex items-center justify-between">
              Total Running Distance
              <span>
                {formatDistance(athleteStats.recent_run_totals.distance)} Km
              </span>
            </p>
            <p className="flex items-center justify-between">
              Elevation Gain
              <span>{athleteStats.recent_run_totals.elevation_gain.toFixed(1)} m</span>
            </p>
            <p className="flex items-center justify-between">
              Moving Time
              <span>
                {formatMovingTime(athleteStats.recent_run_totals.moving_time)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
