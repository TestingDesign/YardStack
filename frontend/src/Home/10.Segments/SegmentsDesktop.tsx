import { SEGMENTS_CONTENT, SEGMENTS } from './data';
import { Sparkles } from 'lucide-react';

export default function SegmentsDesktop() {
  // Define positions for the 5 segments (percentages)
  const positions = [
    { left: '50%', top: '12%' }, // 0: Residential (Top)
    { left: '82%', top: '45%' }, // 1: Commercial (Middle Right)
    { left: '18%', top: '45%' }, // 2: Luxury (Middle Left)
    { left: '72%', top: '82%' }, // 3: Investment (Bottom Right)
    { left: '28%', top: '82%' }, // 4: Plotted (Bottom Left)
  ];

  return (
    <section id="segments" className="relative bg-[var(--color-bg-muted)] py-16 lg:py-24 overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={14} className="text-purple-600" />
            {SEGMENTS_CONTENT.tagline}
            <Sparkles size={14} className="text-fuchsia-600" />
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.15] font-extrabold text-[var(--color-text-primary)] max-w-3xl tracking-tight mb-4">
            We serve professionals and companies <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              from every real estate segment
            </span>
          </h2>
          <p className="text-base font-medium text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {SEGMENTS_CONTENT.description}
          </p>
        </div>

        <div className="relative w-full h-[600px] mx-auto">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {positions.map((pos, i) => (
              <g key={`line-${i}`}>
                {/* Dotted Line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={pos.left}
                  y2={pos.top}
                  stroke={SEGMENTS[i].color}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="0.4"
                />
                {/* Dot at the end of the line (near the card) */}
                <circle
                  cx={pos.left}
                  cy={pos.top}
                  r="4"
                  fill={SEGMENTS[i].color}
                />
                {/* Dot in the middle of the line */}
                <circle
                  cx={`calc(50% + (${pos.left} - 50%) * 0.4)`}
                  cy={`calc(50% + (${pos.top} - 50%) * 0.4)`}
                  r="3"
                  fill={SEGMENTS[i].color}
                  opacity="0.8"
                />
              </g>
            ))}
          </svg>

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
            {/* Outer Rings */}
            <div className="absolute w-[280px] h-[280px] rounded-full border border-purple-200/50 bg-white/40 backdrop-blur-sm" />
            <div className="absolute w-[240px] h-[240px] rounded-full border border-purple-200/70 bg-purple-50/50 backdrop-blur-md" />
            
            {/* Inner Dark Circle */}
            <div className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-purple-900 to-[#3b0764] shadow-[0_0_40px_rgba(88,28,135,0.4)] flex flex-col items-center justify-center text-center p-6 text-white border-4 border-white">
              <h3 className="text-3xl font-black tracking-tight mb-1">N4RE</h3>
              <div className="w-8 h-0.5 bg-purple-400/50 mb-2 rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-200 leading-tight">
                One Ecosystem.<br/>Every Connection.
              </p>
            </div>
          </div>

          {/* Segment Cards */}
          {SEGMENTS.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="absolute z-10 w-[260px] bg-white/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
                style={{
                  left: positions[i].left,
                  top: positions[i].top,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: segment.color }}
                >
                  <Icon size={22} color="white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[15px] font-extrabold text-[var(--color-text-primary)] leading-tight mb-1">
                    {segment.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] leading-tight">
                    {segment.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
