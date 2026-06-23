import { PlaySquare, MessageCircle, Briefcase, BookOpen, MessageSquare, FileText, Users, ArrowRight } from 'lucide-react'
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data'

const IconRenderer = ({ icon, color }: { icon: string, color: string }) => {
  const props = { size: 18, color }
  switch (icon) {
    case 'youtube': return <PlaySquare {...props} />
    case 'whatsapp': return <MessageCircle {...props} />
    case 'briefcase': return <Briefcase {...props} />
    case 'book': return <BookOpen {...props} />
    case 'message': return <MessageSquare {...props} />
    case 'file-text': return <FileText size={20} color={color} />
    case 'users': return <Users size={20} color={color} />
    case 'message-circle': return <MessageCircle size={20} color={color} />
    default: return null
  }
}

export default function WhyN4reDesktop() {
  return (
    <section id="why-n4re" className="bg-[#F9FAFB] font-['Outfit',sans-serif] py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B21A8] mb-3">
          WHY N4RE?
        </p>

        <h2 className="text-center text-[1.8rem] lg:text-[2.2rem] leading-[1.2] font-extrabold text-[#1A1A2E] max-w-3xl mx-auto mb-12">
          {WHY_N4RE_CONTENT.heading}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B21A8] to-[#D946EF]">
            {WHY_N4RE_CONTENT.headingHighlight}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 max-w-5xl mx-auto items-center">
          {/* Today - Problems */}
          <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ys-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#EF4444] m-0">
                TODAY — EVERYTHING IS DISCONNECTED
              </p>
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-5">
              {TODAY_PROBLEMS.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3.5 text-[0.92rem] text-[#4B5563] ys-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <IconRenderer icon={item.icon} color={item.color} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow Separator */}
          <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#6B21A8] text-white shadow-lg shrink-0">
            <ArrowRight size={20} />
          </div>

          {/* N4RE - Solutions */}
          <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ys-fade-in-up [animation-delay:100ms]">
            <div className="flex items-center gap-2 mb-6">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#22C55E] m-0">
                N4RE BRINGS IT TOGETHER
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {N4RE_SOLUTIONS.map((sol, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 ys-fade-in"
                  style={{ animationDelay: `${(i + 5) * 60}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${sol.color}15` }}
                  >
                    <IconRenderer icon={sol.icon} color={sol.color} />
                  </div>
                  <div>
                    <p className="text-[13px] font-extrabold uppercase tracking-wider m-0 mb-1" style={{ color: '#1A1A2E' }}>
                      {sol.pillar}
                    </p>
                    <p className="text-[0.9rem] text-[#4B5563] leading-relaxed m-0 font-medium">
                      {sol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 w-full h-[500px] opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 800 400\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0 400V300h50v-50h30v-30h40v80h20v-60h40v-40h30v100h50v-80h40v-20h30v100h60v-40h40v-60h30v100h50v-20h20v-50h40v70h20v-30h40v-70h30v100h40v-40h20v-20h30v60h50v-50h40v50h80V400H0z\' fill=\'%23000\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom' }}></div>
    </section>
  )
}
