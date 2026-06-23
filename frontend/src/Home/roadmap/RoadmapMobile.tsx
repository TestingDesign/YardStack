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

export default function RoadmapMobile() {
  return (
    <section id="roadmap" className="font-['Outfit',sans-serif]">
      {/* Ecosystem Strip */}
      <div className="bg-[#1A1A2E] py-8">
        <div className="px-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#D946EF]/70 mb-6">
            BUILT FOR HYDERABAD'S REAL ESTATE ECOSYSTEM
          </p>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {ECOSYSTEM_MEMBERS.map((member, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 ys-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                  <RoadmapIcon icon={member.icon} color="#9CA3AF" size={20} />
                </div>
                <span className="text-[8px] font-medium text-white/60 text-center leading-tight whitespace-pre-line">
                  {member.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap / Coming Soon */}
      <div className="bg-[#F9FAFB] py-10">
        <div className="px-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8]/60 mb-2">
            WHAT'S COMING NEXT
          </p>

          <div className="flex flex-col gap-3 mt-6">
            {ROADMAP_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ys-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                  <RoadmapIcon icon={item.icon} color={item.color} size={24} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0 mb-0.5">{item.name}</h3>
                  <p className="text-[0.75rem] text-[#6B7280] leading-relaxed m-0 line-clamp-2">{item.description}</p>
                </div>
                <div className="absolute top-0 right-0 bg-[#FEF3C7] text-[#B45309] text-[7px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-xl">
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
