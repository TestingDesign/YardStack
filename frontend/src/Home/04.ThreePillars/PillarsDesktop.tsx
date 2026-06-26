import { PILLARS_HEADING, PILLARS, type Pillar } from './data';
import { PlayCircle, Mic, GraduationCap, Users, Building2, Briefcase, MonitorPlay, BarChart2 } from 'lucide-react';

const ModuleIcon = ({ name, color }: { name: string; color: string }) => {
  const props = { size: 20, color };
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

function PillarCard({ pillar, stagger }: { pillar: Pillar; stagger: number }) {
  return (
    <div
      className={`ys-fade-in-up ys-stagger-${stagger}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        border: `1px solid ${pillar.borderColor}`,
        background: pillar.columnBg,
        padding: '28px',
        gap: '16px',
        fontFamily: "'Outfit', sans-serif",
        transition: 'box-shadow 0.25s ease',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 32px ${pillar.borderColor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
      }}
    >
      <div style={{ marginBottom: '4px' }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 6px',
          color: pillar.color,
        }}>
          {pillar.title}
        </h3>
        <p style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E', margin: 0, letterSpacing: '-0.01em' }}>
          {pillar.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            className="group flex items-start gap-[14px] p-4 rounded-[8px] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
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
                <h4 className="text-[13px] font-extrabold text-[#1A1A2E] m-0 group-hover:text-white transition-colors">
                  {mod.name}
                </h4>
              </div>
              <p className="text-[12px] text-[#4B5563] leading-[1.5] m-0 mb-1 font-medium group-hover:text-white/90 transition-colors">
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

export default function PillarsDesktop() {
  return (
    <section id="pillars" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F7FC 100%)',
      padding: '80px 0',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <p className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 40px',
        }}>
          {PILLARS_HEADING.section}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.key} pillar={pillar} stagger={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}