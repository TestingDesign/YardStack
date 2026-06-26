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
    <section id="coming-soon" style={{
      background: 'linear-gradient(160deg, #FAFAFA 0%, #F5F3FF 50%, #FAFAFA 100%)',
      padding: '80px 0',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '32px', alignItems: 'stretch' }}>
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '8px',
            border: '1px solid rgba(124,58,237,0.1)',
            padding: '36px',
            boxShadow: '0 8px 32px rgba(124,58,237,0.06)',
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 28px 0',
            }}>
              WHAT&apos;S COMING NEXT
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {COMING_SOON_ITEMS.map((item, i) => (
                <div
                  key={item.name}
                  className={`ys-fade-in-up ys-stagger-${i + 1} group flex flex-col items-center gap-3.5 p-[24px_16px_20px] rounded-[8px] border border-[rgba(124,58,237,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-center relative cursor-pointer transition-all hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px`}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: '#FFFFFF',
                    fontSize: '8px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    Soon
                  </div>

                  <div className="flex items-center justify-center w-[52px] h-[52px] rounded-[8px] mt-3 group-hover:brightness-0 group-hover:invert transition-all"
                    style={{
                      background: item.bgColor,
                      boxShadow: `0 4px 12px ${item.color}22`,
                    }}>
                    <ItemIcon icon={item.icon} color={item.color} />
                  </div>

                  <div>
                    <h3 className="text-[13px] font-extrabold text-[#1A1A2E] m-[0_0_6px] group-hover:text-white transition-colors">{item.name}</h3>
                    <p className="text-[11px] text-[#6B7280] leading-[1.5] m-0 font-medium group-hover:text-white/90 transition-colors">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1A1B2E 0%, #2e1065 40%, #6b21a8 100%)',
            padding: '44px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            boxShadow: '0 20px 48px rgba(107,33,168,0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-20px',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <h3 style={{
              fontSize: '30px',
              lineHeight: 1.15,
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
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 400,
              position: 'relative',
            }}>
              Learn from experts. Connect with professionals.<br />Discover opportunities. Grow with the ecosystem.
            </p>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                alignSelf: 'flex-start',
                padding: '14px 28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                position: 'relative',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)';
              }}
            >
              Join N4RE Today
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
