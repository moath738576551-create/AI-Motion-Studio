
export const DEFAULT_SCENES = [
  {
    id: "scene-01",
    title: "المشهد الافتتاحي",
    duration: 5,
    description: "مقدمة سينمائية جذابة",
  },
  {
    id: "scene-02",
    title: "المشهد الرئيسي",
    duration: 10,
    description: "عرض الفكرة أو المنتج",
  },
  {
    id: "scene-03",
    title: "المشهد الختامي",
    duration: 5,
    description: "الخاتمة والشعار",
  },
];

export const TOTAL_DURATION = DEFAULT_SCENES.reduce(
  (total, scene) => total + scene.duration,
  0
);
