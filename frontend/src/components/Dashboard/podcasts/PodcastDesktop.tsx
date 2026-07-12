import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CloseIcon from '@mui/icons-material/Close'
import { Mic, Users, Building2, Eye, Flame, ChevronLeft, ChevronRight, LayoutGrid, TrendingUp, List } from 'lucide-react'
import { CircularProgress } from '@mui/material'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop'
import PodcastTabs from './PodcastTabs'
import PodcastActiveEpisodeDesktop from './PodcastActiveEpisodeDesktop'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import PauseIcon from '@mui/icons-material/Pause'
import { ProgressBar, fmtTime } from './PodcastVideoPlayerShared'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

const STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes swipeUpFade {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-swipe-up {
    animation: swipeUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
  }
  .card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .5s ease forwards;
  }
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
    transition: { staggerChildren: 0.03 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } 
  },
}

const swipeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 350, damping: 25 } 
  },
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
      <button
        type="button"
        onClick={onToggle}
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-150 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
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
          className="absolute right-0 top-[110%] w-44 bg-white rounded-[4px] shadow-lg border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          {[
            { Icon: ShareIcon, label: 'Share episode' },
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
            Remove from feed
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <FlagOutlinedIcon sx={{ fontSize: 14 }} />
            Report episode
          </button>
        </div>
      )}
    </div>
  )
})

const DesktopEpisodeSkeleton = () => (
  <div className="flex flex-col rounded-[4px] animate-pulse bg-white p-1 pb-2">
    <div className="w-full aspect-video rounded-[4px] mb-2.5 bg-gray-200/80" />
    <div className="flex flex-col gap-1.5 px-1.5">
      <div className="h-3.5 bg-gray-200/80 rounded-[2px] w-5/6" />
      <div className="h-3.5 bg-gray-200/80 rounded-[2px] w-2/3" />
      <div className="flex items-center gap-2 mt-1.5">
        <div className="w-5 h-5 rounded-full bg-gray-200/80 shrink-0" />
        <div className="h-3 bg-gray-200/80 rounded-[2px] w-1/2" />
      </div>
      <div className="h-2.5 bg-gray-200/80 rounded-[2px] w-1/3 ml-7 mt-0.5" />
    </div>
  </div>
)

const HoverVideoPreview = memo(function HoverVideoPreview({
  videoSrc,
}: {
  videoSrc: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) videoRef.current.pause()
    else videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
    if (videoRef.current.duration) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration)
    }
  }

  const handleLoadedMetadata = () => {
  }

  const handleSeek = (pct: number) => {
    if (!videoRef.current) return
    const newTime = pct * (videoRef.current.duration || 1)
    videoRef.current.currentTime = newTime
    setProgress(pct)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="absolute inset-0 w-full h-full z-10 bg-black overflow-hidden rounded-[4px]"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute top-1.5 right-1.5 z-20 pointer-events-auto">
        <button 
          onClick={toggleMute} 
          className="w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border-none cursor-pointer transition-colors backdrop-blur-sm shadow-sm"
        >
          {isMuted ? <VolumeOffIcon sx={{ fontSize: 14 }} /> : <VolumeUpIcon sx={{ fontSize: 14 }} />}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-1.5 pt-3 pointer-events-auto flex flex-col justify-end">
        <div className="flex items-center gap-1.5 px-0.5">
          <button 
            onClick={togglePlay} 
            className="text-white hover:text-fuchsia-400 border-none bg-transparent cursor-pointer transition-colors"
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 16 }} /> : <PlayArrowIcon sx={{ fontSize: 16 }} />}
          </button>
          <div className="flex-1 px-0.5" onClick={e => e.stopPropagation()}>
            <ProgressBar progress={progress} buffered={0} onChange={handleSeek} compact />
          </div>
          <span className="text-white/90 text-[8px] font-medium min-w-[26px] text-right tracking-wider">
            {fmtTime(currentTime)}
          </span>
        </div>
      </div>
    </motion.div>
  )
})

export const DesktopEpisodeCard = memo(function DesktopEpisodeCard({
  episode, onPlay, isActive = false, hideDetails = false, idPrefix = 'podcast-card-'
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  isActive?: boolean
  hideDetails?: boolean
  idPrefix?: string
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  const speakerInitial = episode.speaker ? episode.speaker.charAt(0).toUpperCase() : '?'

  return (
    <motion.article
      id={`${idPrefix}${episode.id}`}
      variants={itemVariants}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`card-shimmer group flex flex-col rounded-[4px] overflow-visible cursor-pointer transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
        moreOpen ? 'z-50 relative' : ''
      } ${isActive ? 'ring-2 ring-purple-500 ring-offset-2 bg-purple-50/30' : ''}`}
      onClick={() => onPlay(episode)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) }
      }}
    >
      <div className="relative w-full aspect-video rounded-[4px] overflow-hidden mb-2.5 flex-shrink-0 bg-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 border border-black/5">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {isHovered && <HoverVideoPreview videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" />}

        {!isHovered && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-transparent to-fuchsia-500/30 opacity-0 group-hover:opacity-100 transition-all duration-200" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-200 hover:bg-white/30">
                <PlayArrowIcon sx={{ fontSize: 22 }} className="ml-0.5" />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-[4px] pointer-events-none group-hover:opacity-0 transition-opacity duration-150">
              <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />
              {episode.duration}
            </div>
          </>
        )}
      </div>

      {!hideDetails && (
        <div className="flex items-start justify-between gap-2 px-0.5">
          <div className="min-w-0 flex-1">
            <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors duration-150">
              {episode.title}
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full shrink-0 bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
                <span className="text-[8px] font-medium text-white select-none">{speakerInitial}</span>
              </div>
              <span className="text-[11px] font-medium text-gray-600 truncate group-hover:text-purple-600 transition-colors duration-150">
                {episode.speaker}
              </span>
              {episode.verified && (
                <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5 truncate font-normal ml-6">
              {episode.role}
            </p>
          </div>

          <MoreMenu
            open={moreOpen}
            menuRef={menuRef}
            onToggle={(e) => { e.stopPropagation(); setMoreOpen((v) => !v) }}
            onAction={(e) => { e.stopPropagation(); setMoreOpen(false) }}
          />
        </div>
      )}
    </motion.article>
  )
})

export const HorizontalEpisodeCard = memo(function HorizontalEpisodeCard({
  episode, onPlay, isActive = false, idPrefix = 'podcast-card-'
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  isActive?: boolean
  idPrefix?: string
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  return (
    <motion.article
      id={`${idPrefix}${episode.id}`}
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
      className={`card-shimmer group relative flex items-start gap-2.5 p-1.5 cursor-pointer transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-[4px] hover:bg-gray-50 ${
        moreOpen ? 'z-50 relative' : ''
      } ${isActive ? 'bg-purple-50/50 border border-purple-200 shadow-sm' : ''}`}
      onClick={() => onPlay(episode)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) }
      }}
    >
      <div className="relative shrink-0 w-[180px] aspect-video rounded-[4px] overflow-hidden bg-gray-100 shadow-sm border border-black/5">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {isHovered && <HoverVideoPreview videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" />}
        {!isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-150 hover:scale-110 shadow-sm">
            <PlayArrowIcon sx={{ fontSize: 16 }} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-medium px-1 py-0.5 rounded-[4px] group-hover:opacity-0 transition-opacity duration-150">
          <GraphicEqIcon sx={{ fontSize: 9 }} className="text-fuchsia-400" />
          {episode.duration}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors duration-150">
          {episode.title}
        </h3>
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px] font-medium text-gray-600 truncate group-hover:text-purple-600 transition-colors duration-150">
            {episode.speaker}
          </span>
          {episode.verified && (
            <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />
          )}
        </div>
        <p className="text-[9px] text-gray-500 truncate font-normal">
          {episode.role}
        </p>
      </div>

      <div className="shrink-0 flex items-center pt-0.5">
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
  icon, value, label, color, bg,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
  bg: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className={`p-2.5 rounded-[4px] ${bg} flex items-center gap-2 transition-colors duration-200`}
    >
      <div className={`w-6 h-6 ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-medium text-gray-900 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-medium text-gray-500 truncate mt-0.5">{label}</span>
      </div>
    </motion.div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex items-center gap-2 mb-2"
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-[2px] bg-purple-100 text-purple-700 text-[9px] font-medium uppercase tracking-wider">
          {badge}
        </span>
      )}
    </motion.div>
  )
}

function CreatePlaylistModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[4px] w-[90%] max-w-[400px] p-5 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-medium text-gray-900">Create new playlist</h2>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors border-none cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              placeholder="E.g. Real Estate Tips" 
              className="w-full px-3 py-2 rounded-[4px] border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-all text-[13px]"
              autoFocus
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-gray-700">Privacy</label>
            <select className="w-full px-3 py-2 rounded-[4px] border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-all text-[13px] bg-white">
              <option value="private">Private (Only you can view)</option>
              <option value="public">Public (Anyone can view)</option>
              <option value="unlisted">Unlisted (Anyone with link)</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-5">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-[4px] text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-[4px] text-[12px] font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all border-none cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PodcastDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)
  const [lastPoppedId, setLastPoppedId] = useState<string | null>(null)

  const handleSetActiveEpisode = useCallback((ep: PodcastEpisode | null) => {
    if (ep === null) {
      if (activeEpisode) {
        setLastPoppedId(activeEpisode.id)
      }
      setActiveEpisode(null)
    } else {
      setLastPoppedId(null)
      setActiveEpisode(ep)
    }
  }, [activeEpisode])
  
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const perPage = 10

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const trendingScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateTrendingArrows = useCallback(() => {
    const el = trendingScrollRef.current
    if (!el) { setCanScrollLeft(false); setCanScrollRight(false); return }
    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = trendingScrollRef.current
    if (!el) return
    updateTrendingArrows()
    el.addEventListener('scroll', updateTrendingArrows, { passive: true })
    const ro = new ResizeObserver(updateTrendingArrows)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', updateTrendingArrows); ro.disconnect() }
  }, [updateTrendingArrows])

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  useEffect(() => {
    const targetId = activeEpisode ? activeEpisode.id : lastPoppedId;
    if (targetId) {
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(`podcast-card-${targetId}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 50); 
      return () => clearTimeout(timeoutId);
    }
  }, [activeEpisode, lastPoppedId])

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter((ep) => ep.category === activeFilter)

  const topEpisodeId = activeEpisode ? activeEpisode.id : filtered[0]?.id;
  const filteredWithoutTop = filtered.filter((ep) => ep.id !== topEpisodeId);

  const displayedCount = page * perPage
  const displayedEpisodes = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedEpisodes.length < filteredWithoutTop.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 300)
  }

  const [featuredHovered, setFeaturedHovered] = useState(false)
  const featuredHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleFeaturedMouseEnter = () => {
    featuredHoverTimeoutRef.current = setTimeout(() => {
      setFeaturedHovered(true)
    }, 300)
  }

  const handleFeaturedMouseLeave = () => {
    if (featuredHoverTimeoutRef.current) {
      clearTimeout(featuredHoverTimeoutRef.current)
    }
    setFeaturedHovered(false)
  }

  return (
    <div className="relative flex-1 w-full h-full flex flex-col bg-[#FDFDFD] overflow-hidden">
      <style>{STYLES}</style>

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col animate-in fade-in duration-200 overflow-y-auto scroll-smooth hide-scrollbar pb-6">
        <div className="sticky top-0 z-40 shrink-0 bg-white/90 backdrop-blur-md px-2 pt-1 pb-0 opacity-0 animate-swipe-up" style={{ animationDelay: '0ms' }}>
          <div className="max-w-[1400px] mx-auto w-full">
            <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row gap-4 px-2 pb-2 pt-0 max-w-[1400px] w-full mx-auto">
          <main className="flex-1 min-w-0 flex flex-col gap-2">
              <motion.div
                id={`podcast-card-${filtered[0]?.id}`}
                variants={swipeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "50px" }}
                className="w-full bg-white rounded-[4px] flex flex-col lg:flex-row group cursor-pointer border border-gray-100 shadow-sm"
                onClick={() => setActiveEpisode(filtered[0])}
                onMouseEnter={handleFeaturedMouseEnter}
                onMouseLeave={handleFeaturedMouseLeave}
              >
                <div className="relative w-full lg:w-[50%] aspect-video bg-black shrink-0 overflow-hidden mx-auto lg:mx-0 rounded-t-[4px] lg:rounded-tr-none lg:rounded-l-[4px]">
                  <img
                    src={filtered[0]?.thumbnail || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'}
                    alt="Featured"
                    className={`w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105 ${featuredHovered ? 'opacity-0' : 'group-hover:opacity-100'}`}
                  />
                  {featuredHovered && (
                    <video
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110 shadow-sm">
                      <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5 relative z-10" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded-[4px] font-medium">
                    <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />
                    {filtered[0]?.duration || '28:10'}
                  </div>
                </div>

                <div className="p-4 lg:p-5 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 text-[9px] font-medium uppercase tracking-wider rounded-[4px]">
                      <TrendingUp size={10} />
                      Trending #1
                    </span>
                  </div>
                  <h2 className="text-[18px] lg:text-[22px] font-medium text-gray-900 leading-tight mb-2 group-hover:text-purple-600 transition-colors duration-150 line-clamp-2">
                    {filtered[0]?.title || 'The Future of Real Estate: What to Expect in 2027'}
                  </h2>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-4 line-clamp-2 max-w-[450px]">
                    Ritika Sharma shares insights on real estate market trends, investment opportunities, and strategies for long-term growth.
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-5">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-[4px]">
                      <Eye size={12} className="text-purple-500" /> 28K Views
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-[4px]">
                      <GraphicEqIcon sx={{ fontSize: 12 }} className="text-fuchsia-500" />
                      {filtered[0]?.duration || '28:10'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <button 
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 text-white text-[12px] font-medium rounded-[4px] shadow-[0_2px_10px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer border-none whitespace-nowrap"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleVideoClick(filtered[0]?.id || 'pd-1'); 
                      }}
                    >
                      <PlayArrowIcon sx={{ fontSize: 16 }} />
                      Watch Now
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[12px] font-medium rounded-[4px] hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>

            <motion.section 
              variants={containerVariants}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "50px" }}
              className="w-full flex flex-col bg-white rounded-[4px] pt-4 px-4 pb-2 border border-gray-50"
            >
              <SectionHeader
                icon={<Flame className="text-orange-500" size={16} />}
                title="Trending This Week"
              />

              <div className="relative mt-1">
                {canScrollLeft && (
                  <button
                    onClick={() => {
                      const el = trendingScrollRef.current;
                      if (el) el.scrollBy({ left: -280, behavior: 'smooth' });
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-150 cursor-pointer shadow-md active:scale-90"
                    aria-label="Scroll trending left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {canScrollRight && (
                  <button
                    onClick={() => {
                      const el = trendingScrollRef.current;
                      if (el) el.scrollBy({ left: 280, behavior: 'smooth' });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-150 cursor-pointer shadow-md active:scale-90"
                    aria-label="Scroll trending right"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}

                <div
                  ref={trendingScrollRef}
                  className="flex gap-2 overflow-x-auto hide-scrollbar px-1 -mx-2 pt-1 pb-0.5"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {filteredWithoutTop.slice(0, 6).map((ep) => {
                    const actualIdx = filtered.findIndex((e) => e.id === ep.id);
                    const rank = actualIdx + 1;
                    
                    return (
                      <div key={ep.id} className="relative pt-2 pl-2 flex-shrink-0" style={{ width: '220px', scrollSnapAlign: 'start' }}>
                        <div className={`absolute top-0 left-0 w-[20px] h-[20px] rounded-[4px] z-20 flex items-center justify-center text-[10px] font-medium border-2 border-white shadow-sm ${
                          rank === 1 ? 'bg-amber-100 text-amber-700' :
                          rank === 2 ? 'bg-gray-100 text-gray-700' :
                          rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {rank}
                        </div>
                        <DesktopEpisodeCard episode={ep} onPlay={handleSetActiveEpisode} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.section>

            <motion.section 
              variants={containerVariants}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "50px" }}
              className="w-full flex flex-col bg-white rounded-[4px] p-4 border border-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-medium text-[#0B132B] tracking-tight">
                  All Real Estate Episodes
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-100 rounded-[4px] p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-[2px] transition-all duration-150 cursor-pointer border-none ${
                        viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                      }`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-[2px] transition-all duration-150 cursor-pointer border-none ${
                        viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                      }`}
                      aria-label="List view"
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {displayedEpisodes.length > 0 ? (
                <>
                  {viewMode === 'grid' ? (
                    <motion.div key="grid" variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                      {displayedEpisodes.map((ep) => (
                        <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={handleSetActiveEpisode} />
                      ))}
                      {isLoading && (
                        <>
                          <DesktopEpisodeSkeleton />
                          <DesktopEpisodeSkeleton />
                          <DesktopEpisodeSkeleton />
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="list" variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-3 mt-2">
                      {displayedEpisodes.map((ep) => (
                        <HorizontalEpisodeCard key={ep.id} episode={ep} onPlay={handleSetActiveEpisode} />
                      ))}
                    </motion.div>
                  )}

                  {hasMore && (
                    <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-medium text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-500 hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                      >
                        {isLoading ? (
                          <>
                            <CircularProgress size={14} sx={{ color: 'inherit' }} />
                            <span>Loading...</span>
                          </>
                        ) : (
                          <>
                            <AutorenewIcon sx={{ fontSize: 14 }} className="group-hover:rotate-180 transition-transform duration-300" />
                            Load More Episodes
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50/50 rounded-[4px] border border-dashed border-gray-200">
                  <div className="w-10 h-10 mb-2 rounded-full bg-white flex items-center justify-center border border-gray-100">
                    <LayoutGrid size={16} className="text-gray-400" />
                  </div>
                  <p className="text-[14px] font-medium text-gray-900">No episodes found</p>
                  <p className="text-[12px] text-gray-500 mt-0.5 max-w-xs">
                    Try selecting a different category or clearing your filters
                  </p>
                </div>
              )}
            </motion.section>
          </main>

          <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-5 h-fit">
            <motion.div 
              variants={containerVariants}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "50px" }}
              className="bg-white rounded-[4px] p-4 relative overflow-hidden border border-gray-50"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Platform Highlights</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <StatCard icon={<Mic size={14} />} value="12K+" label="Episodes" color="text-purple-600" bg="bg-purple-50" />
                <StatCard icon={<Users size={14} />} value="500+" label="Experts" color="text-orange-500" bg="bg-orange-50" />
                <StatCard icon={<Building2 size={14} />} value="35" label="Cities" color="text-blue-500" bg="bg-blue-50" />
                <StatCard icon={<Eye size={14} />} value="20M+" label="Views" color="text-green-600" bg="bg-emerald-50" />
              </div>
            </motion.div>

            <AdvertisementPlaceholder />

            <motion.div 
              variants={containerVariants}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "50px" }}
              className="bg-white rounded-[4px] p-4 border border-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Top Experts</h3>
                </div>
                <button className="text-purple-600 text-[11px] font-medium hover:text-purple-700 hover:underline cursor-pointer bg-transparent border-none transition-colors">
                  View all
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {[
                  { name: 'Ritika Sharma', role: 'Real Estate Analyst', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Amit Verma', role: 'Real Estate Consultant', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Rahul Prasad', role: 'Property Investment Expert', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Neha Iyer', role: 'Real Estate Strategist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
                ].map((expert, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-1.5 rounded-[4px] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                        <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] font-medium text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-500 leading-tight">{expert.role}</span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center">
                      <ChevronRight size={12} className="text-gray-300 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {activeEpisode && (
          <PodcastActiveEpisodeDesktop
            activeEpisode={activeEpisode}
            setActiveEpisode={handleSetActiveEpisode}
            activeIdx={activeIdx}
            filteredWithoutTop={filteredWithoutTop}
            DesktopEpisodeCard={DesktopEpisodeCard}
            lastPoppedId={lastPoppedId}
          />
        )}
      </AnimatePresence>

      {showPlaylistModal && (
        <CreatePlaylistModal onClose={() => setShowPlaylistModal(false)} />
      )}
    </div>
  )
}