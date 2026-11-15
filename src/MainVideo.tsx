
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";

import { DEFAULT_SCENES } from "./scenes";

const Scene = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 20, 120, 150],
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
      <div
        style={{
          width: 180,
          height: 5,
          background: "#D4AF37",
          marginTop: 35,
        }}
      />
    </AbsoluteFill>
  );
};

export const MainVideo = () => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {DEFAULT_SCENES.map((scene) => {
        const from = startFrame;
        startFrame += scene.duration * 30;

        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.duration * 30}
          >
            <Scene
              title={scene.title}
              description={scene.description}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
