import { ArrowRight } from 'lucide-react'
import { HERO_CONTENT, ECOSYSTEM_CATEGORIES } from './data'

const CategoryIcon = ({ icon, size = 24 }: { icon: string; size?: number }) => {
  const s = size
  switch (icon) {
    case 'building':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      )
    case 'users':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    case 'briefcase':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    case 'bank':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="4" height="10"></rect>
          <rect x="16" y="10" width="4" height="10"></rect>
          <polygon points="12 2 2 8 22 8 12 2"></polygon>
          <path d="M2 22h20"></path>
        </svg>
      )
    case 'graduation':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    case 'megaphone':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 11.522v5.42a1.05 1.05 0 0 0 2.1 0v-4.662c1.78.36 3.323.95 4.545 1.57.817.414 1.855-.17 1.855-1.082V4.23c0-.911-1.038-1.496-1.855-1.082-1.846.936-4.225 1.637-7.234 1.83a2.5 2.5 0 1 0-3.41 2.375c.677.292 1.343.518 2 .67z"></path>
        </svg>
      )
    case 'person':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    default:
      return null
  }
}

const ConnectingLine = ({ x1, y1, x2, y2 }: { x1: string; y1: string; x2: string; y2: string }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    style={{ overflow: 'visible' }}
  >
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#6B21A8"
      strokeWidth="1"
      strokeOpacity="0.12"
      strokeDasharray="4 4"
    />
  </svg>
)

export default function HeroDesktop() {
  const lineEndpoints = [
    { x1: '50%', y1: '50%', x2: '50%', y2: '0%' },
    { x1: '50%', y1: '50%', x2: '93%', y2: '25%' },
    { x1: '50%', y1: '50%', x2: '95%', y2: '65%' },
    { x1: '50%', y1: '50%', x2: '70%', y2: '95%' },
    { x1: '50%', y1: '50%', x2: '30%', y2: '95%' },
    { x1: '50%', y1: '50%', x2: '5%', y2: '65%' },
    { x1: '50%', y1: '50%', x2: '10%', y2: '25%' },
  ]

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F8F7FC] font-['Outfit',sans-serif]"
    >
      <div className="absolute bottom-0 left-0 w-full h-[300px] opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 1200 200\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0 200V120h30v-15h20v-10h35v30h15v-25h25v-15h20v40h35v-30h25v-8h20v45h40v-20h30v-25h20v45h35v-10h15v-20h30v30h15v-12h25v-30h20v45h30v-15h15v-8h20v25h35v-20h30v20h60V200H0z\' fill=\'%236B21A8\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          <div className="flex flex-col gap-5 ys-fade-in-up">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#6B21A8] m-0">
              {HERO_CONTENT.tagline}
            </p>

            <h1 className="text-[2.8rem] lg:text-[3.5rem] leading-[1.15] font-extrabold text-[#1A1A2E] m-0 tracking-tight">
              Connecting{' '}
              <span className="text-[#6B21A8]">Hyderabad's</span>
              <br />
              <span className="text-[#6B21A8]">Real Estate</span> Ecosystem
            </h1>

            <p className="text-[1.1rem] leading-relaxed font-semibold text-[#374151] max-w-[500px] m-0 mt-2">
              {HERO_CONTENT.subHeading}
            </p>

            <p className="text-[0.95rem] leading-relaxed text-[#6B7280] max-w-[500px] m-0">
              {HERO_CONTENT.description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <button className="flex items-center justify-center min-w-[160px] px-8 py-3.5 rounded-lg bg-[#6B21A8] text-white text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_14px_rgba(107,33,168,0.35)] hover:bg-[#5B1D99] hover:shadow-[0_6px_20px_rgba(107,33,168,0.45)] hover:-translate-y-0.5 transition-all duration-300">
                {HERO_CONTENT.primaryCta}
              </button>
              <button className="flex items-center justify-center min-w-[160px] gap-2 px-8 py-3.5 rounded-lg bg-white text-[#374151] text-[14px] font-bold border border-gray-200 cursor-pointer hover:border-[#6B21A8]/30 hover:text-[#6B21A8] hover:bg-white transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                {HERO_CONTENT.secondaryCta}
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#6B21A8]/20 to-[#D946EF]/20 shadow-sm">
                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Community member" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1A1A2E]">{HERO_CONTENT.supportingTextBold}</span>
                <span className="text-[12px] font-medium text-[#6B7280]">{HERO_CONTENT.supportingText}</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[500px] lg:h-[600px] w-full">
            <div
              className="absolute w-[420px] h-[420px] rounded-full left-1/2 top-1/2"
              style={{
                transform: 'translate(-50%, -50%)',
                border: '2px dashed rgba(107, 33, 168, 0.15)',
              }}
            />
            <div
              className="absolute w-[280px] h-[280px] rounded-full left-1/2 top-1/2"
              style={{
                transform: 'translate(-50%, -50%)',
                border: '1.5px dashed rgba(107, 33, 168, 0.1)',
              }}
            />

            <div
              className="absolute w-[500px] h-[500px] rounded-full left-1/2 top-1/2 pointer-events-none"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(107, 33, 168, 0.08) 0%, rgba(107, 33, 168, 0.02) 50%, transparent 70%)',
              }}
            />

            {lineEndpoints.map((line, i) => (
              <ConnectingLine key={i} {...line} />
            ))}

            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 bg-[#6B21A8]/25 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(210px)`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 flex items-center justify-center w-[140px] h-[140px] rounded-full shadow-[0_10px_50px_rgba(107,33,168,0.35)] border-[6px] border-white" style={{ transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, #7C3AED 0%, #6B21A8 50%, #5B1D99 100%)' }}>
              <span className="text-white text-[30px] font-extrabold tracking-tight">N4RE</span>
            </div>

            {ECOSYSTEM_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="absolute z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-5 py-4 min-w-[140px] text-center border border-white/80 hover:shadow-[0_12px_40px_rgba(107,33,168,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{
                  top: cat.position.top,
                  left: cat.position.left,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center border border-[#6B21A8]/10">
                  <CategoryIcon icon={cat.icon} />
                </div>
                <span className="text-[11px] font-bold text-[#1A1A2E] leading-tight whitespace-pre-line">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
