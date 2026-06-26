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

export default function PlatformPreviewDesktop() {
  return (
    <section id="platform-preview" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F7FC 100%)',
      padding: '80px 0',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <p className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 40px',
        }}>
          A GLIMPSE OF WHAT YOU&apos;LL DISCOVER
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {PREVIEW_SECTIONS.map((section, si) => (
            <div
              key={section.key}
              className={`ys-fade-in-up ys-stagger-${si + 1}`}
              style={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid rgba(124,58,237,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(124,58,237,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#1A1A2E',
                  margin: 0,
                  background: section.key === 'spotlight' ? 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.05))' : 'transparent',
                  padding: section.key === 'spotlight' ? '5px 10px' : '0',
                  borderRadius: section.key === 'spotlight' ? '4px' : '0',
                }}>
                  {section.title}
                </h3>
                <button className="flex items-center gap-0.5 text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899] border-none cursor-pointer transition-all hover:bg-clip-border hover:text-white hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] px-2 py-1 rounded-[4px]">
                  {section.viewAllLabel}
                  <ChevronRight size={14} className="text-[#EC4899] hover:text-white" />
                </button>
              </div>

              {(section.key === 'spotlight' || section.key === 'red-expert') ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {section.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="group flex flex-col gap-2 cursor-pointer">
                      <div className="aspect-square rounded-[8px] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-all group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary-600)] group-hover:via-purple-600 group-hover:to-[var(--color-primary-600)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] group-hover:-translate-y-px"
                        style={{
                          background: item.gradient || item.logoBg,
                        }}
                      >
                        {item.icon
                          ? <PreviewIcon icon={item.icon} color="#FFFFFF" size={28} />
                          : <span className="text-[18px] font-extrabold text-white">{item.logoText}</span>
                        }
                      </div>
                      <p className="text-[10px] font-semibold text-slate-700 m-0 leading-tight">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : section.key === 'opportunities' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.items.map((item, i) => (
                    <div key={i} className="group flex items-center gap-3 p-3 rounded-[8px] border border-[rgba(234,88,12,0.1)] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
                      style={{
                        backgroundColor: 'rgba(234,88,12,0.03)',
                      }}
                    >
                      <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                        <PreviewIcon icon={item.icon || 'briefcase'} color={item.logoColor || '#EA580C'} size={18} />
                      </div>
                      <span className="text-[11px] font-semibold text-[#1A1A2E] group-hover:text-white transition-colors">{item.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {section.items.slice(0, 6).map((item, i) => (
                    <div key={i} className="group flex flex-col items-center gap-2 p-[12px_8px] text-center rounded-[8px] border border-[rgba(124,58,237,0.08)] transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
                      style={{
                        backgroundColor: 'rgba(124,58,237,0.03)',
                      }}
                    >
                      <div className="group-hover:brightness-0 group-hover:invert transition-all flex items-center justify-center">
                        <PreviewIcon icon={item.icon || 'building'} color="#7C3AED" size={20} />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 leading-tight group-hover:text-white transition-colors">{item.title}</span>
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