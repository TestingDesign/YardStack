import { Building2, GraduationCap, MonitorPlay, BarChart2, ArrowRight } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 28 }: { icon: string; color: string; size?: number }) => {
  const props = { size, color, strokeWidth: 1.5 };
  switch (icon) {
    case 'building': return <Building2 {...props} />;
    case 'graduation-cap': return <GraduationCap {...props} />;
    case 'monitor-play': return <MonitorPlay {...props} />;
    case 'bar-chart-2': return <BarChart2 {...props} />;
    default: return null;
  }
};

export default function ComingSoonDesktop() {
  return (
    <section id="coming-soon" style={{ background: '#FFFFFF', padding: '64px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '32px', alignItems: 'stretch' }}>
          
          <div style={{
            background: '#FCFAFF',
            borderRadius: '24px',
            border: '1px solid rgba(107,33,168,0.06)',
            padding: '32px',
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6B21A8',
              margin: '0 0 24px 0',
            }}>
              WHAT&apos;S COMING NEXT
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {COMING_SOON_ITEMS.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 16px',
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{
                     position: 'absolute',
                     top: '8px',
                     left: '8px',
                     background: '#F5F3FF',
                     color: '#6B21A8',
                     fontSize: '8px',
                     fontWeight: 800,
                     textTransform: 'uppercase',
                     letterSpacing: '0.05em',
                     padding: '4px 8px',
                     borderRadius: '12px',
                  }}>
                    Coming Soon
                  </div>
                  
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: item.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '16px',
                  }}>
                    <ItemIcon icon={item.icon} color={item.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#1A1A2E', margin: '0 0 6px 0' }}>{item.name}</h3>
                    <p style={{ fontSize: '10px', color: '#6B7280', lineHeight: 1.4, margin: 0, fontWeight: 500 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #2e1065, #4c1d95, #6b21a8)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
            boxShadow: '0 12px 32px rgba(107,33,168,0.2)',
          }}>
            <h3 style={{ fontSize: '28px', lineHeight: 1.2, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Join Hyderabad&apos;s<br />Real Estate Ecosystem
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: '0 0 16px 0', fontWeight: 400 }}>
              Learn from experts. Connect with professionals.<br />Discover opportunities. Grow with the ecosystem.
            </p>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#FFFFFF',
              color: '#6B21A8',
              fontSize: '13px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              Join N4RE Today
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
