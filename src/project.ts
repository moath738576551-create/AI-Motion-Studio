export type StudioScene = {
  id: string;
  title: string;
  description: string;
  duration: number;
};

export type StudioProjectProps = {
  settings: {
    ratio: "9:16" | "16:9" | "1:1";
    fps: 24 | 30 | 60;
    resolution: 720 | 1080 | 2160;
  };
  scenes: StudioScene[];
};

export const DEFAULT_PROJECT: StudioProjectProps = {
  settings: { ratio: "9:16", fps: 30, resolution: 1080 },
  scenes: [
    { id: "scene-01", title: "قوة الفخامة", description: "حضور استثنائي يترك أثراً لا يُنسى", duration: 5 },
    { id: "scene-02", title: "تفاصيل تصنع الفرق", description: "جودة وأناقة في كل تفصيل", duration: 10 },
    { id: "scene-03", title: "كن مختلفاً", description: "اختر التميز واجعل لحظتك استثنائية", duration: 5 },
  ],
};

export const getVideoDimensions = (ratio: StudioProjectProps["settings"]["ratio"], resolution: number) => {
  if (ratio === "16:9") return { width: Math.round(resolution * 16 / 9), height: resolution };
  if (ratio === "1:1") return { width: resolution, height: resolution };
  return { width: resolution, height: Math.round(resolution * 16 / 9) };
};
