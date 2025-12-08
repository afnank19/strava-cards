import React from "react";
import { StatCardProps } from "./stat-card";
import { DMSans, JBMono, MR } from "@/fonts";
import { formatDistance, formatMovingTime, formatPace, formatRideSpeed } from "@/utils/utils";
import { SiNike } from "react-icons/si";

const MinimalCard = ({ cardStyle, run, cardRef }: StatCardProps) => {
  return (
    <div
      ref={cardRef}
      className={MR.className + " p-2 rounded-2xl relative overflow-hidden"}
      style={{
        backgroundColor: cardStyle.bgColor,
        color: cardStyle.textColor,
      }}
    >
      <div className="w-52 h-52   absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          backgroundColor: cardStyle.borderColor,
      }}
      ></div>
      <div
        className="relative rounded-xl p-2 z-10"
        style={{ borderColor: cardStyle.borderColor }}
      >
        <p className="text-xl font-bold  mb-4 flex items-center gap-2 justify-between">
          {run.name}
          <SiNike fontSize={"2rem"}/>
        </p>
        <div className="my-2 flex gap-12">
            <div>
                <p style={{ color: cardStyle.labelColor }}>Dist</p>
                <p className="text-md font-bold">{formatDistance(run.distance)} Km</p>
            </div>
            <div>
                <p style={{ color: cardStyle.labelColor }}>{run.sport_type === "Ride" ? "Avg Speed" : "Pace" }</p>
                <p className="text-md font-bold">{run.sport_type === "Ride" ? formatRideSpeed(run.average_speed) :  formatPace(run.average_speed)}</p>
            </div>
            <div>
                <p style={{ color: cardStyle.labelColor }}>Time</p>
                <p className="text-md font-bold">{formatMovingTime(run.moving_time)}</p>
            </div>
        </div>
        {/* <div className="my-1">
                    <ColorPalette />
                  </div> */}
      </div>
    </div>
  );
};

export default MinimalCard;
