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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        border: `1px solid ${pillar.borderColor}`,
        background: pillar.columnBg,
        padding: '20px',
        gap: '12px',
        }}
    >
      <div style={{ marginBottom: '4px' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            margin: '0 0 4px 0',
            color: pillar.color,
          }}
        >
          {pillar.title}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
          {pillar.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            className="group flex flex-col items-start gap-3 p-[14px] rounded-[4px] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
            style={{
              backgroundColor: pillar.cardBg,
              border: `1px solid ${pillar.borderColor}`,
            }}
          >
            <div className="flex-shrink-0 mt-0.5 group-hover:brightness-200 group-hover:grayscale transition-all">
              <ModuleIcon name={mod.name} color={pillar.color} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[13px] font-extrabold text-white m-0 transition-colors">
                  {mod.name}
                </h4>
              </div>
              <p className="text-[12px] text-gray-400 leading-[1.5] m-0 mb-1 font-medium group-hover:text-white/90 transition-colors">
                {mod.description}
              </p>
              {mod.comingSoon && (
                <span className="text-[10px] font-bold text-gray-500 opacity-70 group-hover:text-white/70 transition-colors">
                  (Coming Soon)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PillarsMobile() {
  return (
    <section id="pillars" style={{ background: '#0F172A', padding: '32px 0' }}>
      <div style={{ padding: '0 16px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#C084FC',
          margin: '0 0 24px 0',
        }}>
          {PILLARS_HEADING.section}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}