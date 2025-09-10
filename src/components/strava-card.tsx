"use client";

import { JBMono } from "@/fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";
import React, { useState } from "react";
import ColorPalette from "./color-palette";

const StravaCard = ({ run }: any) => {
  return (
    <div className={JBMono.className + " bg-red-600 text-white p-2 shadow-[3px_3px_0px_rgba(0,0,0,0.4)]"}>
      <div className="border-2 border-dashed border-white p-2">
        <p className="text-xl font-bold mb-4">{run.name.toUpperCase()}</p>
        <div className="my-2">
          <p>DISTANCE</p>
          <p className="text-5xl font-bold">{formatDistance(run.distance)}K</p>
        </div>
        <div className="mt-6">
          <p className="border-2 border-b-0 text-center font-medium">STATISTICS</p>
          <div className="grid grid-cols-2 font-medium">
            <div className="border-2 border-r-0 p-1">
              <p>PACE</p>
              <p>MOVING TIME</p>
              <p>ELAPSED TIME</p>
              <p>ELEVATION GAIN</p>
              <p>AVG HEARTRATE</p>
            </div>
            <div className="border-2 border-l-0 p-1">
              <p >{formatPace(run.average_speed)}</p>
              <p >{formatMovingTime(run.moving_time)}</p>
              <p >{formatMovingTime(run.elapsed_time)}</p>
              <p >{run.total_elevation_gain} meters</p>
              <p >{(run.average_heartrate).toFixed(0)} BPM</p>
            </div>
          </div>
        </div>
        <div className="my-1">
          <ColorPalette />
        </div>
      </div>
    </div>
  );
};

export default StravaCard;
