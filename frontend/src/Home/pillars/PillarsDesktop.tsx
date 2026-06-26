import { PILLARS_HEADING, PILLARS, type Pillar } from './data';
import { PlayCircle, Mic, GraduationCap, Users, Building2, Briefcase, MonitorPlay, BarChart2 } from 'lucide-react';

const ModuleIcon = ({ name, color }: { name: string; color: string }) => {
  const props = { size: 18, color };
  switch (name) {
    case 'Spotlight': return <PlayCircle {...props} />;
    case 'RED Expert': return <Mic {...props} />;
    case 'Learn': return <GraduationCap {...props} />;
    case 'Directory': return <Users {...props} />;
    case 'City Inventory': return <Building2 {...props} />;
    case 'Opportunities': return <Briefcase {...props} />;
    case 'Showcase': return <MonitorPlay {...props} />;
    case 'Polls & Surveys': return <BarChart2 {...props} />;
    default: return <PlayCircle {...props} />;
  }
};

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
      <div
        className="px-5 py-4"
        style={{ borderBottom: `3px solid ${pillar.borderColor}` }}
      >
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.15em] m-0 mb-1"
          style={{ color: pillar.color }}
        >
          {pillar.title}
        </p>
        <p className="text-[13px] font-semibold text-[#374151] m-0 italic">
          {pillar.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-0 flex-1">
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            className={`px-5 py-4 flex gap-3 ${i < pillar.modules.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors duration-200`}
          >
            <div className="shrink-0 mt-0.5">
              <ModuleIcon name={mod.name} color={pillar.color} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0">
                  {mod.name}
                </h4>
                {mod.comingSoon && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309]">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-[0.8rem] text-[#6B7280] leading-relaxed m-0 mb-2">
                {mod.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PillarsDesktop() {
  return (
    <section id="pillars" className="bg-white font-['Outfit',sans-serif] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B21A8]/60 mb-3">
          {PILLARS_HEADING.section}
        </p>

        <h2 className="text-center text-[1.8rem] lg:text-[2rem] leading-[1.2] font-extrabold text-[#1A1A2E] mb-12">
          {PILLARS_HEADING.tagline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}