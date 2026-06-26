import { Building2, Users, User, UserCheck, Megaphone, Monitor, Landmark, Palette, Mic, LineChart, GraduationCap } from 'lucide-react';
import { ECOSYSTEM_MEMBERS } from './data';

const EcosystemIcon = ({ icon, color, size = 24 }: { icon: string; color: string; size?: number }) => {
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

export default function EcosystemMobile() {
  return (
    <section id="ecosystem" style={{ background: '#FFFFFF', padding: '48px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '0 16px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          margin: '0 0 20px 0',
        }}>
          BUILT FOR HYDERABAD&apos;S REAL ESTATE ECOSYSTEM
        </p>

        <div style={{
          background: '#FCFAFF',
          border: '1px solid rgba(107,33,168,0.06)',
          borderRadius: '20px',
          padding: '24px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
        }}>
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                width: 'calc(33.333% - 16px)',
                minWidth: '70px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <EcosystemIcon icon={member.icon} color="#6B21A8" size={24} />
              </div>
              <span style={{
                fontSize: '9px',
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
