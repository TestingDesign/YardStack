import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronDown, Sparkles, Globe, Briefcase, Megaphone } from 'lucide-react';
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data';

const IconRenderer = ({ icon, color, size = 18 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'youtube': return <PlaySquare {...props} />;
    case 'whatsapp': return <MessageCircle {...props} />;
    case 'users': return <Users {...props} />;
    case 'book': return <BookOpen {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'file-text': return <FileText {...props} />;
    case 'globe': return <Globe {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'megaphone': return <Megaphone {...props} />;
    default: return null;
  }
};

export default function WhyN4reMobile() {
  const [activeSolutions, setActiveSolutions] = useState<number[]>(N4RE_SOLUTIONS.map((_, i) => i));

  const toggleSolution = (idx: number) => {
    setActiveSolutions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes floatSubtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-float-subtle {
            animation: floatSubtle 3s ease-in-out infinite;
          }
        `}
      </style>
      <section id="why-n4re" className="relative bg-slate-50 overflow-hidden py-10">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="px-2 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center mb-8 text-center"
          >
            <span className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3 animate-pulse">
              <Sparkles size={12} className="text-purple-600" aria-hidden="true" />
              {WHY_N4RE_CONTENT.subtitle}
              <Sparkles size={12} className="text-fuchsia-600" aria-hidden="true" />
            </span>
            <h2 className="text-[1.35rem] leading-[1.25] font-extrabold text-gray-900 tracking-tight">
              {WHY_N4RE_CONTENT.heading}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-fuchsia-500 drop-shadow-sm">
                {WHY_N4RE_CONTENT.headingHighlight}
              </span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className=" overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500 m-0">
                  {WHY_N4RE_CONTENT.todayHeader}
                </p>
              </div>
              
              <ul className="flex flex-col gap-2 m-0 p-0">
                {TODAY_PROBLEMS.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-3 p-2 rounded-[8px] bg-white/50 border border-transparent transition-all hover:bg-white hover:shadow-sm hover:scale-[1.01]"
                    style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 shadow-sm" 
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <IconRenderer icon={item.icon} color={item.color} size={18} />
                    </div>
                    <span className="font-medium text-gray-600 leading-relaxed mt-1 text-[13px]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-12 flex items-center justify-center ">
              <div className="absolute left-6 right-6 top-1/2 h-px  -translate-y-1/2" />
              <div className="relative z-10 w-10 h-10 rounded-full shadow-sm text-purple-700 flex items-center justify-center animate-bounce">
                <ChevronDown size={20} strokeWidth={2.5} />
              </div>
            </div>

            <div className="p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3 animate-pulse" />
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-float-subtle" />
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-900 m-0">
                  {WHY_N4RE_CONTENT.n4reHeader}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {N4RE_SOLUTIONS.map((sol, idx) => {
                  const isActive = activeSolutions.includes(idx);
                  
                  return (
                    <button 
                      key={idx}
                      onClick={() => toggleSolution(idx)}
                      aria-expanded={isActive}
                      className={`group w-full text-left flex flex-col p-3 rounded-[4px] transition-all duration-300 ease-out border outline-none ${
                        isActive 
                          ? 'bg-slate-800 border-slate-700 shadow-xl shadow-slate-900/50 scale-[1.02] my-1' 
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                      style={{ animationDelay: `${0.6 + (idx * 0.1)}s` }}
                    >
                      <div className="flex items-start gap-3 w-full">
                        
                        <div 
                          className={`w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-500 ${
                            isActive ? 'shadow-md scale-110' : 'shadow-sm group-hover:scale-105'
                          }`}
                          style={{ 
                            backgroundColor: isActive ? sol.color : sol.bgColor,
                            color: isActive ? '#fff' : sol.color 
                          }}
                        >
                          <IconRenderer icon={sol.icon} color={isActive ? '#fff' : sol.color} size={18} />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center min-h-[44px]">
                          <div className="flex items-start justify-between">
                            <h3 className={`text-[13px] font-extrabold tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'} mt-1`}>
                              {sol.pillar}
                            </h3>
                            
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all duration-500 ${
                                isActive ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                              }`}
                            >
                              <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                          
                          <div className={`grid transition-all duration-300 ease-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                              <p className={`text-[12px] leading-snug font-medium mt-1 mb-0 transition-all duration-500 ${isActive ? 'text-slate-300 translate-y-0' : 'text-slate-400 -translate-y-2'}`}>
                                {sol.description}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
