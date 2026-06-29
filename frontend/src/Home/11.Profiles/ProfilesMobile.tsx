import { useState, useEffect, useRef } from 'react';
import { PROFILES_CONTENT, PROFILES_CARDS, DASHBOARD_STATS } from './data';
import { motion } from 'framer-motion';
import { User, Zap, Home, Target, Briefcase, MessageSquare, BarChart2 } from 'lucide-react';

export default function ProfilesMobile() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.offsetWidth || 0;
        const targetWidth = 640; 
        if (parentWidth > 0 && parentWidth < targetWidth) {
          setScale(parentWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section id="profiles" className="relative bg-white overflow-hidden selection:bg-purple-200 selection:text-purple-900 pb-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-0 relative z-10">
        
  
      {/*   <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-3 shadow-sm">
            <User size={16} className="text-purple-700" />
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3 px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
            <Sparkles size={10} className="text-purple-600" />
            MULTI-ROLE
          </span>
          <h2 className="text-[28px] leading-[1.2] font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
            {PROFILES_CONTENT.headingHighlight} <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              {PROFILES_CONTENT.heading}
            </span>
          </h2>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed mb-2">
            {PROFILES_CONTENT.description}
          </p>
          <p className="text-[13px] font-bold text-purple-700">
            {PROFILES_CONTENT.subDescription}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mb-10">
          {PROFILES_CARDS.map((card) => {
            const MainIcon = card.icon;
            return (
              <motion.div 
                key={card.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="bg-white rounded-[16px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center relative overflow-hidden"
              >
                <div className="absolute top-0 w-full h-1" style={{ backgroundColor: card.color, opacity: 0.8 }} />
                
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3 mt-1"
                  style={{ backgroundColor: card.color }}
                >
                  <MainIcon size={20} color="white" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-[16px] font-extrabold text-[var(--color-text-primary)] mb-4 text-center">
                  {card.title}
                </h3>
                
                <ul className="w-full flex flex-col gap-3">
                  {card.features.map((feature, idx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li key={idx} className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-lg border border-gray-100/50">
                        <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-white shadow-sm">
                          <FeatureIcon size={14} className="text-purple-700" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] font-bold text-[var(--color-text-secondary)]">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div> */}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 rounded-[4px] sm:rounded-[4px] p-4 sm:p-5 overflow-hidden w-full flex flex-col items-center"
        >
          <div className="flex flex-col items-center text-center mb-6 max-w-[340px]">
            <h3 className="text-[22px] font-extrabold text-[var(--color-text-primary)] leading-[1.2] mb-3 whitespace-pre-line">
              {PROFILES_CONTENT.dashboardTitle}
            </h3>
            <p className="text-[13px] font-medium text-[var(--color-text-secondary)] leading-relaxed mb-5">
              {PROFILES_CONTENT.dashboardDesc}
            </p>
            <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-purple-100/50 shadow-sm w-fit max-w-full">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 text-purple-600">
                <Zap size={18} className="fill-purple-100" />
              </div>
              <p className="text-[11px] font-bold text-purple-900 leading-tight text-left">
                Switch profiles and grow<br/>every business you own.
              </p>
            </div>
          </div>

          <div ref={containerRef} className="w-full relative" style={{ height: `${360 * scale}px` }}>
            
            <div 
              className="absolute top-0 -pl-4 left-0 w-[640px] h-[360px] origin-top-left flex flex-row bg-[#F8F9FC] rounded-[8px] shadow-lg overflow-hidden border border-gray-200"
              style={{ transform: `scale(${scale})` }}
            >
              
              <div className="flex flex-col w-[160px] bg-gradient-to-b from-[#1A1A2E] to-[#2A1550] p-4 text-purple-200 shrink-0">
                <h4 className="text-white font-black text-[16px] tracking-wider mb-6 px-2">N4RE</h4>
                <nav className="flex flex-col gap-1">
                  {[
                    { icon: Home, label: "Dashboard", active: true },
                    { icon: User, label: "Profiles" },
                    { icon: Target, label: "Leads" },
                    { icon: Briefcase, label: "Opportunities" },
                    { icon: MessageSquare, label: "Messages" },
                    { icon: BarChart2, label: "Analytics" }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.05), duration: 0.3 }}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-[11px] font-bold transition-colors ${item.active ? 'bg-fuchsia-500/20 text-white shadow-sm border border-fuchsia-500/20' : 'hover:bg-white/5'}`}
                      >
                        <Icon size={14} className="shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>

              {/* Main Dashboard Content */}
              <div className="flex-1 p-5 flex flex-col gap-6 overflow-hidden">
                
                {/* Profiles Row */}
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">My Profiles</h5>
                    <div className="flex flex-wrap gap-2.5">
                      {PROFILES_CARDS.map((profile, i) => {
                        const Icon = profile.icon;
                        return (
                          <motion.div 
                            key={profile.id} 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (i * 0.1), duration: 0.4 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                            className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-[8px] border border-gray-200 shadow-sm shrink-0 cursor-pointer"
                          >
                            <div className="w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: profile.color }}>
                              <Icon size={12} color="white" />
                            </div>
                            <span className="text-[11px] font-extrabold text-gray-800 leading-tight">
                              {profile.title.replace("Real Estate ", "RE\n")}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full ml-1" style={{ backgroundColor: profile.color }} aria-hidden="true" />
                          </motion.div>
                        )
                      })}
                    </div>
                </div>

                {/* Stats Grid */}
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">Quick Overview</h5>
                    <div className="grid grid-cols-4 gap-2">
                      {DASHBOARD_STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                            whileHover={{ y: -2 }}
                            className="bg-white p-3 rounded-[6px] border border-gray-200 shadow-sm flex flex-col justify-between cursor-pointer"
                          >
                            <div className="flex flex-col gap-1 mb-1">
                              <span className="text-[20px] font-black text-gray-900 leading-none">{stat.value}</span>
                              <span className="text-[9px] font-bold text-gray-500 leading-tight">{stat.label}</span>
                            </div>
                            <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-purple-50 text-purple-600 self-end mt-1 transition-transform group-hover:scale-110">
                              <Icon size={12} />
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
