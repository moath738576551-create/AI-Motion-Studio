import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

type AnimatedArabicTextProps = {
  text: string;
  startFrame?: number;
  durationInFrames?: number;
  fontSize?: number;
  color?: string;
};

export const AnimatedArabicText: React.FC<AnimatedArabicTextProps> = ({
  text,
  startFrame = 0,
  durationInFrames = 24,
  fontSize = 76,
  color = "#F5D477",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  const opacity = interpolate(
    localFrame,
    [0, durationInFrames * 0.65, durationInFrames],
    [0, 1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const translateY = interpolate(
    localFrame,
    [0, durationInFrames],
    [48, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      dir="rtl"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        color,
        fontSize,
        fontWeight: 800,
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.5,
        textShadow: "0 4px 28px rgba(245, 212, 119, 0.28)",
      }}
    >
      {text}
    </div>
  );
};
