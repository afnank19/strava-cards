import { DMmono, DMSans, MR, PublicSans } from "@/fonts";
import {
  formatDistance,
  formatDistanceFixed0,
  formatMovingTime,
} from "@/utils/utils";
import { cookies } from "next/headers";
import { FaBicycle } from "react-icons/fa6";
import { GiCycle } from "react-icons/gi";
import { PiBicycle, PiBicycleThin } from "react-icons/pi";

export default async function Athlete() {
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
    },
  );
  const athleteStats = await athleteStatsResponse.json();

  console.log("athlete stats", athleteStats);

  return (
    <div
      className={
        "min-h-screen flex flex-col items-center w-full " + DMmono.className
      }
    >
      <div className="flex flex-col max-w-4xl w-full border-l-2 border-r-2">
        <div className="flex flex-col text-xl px-2 py-2 bg-black text-white">
          <img src="/pbs.png" className="w-48 h-auto"></img>
        </div>

        <div className="flex gap-4 items-center text-4xl px-2 py-6">
          <img
            src={data.profile}
            className="w-24 h-auto rounded-full border-2 p-1 border-[#FF5722]"
          ></img>
          <div className={"flex flex-col " + DMSans.className}>
            <p>{data.firstname}</p>
            <p>{data.lastname}</p>
          </div>
        </div>

        {/* Top Sport and Days Active Section */}
        <div className="flex border-t-2">
          {/* Top Sport - Pink */}
          <div className="w-1/3 bg-[#FFB3E6] flex flex-col justify-center items-center border-b-2 border-r-2 p-2 px-3">
            <h2 className="text-base  mb-1">TOP SPORT</h2>
            <PiBicycleThin className="text-8xl" />
            {/*<div className="h-32"></div>*/}
          </div>

          {/* Days Active - Yellow */}
          <div className="flex-1 bg-[#E8FF00] flex flex-col justify-center items-end border-b-2 p-2 px-8">
            <h2 className="text-base  mb-1">RIDE COUNT</h2>
            <p className={"text-7xl " + DMSans.className}>
              {athleteStats?.all_ride_totals.count}
            </p>
          </div>
        </div>

        {/* Time Section - Orange */}
        <div className="bg-[#FF5722] flex items-center justify-between px-4  py-5 border-b-2">
          <div>
            <h2 className="text-base  mb-2">TIME</h2>
            <p className={"text-7xl " + DMSans.className}>
              {Math.floor(athleteStats?.all_ride_totals.moving_time / 3600)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base ">HRS</p>
          </div>
        </div>

        {/* Distance Section - Teal */}
        <div className="bg-[#3D6B7D] flex items-center justify-between px-4 py-5 text-white border-b-2 border-black">
          <div>
            <h2 className="text-base  mb-2">DISTANCE</h2>
            <p className={"text-7xl " + DMSans.className}>
              {formatDistanceFixed0(
                athleteStats?.all_ride_totals.distance,
              ).replace(" ", " ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base ">KM</p>
          </div>
        </div>

        {/* Elevation Section - Olive/Yellow-Green */}
        <div className="bg-[#C4D600] flex items-center justify-between px-4 py-5 border-b-2">
          <div>
            <h2 className="text-base  mb-2">ELEVATION</h2>
            <p className={"text-7xl " + DMSans.className}>
              {athleteStats?.all_ride_totals.elevation_gain
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base ">M</p>
          </div>
        </div>
      </div>
    </div>
  );
}
