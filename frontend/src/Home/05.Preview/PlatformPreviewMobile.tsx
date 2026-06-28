import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Star, Briefcase, MapPin, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';
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
    <motion.div 
      key="spotlight"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[320px] flex items-center justify-center overflow-hidden pb-4" 
      aria-live="polite"
    >
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
    </motion.div>
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
    <motion.div 
      key="red-expert"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[240px] flex items-center justify-center overflow-hidden pb-4" 
      aria-live="polite"
    >
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
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
    </motion.div>
  );
};

export default function PlatformPreviewMobile() {
  const [activeTab, setActiveTab] = useState(PREVIEW_TABS[0].key);
  
  // Swipe to change tabs functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = PREVIEW_TABS.findIndex(t => t.key === activeTab);
      if (isLeftSwipe && currentIndex < PREVIEW_TABS.length - 1) {
        setActiveTab(PREVIEW_TABS[currentIndex + 1].key);
      }
      if (isRightSwipe && currentIndex > 0) {
        setActiveTab(PREVIEW_TABS[currentIndex - 1].key);
      }
    }
  };

  const renderActiveMockUI = () => {
    switch (activeTab) {
      case 'spotlight':
        return <MobileSpotlightCarousel />;
      case 'red-expert':
        return <MobileRedExpertCarousel />;
      case 'opportunities':
        return (
          <motion.div 
            key="opportunities"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 pb-4"
          >
            {MOCK_DATA.opportunities.map((opp, idx) => {
              const colors = [
                { grad: 'from-blue-50 to-indigo-50', border: 'border-blue-100', text: 'text-blue-700', badgeBg: 'bg-blue-50', badgeBorder: 'border-blue-200', btn: 'bg-blue-600 active:bg-blue-700', activeBorder: 'active:border-blue-300' },
                { grad: 'from-rose-50 to-pink-50', border: 'border-rose-100', text: 'text-rose-700', badgeBg: 'bg-rose-50', badgeBorder: 'border-rose-200', btn: 'bg-rose-600 active:bg-rose-700', activeBorder: 'active:border-rose-300' },
                { grad: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', text: 'text-emerald-700', badgeBg: 'bg-emerald-50', badgeBorder: 'border-emerald-200', btn: 'bg-emerald-600 active:bg-emerald-700', activeBorder: 'active:border-emerald-300' },
                { grad: 'from-amber-50 to-orange-50', border: 'border-amber-100', text: 'text-amber-700', badgeBg: 'bg-amber-50', badgeBorder: 'border-amber-200', btn: 'bg-amber-600 active:bg-amber-700', activeBorder: 'active:border-amber-300' },
                { grad: 'from-purple-50 to-fuchsia-50', border: 'border-purple-100', text: 'text-purple-700', badgeBg: 'bg-purple-50', badgeBorder: 'border-purple-200', btn: 'bg-purple-600 active:bg-purple-700', activeBorder: 'active:border-purple-300' },
              ];
              const c = colors[idx % colors.length];

              return (
                <div key={idx} className={`p-3.5 rounded-[4px] bg-white border border-gray-200 shadow-sm ${c.activeBorder} transition-colors flex flex-col justify-between cursor-pointer`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-[4px] bg-gradient-to-br ${c.grad} border ${c.border} flex items-center justify-center ${c.text} font-black text-xs shrink-0`}>
                          {opp.company.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                        </div>
                        <span className={`${c.badgeBg} ${c.text} border ${c.badgeBorder} text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider`}>
                          {opp.type}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-gray-900 font-bold text-[13px] mb-1">{opp.title}</h4>
                    <p className="text-gray-600 text-[11px] flex items-center gap-2 mb-3 font-medium">
                      <span className="flex items-center gap-1"><Briefcase size={10} /> {opp.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {opp.location}</span>
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-[2px] text-[10px] font-bold text-gray-700 border border-gray-200">
                        {opp.budget}
                      </span>
                    </div>
                  </div>
                  <button className={`self-end px-3 py-1.5 rounded-[4px] ${c.btn} text-white text-[11px] font-bold transition-colors mt-1 shadow-sm`}>
                    Apply Now
                  </button>
                </div>
              );
            })}
            <div className="mt-3 flex justify-center w-full">
              <button className="group flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-white border border-gray-300 text-[12px] font-bold text-gray-700 active:bg-gray-50 transition-all duration-300 shadow-sm">
                <RefreshCcw size={14} className="group-active:rotate-180 transition-transform duration-700 text-gray-500" />
                Load More Opportunities
              </button>
            </div>
          </motion.div>
        );
      case 'directory':
        return (
          <motion.div 
            key="directory"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-3 pb-4"
          >
            {MOCK_DATA.directory.map((cat, idx) => {
              const Icon = cat.icon;
              const colors = [
                { grad: 'from-blue-50 to-indigo-50', border: 'border-blue-100', text: 'text-blue-700', activeBorder: 'active:border-blue-300', arrow: 'text-blue-600' },
                { grad: 'from-rose-50 to-pink-50', border: 'border-rose-100', text: 'text-rose-700', activeBorder: 'active:border-rose-300', arrow: 'text-rose-600' },
                { grad: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', text: 'text-emerald-700', activeBorder: 'active:border-emerald-300', arrow: 'text-emerald-600' },
                { grad: 'from-amber-50 to-orange-50', border: 'border-amber-100', text: 'text-amber-700', activeBorder: 'active:border-amber-300', arrow: 'text-amber-600' },
                { grad: 'from-purple-50 to-fuchsia-50', border: 'border-purple-100', text: 'text-purple-700', activeBorder: 'active:border-purple-300', arrow: 'text-purple-600' },
                { grad: 'from-cyan-50 to-sky-50', border: 'border-cyan-100', text: 'text-cyan-700', activeBorder: 'active:border-cyan-300', arrow: 'text-cyan-600' },
              ];
              const c = colors[idx % colors.length];

              return (
                <div key={idx} className={`flex flex-col gap-2 p-3.5 rounded-[4px] bg-white border border-gray-200 shadow-sm ${c.activeBorder} transition-colors cursor-pointer relative overflow-hidden`}>
                  <div className={`w-10 h-10 rounded-[4px] bg-gradient-to-br ${c.grad} border ${c.border} flex items-center justify-center ${c.text}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-[12px]">{cat.title}</h4>
                    <p className="text-gray-600 text-[10px] font-semibold mt-0.5">{cat.count} Listed</p>
                  </div>
                  <div className="absolute top-3.5 right-3.5">
                    <ArrowRight size={14} className={`opacity-50 ${c.arrow}`} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="platform-preview" 
      className="relative bg-gray-50 overflow-hidden selection:bg-purple-500/30 selection:text-purple-900 py-12"
    >
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10 px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 mb-2 px-3 py-1 bg-purple-100 rounded-full border border-purple-200">
            Platform Capabilities
          </span>
          <h2 className="text-[24px] leading-tight font-black text-gray-900 tracking-tight mt-2">
            A Glimpse of What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-600">Discover</span>
          </h2>
        </motion.div>

        <div className="flex w-full p-1 bg-gray-100 border border-gray-200 rounded-[8px] mb-4 gap-1 shadow-inner">
          {PREVIEW_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 shrink-0 text-center py-2 px-1 rounded-[6px] transition-all duration-300 outline-none relative ${
                  isActive 
                    ? 'bg-white shadow-sm border border-gray-200/50 ring-1 ring-black/5' 
                    : 'bg-transparent hover:bg-gray-200/50'
                }`}
              >
                <div className="relative z-10">
                  <h3 className={`text-[11px] sm:text-[12px] font-bold leading-tight ${isActive ? 'text-purple-700' : 'text-gray-500'}`}>
                    {tab.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        <div 
          className="relative flex flex-col rounded-[4px] overflow-hidden bg-white border border-gray-300 shadow-2xl shadow-gray-300/50 h-auto max-h-[400px] w-full mt-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          <div className="h-10 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
            <div className="mx-auto flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white border border-gray-300 text-[9px] text-gray-700 font-medium shadow-sm">
              <Star size={10} className="text-purple-600" /> n4re.com/app/{activeTab}
            </div>
          </div>

          <div className={`flex-1 px-4 pt-4 pb-1 bg-gray-50/50 ${
            (activeTab === 'spotlight' || activeTab === 'red-expert') 
              ? 'overflow-hidden' 
              : 'overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
          }`}>
            {renderActiveMockUI()}
          </div>
        </div>

      </div>
    </section>
  );
}