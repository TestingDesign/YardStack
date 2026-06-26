import { Building2, Users, User, UserCheck, Megaphone, Monitor, Landmark, Palette, Mic, LineChart, GraduationCap } from 'lucide-react';
import { ECOSYSTEM_MEMBERS } from './data';

const EcosystemIcon = ({ icon, color, size = 20 }: { icon: string; color: string; size?: number }) => {
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
    <section id="ecosystem" className="bg-[#1A1A2E] font-['Outfit',sans-serif] py-8">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#D946EF]/70 mb-6">
          BUILT FOR HYDERABAD&apos;S REAL ESTATE ECOSYSTEM
        </p>
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                <EcosystemIcon icon={member.icon} color="#C4B5FD" size={20} />
              </div>
              <span className="text-[8px] font-medium text-white/60 text-center leading-tight whitespace-pre-line">
                {member.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
