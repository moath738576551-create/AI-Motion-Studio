import { Composition, registerRoot } from "remotion";
import { MainVideo } from "./MainVideo";
import { DEFAULT_PROJECT, getVideoDimensions } from "./project";

const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="MainVideo"
      component={MainVideo}
      defaultProps={DEFAULT_PROJECT}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={({ props }) => {
        const fps = props.settings.fps;
        const durationInFrames = props.scenes.reduce((sum, scene) => sum + scene.duration, 0) * fps;
        const dimensions = getVideoDimensions(props.settings.ratio, props.settings.resolution);
        return { durationInFrames, fps, ...dimensions };
      }}
    />
  </>
);

registerRoot(RemotionRoot);
