import { Building2, GraduationCap, MonitorPlay, BarChart2, ArrowRight } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 24 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    case 'monitor-play': return <MonitorPlay {...props} />;
    case 'bar-chart-2': return <BarChart2 {...props} />;
    default: return null;
  }
};

export default function ComingSoonMobile() {
  return (
    <section id="coming-soon" style={{ background: '#FFFFFF', padding: '48px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          border: '1px solid rgba(124,58,237,0.1)',
          padding: '24px 16px',
          boxShadow: '0 8px 32px rgba(124,58,237,0.06)',
          marginBottom: '24px',
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 20px 0',
          }}>
            WHAT&apos;S COMING NEXT
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {COMING_SOON_ITEMS.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 12px',
                  borderRadius: '8px',
                  background: 'linear-gradient(160deg, #FFFFFF, rgba(124,58,237,0.02))',
                  border: '1px solid rgba(124,58,237,0.08)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  color: '#FFFFFF',
                  fontSize: '7px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  Soon
                </div>
                
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '8px',
                }}>
                  <ItemIcon icon={item.icon} color={item.color} size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontSize: '9px', color: '#6B7280', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #1A1B2E 0%, #2e1065 40%, #6b21a8 100%)',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
          boxShadow: '0 16px 32px rgba(107,33,168,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <h3 style={{
            fontSize: '22px',
            lineHeight: 1.2,
            fontWeight: 800,
            color: '#FFFFFF',
            margin: 0,
            position: 'relative',
            letterSpacing: '-0.02em',
          }}>
            Join Hyderabad&apos;s<br />
            <span style={{
              background: 'linear-gradient(135deg, #C4B5FD, #F9A8D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Real Estate Ecosystem
            </span>
          </h3>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            position: 'relative',
          }}>
            Learn from experts. Connect with professionals. Discover opportunities.
          </p>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '8px',
            background: '#FFFFFF',
            color: '#6B21A8',
            fontSize: '13px',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
            width: '100%',
          }}>
            Join N4RE Today
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
