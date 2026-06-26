
import { Building2, Users, User, UserCheck, Megaphone, Monitor, Landmark, Palette, Mic, LineChart, GraduationCap } from 'lucide-react';
import AnimatedCity from '../01.Hero/AnimatedCity';
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
    <section id="ecosystem" style={{ background: '#FFFFFF', padding: '32px 0' }}>
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
          BUILT FOR <AnimatedCity suffix="'s" /> REAL ESTATE ECOSYSTEM
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.03) 0%, rgba(236,72,153,0.03) 100%)',
          border: '1px solid rgba(124,58,237,0.08)',
          borderRadius: '8px',
          padding: '32px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px 8px',
        }}>
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="group flex flex-col items-center gap-2 text-center cursor-pointer transition-all"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-[2px] bg-transparent transition-all group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary-600)] group-hover:via-purple-600 group-hover:to-[var(--color-primary-600)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] group-hover:-translate-y-px">
                <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                  <EcosystemIcon icon={member.icon} color="#6B21A8" size={24} />
                </div>
              </div>
              <span className="text-[9px] font-bold text-[var(--color-text-primary)] leading-tight whitespace-pre-line group-hover:text-purple-800 transition-colors">
                {member.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
