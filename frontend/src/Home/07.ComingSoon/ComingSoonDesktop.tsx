import { useState } from 'react';
import { motion } from 'framer-motion';
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
      className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-8 lg:py-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col p-5 lg:p-8 rounded-[4px] bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-purple-900/5"
        >
          <div className="flex items-center gap-2.5 mb-6 justify-center lg:justify-start">
            <Sparkles size={16} className="text-purple-600" aria-hidden="true" />
            <p className="text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600">
              What's Coming Next
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 h-full">
            {COMING_SOON_ITEMS.map((item, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="group relative flex flex-col items-center text-center p-5 rounded-[4px] bg-white cursor-pointer overflow-hidden"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isHovered 
                      ? '0 20px 40px -8px rgba(107, 33, 168, 0.18), 0 8px 16px -4px rgba(107, 33, 168, 0.08)' 
                      : '0 1px 3px rgba(0,0,0,0.04)',
                    borderColor: isHovered ? 'rgba(147, 51, 234, 0.3)' : 'rgba(243, 244, 246, 1)',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 pointer-events-none z-0 rounded-[4px]"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  />

                  <span 
                    className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-black tracking-wider rounded-[4px]"
                    style={{
                      background: isHovered 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'linear-gradient(135deg, #F3E8FF, #FCE7F3)',
                      color: isHovered ? '#FFFFFF' : '#7C3AED',
                      backdropFilter: isHovered ? 'blur(8px)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Coming Soon
                  </span>

                  <div 
                    className="relative z-10 flex items-center justify-center w-14 h-14 rounded-[4px] mt-4 mb-4"
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
                      size={24}
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 
                      className="text-[15px] font-extrabold mb-1.5"
                      style={{
                        color: isHovered ? '#FFFFFF' : '#111827',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-[13px] font-medium leading-relaxed px-2"
                      style={{
                        color: isHovered ? 'rgba(233, 213, 255, 0.9)' : '#4b5563',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
