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
import { Flame, Eye, ChevronRight, ChevronLeft, LayoutGrid, List, TrendingUp, Mic, Users, Building2 } from 'lucide-react'

import PodcastTabs from './PodcastTabs'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import PodcastVideoPlayerMobile from './PodcastVideoPlayerMobile'

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
  .m-expert-avatar {
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
  }
  .m-expert-avatar:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 28px rgba(124,58,237,0.28);
  }
  .m-hero-btn {
    background-size: 200% 200%;
    animation: gradShift 4s ease infinite;
  }
`

const EXPERTS = [
  { name: 'Ritika Sharma', role: 'Real Estate Analyst',      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  { name: 'Amit Verma',   role: 'Real Estate Consultant',   image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
  { name: 'Rahul Prasad', role: 'Property Investment Expert', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { name: 'Neha Iyer',    role: 'Real Estate Strategist',   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
]

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
        aria-expanded={open}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-[110%] w-44 bg-white rounded-xl shadow-[0_20px_60px_-10px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.08)] border border-purple-100/60 z-50 py-1.5 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
          role="menu"
        >
          {[
            { Icon: ShareIcon,         label: 'Share episode'   },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button key={label} type="button" onClick={onAction}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
              role="menuitem">
              <Icon sx={{ fontSize: 15 }} />{label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-1 mx-3" />
          <button type="button" onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left" role="menuitem">
            <VisibilityOffIcon sx={{ fontSize: 15 }} />Remove from feed
          </button>
          <button type="button" onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left" role="menuitem">
            <FlagOutlinedIcon sx={{ fontSize: 15 }} />Report episode
          </button>
        </div>
      )}
    </div>
  )
}

const TrendingCard = memo(function TrendingCard({
  episode, onPlay, rank, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  rank: number
  index?: number
}) {
  const speakerInitial = episode.speaker?.charAt(0).toUpperCase() ?? '?'

  return (
    <div
      className="m-card-shimmer relative shrink-0 w-[calc(50vw-24px)] max-w-[200px] flex flex-col gap-2 animate-in fade-in slide-in-from-right-4 fill-mode-both cursor-pointer group"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) } }}
    >
      <div className="relative w-full aspect-video rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.10)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(124,58,237,0.22)] mt-2 ml-1.5">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <img src={episode.thumbnail} alt={episode.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-fuchsia-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <div className="relative w-9 h-9 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 rounded-full border border-white/30 animate-[spin_5s_linear_infinite] opacity-50 pointer-events-none" />
              <PlayArrowIcon sx={{ fontSize: 18 }} className="ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg group-hover:opacity-0 transition-opacity duration-200 shadow-sm">
            <GraphicEqIcon sx={{ fontSize: 11 }} className="text-fuchsia-400" />{episode.duration}
          </div>
        </div>
        
        <div className={`absolute -top-2.5 -left-2 w-[26px] h-[26px] rounded-md z-20 flex items-center justify-center text-[11px] font-black border-2 border-white shadow-[0_3px_10px_rgba(0,0,0,0.15)] ${
          rank === 1 ? 'bg-amber-400 text-amber-900' :
          rank === 2 ? 'bg-gray-300 text-gray-700'   :
          rank === 3 ? 'bg-amber-600 text-amber-100' :
          'bg-[var(--color-secondary-500)] text-white'
        }`}>{rank}</div>
      </div>

      <div className="px-1.5 pt-1">
        <h4 className="text-[12px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors duration-200">
          {episode.title}
        </h4>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-[0_1px_4px_rgba(124,58,237,0.4)]">
            <span className="text-[8px] font-bold text-white select-none">{speakerInitial}</span>
          </div>
          <span className="text-[11px] font-semibold text-gray-600 truncate">{episode.speaker}</span>
          {episode.verified && <VerifiedIcon sx={{ fontSize: 11 }} className="text-blue-500 shrink-0" />}
        </div>
      </div>
    </div>
  )
})

const EpisodeListCard = memo(function EpisodeListCard({
  episode, onPlay, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
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

  const speakerInitial = episode.speaker?.charAt(0).toUpperCase() ?? '?'

  return (
    <div
      className="m-card-shimmer group relative flex items-start gap-3.5 py-3 cursor-pointer animate-in fade-in slide-in-from-bottom-4 fill-mode-both hover:bg-purple-50/40 rounded-xl px-2 -mx-2 transition-all duration-300"
      style={{ animationDelay: `${index * 45}ms` }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) } }}
    >
      <div className="relative shrink-0 w-[155px] aspect-[16/10] rounded-xl overflow-hidden shadow-[0_3px_12px_rgba(0,0,0,0.10)] transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(124,58,237,0.18)]">
        <img src={episode.thumbnail} alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-md">
            <PlayArrowIcon sx={{ fontSize: 18 }} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/65 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md group-hover:opacity-0 transition-opacity duration-200">
          <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />{episode.duration}
        </div>
      </div>

      <div className="flex-1 min-w-0 pr-1 py-1">
        <h4 className="text-[14px] font-bold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-200">
          {episode.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-5 h-5 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center">
            <span className="text-[9px] font-bold text-white select-none">{speakerInitial}</span>
          </div>
          <span className="text-[12px] font-semibold text-gray-700 truncate">{episode.speaker}</span>
          {episode.verified && <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />}
        </div>
        <p className="text-[11px] text-gray-400 truncate font-medium ml-6.5">{episode.role}</p>
      </div>

      <div className="flex flex-col items-center gap-1 shrink-0 py-1">
        <MobileMoreMenu
          open={moreOpen}
          menuRef={moreMenuRef}
          onToggle={(e) => { e.stopPropagation(); setMoreOpen(v => !v) }}
          onAction={(e) => { e.stopPropagation(); setMoreOpen(false) }}
        />
      </div>
    </div>
  )
})

const EpisodeGridCard = memo(function EpisodeGridCard({
  episode, onPlay, index = 0,
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  index?: number
}) {
  const speakerInitial = episode.speaker?.charAt(0).toUpperCase() ?? '?'

  return (
    <div
      className="m-card-shimmer group relative flex flex-col cursor-pointer animate-in fade-in slide-in-from-bottom-6 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(episode) } }}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2 shadow-[0_3px_12px_rgba(0,0,0,0.09)] transition-all duration-500 group-hover:shadow-[0_12px_28px_rgba(124,58,237,0.2)] group-hover:-translate-y-0.5">
        <img src={episode.thumbnail} alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="relative w-9 h-9 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_12px_rgba(217,70,239,0.4)]">
            <div className="absolute inset-0 rounded-full border border-white/30 animate-[spin_5s_linear_infinite] opacity-50" />
            <PlayArrowIcon sx={{ fontSize: 18 }} className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/65 backdrop-blur-sm border border-white/10 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md group-hover:opacity-0 transition-opacity duration-200">
          <GraphicEqIcon sx={{ fontSize: 9 }} className="text-fuchsia-400" />{episode.duration}
        </div>
      </div>
      <h4 className="text-[12px] font-bold text-gray-900 line-clamp-2 leading-snug mb-1.5 group-hover:text-purple-700 transition-colors duration-200 px-0.5">
        {episode.title}
      </h4>
      <div className="flex items-center gap-1.5 px-0.5">
        <div className="w-3.5 h-3.5 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center">
          <span className="text-[7px] font-bold text-white select-none">{speakerInitial}</span>
        </div>
        <span className="text-[10px] font-semibold text-gray-600 truncate">{episode.speaker}</span>
        {episode.verified && <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />}
      </div>
      <p className="text-[9.5px] text-gray-400 mt-0.5 truncate font-medium ml-5 px-0.5">{episode.role}</p>
    </div>
  )
})

export default function PodcastMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const perPage = 10

  const trendingRef = useRef<HTMLDivElement>(null)
  const [canScrollLeftTrending, setCanScrollLeftTrending] = useState(false)
  const [canScrollRightTrending, setCanScrollRightTrending] = useState(true)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter((ep) => ep.category === activeFilter)

  const topEpisodeId = activeEpisode ? activeEpisode.id : filtered[0]?.id;
  const filteredWithoutTop = filtered.filter((ep) => ep.id !== topEpisodeId);

  const displayedEpisodes = filteredWithoutTop.slice(0, page * perPage)
  const hasMore = displayedEpisodes.length < filteredWithoutTop.length

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  const handleTrendingScroll = useCallback(() => {
    if (trendingRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trendingRef.current
      setCanScrollLeftTrending(scrollLeft > 10)
      setCanScrollRightTrending(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10)
    }
  }, [])

  useEffect(() => {
    handleTrendingScroll()
    const timer = setTimeout(() => handleTrendingScroll(), 50)
    window.addEventListener('resize', handleTrendingScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleTrendingScroll) }
  }, [handleTrendingScroll, filteredWithoutTop])

  const scrollTrendingRight = () => trendingRef.current?.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' })
  const scrollTrendingLeft  = () => trendingRef.current?.scrollBy({ left: -(window.innerWidth * 0.5), behavior: 'smooth' })

  return (
    <>
      <style>{MOBILE_STYLES}</style>

      <div className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] animate-in fade-in duration-500 flex flex-col">

        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-[0_1px_10px_rgba(0,0,0,0.06)]">
          <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        {activeEpisode && (
          <PodcastVideoPlayerMobile
            episode={activeEpisode}
            onClose={() => setActiveEpisode(null)}
            onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
            onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
            hasNext={activeIdx < PODCAST_EPISODES.length - 1}
            hasPrev={activeIdx > 0}
            inline={false}
          />
        )}

        <div className="flex-1 flex flex-col">

          {!activeEpisode && filtered[0] && (
            <div
              className="mx-3 mt-5 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] border border-gray-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_12px_36px_rgba(124,58,237,0.14)] animate-in fade-in slide-in-from-bottom-6 duration-600 delay-100"
              onClick={() => setActiveEpisode(filtered[0])}
            >
              <div className="flex gap-0">
                <div className="relative w-[46%] shrink-0 bg-black overflow-hidden" style={{ minHeight: 140 }}>
                  <img
                    src={filtered[0].thumbnail}
                    alt="Featured"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  
                  <div className="absolute bottom-2 left-2 text-white text-[10px] font-semibold bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <GraphicEqIcon sx={{ fontSize: 10 }} className="text-fuchsia-400" />{filtered[0].duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] group-hover:shadow-[0_6px_28px_rgba(217,70,239,0.5)]">
                      <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-3 flex flex-col justify-between bg-white min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="inline-flex items-center gap-1 text-[8px] font-black text-[var(--color-secondary-500)] uppercase tracking-widest bg-[var(--color-secondary-500)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        <TrendingUp size={7} />Trending #1
                      </span>
                    </div>
                    <h2 className="text-[13px] font-black text-gray-900 leading-tight line-clamp-3 mb-2 group-hover:text-purple-700 transition-colors duration-300 break-words">
                      {filtered[0].title}
                    </h2>
                    <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 mb-2 font-medium break-words">
                      {filtered[0].speaker} shares insights on market trends, investment opportunities, and strategies for long-term growth.
                    </p>
                    <div className="flex items-center gap-2 text-[9.5px] text-gray-500 font-semibold mb-2.5">
                      <span className="flex items-center gap-1 whitespace-nowrap"><Eye size={9} className="text-purple-500" /> 28K Views</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                      <span className="whitespace-nowrap">{filtered[0].duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-auto pt-2">
                    <button className="m-hero-btn flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[10px] font-bold rounded-lg shadow-[0_2px_10px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer border-none whitespace-nowrap">
                      <PlayArrowIcon sx={{ fontSize: 13 }} />Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 px-3">
            <div className="flex items-center justify-between mb-1 px-1">
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500 drop-shadow-[0_2px_4px_rgba(249,115,22,0.5)]" size={18} />
                <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Trending This Week</h3>
              </div>
            </div>

            <div className="relative w-full">
              {canScrollLeftTrending && (
                <div className="absolute -left-3 top-0 bottom-[55px] w-10 z-30 flex items-center justify-start pointer-events-none bg-gradient-to-r from-white/90 to-transparent">
                  <button
                    onClick={scrollTrendingLeft}
                    className="w-7 h-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-purple-600 transition-all duration-300 cursor-pointer pointer-events-auto ml-1"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
              )}

              <div
                ref={trendingRef}
                onScroll={handleTrendingScroll}
                className="flex gap-2 overflow-x-auto pb-4 pr-12 pt-1 -mx-3 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
              >
                {filteredWithoutTop.slice(0, 8).map((ep, mapIdx) => {
                  const actualIdx = filtered.findIndex((e) => e.id === ep.id);
                  const rank = actualIdx + 1;
                  
                  return (
                    <div key={ep.id} className="snap-start shrink-0">
                      <TrendingCard episode={ep} onPlay={setActiveEpisode} rank={rank} index={mapIdx} />
                    </div>
                  )
                })}
              </div>

              {canScrollRightTrending && (
                <div className="absolute -right-3 top-0 bottom-[55px] w-10 z-30 flex items-center justify-end pointer-events-none bg-gradient-to-l from-white/90 to-transparent">
                  <button
                    onClick={scrollTrendingRight}
                    className="w-7 h-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-purple-600 transition-all duration-300 cursor-pointer pointer-events-auto mr-1"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 mx-3 rounded-xl overflow-hidden relative shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_12px_36px_rgba(66,32,130,0.3)] hover:-translate-y-0.5 cursor-pointer group/ad animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2a1550] to-[#0f1035]" />
            <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(ellipse 130% 80% at 90% 10%, rgba(217,70,239,0.45) 0%, transparent 55%)' }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-purple-700/20 blur-3xl translate-y-1/3 translate-x-1/4 group-hover/ad:bg-purple-600/30 transition-colors duration-500" />
            <div className="relative z-10 p-4 flex flex-col justify-center min-h-[120px]">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <span className="text-[9px] font-black text-purple-300 uppercase tracking-[0.16em] border border-purple-400/30 rounded-full px-2.5 py-0.5 bg-purple-400/10 inline-block mb-2">
                    Advertisement
                  </span>
                  <h3 className="text-[16px] font-black leading-tight mb-1 text-white drop-shadow-sm">
                    Find Your Next Real Estate Opportunity
                  </h3>
                  <p className="text-[11px] text-white/65 leading-relaxed font-medium">
                    Discover verified listings & connect with experts.
                  </p>
                </div>
              </div>
              <button className="mt-4 px-4 py-2.5 bg-white text-gray-900 hover:bg-purple-50 text-[11px] font-black rounded-xl w-full transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center border-none">
                Explore Listings →
              </button>
            </div>
          </div>

          <div className="mt-8 mx-3">
            <div className="p-4 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-1.5 mb-3">
                <h3 className="text-[14px] font-black text-gray-900 tracking-tight">Platform Highlights</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Mic size={14} />, value: '12,000+', label: 'Episodes', color: 'bg-purple-100 text-purple-600', bg: 'bg-purple-50/60', border: 'border-purple-100', delay: 0 },
                  { icon: <Users size={14} />, value: '500+', label: 'Experts', color: 'bg-orange-100 text-orange-500', bg: 'bg-orange-50/60', border: 'border-orange-100', delay: 60 },
                  { icon: <Building2 size={14} />, value: '35', label: 'Cities', color: 'bg-blue-100 text-blue-500', bg: 'bg-blue-50/60', border: 'border-blue-100', delay: 120 },
                  { icon: <Eye size={14} />, value: '20M+', label: 'Views', color: 'bg-green-100 text-green-600', bg: 'bg-green-50/60', border: 'border-green-100', delay: 180 },
                ].map((s) => (
                  <div key={s.label} className={`p-2.5 rounded-xl ${s.bg} border ${s.border} flex flex-col gap-1.5 animate-in fade-in fill-mode-both transition-all duration-300 hover:scale-[1.03] hover:shadow-md`}
                    style={{ animationDelay: `${s.delay}ms` }}>
                    <div className={`w-7 h-7 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>{s.icon}</div>
                    <div>
                      <span className="block text-[15px] font-black text-gray-900 leading-tight">{s.value}</span>
                      <span className="block text-[11px] font-medium text-gray-500 mt-0.5">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 px-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Top Experts in Real Estate</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer bg-transparent border-none">
                View all <ChevronRight size={13} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {EXPERTS.map((expert, idx) => (
                <div key={idx} className="shrink-0 flex flex-col items-center gap-1.5 animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${idx * 70}ms` }}>
                  <div className="relative">
                    <div className={`m-expert-avatar w-16 h-16 rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.15)] border-2 border-white`}>
                      <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white shadow-sm" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[11px] font-bold text-gray-900 text-center whitespace-nowrap">{expert.name}</span>
                    <VerifiedIcon sx={{ fontSize: 11 }} className="text-blue-500 shrink-0" />
                  </div>
                  <span className="text-[9.5px] font-medium text-gray-500 text-center leading-tight max-w-[90px]">{expert.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 px-3 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-br from-[var(--color-primary-600)] to-purple-600 rounded-md text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)]">
                  <LayoutGrid size={12} />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 tracking-tight">All Real Estate Episodes</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-md p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-sm transition-all duration-200 cursor-pointer border-none ${viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={13} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-all duration-200 cursor-pointer border-none ${viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'}`}
                    aria-label="List view"
                  >
                    <List size={13} />
                  </button>
                </div>
              </div>
            </div>

            {displayedEpisodes.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                    {displayedEpisodes.map((ep, idx) => (
                      <EpisodeGridCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {displayedEpisodes.map((ep, idx) => (
                      <EpisodeListCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                    ))}
                  </div>
                )}

                {hasMore && (
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setPage(p => p + 1)}
                      className="group flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-white border border-purple-200 text-[12px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.1)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.28)] hover:scale-[1.03] active:scale-[0.97]"
                    >
                      <AutorenewIcon sx={{ fontSize: 16 }} className="group-hover:rotate-180 transition-transform duration-700" />
                      Load More Episodes
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 fade-in duration-500">
                <div className="w-14 h-14 mb-4 rounded-xl bg-purple-50 flex items-center justify-center shadow-[0_4px_14px_rgba(124,58,237,0.1)] border border-purple-100">
                  <GraphicEqIcon sx={{ fontSize: 26 }} className="text-purple-300" />
                </div>
                <p className="text-[15px] font-bold text-gray-900 tracking-tight">No episodes found</p>
                <p className="text-[12px] font-medium text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                  Try selecting a different category or clearing your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}