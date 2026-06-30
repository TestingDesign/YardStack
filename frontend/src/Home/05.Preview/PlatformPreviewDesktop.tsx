import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Star, Briefcase, MapPin, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';
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
      <motion.div 
        key="spotlight"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full min-h-[350px] flex items-center justify-center overflow-hidden pb-6 mt-4" 
        aria-live="polite"
      >
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
          let shadowClass = '';

          switch (position) {
            case 'center':
              transformClass = 'translate-x-0 scale-100';
              zIndexClass = 'z-30';
              opacityClass = 'opacity-100';
              shadowClass = 'shadow-[0_0_40px_rgba(168,85,247,0.3)] ring-1 ring-white/20';
              break;
            case 'left1':
            case 'right1':
              transformClass = position === 'left1' ? '-translate-x-[65%] scale-[0.85]' : 'translate-x-[65%] scale-[0.85]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-60 blur-[1px] hover:opacity-90 hover:blur-none';
              shadowClass = 'shadow-xl';
              break;
            case 'left2':
            case 'right2':
              transformClass = position === 'left2' ? '-translate-x-[120%] scale-[0.70]' : 'translate-x-[120%] scale-[0.70]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-30 blur-[2px] hover:opacity-50';
              break;
            default:
              transformClass = 'translate-x-0 scale-[0.5]';
              zIndexClass = 'z-0';
              opacityClass = 'opacity-0 pointer-events-none';
              break;
          }

          return (
            <button 
              key={idx} 
              aria-label={`View spotlight: ${video.title}`}
              aria-current={position === 'center' ? 'true' : 'false'}
              className={`absolute top-0 w-[240px] aspect-[9/16] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} ${shadowClass} group rounded-[8px] overflow-hidden cursor-pointer bg-gray-900 border border-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${video.bgImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 transition-opacity duration-500 group-hover:opacity-80" />
              
              {video.tag && (
                <div className={`absolute top-4 left-4 z-10 transition-all duration-500 ${position === 'center' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-[4px] uppercase tracking-wider shadow-lg ${video.tagColor}`}>
                    {video.tag}
                  </span>
                </div>
              )}

              <div className={`absolute inset-0 flex flex-col justify-end p-5 z-10 transition-all duration-500 ${position === 'center' ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className="mb-auto mt-14 text-left">
                  <h3 className="text-white font-bold text-[15px] xl:text-lg leading-tight mb-2 drop-shadow-md group-hover:text-purple-200 transition-colors">{video.title}</h3>
                  {video.subtitle && (
                    <div className="text-gray-200 text-sm font-medium drop-shadow-md flex items-center gap-1.5">
                      {video.subtitleIcon === 'map-pin' && <MapPin size={14} aria-hidden="true" />}
                      {video.subtitleIcon === 'briefcase' && <Briefcase size={14} aria-hidden="true" />}
                      {video.subtitle}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg group-hover:bg-purple-500/50 group-hover:scale-110 transition-all duration-300">
                        <Play className="text-white ml-0.5" size={14} fill="currentColor" aria-hidden="true" />
                      </div>
                      <span className="text-white font-bold text-sm drop-shadow-md">{video.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="absolute bottom-4 right-4 z-40">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            className="flex items-center justify-center w-10 h-10 bg-black/60 hover:bg-purple-700 border border-white/20 rounded-full backdrop-blur-md text-white transition-all duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </motion.div>
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
      <motion.div 
        key="red-expert"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full min-h-[350px] flex items-center justify-center overflow-hidden pb-6 mt-4" 
        aria-live="polite"
      >
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
          let shadowClass = '';

          switch (position) {
            case 'center':
              transformClass = 'translate-x-0 scale-100';
              zIndexClass = 'z-30';
              opacityClass = 'opacity-100';
              shadowClass = 'shadow-[0_0_40px_rgba(236,72,153,0.2)] ring-1 ring-white/20';
              break;
            case 'left1':
            case 'right1':
              transformClass = position === 'left1' ? '-translate-x-[55%] scale-[0.80]' : 'translate-x-[55%] scale-[0.80]';
              zIndexClass = 'z-20';
              opacityClass = 'opacity-60 blur-[1px] hover:opacity-90 hover:blur-none';
              shadowClass = 'shadow-xl';
              break;
            case 'left2':
            case 'right2':
              transformClass = position === 'left2' ? '-translate-x-[100%] scale-[0.60]' : 'translate-x-[100%] scale-[0.60]';
              zIndexClass = 'z-10';
              opacityClass = 'opacity-30 blur-[2px] hover:opacity-50';
              break;
            default:
              transformClass = 'translate-x-0 scale-[0.5]';
              zIndexClass = 'z-0';
              opacityClass = 'opacity-0 pointer-events-none';
              break;
          }

          return (
            <button 
              key={idx} 
              aria-label={`View Red Expert video: ${video.title} by ${video.author}`}
              aria-current={position === 'center' ? 'true' : 'false'}
              className={`absolute w-[400px] aspect-video transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${transformClass} ${zIndexClass} ${opacityClass} ${shadowClass} group rounded-[8px] overflow-hidden cursor-pointer bg-gray-900 border border-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${video.bgImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-pink-500/80 group-hover:scale-110 transition-all duration-300 border border-white/30 shadow-2xl ${position === 'center' ? 'opacity-100' : 'opacity-50'}`}>
                  <Play className="text-white ml-1" size={28} fill="currentColor" aria-hidden="true" />
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 w-full p-5 z-10 text-left transition-all duration-500 ${position === 'center' ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight mb-1.5 group-hover:text-pink-200 transition-colors">{video.title}</h4>
                    <p className="text-gray-300 text-xs flex items-center gap-1.5">
                      {video.author} <CheckCircle2 size={12} className="text-blue-400" aria-hidden="true" />
                    </p>
                  </div>
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-[4px] border border-white/10 shadow-sm">
                    {video.duration}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        <div className="absolute bottom-4 right-4 z-40">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            className="flex items-center justify-center w-10 h-10 bg-black/60 hover:bg-pink-600 border border-white/20 rounded-full backdrop-blur-md text-white transition-all duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </motion.div>
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
          <motion.div 
            key="opportunities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 pb-6"
          >
            <div className="flex flex-col gap-3">
              {MOCK_DATA.opportunities.map((opp, idx) => {
                const colors = [
                  { grad: 'from-blue-50 to-indigo-50', border: 'border-blue-100', text: 'text-blue-700', badgeBg: 'bg-blue-50', badgeBorder: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', hoverBorder: 'hover:border-blue-300', focusRing: 'focus-within:ring-blue-600', groupHover: 'group-hover:text-blue-700' },
                  { grad: 'from-rose-50 to-pink-50', border: 'border-rose-100', text: 'text-rose-700', badgeBg: 'bg-rose-50', badgeBorder: 'border-rose-200', btn: 'bg-rose-600 hover:bg-rose-700', hoverBorder: 'hover:border-rose-300', focusRing: 'focus-within:ring-rose-600', groupHover: 'group-hover:text-rose-700' },
                  { grad: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', text: 'text-emerald-700', badgeBg: 'bg-emerald-50', badgeBorder: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700', hoverBorder: 'hover:border-emerald-300', focusRing: 'focus-within:ring-emerald-600', groupHover: 'group-hover:text-emerald-700' },
                  { grad: 'from-amber-50 to-orange-50', border: 'border-amber-100', text: 'text-amber-700', badgeBg: 'bg-amber-50', badgeBorder: 'border-amber-200', btn: 'bg-amber-600 hover:bg-amber-700', hoverBorder: 'hover:border-amber-300', focusRing: 'focus-within:ring-amber-600', groupHover: 'group-hover:text-amber-700' },
                  { grad: 'from-purple-50 to-fuchsia-50', border: 'border-purple-100', text: 'text-purple-700', badgeBg: 'bg-purple-50', badgeBorder: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', hoverBorder: 'hover:border-purple-300', focusRing: 'focus-within:ring-purple-600', groupHover: 'group-hover:text-purple-700' },
                ];
                const c = colors[idx % colors.length];

                return (
                  <article 
                    key={idx} 
                    aria-labelledby={`opp-company-${idx}`}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[8px] bg-white border border-gray-200 ${c.hoverBorder} hover:shadow-lg transition-all duration-300 relative focus-within:ring-2 ${c.focusRing} focus-within:ring-offset-2`}
                  >
                    <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[8px]" aria-hidden="true" />
                    
                    <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 relative z-10">
                      <div className={`w-12 h-12 rounded-[8px] bg-gradient-to-br ${c.grad} border ${c.border} flex items-center justify-center ${c.text} font-black text-lg shadow-sm shrink-0`} aria-hidden="true">
                        {opp.company.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 id={`opp-company-${idx}`} className={`text-gray-900 font-bold text-base ${c.groupHover} transition-colors`}>
                            {opp.company}
                          </h4>
                          <CheckCircle2 size={14} className="text-blue-500" aria-label="Verified Client" />
                          <span className={`ml-2 ${c.badgeBg} ${c.text} border ${c.badgeBorder} text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider hidden sm:inline-block`}>
                            {opp.type}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium text-sm mb-1.5">
                          {opp.title}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <MapPin size={12} aria-hidden="true" /> {opp.location}
                          </span>
                          <span className={`sm:hidden ${c.badgeBg} ${c.text} border ${c.badgeBorder} text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider`}>
                            {opp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                      <span className="px-3 py-1 bg-gray-100 rounded-[4px] text-xs font-bold text-gray-700 border border-gray-200">
                        {opp.budget}
                      </span>
                      <button 
                        aria-label={`Apply for ${opp.title} at ${opp.company}`}
                        className={`flex items-center gap-2 px-6 py-2 rounded-[6px] ${c.btn} text-white text-sm font-bold transition-all duration-300 shadow-sm active:scale-95 focus:outline-none`}
                      >
                        Apply Now <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-[4px] bg-white border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
                <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out text-gray-500 group-hover:text-purple-600" aria-hidden="true" />
                Load More Opportunities
              </button>
            </div>
          </motion.div>
        );
      
      case 'directory':
        return (
          <motion.div 
            key="directory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-6"
          >
            {MOCK_DATA.directory.map((cat, idx) => {
              const Icon = cat.icon;
              const colors = [
                { grad: 'from-blue-50 to-indigo-50', border: 'border-blue-100', text: 'text-blue-700', iconBg: 'bg-blue-100', hoverBorder: 'hover:border-blue-300', focusRing: 'focus-within:ring-blue-600', groupHover: 'group-hover:text-blue-700', arrow: 'group-hover:text-blue-600' },
                { grad: 'from-rose-50 to-pink-50', border: 'border-rose-100', text: 'text-rose-700', iconBg: 'bg-rose-100', hoverBorder: 'hover:border-rose-300', focusRing: 'focus-within:ring-rose-600', groupHover: 'group-hover:text-rose-700', arrow: 'group-hover:text-rose-600' },
                { grad: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', text: 'text-emerald-700', iconBg: 'bg-emerald-100', hoverBorder: 'hover:border-emerald-300', focusRing: 'focus-within:ring-emerald-600', groupHover: 'group-hover:text-emerald-700', arrow: 'group-hover:text-emerald-600' },
                { grad: 'from-amber-50 to-orange-50', border: 'border-amber-100', text: 'text-amber-700', iconBg: 'bg-amber-100', hoverBorder: 'hover:border-amber-300', focusRing: 'focus-within:ring-amber-600', groupHover: 'group-hover:text-amber-700', arrow: 'group-hover:text-amber-600' },
                { grad: 'from-purple-50 to-fuchsia-50', border: 'border-purple-100', text: 'text-purple-700', iconBg: 'bg-purple-100', hoverBorder: 'hover:border-purple-300', focusRing: 'focus-within:ring-purple-600', groupHover: 'group-hover:text-purple-700', arrow: 'group-hover:text-purple-600' },
                { grad: 'from-cyan-50 to-sky-50', border: 'border-cyan-100', text: 'text-cyan-700', iconBg: 'bg-cyan-100', hoverBorder: 'hover:border-cyan-300', focusRing: 'focus-within:ring-cyan-600', groupHover: 'group-hover:text-cyan-700', arrow: 'group-hover:text-cyan-600' },
              ];
              const c = colors[idx % colors.length];

              return (
                <button 
                  key={idx} 
                  aria-label={`Browse ${cat.title} directory, ${cat.count} listed`}
                  className={`group text-left flex items-center justify-between p-4 sm:p-5 rounded-[8px] bg-white border border-gray-200 ${c.hoverBorder} hover:shadow-lg transition-all duration-300 relative overflow-hidden focus-within:ring-2 ${c.focusRing} focus-within:ring-offset-2`}
                >
                  <div className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[8px]" aria-hidden="true" />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 shrink-0 rounded-[8px] bg-gradient-to-br ${c.grad} border ${c.border} flex items-center justify-center ${c.text} group-hover:scale-110 shadow-sm transition-transform duration-300`} aria-hidden="true">
                      <Icon size={26} className="transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className={`text-gray-900 font-bold text-base ${c.groupHover} transition-colors`}>{cat.title}</h4>
                      <p className="text-gray-600 text-sm font-medium mt-0.5">{cat.count} Listed</p>
                    </div>
                  </div>
                  
                  <ArrowRight size={18} className={`relative z-10 text-gray-300 ${c.arrow} transition-colors duration-300 group-hover:translate-x-1`} aria-hidden="true" />
                </button>
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
      className="relative bg-gray-50 overflow-hidden selection:bg-purple-500/30 selection:text-purple-900 py-16 lg:py-24"
      aria-label="Platform capabilities preview"
    >
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 animate-pulse" style={{ animationDuration: '10s' }} aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-purple-700 mb-4 px-4 py-1.5 bg-purple-100 rounded-full border border-purple-200">
            Platform Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            A Glimpse of What You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-1000 cursor-default">Discover</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          <div 
            className="flex flex-col gap-3"
            role="tablist"
            aria-orientation="vertical"
          >
            {PREVIEW_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-left p-6 rounded-[4px] transition-all duration-300 border relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 ${
                    isActive 
                      ? 'bg-white border-purple-200 shadow-xl shadow-purple-900/5 scale-[1.02]' 
                      : 'bg-transparent border-transparent hover:bg-white/80 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none" aria-hidden="true" />
                  )}
                  <div className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
                    <h3 className={`flex items-center gap-2 text-xl font-bold mb-1 transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-purple-800'}`}>
                      {tab.icon && <tab.icon size={20} className={isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'} />}
                      {tab.title}
                    </h3>
                    {tab.badge && (
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] mb-2 ${isActive ? 'text-purple-700 bg-purple-100' : 'text-gray-500 bg-gray-100 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors'}`}>
                        {tab.badge}
                      </span>
                    )}
                    <p className={`text-[12px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div 
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="relative rounded-[4px] overflow-hidden bg-white border border-gray-300 shadow-2xl shadow-gray-300/50 h-[500px] lg:h-[600px] w-full mt-2 transform transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 flex flex-col"
            tabIndex={0}
          >
            <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2 sticky top-0 z-50" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <div className="mx-auto flex items-center gap-2 px-4 py-1.5 rounded-[4px] bg-white border border-gray-300 text-xs text-gray-700 font-medium shadow-sm">
                <Star size={12} className="text-purple-600 animate-pulse" /> n4re.com/app/{activeTab}
              </div>
            </div>

            <div className={`px-6 pt-6 pb-2 flex-1 bg-gray-50/50 ${
              (activeTab === 'spotlight' || activeTab === 'red-expert') 
                ? 'overflow-hidden' 
                : 'overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
            }`}>
              {renderActiveMockUI()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
