import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { STUDIO_CONFIG } from "./config";
import { CameraMove, GoldParticles, AnimatedArabicText } from "./components";
import type { StudioProjectProps, StudioScene } from "./project";

const Scene: React.FC<StudioScene & { fps: number }> = ({ title, description, duration, fps }) => {
  const frame = useCurrentFrame();
  const totalFrames = duration * fps;
  const fadeFrames = Math.min(25, Math.max(1, Math.floor(totalFrames / 4)));
  const opacity = interpolate(frame, [0, fadeFrames, totalFrames - fadeFrames, totalFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = interpolate(frame, [0, Math.min(30, totalFrames), totalFrames], [0.25, 1, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 42%, #30230d 0%, #100d08 48%, #000 100%)",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      direction: "rtl", fontFamily: "Arial, sans-serif", opacity, padding: 70, overflow: "hidden",
    }}>
      <CameraMove durationInFrames={totalFrames} intensity={0.75}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70 }}>
          <AbsoluteFill style={{ border: "2px solid rgba(212,175,55,0.35)", margin: 35,
            boxShadow: `inset 0 0 80px rgba(212,175,55,${glow * 0.15})` }} />
          <GoldParticles count={30} />
          <div style={{ position: "absolute", top: "22%", width: "82%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.75), transparent)",
            boxShadow: "0 0 22px rgba(212,175,55,0.5)" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "90%" }}>
            <AnimatedArabicText text={title} fontSize={76} color="#D4AF37" durationInFrames={Math.min(36, totalFrames)} />
            <div style={{ color: "#fff", fontSize: 38, marginTop: 35, opacity: glow, maxWidth: "88%",
              lineHeight: 1.7, textShadow: "0 3px 18px rgba(0,0,0,0.8)" }}>{description}</div>
            <div style={{ width: 180, height: 3, background: "#D4AF37", marginTop: 45,
              boxShadow: "0 0 20px #D4AF37" }} />
          </div>
        </AbsoluteFill>
      </CameraMove>
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC<StudioProjectProps> = ({ scenes, settings }) => {
  let startFrame = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {scenes.map((scene) => {
        const from = startFrame;
        const durationInFrames = scene.duration * settings.fps;
        startFrame += durationInFrames;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <Scene {...scene} fps={settings.fps} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
