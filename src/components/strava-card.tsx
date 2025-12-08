"use client";

import { JBMono } from "@/fonts";
import { formatDistance, formatMovingTime, formatPace } from "@/utils/utils";
import React, { useRef, useState } from "react";
import themes, { CardStyles, GruvBox, JetBlack, Nord, PastelGreen, RosePine } from "@/themes";
import ColorPicker from "./color-picker";
import html2canvas from "html2canvas";
import StatCard from "./stat-card";
import MinimalCard from "./minimal-card";

//  shadow-[3px_3px_0px_rgba(0,0,0,0.4)]
const StravaCard = ({ run }: any) => {
  const [cardStyle, setCardStyle] = useState<CardStyles>(JetBlack);
  const [isMinimal, setIsMinimal] = useState<Boolean>(false);

  const cardRef = useRef(null);

  console.count("render");

  const handleCapture = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, { allowTaint: true, backgroundColor: null });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "screenshot.png";
    link.click();
  };

  return (
    <div className={JBMono.className}>
      <div className="flex gap-4 my-2">
        <p className="font-medium ">CARD TYPE:</p>
        <button
          onClick={() => {
            setIsMinimal(false);
          }}
          className="border px-2 hover:bg-black hover:text-white cursor-pointer"
        >
          {isMinimal ? null : "*"}DETAILED
        </button>
        <button
          onClick={() => {
            setIsMinimal(true);
          }}
          className="border px-2 hover:bg-black hover:text-white cursor-pointer"
        >
          {isMinimal ? "*" : null}MINIMAL
        </button>
      </div>

      {isMinimal ? (
        <MinimalCard cardRef={cardRef} cardStyle={cardStyle} run={run} />
      ) : (
        <StatCard cardRef={cardRef} cardStyle={cardStyle} run={run} />
      )}

      <div className="my-4 flex justify-between">
        <div>
          <label className="mr-2 font-medium">THEME =</label>
          <select
            onChange={(e) => {
              const selectedTheme = themes.find(
                (t) => t.name === e.target.value
              );
              if (selectedTheme) {
                setCardStyle(selectedTheme.theme);
              }
            }}
          >
            {themes.map((theme, idx) => {
              return <option key={idx}>{theme.name}</option>;
            })}
          </select>
        </div>

        <button
          onClick={handleCapture}
          className="w-fit m-1 px-2 bg-orange-500 text-white border border-black hover:bg-black font-bold  shadow-[3px_3px_0px_rgba(0,0,0,0.4)]"
        >
          DOWNLOAD
        </button>
      </div>

      <ColorPicker
        label="TEXT COLOR"
        value={cardStyle.textColor}
        colors={["#000", "#fff", "#f00"]}
        onChange={(newColor) =>
          setCardStyle((prev) => ({ ...prev, textColor: newColor }))
        }
      />
      <ColorPicker
        label="LABEL COLOR"
        value={cardStyle.labelColor}
        colors={["#000", "#fff", "#f00"]}
        onChange={(newColor) =>
          setCardStyle((prev) => ({ ...prev, labelColor: newColor }))
        }
      />
      <ColorPicker
        label="BORDER COLOR"
        value={cardStyle.borderColor}
        colors={["#000", "#fff", "#f00"]}
        onChange={(newColor) =>
          setCardStyle((prev) => ({ ...prev, borderColor: newColor }))
        }
      />
      <ColorPicker
        label="BG COLOR"
        value={cardStyle.bgColor}
        colors={["#000", "#fff", "#f00"]}
        onChange={(newColor) =>
          setCardStyle((prev) => ({ ...prev, bgColor: newColor }))
        }
      />
    </div>
  );
};

export default StravaCard;
