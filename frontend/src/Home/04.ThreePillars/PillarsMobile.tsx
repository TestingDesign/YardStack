import { PILLARS_HEADING, PILLARS, type Pillar } from './data';
import { PlayCircle, Mic, GraduationCap, Users, Building2, Briefcase, MonitorPlay, BarChart2 } from 'lucide-react';

const ModuleIcon = ({ name, color }: { name: string; color: string }) => {
  const props = { size: 16, color };
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
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-4 last:mb-0">
      <div
        className="px-4 py-3.5"
        style={{ borderBottom: `3px solid ${pillar.borderColor}` }}
      >
        <p
          className="text-[10px] font-extrabold uppercase tracking-[0.15em] m-0 mb-0.5"
          style={{ color: pillar.color }}
        >
          {pillar.title}
        </p>
        <p className="text-[0.8rem] font-semibold text-[#374151] m-0 italic">
          {pillar.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-0 flex-1">
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            className={`px-4 py-3 flex gap-2.5 ${i < pillar.modules.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <div className="shrink-0 mt-0.5">
              <ModuleIcon name={mod.name} color={pillar.color} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[0.82rem] font-bold text-[#1A1A2E] m-0">
                  {mod.name}
                </h4>
                {mod.comingSoon && (
                  <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-[1px] rounded-full bg-[#FEF3C7] text-[#B45309]">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-[0.75rem] text-[#6B7280] leading-relaxed m-0">
                {mod.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PillarsMobile() {
  return (
    <section id="pillars" className="bg-white font-['Outfit',sans-serif] py-10">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-2">
          {PILLARS_HEADING.section}
        </p>
        <h2 className="text-center text-[1.25rem] leading-[1.25] font-extrabold text-[#1A1A2E] mb-8">
          {PILLARS_HEADING.tagline}
        </h2>

        <div className="flex flex-col gap-4">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}