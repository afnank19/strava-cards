import React from "react";
import { StatCardProps } from "./stat-card";
import { JBMono } from "@/fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";

const MinimalCard = ({ cardStyle, run, cardRef }: StatCardProps) => {
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
        className="border-2  p-2"
        style={{ borderColor: cardStyle.borderColor }}
      >
        <p className="text-xl font-bold mb-4">{run.name.toUpperCase()}</p>
        <div className="my-2 flex gap-12">
            <div>
                <p style={{ color: cardStyle.labelColor }}>DIST</p>
                <p className="text-xl font-bold">{formatDistance(run.distance)}K</p>
            </div>
            <div>
                <p style={{ color: cardStyle.labelColor }}>PACE</p>
                <p className="text-xl font-bold">{formatPace(run.average_speed)}</p>
            </div>
            <div>
                <p style={{ color: cardStyle.labelColor }}>TIME</p>
                <p className="text-xl font-bold">{formatMovingTime(run.moving_time)}</p>
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
