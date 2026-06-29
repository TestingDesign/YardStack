import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import logoPng from '../12.TrustVerification/NLogo.png';
import { TRUST_CONTENT, VERIFICATION_METHODS } from './data';

const keyframeStyles = `
@keyframes pulseAmbient {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.05); opacity: 0.6; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(-1deg); }
  75% { transform: translateY(4px) rotate(1deg); }
}
@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes dashDraw {
  to { stroke-dashoffset: 0; }
}
@keyframes shimmerText {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes beaconPulse {
  0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(168, 85, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
}
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  },
};

const CONNECTOR_COLORS = ['#8B5CF6', '#0EA5E9', '#10B981', '#F59E0B'];

export default function TrustDesktop() {
  return (
    <section
      id="trust-verification"
      className="relative bg-[#fafafa] overflow-hidden selection:bg-purple-300 selection:text-purple-950 py-16 lg:py-16"
    >
      <style>{keyframeStyles}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-[#fafafa] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-transparent to-[#fafafa] pointer-events-none" />

      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-purple-300/20 rounded-full blur-[140px] pointer-events-none mix-blend-multiply" aria-hidden="true" style={{ animation: 'pulseAmbient 12s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" aria-hidden="true" style={{ animation: 'pulseAmbient 15s ease-in-out infinite reverse' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-[1280px] mx-auto px-6 lg:px-4 relative z-10"
      >
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[2px] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] ring-1 ring-purple-500/30">
              <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-black uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-fuchsia-600 to-indigo-600">
              {TRUST_CONTENT.tagline}
            </span>
          </motion.div>

        <motion.h2 variants={fadeUp} className="relative text-[42px] lg:text-[54px] leading-[1.1] font-extrabold text-slate-900 tracking-[-0.02em] mb-6 pb-3 inline-block">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600">
    Real
  </span>
  {' '}People &{' '}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600">
    Real
  </span>
  {' '}Businesses
  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-44 h-1.5 pointer-events-none">
    <svg viewBox="0 0 200 12" fill="none" className="w-full h-full text-purple-500/70">
      <path d="M2 8 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
</motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed max-w-[620px] font-medium">
            {TRUST_CONTENT.description}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full">
          <div className="flex-1 max-w-[480px]">
            <motion.h3
              variants={fadeUp}
              className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5 text-left"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-600 to-amber-600">
                Your verification. Your choice.
                <br />
                More confidence in every connection.
              </span>
            </motion.h3>

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-5 bg-white/70 backdrop-blur-xl rounded-[4px] p-6 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.08)] transition-shadow duration-500"
            >
              <div className="w-12 h-12 rounded-[2px] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20" style={{ animation: 'beaconPulse 2.5s infinite' }}>
                <CheckCircle2 size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{TRUST_CONTENT.calloutTitle}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{TRUST_CONTENT.calloutDescription}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex-1 flex items-center justify-center relative"
          >
            <div className="relative w-[480px] h-[480px] lg:w-[600px] lg:h-[600px]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="orbitGrad1" x1="0" y1="0" x2="600" y2="600">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="orbitGrad2" x1="600" y1="0" x2="0" y2="600">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                <g style={{ transformOrigin: 'center', animation: 'orbit 40s linear infinite' }}>
                  <circle cx="300" cy="300" r="260" stroke="url(#orbitGrad1)" strokeWidth="1" strokeDasharray="4 8" />
                </g>
                <g style={{ transformOrigin: 'center', animation: 'orbit 30s linear infinite reverse' }}>
                  <circle cx="300" cy="300" r="190" stroke="url(#orbitGrad2)" strokeWidth="1.5" strokeDasharray="8 8" />
                </g>

                {[
                  { x1: 250, y1: 250, x2: 120, y2: 120, color: CONNECTOR_COLORS[0] },
                  { x1: 350, y1: 250, x2: 480, y2: 120, color: CONNECTOR_COLORS[1] },
                  { x1: 250, y1: 350, x2: 120, y2: 480, color: CONNECTOR_COLORS[2] },
                  { x1: 350, y1: 350, x2: 480, y2: 480, color: CONNECTOR_COLORS[3] },
                ].map((line, i) => (
                  <g key={i}>
                    <line
                      x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke={line.color}
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                      opacity="0.3"
                      style={{ strokeDashoffset: 300, animation: `dashDraw 2s cubic-bezier(0.16, 1, 0.3, 1) ${1.5 + i * 0.2}s forwards` }}
                    />
                    <circle cx={line.x2} cy={line.y2} r="4" fill={line.color} opacity="0.8">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                  </g>
                ))}
              </svg>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="relative w-[180px] h-[210px] lg:w-[220px] lg:h-[250px] drop-shadow-[0_20px_40px_rgba(107,33,168,0.25)]">
                  <svg viewBox="0 0 200 230" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="shieldBase" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4c1d95" />
                        <stop offset="50%" stopColor="#3b0764" />
                        <stop offset="100%" stopColor="#2e1065" />
                      </linearGradient>
                      <linearGradient id="shieldEdge" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#7e22ce" />
                      </linearGradient>
                      <radialGradient id="shieldGlow" cx="50%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M100 10 L190 45 L190 120 C190 180 100 220 100 220 C100 220 10 180 10 120 L10 45 Z"
                      fill="url(#shieldBase)"
                      stroke="url(#shieldEdge)"
                      strokeWidth="3"
                    />
                    <path
                      d="M100 10 L190 45 L190 120 C190 180 100 220 100 220 C100 220 10 180 10 120 L10 45 Z"
                      fill="url(#shieldGlow)"
                    />
                    <path
                      d="M100 25 L170 55 L170 115 C170 160 100 195 100 195 C100 195 30 160 30 115 L30 55 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                      strokeOpacity="0.15"
                    />
                  </svg>

                  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[70%] h-[50%] flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src={logoPng} 
                        alt="Logo" 
                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                      />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 z-20 w-[85%]">
                    <div className="relative px-4 py-2 rounded-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-[0_4px_20px_rgba(245,158,11,0.5)] border border-amber-300/50 flex justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmerText_2.5s_infinite]" />
                      <span className="relative z-10 text-[10px] lg:text-[11px] font-black tracking-[0.25em] text-amber-950 uppercase">
                        {TRUST_CONTENT.shieldText}
                      </span>
                    </div>
                  </div>

                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0, y: 15 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 1.2 + i * 0.15 }}
                      >
                        <Star
                          size={i === 1 ? 28 : 20}
                          className="text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {VERIFICATION_METHODS.map((method, i) => {
                const Icon = method.icon;
                const positions: Record<string, { top: string; left: string }> = {
                  'top-left': { top: '5%', left: '5%' },
                  'top-right': { top: '5%', left: '75%' },
                  'bottom-left': { top: '75%', left: '5%' },
                  'bottom-right': { top: '75%', left: '75%' },
                };
                const pos = positions[method.position];

                return (
                  <motion.div
                    key={method.id}
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 1.2 + i * 0.15 }}
                    className="absolute z-30 group"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div
                      className="flex flex-col items-center gap-3 cursor-default"
                      style={{ animation: `float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.3}s` }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-[4px] bg-white blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                        <div
                          className="relative w-[76px] h-[76px] lg:w-[84px] lg:h-[84px] rounded-[4px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 bg-white/80 backdrop-blur-md"
                          style={{
                            border: `1px solid ${method.color}40`,
                            boxShadow: `0 10px 30px -5px ${method.glowColor}50, inset 0 2px 10px rgba(255,255,255,1)`,
                          }}
                        >
                          <div 
                            className="absolute inset-0 rounded-[4px] opacity-10"
                            style={{ background: `linear-gradient(135deg, ${method.bgFrom}, ${method.bgTo})` }}
                          />
                          <Icon size={32} style={{ color: method.color }} strokeWidth={2} className="relative z-10" />
                        </div>
                      </div>
                      <div className="text-center bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-[2px] border border-white/50 shadow-sm">
                        <p className="text-[14px] font-extrabold text-slate-900 leading-none mb-1">{method.label}</p>
                        <p className="text-[11px] font-semibold text-slate-500 ">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  );
}