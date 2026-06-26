import { ChevronRight, PlayCircle, Briefcase, Users, Handshake, Megaphone, Building2, Landmark, Monitor, Palette } from 'lucide-react';
import { PREVIEW_SECTIONS } from './data';

const PreviewIcon = ({ icon, color }: { icon: string; color: string }) => {
  const props = { size: 16, color };
  switch (icon) {
    case 'play': return <PlayCircle {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'users': return <Users {...props} />;
    case 'handshake': return <Handshake {...props} />;
    case 'megaphone': return <Megaphone {...props} />;
    case 'building': return <Building2 {...props} />;
    case 'landmark': return <Landmark {...props} />;
    case 'monitor': return <Monitor {...props} />;
    case 'palette': return <Palette {...props} />;
    default: return null;
  }
};

export default function PlatformPreviewDesktop() {
  return (
    <section id="platform-preview" className="bg-white font-['Outfit',sans-serif] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B21A8] mb-3">
          A GLIMPSE OF WHAT YOU&apos;LL DISCOVER
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {PREVIEW_SECTIONS.map((section) => (
            <div key={section.key} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[0.82rem] font-bold text-[#1A1A2E] m-0">
                  {section.title}
                </h3>
                <button className="flex items-center gap-0.5 text-[11px] font-semibold text-[#6B21A8] border-none bg-transparent cursor-pointer hover:text-[#5B1D99] transition-colors">
                  {section.viewAllLabel}
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F9FAFB] border border-gray-100 hover:border-[#6B21A8]/15 hover:bg-[#6B21A8]/3 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                  >
                    {item.gradient && item.logoText ? (
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden`}>
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color="#ffffff" />
                        ) : (
                          <span className="text-[9px] font-bold text-white/90">{item.logoText}</span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.logoBg }}
                      >
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color={item.logoColor!} />
                        ) : (
                          <span className="text-[14px]">{item.logoText}</span>
                        )}
                      </div>
                    )}
                    <span className="text-[12px] font-semibold text-[#374151] group-hover:text-[#6B21A8] transition-colors leading-tight">
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
  );
}