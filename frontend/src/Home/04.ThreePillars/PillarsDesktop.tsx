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
        borderRadius: '20px',
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
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${pillar.borderColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
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
              <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.5, margin: '0 0 4px', fontWeight: 500 }}>
                {mod.description}
              </p>
              {mod.comingSoon && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: pillar.color, opacity: 0.7 }}>
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