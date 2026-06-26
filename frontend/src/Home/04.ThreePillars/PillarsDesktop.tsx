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

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        border: `1px solid ${pillar.borderColor}`,
        background: pillar.columnBg,
        padding: '24px',
        gap: '16px',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            margin: '0 0 6px 0',
            color: pillar.color,
          }}
        >
          {pillar.title}
        </h3>
        <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>
          {pillar.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '12px',
              background: pillar.cardBg,
              border: `1px solid ${pillar.borderColor}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${pillar.borderColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>
              <ModuleIcon name={mod.name} color={pillar.color} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>
                  {mod.name}
                </h4>
              </div>
              <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.5, margin: '0 0 4px 0', fontWeight: 500 }}>
                {mod.description}
              </p>
              {mod.comingSoon && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#6B7280' }}>
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
    <section id="pillars" style={{ background: '#FFFFFF', padding: '64px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          margin: '0 0 32px 0',
        }}>
          {PILLARS_HEADING.section}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}