import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from "./data";
import Logo from "./Logo.png";
import BG from "./BG.png";

const CARD_RADIUS = 200;

const CategoryIcon = ({ icon, size = 22 }: { icon: string; size?: number }) => {
  const strokeClass = "stroke-[#D946EF]";
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: strokeClass,
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "building":
      return (
        <svg {...commonProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...commonProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...commonProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "bank":
      return (
        <svg {...commonProps}>
          <rect x="4" y="10" width="4" height="10" />
          <rect x="16" y="10" width="4" height="10" />
          <polygon points="12 2 2 8 22 8 12 2" />
          <path d="M2 22h20" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...commonProps}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...commonProps}>
          <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z" />
        </svg>
      );
    case "person":
      return (
        <svg {...commonProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
};

export default function HeroDesktop() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardAngles = [0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section 
      id="hero" 
      className="relative bg-white overflow-hidden selection:bg-[#D946EF]/20 selection:text-[#422082] pt-[100px] pb-8 lg:pt-[120px] lg:pb-12"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-purple-50/70 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[450px] pointer-events-none z-0 opacity-20">
        <img 
          src={BG} 
          alt="City Background" 
          className="w-full h-full object-cover object-bottom mix-blend-multiply" 
          draggable={false} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 lg:gap-5 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="flex flex-col gap-4 pt-2 lg:pt-0"
          >
            <motion.div variants={itemVariants} className="flex flex-col mb-1">
              <span className="text-sm font-extrabold tracking-wider uppercase text-[#D946EF] w-fit">
                {HERO_CONTENT.tagline}
              </span>
              <div className="w-10 h-1 bg-gradient-to-r from-[#D946EF] to-[#6a5fc1] mt-2 shadow-sm rounded-full" aria-hidden="true" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl lg:text-[60px] leading-tight font-extrabold text-gray-900 tracking-tight drop-shadow-sm mb-2">
              Connecting <br className="hidden lg:block" />
              Hyderabad's<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)]">
                Real Estate
              </span>{" "}
              <br className="hidden lg:block" />
              Ecosystem
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg font-bold text-[#422082] max-w-md">
              {HERO_CONTENT.subHeading}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4">
              <button className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white text-[15px] font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2">
                {HERO_CONTENT.primaryCta} 
              </button>
              <button className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-gray-900 text-[15px] font-extrabold border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-purple-200 hover:text-purple-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2">
                {HERO_CONTENT.secondaryCta} 
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 mt-8 px-5 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-purple-100/50 shadow-lg shadow-purple-900/5 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-500 w-fit">
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-purple-100 to-fuchsia-100 shadow-sm shrink-0">
                    <img src={`https://i.pravatar.cc/80?img=${i}`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5 pr-2">
                <span className="text-[13px] font-extrabold text-[#422082] leading-tight">
                  {HERO_CONTENT.supportingTextBold}
                </span>
                <span className="text-[11px] font-semibold text-[#79628c] leading-tight">
                  {HERO_CONTENT.supportingText}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-center h-[520px] lg:h-[560px] w-full animate-in zoom-in-95 fade-in duration-700 ease-out delay-150">
            <div 
              className="absolute inset-0 pointer-events-none rounded-full" 
              style={{ background: "radial-gradient(circle at center, rgba(217,70,239,0.05) 0%, rgba(106,95,193,0.02) 45%, transparent 70%)" }} 
            />
            
            <svg className="absolute inset-0 pointer-events-none overflow-visible" width="100%" height="100%">
              <circle cx="50%" cy="50%" r={CARD_RADIUS} fill="none" className="stroke-purple-100" strokeWidth="1.5" strokeDasharray="6 6" />
            </svg>

            <div 
              className="absolute inset-0 w-full h-full"
              style={{ animation: 'heroSpin 40s linear infinite' }}
            >
              {cardAngles.map((angle, i) => {
              const isActive = activeIndex === i;
              const currentRadius = CARD_RADIUS + (isActive ? 15 : 0);
              
              return (
                <div 
                  key={`line-group-${i}`} 
                  className="absolute top-1/2 left-1/2 origin-left pointer-events-none transition-all duration-500 ease-out z-0"
                  style={{ width: `${currentRadius}px`, transform: `translateY(-50%) rotate(${angle - 90}deg)` }}
                >
                  <div className="absolute top-1/2 left-[55px] right-0 h-[1.5px] bg-purple-100 -translate-y-1/2 overflow-hidden rounded-full">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] w-[30px] bg-gradient-to-r from-transparent via-fuchsia-500 to-fuchsia-500 shadow-[0_0_8px_#d946ef] opacity-0 animate-[ledDot_4s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.4}s` }} 
                    />
                  </div>
                  
                  <div className="absolute top-1/2 left-[50%] w-1.5 h-1.5 bg-purple-400 rounded-full -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-fuchsia-500 rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
              );
            })}

            <div 
              className="absolute z-10 flex items-center justify-center rounded-full shadow-2xl shadow-purple-900/10 w-[140px] h-[140px] bg-white border border-purple-50"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <img src={Logo} alt="Logo" className="w-[75%] h-[75%] object-contain drop-shadow-sm" draggable={false} style={{ animation: 'heroSpinReverse 40s linear infinite' }} />
            </div>

            {ECOSYSTEM_CATEGORIES.map((cat, i) => {
              const isActive = activeIndex === i;
              const currentRadius = CARD_RADIUS + (isActive ? 15 : 0);
              const radians = (cardAngles[i] - 90) * (Math.PI / 180);
              const x = Math.cos(radians) * currentRadius;
              const y = Math.sin(radians) * currentRadius;

              return (
                <div
                  key={i}
                  className="absolute z-20"
                  style={{
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`, 
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button 
                    onClick={() => setActiveIndex(isActive ? null : i)}
                    className={`flex flex-col items-center gap-3 rounded-2xl bg-white text-center transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer w-[140px] p-4
                      ${isActive 
                        ? "shadow-2xl shadow-fuchsia-500/20 border border-fuchsia-500/30 scale-110 z-30" 
                        : "shadow-lg shadow-gray-200/50 border border-white hover:scale-105 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-900/10"
                      }`}
                    style={{
                      animation: 'heroSpinReverse 40s linear infinite'
                    }}
                  >
                    <div className={`flex items-center justify-center rounded-full transition-all duration-500 w-12 h-12 ${isActive ? "bg-purple-100/50 shadow-inner" : "bg-gray-50"}`}>
                      <CategoryIcon icon={cat.icon} size={22} />
                    </div>
                    
                    <div className="flex flex-col gap-1 w-full">
                      <span className={`font-extrabold leading-tight whitespace-pre-line transition-colors duration-500 text-[12px] ${isActive ? "text-purple-900" : "text-gray-900"}`}>
                        {cat.label}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes ledDot {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 1; }
          50% { left: 110%; opacity: 0; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}