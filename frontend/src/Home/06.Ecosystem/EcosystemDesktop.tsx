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
          borderRadius: '8px',
          padding: '48px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
        }}>
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className={`ys-fade-in-up ys-stagger-${(i % 6) + 1} group flex flex-col items-center gap-3 min-w-[85px] max-w-[100px] text-center cursor-pointer transition-all`}
            >
              <div className="eco-icon flex items-center justify-center w-14 h-14 rounded-[8px] bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.1)] transition-all group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary-600)] group-hover:via-purple-600 group-hover:to-[var(--color-primary-600)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] group-hover:-translate-y-px">
                <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                  <EcosystemIcon icon={member.icon} color="#7C3AED" size={28} />
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 leading-tight whitespace-pre-line group-hover:text-purple-800 transition-colors">
                {member.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
