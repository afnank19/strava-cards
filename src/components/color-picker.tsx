import { ColorResult, Compact } from "@uiw/react-color";
import React from "react";

const colorPalette = [
  // Blacks / dark greys
  "#000000",
  "#212121",
  "#424242",
  "#616161",
  "#757575",

  // Greys / whites
  "#9E9E9E",
  "#BDBDBD",
  "#E0E0E0",
  "#F5F5F5",
  "#FFFFFF",

  // Accent colors
  "#EE0000", // Red
  "#FB8C00", // Orange
  "#ffd000", // Yellow
  "#00DD00", // Green
  "#00897B", // Teal
  "#00c8ff", // Blue
  "#3949AB", // Indigo
  "#8E24AA", // Purple
  "#D81B60", // Pink
];

type ColorPickerProps = {
  label: string;
  colors: string[];
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  value,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p className="font-medium">{label}</p>
      <Compact
        style={{
          border: "1px solid",
          borderRadius: "0",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "white",
        }}
        colors={colorPalette}
        color={value}
        onChange={(color: ColorResult) => onChange(color.hex)}
        rectProps={{
          style: { borderRadius: 0 },
        }}
      />
    </div>
  );
};

export default ColorPicker;
