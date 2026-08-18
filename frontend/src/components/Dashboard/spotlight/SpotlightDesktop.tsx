import { motion, AnimatePresence, type Variants } from 'framer-motion'
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
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  }
}

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
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={onToggle}
        className={`w-6 h-6 flex items-center justify-center rounded-[4px] transition-colors duration-150 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${open
            ? 'bg-purple-100 text-purple-700 shadow-inner'
            : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700'
          }`}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertIcon sx={{ fontSize: 16 }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-[110%] w-40 bg-white rounded-[4px] shadow-lg border border-gray-100 z-50 py-1 origin-top-right"
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
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left rounded-[2px]"
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
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left rounded-[2px]"
              role="menuitem"
            >
              <VisibilityOffIcon sx={{ fontSize: 14 }} />
              Not interested
            </button>
            <button
              type="button"
              onClick={onAction}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left rounded-[2px]"
              role="menuitem"
            >
              <FlagOutlinedIcon sx={{ fontSize: 14 }} />
              Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export const DesktopSpotlightCard = memo(function DesktopSpotlightCard({
  video, onPlay,
}: {
  video: SpotlightVideo
  onPlay: (ep: SpotlightVideo) => void
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
      layoutId={`spotlight-card-${video.id}`}
      variants={itemVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={`group flex flex-col cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-[4px] ${moreOpen ? 'z-50 relative' : ''}`}
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
      <motion.div 
        variants={{ hover: { y: -5, scale: 1.02 } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative w-full aspect-[9/16] rounded-[4px] overflow-hidden mb-2 bg-gray-100 shadow-sm border border-black/5"
      >
        <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200 rounded-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-200" />

        <motion.div 
          variants={{ hover: { x: '150%', opacity: 1 } }}
          initial={{ x: '-150%', opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-10"
        />

        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none">
          <div className="w-9 h-9 bg-black/40 backdrop-blur-md rounded-[4px] flex items-center justify-center text-white border border-white/20 shadow-lg">
            <PlayArrowOutlinedIcon sx={{ fontSize: 20 }} />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center z-20">
          <div className="flex items-center gap-0.5 text-white text-[11px] font-medium drop-shadow-md">
            <PlayArrowIcon sx={{ fontSize: 14 }} className="text-white/90" />
            {video.views}
          </div>
        </div>
      </motion.div>

      <div className="flex items-start justify-between gap-1 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors duration-150">
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

function StatCard({ icon, value, label, color, bg }: { icon: React.ReactNode; value: string; label: string; color: string; bg: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, scale: 1.04 }}
      className={`p-2 rounded-[4px] ${bg} flex items-center gap-2 cursor-default`}
    >
      <div className={`w-7 h-7 ${color} flex items-center justify-center shrink-0 shadow-sm rounded-[4px]`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-bold text-gray-900 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-medium text-gray-500 truncate mt-0.5">{label}</span>
      </div>
    </motion.div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-[4px] bg-purple-100 text-purple-700 text-[9px] font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </motion.div>
  )
}

const CoverflowCarousel = memo(function CoverflowCarousel({ videos, onPlay, id }: { videos: SpotlightVideo[]; onPlay: (v: SpotlightVideo) => void; id?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = useCallback(() => setCurrentIndex(prev => prev + 1), [])
  const handlePrev = useCallback(() => setCurrentIndex(prev => prev - 1), [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered, handleNext])

  const items = videos.slice(0, 5)
  const activeIndex = ((currentIndex % 5) + 5) % 5

  return (
    <motion.div
      id={id}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative w-full h-[500px] sm:h-[520px] flex items-center justify-center overflow-hidden rounded-[4px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#9333EA", color: "#FFF" }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrev}
        className="absolute left-4 z-50 w-9 h-9 rounded-[4px] bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 shadow-md transition-colors"
      >
        <ChevronLeft size={18} />
      </motion.button>

      <div className="relative w-full max-w-[800px] h-full flex items-center justify-center perspective-[1000px]">
        {items.map((video, idx) => {
          let diff = idx - activeIndex
          
          if (diff > 2) diff -= 5
          if (diff < -2) diff += 5
          
          const absDiff = Math.abs(diff)
          const isActive = diff === 0

          const xPos = diff === 0 ? '0%' : diff === -1 ? '-65%' : diff === 1 ? '65%' : diff === -2 ? '-125%' : '125%'
          const scale = diff === 0 ? 1 : absDiff === 1 ? 0.82 : 0.68
          const zIndex = 50 - absDiff * 10
          const blur = diff === 0 ? '0px' : absDiff === 1 ? '5px' : '10px'
          const opacity = diff === 0 ? 1 : absDiff === 1 ? 0.7 : 0.3

          return (
            <motion.div
              key={video.id}
              layoutId={`carousel-card-${video.id}`}
              animate={{
                x: xPos,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
                filter: `blur(${blur})`
              }}
              transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.8 }}
              className={`absolute w-[220px] sm:w-[260px] md:w-[280px] aspect-[9/16] rounded-[4px] overflow-hidden cursor-pointer ${isActive ? 'shadow-[0_0_60px_-15px_rgba(147,51,234,0.6)] border border-purple-500/20' : 'shadow-xl border border-black/5'}`}
              onClick={() => {
                if (isActive) {
                  onPlay(video)
                } else {
                  setCurrentIndex(prev => prev + diff)
                }
              }}
            >
              <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover rounded-[4px]" />
              
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent h-[55%] pointer-events-none rounded-[4px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent mt-auto h-[40%] pointer-events-none rounded-[4px]" />

              <div className="absolute top-4 left-4 right-4 z-20 flex flex-col items-start gap-2">
                 <span className="inline-block px-2.5 py-1 rounded-[4px] text-[10px] font-extrabold bg-[#8B5CF6] text-white uppercase tracking-wider shadow-sm">
                   {video.tag || 'EDUCATION'}
                 </span>
                 <h3 className="text-white text-[20px] font-bold leading-tight drop-shadow-lg tracking-tight">
                   {video.title}
                 </h3>
                 <p className="text-white/95 text-[14px] font-medium drop-shadow-md line-clamp-2">
                   {video.author} 
                 </p>
              </div>

              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5">
                 <div className="w-9 h-9 rounded-[4px] bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-colors shadow-lg">
                   <PlayArrowIcon sx={{ fontSize: 20 }} className="ml-0.5" />
                 </div>
                 <span className="text-white font-bold text-[14px] drop-shadow-md">{video.views}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#9333EA", color: "#FFF" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="absolute right-4 z-50 w-9 h-9 rounded-[4px] bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 shadow-md transition-colors"
      >
        <ChevronRight size={18} />
      </motion.button>
    </motion.div>
  )
})

export default function SpotlightDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const [lastPoppedId, setLastPoppedId] = useState<string | null>(null)

  const handleSetActiveVideo = useCallback((video: SpotlightVideo | null) => {
    if (video === null) {
      if (activeVideo) {
        setLastPoppedId(activeVideo.id)
      }
      setActiveVideo(null)
    } else {
      setLastPoppedId(null)
      setActiveVideo(video)
    }
  }, [activeVideo])
  
  const perPage = 10
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    }, 450)
  }

  const activeIdx = activeVideo
    ? SPOTLIGHT_VIDEOS.findIndex((v) => v.id === activeVideo.id)
    : -1

  useEffect(() => {
    const targetId = activeVideo ? activeVideo.id : lastPoppedId;
    if (targetId) {
      const el = document.getElementById(`spotlight-card-${targetId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeVideo, lastPoppedId])

  const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex-1 w-full h-full flex flex-col bg-[#FDFDFD] overflow-hidden">
      <style>{STYLES}</style>
      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col overflow-y-auto scroll-smooth hide-scrollbar pb-6">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="sticky top-0 z-40 shrink-0 bg-white/90 backdrop-blur-md px-2 pt-1 pb-0">
          <div className="max-w-[1400px] mx-auto w-full">
            <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
          </div>
        </motion.div>
        <div className="flex-1 flex flex-col xl:flex-row gap-2 px-1 pb-1 pt-2 max-w-[1400px] w-full mx-auto">
          <main className="flex-1 min-w-0 flex flex-col gap-4">
            <CoverflowCarousel id={`spotlight-card-${filtered[0]?.id}`} videos={filtered} onPlay={setActiveVideo} />
            <motion.section initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="w-full flex flex-col bg-white rounded-[4px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
              <SectionHeader
                icon={
                  <div className="p-1.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[4px] text-white shadow-md">
                    <LayoutGrid size={14} />
                  </div>
                }
                title="Discover More"
              />

              {displayedVideos.length > 0 ? (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mt-2"
                  >
                    {displayedVideos.map((video) => (
                      <DesktopSpotlightCard key={video.id} video={video} onPlay={handleSetActiveVideo} />
                    ))}
                  </motion.div>

                  {hasMore && (
                    <motion.div variants={itemVariants} className="mt-10 mb-4 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0px 8px 24px rgba(124, 58, 237, 0.25)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-8 py-3 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer shadow-sm"
                      >
                        <motion.div
                          animate={isLoading ? { rotate: 360 } : {}}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <AutorenewIcon sx={{ fontSize: 18 }} />
                        </motion.div>
                        {isLoading ? 'Loading...' : 'Load More Spotlights'}
                      </motion.button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-[4px] border border-dashed border-gray-200">
                  <div className="w-12 h-12 mb-3 rounded-[4px] bg-white flex items-center justify-center shadow-sm border border-gray-100">
                    <LayoutGrid size={20} className="text-gray-400" />
                  </div>
                  <p className="text-[15px] font-bold text-gray-900">No spotlights found</p>
                  <p className="text-[13px] text-gray-500 mt-1 max-w-xs">
                    We couldn't find any content matching your current filters.
                  </p>
                </div>
              )}
            </motion.section>
          </main>

          <ScrollReveal className="w-full xl:w-[320px] shrink-0 flex flex-col gap-5 h-fit">

            <div className="bg-white rounded-[4px] p-2 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-[4px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />

              <div className="flex items-center gap-2 mb-5 relative z-10">
                <Flame size={18} className="text-orange-500" />
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Spotlight Impact</h3>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-3 relative z-10"
              >
                <StatCard icon={<Eye size={14} />} value={SPOTLIGHT_IMPACT_STATS[0].value} label={SPOTLIGHT_IMPACT_STATS[0].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[0].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[0].bgDesktop} />
                <StatCard icon={<Flame size={14} />} value={SPOTLIGHT_IMPACT_STATS[1].value} label={SPOTLIGHT_IMPACT_STATS[1].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[1].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[1].bgDesktop} />
                <StatCard icon={<Users size={14} />} value={SPOTLIGHT_IMPACT_STATS[2].value} label={SPOTLIGHT_IMPACT_STATS[2].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[2].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[2].bgDesktop} />
                <StatCard icon={<TrendingUp size={14} />} value={SPOTLIGHT_IMPACT_STATS[3].value} label={SPOTLIGHT_IMPACT_STATS[3].labelDesktop} color={SPOTLIGHT_IMPACT_STATS[3].colorDesktop} bg={SPOTLIGHT_IMPACT_STATS[3].bgDesktop} />
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative w-full rounded-[4px] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 p-6 text-center flex flex-col items-center justify-center min-h-[240px] shadow-lg cursor-pointer group"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

              <div className="relative w-[120px] h-[160px] mx-auto -mt-6 mb-5 rounded-[4px] overflow-hidden -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out border-2 border-white/10 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80" alt="App preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-[4px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-[4px] flex items-center justify-center border border-white/40"
                  >
                    <PlayArrowIcon sx={{ fontSize: 22 }} className="text-white ml-0.5" />
                  </motion.div>
                </div>
              </div>

              <div className="relative z-10 w-full mt-auto">
                <h3 className="text-white text-[17px] font-bold mb-1 leading-tight">Create. Share.</h3>
                <p className="text-white/80 text-[12px] font-medium mb-5 leading-tight">Join thousands showcasing ideas.</p>
                <motion.button 
                  whileHover={{ y: -2, backgroundColor: "#F3E8FF" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-700 text-[14px] font-bold px-4 py-2.5 rounded-[4px] w-full border-none cursor-pointer flex items-center justify-center gap-1 shadow-lg"
                >
                  Start Now
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-[4px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[4px] bg-purple-50 flex items-center justify-center">
                    <TrendingUp size={14} className="text-purple-600" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">Top Creators</h3>
                </div>
                <button className="text-purple-600 text-[13px] font-bold hover:text-purple-800 cursor-pointer bg-transparent border-none transition-colors">
                  See all
                </button>
              </div>

              <motion.div variants={containerVariants} className="flex flex-col gap-1">
                {TOP_CREATORS.slice(0, 5).map((expert) => (
                  <motion.div
                    variants={itemVariants}
                    key={expert.rank}
                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2.5 -mx-2.5 rounded-[4px] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[13px] font-bold w-4 text-center ${expert.rank <= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                        {expert.rank}
                      </span>
                      <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full border-[2px] border-white overflow-hidden bg-gray-100">
                          <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[14px] font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />
                        </div>
                        <span className="text-[12px] font-medium text-gray-500 mt-0.5 leading-tight">{expert.views}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </ScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[100] bg-black/90"
          >
            <ActiveSpotlightDesktop
              video={activeVideo}
              onClose={() => handleSetActiveVideo(null)}
              onNext={activeIdx < SPOTLIGHT_VIDEOS.length - 1 ? () => handleSetActiveVideo(SPOTLIGHT_VIDEOS[activeIdx + 1]) : undefined}
              onPrev={activeIdx > 0 ? () => handleSetActiveVideo(SPOTLIGHT_VIDEOS[activeIdx - 1]) : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}