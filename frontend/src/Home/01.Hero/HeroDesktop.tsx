import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from "./data";

const CARD_RADIUS = 190;

const CategoryIcon = ({ icon, size = 22 }: { icon: string; size?: number }) => {
  const s = size;
  const strokeClass = "stroke-purple-800";

  switch (icon) {
    case "building":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
          <path d="M12 10h.01" /><path d="M12 14h.01" />
          <path d="M16 10h.01" /><path d="M16 14h.01" />
          <path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
      );
    case "users":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "bank":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="4" height="10" />
          <rect x="16" y="10" width="4" height="10" />
          <polygon points="12 2 2 8 22 8 12 2" />
          <path d="M2 22h20" />
        </svg>
      );
    case "graduation":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z" />
        </svg>
      );
    case "person":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={strokeClass} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
};

export default function HeroDesktop() {
  const getCardPos = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: Math.cos(rad) * CARD_RADIUS,
      y: Math.sin(rad) * CARD_RADIUS,
    };
  };

  const cardAngles = [0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6];

  return (
    <section 
      id="hero" 
      className="relative bg-white" 
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        className="absolute bottom-0 right-0 w-[800px] max-w-full pointer-events-none opacity-10 h-[220px]"
        style={{
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 200' preserveAspectRatio='xMaxYMax meet'%3E%3Cpath d='M0 200V120h30v-15h20v-10h35v30h15v-25h25v-15h20v40h35v-30h25v-8h20v45h40v-20h30v-25h20v45h35v-10h15v-20h30v30h15v-12h25v-30h20v45h30v-15h15v-8h20v25h35v-20h30v20h60V200H0z' fill='%236B21A8'/%3E%3C%2Fsvg%3E\")",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 items-center">
          
          {/* Left Content Area */}
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-800 m-0">
              {HERO_CONTENT.tagline}
            </p>
            <h1 className="text-4xl lg:text-5xl leading-tight font-extrabold text-slate-900 m-0 tracking-tight">
              Connecting <span className="text-purple-800">Hyderabad&apos;s</span>
              <br />
              <span className="text-purple-800">Real Estate</span> Ecosystem
            </h1>
            <p className="text-base font-bold text-slate-900 max-w-md m-0">
              {HERO_CONTENT.subHeading}
            </p>
            <p className="text-sm leading-relaxed text-gray-500 max-w-md m-0">
              {HERO_CONTENT.description}
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-purple-800 text-white text-sm font-bold shadow-lg shadow-purple-800/30 hover:bg-purple-900 hover:shadow-xl hover:shadow-purple-800/40 hover:-translate-y-1 transition-all duration-300 active:scale-95">
                {HERO_CONTENT.primaryCta}
              </button>
              <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-white text-gray-700 text-sm font-bold border border-gray-200 shadow-sm hover:border-purple-800/40 hover:text-purple-800 transition-all duration-300 active:scale-95">
                {HERO_CONTENT.secondaryCta}
                <ArrowRight size={15} />
              </button>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2.5">
                {[11, 12, 13, 14].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-[2px] border-white overflow-hidden bg-gradient-to-br from-purple-800/20 to-fuchsia-500/20 shadow-sm shrink-0"
                  >
                    <img
                      src={`https://i.pravatar.cc/80?img=${i}`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  {HERO_CONTENT.supportingTextBold}
                </span>
                <span className="text-xs font-medium text-gray-500 leading-tight">
                  {HERO_CONTENT.supportingText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="relative flex items-center justify-center h-[520px]">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(107,33,168,0.07) 0%, rgba(107,33,168,0.02) 55%, transparent 75%)",
              }}
            />

            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              width="100%"
              height="100%"
            >
              <circle
                cx="50%"
                cy="50%"
                r={CARD_RADIUS}
                fill="none"
                className="stroke-purple-800/20"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle
                cx="50%"
                cy="50%"
                r="120"
                fill="none"
                className="stroke-purple-800/10"
                strokeWidth="1.2"
                strokeDasharray="6 6"
              />
            </svg>

            {cardAngles.map((angle, i) => (
              <div
                key={`line-${i}`}
                className="absolute pointer-events-none bg-purple-800/10 h-px origin-left"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${CARD_RADIUS}px`,
                  transform: `rotate(${angle - 90}deg)`,
                }}
              />
            ))}

            {cardAngles.map((angle, i) => {
              const pos = getCardPos(angle);
              return (
                <div
                  key={`dot-${i}`}
                  className="absolute w-2 h-2 rounded-full pointer-events-none bg-purple-800/30"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}

            <div
              className="absolute z-10 flex items-center justify-center rounded-full border-[4px] border-white shadow-2xl shadow-purple-800/40 w-36 h-36"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "linear-gradient(135deg, #7C3AED 0%, #6B21A8 55%, #4C1D95 100%)",
              }}
            >
              <span className="text-white font-extrabold text-3xl tracking-tight leading-none">
                N4RE
              </span>
            </div>

            {ECOSYSTEM_CATEGORIES.map((cat, i) => {
              const pos = getCardPos(cardAngles[i]);
              const isLg = cat.size === "lg";
              const isSm = cat.size === "sm";
              
              return (
                <div
                  key={i}
                  className="absolute z-20 flex flex-col items-center gap-2 rounded-lg bg-white text-center border border-gray-100 shadow-lg hover:shadow-xl hover:shadow-purple-800/10 hover:-translate-y-1 transition-all duration-200 cursor-default"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                    padding: isLg ? "14px 18px" : isSm ? "10px 14px" : "12px 16px",
                    minWidth: isLg ? "140px" : isSm ? "112px" : "124px",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full bg-purple-50 border border-purple-800/10"
                    style={{
                      width: isLg ? "42px" : "36px",
                      height: isLg ? "42px" : "36px",
                    }}
                  >
                    <CategoryIcon icon={cat.icon} size={isLg ? 22 : 18} />
                  </div>
                  <span
                    className="font-bold text-slate-900 leading-tight whitespace-pre-line"
                    style={{ fontSize: isLg ? "12px" : "11px" }}
                  >
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}