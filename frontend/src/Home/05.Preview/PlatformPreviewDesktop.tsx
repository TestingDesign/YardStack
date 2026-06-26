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
                borderRadius: '20px',
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
                  borderRadius: section.key === 'spotlight' ? '999px' : '0',
                }}>
                  {section.title}
                </h3>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {section.viewAllLabel}
                  <ChevronRight size={14} style={{ color: '#EC4899' }} />
                </button>
              </div>

              {(section.key === 'spotlight' || section.key === 'red-expert') ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {section.items.slice(0, 3).map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{
                        aspectRatio: '1',
                        borderRadius: '12px',
                        background: item.gradient || item.logoBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                        transition: 'transform 0.2s ease',
                      }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                      >
                        {item.icon
                          ? <PreviewIcon icon={item.icon} color="#FFFFFF" size={28} />
                          : <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{item.logoText}</span>
                        }
                      </div>
                      <p style={{ fontSize: '10px', fontWeight: 600, color: '#374151', margin: 0, lineHeight: 1.3 }}>
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : section.key === 'opportunities' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'linear-gradient(135deg, rgba(234,88,12,0.06), rgba(234,88,12,0.03))',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(234,88,12,0.1)',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(234,88,12,0.1), rgba(234,88,12,0.06))'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(234,88,12,0.06), rgba(234,88,12,0.03))'; }}
                    >
                      <PreviewIcon icon={item.icon || 'briefcase'} color={item.logoColor || '#EA580C'} size={18} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#1A1A2E' }}>{item.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {section.items.slice(0, 6).map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(124,58,237,0.03)',
                      border: '1px solid rgba(124,58,237,0.08)',
                      borderRadius: '8px',
                      padding: '12px 8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.2)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.08)'; }}
                    >
                      <PreviewIcon icon={item.icon || 'building'} color="#7C3AED" size={20} />
                      <span style={{ fontSize: '9px', fontWeight: 700, color: '#374151', lineHeight: 1.2 }}>{item.title}</span>
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