import { SEGMENTS_CONTENT, SEGMENTS } from './data';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from './Logo.png';

export default function SegmentsDesktop() {
  const positions = [
    { left: '25%', top: '25%' },
    { left: '75%', top: '25%' },
    { left: '25%', top: '75%' },
    { left: '75%', top: '75%' },
  ];

  return (
    <section id="segments" className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 pt-8 ">
      <style>{`
        @keyframes float-segment {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
        .animate-float-segment {
          animation: float-segment 6s ease-in-out infinite;
        }
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-dash-flow {
          animation: dash-flow 2s linear infinite;
        }
      `}</style>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center -mb-16 text-center"
        >
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4">
            <Sparkles size={14} className="text-purple-600" aria-hidden="true" />
            {SEGMENTS_CONTENT.tagline}
            <Sparkles size={14} className="text-fuchsia-600" aria-hidden="true" />
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-gray-900 max-w-3xl tracking-tight mb-4">
            We serve professionals and companies <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              from every real estate segment
            </span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="relative w-full h-[600px] mx-auto"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {positions.map((pos, i) => (
              <g key={`line-${i}`}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={pos.left}
                  y2={pos.top}
                  stroke={SEGMENTS[i].color}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="0.4"
                  className="animate-dash-flow"
                />
                <circle
                  cx={pos.left}
                  cy={pos.top}
                  r="4"
                  fill={SEGMENTS[i].color}
                />
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

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
            <div className="absolute w-[280px] h-[280px] rounded-full border border-purple-200/50 bg-white/40 backdrop-blur-sm" />
            <div className="absolute w-[240px] h-[240px] rounded-full border border-purple-200/70 bg-purple-50/50 backdrop-blur-md" />
            
            <div className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-purple-900 to-[#3b0764] shadow-[0_0_40px_rgba(88,28,135,0.4)] flex flex-col items-center justify-center text-center px-4 text-white border-4 border-white">
              <div className="flex flex-col items-center -mt-4">
                <img src={Logo} alt="N4RE Logo" className="w-[350px] h-auto object-contain mb-1.5" draggable={false} />
                {/* <div className="w-8 h-0.5 bg-purple-400/50 mb-1.5 rounded-full" /> */}
              </div>
            </div>
          </div>

          {SEGMENTS.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="absolute z-10 w-[260px] bg-white/90 backdrop-blur-xl rounded-[4px] p-4 flex items-center gap-4 shadow-xl shadow-purple-900/5 border border-white hover:shadow-2xl hover:shadow-purple-900/15 transition-shadow duration-300 group cursor-default animate-float-segment"
                style={{
                  left: positions[i].left,
                  top: positions[i].top,
                  animationDelay: `${i * 1.5}s`,
                }}
              >
                <div 
                  className="w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: segment.color }}
                >
                  <Icon size={22} color="white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[15px] font-extrabold text-gray-900 leading-tight mb-1 transition-colors group-hover:text-purple-900">
                    {segment.title}
                  </h4>
                  {/* <p className="text-[11px] font-semibold text-gray-600 leading-tight">
                    {segment.description}
                  </p> */}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
