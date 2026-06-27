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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Mic, Users, Building2, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid, TrendingUp } from 'lucide-react'

import { AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop'
import PodcastTabs from './PodcastTabs'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

const STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes floatUp {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-4px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.9); opacity: 0; }
  }
  @keyframes gradShift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
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
  .stat-card {
    transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease;
  }
  .stat-card:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 24px rgba(0,0,0,.10);
  }
  .expert-row {
    transition: background .2s ease, transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .expert-row:hover {
    transform: translateX(4px);
  }
  .hero-gradient-btn {
    background-size: 200% 200%;
    animation: gradShift 4s ease infinite;
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
            ? 'bg-purple-100 text-purple-700 scale-105 shadow-sm'
            : 'bg-transparent text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-purple-50 hover:text-purple-600'
        }`}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[110%] w-48 bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.08)] border border-purple-100/60 z-50 py-1.5 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
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
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left rounded-lg mx-1 w-[calc(100%-8px)]"
              role="menuitem"
            >
              <Icon sx={{ fontSize: 16 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-1.5 mx-3" />
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <VisibilityOffIcon sx={{ fontSize: 16 }} />
            Remove from feed
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <FlagOutlinedIcon sx={{ fontSize: 16 }} />
            Report episode
          </button>
        </div>
      )}
    </div>
  )
})

const DesktopEpisodeCard = memo(function DesktopEpisodeCard({
  episode, onPlay, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
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

  const speakerInitial = episode.speaker ? episode.speaker.charAt(0).toUpperCase() : '?'

  return (
    <article
      className={`card-shimmer group flex flex-col rounded-2xl overflow-visible cursor-pointer transition-all duration-500 ease-out animate-in slide-in-from-bottom-8 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{
        animationDelay: `${index * 55}ms`,
      }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) }
      }}
    >
      <div className="relative w-full aspect-video rounded-[8px] overflow-hidden mb-3 flex-shrink-0 bg-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:shadow-[0_20px_48px_rgba(124,58,237,0.22),0_8px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-fuchsia-900/20 opacity-0 group-hover:opacity-100 transition-all duration-400" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_20px_rgba(217,70,239,0.4)] flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/30 hover:shadow-[0_0_30px_rgba(217,70,239,0.7)]">
            <div className="absolute inset-0 rounded-full border border-white/30 animate-[spin_5s_linear_infinite] opacity-60 pointer-events-none" />
            <PlayArrowIcon sx={{ fontSize: 26 }} className="drop-shadow-lg ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg pointer-events-none group-hover:opacity-0 transition-opacity duration-300 shadow-sm">
          <GraphicEqIcon sx={{ fontSize: 11 }} className="text-fuchsia-400" />
          {episode.duration}
        </div>

        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-purple-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors duration-250">
            {episode.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-[0_2px_8px_rgba(124,58,237,0.4)]">
              <span className="text-[9px] font-bold text-white select-none">{speakerInitial}</span>
            </div>
            <span className="text-[12px] font-semibold text-gray-700 truncate group-hover:text-purple-600 transition-colors duration-200">
              {episode.speaker}
            </span>
            {episode.verified && (
              <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate font-medium ml-7">
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

function StatCard({
  icon, value, label, color, bg, border, delay = 0,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
  bg: string
  border: string
  delay?: number
}) {
  return (
    <div
      className={`stat-card p-3 rounded-[6px] ${bg} border ${border} flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center shadow-sm shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[16px] font-black text-[var(--color-text-primary)] leading-none tracking-tight">{value}</span>
        <span className="text-[11px] font-medium text-[var(--color-text-secondary)] truncate mt-0.5">{label}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="relative flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[16px] font-black text-[var(--color-text-primary)] tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)] text-[10px] font-bold uppercase tracking-wider animate-in zoom-in-75 duration-500 delay-200">
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
        className="bg-white rounded-2xl w-[90%] max-w-[400px] p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-black text-gray-900">Create new playlist</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors border-none cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-700">Name</label>
            <input 
              type="text" 
              placeholder="E.g. Real Estate Tips" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-[14px]"
              autoFocus
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-gray-700">Privacy</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-[14px] bg-white">
              <option value="private">Private (Only you can view)</option>
              <option value="public">Public (Anyone can view)</option>
              <option value="unlisted">Unlisted (Anyone with link)</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 mt-8">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-full text-[14px] font-bold text-gray-600 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full text-[14px] font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all border-none cursor-pointer"
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

  // Identify the episode shown at the top (either playing or featured hero)
  const topEpisodeId = activeEpisode ? activeEpisode.id : filtered[0]?.id;
  // Filter out the top episode so it doesn't repeat at the bottom
  const filteredWithoutTop = filtered.filter((ep) => ep.id !== topEpisodeId);

  const displayedCount = page * perPage
  const displayedEpisodes = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedEpisodes.length < filteredWithoutTop.length

  const handleLoadMore = () => setPage((prev) => prev + 1)

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

  return (
    <div className="relative flex-1 w-full h-full flex flex-col bg-[var(--color-bg-muted)] overflow-hidden">
      <style>{STYLES}</style>

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col animate-in fade-in duration-500 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-12">
        <div className="sticky top-0 z-40 shrink-0 bg-white/95 backdrop-blur-sm px-2 py-1 ">
          <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        <div className="flex-1 bg-white flex flex-col xl:flex-row gap-6 px-4 md:px-6 py-2 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex-1 min-w-0 flex flex-col gap-7">
              <div
                className="w-full bg-white rounded-[8px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row group cursor-pointer transition-all duration-500 hover:shadow-[0_16px_48px_rgba(124,58,237,0.14),0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-6 duration-600"
                onClick={() => setActiveEpisode(filtered[0])}
              >
                <div className="relative w-full lg:w-[58%] aspect-video bg-black shrink-0 overflow-hidden">
                  <img
                    src={filtered[0]?.thumbnail || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'}
                    alt="Featured"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_40px_rgba(217,70,239,0.6)] hover:bg-white/35">
                      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                      <PlayArrowIcon sx={{ fontSize: 36 }} className="drop-shadow-lg ml-1 relative z-10" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] px-2.5 py-1 rounded-lg font-semibold">
                    <GraphicEqIcon sx={{ fontSize: 12 }} className="text-fuchsia-400" />
                    {filtered[0]?.duration || '28:10'}
                  </div>
                </div>

                <div className="p-5 lg:p-7 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)] text-[10px] font-black uppercase tracking-widest rounded-full">
                      <TrendingUp size={10} />
                      Trending #1
                    </span>
                  </div>
                  <h2 className="text-[20px] lg:text-[22px] font-black text-[var(--color-text-primary)] leading-tight mb-3 group-hover:text-[var(--color-primary-600)] transition-colors duration-300 line-clamp-2">
                    {filtered[0]?.title || 'The Future of Real Estate: What to Expect in 2027'}
                  </h2>
                  <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2">
                    Ritika Sharma shares insights on real estate market trends, investment opportunities, and strategies for long-term growth.
                  </p>

                  <div className="flex items-center gap-4 text-[11.5px] text-[var(--color-text-muted)] font-semibold mb-6">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                      <Eye size={12} className="text-purple-500" /> 28K Views
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                      <GraphicEqIcon sx={{ fontSize: 12 }} className="text-fuchsia-500" />
                      {filtered[0]?.duration || '28:10'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <button className="hero-gradient-btn flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[13px] font-bold rounded-[6px] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(124,58,237,0.3)] cursor-pointer">
                      <PlayArrowIcon sx={{ fontSize: 18 }} />
                      Watch Now
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[var(--color-text-primary)] text-[13px] font-semibold rounded-[6px] hover:bg-gray-50 hover:border-purple-200 hover:text-purple-700 hover:shadow-[0_4px_16px_rgba(124,58,237,0.12)] transition-all duration-300 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BookmarkBorderIcon sx={{ fontSize: 17 }} />
                      Save
                    </button>
                  </div>
                </div>
              </div>

            <div className="w-full flex flex-col gap-3">
              <SectionHeader
                icon={<Flame className="text-orange-500 drop-shadow-[0_2px_6px_rgba(249,115,22,0.5)]" size={20} />}
                title="Trending This Week"
              />

              <div className="relative group/slider w-full">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-30 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollLeft}
                        className="w-9 h-9 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 hover:shadow-[0_6px_24px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-6 pt-5 px-4 scroll-px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
                >
                  {filteredWithoutTop.slice(0, 10).map((ep, mapIdx) => {
                    const actualIdx = filtered.findIndex((e) => e.id === ep.id);
                    const rank = actualIdx + 1;
                    
                    return (
                      <div key={ep.id} className="min-w-[255px] w-[255px] snap-start relative">
                        <div className={`absolute -top-2.5 -left-2 w-[26px] h-[26px] rounded-lg z-20 flex items-center justify-center text-[11px] font-black border-2 border-white shadow-[0_3px_10px_rgba(0,0,0,0.15)] ${
                          rank === 1 ? 'bg-amber-400 text-amber-900' :
                          rank === 2 ? 'bg-gray-300 text-gray-700' :
                          rank === 3 ? 'bg-amber-600 text-amber-100' :
                          'bg-[var(--color-secondary-500)] text-white'
                        }`}>
                          {rank}
                        </div>
                        <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={mapIdx} />
                      </div>
                    )
                  })}
                </div>

                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-30 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent">
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollRight}
                        className="w-9 h-9 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 hover:shadow-[0_6px_24px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 pb-4">
              <SectionHeader
                icon={
                  <div className="p-1.5 bg-gradient-to-br from-[var(--color-primary-600)] to-purple-600 rounded-lg text-white shadow-[0_3px_10px_rgba(124,58,237,0.4)]">
                    <LayoutGrid size={14} />
                  </div>
                }
                title="All Real Estate Episodes"
              />

              {displayedEpisodes.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9 pt-1">
                    {displayedEpisodes.map((ep, idx) => (
                      <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-4 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="group flex items-center gap-2 px-7 py-2.5 rounded-[8px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                      >
                        <AutorenewIcon sx={{ fontSize: 17 }} className="group-hover:rotate-180 transition-transform duration-700" />
                        Load More Episodes
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-50 flex items-center justify-center shadow-[0_4px_16px_rgba(124,58,237,0.1)] border border-purple-100">
                    <LayoutGrid size={26} className="text-purple-300" />
                  </div>
                  <p className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-tight">No episodes found</p>
                  <p className="text-[13px] font-medium text-[var(--color-text-muted)] mt-1 max-w-[240px] leading-relaxed">
                    Try selecting a different category or clearing your filters
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full xl:w-[310px] shrink-0 flex flex-col gap-6 h-fit animate-in fade-in slide-in-from-right-6 duration-600 delay-150">
            <div className="flex flex-col gap-3.5 p-4  ">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[14px] font-black text-[var(--color-text-primary)] tracking-tight">Platform Highlights</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-100 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard icon={<Mic size={15} />} value="12K+" label="Episodes" color=" text-purple-600" bg="bg-purple-50/60" border="border-purple-100" delay={0} />
                <StatCard icon={<Users size={15} />} value="500+" label="Experts" color=" text-orange-500" bg="bg-orange-50/60" border="border-orange-100" delay={60} />
                <StatCard icon={<Building2 size={15} />} value="35" label="Cities" color=" text-blue-500" bg="bg-blue-50/60" border="border-blue-100" delay={120} />
                <StatCard icon={<Eye size={15} />} value="20M+" label="Views" color=" text-green-600" bg="bg-green-50/60" border="border-green-100" delay={180} />
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <AdvertisementPlaceholder />

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="flex flex-col gap-3 p-4 ">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="text-[14px] font-black text-[var(--color-text-primary)] tracking-tight">Top Experts</h3>
                <button className="text-purple-600 text-[11px] font-bold hover:text-purple-700 hover:underline cursor-pointer bg-transparent border-none transition-colors">
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
                    className="expert-row flex items-center justify-between group cursor-pointer hover:bg-purple-50/70 p-2 -mx-1 rounded-xl animate-in fade-in slide-in-from-right-3 fill-mode-both"
                    style={{ animationDelay: `${200 + idx * 60}ms` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden shadow-[0_3px_10px_rgba(0,0,0,0.15)] shrink-0 transition-shadow duration-300 group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.3)]">
                        <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] font-bold text-[var(--color-text-primary)] group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 11 }} className="text-blue-500" />
                        </div>
                        <span className="text-[11px] font-medium text-[var(--color-text-secondary)] leading-tight">{expert.role}</span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-transparent group-hover:bg-purple-100 flex items-center justify-center transition-all duration-300">
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {activeEpisode && (
        <div className="absolute inset-0 z-[100] bg-[#f8f9fa] animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-y-auto scrollbar-none">
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm px-6 py-3 border-b border-gray-100 flex items-center gap-4 shadow-sm shrink-0">
            <button 
              onClick={() => setActiveEpisode(null)}
              className="flex items-center gap-2 text-[14px] font-bold text-gray-700 hover:text-purple-600 transition-colors bg-transparent border-none cursor-pointer"
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} /> Back to Podcasts
            </button>
          </div>

          <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col xl:flex-row gap-6">
            <div className="flex-1 flex flex-col min-w-0">
              <div className="w-full bg-black rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] shadow-lg shrink-0">
                <PodcastVideoPlayerDesktop
                  episode={activeEpisode}
                  onClose={() => setActiveEpisode(null)}
                  onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
                  onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
                  hasNext={activeIdx < PODCAST_EPISODES.length - 1}
                  hasPrev={activeIdx > 0}
                  inline
                  hideTopOverlay
                />
              </div>
              
              <div className="mt-5 flex flex-col gap-4 px-2">
                <h1 className="text-[22px] font-black text-gray-900 leading-tight">{activeEpisode.title}</h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-[18px] shadow-sm">
                      {activeEpisode.speaker?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{activeEpisode.speaker}</h3>
                        {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500" />}
                      </div>
                      <p className="text-[12.5px] text-gray-500 font-medium leading-tight">{activeEpisode.role}</p>
                    </div>
                    <button className="ml-4 px-5 py-2 bg-gray-900 text-white rounded-full text-[13px] font-bold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer border-none">
                      Follow
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-[13px] font-bold transition-colors cursor-pointer border-none">
                      <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-[13px] font-bold transition-colors cursor-pointer border-none">
                      <ShareIcon sx={{ fontSize: 18 }} /> Share
                    </button>
                    <button 
                      onClick={() => setShowPlaylistModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-[13px] font-bold transition-colors border border-purple-200 cursor-pointer shadow-sm"
                    >
                      <PlaylistAddIcon sx={{ fontSize: 18 }} /> Create Playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-4 mt-6 xl:mt-0">
              <h3 className="text-[16px] font-black text-gray-900 px-1">Up Next</h3>
              <div className="flex flex-col gap-4">
                {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
                  <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPlaylistModal && (
        <CreatePlaylistModal onClose={() => setShowPlaylistModal(false)} />
      )}
    </div>
  )
}