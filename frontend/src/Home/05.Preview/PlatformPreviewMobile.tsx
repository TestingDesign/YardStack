import { ChevronRight, PlayCircle, Briefcase, Users, Handshake, Megaphone, Building2, Landmark, Monitor, Palette } from 'lucide-react';
import { PREVIEW_SECTIONS } from './data';

const PreviewIcon = ({ icon, color, size = 16 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color };
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

export default function PlatformPreviewMobile() {
  return (
    <section id="platform-preview" style={{ background: '#FFFFFF', padding: '48px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '0 16px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          margin: '0 0 24px 0',
        }}>
          A GLIMPSE OF WHAT YOU&apos;LL DISCOVER
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PREVIEW_SECTIONS.map((section) => (
            <div key={section.key} style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid rgba(124,58,237,0.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#1A1A2E',
                  margin: 0,
                  background: section.key === 'spotlight' ? 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.05))' : 'transparent',
                  padding: section.key === 'spotlight' ? '4px 8px' : '0',
                  borderRadius: section.key === 'spotlight' ? '4px' : '0',
                }}>
                  {section.title}
                </h3>
                <button className="flex items-center gap-0.5 text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899] border-none cursor-pointer transition-all hover:bg-clip-border hover:text-white hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] px-2 py-1 rounded-[4px] bg-transparent">
                  {section.viewAllLabel}
                  <ChevronRight size={12} className="text-[#EC4899] hover:text-white" />
                </button>
              </div>

              {(section.key === 'spotlight' || section.key === 'red-expert') ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {section.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="group flex flex-col gap-1.5 cursor-pointer">
                      <div className="aspect-square rounded-[4px] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-all group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary-600)] group-hover:via-purple-600 group-hover:to-[var(--color-primary-600)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] group-hover:-translate-y-px"
                        style={{
                          background: item.gradient || item.logoBg,
                        }}
                      >
                        {item.icon
                          ? <PreviewIcon icon={item.icon} color="#FFFFFF" size={24} />
                          : <span className="text-[14px] font-extrabold text-white">{item.logoText}</span>
                        }
                      </div>
                      <p className="text-[9px] font-semibold text-slate-700 m-0 leading-tight">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : section.key === 'opportunities' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {section.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="group flex items-center gap-2.5 p-2.5 rounded-[4px] border border-[rgba(234,88,12,0.1)] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
                      style={{
                        background: 'rgba(234,88,12,0.03)',
                      }}
                    >
                      <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                        <PreviewIcon icon={item.icon || 'briefcase'} color={item.logoColor || '#EA580C'} size={16} />
                      </div>
                      <span className="text-[10px] font-semibold text-[#1A1A2E] group-hover:text-white transition-colors">{item.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {section.items.slice(0, 6).map((item, i) => (
                    <div key={i} className="group flex flex-col items-center gap-1.5 p-[10px_6px] text-center rounded-[4px] border border-[rgba(124,58,237,0.06)] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
                      style={{
                        backgroundColor: 'rgba(124,58,237,0.02)',
                      }}
                    >
                      <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                        <PreviewIcon icon={item.icon || 'building'} color="#6B21A8" size={18} />
                      </div>
                      <span className="text-[8px] font-semibold text-slate-700 leading-tight group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}