import { PROFILES_CONTENT, PROFILES_CARDS, DASHBOARD_STATS } from './data';
import { Sparkles, Home, User, Bell, Target, Briefcase, MessageSquare, BarChart2, Plus, Zap } from 'lucide-react';

export default function ProfilesDesktop() {
  return (
    <section id="profiles" className="relative bg-white py-16 lg:py-24 overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4 shadow-sm">
            <User size={20} className="text-purple-700" />
          </div>
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100">
            {PROFILES_CONTENT.tagline}
          </span>
          <h2 className="text-4xl lg:text-[48px] leading-[1.15] font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            {PROFILES_CONTENT.headingHighlight}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-purple-500">
              {PROFILES_CONTENT.heading}
            </span>
          </h2>
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {PROFILES_CONTENT.description}
          </p>
          <p className="text-base font-medium text-purple-700 mt-1">
            {PROFILES_CONTENT.subDescription}
          </p>
        </div>

        {/* Tree and Cards Section */}
        <div className="relative pt-12 pb-16">
          {/* Tree Connection Lines */}
          <div className="hidden lg:block absolute top-6 left-[16.66%] right-[16.66%] h-px border-t-[2px] border-dashed border-purple-800/30" />
          <div className="hidden lg:block absolute top-0 left-1/2 w-px h-6 border-l-[2px] border-dashed border-purple-800/30 -translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROFILES_CARDS.map((card, i) => {
              const MainIcon = card.icon;
              return (
                <div key={card.id} className="relative pt-8 lg:pt-6">
                  {/* Vertical drop and dot */}
                  <div 
                    className="hidden lg:block absolute top-0 left-1/2 w-px h-6 border-l-[2px] border-dashed -translate-x-1/2" 
                    style={{ borderColor: card.color, opacity: 0.5 }} 
                  />
                  <div 
                    className="hidden lg:block absolute top-6 left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm" 
                    style={{ backgroundColor: card.color }} 
                  />
                  
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(124,58,237,0.08)] hover:-translate-y-1 hover:border-purple-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group h-full flex flex-col items-center">
                    
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: card.color }}
                    >
                      <MainIcon size={28} color="white" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-[17px] font-extrabold text-[var(--color-text-primary)] mb-6 text-center">
                      {card.title}
                    </h3>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />
                    
                    <ul className="w-full flex flex-col gap-4">
                      {card.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-purple-50 group-hover:bg-purple-100 transition-colors">
                              <FeatureIcon size={16} className="text-purple-700" strokeWidth={2} />
                            </div>
                            <span className="text-[13px] font-bold text-[var(--color-text-secondary)]">
                              {feature.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dashboard Mockup Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 rounded-[24px] border border-purple-100 shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] p-2 lg:p-3 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white rounded-[20px] shadow-sm overflow-hidden h-full border border-white">
            
            {/* Left Content Area */}
            <div className="flex-shrink-0 lg:w-[320px] p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-[28px] font-extrabold text-[var(--color-text-primary)] leading-[1.2] mb-3 whitespace-pre-line">
                {PROFILES_CONTENT.dashboardTitle}
              </h3>
              <p className="text-[15px] font-medium text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {PROFILES_CONTENT.dashboardDesc}
              </p>
              <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3 border border-purple-100/50 w-fit">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-purple-600">
                  <Zap size={20} className="fill-purple-100" />
                </div>
                <p className="text-xs font-bold text-purple-900 leading-tight">
                  Switch between profiles and<br/>grow every business you own.
                </p>
              </div>
            </div>

            {/* Dashboard Mockup UI */}
            <div className="flex-1 flex bg-[#F8F9FC] rounded-[16px] m-4 lg:m-6 lg:ml-0 overflow-hidden shadow-inner border border-gray-100">
              
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col w-[180px] bg-gradient-to-b from-[#1A1A2E] to-[#2A1550] p-4 text-purple-200">
                <h4 className="text-white font-black text-lg tracking-wider mb-8 px-2">N4RE</h4>
                <nav className="flex flex-col gap-1">
                  {[
                    { icon: Home, label: "Dashboard", active: true },
                    { icon: User, label: "Profiles" },
                    { icon: Target, label: "Leads" },
                    { icon: Briefcase, label: "Opportunities" },
                    { icon: MessageSquare, label: "Messages" },
                    { icon: BarChart2, label: "Analytics" }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold cursor-default ${item.active ? 'bg-purple-600/30 text-white' : 'hover:bg-white/5'}`}>
                      <item.icon size={14} />
                      {item.label}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-5 lg:p-8 flex flex-col gap-6 overflow-hidden">
                
                {/* My Profiles Row */}
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">My Profiles</h5>
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                    {PROFILES_CARDS.map((profile) => {
                      const Icon = profile.icon;
                      return (
                        <div key={profile.id} className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-xl border border-gray-100 shadow-sm shrink-0 min-w-[140px]">
                          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: profile.color }}>
                            <Icon size={14} color="white" />
                          </div>
                          <span className="text-[11px] font-extrabold text-gray-800 leading-tight">
                            {profile.title.replace("Real Estate ", "RE\n")}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ backgroundColor: profile.color }} />
                        </div>
                      )
                    })}
                    <div className="flex flex-col items-center justify-center gap-1 bg-white px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-400 shrink-0 cursor-pointer hover:border-purple-300 hover:text-purple-600 transition-colors">
                      <Plus size={16} />
                      <span className="text-[9px] font-bold">Add Profile</span>
                    </div>
                  </div>
                </div>

                {/* Quick Overview Row */}
                <div>
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">Quick Overview</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {DASHBOARD_STATS.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="bg-white p-3 lg:p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-50 text-purple-600">
                              <Icon size={12} />
                            </div>
                            <span className="text-lg font-black text-gray-900">{stat.value}</span>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500">{stat.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
