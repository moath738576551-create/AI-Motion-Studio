
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";

import { DEFAULT_SCENES } from "./scenes";
import { STUDIO_CONFIG } from "./config";

const Scene = ({
  title,
  description,
  duration,
}: {
  title: string;
  description: string;
  duration: number;
}) => {
  const frame = useCurrentFrame();
  const totalFrames = duration * STUDIO_CONFIG.fps;

  const opacity = interpolate(
    frame,
    [0, 20, totalFrames - 20, totalFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #080808, #242424, #000000)",
        color: "#D4AF37",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        direction: "rtl",
        fontFamily: "Arial",
        opacity,
        padding: 80,
      }}
    >
      <h1 style={{ fontSize: 75 }}>{title}</h1>
      <p style={{ fontSize: 38, color: "#FFFFFF" }}>
        {description}
      </p>
    </AbsoluteFill>
  );
};

export const MainVideo = () => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {DEFAULT_SCENES.map((scene) => {
        const from = startFrame;
        startFrame += scene.duration * STUDIO_CONFIG.fps;

        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.duration * STUDIO_CONFIG.fps}
          >
            <Scene
              title={scene.title}
              description={scene.description}
              duration={scene.duration}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
