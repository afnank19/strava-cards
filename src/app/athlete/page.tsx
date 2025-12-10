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
    <div className="px-2">
      <div className="flex flex-col items-center w-full py-2">
        <div className="max-w-3xl w-full flex flex-col">
          <p>{"Hey " + data.firstname + " " + data.lastname}</p>
          <h1>All Time</h1>
          <p>Ride Totals</p>
          <p>Rides: {athleteStats.all_ride_totals.count}</p>
          <p>
            Total Ride Distance:{" "}
            {formatDistance(athleteStats.all_ride_totals.distance)} Km
          </p>
          <p>Elevation Gain: {athleteStats.all_ride_totals.elevation_gain} m</p>
          <p>
            Moving Time:{" "}
            {formatMovingTime(athleteStats.all_ride_totals.moving_time)}
          </p>

          <p>Run Totals</p>
          <p>Runs: {athleteStats.all_run_totals.count}</p>
          <p>
            Total Running Distance:{" "}
            {formatDistance(athleteStats.all_run_totals.distance)} Km
          </p>
          <p>Elevation Gain: {athleteStats.all_run_totals.elevation_gain} m</p>
          <p>
            Moving Time:{" "}
            {formatMovingTime(athleteStats.all_run_totals.moving_time)}
          </p>

          <h1>Last 4 weeks</h1>
          <p>Ride Totals</p>
          <p>Rides: {athleteStats.recent_ride_totals.count}</p>
          <p>
            Total Ride Distance:{" "}
            {formatDistance(athleteStats.recent_ride_totals.distance)} Km
          </p>
          <p>Elevation Gain: {athleteStats.recent_ride_totals.elevation_gain} m</p>
          <p>
            Moving Time:{" "}
            {formatMovingTime(athleteStats.recent_ride_totals.moving_time)}
          </p>

          <p>Run Totals</p>
          <p>Runs: {athleteStats.recent_run_totals.count}</p>
          <p>
            Total Running Distance:{" "}
            {formatDistance(athleteStats.recent_run_totals.distance)} Km
          </p>
          <p>Elevation Gain: {athleteStats.recent_run_totals.elevation_gain} m</p>
          <p>
            Moving Time:{" "}
            {formatMovingTime(athleteStats.recent_run_totals.moving_time)}
          </p>
        </div>
      </div>
    </div>
  );
}
