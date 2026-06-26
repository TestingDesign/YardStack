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
        borderRadius: '16px',
        border: `1px solid ${pillar.borderColor}`,
        background: pillar.columnBg,
        padding: '20px',
        gap: '12px',
        fontFamily: "'Outfit', sans-serif",
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
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>
          {pillar.subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pillar.modules.map((mod, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px',
              borderRadius: '10px',
              background: pillar.cardBg,
              border: `1px solid ${pillar.borderColor}`,
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>
              <ModuleIcon name={mod.name} color={pillar.color} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>
                  {mod.name}
                </h4>
              </div>
              <p style={{ fontSize: '11px', color: '#4B5563', lineHeight: 1.5, margin: '0 0 4px 0', fontWeight: 500 }}>
                {mod.description}
              </p>
              {mod.comingSoon && (
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#6B7280' }}>
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
    <section id="pillars" style={{ background: '#FFFFFF', padding: '48px 0' }}>
      <div style={{ padding: '0 16px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
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