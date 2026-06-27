import { ArrowRight } from 'lucide-react';
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
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F8F7FC]"
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

      <div className="px-4 py-8 relative z-10">
        <div className="flex flex-col gap-4 ys-fade-in-up">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#D946EF] m-0">
            {HERO_CONTENT.tagline}
          </p>
          <div className="w-8 h-[3px] bg-gradient-to-r from-[#D946EF] to-[#6a5fc1] rounded-full" aria-hidden="true" />

          <h1 className="text-[2.2rem] leading-[1.1] font-extrabold text-[#111827] m-0 tracking-tight">
            Connecting Hyderabad's
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)]">Real Estate</span> <br />
            Ecosystem
          </h1>

          <p className="text-[0.95rem] leading-relaxed font-semibold text-[#374151] m-0">
            {HERO_CONTENT.subHeading}
          </p>



          <div className="flex flex-col gap-3 mt-2">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[14px] font-extrabold border-none cursor-pointer shadow-[0_4px_16px_rgba(124,58,237,0.25)] transition-all active:scale-[0.98]">
              {HERO_CONTENT.primaryCta} <ArrowRight size={16} />
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] bg-white text-[#111827] text-[14px] font-extrabold border border-gray-200 cursor-pointer transition-all active:bg-gray-50 shadow-sm">
              {HERO_CONTENT.secondaryCta}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4 px-4 py-3 rounded-[16px] bg-white/70 backdrop-blur-md border border-purple-100/50 shadow-[0_8px_32px_rgba(107,33,168,0.06)] w-fit">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#6B21A8]/20 to-[#D946EF]/20 shadow-sm"
                >
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt="Community member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-[#422082] leading-tight">
                {HERO_CONTENT.supportingTextBold}
              </span>
              <span className="text-[10px] font-semibold text-[#79628c] leading-tight">
                {HERO_CONTENT.supportingText}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center h-[340px] mt-10 w-full">
          <div
            className="absolute w-[240px] h-[240px] rounded-full left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              border: '2px dashed rgba(107, 33, 168, 0.15)',
            }}
          />
          <div
            className="absolute w-[160px] h-[160px] rounded-full left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              border: '1.5px dashed rgba(107, 33, 168, 0.1)',
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

          {ECOSYSTEM_CATEGORIES.map((cat, i) => {
            const angle = [0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6][i] || 0;
            const radians = (angle - 90) * (Math.PI / 180);
            const radius = 135;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;

            return (
              <div
                key={i}
                className="absolute z-20 flex flex-col items-center justify-center gap-1 rounded-[10px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 min-w-[75px] max-w-[85px] text-center border border-white/80 ys-fade-in"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-[#f8f5fc] flex items-center justify-center border border-[#6B21A8]/5">
                  <CategoryIcon icon={cat.icon} />
                </div>
                <span className="text-[8px] font-extrabold text-[#111827] leading-tight whitespace-pre-line">
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}