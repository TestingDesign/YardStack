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
          background: '#FCFAFF',
          borderRadius: '20px',
          border: '1px solid rgba(107,33,168,0.06)',
          padding: '24px 16px',
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6B21A8',
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
                  gap: '10px',
                  padding: '16px 12px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                   position: 'absolute',
                   top: '6px',
                   left: '6px',
                   background: '#F5F3FF',
                   color: '#6B21A8',
                   fontSize: '7px',
                   fontWeight: 800,
                   textTransform: 'uppercase',
                   letterSpacing: '0.05em',
                   padding: '3px 6px',
                   borderRadius: '8px',
                }}>
                  Coming Soon
                </div>
                
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '12px',
                }}>
                  <ItemIcon icon={item.icon} color={item.color} size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 4px 0' }}>{item.name}</h3>
                  <p style={{ fontSize: '9px', color: '#6B7280', lineHeight: 1.3, margin: 0, fontWeight: 500 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #2e1065, #4c1d95, #6b21a8)',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(107,33,168,0.2)',
        }}>
          <h3 style={{ fontSize: '22px', lineHeight: 1.2, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Join Hyderabad&apos;s<br />Real Estate Ecosystem
          </h3>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, margin: '0 0 8px 0', fontWeight: 400 }}>
            Learn from experts. Connect with professionals. Discover opportunities. Grow with the ecosystem.
          </p>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '10px',
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
