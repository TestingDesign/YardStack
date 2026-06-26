import { useState } from 'react';
import { PlaySquare, MessageCircle, BookOpen, MessageSquare, FileText, Users, ArrowRight, Sparkles } from 'lucide-react';
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data';

const IconRenderer = ({ icon, color, size = 18 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  
  switch (icon) {
    case 'youtube':
      return <PlaySquare {...props} />;
    case 'whatsapp':
      return <MessageCircle {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'book':
      return <BookOpen {...props} />;
    case 'message':
      return <MessageSquare {...props} />;
    case 'file-text':
      return <FileText {...props} />;
    default:
      return null;
  }
};

export default function WhyN4reDesktop() {
  const [activeSolution, setActiveSolution] = useState<number | null>(0);

  return (
    <section 
      id="why-n4re" 
      className="relative bg-[#FAFAFA] py-16 lg:py-24 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16 lg:mb-20 text-center">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4">
            <Sparkles size={14} className="text-purple-600" />
            {WHY_N4RE_CONTENT.subtitle}
            <Sparkles size={14} className="text-fuchsia-600" />
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.15] font-extrabold text-slate-900 max-w-3xl tracking-tight">
            {WHY_N4RE_CONTENT.heading}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              {WHY_N4RE_CONTENT.headingHighlight}
            </span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="rounded-[8px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] relative">
              
              <div className="p-8 lg:p-14 lg:pr-16 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
                    {WHY_N4RE_CONTENT.todayHeader}
                  </p>
                </div>
                
                <ul className="flex flex-col gap-6">
                  {TODAY_PROBLEMS.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="group flex items-start gap-4 p-4 rounded-[4px] transition-all duration-300 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100"
                    >
                      <div 
                        className="w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" 
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <IconRenderer icon={item.icon} color={item.color} size={22} />
                      </div>
                      <span className="font-medium text-slate-600 leading-relaxed mt-1 lg:text-[15px] group-hover:text-slate-900 transition-colors">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />
              
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shadow-inner">
                  <ArrowRight size={22} strokeWidth={2.5} className="text-purple-700" />
                </div>
              </div>

              <div className="border-t border-gray-100 lg:border-t-0 p-8 lg:p-14 lg:pl-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-100/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
                
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-sm font-extrabold uppercase tracking-widest text-slate-900">
                    {WHY_N4RE_CONTENT.n4reHeader}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {N4RE_SOLUTIONS.map((sol, idx) => {
                    const isActive = activeSolution === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => setActiveSolution(isActive ? null : idx)}
                        className={`w-full text-left flex flex-col p-5 rounded-[4px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] border outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                          isActive 
                            ? 'bg-white border-purple-200 shadow-xl shadow-purple-900/5' 
                            : 'bg-transparent border-transparent hover:bg-white/60 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div 
                            className={`w-14 h-14 rounded-[4px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isActive ? 'shadow-md scale-105' : 'shadow-sm'
                            }`}
                            style={{ 
                              backgroundColor: isActive ? sol.color : sol.bgColor,
                              color: isActive ? '#fff' : sol.color 
                            }}
                          >
                            <IconRenderer 
                              icon={sol.icon} 
                              color={isActive ? '#fff' : sol.color} 
                              size={24} 
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 
                              className={`text-base font-extrabold tracking-wide transition-colors duration-300 ${
                                isActive ? 'text-purple-900' : 'text-slate-800'
                              }`}
                            >
                              {sol.pillar}
                            </h3>
                          </div>
                          
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isActive ? 'bg-purple-100 text-purple-700 rotate-90' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </div>
                        </div>
                        
                        <div 
                          className={`grid transition-all duration-300 ease-in-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[15px] leading-relaxed text-slate-600 font-medium pl-[76px] pr-4 pb-2">
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