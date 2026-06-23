import { ChevronRight, PlayCircle, Briefcase, Users, Handshake, Megaphone, Building2, Landmark, Monitor, Palette } from 'lucide-react'
import { PREVIEW_SECTIONS } from './data'

const PreviewIcon = ({ icon, color }: { icon: string, color: string }) => {
  const props = { size: 14, color }
  switch (icon) {
    case 'play': return <PlayCircle {...props} />
    case 'briefcase': return <Briefcase {...props} />
    case 'users': return <Users {...props} />
    case 'handshake': return <Handshake {...props} />
    case 'megaphone': return <Megaphone {...props} />
    case 'building': return <Building2 {...props} />
    case 'landmark': return <Landmark {...props} />
    case 'monitor': return <Monitor {...props} />
    case 'palette': return <Palette {...props} />
    default: return null
  }
}

export default function PlatformPreviewMobile() {
  return (
    <section id="platform-preview" className="bg-white font-['Outfit',sans-serif] py-10">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-8">
          A GLIMPSE OF WHAT YOU'LL DISCOVER
        </p>

        <div className="flex flex-col gap-6">
          {PREVIEW_SECTIONS.map((section) => (
            <div key={section.key} className="flex flex-col gap-3">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0">
                  {section.title}
                </h3>
                <button className="flex items-center gap-0.5 text-[10px] font-bold text-[#6B21A8] border-none bg-transparent cursor-pointer">
                  {section.viewAllLabel}
                  <ChevronRight size={12} />
                </button>
              </div>

              {/* Horizontal Scroll for Cards */}
              <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-3 rounded-xl bg-[#F9FAFB] border border-gray-100 min-w-[140px] snap-center"
                  >
                    {item.gradient && item.logoText ? (
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm relative overflow-hidden`}>
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color="#ffffff" />
                        ) : (
                          <span className="text-[8px] font-bold text-white/90">{item.logoText}</span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: item.logoBg }}
                      >
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color={item.logoColor!} />
                        ) : (
                          <span className="text-[12px]">{item.logoText}</span>
                        )}
                      </div>
                    )}
                    <span className="text-[11px] font-semibold text-[#374151] leading-tight mt-1">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
