import { useState } from 'react';
import { Building2, GraduationCap, MonitorPlay, BarChart2, Sparkles } from 'lucide-react';
import { COMING_SOON_ITEMS } from './data';

const ItemIcon = ({ icon, color, size = 26 }: { icon: string; color: string; size?: number }) => {
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="coming-soon" 
      className="relative bg-[var(--color-bg-muted)] py-16 lg:py-24 overflow-hidden selection:bg-purple-200 selection:text-purple-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col p-6 lg:p-10 rounded-[28px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
            <Sparkles size={16} className="text-purple-600" />
            <p className="text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600">
              What's Coming Next
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 h-full">
            {COMING_SOON_ITEMS.map((item, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={item.name}
                  className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100/80 shadow-sm cursor-pointer overflow-hidden"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isHovered 
                      ? '0 20px 40px -8px rgba(107, 33, 168, 0.18), 0 8px 16px -4px rgba(107, 33, 168, 0.08)' 
                      : '0 1px 3px rgba(0,0,0,0.04)',
                    borderColor: isHovered ? 'rgba(147, 51, 234, 0.3)' : 'rgba(241, 245, 249, 0.8)',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 pointer-events-none z-0 rounded-2xl"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />

                  {/* "Soon" badge */}
                  <span 
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md"
                    style={{
                      background: isHovered 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'linear-gradient(135deg, #F3E8FF, #FCE7F3)',
                      color: isHovered ? '#FFFFFF' : '#7C3AED',
                      backdropFilter: isHovered ? 'blur(8px)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Soon
                  </span>

                  {/* Icon container — uses explicit white on hover instead of broken brightness/invert */}
                  <div 
                    className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl mt-4 mb-5"
                    style={{ 
                      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : item.bgColor,
                      boxShadow: isHovered 
                        ? '0 8px 24px rgba(255, 255, 255, 0.1)' 
                        : `0 8px 24px ${item.color}15`,
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <ItemIcon 
                      icon={item.icon} 
                      color={isHovered ? '#FFFFFF' : item.color} 
                    />
                  </div>

                  {/* Text content */}
                  <div className="relative z-10">
                    <h3 
                      className="text-sm font-extrabold mb-2"
                      style={{
                        color: isHovered ? '#FFFFFF' : '#0f172a',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-xs font-medium leading-relaxed"
                      style={{
                        color: isHovered ? 'rgba(233, 213, 255, 0.9)' : '#64748b',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}