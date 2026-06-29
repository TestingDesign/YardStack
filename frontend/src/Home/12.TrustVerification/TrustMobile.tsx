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
  25% { transform: translateY(-4px) rotate(-1deg); }
  75% { transform: translateY(2px) rotate(1deg); }
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
  70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
}
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
  },
};

const CONNECTOR_COLORS = ['#8B5CF6', '#0EA5E9', '#10B981', '#F59E0B'];

export default function TrustMobile() {
  return (
    <section
      id="trust-verification"
      className="relative bg-[#fafafa] overflow-hidden selection:bg-purple-300 selection:text-purple-950 py-16"
    >
      <style>{keyframeStyles}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-[#fafafa] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-transparent to-[#fafafa] pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-300/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" aria-hidden="true" style={{ animation: 'pulseAmbient 12s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-0 w-[250px] h-[250px] bg-amber-300/20 rounded-full blur-[60px] pointer-events-none mix-blend-multiply" aria-hidden="true" style={{ animation: 'pulseAmbient 15s ease-in-out infinite reverse' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="px-5 relative z-10 max-w-[400px] mx-auto"
      >
        <div className="flex flex-col items-center text-center w-full mb-8">
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-[2px] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.3)] ring-1 ring-purple-500/30">
              <ShieldCheck size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-fuchsia-600 to-indigo-600">
              {TRUST_CONTENT.tagline}
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="relative text-[32px] leading-[1.15] font-extrabold text-slate-900 tracking-[-0.02em] mb-4 pb-3 inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600">
              Real People
            </span>{' '}
            & Real Businesses
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-36 h-1.5 pointer-events-none">
              <svg viewBox="0 0 200 12" fill="none" className="w-full h-full text-purple-500/70">
                <path d="M2 8 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[15px] font-medium text-slate-600 leading-relaxed max-w-[360px] mx-auto mt-2">
            {TRUST_CONTENT.description}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xl rounded-[4px] p-4 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] mb-10"
        >
          <div className="w-10 h-10 rounded-[2px] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20" style={{ animation: 'beaconPulse 2.5s infinite' }}>
            <CheckCircle2 size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-slate-900 mb-1">{TRUST_CONTENT.calloutTitle}</h4>
            <p className="text-[12px] font-medium text-slate-500 leading-relaxed">{TRUST_CONTENT.calloutDescription}</p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center mb-10 relative"
        >
          <div className="relative w-full max-w-[320px] h-[350px]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 350" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="orbitGrad1" x1="0" y1="0" x2="320" y2="350">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="orbitGrad2" x1="320" y1="0" x2="0" y2="350">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <g style={{ transformOrigin: 'center', animation: 'orbit 40s linear infinite' }}>
                <circle cx="160" cy="175" r="145" stroke="url(#orbitGrad1)" strokeWidth="1" strokeDasharray="4 6" />
              </g>
              <g style={{ transformOrigin: 'center', animation: 'orbit 30s linear infinite reverse' }}>
                <circle cx="160" cy="175" r="105" stroke="url(#orbitGrad2)" strokeWidth="1.2" strokeDasharray="6 6" />
              </g>

              {[
                { x1: 130, y1: 140, x2: 45, y2: 45, color: CONNECTOR_COLORS[0] },
                { x1: 190, y1: 140, x2: 275, y2: 45, color: CONNECTOR_COLORS[1] },
                { x1: 130, y1: 210, x2: 45, y2: 305, color: CONNECTOR_COLORS[2] },
                { x1: 190, y1: 210, x2: 275, y2: 305, color: CONNECTOR_COLORS[3] },
              ].map((line, i) => (
                <g key={i}>
                  <line
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke={line.color}
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.3"
                    style={{ strokeDashoffset: 150, animation: `dashDraw 2s cubic-bezier(0.16, 1, 0.3, 1) ${1 + i * 0.2}s forwards` }}
                  />
                  <circle cx={line.x2} cy={line.y2} r="3" fill={line.color} opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                </g>
              ))}
            </svg>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {/* Scaled down central shield slightly to give breathing room */}
              <div className="relative w-[115px] h-[135px] drop-shadow-[0_15px_30px_rgba(107,33,168,0.25)]">
                <svg viewBox="0 0 200 230" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="mShieldBase" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4c1d95" />
                      <stop offset="50%" stopColor="#3b0764" />
                      <stop offset="100%" stopColor="#2e1065" />
                    </linearGradient>
                    <linearGradient id="mShieldEdge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d8b4fe" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>
                    <radialGradient id="mShieldGlow" cx="50%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M100 10 L190 45 L190 120 C190 180 100 220 100 220 C100 220 10 180 10 120 L10 45 Z"
                    fill="url(#mShieldBase)"
                    stroke="url(#mShieldEdge)"
                    strokeWidth="3"
                  />
                  <path
                    d="M100 10 L190 45 L190 120 C190 180 100 220 100 220 C100 220 10 180 10 120 L10 45 Z"
                    fill="url(#mShieldGlow)"
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
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.6 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={logoPng} 
                      alt="Logo" 
                      className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]" 
                    />
                  </motion.div>
                </div>

                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-20 w-[90%]">
                  <div className="relative px-1.5 py-1.5 rounded-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.5)] border border-amber-300/50 flex justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmerText_2.5s_infinite]" />
                    <span className="relative z-10 text-[7px] font-black tracking-[0.2em] text-amber-950 uppercase whitespace-nowrap">
                      {TRUST_CONTENT.shieldText}
                    </span>
                  </div>
                </div>

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      whileInView={{ scale: 1, opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.8 + i * 0.1 }}
                    >
                      <Star
                        size={i === 1 ? 20 : 14}
                        className="text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {VERIFICATION_METHODS.map((method, i) => {
              const Icon = method.icon;
              
              // Use left/right appropriately so elements anchor to the edges and expand inward,
              // or wrap safely using the max-w added below.
              const positions: Record<string, any> = {
                'top-left': { top: '0%', left: '-2%' },
                'top-right': { top: '0%', right: '-2%' },
                'bottom-left': { bottom: '0%', left: '-2%' },
                'bottom-right': { bottom: '0%', right: '-2%' },
              };
              const pos = positions[method.position];

              return (
                <motion.div
                  key={method.id}
                  initial={{ scale: 0.5, opacity: 0, y: 15 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.7 + i * 0.1 }}
                  className="absolute z-30 group"
                  style={{ 
                    ...(pos.top !== undefined && { top: pos.top }),
                    ...(pos.bottom !== undefined && { bottom: pos.bottom }),
                    ...(pos.left !== undefined && { left: pos.left }),
                    ...(pos.right !== undefined && { right: pos.right }),
                  }}
                >
                  <div
                    className="flex flex-col items-center gap-1.5 cursor-default"
                    style={{ animation: `float ${4 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-[4px] bg-white blur-md opacity-50" />
                      <div
                        className="relative w-[52px] h-[52px] rounded-[4px] flex items-center justify-center bg-white/80 backdrop-blur-md"
                        style={{
                          border: `1px solid ${method.color}40`,
                          boxShadow: `0 8px 20px -5px ${method.glowColor}50, inset 0 2px 8px rgba(255,255,255,1)`,
                        }}
                      >
                        <div 
                          className="absolute inset-0 rounded-[4px] opacity-10"
                          style={{ background: `linear-gradient(135deg, ${method.bgFrom}, ${method.bgTo})` }}
                        />
                        <Icon size={22} style={{ color: method.color }} strokeWidth={2} className="relative z-10" />
                      </div>
                    </div>
                    <div className="text-center bg-white/80 backdrop-blur-md px-1.5 py-1 rounded-[2px] border border-white/60 shadow-sm mt-0.5 max-w-[85px]">
                      <p className="text-[11px] font-extrabold text-slate-900 leading-tight mb-0.5 whitespace-normal">{method.label}</p>
{/*                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-tight whitespace-normal">{method.description}</p> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-[16px] font-extrabold text-slate-900 tracking-[-0.01em] leading-snug">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-600 to-amber-600">
              {TRUST_CONTENT.bottomTagline}
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}