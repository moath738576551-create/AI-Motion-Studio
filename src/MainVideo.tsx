import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";

import { DEFAULT_SCENES } from "./scenes";
import { STUDIO_CONFIG } from "./config";
import { CameraMove, GoldParticles, AnimatedArabicText } from "./components";

const Scene: React.FC<{
  title: string;
  description: string;
  duration: number;
}> = ({ title, description, duration }) => {
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

  const glow = interpolate(frame, [0, 30, 60], [0.2, 1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 42%, #30230d 0%, #100d08 48%, #000000 100%)",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        direction: "rtl",
        fontFamily: "Arial, sans-serif",
        opacity,
        padding: 70,
        overflow: "hidden",
      }}
    >
      <CameraMove durationInFrames={totalFrames} intensity={0.75}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
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

          <GoldParticles count={30} />

          <div
            style={{
              position: "absolute",
              top: "22%",
              width: "82%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.75), transparent)",
              boxShadow: "0 0 22px rgba(212,175,55,0.5)",
            }}
          />

          <AnimatedArabicText
            text={title}
            fontSize={76}
            color="#D4AF37"
            durationInFrames={36}
          />

          <div
            style={{
              color: "#FFFFFF",
              fontSize: 38,
              marginTop: 35,
              opacity: glow,
              maxWidth: "88%",
              lineHeight: 1.7,
              textShadow: "0 3px 18px rgba(0,0,0,0.8)",
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
      </CameraMove>
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => {
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
