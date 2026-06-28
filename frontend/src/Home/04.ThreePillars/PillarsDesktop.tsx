import { useState } from 'react';
import { motion } from 'framer-motion';
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
  
  // Uses the Pillar's specific color when active, otherwise defaults to a slate gray
  const iconColor = isActive ? color : '#9ca3af';

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

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col rounded-[8px] bg-slate-800/80 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-purple-900/10 overflow-hidden hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-500 p-6 lg:p-8"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
        style={{ background: pillar.color }}
      />

      <div className="mb-8 mt-2">
        <h3 
          className="text-xs font-black uppercase tracking-[0.2em] mb-3"
          style={{ color: pillar.color }}
        >
          {pillar.title}
        </h3>
        <p className="text-xl lg:text-[22px] font-extrabold text-white leading-snug tracking-tight">
          {pillar.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {pillar.modules.map((mod, i) => {
          const isActive = activeModuleIdx === i;
          
          return (
            <div 
              key={i}
              className={`rounded-[4px] transition-all duration-300 border ${
                isActive 
                  ? 'bg-slate-700/50 border-slate-600 shadow-sm' 
                  : 'bg-transparent border-transparent hover:bg-slate-700/30 hover:border-slate-600'
              } ${mod.comingSoon ? 'opacity-80' : ''}`}
            >
              <button
                onClick={() => !mod.comingSoon && setActiveModuleIdx(isActive ? null : i)}
                aria-expanded={isActive}
                className={`w-full flex items-center justify-between p-3 text-left outline-none rounded-[4px] focus-visible:ring-2 focus-visible:ring-purple-500/50 ${mod.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3.5">
                  <div 
                    className={`flex items-center justify-center w-9 h-9 rounded-[4px] transition-colors duration-300 shrink-0 ${
                      isActive ? 'bg-slate-600 shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    <ModuleIcon name={mod.name} color={pillar.color} isActive={isActive} />
                  </div>
                  
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {mod.name}
                    </h4>
                    {mod.earlyAccess && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-purple-500/20 text-[10px] font-extrabold text-white tracking-wider border border-purple-500/30">
                        Early Access
                      </span>
                    )}
                    {mod.comingSoon && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-slate-700 text-[10px] font-extrabold text-gray-400 tracking-wider">
                        Launching Soon
                      </span>
                    )}
                  </div>
                </div>

                {!mod.comingSoon && (
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-300 ease-out shrink-0 ${
                      isActive ? 'rotate-180 text-gray-300' : 'rotate-0'
                    }`} 
                  />
                )}
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-out ${
                  isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-[62px] pr-4 pb-4 text-[14px] leading-relaxed text-gray-400 font-medium">
                    {mod.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function PillarsDesktop() {
  return (
    <section 
      id="pillars" 
      className="relative bg-slate-900 overflow-hidden selection:bg-purple-500 selection:text-white py-8 lg:py-12"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center mb-12 lg:mb-16 text-center"
        >
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-4">
            <Sparkles size={14} className="text-purple-400" aria-hidden="true" />
            {PILLARS_HEADING.section}
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.2] font-extrabold text-white tracking-tight">
             3 Core Pillars, 8 Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.key} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
