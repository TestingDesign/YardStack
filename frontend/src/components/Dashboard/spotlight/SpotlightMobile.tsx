import { motion } from 'framer-motion'
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
import { Eye, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'

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
  .m-card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
    border-radius: inherit;
  }
  .m-card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .7s ease forwards;
  }
`



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
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none ${
          open ? 'bg-purple-100 text-purple-700 scale-105' : 'bg-transparent text-gray-400 hover:bg-purple-50 hover:text-purple-600'
        }`}
        aria-label="More options"
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-[110%] w-44 bg-white rounded-[4px] shadow-[0_20px_60px_-10px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.08)] border border-purple-100/60 z-50 py-1.5 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
        >
          {[
            { Icon: ShareOutlinedIcon, label: 'Share spotlight' },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button 
              key={label} 
              type="button" 
              onClick={onAction}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
            >
              <Icon sx={{ fontSize: 15 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-1 mx-3" />
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <VisibilityOffIcon sx={{ fontSize: 15 }} />
            Not interested
          </button>
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <FlagOutlinedIcon sx={{ fontSize: 15 }} />
            Report spotlight
          </button>
        </div>
      )}
    </div>
  )
}



const SpotlightCard = memo(function SpotlightCard({
  video, onPlay, rank, isTrending, index = 0,
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
    <div
      className={`m-card-shimmer group relative flex flex-col cursor-pointer animate-in fade-in fill-mode-both ${isTrending ? 'w-[140px] shrink-0 slide-in-from-right-4' : 'w-full slide-in-from-bottom-6'}`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onPlay(video)}
    >
      <div className="relative w-full aspect-[9/16] rounded-[4px] overflow-hidden mb-2 bg-gray-100 border border-black/5 shadow-sm">
        <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
            <PlayArrowOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center z-20">
          <div className="flex items-center gap-0.5 text-white text-[11px] font-medium drop-shadow-md">
            <PlayArrowIcon sx={{ fontSize: 14 }} className="text-white/90" />
            {video.views}
          </div>
        </div>

        {rank && (
          <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-[4px] flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md ${
            rank === 1 ? 'bg-amber-400 text-amber-900' :
            rank === 2 ? 'bg-gray-300 text-gray-700'   :
            rank === 3 ? 'bg-amber-600 text-amber-100' :
            'bg-purple-500 text-white'
          }`}>{rank}</div>
        )}
      </div>

      <div className="flex items-start justify-between gap-1 px-0.5 mt-0.5">
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2">
            {video.title}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-0.5">
            <span className="truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
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
    </div>
  )
})


const MobileHeroCarousel = memo(function MobileHeroCarousel({
  videos, onPlay
}: {
  videos: SpotlightVideo[]
  onPlay: (v: SpotlightVideo) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(2)

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, Math.min(videos.length - 1, 4)))
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  return (
    <div className="w-full h-[320px] overflow-hidden relative flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <button 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
        className="absolute left-1 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 shadow-sm"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="relative w-full max-w-[400px] h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {videos.slice(0, 5).map((video, idx) => {
          const isActive = idx === currentIndex
          const offset = idx - currentIndex
          const absOffset = Math.abs(offset)
          
          let transform = ''
          let zIndex = 10 - absOffset
          let opacity = 1
          
          if (offset === 0) {
            transform = 'translateX(0) scale(1) translateZ(0px)'
          } else if (offset === -1) {
            transform = 'translateX(-42%) scale(0.86) translateZ(-28px) rotateY(10deg)'
            opacity = 0.8
          } else if (offset === 1) {
            transform = 'translateX(42%) scale(0.86) translateZ(-28px) rotateY(-10deg)'
            opacity = 0.8
          } else {
             opacity = 0
             transform = 'translateX(0) scale(0)'
          }

          return (
            <div 
              key={video.id} 
              className={`absolute w-[170px] aspect-[9/16] rounded-[8px] overflow-hidden shadow-md cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'ring-2 ring-purple-500/40 ring-offset-1 border-none' : 'border border-black/5'}`}
              style={{ transform, zIndex, opacity }}
              onClick={() => isActive ? onPlay(video) : setCurrentIndex(idx)}
            >
              <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 rounded-[4px] text-[9px] font-semibold bg-purple-500 text-white uppercase tracking-wider shadow-sm">
                  {video.tag || 'Insight'}
                </span>
              </div>

              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg">
                    <PlayArrowOutlinedIcon sx={{ fontSize: 24 }} />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <h3 className="text-white text-[15px] font-semibold leading-tight line-clamp-2 mb-1 drop-shadow-md">{video.title}</h3>
                <p className="text-white/90 text-[11px] font-medium flex items-center gap-1 drop-shadow-md">
                  <span className="truncate">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500" />}
                </p>
                
                {isActive && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-white text-[10px] font-medium drop-shadow-md">
                      <PlayArrowOutlinedIcon sx={{ fontSize: 12 }} className="text-white/90" /> {video.views} views
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
        disabled={currentIndex >= Math.min(videos.length - 1, 4)}
        className="absolute right-1 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 shadow-sm"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
})


const MobileScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="relative h-full w-full bg-gray-50 flex flex-col overflow-y-auto overflow-x-hidden hide-scrollbar pb-12">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        <div className="flex-1 flex flex-col pb-2">
            <MobileScrollReveal className="">
              <MobileHeroCarousel videos={filtered} onPlay={setActiveVideo} />
            </MobileScrollReveal>

            <MobileScrollReveal className="mt-2 mx-2">
              <div className="flex flex-col gap-3 p-4 rounded-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="flex items-center gap-2 mb-1 relative z-10">
                  <Eye size={16} className="text-purple-600" />
                  <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Spotlight Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {SPOTLIGHT_IMPACT_STATS.map((s, i) => (
                    <div key={i} className={`p-3 rounded-[6px] bg-white/80 backdrop-blur-sm border ${s.borderMobile} shadow-sm`}>
                      <span className={`block text-[16px] font-black ${s.colorMobile} leading-none mb-1`}>{s.value}</span>
                      <span className="block text-[11px] font-bold text-gray-500">{s.labelMobile}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MobileScrollReveal>



            <MobileScrollReveal className="mt-4 mx-4">
              <div className="relative w-full rounded-[4px] overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#7c3aed] to-[#c026d3] p-6 text-center shadow-[0_8px_24px_rgba(124,58,237,0.25)] flex flex-col items-center justify-center min-h-[280px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative w-[120px] h-[180px] mx-auto -mt-6 mb-4 rounded-[10px] overflow-hidden shadow-2xl rotate-[-2deg]">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80" alt="App preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                      <PlayArrowOutlinedIcon sx={{ fontSize: 22 }} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 w-full mt-auto">
                  <h3 className="text-white text-[20px] font-black mb-1.5 drop-shadow-md leading-tight">Create. Share. Inspire.</h3>
                  <button className="bg-white text-[var(--color-primary-600)] text-[13px] font-bold px-5 py-2.5 rounded-[4px] shadow-lg transition-all w-full border-none">
                    Start Creating
                  </button>
                </div>
              </div>
            </MobileScrollReveal>

            <MobileScrollReveal className="mt-6 px-3">
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="p-1.5 bg-gradient-to-br from-[var(--color-primary-600)] to-purple-600 rounded-[4px] text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)]">
                  <LayoutGrid size={14} />
                </div>
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight">All Spotlights</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                {displayedVideos.map((v, idx) => (
                  <SpotlightCard key={v.id} video={v} onPlay={setActiveVideo} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setPage(p => p + 1)}
                    className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <AutorenewIcon sx={{ fontSize: 17 }} className="group-hover:rotate-180 transition-transform duration-700" />
                    Load More Spotlights
                  </button>
                </div>
              )}
            </MobileScrollReveal>
        </div>
      </div>

      {activeVideo && (
        <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 z-[100]">
          <ActiveSpotlightMobile
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        </motion.div>
      )}
    </motion.div>
  )
}