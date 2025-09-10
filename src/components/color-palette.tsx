"use client"
import React from "react";

export default function ColorPalette() {
  const colors = [
    "#F59E0B", // amber
    "#B45309", // brownish
    "#DC2626", // red
    "#9333EA", // purple
    "#3B82F6", // blue
    "#047857", // green
    "#111827", // black
    "#FACC15", // yellow
    "#0EA5E9", // cyan
    "#EC4899", // magenta/pink
    "#6B7280", // gray
    "#9CA3AF", // light gray
    "#F3F4F6", // almost white
  ];

  return (
    <div className="flex items-center border border-gray-700">
      {colors.map((col, i) => (
        <div
          key={i}
          className="h-5 w-8 border border-white"
          style={{ backgroundColor: col }}
          title={col}
        />
      ))}
    </div>
  );
}
