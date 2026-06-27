import { useState } from 'react';
import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
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

export default function WhyN4reMobile() {
  const [activeSolutions, setActiveSolutions] = useState<number[]>(N4RE_SOLUTIONS.map((_, i) => i));

  const toggleSolution = (idx: number) => {
    setActiveSolutions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="why-n4re" className="relative bg-slate-50 overflow-hidden py-8">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="px-4 relative z-10">
        <div className="flex flex-col items-center mb-8 text-center ys-fade-in-up">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
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
        </div>

        <div className="rounded-[12px] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500 m-0">
                {WHY_N4RE_CONTENT.todayHeader}
              </p>
            </div>
            
            <ul className="flex flex-col gap-2 m-0 p-0">
              {TODAY_PROBLEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-2 rounded-[8px] bg-white/50 border border-transparent">
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

          <div className="relative h-12 flex items-center justify-center bg-gray-50/50 border-t border-b border-gray-100">
            <div className="absolute left-6 right-6 top-1/2 h-px border-t border-dashed border-gray-200 -translate-y-1/2" />
            <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm text-purple-700 flex items-center justify-center">
              <ChevronDown size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div className="p-6 relative overflow-hidden bg-slate-900">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-200 m-0">
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
                    className={`group w-full text-left flex flex-col p-3 rounded-[8px] transition-all duration-300 ease-out border outline-none ${
                      isActive 
                        ? 'bg-slate-800 border-slate-700 shadow-xl shadow-slate-900/50' 
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-10 h-10 rounded-[4px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive ? 'shadow-md scale-105' : 'shadow-sm'
                        }`}
                        style={{ 
                          backgroundColor: isActive ? sol.color : sol.bgColor,
                          color: isActive ? '#fff' : sol.color 
                        }}
                      >
                        <IconRenderer icon={sol.icon} color={isActive ? '#fff' : sol.color} size={18} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-[13px] font-extrabold tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {sol.pillar}
                        </h3>
                      </div>
                      
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isActive ? 'bg-slate-700 text-white rotate-90' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    <div className={`grid transition-all duration-300 ease-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                      <div className="overflow-hidden">
                        <p className={`text-[12px] leading-relaxed font-medium pl-[52px] pr-2 pb-1 m-0 transition-colors duration-300 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
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
    </section>
  );
}