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
    <section id="platform-preview" style={{ background: '#FFFFFF', padding: '64px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          margin: '0 0 32px 0',
        }}>
          A GLIMPSE OF WHAT YOU&apos;LL DISCOVER
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {PREVIEW_SECTIONS.map((section) => (
            <div key={section.key} style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(107,33,168,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                   background: section.key === 'spotlight' ? '#F5F3FF' : 'transparent',
                   padding: section.key === 'spotlight' ? '6px 12px' : '0',
                   borderRadius: '20px',
                }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>
                    {section.title}
                  </h3>
                </div>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#6B21A8',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {section.viewAllLabel}
                  <ChevronRight size={14} />
                </button>
              </div>

              {section.key === 'spotlight' || section.key === 'red-expert' ? (
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
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                      }}>
                        {item.icon ? (
                          <PreviewIcon icon={item.icon} color="#FFFFFF" size={28} />
                        ) : (
                          <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{item.logoText}</span>
                        )}
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
                      background: item.logoBg || '#FFF7ED',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(234,88,12,0.1)',
                    }}>
                      <PreviewIcon icon={item.icon || 'briefcase'} color={item.logoColor || '#EA580C'} size={18} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#1A1A2E' }}>
                        {item.title}
                      </span>
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
                      background: '#FFFFFF',
                      border: '1px solid #F3F4F6',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      textAlign: 'center',
                    }}>
                      <PreviewIcon icon={item.icon || 'building'} color="#6B21A8" size={20} />
                      <span style={{ fontSize: '9px', fontWeight: 600, color: '#374151', lineHeight: 1.2 }}>
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