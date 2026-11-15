export type StudioTemplate = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  aspectRatio: "vertical" | "horizontal" | "square";
  category: "advertising" | "story" | "motion";
  status: "ready" | "planned";
};

export const TEMPLATE_REGISTRY: StudioTemplate[] = [
  {
    id: "luxury-product-ad",
    name: "إعلان منتج فاخر",
    nameEn: "Luxury Product Ad",
    description: "مشاهد سينمائية بإضاءة ذهبية وحركة كاميرا ناعمة.",
    aspectRatio: "vertical",
    category: "advertising",
    status: "ready",
  },
  {
    id: "brand-reveal",
    name: "كشف الشعار والهوية",
    nameEn: "Brand Reveal",
    description: "مقدمة أنيقة للشعارات والهويات التجارية.",
    aspectRatio: "horizontal",
    category: "motion",
    status: "planned",
  },
  {
    id: "animated-story",
    name: "قصة كرتونية",
    nameEn: "Animated Story",
    description: "قالب قصصي متعدد المشاهد للشخصيات والحوار.",
    aspectRatio: "vertical",
    category: "story",
    status: "planned",
  },
  {
    id: "arabic-explainer",
    name: "شرح وموشن جرافيك عربي",
    nameEn: "Arabic Explainer",
    description: "نصوص وعناوين وعناصر توضيحية باللغة العربية.",
    aspectRatio: "horizontal",
    category: "motion",
    status: "planned",
  },
];
