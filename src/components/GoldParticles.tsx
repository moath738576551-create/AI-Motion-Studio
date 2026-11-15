import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type GoldParticlesProps = {
  count?: number;
  color?: string;
};

export const GoldParticles: React.FC<GoldParticlesProps> = ({
  count = 28,
  color = "#F5D477",
}) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const x = (index * 47 + 11) % 100;
        const baseY = (index * 61 + 19) % 100;
        const phase = index * 13;
        const travel = (frame * (0.35 + (index % 5) * 0.08) + phase) % 125;
        const y = (baseY - travel + 125) % 110;
        const opacity = interpolate(
          Math.sin((frame + phase) / 16),
          [-1, 1],
          [0.12, 0.82]
        );
        const size = 2 + (index % 4) * 1.5;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              boxShadow: `0 0 12px ${color}`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};
