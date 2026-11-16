import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from "remotion";
import { GoldParticles, AnimatedArabicText } from "./components";
import type { StudioProjectProps, StudioScene } from "./project";

const Bottle: React.FC<{ frame: number }> = ({ frame }) => {
  const y = interpolate(frame, [0, 45, 105, 150], [95, 0, -32, 0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + Math.sin(frame / 10) * 8;
  const turn = interpolate(frame, [0, 75, 150], [-8, 5, -3], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 35, 100, 150], [0.62, 1.12, 1.28, 1.05], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const drift = Math.sin(frame / 23) * 24;
  return <div style={{ transform: `translate(${drift}px, ${y}px) rotate(${turn}deg) scale(${scale})`, filter: "drop-shadow(0 35px 30px rgba(0,0,0,.55))" }}>
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

const Scene: React.FC<StudioScene & { fps: number; index: number; overlap: number; last: boolean }> = ({ title, description, duration, fps, index, overlap, last }) => {
  const frame = useCurrentFrame();
  const total = duration * fps;
  const fade = Math.min(overlap, 18, Math.floor(total / 3));
  const opacity = interpolate(frame, [0, fade, total-fade, total], [0,1,1,last ? 1 : 0], { extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const intro = Math.min(24, Math.floor(total / 4));
  const exit = Math.min(20, Math.floor(total / 4));
  const zoom = interpolate(frame, [0, total], [0.92, 1.18], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const directions = [
    { from: "translate3d(0,-180px,0) scale(.65)", to: "translate3d(0,0,0) scale(1)" },
    { from: "translate3d(220px,0,0) scale(.7)", to: "translate3d(0,0,0) scale(1)" },
    { from: "translate3d(-220px,0,0) scale(.7)", to: "translate3d(0,0,0) scale(1)" }
  ];
  const entrance = directions[index % directions.length];
  const sweep = Math.sin(frame / 27) * 34;
  const imageZoom = interpolate(frame, [0, total], [0.88, 1.22], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const textProgress = interpolate(frame, [0, intro, total-exit, total], [0, 1, 1, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.25)) });
  const textX = index===1 ? interpolate(frame,[0,intro],[220,0],{extrapolateRight:"clamp"}) : index===2 ? interpolate(frame,[0,intro],[-220,0],{extrapolateRight:"clamp"}) : 0;
  const textY = index===0 ? interpolate(frame,[0,intro],[-160,0],{extrapolateRight:"clamp"}) : interpolate(frame,[0,intro],[80,0],{extrapolateRight:"clamp"});
  const titleScale = interpolate(frame,[0,intro,total],[.55,1.08,.94],{extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 43%, #17483e 0%, #06211e 48%, #020908 100%)", overflow:"hidden", opacity, color:"#fff", fontFamily:"Arial,sans-serif", direction:"rtl" }}>
    <AbsoluteFill style={{ background:"linear-gradient(130deg, transparent 20%, rgba(109,255,226,.18) 48%, transparent 72%)", transform:`translateX(${(frame%90)*-11}px) scale(1.15)` }}/>
    <div style={{position:"absolute",inset:"10% -22%",background:"radial-gradient(ellipse,rgba(219,197,117,.12),transparent 62%)",transform:`translateX(${sweep}px)`}}/>
    <GoldParticles count={64}/>
    <div style={{position:"absolute",top:"7%",left:"8%",right:"8%",height:2,background:"linear-gradient(90deg,transparent,#d6c36a,transparent)",boxShadow:"0 0 25px #8fffe2"}}/>
    <div style={{position:"absolute",top:"8%",width:"100%",textAlign:"center",fontSize:22,letterSpacing:5,color:"#e9df9a",opacity:textProgress}}>TRICHUP  •  HERBAL CARE</div>
    <div style={{position:"absolute",top:"13%",left:0,right:0,height:"62%",display:"flex",justifyContent:"center",alignItems:"center",transform:`scale(${zoom * imageZoom}) translateX(${Math.sin(frame/35)*34}px)`}}>
      <Bottle frame={frame + index*150}/>
    </div>
    <div style={{position:"absolute",bottom:"7%",left:"4%",right:"4%",textAlign:"center",padding:"26px 16px",borderTop:"1px solid rgba(240,223,138,.55)",borderBottom:"1px solid rgba(240,223,138,.35)",background:"linear-gradient(180deg, rgba(2,9,8,.05), rgba(0,0,0,.76))",opacity:textProgress,transform:`translate3d(${textX}px,${textY}px,0) scale(${titleScale})`,transformOrigin:"center center"}}>
      <div style={{fontSize:index===0?54:48,fontWeight:900,lineHeight:1.35,color:"#f0df8a",textShadow:"0 4px 28px rgba(245,212,119,.4)"}}>{title}</div>
      <div style={{fontSize:25,lineHeight:1.55,marginTop:13,textShadow:"0 2px 15px #000"}}>{description}</div>
    </div>
    <div style={{position:"absolute",bottom:20,left:"15%",right:"15%",height:3,background:"linear-gradient(90deg,transparent,#f2df83,transparent)",transform:`scaleX(${textProgress})`,transformOrigin:"center"}}/>
  </AbsoluteFill>;
};

export const MainVideo: React.FC<StudioProjectProps> = ({ scenes, settings }) => {
  const overlap = Math.round(settings.fps * 0.55);
  let start = 0;
  return <AbsoluteFill style={{background:"#020908"}}>
    {scenes.map((scene,index)=>{
      const from = start;
      const durationInFrames = scene.duration * settings.fps + (index < scenes.length - 1 ? overlap : 0);
      start += scene.duration * settings.fps;
      return <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
        <Scene {...scene} fps={settings.fps} index={index} overlap={overlap} last={index === scenes.length - 1}/>
      </Sequence>;
    })}
  </AbsoluteFill>;
};
