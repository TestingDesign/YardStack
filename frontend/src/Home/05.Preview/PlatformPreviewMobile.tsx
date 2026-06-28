import { useState, useEffect } from 'react';
import { Play, Pause, Star, Briefcase, MapPin, CheckCircle2, RefreshCcw } from 'lucide-react';
import { PREVIEW_TABS, MOCK_DATA } from './data';

const MobileSpotlightCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % MOCK_DATA.spotlightReels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden pb-4" aria-live="polite">
      {MOCK_DATA.spotlightReels.map((video, idx) => {
        const length = MOCK_DATA.spotlightReels.length;
        
        let position = 'hidden';
        if (idx === activeIndex) position = 'center';
        else if (idx === (activeIndex - 1 + length) % length) position = 'left1';
        else if (idx === (activeIndex + 1) % length) position = 'right1';

        let transformClass = '';
        let zIndexClass = '';
        let opacityClass = '';
        let shadowClass = '';

        switch (position) {
          case 'center':
            transformClass = 'translate-x-0 scale-100';
            zIndexClass = 'z-30';
            opacityClass = 'opacity-100';
            shadowClass = 'shadow-xl border border-white/20';
            break;
          case 'left1':
            transformClass = '-translate-x-[60%] scale-[0.85]';
            zIndexClass = 'z-20';
            opacityClass = 'opacity-40 blur-[1px]';
            shadowClass = 'shadow-md border border-white/10';
            break;
          case 'right1':
            transformClass = 'translate-x-[60%] scale-[0.85]';
            zIndexClass = 'z-20';
            opacityClass = 'opacity-40 blur-[1px]';
            shadowClass = 'shadow-md border border-white/10';
            break;
          default:
            transformClass = 'translate-x-0 scale-[0.5]';
            zIndexClass = 'z-0';
            opacityClass = 'opacity-0 pointer-events-none';
            break;
        }

        return (
          <div 
            key={idx} 
            className={`absolute w-[160px] aspect-[9/16] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} ${shadowClass} rounded-[6px] overflow-hidden bg-gray-900 cursor-pointer`}
            onClick={() => setActiveIndex(idx)}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 ${position === 'center' ? 'opacity-100' : 'opacity-50'}`}>
                <Play className="text-white ml-1" size={16} fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-3 text-left">
              <h4 className="text-white font-bold text-[12px] leading-tight mb-1 line-clamp-2">{video.title}</h4>
              <div className="flex justify-between items-center">
                <p className="text-gray-300 text-[9px]">{video.views} views</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-2 right-2 z-40">
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          className="flex items-center justify-center w-8 h-8 bg-black/60 border border-white/20 rounded-full backdrop-blur-md text-white shadow-lg active:bg-purple-600 transition-colors"
        >
          {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
};

const MobileRedExpertCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % MOCK_DATA.redExpert.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center overflow-hidden pb-4" aria-live="polite">
      {MOCK_DATA.redExpert.map((video, idx) => {
        const length = MOCK_DATA.redExpert.length;
        
        let position = 'hidden';
        if (idx === activeIndex) position = 'center';
        else if (idx === (activeIndex - 1 + length) % length) position = 'left1';
        else if (idx === (activeIndex + 1) % length) position = 'right1';

        let transformClass = '';
        let zIndexClass = '';
        let opacityClass = '';
        let shadowClass = '';

        switch (position) {
          case 'center':
            transformClass = 'translate-x-0 scale-100';
            zIndexClass = 'z-30';
            opacityClass = 'opacity-100';
            shadowClass = 'shadow-xl border border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.3)]';
            break;
          case 'left1':
            transformClass = '-translate-x-[65%] scale-[0.80]';
            zIndexClass = 'z-20';
            opacityClass = 'opacity-40 blur-[1px]';
            shadowClass = 'shadow-md border border-white/10';
            break;
          case 'right1':
            transformClass = 'translate-x-[65%] scale-[0.80]';
            zIndexClass = 'z-20';
            opacityClass = 'opacity-40 blur-[1px]';
            shadowClass = 'shadow-md border border-white/10';
            break;
          default:
            transformClass = 'translate-x-0 scale-[0.5]';
            zIndexClass = 'z-0';
            opacityClass = 'opacity-0 pointer-events-none';
            break;
        }

        return (
          <div 
            key={idx} 
            className={`absolute w-[240px] aspect-video transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} ${shadowClass} rounded-[6px] overflow-hidden bg-gray-900 cursor-pointer`}
            onClick={() => setActiveIndex(idx)}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 ${position === 'center' ? 'opacity-100' : 'opacity-50'}`}>
                <Play className="text-white ml-0.5" size={16} fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-2.5 text-left">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-white font-bold text-[12px] leading-tight mb-0.5">{video.title}</h4>
                  <p className="text-gray-300 text-[9px] flex items-center gap-1">
                    {video.author} <CheckCircle2 size={9} className="text-blue-400" />
                  </p>
                </div>
                <span className="bg-black/60 backdrop-blur-md text-white text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] border border-white/10">
                  {video.duration}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-2 right-2 z-40">
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          className="flex items-center justify-center w-8 h-8 bg-black/60 border border-white/20 rounded-full backdrop-blur-md text-white shadow-lg active:bg-pink-600 transition-colors"
        >
          {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
};

export default function PlatformPreviewMobile() {
  const [activeTab, setActiveTab] = useState(PREVIEW_TABS[0].key);

  const renderActiveMockUI = () => {
    switch (activeTab) {
      case 'spotlight':
      case 'spotlight':
        return <MobileSpotlightCarousel />;
      case 'red-expert':
        return <MobileRedExpertCarousel />;
      case 'opportunities':
        return (
          <div className="flex flex-col gap-3 pb-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.opportunities.map((opp, idx) => (
              <div key={idx} className="p-3.5 rounded-[4px] bg-white/5 border border-white/10 active:border-purple-500/50 active:bg-white/10 transition-colors flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                      {opp.type}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-[13px] mb-1">{opp.title}</h4>
                  <p className="text-gray-400 text-[11px] flex items-center gap-2 mb-3">
                    <span className="flex items-center gap-1"><Briefcase size={10} /> {opp.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> {opp.location}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-white/5 rounded-[2px] text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                      {opp.budget}
                    </span>
                  </div>
                </div>
                <button className="self-end px-3 py-1.5 rounded-[4px] bg-purple-600 active:bg-purple-500 text-white text-[11px] font-bold transition-colors mt-1">
                  Apply Now
                </button>
              </div>
            ))}
            <div className="mt-3 flex justify-center w-full">
              <button className="group flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-white/5 border border-white/10 text-[12px] font-bold text-gray-300 active:bg-gradient-to-r active:from-purple-600 active:to-purple-500 active:text-white active:border-transparent transition-all duration-300 shadow-lg">
                <RefreshCcw size={14} className="group-active:rotate-180 transition-transform duration-700" />
                Load More Opportunities
              </button>
            </div>
          </div>
        );
      case 'directory':
        return (
          <div className="grid grid-cols-2 gap-3 pb-4 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.directory.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="flex flex-col gap-2 p-3.5 rounded-[4px] bg-white/5 border border-white/10 active:bg-white/10 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-[4px] bg-white/10 flex items-center justify-center ${cat.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[12px]">{cat.title}</h4>
                    <p className="text-gray-400 text-[10px] font-semibold">{cat.count} Listed</p>
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
      className="relative bg-[#0B0F19] overflow-hidden selection:bg-purple-500/30 selection:text-white py-16"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10 px-4">
        
        {/* Section Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-2">
            Platform Capabilities
          </span>
          <h2 className="text-[28px] leading-tight font-black text-white tracking-tight">
            A Glimpse of What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Discover</span>
          </h2>
        </div>

        {/* Horizontal Scroll Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-2 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {PREVIEW_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 snap-start text-left p-3.5 rounded-[8px] transition-all duration-300 border outline-none w-[200px] relative overflow-hidden ${
                  isActive 
                    ? 'bg-white/10 border-white/20 shadow-lg shadow-purple-900/20' 
                    : 'bg-white/5 border-white/5 opacity-60'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent pointer-events-none" />
                )}
                <div className="relative z-10">
                  <span className={`inline-block px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-wider mb-2 ${
                    isActive ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400'
                  }`}>
                    {tab.badge}
                  </span>
                  <h3 className={`text-[13px] font-bold leading-tight mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {tab.title}
                  </h3>
                  <p className={`text-[10px] leading-snug ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mock UI Window */}
        <div className="relative rounded-[8px] overflow-hidden bg-[#111827] border border-white/10 shadow-2xl shadow-black/50 min-h-[400px] max-h-[500px]">
          {/* Mac-style Window Header */}
          <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="mx-auto flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-black/40 border border-white/5 text-[9px] text-gray-400 font-medium">
              <Star size={10} className="text-purple-400" /> n4re.com/app/{activeTab}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="px-4 pt-4 pb-1 h-[calc(100%-2.5rem)] bg-gradient-to-br from-white/[0.02] to-transparent overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {renderActiveMockUI()}
          </div>
        </div>

      </div>
    </section>
  );
}