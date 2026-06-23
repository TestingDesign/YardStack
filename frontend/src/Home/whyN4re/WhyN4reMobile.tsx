import { PlaySquare, MessageCircle, Briefcase, BookOpen, MessageSquare, FileText, Users, ArrowDown } from 'lucide-react'
import { WHY_N4RE_CONTENT, TODAY_PROBLEMS, N4RE_SOLUTIONS } from './data'

const IconRenderer = ({ icon, color }: { icon: string, color: string }) => {
  const props = { size: 16, color }
  switch (icon) {
    case 'youtube': return <PlaySquare {...props} />
    case 'whatsapp': return <MessageCircle {...props} />
    case 'briefcase': return <Briefcase {...props} />
    case 'book': return <BookOpen {...props} />
    case 'message': return <MessageSquare {...props} />
    case 'file-text': return <FileText size={18} color={color} />
    case 'users': return <Users size={18} color={color} />
    case 'message-circle': return <MessageCircle size={18} color={color} />
    default: return null
  }
}

export default function WhyN4reMobile() {
  return (
    <section id="why-n4re" className="bg-[#F9FAFB] font-['Outfit',sans-serif] py-10 relative overflow-hidden">
      <div className="px-4 relative z-10">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-2">
          WHY N4RE?
        </p>

        <h2 className="text-center text-[1.35rem] leading-[1.25] font-extrabold text-[#1A1A2E] mb-8">
          {WHY_N4RE_CONTENT.heading}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B21A8] to-[#D946EF]">
            {WHY_N4RE_CONTENT.headingHighlight}
          </span>
        </h2>

        <div className="relative flex flex-col bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#EF4444] m-0">
                TODAY — EVERYTHING IS DISCONNECTED
              </p>
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {TODAY_PROBLEMS.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[0.82rem] text-[#4B5563]">
                  <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <IconRenderer icon={item.icon} color={item.color} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative border-t border-gray-100">
            <div className="absolute left-1/2 -top-4 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#6B21A8] text-white shadow-[0_2px_10px_rgba(107,33,168,0.3)] flex items-center justify-center">
              <ArrowDown size={16} />
            </div>
          </div>

          <div className="p-5 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#22C55E] m-0">
                N4RE BRINGS IT TOGETHER
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {N4RE_SOLUTIONS.map((sol, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${sol.color}15` }}
                  >
                    <IconRenderer icon={sol.icon} color={sol.color} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider m-0 mb-0.5" style={{ color: sol.color }}>
                      {sol.pillar}
                    </p>
                    <p className="text-[0.8rem] text-[#4B5563] leading-relaxed m-0 font-medium">
                      {sol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
