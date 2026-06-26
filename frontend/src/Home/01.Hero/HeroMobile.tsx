import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from './data';

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
        className="absolute bottom-0 left-0 w-full h-[200px] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 800 400\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0 400V300h50v-50h30v-30h40v80h20v-60h40v-40h30v100h50v-80h40v-20h30v100h60v-40h40v-60h30v100h50v-20h20v-50h40v70h20v-30h40v-70h30v100h40v-40h20v-20h30v60h50v-50h40v50h80V400H0z\' fill=\'%236B21A8\'/%3E%3C/svg%3E")',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
        }}
      />

      <div className="px-4 py-8 relative z-10">
        <div className="flex flex-col gap-4 ys-fade-in-up">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#6B21A8] m-0">
            {HERO_CONTENT.tagline}
          </p>

          <h1 className="text-[1.8rem] leading-[1.15] font-extrabold text-[#1A1A2E] m-0 tracking-tight">
            Connecting <span className="text-[#6B21A8]">Hyderabad&apos;s</span>
            <br />
            <span className="text-[#6B21A8]">Real Estate</span> Ecosystem
          </h1>

          <p className="text-[0.95rem] leading-relaxed font-semibold text-[#374151] m-0">
            {HERO_CONTENT.subHeading}
          </p>

          <p className="text-[0.85rem] leading-relaxed text-[#6B7280] m-0">
            {HERO_CONTENT.description}
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <button className="w-full flex items-center justify-center px-6 py-3.5 rounded-[4px] bg-[#6B21A8] text-white text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_14px_rgba(107,33,168,0.35)] transition-all active:scale-[0.98]">
              {HERO_CONTENT.primaryCta}
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-white text-[#374151] text-[14px] font-bold border border-gray-200 cursor-pointer transition-all active:bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              {HERO_CONTENT.secondaryCta}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4">
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
              <span className="text-[11px] font-bold text-[#1A1A2E]">
                {HERO_CONTENT.supportingTextBold}
              </span>
              <span className="text-[11px] font-medium text-[#6B7280]">
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
            className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center w-[90px] h-[90px] rounded-full shadow-[0_8px_30px_rgba(107,33,168,0.3)] border-4 border-white"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6B21A8 50%, #5B1D99 100%)',
            }}
          >
            <span className="text-white text-[20px] font-extrabold tracking-tight">N4RE</span>
          </div>

          {ECOSYSTEM_CATEGORIES.slice(0, 5).map((cat, i) => {
            const mobilePositions = [
              { top: '-5%', left: '50%' },
              { top: '35%', left: '90%' },
              { top: '90%', left: '70%' },
              { top: '90%', left: '30%' },
              { top: '35%', left: '10%' },
            ];
            return (
              <div
                key={i}
                className="absolute z-20 flex flex-col items-center justify-center gap-1.5 rounded-[4px] bg-white/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-3 py-2.5 min-w-[100px] text-center border border-white/80 ys-fade-in"
                style={{
                  top: mobilePositions[i].top,
                  left: mobilePositions[i].left,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#F5F3FF] flex items-center justify-center border border-[#6B21A8]/10">
                  <CategoryIcon icon={cat.icon} />
                </div>
                <span className="text-[9px] font-bold text-[#1A1A2E] leading-tight whitespace-pre-line">
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