"use client";

import { JBMono } from "@/fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";
import React, { useState } from "react";
import ColorPalette from "./color-palette";
import { Compact } from "@uiw/react-color";
import themes, { CardStyles, GruvBox, RosePine } from "@/themes";


const StravaCard = ({ run }: any) => {
  const [cardStyle, setCardStyle] = useState<CardStyles>(GruvBox);

  console.count("render");

  return (
    <div className={JBMono.className}>
      <div
        className={
          JBMono.className + " p-2 shadow-[3px_3px_0px_rgba(0,0,0,0.4)] "
        }
        style={{
          backgroundColor: cardStyle.bgColor,
          color: cardStyle.textColor,
        }}
      >
        <div
          className="border-2 border-dashed p-2"
          style={{ borderColor: cardStyle.borderColor }}
        >
          <p className="text-xl font-bold mb-4" >{run.name.toUpperCase()}</p>
          <div className="my-2">
            <p style={{ color: cardStyle.labelColor }}>DISTANCE</p>
            <p className="text-5xl font-bold">
              {formatDistance(run.distance)}K
            </p>
          </div>
          <div className="mt-6">
            <p
              className="border-2 border-b-0 text-center font-medium"
              style={{ borderColor: cardStyle.borderColor, color: cardStyle.labelColor }}
            >
              STATISTICS
            </p>
            <div className="grid grid-cols-2 font-medium">
              <div
                className="border-2 border-r-0 p-1"
                style={{ borderColor: cardStyle.borderColor, color: cardStyle.labelColor }}
              >
                <p>PACE</p>
                <p>MOVING TIME</p>
                <p>ELAPSED TIME</p>
                <p>ELEVATION GAIN</p>
                <p>AVG HEARTRATE</p>
              </div>
              <div
                className="border-2 border-l-0 p-1"
                style={{ borderColor: cardStyle.borderColor }}
              >
                <p>{formatPace(run.average_speed)}</p>
                <p>{formatMovingTime(run.moving_time)}</p>
                <p>{formatMovingTime(run.elapsed_time)}</p>
                <p>{run.total_elevation_gain} meters</p>
                <p>{run.average_heartrate.toFixed(0)} BPM</p>
              </div>
            </div>
          </div>
          {/* <div className="my-1">
            <ColorPalette />
          </div> */}
        </div>
      </div>

      <div className="flex items-center justify-center m-2">
        <Compact
          style={{
            border: "1px solid",
            borderRadius: "0",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "white"
          }}
          colors={["#000", "#fff", "#f00"]}
          color={cardStyle.bgColor}
          onChange={(color) => {
            console.log("new color", color.hex);
            setCardStyle((prev) => ({ ...prev, bgColor: color.hex }));
          }}
          rectProps={{
            style: { borderRadius: 0 } // ⬅️ removes rounded corners
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>
          THEME
          <select>
            <option disabled>THEME</option>
            {themes.map((theme) => {
              return (
                <option onClick={() => setCardStyle(theme.theme)}>{theme.name}</option>
              )
            })}
          </select>
        </label>
      </div>
    </div>
  );
};

export default StravaCard;
