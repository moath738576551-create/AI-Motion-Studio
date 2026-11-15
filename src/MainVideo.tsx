 
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
    [0, 25, totalFrames - 25, totalFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const titleY = interpolate(
    frame,
    [0, 35],
    [100, 0],
    {
      extrapolateRight: "clamp",
    }
  );

  const glow = interpolate(
    frame,
    [0, 30, 60],
    [0.2, 1, 0.7],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #30230d 0%, #100d08 45%, #000000 100%)",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        direction: "rtl",
        fontFamily: "Arial",
        opacity,
        padding: 70,
      }}
    >
      <AbsoluteFill
        style={{
          border: "2px solid rgba(212,175,55,0.35)",
          margin: 35,
          boxShadow: `inset 0 0 80px rgba(212,175,55,${glow * 0.15})`,
        }}
      />

      <div
        style={{
          color: "#D4AF37",
          fontSize: 76,
          fontWeight: "bold",
          transform: `translateY(${titleY}px)`,
          textShadow: `0 0 ${30 * glow}px rgba(212,175,55,0.8)`,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#FFFFFF",
          fontSize: 38,
          marginTop: 35,
          opacity: glow,
        }}
      >
        {description}
      </div>

      <div
        style={{
          width: 180,
          height: 3,
          background: "#D4AF37",
          marginTop: 45,
          boxShadow: "0 0 20px #D4AF37",
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
        startFrame += scene.duration * STUDIO_CONFIG.fps;

        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={
              scene.duration * STUDIO_CONFIG.fps
            }
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
