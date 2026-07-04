import { motion } from 'framer-motion'
import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Users, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, TOP_CREATORS, SPOTLIGHT_IMPACT_STATS, type SpotlightVideo } from './data'
import ActiveSpotlightDesktop from './ActiveSpotlightDesktop'

const STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes swipeUpFade {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-swipe-up {
    animation: swipeUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.15) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .7s ease forwards;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const MoreMenu = memo(function MoreMenu({
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
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
          open
            ? 'bg-purple-100 text-purple-700 shadow-inner'
            : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700'
        }`}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertIcon sx={{ fontSize: 16 }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[110%] w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          {[
            { Icon: ShareIcon, label: 'Share spotlight' },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={onAction}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
              role="menuitem"
            >
              <Icon sx={{ fontSize: 14 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-1 mx-2" />
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <VisibilityOffIcon sx={{ fontSize: 14 }} />
            Not interested
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <FlagOutlinedIcon sx={{ fontSize: 14 }} />
            Report
          </button>
        </div>
      )}
    </div>
  )
})

const DesktopSpotlightCard = memo(function DesktopSpotlightCard({
  video, onPlay, index = 0,
}: {
  video: SpotlightVideo
  onPlay: (ep: SpotlightVideo) => void
  index?: number
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className={`card-shimmer group flex flex-col cursor-pointer transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { 
          e.preventDefault() 
          onPlay(video) 
        }
      }}
    >
      <div className="relative w-full aspect-[9/16] rounded-md overflow-hidden mb-2 bg-gray-100 transition-all duration-300 group-hover:-translate-y-0.5 border border-black/5">
        <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none">
          <div className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <PlayArrowOutlinedIcon sx={{ fontSize: 20 }} />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center z-20">
          <div className="flex items-center gap-0.5 text-white text-[11px] font-medium drop-shadow-md">
            <PlayArrowIcon sx={{ fontSize: 14 }} className="text-white/90" />
            {video.views}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-1 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-0.5">
            <span className="truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
          </div>
        </div>

        <MoreMenu
          open={moreOpen}
          menuRef={menuRef}
          onToggle={(e) => { e.stopPropagation(); setMoreOpen((v) => !v) }}
          onAction={(e) => { e.stopPropagation(); setMoreOpen(false) }}
        />
      </div>
    </motion.article>
  )
})

function StatCard({
  icon, value, label, color, bg, delay = 0,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
  bg: string
  delay?: number
}) {
  return (
    <div
      className={`p-2 rounded-md ${bg} flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 opacity-0 animate-swipe-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-7 h-7 ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-medium text-gray-900 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-medium text-gray-500 truncate mt-0.5">{label}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 opacity-0 animate-swipe-up">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[15px] font-medium text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-[3px] bg-purple-100 text-purple-700 text-[9px] font-medium uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

const CoverflowCarousel = memo(function CoverflowCarousel({
  videos, onPlay
}: {
  videos: SpotlightVideo[]
  onPlay: (v: SpotlightVideo) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(2)

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, Math.min(videos.length - 1, 4)))
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  return (
    <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden bg-gray-50/40 rounded-lg opacity-0 animate-swipe-up" style={{ perspective: '1000px' }}>
      <button 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
        className="absolute left-3 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="relative w-full max-w-[800px] h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
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
            transform = 'translateX(-45%) scale(0.9) translateZ(-60px) rotateY(15deg)'
            opacity = 0.9
          } else if (offset === 1) {
            transform = 'translateX(45%) scale(0.9) translateZ(-60px) rotateY(-15deg)'
            opacity = 0.9
          } else if (offset === -2) {
            transform = 'translateX(-80%) scale(0.75) translateZ(-120px) rotateY(25deg)'
            opacity = 0.6
          } else if (offset === 2) {
            transform = 'translateX(80%) scale(0.75) translateZ(-120px) rotateY(-25deg)'
            opacity = 0.6
          } else {
             opacity = 0
             transform = 'translateX(0) scale(0)'
          }
          
          return (
            <div 
              key={video.id}
              className={`absolute w-[160px] sm:w-[200px] aspect-[9/16] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'ring-2 ring-purple-500/40 ring-offset-1' : 'border border-black/10'}`}
              style={{ transform, zIndex, opacity }}
              onClick={() => isActive ? onPlay(video) : setCurrentIndex(idx)}
            >
              <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
                    <PlayArrowIcon sx={{ fontSize: 22 }} />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <span className="inline-block px-1.5 py-0.5 mb-1.5 rounded-[3px] text-[9px] font-medium bg-white/20 backdrop-blur-md text-white uppercase tracking-wider border border-white/10">
                  {video.tag || 'Insight'}
                </span>
                <h3 className="text-white text-[14px] font-medium leading-tight line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-white/90 text-[11px] font-medium flex items-center gap-1">
                  <span className="truncate">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500" />}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      <button 
        onClick={handleNext}
        disabled={currentIndex >= Math.min(videos.length - 1, 4)}
        className="absolute right-3 z-50 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
})

export default function SpotlightDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const perPage = 10

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeVideo && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeVideo])

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? SPOTLIGHT_VIDEOS
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  const topVideoId = activeVideo ? activeVideo.id : filtered[0]?.id;
  const filteredWithoutTop = filtered.filter((v) => v.id !== topVideoId);

  const displayedCount = page * perPage
  const displayedVideos = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedVideos.length < filteredWithoutTop.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 600)
  }

  const activeIdx = activeVideo
    ? SPOTLIGHT_VIDEOS.findIndex((v) => v.id === activeVideo.id)
    : -1

const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.25, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative flex-1 w-full h-full flex flex-col bg-[#FDFDFD] overflow-hidden">
      <style>{STYLES}</style>

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col overflow-y-auto scroll-smooth hide-scrollbar pb-6">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="sticky top-0 z-40 shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-50 px-4 py-1.5">
          <div className="max-w-[1400px] mx-auto">
            <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col xl:flex-row gap-6 px-2 py-2 max-w-[1400px] w-full mx-auto">
          
          <main className="flex-1 min-w-0 flex flex-col gap-4">
            <section>
              <CoverflowCarousel videos={filtered} onPlay={setActiveVideo} />
            </section>

            <motion.section initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="w-full flex flex-col bg-white rounded-lg p-4">
              <SectionHeader
                icon={
                  <div className="p-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[4px] text-white">
                    <LayoutGrid size={12} />
                  </div>
                }
                title="Discover More"
              />

              {displayedVideos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {displayedVideos.map((video, idx) => (
                      <DesktopSpotlightCard key={video.id} video={video} onPlay={setActiveVideo} index={idx} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-8 flex items-center justify-center opacity-0 animate-swipe-up" style={{ animationDelay: '300ms' }}>
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                      >
                        <AutorenewIcon sx={{ fontSize: 16 }} className={isLoading ? 'animate-spin' : ''} />
                        {isLoading ? 'Loading...' : 'Load More Spotlights'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                  <div className="w-10 h-10 mb-2 rounded-full bg-white flex items-center justify-center border border-gray-100">
                    <LayoutGrid size={16} className="text-gray-400" />
                  </div>
                  <p className="text-[14px] font-medium text-gray-900">No spotlights found</p>
                  <p className="text-[12px] text-gray-500 mt-0.5 max-w-xs">
                    We couldn't find any content matching your current filters.
                  </p>
                </div>
              )}
            </motion.section>
          </main>

          <ScrollReveal className="w-full xl:w-[300px] shrink-0 flex flex-col gap-4 h-fit">
            
            <div className="bg-white rounded-[8px] p-4 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Flame size={16} className="text-orange-500" />
                <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Spotlight Impact</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <StatCard icon={<Eye size={12} />} value={SPOTLIGHT_IMPACT_STATS[0].value} label={SPOTLIGHT_IMPACT_STATS[0].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[0].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[0].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[0].delay + 100} />
                <StatCard icon={<Flame size={12} />} value={SPOTLIGHT_IMPACT_STATS[1].value} label={SPOTLIGHT_IMPACT_STATS[1].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[1].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[1].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[1].delay + 100} />
                <StatCard icon={<Users size={12} />} value={SPOTLIGHT_IMPACT_STATS[2].value} label={SPOTLIGHT_IMPACT_STATS[2].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[2].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[2].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[2].delay + 100} />
                <StatCard icon={<TrendingUp size={12} />} value={SPOTLIGHT_IMPACT_STATS[3].value} label={SPOTLIGHT_IMPACT_STATS[3].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[3].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[3].bgDesktop} delay={SPOTLIGHT_IMPACT_STATS[3].delay + 100} />
              </div>
            </div>

            <div className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 p-5 text-center flex flex-col items-center justify-center min-h-[220px] group opacity-0 animate-swipe-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="relative w-[110px] h-[150px] mx-auto -mt-6 mb-4 rounded-md overflow-hidden -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 border border-white/10">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80" alt="App preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <PlayArrowIcon sx={{ fontSize: 18 }} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 w-full mt-auto">
                <h3 className="text-white text-[15px] font-medium mb-1 leading-tight">Create. Share.</h3>
                <p className="text-white/80 text-[11px] font-medium mb-4 leading-tight">Join thousands showcasing ideas.</p>
                <button className="bg-white text-purple-700 text-[13px] font-medium px-4 py-2 rounded-md hover:-translate-y-0.5 transition-all w-full border-none cursor-pointer flex items-center justify-center gap-1.5">
                  Start Now
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 opacity-0 animate-swipe-up" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[4px] bg-purple-50 flex items-center justify-center">
                    <TrendingUp size={12} className="text-purple-600" />
                  </div>
                  <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Top Creators</h3>
                </div>
                <button className="text-purple-600 text-[12px] font-medium hover:text-purple-800 cursor-pointer bg-transparent border-none transition-colors">
                  See all
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {TOP_CREATORS.map((expert) => (
                  <div
                    key={expert.rank}
                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[12px] font-medium w-4 text-center ${expert.rank <= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                        {expert.rank}
                      </span>
                      <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 to-indigo-500 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full border-[1.5px] border-white overflow-hidden bg-gray-100">
                          <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] font-medium text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500" />
                        </div>
                        <span className="text-[11px] font-medium text-gray-500 mt-0.5 leading-tight">{expert.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>
        </div>
      </div>
      
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <ActiveSpotlightDesktop
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
            onNext={activeIdx < SPOTLIGHT_VIDEOS.length - 1 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx + 1]) : undefined}
            onPrev={activeIdx > 0 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx - 1]) : undefined}
          />
        </div>
      )}
    </motion.div>
  )
}