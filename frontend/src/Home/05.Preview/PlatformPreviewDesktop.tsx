import React, { useState } from 'react';
import { Play, Star, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { PREVIEW_TABS, MOCK_DATA } from './data';

export default function PlatformPreviewDesktop() {
  const [activeTab, setActiveTab] = useState(PREVIEW_TABS[0].key);

  const renderActiveMockUI = () => {
    switch (activeTab) {
      case 'spotlight':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.spotlight.map((video, idx) => (
              <div key={idx} className="group relative rounded-[4px] overflow-hidden cursor-pointer aspect-[9/16] bg-gray-900 border border-white/10 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30 shadow-xl">
                    <Play className="text-white ml-0.5" size={20} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <h4 className="text-white font-bold text-xs leading-tight mb-1 line-clamp-2">{video.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300 text-[10px]">{video.views} views</p>
                    <span className="text-white text-[9px] font-bold opacity-80">{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'red-expert':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.redExpert.map((video, idx) => (
              <div key={idx} className="group relative rounded-[4px] overflow-hidden cursor-pointer aspect-video bg-gray-900 border border-white/10 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                    <Play className="text-white ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight mb-1">{video.title}</h4>
                      <p className="text-gray-300 text-xs flex items-center gap-1">
                        {video.author} <CheckCircle2 size={10} className="text-blue-400" />
                      </p>
                    </div>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-[2px] border border-white/10">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'opportunities':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.opportunities.map((opp, idx) => (
              <div key={idx} className="group p-4 rounded-[4px] bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                      {opp.type}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">{opp.title}</h4>
                  <p className="text-gray-400 text-xs flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {opp.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {opp.location}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-white/5 rounded-[2px] text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                      {opp.budget}
                    </span>
                  </div>
                </div>
                <button className="w-full py-2 rounded-[4px] bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        );
      case 'directory':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.directory.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="group flex items-center gap-4 p-4 rounded-[4px] bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-[4px] bg-white/10 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{cat.title}</h4>
                    <p className="text-gray-400 text-xs font-semibold">{cat.count} Listed</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="platform-preview" 
      className="relative bg-[#0B0F19] overflow-hidden selection:bg-purple-500/30 selection:text-white py-16 lg:py-24"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            A Glimpse of What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Discover</span>
          </h2>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          
          {/* Left Navigation */}
          <div className="flex flex-col gap-2">
            {PREVIEW_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-left p-6 rounded-[8px] transition-all duration-300 border outline-none focus-visible:ring-2 focus-visible:ring-purple-500 relative overflow-hidden group ${
                    isActive 
                      ? 'bg-white/10 border-white/20 shadow-2xl shadow-purple-900/20' 
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none" />
                  )}
                  <div className="relative z-10">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${
                      isActive ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400 group-hover:text-gray-300'
                    }`}>
                      {tab.badge}
                    </span>
                    <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Mock UI Window */}
          <div className="relative rounded-[8px] overflow-hidden bg-[#111827] border border-white/10 shadow-2xl shadow-black/50 h-full min-h-[500px]">
            {/* Mac-style Window Header */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-[4px] bg-black/40 border border-white/5 text-[10px] text-gray-400 font-medium">
                <Star size={12} className="text-purple-400" /> n4re.com/app/{activeTab}
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="p-6 h-[calc(100%-3rem)] bg-gradient-to-br from-white/[0.02] to-transparent overflow-y-auto custom-scrollbar">
              {renderActiveMockUI()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}