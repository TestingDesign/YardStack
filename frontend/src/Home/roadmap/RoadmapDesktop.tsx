import { Building2, Users, User, UserCheck, Megaphone, Monitor, Landmark, Palette, Mic, LineChart, GraduationCap, MonitorPlay, BarChart2 } from 'lucide-react'
import { ECOSYSTEM_MEMBERS, ROADMAP_ITEMS } from './data'

const RoadmapIcon = ({ icon, color, size = 20 }: { icon: string, color: string, size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 }
  switch (icon) {
    case 'building': return <Building2 {...props} />
    case 'users': return <Users {...props} />
    case 'user': return <User {...props} />
    case 'user-circle': return <UserCheck {...props} />
    case 'megaphone': return <Megaphone {...props} />
    case 'monitor': return <Monitor {...props} />
    case 'landmark': return <Landmark {...props} />
    case 'palette': return <Palette {...props} />
    case 'mic': return <Mic {...props} />
    case 'line-chart': return <LineChart {...props} />
    case 'graduation-cap': return <GraduationCap {...props} />
    case 'monitor-play': return <MonitorPlay {...props} />
    case 'bar-chart-2': return <BarChart2 {...props} />
    default: return null
  }
}

export default function RoadmapDesktop() {
  return (
    <section id="roadmap" className="font-['Outfit',sans-serif]">
      {/* Ecosystem Strip */}
      <div className="bg-[#1A1A2E] py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#D946EF]/70 mb-8">
            BUILT FOR HYDERABAD'S REAL ESTATE ECOSYSTEM
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {ECOSYSTEM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 group cursor-default ys-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-transparent flex items-center justify-center group-hover:bg-white/5 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300 shadow-sm">
                  <RoadmapIcon icon={member.icon} color="#9CA3AF" size={24} />
                </div>
                <span className="text-[9px] font-semibold text-white/50 text-center leading-tight whitespace-pre-line group-hover:text-white/80 transition-colors">
                  {member.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap / Coming Soon */}
      <div className="bg-[#F9FAFB] py-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B21A8]/60 mb-3">
            WHAT'S COMING NEXT
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto mt-10">
            {ROADMAP_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ys-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="absolute top-3 left-3 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309]">
                  Coming Soon
                </span>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mt-4"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <RoadmapIcon icon={item.icon} color={item.color} size={28} />
                </div>
                <h3 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0">{item.name}</h3>
                <p className="text-[0.78rem] text-[#6B7280] leading-relaxed m-0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
