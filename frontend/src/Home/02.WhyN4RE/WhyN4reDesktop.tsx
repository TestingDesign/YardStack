import { useState } from 'react';
import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ArrowRight, Sparkles } from 'lucide-react';
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
    default: return null;
  }
};

export default function WhyN4reDesktop() {
  const [activeSolutions, setActiveSolutions] = useState<number[]>(N4RE_SOLUTIONS.map((_, i) => i));

  const toggleSolution = (idx: number) => {
    setActiveSolutions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section 
      id="why-n4re" 
      className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-8 lg:py-12"
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12 lg:mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4">
            <Sparkles size={14} className="text-purple-600" aria-hidden="true" />
            {WHY_N4RE_CONTENT.subtitle}
            <Sparkles size={14} className="text-fuchsia-600" aria-hidden="true" />
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-gray-900 max-w-3xl tracking-tight">
            {WHY_N4RE_CONTENT.heading}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-fuchsia-500 drop-shadow-sm">
              {WHY_N4RE_CONTENT.headingHighlight}
            </span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto animate-in zoom-in-95 fade-in duration-700 delay-150 ease-out">
          <div className="rounded-[8px] bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-purple-900/5 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] relative">
              
              <div className="p-6 lg:p-12 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-widest text-gray-500">
                    {WHY_N4RE_CONTENT.todayHeader}
                  </p>
                </div>
                
                <ul className="flex flex-col gap-1.5">
                  {TODAY_PROBLEMS.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="group flex items-start gap-3 p-2.5 rounded-[8px] transition-all duration-300 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100"
                    >
                      <div 
                        className="w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" 
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <IconRenderer icon={item.icon} color={item.color} size={18} />
                      </div>
                      <span className="font-medium text-gray-600 leading-relaxed mt-1.5 lg:text-[14px] group-hover:text-gray-900 transition-colors">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" aria-hidden="true" />
              
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-900 border border-slate-700 shadow-xl shadow-purple-900/10 items-center justify-center" aria-hidden="true">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-inner">
                  <ArrowRight size={16} strokeWidth={2.5} className="text-purple-400" />
                </div>
              </div>

              <div className="border-t border-slate-700 lg:border-t-0 p-6 lg:p-12 relative overflow-hidden bg-slate-900">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <p className="text-sm font-extrabold uppercase tracking-widest text-slate-200">
                    {WHY_N4RE_CONTENT.n4reHeader}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {N4RE_SOLUTIONS.map((sol, idx) => {
                    const isActive = activeSolutions.includes(idx);
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => toggleSolution(idx)}
                        aria-expanded={isActive}
                        className={`group w-full text-left flex flex-col p-4 rounded-[8px] transition-all duration-300 ease-out border outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                          isActive 
                            ? 'bg-slate-800 border-slate-700 shadow-xl shadow-slate-900/50' 
                            : 'bg-transparent border-transparent hover:bg-slate-800/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className={`w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isActive ? 'shadow-md scale-105' : 'shadow-sm group-hover:scale-105'
                            }`}
                            style={{ 
                              backgroundColor: isActive ? sol.color : sol.bgColor,
                              color: isActive ? '#fff' : sol.color 
                            }}
                          >
                            <IconRenderer 
                              icon={sol.icon} 
                              color={isActive ? '#fff' : sol.color} 
                              size={20} 
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 
                              className={`text-[15px] font-extrabold tracking-wide transition-colors duration-300 ${
                                isActive ? 'text-white' : 'text-slate-200'
                              }`}
                            >
                              {sol.pillar}
                            </h3>
                          </div>
                          
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                              isActive 
                                ? 'bg-slate-700 text-white rotate-90' 
                                : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                            }`}
                          >
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </div>
                        </div>
                        
                        <div 
                          className={`grid transition-all duration-300 ease-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className={`text-[14px] leading-relaxed font-medium  transition-colors duration-300 ${
                              isActive ? 'text-slate-300' : 'text-slate-400'
                            }`}>
                              {sol.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}