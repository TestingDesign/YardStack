import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from "./data";

const CARD_RADIUS = 190;

const CategoryIcon = ({ icon, size = 22 }: { icon: string; size?: number }) => {
  const s = size;
  switch (icon) {
    case "building":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "bank":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="4" height="10" />
          <rect x="16" y="10" width="4" height="10" />
          <polygon points="12 2 2 8 22 8 12 2" />
          <path d="M2 22h20" />
        </svg>
      );
    case "graduation":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z" />
        </svg>
      );
    case "person":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <section id="hero" className="relative bg-white font-['Outfit',sans-serif]">
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "220px",
          opacity: 0.08,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 200' preserveAspectRatio='none'%3E%3Cpath d='M0 200V120h30v-15h20v-10h35v30h15v-25h25v-15h20v40h35v-30h25v-8h20v45h40v-20h30v-25h20v45h35v-10h15v-20h30v30h15v-12h25v-30h20v45h30v-15h15v-8h20v25h35v-20h30v20h60V200H0z' fill='%236B21A8'/%3E%3C%2Fsvg%3E\")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#6B21A8] m-0">
              {HERO_CONTENT.tagline}
            </p>
            <h1 className="text-[2.6rem] lg:text-[3.2rem] leading-[1.12] font-extrabold text-[#1A1A2E] m-0 tracking-tight">
              Connecting{" "}
              <span className="text-[#6B21A8]">Hyderabad&apos;s</span>
              <br />
              <span className="text-[#6B21A8]">Real Estate</span> Ecosystem
            </h1>
            <p className="text-[1rem] leading-[1.65] font-bold text-[#1A1A2E] max-w-[480px] m-0">
              {HERO_CONTENT.subHeading}
            </p>
            <p className="text-[0.875rem] leading-[1.7] text-[#6B7280] max-w-[480px] m-0">
              {HERO_CONTENT.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <button className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#6B21A8] text-white text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_16px_rgba(107,33,168,0.35)] hover:bg-[#5B1D99] hover:shadow-[0_6px_22px_rgba(107,33,168,0.45)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]">
                {HERO_CONTENT.primaryCta}
              </button>
              <button className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#374151] text-[14px] font-bold border border-gray-200 cursor-pointer hover:border-[#6B21A8]/40 hover:text-[#6B21A8] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.97]">
                {HERO_CONTENT.secondaryCta}
                <ArrowRight size={15} />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2.5">
                {[11, 12, 13, 14].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#6B21A8]/20 to-[#D946EF]/20 shadow-sm shrink-0"
                  >
                    <img
                      src={`https://i.pravatar.cc/80?img=${i}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-[#1A1A2E] leading-tight">
                  {HERO_CONTENT.supportingTextBold}
                </span>
                <span className="text-[12px] font-medium text-[#6B7280] leading-tight">
                  {HERO_CONTENT.supportingText}
                </span>
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center"
            style={{ height: "520px" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(107,33,168,0.07) 0%, rgba(107,33,168,0.02) 55%, transparent 75%)",
              }}
            />

            <svg
              className="absolute inset-0 pointer-events-none"
              width="100%"
              height="100%"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="50%"
                cy="50%"
                r={CARD_RADIUS}
                fill="none"
                stroke="rgba(107,33,168,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle
                cx="50%"
                cy="50%"
                r="120"
                fill="none"
                stroke="rgba(107,33,168,0.1)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
              />
            </svg>

            {cardAngles.map((angle, i) => (
              <div
                key={`line-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${CARD_RADIUS}px`,
                  height: "1px",
                  background: "rgba(107,33,168,0.13)",
                  transformOrigin: "0 0",
                  transform: `rotate(${angle - 90}deg)`,
                }}
              />
            ))}

            {cardAngles.map((angle, i) => {
              const pos = getCardPos(angle);
              return (
                <div
                  key={`dot-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "7px",
                    height: "7px",
                    background: "rgba(107,33,168,0.28)",
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}

            <div
              className="absolute z-10 flex items-center justify-center rounded-full border-[5px] border-white shadow-[0_12px_48px_rgba(107,33,168,0.4)]"
              style={{
                width: "150px",
                height: "150px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "linear-gradient(135deg, #7C3AED 0%, #6B21A8 55%, #4C1D95 100%)",
              }}
            >
              <span className="text-white font-extrabold text-[28px] tracking-tight leading-none">
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
                  className="absolute z-20 flex flex-col items-center gap-2 rounded-2xl bg-white text-center border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(107,33,168,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                    padding: isLg
                      ? "14px 18px"
                      : isSm
                      ? "10px 14px"
                      : "12px 16px",
                    minWidth: isLg ? "140px" : isSm ? "112px" : "124px",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full bg-[#F5F3FF] border border-[#6B21A8]/10"
                    style={{
                      width: isLg ? "42px" : "36px",
                      height: isLg ? "42px" : "36px",
                    }}
                  >
                    <CategoryIcon icon={cat.icon} size={isLg ? 22 : 18} />
                  </div>
                  <span
                    className="font-bold text-[#1A1A2E] leading-tight whitespace-pre-line"
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
