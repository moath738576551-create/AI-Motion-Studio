import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from "remotion";
import { GoldParticles, AnimatedArabicText } from "./components";
import type { StudioProjectProps, StudioScene } from "./project";

const Bottle: React.FC<{ frame: number }> = ({ frame }) => {
  const y = Math.sin(frame / 13) * 13;
  const turn = Math.sin(frame / 28) * 3;
  const scale = interpolate(frame, [0, 45, 150, 300, 450], [0.72, 1, 1.08, 1, 0.92], { extrapolateRight: "clamp" });
  return <div style={{ transform: `translateY(${y}px) rotate(${turn}deg) scale(${scale})`, filter: "drop-shadow(0 35px 30px rgba(0,0,0,.55))" }}>
    <svg width="440" height="790" viewBox="0 0 440 790">
      <defs>
        <linearGradient id="body" x1="0" x2="1"><stop stopColor="#f3e68b"/><stop offset=".14" stopColor="#10bfa5"/><stop offset=".82" stopColor="#00a98f"/><stop offset="1" stopColor="#e9d978"/></linearGradient>
        <linearGradient id="shine" x1="0" x2="1"><stop stopColor="#fff" stopOpacity=".65"/><stop offset=".3" stopColor="#fff" stopOpacity="0"/><stop offset=".8" stopColor="#fff" stopOpacity=".22"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
        <linearGradient id="label" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#11c7aa"/><stop offset="1" stopColor="#009d87"/></linearGradient>
      </defs>
      <ellipse cx="220" cy="754" rx="130" ry="20" fill="#00d7bd" opacity=".24"/>
      <path d="M150 34 Q150 14 170 14 H270 Q290 14 290 34 L302 125 Q340 150 346 214 L365 690 Q367 742 325 748 H115 Q73 742 75 690 L94 214 Q100 150 138 125Z" fill="url(#body)" stroke="#e9d979" strokeWidth="5"/>
      <path d="M155 38 Q155 15 175 15 H265 Q285 15 285 38 L292 120 H148Z" fill="#101114"/>
      <path d="M162 23 H278 L285 100 H155Z" fill="#17181c"/>
      <path d="M122 164 Q220 138 318 164 L334 710 Q220 733 106 710Z" fill="url(#label)" stroke="#e9d979" strokeWidth="3"/>
      <path d="M125 171 Q220 150 315 171" stroke="#8ff5e5" strokeWidth="5" opacity=".7" fill="none"/>
      <text x="220" y="235" textAnchor="middle" fill="#fff" fontSize="34" fontFamily="Georgia">TRICHUP</text>
      <text x="220" y="267" textAnchor="middle" fill="#e9ffff" fontSize="17" letterSpacing="3">HERBAL SHAMPOO</text>
      <text x="220" y="315" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold">تريشوب</text>
      <text x="220" y="343" textAnchor="middle" fill="#e7fff8" fontSize="16">الشامبو العشبي</text>
      <rect x="120" y="365" width="200" height="43" fill="#f04d18"/>
      <text x="220" y="394" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="bold">لمنع تساقط الشعر</text>
      <circle cx="220" cy="505" r="72" fill="#d9f5eb" opacity=".28"/>
      <path d="M220 449 C195 464 192 510 205 552 M220 449 C248 470 250 520 233 560" stroke="#174a3f" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M200 470 Q170 510 197 558 Q225 580 242 551 Q260 520 238 470Z" fill="#f1f2ed" opacity=".95"/>
      <path d="M205 485 Q220 501 238 486" stroke="#c2d6cf" strokeWidth="7" fill="none"/>
      <text x="220" y="640" textAnchor="middle" fill="#fff" fontSize="17">No Dioxane, SLS &amp; Parabens</text>
      <text x="220" y="670" textAnchor="middle" fill="#fff" fontSize="18">With Conditioners</text>
      <text x="220" y="704" textAnchor="middle" fill="#eafffa" fontSize="15">400ml (13.52 FL.OZ.)</text>
      <path d="M117 180 Q100 390 115 690" stroke="url(#shine)" strokeWidth="18" fill="none" opacity=".65"/>
    </svg>
  </div>;
};

const Scene: React.FC<StudioScene & { fps: number; index: number }> = ({ title, description, duration, fps, index }) => {
  const frame = useCurrentFrame();
  const total = duration * fps;
  const fade = Math.min(18, Math.floor(total / 3));
  const opacity = interpolate(frame, [0, fade, total-fade, total], [0,1,1,0], { extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const slide = interpolate(frame, [0, fade, total], [70,0,-45], { extrapolateRight:"clamp", easing:Easing.out(Easing.cubic) });
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 43%, #17483e 0%, #06211e 48%, #020908 100%)", overflow:"hidden", opacity, color:"#fff", fontFamily:"Arial,sans-serif", direction:"rtl" }}>
    <AbsoluteFill style={{ background:"linear-gradient(130deg, transparent 25%, rgba(109,255,226,.09) 48%, transparent 70%)", transform:`translateX(${(frame%90)*-9}px)` }}/>
    <GoldParticles count={48}/>
    <div style={{position:"absolute",top:"8%",left:"8%",right:"8%",height:2,background:"linear-gradient(90deg,transparent,#d6c36a,transparent)",boxShadow:"0 0 25px #8fffe2"}}/>
    <div style={{position:"absolute",top:"9%",width:"100%",textAlign:"center",fontSize:23,letterSpacing:5,color:"#e9df9a"}}>TRICHUP  •  HERBAL CARE</div>
    <div style={{position:"absolute",top:"15%",left:0,right:0,display:"flex",justifyContent:"center",transform:`translateY(${slide}px)`}}>
      <Bottle frame={frame + index*150}/>
    </div>
    <div style={{position:"absolute",bottom:"8%",left:"5%",right:"5%",textAlign:"center",padding:22,background:"linear-gradient(180deg, transparent, rgba(0,0,0,.68))"}}>
      <AnimatedArabicText text={title} fontSize={index===0?55:50} color="#f0df8a" durationInFrames={Math.min(30,total)}/>
      <div style={{fontSize:27,lineHeight:1.6,marginTop:15,textShadow:"0 2px 15px #000"}}>{description}</div>
    </div>
    <div style={{position:"absolute",bottom:22,left:"15%",right:"15%",height:3,background:"linear-gradient(90deg,transparent,#f2df83,transparent)"}}/>
  </AbsoluteFill>;
};

export const MainVideo: React.FC<StudioProjectProps> = ({ scenes, settings }) => {
  let start = 0;
  return <AbsoluteFill style={{background:"#020908"}}>
    {scenes.map((scene,index)=>{const from=start;const durationInFrames=scene.duration*settings.fps;start+=durationInFrames;return <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}><Scene {...scene} fps={settings.fps} index={index}/></Sequence>;})}
  </AbsoluteFill>;
};
