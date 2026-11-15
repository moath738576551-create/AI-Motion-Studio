
import { Composition, registerRoot } from "remotion";
import { MainVideo } from "./MainVideo";
import { STUDIO_CONFIG } from "./config";
import { TOTAL_DURATION } from "./scenes";

const RemotionRoot = () => {

  return (
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={
        TOTAL_DURATION * STUDIO_CONFIG.fps
      }
      fps={STUDIO_CONFIG.fps}
      width={STUDIO_CONFIG.width}
      height={STUDIO_CONFIG.height}
    />
  );
};
registerRoot(RemotionRoot);
