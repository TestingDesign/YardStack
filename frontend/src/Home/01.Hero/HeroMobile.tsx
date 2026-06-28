import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from './data';
import Logo from './Logo.png';
import BG from './BG.png';

const CategoryIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'building':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      );
    case 'users':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'bank':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="4" height="10" />
          <rect x="16" y="10" width="4" height="10" />
          <polygon points="12 2 2 8 22 8 12 2" />
          <path d="M2 22h20" />
        </svg>
      );
    case 'graduation':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z" />
        </svg>
      );
    case 'person':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
};

export default function HeroMobile() {
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
      className="relative overflow-hidden bg-[#F8F7FC] pt-2 pb-8"
    >
      <div
        className="absolute bottom-0 left-0 w-full h-[200px] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
        }}
      />

      <div className="px-2 py-2 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full max-w-sm mx-auto"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#D946EF] m-0">
              {HERO_CONTENT.tagline}
            </p>
            <div className="w-8 h-[3px] bg-gradient-to-r from-[#D946EF] to-[#6a5fc1] rounded-full" aria-hidden="true" />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-[1.8rem] leading-[1.2] font-extrabold text-[#111827] m-0 tracking-tight mb-4">
            Connecting Hyderabad's 
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)]">Real Estate </span>
            Ecosystem
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[0.95rem] leading-relaxed font-semibold text-[#374151] m-0 mb-8 px-2">
            {HERO_CONTENT.subHeading}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-row gap-4 w-full relative z-30 px-4 justify-center">
            <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-3 rounded-[4px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[12px] font-extrabold border-none cursor-pointer shadow-[0_4px_16px_rgba(124,58,237,0.25)] transition-all hover:-translate-y-[2px] active:scale-[0.98]">
              {HERO_CONTENT.primaryCta}
            </button>
            <button className="group flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-[4px] bg-white text-[#111827] text-[12px] font-extrabold border border-gray-200 cursor-pointer transition-all hover:shadow-md hover:-translate-y-[2px] active:bg-gray-50 active:scale-[0.98] shadow-sm">
              {HERO_CONTENT.secondaryCta}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* <motion.div variants={itemVariants} className="flex items-center gap-3 mt-6 px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-purple-100/50 shadow-lg shadow-purple-900/5">
            <div className="flex -space-x-2.5">
              {[11, 12, 13].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-purple-100 to-fuchsia-100 shadow-sm shrink-0">
                  <img src={`https://i.pravatar.cc/80?img=${i}`} alt="User avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-0.5 pr-1 text-left">
              <span className="text-[11px] font-extrabold text-[#422082] leading-tight">
                {HERO_CONTENT.supportingTextBold}
              </span>
              <span className="text-[9px] font-semibold text-[#79628c] leading-tight">
                {HERO_CONTENT.supportingText}
              </span>
            </div>
          </motion.div> */}
        </motion.div>

        <div className="relative flex items-center justify-center h-[340px] mt-6 w-full max-w-md mx-auto">
          <div
            className="absolute inset-0 m-auto w-[260px] h-[260px] rounded-full"
            style={{
              border: '2px dashed rgba(107, 33, 168, 0.15)',
              animation: 'spin 40s linear infinite'
            }}
          />

          <div
            className="absolute inset-0 m-auto w-[170px] h-[170px] rounded-full"
            style={{
              border: '1.5px dashed rgba(107, 33, 168, 0.1)',
              animation: 'spin 25s linear infinite reverse'
            }}
          />

          <div
            className="absolute w-[300px] h-[300px] rounded-full left-1/2 top-1/2 pointer-events-none"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(107, 33, 168, 0.06) 0%, transparent 60%)',
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center w-[90px] h-[90px] rounded-full shadow-[0_8px_30px_rgba(107,33,168,0.3)] border-4 border-white bg-white"
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img src={Logo} alt="Logo" className="w-[70%] h-[70%] object-contain" draggable={false} />
          </div>

          <div
            className="absolute inset-0 m-auto w-[280px] h-[280px]"
            style={{ animation: 'spin 40s linear infinite' }}
          >
            {ECOSYSTEM_CATEGORIES.map((cat, i) => {
              const angle = (360 / ECOSYSTEM_CATEGORIES.length) * i;
              const radians = (angle - 90) * (Math.PI / 180);
              const radius = 135; 
              const x = Math.cos(radians) * radius;
              const y = Math.sin(radians) * radius;

              return (
                <div
                  key={i}
                  className="absolute z-20"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="flex flex-col items-center justify-center gap-1 rounded-[10px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] px-1 py-1.5 w-[75px] h-[75px] text-center border border-white/80"
                    style={{
                      animation: 'spin 40s linear infinite reverse'
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#f8f5fc] flex items-center justify-center border border-[#6B21A8]/5 shrink-0">
                      <CategoryIcon icon={cat.icon} />
                    </div>
                    <span className="text-[7.5px] font-extrabold text-[#111827] leading-[1.2] whitespace-pre-line">
                      {cat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
