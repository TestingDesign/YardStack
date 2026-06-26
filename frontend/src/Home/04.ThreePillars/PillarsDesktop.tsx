import { useState } from 'react';
import { PILLARS_HEADING, PILLARS, type Pillar } from './data';
import { 
  PlayCircle, 
  Mic, 
  GraduationCap, 
  Users, 
  Building2, 
  Briefcase, 
  MonitorPlay, 
  BarChart2,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const ModuleIcon = ({ name, color, isActive }: { name: string; color: string; isActive: boolean }) => {
  const props = { 
    size: 18, 
    strokeWidth: isActive ? 2 : 1.5,
    className: `transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`
  };
  
  const iconColor = isActive ? color : '#94A3B8';

  switch (name) {
    case 'Spotlight': return <PlayCircle {...props} color={iconColor} />;
    case 'RED Expert': return <Mic {...props} color={iconColor} />;
    case 'Learn': return <GraduationCap {...props} color={iconColor} />;
    case 'Directory': return <Users {...props} color={iconColor} />;
    case 'City Inventory': return <Building2 {...props} color={iconColor} />;
    case 'Opportunities': return <Briefcase {...props} color={iconColor} />;
    case 'Showcase': return <MonitorPlay {...props} color={iconColor} />;
    case 'Polls & Surveys': return <BarChart2 {...props} color={iconColor} />;
    default: return <PlayCircle {...props} color={iconColor} />;
  }
};

function PillarCard({ pillar }: { pillar: Pillar }) {
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);

  return (
    <div 
      className="group relative flex flex-col rounded-[24px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 p-6 lg:p-8"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-80"
        style={{ background: pillar.color }}
      />

      <div className="mb-6">
        <h3 
          className="text-xs font-black uppercase tracking-[0.2em] mb-2"
          style={{ color: pillar.color }}
        >
          {pillar.title}
        </h3>
        <p className="text-xl lg:text-[22px] font-extrabold text-[var(--color-text-primary)] leading-snug tracking-tight">
          {pillar.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {pillar.modules.map((mod, i) => {
          const isActive = activeModuleIdx === i;
          
          return (
            <div 
              key={i}
              className={`rounded-xl transition-all duration-300 border outline-none focus-within:ring-2 focus-within:ring-purple-500/20 ${
                isActive 
                  ? 'bg-gray-50/80 border-[var(--color-border-default)] shadow-sm' 
                  : 'bg-transparent border-transparent hover:bg-gray-50/50'
              }`}
            >
              <button
                onClick={() => setActiveModuleIdx(isActive ? null : i)}
                className="w-full flex items-center justify-between p-3 text-left outline-none"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-white shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    <ModuleIcon name={mod.name} color={pillar.color} isActive={isActive} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <h4 
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {mod.name}
                    </h4>
                    {mod.comingSoon && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">
                        Soon
                      </span>
                    )}
                  </div>
                </div>

                <ChevronDown 
                  size={16} 
                  className={`text-[var(--color-text-muted)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive ? 'rotate-180 text-[var(--color-text-secondary)]' : 'rotate-0'
                  }`} 
                />
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-[60px] pr-4 pb-4 text-sm leading-relaxed text-[var(--color-text-secondary)] font-medium">
                    {mod.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PillarsDesktop() {
  return (
    <section 
      id="pillars" 
      className="relative bg-[var(--color-bg-muted)] py-10 lg:py-16 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-10 lg:mb-12 text-center">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={14} className="text-purple-600" />
            {PILLARS_HEADING.section}
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.15] font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Built on Core Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}