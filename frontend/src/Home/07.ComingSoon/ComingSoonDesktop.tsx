import React from 'react';
import { Building2, GraduationCap, MonitorPlay, BarChart2, ArrowRight, Sparkles } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 26 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    case 'monitor-play': return <MonitorPlay {...props} />;
    case 'bar-chart-2': return <BarChart2 {...props} />;
    default: return null;
  }
};

export default function ComingSoonDesktop() {
  return (
    <section 
      id="coming-soon" 
      className="relative bg-[#FAFAFA] py-24 lg:py-32 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-stretch">
          
          <div className="flex flex-col p-8 lg:p-10 rounded-[32px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
              <Sparkles size={16} className="text-purple-600" />
              <p className="text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600">
                What's Coming Next
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 h-full">
              {COMING_SOON_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1 hover:border-purple-200 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-gradient-to-r from-purple-100 to-pink-100 group-hover:from-white/20 group-hover:to-white/20 text-purple-700 group-hover:text-white text-[9px] font-black uppercase tracking-wider rounded-md transition-colors duration-300">
                    Soon
                  </span>

                  <div 
                    className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl mt-4 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                    style={{ 
                      backgroundColor: item.bgColor,
                      boxShadow: `0 8px 24px ${item.color}15`
                    }}
                  >
                    <ItemIcon icon={item.icon} color={item.color} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-purple-100 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}