import { SEGMENTS_CONTENT, SEGMENTS } from './data';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from './Logo.png';

export default function SegmentsMobile() {
  return (
    <section id="segments" className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-10">
      <style>{`
        @keyframes float-segment {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-segment {
          animation: float-segment 5s ease-in-out infinite;
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
        .animate-dash-flow {
          animation: dash-flow 2s linear infinite;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-2 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={12} className="text-purple-600" />
            {SEGMENTS_CONTENT.tagline}
            <Sparkles size={12} className="text-fuchsia-600" />
          </span>
          <h2 className="text-[26px] leading-[1.2] font-extrabold text-gray-900 tracking-tight mb-3">
            We serve professionals and companies <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              from every real estate segment
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center relative">
          <div className="relative w-full max-w-[240px] aspect-square rounded-full border border-purple-200/50 bg-white/40 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
            <div className="absolute inset-3 rounded-full border border-purple-200/70 bg-purple-50/50 backdrop-blur-md flex items-center justify-center">
              <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-purple-900 to-[#3b0764] shadow-[0_0_30px_rgba(88,28,135,0.4)] flex flex-col items-center justify-center text-center px-3 text-white border-[3px] border-white z-20">
                <div className="flex flex-col items-center -mt-2">
                  <img src={Logo} alt="N4RE Logo" className="w-[85px] h-auto object-contain mb-1" draggable={false} />
                </div>
              </div>
            </div>
            
            <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-12 pointer-events-none z-0 overflow-visible" style={{ transform: 'translateY(100%)' }}>
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" className="animate-dash-flow" />
            </svg>
          </div>

          <div className="flex flex-col gap-4 w-full relative z-10 pt-10">
            <svg className="absolute left-6 top-8 w-2 h-[calc(100%-4rem)] pointer-events-none z-0 overflow-visible">
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" className="animate-dash-flow" />
            </svg>

            {SEGMENTS.map((segment, index) => {
              const Icon = segment.icon;
              return (
                <motion.div 
                  key={segment.id} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="relative w-full pl-[52px]"
                >
                  <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm z-20" style={{ backgroundColor: segment.color }} />
                  
                  <svg className="absolute left-[32px] top-1/2 -translate-y-1/2 w-[20px] h-2 pointer-events-none z-0 overflow-visible">
                     <line x1="0" y1="50%" x2="100%" y2="50%" stroke={segment.color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" className="animate-dash-flow" />
                  </svg>

                  <div
                    className="w-full bg-white/90 backdrop-blur-xl rounded-[4px] p-4 flex items-center gap-4 shadow-xl shadow-purple-900/5 border border-white hover:shadow-2xl hover:shadow-purple-900/15 transition-shadow duration-300 group animate-float-segment"
                    style={{
                      animationDelay: `${index * 0.5}s`
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
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
