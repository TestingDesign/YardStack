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
import { Mic, Users, Building2, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid, TrendingUp } from 'lucide-react'
import { CircularProgress } from '@mui/material'

import { AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop'
import PodcastTabs from './PodcastTabs'
import PodcastActiveEpisodeDesktop from './PodcastActiveEpisodeDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

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
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%);
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
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
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
          className="absolute right-0 top-[110%] w-44 bg-white rounded-md shadow-lg border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-150"
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
  <div className="flex flex-col rounded-lg animate-pulse bg-white p-1 pb-2">
    <div className="w-full aspect-video rounded-md mb-2.5 bg-gray-200/80" />
    <div className="flex flex-col gap-1.5 px-1.5">
      <div className="h-3.5 bg-gray-200/80 rounded-sm w-5/6" />
      <div className="h-3.5 bg-gray-200/80 rounded-sm w-2/3" />
      <div className="flex items-center gap-2 mt-1.5">
        <div className="w-5 h-5 rounded-full bg-gray-200/80 shrink-0" />
        <div className="h-3 bg-gray-200/80 rounded-sm w-1/2" />
      </div>
      <div className="h-2.5 bg-gray-200/80 rounded-sm w-1/3 ml-7 mt-0.5" />
    </div>
  </div>
)

const DesktopEpisodeCard = memo(function DesktopEpisodeCard({
  episode, onPlay, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  index?: number
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    }, 600)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  const speakerInitial = episode.speaker ? episode.speaker.charAt(0).toUpperCase() : '?'

  return (
    <article
      className={`card-shimmer group flex flex-col rounded-lg overflow-visible cursor-pointer transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 opacity-0 animate-swipe-up ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onPlay(episode)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) }
      }}
    >
      <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2.5 flex-shrink-0 bg-gray-100 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 border border-black/5">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {isHovered && (
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-fuchsia-900/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-white/30">
            <PlayArrowIcon sx={{ fontSize: 22 }} className="ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium px-1.5 py-0.5 rounded pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
          <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />
          {episode.duration}
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors duration-200">
            {episode.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-sm">
              <span className="text-[8px] font-medium text-white select-none">{speakerInitial}</span>
            </div>
            <span className="text-[11px] font-medium text-gray-600 truncate group-hover:text-purple-600 transition-colors duration-200">
              {episode.speaker}
            </span>
            {episode.verified && (
              <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5 truncate font-normal ml-5.5">
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
    </article>
  )
})

const HorizontalEpisodeCard = memo(function HorizontalEpisodeCard({
  episode, onPlay, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  index?: number
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    }, 600)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(false)
  }

  return (
    <article
      className={`card-shimmer group relative flex items-start gap-2.5 p-1.5 cursor-pointer transition-colors duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg hover:bg-gray-50 opacity-0 animate-swipe-up ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onPlay(episode)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) }
      }}
    >
      <div className="relative shrink-0 w-[120px] aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm border border-black/5">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {isHovered && (
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 shadow-sm">
            <PlayArrowIcon sx={{ fontSize: 16 }} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-medium px-1 py-0.5 rounded group-hover:opacity-0 transition-opacity duration-200">
          <GraphicEqIcon sx={{ fontSize: 9 }} className="text-fuchsia-400" />
          {episode.duration}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors duration-200">
          {episode.title}
        </h3>
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px] font-medium text-gray-600 truncate group-hover:text-purple-600 transition-colors duration-200">
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
    </article>
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
      className={`p-2.5 rounded-md ${bg} flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 opacity-0 animate-swipe-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-6 h-6 ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-medium text-gray-900 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-medium text-gray-500 truncate mt-0.5">{label}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-2 opacity-0 animate-swipe-up">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-[3px] bg-purple-100 text-purple-700 text-[9px] font-medium uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

function CreatePlaylistModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl w-[90%] max-w-[400px] p-5 shadow-xl animate-in zoom-in-95 duration-200"
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
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-all text-[13px]"
              autoFocus
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-gray-700">Privacy</label>
            <select className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-all text-[13px] bg-white">
              <option value="private">Private (Only you can view)</option>
              <option value="public">Public (Anyone can view)</option>
              <option value="unlisted">Unlisted (Anyone with link)</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-5">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-[12px] font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all border-none cursor-pointer"
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
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const perPage = 10

  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  useEffect(() => {
    if (activeEpisode && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeEpisode])

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
    }, 600)
  }

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 24)
    }
  }, [])

  useEffect(() => {
    handleScroll()
    const timer = setTimeout(() => handleScroll(), 50)
    window.addEventListener('resize', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleScroll) }
  }, [handleScroll, filteredWithoutTop])

  const scrollRight = () => sliderRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
  const scrollLeft  = () => sliderRef.current?.scrollBy({ left: -280, behavior: 'smooth' })

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  const [featuredHovered, setFeaturedHovered] = useState(false)
  const featuredHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleFeaturedMouseEnter = () => {
    featuredHoverTimeoutRef.current = setTimeout(() => {
      setFeaturedHovered(true)
    }, 600)
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

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col animate-in fade-in duration-300 overflow-y-auto scroll-smooth hide-scrollbar pb-6">
        <div className="sticky top-0 z-40 shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-50 px-2 py-1.5 opacity-0 animate-swipe-up" style={{ animationDelay: '0ms' }}>
          <div className="max-w-[1400px] mx-auto">
            <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row gap-4 px-2 py-2 max-w-[1400px] w-full mx-auto">
          <main className="flex-1 min-w-0 flex flex-col gap-2">
              <div
                className="w-full bg-white rounded-lg flex flex-col lg:flex-row group cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 opacity-0 animate-swipe-up border border-gray-100 shadow-sm"
                style={{ animationDelay: '50ms' }}
                onClick={() => setActiveEpisode(filtered[0])}
                onMouseEnter={handleFeaturedMouseEnter}
                onMouseLeave={handleFeaturedMouseLeave}
              >
                <div className="relative w-full lg:w-[50%] aspect-video bg-black shrink-0 overflow-hidden mx-auto lg:mx-0 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg">
                  <img
                    src={filtered[0]?.thumbnail || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'}
                    alt="Featured"
                    className={`w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 ${featuredHovered ? 'opacity-0' : 'group-hover:opacity-100'}`}
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
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-sm">
                      <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5 relative z-10" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded font-medium">
                    <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />
                    {filtered[0]?.duration || '28:10'}
                  </div>
                </div>

                <div className="p-4 lg:p-5 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 text-[9px] font-medium uppercase tracking-wider rounded">
                      <TrendingUp size={10} />
                      Trending #1
                    </span>
                  </div>
                  <h2 className="text-[18px] lg:text-[22px] font-medium text-gray-900 leading-tight mb-2 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                    {filtered[0]?.title || 'The Future of Real Estate: What to Expect in 2027'}
                  </h2>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-4 line-clamp-2 max-w-[450px]">
                    Ritika Sharma shares insights on real estate market trends, investment opportunities, and strategies for long-term growth.
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-5">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <Eye size={12} className="text-purple-500" /> 28K Views
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      <GraphicEqIcon sx={{ fontSize: 12 }} className="text-fuchsia-500" />
                      {filtered[0]?.duration || '28:10'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <button className="m-hero-btn flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[12px] font-semibold rounded-[4px] shadow-[0_2px_10px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer border-none whitespace-nowrap">
                      <PlayArrowIcon sx={{ fontSize: 16 }} />
                      Watch Now
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[12px] font-medium rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                      Save
                    </button>
                  </div>
                </div>
              </div>

            <section className="w-full flex flex-col gap-2 bg-white rounded-lg p-4 opacity-0 animate-swipe-up border border-gray-50" style={{ animationDelay: '100ms' }}>
              <SectionHeader
                icon={<Flame className="text-orange-500" size={16} />}
                title="Trending This Week"
              />

              <div className="relative group/slider w-full mt-1">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollLeft}
                        className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-px-0 snap-x snap-mandatory hide-scrollbar"
                >
                  {filteredWithoutTop.slice(0, 10).map((ep, mapIdx) => {
                    const actualIdx = filtered.findIndex((e) => e.id === ep.id);
                    const rank = actualIdx + 1;
                    
                    return (
                      <div key={ep.id} className="min-w-[180px] w-[180px] snap-start relative pt-2 pl-2">
                        <div className={`absolute top-0 left-0 w-[18px] h-[18px] rounded z-20 flex items-center justify-center text-[9px] font-medium border-2 border-white shadow-sm ${
                          rank === 1 ? 'bg-amber-100 text-amber-700' :
                          rank === 2 ? 'bg-gray-100 text-gray-700' :
                          rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {rank}
                        </div>
                        <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={mapIdx} />
                      </div>
                    )
                  })}
                </div>

                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollRight}
                        className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="w-full flex flex-col bg-white rounded-lg p-4 opacity-0 animate-swipe-up border border-gray-50" style={{ animationDelay: '150ms' }}>
              <SectionHeader
                icon={
                  <div className="p-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[4px] text-white">
                    <LayoutGrid size={12} />
                  </div>
                }
                title="All Episodes"
              />

              {displayedEpisodes.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {displayedEpisodes.map((ep, idx) => (
                      <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                    ))}
                    {isLoading && (
                      <>
                        <DesktopEpisodeSkeleton />
                        <DesktopEpisodeSkeleton />
                        <DesktopEpisodeSkeleton />
                      </>
                    )}
                  </div>

                  {hasMore && (
                    <div className="mt-6 flex items-center justify-center opacity-0 animate-swipe-up" style={{ animationDelay: '300ms' }}>
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                      >
                        {isLoading ? (
                          <>
                            <CircularProgress size={14} sx={{ color: 'inherit' }} />
                            <span>Loading...</span>
                          </>
                        ) : (
                          <>
                            <AutorenewIcon sx={{ fontSize: 14 }} className="group-hover:rotate-180 transition-transform duration-500" />
                            Load More Episodes
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
                  <div className="w-10 h-10 mb-2 rounded-full bg-white flex items-center justify-center border border-gray-100">
                    <LayoutGrid size={16} className="text-gray-400" />
                  </div>
                  <p className="text-[14px] font-medium text-gray-900">No episodes found</p>
                  <p className="text-[12px] text-gray-500 mt-0.5 max-w-xs">
                    Try selecting a different category or clearing your filters
                  </p>
                </div>
              )}
            </section>
          </main>

          <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-5 h-fit">
            <div className="bg-white rounded-lg p-4 relative overflow-hidden opacity-0 animate-swipe-up border border-gray-50" style={{ animationDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <h3 className="text-[14px] font-medium text-gray-900 tracking-tight">Platform Highlights</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <StatCard icon={<Mic size={14} />} value="12K+" label="Episodes" color="text-purple-600" bg="bg-purple-50" delay={0} />
                <StatCard icon={<Users size={14} />} value="500+" label="Experts" color="text-orange-500" bg="bg-orange-50" delay={50} />
                <StatCard icon={<Building2 size={14} />} value="35" label="Cities" color="text-blue-500" bg="bg-blue-50" delay={100} />
                <StatCard icon={<Eye size={14} />} value="20M+" label="Views" color="text-green-600" bg="bg-emerald-50" delay={150} />
              </div>
            </div>

            <AdvertisementPlaceholder />

            <div className="bg-white rounded-lg p-4 opacity-0 animate-swipe-up border border-gray-50" style={{ animationDelay: '250ms' }}>
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
                  <div
                    key={idx}
                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-colors"
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
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {activeEpisode && (
        <PodcastActiveEpisodeDesktop
          activeEpisode={activeEpisode}
          setActiveEpisode={setActiveEpisode}
          activeIdx={activeIdx}
          filteredWithoutTop={filteredWithoutTop}
          DesktopEpisodeCard={DesktopEpisodeCard}
          HorizontalEpisodeCard={HorizontalEpisodeCard}
        />
      )}

      {showPlaylistModal && (
        <CreatePlaylistModal onClose={() => setShowPlaylistModal(false)} />
      )}
    </div>
  )
}