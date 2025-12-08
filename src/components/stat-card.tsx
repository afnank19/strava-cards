import { JBMono } from "@/fonts";
import { CardStyles } from "@/themes";
import { formatDistance, formatMovingTime, formatPace, formatRideSpeed } from "@/utils/utils";
import { Ref } from "react";

export type StatCardProps = {
  cardStyle: CardStyles;
  run: any;
  cardRef: Ref<HTMLDivElement>;
};

const StatCard = ({ cardStyle, run, cardRef }: StatCardProps) => {
  return (
    <div
      ref={cardRef}
      className={JBMono.className + " p-2 "}
      style={{
        backgroundColor: cardStyle.bgColor,
        color: cardStyle.textColor,
      }}
    >
      <div
        className="border-2 border-dashed p-2"
        style={{ borderColor: cardStyle.borderColor }}
      >
        <p className="text-xl font-bold mb-4">{run.name.toUpperCase()}</p>
        <div className="my-2">
          <p style={{ color: cardStyle.labelColor }}>DISTANCE</p>
          <p className="text-5xl font-bold">{formatDistance(run.distance)}K</p>
        </div>
        <div className="mt-6">
          <p
            className="border-2 border-b-0 text-center font-medium"
            style={{
              borderColor: cardStyle.borderColor,
              backgroundColor: cardStyle.labelColor,
              color: cardStyle.bgColor,
            }}
          >
            STATISTICS
          </p>
          <div className="grid grid-cols-2 font-medium">
            <div
              className="border-2 border-r-0 p-1"
              style={{
                borderColor: cardStyle.borderColor,
                color: cardStyle.labelColor,
              }}
            >
              <p>{run.sport_type === "Ride" ? "AVG SPEED" : "PACE" }</p>
              <p>MOVING TIME</p>
              <p>ELAPSED TIME</p>
              <p>ELEVATION GAIN</p>
              <p>AVG HEARTRATE</p>
            </div>
            <div
              className="border-2 border-l-0 p-1"
              style={{ borderColor: cardStyle.borderColor }}
            >
              <p>{run.sport_type === "Ride" ? formatRideSpeed(run.average_speed) :  formatPace(run.average_speed)}</p>
              <p>{formatMovingTime(run.moving_time)}</p>
              <p>{formatMovingTime(run.elapsed_time)}</p>
              <p>{run.total_elevation_gain} meters</p>
              <p>{run.average_heartrate?.toFixed(0)} BPM</p>
            </div>
          </div>
        </div>
        {/* <div className="my-1">
                <ColorPalette />
              </div> */}
      </div>
    </div>
  );
};

export default StatCard;
