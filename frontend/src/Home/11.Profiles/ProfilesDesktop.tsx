import { PROFILES_CONTENT, PROFILES_CARDS, DASHBOARD_STATS } from './data';
import { motion } from 'framer-motion';
import {  Home, User, Target, Briefcase, MessageSquare, BarChart2, Plus, Zap } from 'lucide-react';
import NLogo from '../10.Segments/Logo.png';

export default function ProfilesDesktop() {
  return (
    <section id="profiles" className="relative bg-slate-50 overflow-hidden selection:bg-purple-200 selection:text-purple-900 pb-8 ">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        
       {/*  <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-6"
        >
          <div className="w-10 h-10 rounded-[4px] bg-purple-100 flex items-center justify-center mb-5 shadow-sm">
            <User size={20} className="text-purple-700" />
          </div>
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4 px-3 py-1.5 rounded-[4px] bg-purple-50 border border-purple-100">
            {PROFILES_CONTENT.tagline}
          </span>
          <h2 className="text-4xl lg:text-[48px] leading-[1.2] font-extrabold text-gray-900 tracking-tight mb-4">
            {PROFILES_CONTENT.headingHighlight}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              {PROFILES_CONTENT.heading}
            </span>
          </h2>
          <p className="text-lg font-semibold text-gray-900">
            {PROFILES_CONTENT.description}
          </p>
          <p className="text-base font-medium text-purple-700 mt-1">
            {PROFILES_CONTENT.subDescription}
          </p>
        </motion.div>

        <div className="relative pt-12 pb-16">
          <div className="hidden lg:block absolute top-6 left-[16.66%] right-[16.66%] h-px border-t-[2px] border-dashed border-purple-800/20" aria-hidden="true" />
          <div className="hidden lg:block absolute top-0 left-1/2 w-px h-6 border-l-[2px] border-dashed border-purple-800/20 -translate-x-1/2" aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROFILES_CARDS.map((card, i) => {
              const MainIcon = card.icon;
              return (
                <motion.div 
                  key={card.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  className="relative pt-8 lg:pt-6"
                >
                  <div 
                    className="hidden lg:block absolute top-0 left-1/2 w-px h-6 border-l-[2px] border-dashed -translate-x-1/2" 
                    style={{ borderColor: card.color, opacity: 0.5 }} 
                    aria-hidden="true"
                  />
                  <div 
                    className="hidden lg:block absolute top-6 left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm" 
                    style={{ backgroundColor: card.color }} 
                    aria-hidden="true"
                  />
                  
                  <div className="bg-white/80 backdrop-blur-xl rounded-[4px] p-8 shadow-xl shadow-purple-900/5 border border-white hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 hover:border-purple-100 transition-all duration-500 ease-out group h-full flex flex-col items-center">
                    
                    <div 
                      className="w-16 h-16 rounded-[4px] flex items-center justify-center shadow-sm mb-5 transition-transform duration-500 group-hover:scale-110 shrink-0"
                      style={{ backgroundColor: card.color }}
                    >
                      <MainIcon size={28} color="white" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-[17px] font-extrabold text-gray-900 mb-6 text-center">
                      {card.title}
                    </h3>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" aria-hidden="true" />
                    
                    <ul className="w-full flex flex-col gap-4">
                      {card.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={idx} className="flex items-center gap-3.5">
                            <div 
                              className="w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0 transition-colors"
                              style={{ backgroundColor: `${card.color}15` }}
                            >
                              <FeatureIcon size={16} color={card.color} strokeWidth={2} />
                            </div>
                            <span className="text-[13px] font-bold text-gray-600 leading-tight">
                              {feature.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div> */}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 rounded-[4px] border border-purple-100 shadow-2xl shadow-purple-900/10 p-2 lg:p-3 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white rounded-[4px] shadow-sm overflow-hidden h-full border border-white">
            
            <div className="flex-shrink-0 lg:w-[340px] p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-[28px] font-extrabold text-gray-900 leading-[1.2] mb-4 whitespace-pre-line">
                {PROFILES_CONTENT.dashboardTitle}
              </h3>
              <p className="text-[15px] font-medium text-gray-600 leading-relaxed mb-8">
                {PROFILES_CONTENT.dashboardDesc}
              </p>
              <div className="flex items-center gap-3.5 bg-purple-50 rounded-[4px] p-3.5 border border-purple-100/50 w-fit shadow-inner">
                <div className="w-10 h-10 rounded-[4px] bg-white shadow-sm flex items-center justify-center shrink-0 text-purple-600">
                  <Zap size={20} className="fill-purple-100" />
                </div>
                <p className="text-xs font-bold text-purple-900 leading-tight">
                  Switch between profiles and<br/>grow every business you own.
                </p>
              </div>
            </div>

            <div className="flex-1 flex bg-slate-50 rounded-[4px] m-4 lg:m-6 lg:ml-0 overflow-hidden shadow-inner border border-gray-200/60">
              
              <div className="hidden sm:flex flex-col w-[180px] bg-gradient-to-b from-[#1A1A2E] to-[#2A1550] p-4 text-purple-200">
                <img src={NLogo} alt="N4RE Logo" className="w-[100px] h-auto object-contain mb-8 px-2" draggable={false} />
                
                <nav className="flex flex-col gap-1">
                  {[
                    { icon: Home, label: "Dashboard", active: true },
                    { icon: User, label: "Profiles" },
                    { icon: Target, label: "Leads" },
                    { icon: Briefcase, label: "Opportunities" },
                    { icon: MessageSquare, label: "Messages" },
                    { icon: BarChart2, label: "Analytics" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.05), duration: 0.3 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-xs font-bold cursor-default transition-colors ${item.active ? 'bg-fuchsia-500/20 text-white shadow-sm border border-fuchsia-500/20' : 'hover:bg-white/5'}`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="flex-1 p-5 lg:p-8 flex flex-col gap-8 overflow-hidden">
                
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3.5">My Profiles</h5>
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
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
                          className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-[4px] border border-gray-200 shadow-sm shrink-0 min-w-[140px] hover:border-purple-200 transition-colors cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: profile.color }}>
                            <Icon size={14} color="white" />
                          </div>
                          <span className="text-[11px] font-extrabold text-gray-800 leading-tight">
                            {profile.title.replace("Real Estate ", "RE\n")}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ backgroundColor: profile.color }} aria-hidden="true" />
                        </motion.div>
                      )
                    })}
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (PROFILES_CARDS.length * 0.1), duration: 0.4 }}
                      whileHover={{ y: -2 }}
                      className="flex flex-col items-center justify-center gap-1 bg-slate-50 px-4 py-2 rounded-[4px] border border-dashed border-gray-300 text-gray-400 shrink-0 cursor-pointer hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50/50 transition-colors"
                    >
                      <Plus size={16} />
                      <span className="text-[9px] font-bold">Add Profile</span>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3.5">Quick Overview</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                          className="bg-white p-3 lg:p-4 rounded-[4px] border border-gray-200 shadow-sm flex flex-col hover:border-purple-200 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-[4px] flex items-center justify-center bg-purple-50 text-purple-600 transition-transform group-hover:scale-110">
                              <Icon size={14} />
                            </div>
                            <span className="text-lg font-black text-gray-900">{stat.value}</span>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500">{stat.label}</span>
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
