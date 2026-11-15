import fs from "node:fs";
import path from "node:path";

const fallback = {
  settings: { ratio: "9:16", fps: 30, resolution: 1080 },
  scenes: [
    { id: "scene-01", title: "قوة الفخامة", description: "حضور استثنائي يترك أثراً لا يُنسى", duration: 5 },
    { id: "scene-02", title: "تفاصيل تصنع الفرق", description: "جودة وأناقة في كل تفصيل", duration: 10 },
    { id: "scene-03", title: "كن مختلفاً", description: "اختر التميز واجعل لحظتك استثنائية", duration: 5 }
  ]
};

let project = fallback;
if (process.env.PROJECT_JSON?.trim()) {
  try { project = JSON.parse(process.env.PROJECT_JSON); }
  catch { throw new Error("PROJECT_JSON ليس JSON صالحاً. صدّر ملف المشروع من الاستوديو ثم انسخ محتواه كاملاً."); }
}

const settings = project.settings ?? fallback.settings;
if (!["9:16", "16:9", "1:1"].includes(settings.ratio)) throw new Error("نسبة الأبعاد غير مدعومة.");
if (![24, 30, 60].includes(Number(settings.fps))) throw new Error("معدل الإطارات يجب أن يكون 24 أو 30 أو 60.");
if (![720, 1080, 2160].includes(Number(settings.resolution))) throw new Error("الدقة يجب أن تكون 720 أو 1080 أو 2160.");
if (!Array.isArray(project.scenes) || project.scenes.length < 1 || project.scenes.length > 30) throw new Error("يجب أن يحتوي المشروع على مشهد واحد إلى 30 مشهداً.");

const scenes = project.scenes.map((scene, index) => {
  const title = String(scene.title ?? "").trim();
  const description = String(scene.description ?? "").trim();
  const duration = Number(scene.duration);
  if (!title || title.length > 90) throw new Error(`عنوان المشهد ${index + 1} فارغ أو طويل جداً.`);
  if (description.length > 400) throw new Error(`وصف المشهد ${index + 1} أطول من المسموح.`);
  if (!Number.isInteger(duration) || duration < 1 || duration > 60) throw new Error(`مدة المشهد ${index + 1} يجب أن تكون بين 1 و60 ثانية.`);
  return { id: String(scene.id ?? `scene-${index + 1}`), title, description, duration };
});
const clean = { settings: { ratio: settings.ratio, fps: Number(settings.fps), resolution: Number(settings.resolution) }, scenes };
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync(path.resolve("out/project-props.json"), JSON.stringify(clean, null, 2), "utf8");
console.log(`Validated ${scenes.length} scenes; total duration: ${scenes.reduce((sum, s) => sum + s.duration, 0)} seconds.`);
