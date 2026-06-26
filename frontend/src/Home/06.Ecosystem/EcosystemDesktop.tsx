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
    <section id="ecosystem" style={{ background: '#FFFFFF', padding: '64px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          margin: '0 0 24px 0',
        }}>
          BUILT FOR HYDERABAD&apos;S REAL ESTATE ECOSYSTEM
        </p>

        <div style={{
          background: '#FCFAFF',
          border: '1px solid rgba(107,33,168,0.06)',
          borderRadius: '24px',
          padding: '40px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
        }}>
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                minWidth: '85px',
                maxWidth: '95px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <EcosystemIcon icon={member.icon} color="#6B21A8" size={32} />
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
