import { Building2, GraduationCap, MonitorPlay, BarChart2 } from 'lucide-react';
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
    <section id="coming-soon" style={{ background: '#FFFFFF', padding: '32px 0' }}>
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          border: '1px solid rgba(124,58,237,0.1)',
          padding: '20px 14px',
          boxShadow: '0 8px 32px rgba(124,58,237,0.06)',
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
            margin: '0 0 16px 0',
          }}>
            WHAT&apos;S COMING NEXT
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {COMING_SOON_ITEMS.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 10px',
                  borderRadius: '4px',
                  background: 'linear-gradient(160deg, #FFFFFF, rgba(124,58,237,0.02))',
                  border: '1px solid rgba(124,58,237,0.08)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  color: '#FFFFFF',
                  fontSize: '7px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  Coming Soon
                </div>
                
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  background: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '6px',
                }}>
                  <ItemIcon icon={item.icon} color={item.color} size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 3px' }}>{item.name}</h3>
                  <p style={{ fontSize: '9px', color: '#6B7280', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
