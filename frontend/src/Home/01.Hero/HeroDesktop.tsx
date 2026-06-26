import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from "./data";
import AnimatedCity from "./AnimatedCity";
import Logo from "./Logo.png";
import BG from "./BG.png";

const CARD_RADIUS = 200;

const CategoryIcon = ({ icon, size = 22 }: { icon: string; size?: number }) => {
  const strokeClass = "stroke-purple-700";
  switch (icon) {
    case "building": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
      </svg>);
    case "users": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>);
    case "briefcase": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>);
    case "bank": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="10" width="4" height="10" /><rect x="16" y="10" width="4" height="10" /><polygon points="12 2 2 8 22 8 12 2" /><path d="M2 22h20" />
      </svg>);
    case "graduation": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>);
    case "megaphone": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z" />
      </svg>);
    case "person": return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>);
    default: return null;
  }
};

export default function HeroDesktop() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardAngles = [0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6];

  return (
    <section id="hero" className="relative bg-[var(--color-bg-muted)] py-10 lg:py-16 overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      <div className="absolute bottom-0 right-0 w-full lg:w-[55%] pointer-events-none z-0 opacity-10" style={{ height: "300px" }}>
        <img src={BG} alt="City Background" className="w-full h-full object-cover object-right-bottom" draggable={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 lg:gap-5 items-center">
          
          <div className="flex flex-col gap-4 pt-2 lg:pt-0">
            <span className="text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 w-fit">
              {HERO_CONTENT.tagline}
            </span>
            <h1 className="text-4xl lg:text-[56px] leading-[1.1] font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Connecting <br className="hidden lg:block" />
              <AnimatedCity className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500" suffix="'s" /><br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">Real Estate</span>{" "}
              Ecosystem
            </h1>
            <p className="text-lg font-semibold text-[var(--color-text-primary)] max-w-md">{HERO_CONTENT.subHeading}</p>
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)] max-w-md">{HERO_CONTENT.description}</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-800 to-purple-700 text-white text-sm font-bold shadow-lg shadow-purple-800/25 hover:shadow-xl hover:shadow-purple-800/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
                {HERO_CONTENT.primaryCta}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/60 backdrop-blur-sm text-[var(--color-text-primary)] text-sm font-bold border border-[var(--color-border-default)]/60 shadow-sm hover:bg-white hover:border-purple-200 hover:text-purple-800 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]">
                {HERO_CONTENT.secondaryCta}
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm w-fit">
              <div className="flex -space-x-2">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-[2.5px] border-white overflow-hidden bg-gradient-to-br from-purple-100 to-fuchsia-100 shadow-sm shrink-0">
                    <img src={`https://i.pravatar.cc/80?img=${i}`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-extrabold text-[var(--color-text-primary)] leading-tight">{HERO_CONTENT.supportingTextBold}</span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)] leading-tight">{HERO_CONTENT.supportingText}</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[520px] lg:h-[560px] w-full">
            <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background: "radial-gradient(circle at center, rgba(107,33,168,0.06) 0%, rgba(107,33,168,0.02) 45%, transparent 70%)" }} />
            
            <svg className="absolute inset-0 pointer-events-none overflow-visible" width="100%" height="100%">
              <circle cx="50%" cy="50%" r={CARD_RADIUS} fill="none" className="stroke-purple-800/20" strokeWidth="1.5" />
              <circle cx="50%" cy="50%" r={CARD_RADIUS + 75} fill="none" className="stroke-purple-800/10" strokeWidth="1" />
            </svg>

            {cardAngles.map((angle, i) => {
              const isActive = activeIndex === i;
              const staggerOffset = i % 2 === 0 ? 0 : 25;
              const currentRadius = CARD_RADIUS + staggerOffset + (isActive ? 35 : 0);
              
              return (
                <div key={`line-${i}`} className="absolute pointer-events-none bg-gradient-to-r from-purple-800/0 via-purple-800/20 to-purple-800/0 h-[1.5px] origin-left transition-all duration-500 ease-out"
                  style={{ left: "50%", top: "50%", width: `${currentRadius}px`, transform: `rotate(${angle - 90}deg)` }} />
              );
            })}

            {cardAngles.map((angle, i) => {
              const isActive = activeIndex === i;
              const staggerOffset = i % 2 === 0 ? 0 : 25;
              const currentRadius = CARD_RADIUS + staggerOffset + (isActive ? 35 : 0);
              const radians = (angle - 90) * (Math.PI / 180);
              const x = Math.cos(radians) * currentRadius;
              const y = Math.sin(radians) * currentRadius;

              return (
                <div key={`dot-${i}`} className={`absolute w-3 h-3 rounded-full pointer-events-none transition-all duration-500 ease-out ${isActive ? "bg-purple-600 shadow-[0_0_12px_rgba(147,51,234,0.6)] scale-125" : "bg-purple-800/30"}`}
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }} />
              );
            })}

            <div className="absolute z-10 flex items-center justify-center rounded-full border-[6px] border-white/80 backdrop-blur-sm shadow-2xl shadow-purple-900/30 w-32 h-32 bg-white"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <img src={Logo} alt="Logo" className="w-[70%] h-[70%] object-contain" draggable={false} />
            </div>

            {ECOSYSTEM_CATEGORIES.map((cat, i) => {
              const isActive = activeIndex === i;
              const isLg = cat.size === "lg";
              const isSm = cat.size === "sm";

              const staggerOffset = i % 2 === 0 ? 0 : 25;
              const currentRadius = CARD_RADIUS + staggerOffset + (isActive ? 35 : 0);
              const radians = (cardAngles[i] - 90) * (Math.PI / 180);
              const x = Math.cos(radians) * currentRadius;
              const y = Math.sin(radians) * currentRadius;

              return (
                <button key={i} onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`absolute z-20 flex flex-col items-center gap-2 rounded-2xl backdrop-blur-md text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${isActive ? "bg-white/95 border border-purple-400 shadow-2xl shadow-purple-900/20 scale-[1.15] z-30" : "bg-white/70 border border-white/50 shadow-lg shadow-slate-200/50 hover:bg-white/90 hover:scale-105 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-800/10 cursor-pointer"}`}
                  style={{
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`, 
                    transform: "translate(-50%, -50%)",
                    padding: isLg ? "12px 16px" : isSm ? "8px 12px" : "10px 14px",
                    minWidth: isLg ? "140px" : isSm ? "110px" : "125px"
                  }}>
                  
                  <div className={`flex items-center justify-center rounded-full transition-colors duration-500 border ${isActive ? "bg-purple-100 border-purple-200" : "bg-purple-50/80 border-purple-900/5"}`}
                    style={{ width: isLg ? "40px" : "36px", height: isLg ? "40px" : "36px" }}>
                    <CategoryIcon icon={cat.icon} size={isLg ? 20 : 18} />
                  </div>
                  
                  <div className="flex flex-col gap-1 w-full">
                    <span className={`font-bold leading-tight whitespace-pre-line transition-colors duration-500 ${isActive ? "text-purple-900" : "text-[var(--color-text-primary)]"}`} style={{ fontSize: isLg ? "13px" : "12px" }}>
                      {cat.label}
                    </span>
                    <div className={`grid transition-all duration-500 overflow-hidden ${isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="min-h-0">
                        <span className="block text-[11px] text-[var(--color-text-secondary)] font-medium leading-snug px-1 pb-1">
                          {cat.description || "Explore this area."}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}