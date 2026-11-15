import React, { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";

type CameraMoveProps = {
  children: ReactNode;
  durationInFrames: number;
  intensity?: number;
  direction?: "in" | "out" | "pan-left" | "pan-right";
};

export const CameraMove: React.FC<CameraMoveProps> = ({
  children,
  durationInFrames,
  intensity = 1,
  direction = "in",
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = direction === "out"
    ? 1.12 - progress * 0.12 * intensity
    : direction === "in"
      ? 1 + progress * 0.12 * intensity
      : 1.04;

  const translateX = direction === "pan-left"
    ? progress * -55 * intensity
    : direction === "pan-right"
      ? progress * 55 * intensity
      : 0;

  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
    transformOrigin: "center center",
    willChange: "transform",
  };

  return <div style={style}>{children}</div>;
};
