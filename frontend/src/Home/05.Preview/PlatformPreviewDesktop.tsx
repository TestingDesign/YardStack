import { useState, useEffect } from 'react';
import { Play, Pause, Star, Briefcase, MapPin, CheckCircle2, RefreshCcw } from 'lucide-react';
import { PREVIEW_TABS, MOCK_DATA } from './data';

export default function PlatformPreviewDesktop() {
  const [activeTab, setActiveTab] = useState(PREVIEW_TABS[0].key);

  const SpotlightCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
      if (!isPlaying) return;
      const timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % MOCK_DATA.spotlightReels.length);
      }, 3000);
      return () => clearInterval(timer);
    }, [isPlaying]);

    return (
      <div className="relative w-full h-full min-h-[460px] flex items-center justify-center overflow-hidden pb-6 animate-in fade-in zoom-in-95 duration-500 perspective-1000 mt-4">
        {MOCK_DATA.spotlightReels.map((video, idx) => {
          const length = MOCK_DATA.spotlightReels.length;
          
          let position = 'hidden';
          if (idx === activeIndex) position = 'center';
          else if (idx === (activeIndex - 1 + length) % length) position = 'left1';
          else if (idx === (activeIndex + 1) % length) position = 'right1';
          else if (idx === (activeIndex - 2 + length) % length) position = 'left2';
          else if (idx === (activeIndex + 2) % length) position = 'right2';

          let transformClass = '';
          let zIndexClass = '';
          let opacityClass = '';

          switch (position) {
            case 'center':
              transformClass = 'translate-x-0 scale-100';
              zIndexClass = 'z-30';
              opacityClass = 'opacity-100';
              break;
            case 'left1':
              transformClass = '-translate-x-[65%] scale-[0.85]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-70 blur-[1px] hover:opacity-90';
              break;
            case 'right1':
              transformClass = 'translate-x-[65%] scale-[0.85]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-70 blur-[1px] hover:opacity-90';
              break;
            case 'left2':
              transformClass = '-translate-x-[120%] scale-[0.70]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-40 blur-[2px] hover:opacity-60';
              break;
            case 'right2':
              transformClass = 'translate-x-[120%] scale-[0.70]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-40 blur-[2px] hover:opacity-60';
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
              className={`absolute top-0 w-[240px] aspect-[9/16] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} group rounded-[4px] overflow-hidden cursor-pointer bg-gray-900 border border-white/10 shadow-2xl`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.bgImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 opacity-90 transition-opacity" />
              
              {video.tag && (
                <div className={`absolute top-4 left-4 z-10 transition-opacity duration-300 ${position === 'center' ? 'opacity-100' : 'opacity-0'}`}>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wider ${video.tagColor}`}>
                    {video.tag}
                  </span>
                </div>
              )}

              <div className={`absolute inset-0 flex flex-col justify-end p-5 z-10 transition-opacity duration-500 ${position === 'center' ? 'opacity-100' : 'opacity-40'}`}>
                <div className="mb-auto mt-14">
                  <h3 className="text-white font-bold text-[15px] xl:text-lg leading-tight mb-2 drop-shadow-md">{video.title}</h3>
                  {video.subtitle && (
                    <div className="text-gray-200 text-sm font-medium drop-shadow-md flex items-center gap-1">
                      {video.subtitleIcon === 'map-pin' && <MapPin size={12} />}
                      {video.subtitleIcon === 'briefcase' && <Briefcase size={12} />}
                      {video.subtitle}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                        <Play className="text-white ml-0.5" size={14} fill="currentColor" />
                      </div>
                      <span className="text-white font-bold text-sm drop-shadow-md">{video.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        
        <div className="absolute bottom-4 right-4 z-40">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-purple-600/60 border border-white/20 rounded-full backdrop-blur-md text-white transition-all shadow-lg"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>
    );
  };

  const RedExpertCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
      if (!isPlaying) return;
      const timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % MOCK_DATA.redExpert.length);
      }, 3000);
      return () => clearInterval(timer);
    }, [isPlaying]);

    return (
      <div className="relative w-full h-full min-h-[460px] flex items-center justify-center overflow-hidden pb-6 animate-in fade-in zoom-in-95 duration-500 perspective-1000 mt-4">
        {MOCK_DATA.redExpert.map((video, idx) => {
          const length = MOCK_DATA.redExpert.length;
          
          let position = 'hidden';
          if (idx === activeIndex) position = 'center';
          else if (idx === (activeIndex - 1 + length) % length) position = 'left1';
          else if (idx === (activeIndex + 1) % length) position = 'right1';
          else if (idx === (activeIndex - 2 + length) % length) position = 'left2';
          else if (idx === (activeIndex + 2) % length) position = 'right2';

          let transformClass = '';
          let zIndexClass = '';
          let opacityClass = '';

          switch (position) {
            case 'center':
              transformClass = 'translate-x-0 scale-100';
              zIndexClass = 'z-30';
              opacityClass = 'opacity-100';
              break;
            case 'left1':
              transformClass = '-translate-x-[55%] scale-[0.80]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-70 blur-[1px] hover:opacity-90';
              break;
            case 'right1':
              transformClass = 'translate-x-[55%] scale-[0.80]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-70 blur-[1px] hover:opacity-90';
              break;
            case 'left2':
              transformClass = '-translate-x-[100%] scale-[0.60]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-40 blur-[2px] hover:opacity-60';
              break;
            case 'right2':
              transformClass = 'translate-x-[100%] scale-[0.60]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-40 blur-[2px] hover:opacity-60';
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
              className={`absolute w-[400px] aspect-video transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} group rounded-[4px] overflow-hidden cursor-pointer bg-gray-900 border border-white/10 shadow-2xl`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${video.bgImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30 ${position === 'center' ? 'opacity-100' : 'opacity-50'}`}>
                  <Play className="text-white ml-1" size={24} fill="currentColor" />
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 w-full p-4 z-10 transition-opacity duration-500 ${position === 'center' ? 'opacity-100' : 'opacity-40'}`}>
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
          );
        })}

        <div className="absolute bottom-4 right-4 z-40">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-purple-600/60 border border-white/20 rounded-full backdrop-blur-md text-white transition-all shadow-lg"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>
    );
  };

  const renderActiveMockUI = () => {
    switch (activeTab) {
      case 'spotlight':
        return <SpotlightCarousel />;
      case 'red-expert':
        return <RedExpertCarousel />;
      case 'opportunities':
        return (
          <div className="grid grid-cols-2 gap-4 pb-6 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.opportunities.map((opp, idx) => (
              <div key={idx} className="group p-4 rounded-[4px] bg-white border border-gray-200 hover:border-purple-500/50 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                      {opp.type}
                    </span>
                  </div>
                  <h4 className="text-gray-900 font-bold text-base mb-1">{opp.title}</h4>
                  <p className="text-gray-500 text-xs flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {opp.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {opp.location}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-emerald-50 rounded-[2px] text-xs font-semibold text-emerald-700 border border-emerald-200">
                      {opp.budget}
                    </span>
                  </div>
                </div>
                <button className="self-end px-4 py-1.5 rounded-[4px] bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors mt-1">
                  Apply Now
                </button>
              </div>
            ))}
            <div className="col-span-full mt-4 flex items-center justify-center">
              <button className="group flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-white border border-gray-200 text-[13px] font-bold text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]">
                <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                Load More Opportunities
              </button>
            </div>
          </div>
        );
      case 'directory':
        return (
          <div className="grid grid-cols-2 gap-4 pb-6 animate-in fade-in zoom-in-95 duration-500">
            {MOCK_DATA.directory.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="group flex items-center gap-4 p-4 rounded-[4px] bg-white border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-[4px] bg-gray-50 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">{cat.title}</h4>
                    <p className="text-gray-500 text-xs font-semibold">{cat.count} Listed</p>
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
      className="relative bg-gray-50 overflow-hidden selection:bg-purple-500/30 selection:text-white py-16 lg:py-24"
    >
      
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-purple-600 mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            A Glimpse of What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">Discover</span>
          </h2>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          
          
          <div className="flex flex-col gap-2">
            {PREVIEW_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-left p-6 rounded-[8px] transition-all duration-300 border outline-none focus-visible:ring-2 focus-visible:ring-purple-500 relative overflow-hidden group ${
                    isActive 
                      ? 'bg-white border-gray-200 shadow-xl shadow-purple-500/5' 
                      : 'bg-transparent border-transparent hover:bg-white/60 hover:border-gray-200'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent pointer-events-none" />
                  )}
                  <div className="relative z-10">

                    <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          
          <div className="relative rounded-[8px] overflow-hidden bg-white border border-gray-200 shadow-2xl shadow-gray-200 h-full min-h-[500px] max-h-[600px]">
            
            <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-[4px] bg-white border border-gray-200 text-[10px] text-gray-500 font-medium shadow-sm">
                <Star size={12} className="text-purple-500" /> n4re.com/app/{activeTab}
              </div>
            </div>

            
            <div className="px-6 pt-6 pb-2 h-[calc(100%-3rem)] bg-gray-50/30 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderActiveMockUI()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}