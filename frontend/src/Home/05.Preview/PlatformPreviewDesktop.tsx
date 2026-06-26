import { 
  ChevronRight, 
  PlayCircle, 
  Briefcase, 
  Users, 
  Handshake, 
  Megaphone, 
  Building2, 
  Landmark, 
  Monitor, 
  Palette 
} from 'lucide-react';
import { PREVIEW_SECTIONS } from './data';

const PreviewIcon = ({ icon, color, size = 16 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'play': return <PlayCircle {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'users': return <Users {...props} />;
    case 'handshake': return <Handshake {...props} />;
    case 'megaphone': return <Megaphone {...props} />;
    case 'building': return <Building2 {...props} />;
    case 'landmark': return <Landmark {...props} />;
    case 'monitor': return <Monitor {...props} />;
    case 'palette': return <Palette {...props} />;
    default: return null;
  }
};

export default function PlatformPreviewDesktop() {
  return (
    <section 
      id="platform-preview" 
      className="relative bg-[#FAFAFA] py-16 lg:py-24 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600">
            A Glimpse of What You'll Discover
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PREVIEW_SECTIONS.map((section) => (
            <div
              key={section.key}
              className="group/card flex flex-col gap-6 p-7 rounded-[8px] bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(124,58,237,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              
              <div className="flex items-center justify-between">
                <h3 
                  className={`text-sm font-extrabold text-slate-900 ${
                    section.key === 'spotlight' 
                      ? 'bg-purple-50 text-purple-800 px-3 py-1 rounded-lg border border-purple-100' 
                      : ''
                  }`}
                >
                  {section.title}
                </h3>
                
                <button className="group/btn flex items-center gap-0.5 text-[11px] font-bold text-slate-500 hover:text-purple-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm">
                  {section.viewAllLabel}
                  <ChevronRight size={14} className="text-slate-400 group-hover/btn:text-purple-600 transition-colors" />
                </button>
              </div>

              {(section.key === 'spotlight' || section.key === 'red-expert') ? (
                <div className="grid grid-cols-3 gap-3">
                  {section.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="group/item flex flex-col gap-2.5 cursor-pointer">
                      <div 
                        className="aspect-square rounded-2xl flex items-center justify-center shadow-sm border border-white/20 transition-all duration-300 group-hover/item:-translate-y-1 group-hover/item:shadow-lg group-hover/item:shadow-purple-900/15 group-hover/item:border-transparent group-hover/item:scale-105"
                        style={{ background: item.gradient || item.logoBg }}
                      >
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color="#FFFFFF" size={26} />
                        ) : (
                          <span className="text-xl font-black text-white tracking-tight drop-shadow-sm">
                            {item.logoText}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 m-0 leading-tight text-center group-hover/item:text-purple-700 transition-colors truncate px-1">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>

              ) : section.key === 'opportunities' ? (
                <div className="flex flex-col gap-2.5">
                  {section.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="group/item flex items-center gap-3.5 p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100/50 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-500 hover:border-transparent transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-900/10 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-center transition-all duration-300 group-hover/item:brightness-0 group-hover/item:invert group-hover/item:scale-110">
                        <PreviewIcon icon={item.icon || 'briefcase'} color={item.logoColor || '#EA580C'} size={18} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover/item:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>

              ) : (
                <div className="grid grid-cols-3 gap-2.5">
                  {section.items.slice(0, 6).map((item, i) => (
                    <div 
                      key={i} 
                      className="group/item flex flex-col items-center gap-2 p-3 text-center rounded-2xl bg-purple-50/40 border border-purple-100/50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 hover:border-transparent transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-900/15 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-center transition-all duration-300 group-hover/item:brightness-0 group-hover/item:invert group-hover/item:scale-110">
                        <PreviewIcon icon={item.icon || 'building'} color="#7C3AED" size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 leading-tight group-hover/item:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}