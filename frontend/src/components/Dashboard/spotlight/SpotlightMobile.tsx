import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Eye, LayoutGrid, ChevronLeft, ChevronRight, Flame, Users, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, SPOTLIGHT_IMPACT_STATS, type SpotlightVideo } from './data'
import ActiveSpotlightMobile from './ActiveSpotlightMobile'

const MOBILE_STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.9); opacity: 0; }
  }
  @keyframes gradShift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%      { transform: translateY(-8px) rotate(1deg); }
  }
  @keyframes shine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  .m-card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
    border-radius: inherit;
  }
  .m-card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .5s ease forwards;
  }
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 400, damping: 20 } 
  }
}

function MobileMoreMenu({
  open, menuRef, onToggle, onAction,
}: {
  open: boolean
  menuRef: React.RefObject<HTMLDivElement | null>
  onToggle: (e: React.MouseEvent) => void
  onAction: (e: React.MouseEvent) => void
}) {
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none ${
          open ? 'bg-purple-100 text-purple-700 scale-105 shadow-inner' : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700'
        }`}
        aria-label="More options"
      >
        <MoreVertIcon sx={{ fontSize: 16 }} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-[110%] w-40 bg-white rounded-[4px] shadow-[0_20px_60px_-10px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.08)] border border-purple-100/60 z-50 py-1 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-150"
        >
          {[
            { Icon: ShareOutlinedIcon, label: 'Share spotlight' },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button 
              key={label} 
              type="button" 
              onClick={onAction}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
            >
              <Icon sx={{ fontSize: 14 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-0.5 mx-2" />
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <VisibilityOffIcon sx={{ fontSize: 14 }} />
            Not interested
          </button>
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <FlagOutlinedIcon sx={{ fontSize: 14 }} />
            Report spotlight
          </button>
        </div>
      )}
    </div>
  )
}

const MobileStatCard = ({ icon, value, label, color, bg }: any) => (
  <div className="p-2 rounded-[4px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden relative bg-white">
    <div className={`absolute inset-0 bg-gradient-to-br ${bg}`}></div>
    <div className="relative z-10 flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <div className={`w-6 h-6 shrink-0 rounded-md flex items-center justify-center ${color.replace('text-', 'bg-').replace('600', '50').replace('500', '50')} ${color}`}>
          {icon}
        </div>
        <span className="text-[13px] font-bold text-gray-900 leading-none tracking-tight">{value}</span>
      </div>
      <span className="block text-[9px] font-medium text-gray-500 leading-tight pl-[2px]">{label}</span>
    </div>
  </div>
)

const SpotlightCard = memo(function SpotlightCard({
  video, onPlay, rank, isTrending,
}: {
  video: SpotlightVideo
  onPlay: (v: SpotlightVideo) => void
  rank?: number
  isTrending?: boolean
  index?: number
}) {
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    function out(e: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [])

  return (
    <motion.div
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
      className={`m-card-shimmer group relative flex flex-col cursor-pointer ${isTrending ? 'w-[130px] shrink-0' : 'w-full'}`}
      onClick={() => onPlay(video)}
    >
      <div className="relative w-full aspect-[4/5] rounded-[4px] overflow-hidden mb-1 bg-gray-100 border border-black/5 shadow-sm transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-md">
        <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-95 group-hover:scale-100">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl">
            <PlayArrowOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>

        <div className="absolute bottom-1.5 left-1.5 flex items-center z-20">
          <div className="flex items-center gap-0.5 text-white text-[10px] font-medium drop-shadow-md">
            <PlayArrowIcon sx={{ fontSize: 12 }} className="text-white/90" />
            {video.views}
          </div>
        </div>

        {rank && (
          <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-[2px] flex items-center justify-center text-[9px] font-medium border border-white shadow-md ${
            rank === 1 ? 'bg-amber-400 text-amber-900' :
            rank === 2 ? 'bg-gray-300 text-gray-700'   :
            rank === 3 ? 'bg-amber-600 text-amber-100' :
            'bg-purple-500 text-white'
          }`}>{rank}</div>
        )}
      </div>

      <div className="flex items-start justify-between gap-0.5 px-0 mt-0.5">
        <div className="flex-1 min-w-0">
          <h4 className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
            {video.title}
          </h4>
          <div className="flex items-center gap-0.5 text-[10px] text-gray-500 font-medium">
            <span className="truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />}
          </div>
        </div>
        {!isTrending && (
          <MobileMoreMenu
            open={moreOpen}
            menuRef={moreMenuRef}
            onToggle={(e) => { e.stopPropagation(); setMoreOpen(v => !v) }}
            onAction={(e) => { e.stopPropagation(); setMoreOpen(false) }}
          />
        )}
      </div>
    </motion.div>
  )
})

const MobileHeroCarousel = memo(function MobileHeroCarousel({
  videos, onPlay
}: {
  videos: SpotlightVideo[]
  onPlay: (v: SpotlightVideo) => void
}) {
  const [rotation, setRotation] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)

  const handleNext = useCallback(() => setRotation(r => r - 72), [])
  const handlePrev = useCallback(() => setRotation(r => r + 72), [])

  useEffect(() => {
    if (isInteracting) return
    const timer = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(timer)
  }, [isInteracting, handleNext])

  const items = videos.slice(0, 5)
  const activeIndex = (Math.round(-rotation / 72) % 5 + 5) % 5

  return (
    <div 
      className="w-full h-[260px] overflow-hidden relative flex items-center justify-center" 
      style={{ perspective: '800px' }}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setTimeout(() => setIsInteracting(false), 2000)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <button 
        onClick={handlePrev} 
        className="absolute left-1.5 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all duration-200 shadow-sm active:scale-95"
      >
        <ChevronLeft size={16} />
      </button>

      <div 
        className="relative w-full max-w-[340px] h-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" 
        style={{ transformStyle: 'preserve-3d', transform: `translateZ(-160px) rotateY(${rotation}deg)` }}
      >
        {items.map((video, idx) => {
          const isActive = idx === activeIndex
          const cardAngle = idx * 72
          
          let diff = idx - activeIndex
          if (diff > 2) diff -= 5
          if (diff < -2) diff += 5
          const absDiff = Math.abs(diff)
          const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.8 : 0.4

          return (
            <div 
              key={video.id} 
              className={`absolute w-[140px] aspect-[9/16] rounded-[4px] overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'ring-1 ring-purple-500/40 ring-offset-1 border-none' : 'border border-black/5'}`}
              style={{ 
                transform: `rotateY(${cardAngle}deg) translateZ(160px)`, 
                opacity 
              }}
              onClick={() => {
                if (isActive) {
                  onPlay(video)
                } else {
                  setRotation(r => r - (diff * 72))
                }
              }}
            >
              <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-2 left-2">
                <span className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider shadow-sm">
                  {video.tag || 'Insight'}
                </span>
              </div>

              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-md transform transition-transform duration-200 hover:scale-110">
                    <PlayArrowOutlinedIcon sx={{ fontSize: 24 }} />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-2 left-2 right-2 z-20">
                <h3 className="text-white text-[13px] font-medium leading-tight line-clamp-2 mb-0.5 drop-shadow-md">{video.title}</h3>
                <p className="text-white/90 text-[10px] font-medium flex items-center gap-0.5 drop-shadow-md">
                  <span className="truncate">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 8 }} className="text-blue-400" />}
                </p>
                
                {isActive && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center gap-0.5 text-white text-[9px] font-medium drop-shadow-md">
                      <PlayArrowOutlinedIcon sx={{ fontSize: 10 }} className="text-white/90" /> {video.views} views
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button 
        onClick={handleNext} 
        className="absolute right-1.5 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all duration-200 shadow-sm active:scale-95"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
})

const MobileScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.3, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function SpotlightMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 6

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  useEffect(() => {
    if (activeVideo && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeVideo])

  const filtered = activeFilter === 'all'
    ? SPOTLIGHT_VIDEOS
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  const displayedVideos = filtered.slice(0, page * perPage)
  const hasMore = displayedVideos.length < filtered.length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="relative h-full w-full bg-[#fcfcfc] flex flex-col overflow-hidden pb-6">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100/50">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        <div className="flex-1 flex flex-col pb-1">
            <MobileScrollReveal className="mt-1">
              <MobileHeroCarousel videos={filtered} onPlay={setActiveVideo} />
            </MobileScrollReveal>

            <MobileScrollReveal className="mt-2 mx-2">
              <div className="bg-white rounded-[8px] p-2 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                
                <div className="flex items-center gap-1.5 mb-3 relative z-10">
                  <Flame size={16} className="text-orange-500" />
                  <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Spotlight Impact</h3>
                </div>
                
                <div className="grid grid-cols-4 gap-1 relative z-10">
                  <MobileStatCard icon={<Eye size={12} />} value={SPOTLIGHT_IMPACT_STATS[0].value} label={SPOTLIGHT_IMPACT_STATS[0].labelMobile} color={SPOTLIGHT_IMPACT_STATS[0].colorMobile} bg={SPOTLIGHT_IMPACT_STATS[0].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[0].delay + 50} />
                  <MobileStatCard icon={<Flame size={12} />} value={SPOTLIGHT_IMPACT_STATS[1].value} label={SPOTLIGHT_IMPACT_STATS[1].labelMobile} color={SPOTLIGHT_IMPACT_STATS[1].colorMobile} bg={SPOTLIGHT_IMPACT_STATS[1].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[1].delay + 50} />
                  <MobileStatCard icon={<Users size={12} />} value={SPOTLIGHT_IMPACT_STATS[2].value} label={SPOTLIGHT_IMPACT_STATS[2].labelMobile} color={SPOTLIGHT_IMPACT_STATS[2].colorMobile} bg={SPOTLIGHT_IMPACT_STATS[2].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[2].delay + 50} />
                  <MobileStatCard icon={<TrendingUp size={12} />} value={SPOTLIGHT_IMPACT_STATS[3].value} label={SPOTLIGHT_IMPACT_STATS[3].labelMobile} color={SPOTLIGHT_IMPACT_STATS[3].colorMobile} bg={SPOTLIGHT_IMPACT_STATS[3].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[3].delay + 50} />
                </div>
              </div>
            </MobileScrollReveal>

            <MobileScrollReveal className="mt-2 mx-2">
              <div className="relative w-full rounded-[4px] overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white border border-purple-100/60 p-4 text-center shadow-[0_4px_20px_rgba(124,58,237,0.06)] flex flex-col items-center justify-center min-h-[220px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 blur-2xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 blur-2xl rounded-full" />
                
                <div className="relative w-[90px] h-[140px] mx-auto -mt-2 mb-3 rounded-[4px] overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.1)] border-2 border-white animate-[float_5s_ease-in-out_infinite]">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80" alt="App preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-200 hover:bg-black/20">
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md transform transition-transform hover:scale-110 cursor-pointer">
                      <PlayArrowIcon sx={{ fontSize: 18 }} className="text-purple-600 ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 w-full mt-auto">
                  <h3 className="text-gray-900 text-[16px] font-medium mb-1.5 tracking-tight">Create. Share. Inspire.</h3>
                  <button className="relative overflow-hidden group bg-gray-900 text-white text-[12px] font-medium px-4 py-2 rounded-[4px] shadow-[0_2px_10px_0_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-purple-600 hover:shadow-[0_4px_16px_rgba(124,58,237,0.25)] active:scale-95 w-[75%] mx-auto block border-none cursor-pointer">
                    <span className="relative z-10">Start Creating</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                  </button>
                </div>
              </div>
            </MobileScrollReveal>

            <MobileScrollReveal className="mt-3 px-1.5">
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <div className="p-1 bg-gradient-to-br from-[var(--color-primary-600)] to-purple-600 rounded-[2px] text-white shadow-[0_2px_6px_rgba(124,58,237,0.3)]">
                  <LayoutGrid size={12} />
                </div>
                <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">All Spotlights</h3>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "50px" }}
                className="grid grid-cols-2 gap-1.5 w-full"
              >
                {displayedVideos.map((v, idx) => (
                  <SpotlightCard key={v.id} video={v} onPlay={setActiveVideo} index={idx} />
                ))}
              </motion.div>

              {hasMore && (
                <div className="mt-4 mb-2 flex items-center justify-center">
                  <motion.button
                    variants={itemVariants}
                    type="button"
                    onClick={() => setPage(p => p + 1)}
                    className="group flex items-center gap-1.5 px-5 py-2 rounded-[4px] bg-white border border-purple-200 text-[12px] font-medium text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(124,58,237,0.05)] hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <AutorenewIcon sx={{ fontSize: 16 }} className="group-hover:rotate-180 transition-transform duration-500" />
                    Load More Spotlights
                  </motion.button>
                </div>
              )}
            </MobileScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 20, stiffness: 350 }} className="absolute inset-0 z-[100]">
            <ActiveSpotlightMobile
              video={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}