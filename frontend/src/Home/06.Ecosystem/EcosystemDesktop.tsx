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
    <section id="ecosystem" className="bg-[#1A1A2E] font-['Outfit',sans-serif] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#D946EF]/70 mb-10">
          BUILT FOR HYDERABAD&apos;S REAL ESTATE ECOSYSTEM
        </p>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[80px] max-w-[90px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/20 transition-all duration-200 backdrop-blur-sm">
                <EcosystemIcon icon={member.icon} color="#C4B5FD" />
              </div>
              <span className="text-[11px] font-medium text-white/60 text-center leading-tight whitespace-pre-line">
                {member.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
