import { 
  Building2, 
  Users, 
  User, 
  UserCheck, 
  Megaphone, 
  Monitor, 
  Landmark, 
  Palette, 
  Mic, 
  LineChart, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { ECOSYSTEM_MEMBERS } from './data';

const EcosystemIcon = ({ icon, className, size = 24 }: { icon: string; className?: string; size?: number }) => {
  const props = { size, className, strokeWidth: 1.5 };
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
    <section 
      id="ecosystem" 
      className="relative bg-slate-50 py-4 lg:py-4 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center pt-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] mb-4">
            <span className="text-purple-800">Built for</span>
            <span className="text-fuchsia-600">Hyderabad's</span>
            <span className="text-purple-800">Real Estate Ecosystem</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {ECOSYSTEM_MEMBERS.map((member, i) => (
            <button
              key={i}
              className="group flex flex-col items-center p-6 rounded-[4px] bg-white/80 backdrop-blur-xl border border-white shadow-lg shadow-purple-900/5 hover:bg-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-500 ease-out hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 animate-in zoom-in-95 fade-in duration-700"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-[4px] bg-purple-50 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-900/20 mb-4 group-hover:scale-105 shrink-0">
                <EcosystemIcon 
                  icon={member.icon} 
                  className="text-purple-700 group-hover:text-white transition-colors duration-500" 
                  size={28} 
                />
              </div>
              
              <span className="text-[13px] font-bold text-gray-900 leading-tight group-hover:text-purple-900 transition-colors duration-300 text-center px-1">
                {member.label}
              </span>

              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out w-full opacity-0 group-hover:opacity-100">
                <div className="overflow-hidden flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mt-4 text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    <span>Explore</span>
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}