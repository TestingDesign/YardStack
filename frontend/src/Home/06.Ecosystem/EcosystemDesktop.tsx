import { Building2, Users, User, UserCheck, Megaphone, Monitor, Landmark, Palette, Mic, LineChart, GraduationCap } from 'lucide-react';
import { ECOSYSTEM_MEMBERS } from './data';

const EcosystemIcon = ({ icon, color, size = 28 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'users': return <Users {...props} />;
    case 'user': return <User {...props} />;
    case 'user-circle': return <UserCheck {...props} />;
    case 'megaphone': return <Megaphone {...props} />;
    case 'monitor': return <Monitor {...props} />;
    case 'landmark': return <Landmark {...props} />;
    case 'palette': return <Palette {...props} />;
    case 'mic': return <Mic {...props} />;
    case 'line-chart': return <LineChart {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    default: return null;
  }
};

export default function EcosystemDesktop() {
  return (
    <section id="ecosystem" style={{
      background: 'linear-gradient(180deg, #F8F7FC 0%, #FFFFFF 100%)',
      padding: '80px 0',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <p className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 32px',
        }}>
          BUILT FOR HYDERABAD&apos;S REAL ESTATE ECOSYSTEM
        </p>

        <div className="ys-fade-in-up" style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(236,72,153,0.04) 100%)',
          border: '1px solid rgba(124,58,237,0.08)',
          borderRadius: '24px',
          padding: '48px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
        }}>
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className={`ys-fade-in-up ys-stagger-${(i % 6) + 1}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                minWidth: '85px',
                maxWidth: '100px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                const icon = e.currentTarget.querySelector('.eco-icon') as HTMLElement;
                if (icon) icon.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const icon = e.currentTarget.querySelector('.eco-icon') as HTMLElement;
                if (icon) icon.style.background = 'rgba(124,58,237,0.06)';
              }}
            >
              <div className="eco-icon" style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}>
                <EcosystemIcon icon={member.icon} color="#7C3AED" size={28} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#374151',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}>
                {member.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
