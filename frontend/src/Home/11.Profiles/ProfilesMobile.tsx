import { PROFILES_CONTENT, PROFILES_CARDS, DASHBOARD_STATS } from './data';
import { Sparkles, User, Zap, Plus } from 'lucide-react';

export default function ProfilesMobile() {
  return (
    <section id="profiles" className="relative bg-white overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="px-2 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
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
        </div>

        {/* Stacked Cards Section */}
        <div className="flex flex-col gap-4 mb-10">
          {PROFILES_CARDS.map((card) => {
            const MainIcon = card.icon;
            return (
              <div key={card.id} className="bg-white rounded-[16px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center relative overflow-hidden">
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
              </div>
            );
          })}
        </div>

        {/* Dashboard Mockup Mobile */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/30 rounded-[20px] border border-purple-100 shadow-[0_10px_30px_-5px_rgba(107,33,168,0.1)] p-1.5 overflow-hidden">
          <div className="flex flex-col bg-white rounded-[16px] shadow-sm overflow-hidden border border-white">
            
            {/* Top Content Area */}
            <div className="p-6 pb-4 flex flex-col items-center text-center border-b border-gray-50">
              <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] leading-[1.2] mb-2 whitespace-pre-line">
                {PROFILES_CONTENT.dashboardTitle}
              </h3>
              <p className="text-[13px] font-medium text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {PROFILES_CONTENT.dashboardDesc}
              </p>
              <div className="flex items-center justify-center gap-2 bg-purple-50 rounded-xl p-2.5 border border-purple-100/50 w-full">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-purple-600">
                  <Zap size={16} className="fill-purple-100" />
                </div>
                <p className="text-[11px] font-bold text-purple-900 leading-tight text-left">
                  Switch profiles and grow<br/>every business you own.
                </p>
              </div>
            </div>

            {/* Dashboard UI Area */}
            <div className="flex flex-col bg-[#F8F9FC] p-4 lg:p-5 gap-5 shadow-inner">
              
              {/* Profiles Row */}
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2.5">My Profiles</h5>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 snap-x">
                  {PROFILES_CARDS.map((profile) => {
                    const Icon = profile.icon;
                    return (
                      <div key={profile.id} className="snap-start flex items-center gap-2.5 bg-white px-2.5 py-2 rounded-xl border border-gray-100 shadow-sm shrink-0 min-w-[130px]">
                        <div className="w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: profile.color }}>
                          <Icon size={12} color="white" />
                        </div>
                        <span className="text-[10px] font-extrabold text-gray-800 leading-tight">
                          {profile.title.replace("Real Estate ", "RE\n")}
                        </span>
                      </div>
                    )
                  })}
                  <div className="snap-start flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-dashed border-gray-300 text-gray-400 shrink-0">
                    <Plus size={14} />
                    <span className="text-[10px] font-bold">Add</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2.5">Overview</h5>
                <div className="grid grid-cols-2 gap-2">
                  {DASHBOARD_STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="bg-white p-2.5 rounded-[10px] border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-base font-black text-gray-900 leading-none">{stat.value}</span>
                          <span className="text-[9px] font-bold text-gray-500">{stat.label}</span>
                        </div>
                        <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-50 text-purple-600 shrink-0">
                          <Icon size={12} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
