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
import { Search, SlidersHorizontal, Mic, Users, Building2, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react'

import PodcastTabs from './PodcastTabs'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

const SidebarEpisodeCard = memo(function SidebarEpisodeCard({
  episode,
  onPlay,
  isActive,
  index = 0
}: {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  isActive?: boolean
  index?: number
}) {
  const speakerInitial = episode.speaker ? episode.speaker.charAt(0).toUpperCase() : '?'
  
  return (
    <div 
      className={`flex items-start gap-3 p-2 rounded-xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] animate-in slide-in-from-right-4 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,58,237,0.12)] ${
        isActive 
          ? 'bg-purple-50/50 border border-purple-200 shadow-[0_4px_16px_rgba(124,58,237,0.08)]' 
          : 'hover:bg-purple-50/30 border border-transparent hover:border-purple-100'
      }`}
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPlay(episode)
        }
      }}
    >
      <div className="relative shrink-0 w-[160px] aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm group">
        <img 
          src={episode.thumbnail} 
          alt={episode.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <PlayArrowIcon fontSize="small" className="drop-shadow-md ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-200">
          {episode.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h4 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-purple-700 transition-colors duration-200">
          {episode.title}
        </h4>
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-sm">
            <span className="text-[8px] font-bold text-white select-none">{speakerInitial}</span>
          </div>
          <div className="text-[12px] text-gray-700 truncate font-semibold">{episode.speaker}</div>
          {episode.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
        </div>
        <div className="text-[11px] text-gray-500 truncate ml-5 font-medium">{episode.role}</div>
      </div>
    </div>
  )
})

const MoreMenu = memo(function MoreMenu({
  open,
  menuRef,
  onToggle,
  onAction,
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
            ? 'bg-black/10 text-gray-800 scale-105'
            : 'bg-transparent text-gray-500 opacity-0 group-hover:opacity-100 hover:bg-black/10 hover:text-gray-800'
        }`}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[110%] w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out"
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
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
              role="menuitem"
            >
              <Icon sx={{ fontSize: 17 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-1 mx-2" />
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <VisibilityOffIcon sx={{ fontSize: 17 }} />
            Remove from feed
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <FlagOutlinedIcon sx={{ fontSize: 17 }} />
            Report episode
          </button>
        </div>
      )}
    </div>
  )
})

const DesktopEpisodeCard = memo(function DesktopEpisodeCard({
  episode,
  onPlay,
  index = 0
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
      className={`group flex flex-col rounded-xl overflow-visible cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 animate-in slide-in-from-bottom-8 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPlay(episode)
        }
      }}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-3 flex-shrink-0 bg-gray-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:shadow-[0_16px_40px_rgba(124,58,237,0.25)]">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 transition-opacity duration-300" />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 pointer-events-none" />
        
        <div className="absolute bottom-2 right-2 z-20 flex items-center justify-center opacity-0 scale-75 translate-y-4 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] opacity-50 pointer-events-none" />
            <PlayArrowIcon sx={{ fontSize: 24 }} className="drop-shadow-md ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium px-2 py-1 rounded-md pointer-events-none group-hover:opacity-0 transition-opacity duration-200 shadow-sm">
          <GraphicEqIcon sx={{ fontSize: 12 }} className="text-fuchsia-400" />
          {episode.duration}
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors duration-200">
            {episode.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-bold text-white select-none">
                {speakerInitial}
              </span>
            </div>
            <span className="text-[12px] font-semibold text-gray-700 truncate">
              {episode.speaker}
            </span>
            {episode.verified && (
              <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-gray-500 -mt-0.5 truncate font-medium ml-7">
            {episode.role}
          </p>
        </div>

        <MoreMenu
          open={moreOpen}
          menuRef={menuRef}
          onToggle={(e) => {
            e.stopPropagation()
            setMoreOpen((v) => !v)
          }}
          onAction={(e) => {
            e.stopPropagation()
            setMoreOpen(false)
          }}
        />
      </div>
    </article>
  )
})

export default function PodcastDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)
  const perPage = 10 

  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter((ep) => ep.category === activeFilter)

  const displayedCount = page * perPage
  const displayedEpisodes = filtered.slice(0, displayedCount)
  const hasMore = displayedEpisodes.length < filtered.length

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
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
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll, filtered])

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--color-bg-muted)] font-['Outfit',sans-serif] animate-in fade-in duration-500 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-12">
      
      <div className="sticky top-0 z-40 shrink-0 bg-white px-2 py-1 ">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="flex-1 bg-white flex flex-col xl:flex-row gap-6 px-4 md:px-6 py-4 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
          {activeEpisode ? (
            <div className="w-full bg-black rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border-default)] shrink-0 relative animate-in fade-in zoom-in-[0.98] duration-500 ease-out aspect-[21/9]">
              <PodcastVideoPlayerDesktop
                episode={activeEpisode}
                onClose={() => setActiveEpisode(null)}
                onNext={() =>
                  setActiveEpisode(
                    activeIdx < PODCAST_EPISODES.length - 1
                      ? PODCAST_EPISODES[activeIdx + 1]
                      : null
                  )
                }
                onPrev={() =>
                  setActiveEpisode(
                    activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null
                  )
                }
                hasNext={activeIdx < PODCAST_EPISODES.length - 1}
                hasPrev={activeIdx > 0}
                inline
              />
            </div>
          ) : (
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border-default)] flex flex-col lg:flex-row group cursor-pointer" onClick={() => setActiveEpisode(filtered[0])}>
              <div className="relative w-full lg:w-[60%] aspect-video bg-black shrink-0">
                <img src={filtered[0]?.thumbnail || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"} alt="Featured" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 hover:scale-110 hover:bg-white/40 transition-all duration-300 shadow-lg cursor-pointer">
                    <PlayArrowIcon sx={{ fontSize: 36 }} className="drop-shadow-md ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[12px] px-2 py-1 rounded font-medium backdrop-blur-sm">
                  {filtered[0]?.duration || '28:10'}
                </div>
              </div>
              
              <div className="p-5 lg:p-6 flex flex-col justify-center flex-1">
                <span className="inline-block px-2.5 py-1 bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)] text-[11px] font-bold uppercase tracking-wider rounded w-fit mb-3">
                  Trending #1
                </span>
                <h2 className="text-[20px] lg:text-[24px] font-bold text-[var(--color-text-primary)] leading-tight mb-3 group-hover:text-[var(--color-primary-600)] transition-colors line-clamp-2">
                  {filtered[0]?.title || 'The Future of Real Estate: What to Expect in 2027'}
                </h2>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2">
                  Ritika Sharma shares insights on real estate market trends, investment opportunities, and strategies for long-term growth.
                </p>
                
                <div className="flex items-center gap-4 text-[12px] text-[var(--color-text-muted)] font-medium mb-6">
                  <span className="flex items-center gap-1.5"><Eye size={14} /> 28K Views</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{filtered[0]?.duration || '28:10'}</span>
                </div>
                
                <div className="flex items-center gap-3 mt-auto">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] text-white text-[13px] font-semibold rounded-xl hover:bg-[var(--color-primary-500)] transition-colors shadow-sm cursor-pointer">
                    <PlayArrowIcon sx={{ fontSize: 18 }} />
                    Watch
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[var(--color-border-default)] text-[var(--color-text-primary)] text-[13px] font-semibold rounded-xl hover:bg-[var(--color-bg-muted)] transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="w-full flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="text-[var(--color-secondary-500)]" size={20} />
                <h3 className="text-[16px] font-bold text-[var(--color-text-primary)]">Trending This Week</h3>
              </div>
            </div>
            
            <div className="relative group/slider w-full mt-2">
              {canScrollLeft && (
                <div className="absolute left-0 top-[69px] z-30 flex items-center justify-center">
                  <button 
                    onClick={scrollLeft}
                    className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-[var(--color-text-primary)] border border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={20} />
                  </button>
                </div>
              )}
              
              <div 
                ref={sliderRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-6 pt-4 px-4 scroll-px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
              >
                {filtered.slice(0,10).map((ep, idx) => (
                  <div key={ep.id} className="min-w-[260px] w-[260px] snap-start relative transition-transform duration-300 hover:scale-[1.02]">
                    <div className="absolute -top-3 -left-3 w-6 h-6 rounded-md bg-[var(--color-secondary-500)] text-white flex items-center justify-center text-[12px] font-bold z-20 shadow-sm border border-white">
                      {idx + 1}
                    </div>
                    <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={idx} />
                  </div>
                ))}
              </div>

              {canScrollRight && (
                <div className="absolute right-0 top-[69px] z-30 flex items-center justify-center">
                  <button 
                    onClick={scrollRight}
                    className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-[var(--color-text-primary)] border border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[var(--color-primary-600)] rounded-md text-white">
                   <LayoutGrid size={16} />
                </div>
                <h3 className="text-[16px] font-bold text-[var(--color-text-primary)]">All Real Estate Episodes</h3>
              </div>
            </div>
            
            {displayedEpisodes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 pt-2">
                  {displayedEpisodes.map((ep, idx) => (
                    <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-[var(--color-primary-300)] text-[13px] font-bold text-[var(--color-primary-600)] hover:bg-[var(--color-primary-600)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm group"
                    >
                      <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-700" />
                      Load More Episodes
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-14 h-14 mb-4 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
                  <LayoutGrid size={24} className="text-gray-300" />
                </div>
                <p className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-tight">No episodes found</p>
                <p className="text-[13px] font-medium text-[var(--color-text-muted)] mt-1 max-w-[250px] leading-relaxed">
                  Try selecting a different category or clearing your filters
                </p>
              </div>
            )}
          </div>
          
        </div>
        
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 bg-white rounded-2xl h-fit">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Platform Highlights</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[var(--color-primary-600)]/5 border border-[var(--color-primary-600)]/10 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-primary-600)]/10 text-[var(--color-primary-600)] flex items-center justify-center">
                  <Mic size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[var(--color-text-primary)] leading-tight">12,000+</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">Episodes</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-500/10 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Users size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[var(--color-text-primary)] leading-tight">500+</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">Experts</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-500/10 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Building2 size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[var(--color-text-primary)] leading-tight">35</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">Cities</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-50 border border-green-500/10 flex flex-col gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
                  <Eye size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[var(--color-text-primary)] leading-tight">20M+</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">Views</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full h-px bg-[var(--color-border-default)]" />
          
          <div className="rounded-2xl overflow-hidden relative group cursor-pointer aspect-square w-full flex items-center justify-center shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-800)] opacity-95" />
             <div className="absolute right-0 top-0 w-24 h-24 bg-[var(--color-primary-600)]/20 blur-2xl rounded-full mix-blend-screen" />
             
             <div className="absolute inset-0 flex flex-col justify-center p-5 text-white z-10">
               <span className="text-[9px] font-bold text-[var(--color-primary-300)] uppercase tracking-widest mb-2 border border-[var(--color-primary-300)]/30 rounded px-1.5 py-0.5 w-fit">Advertisement</span>
               <h3 className="text-[20px] font-bold leading-tight mb-2 text-white">Find Your Next<br/>Real Estate<br/>Opportunity</h3>
               <p className="text-[12px] text-white/70 leading-relaxed mb-4 font-medium">Discover verified listings, connect with experts, and close the best deals today.</p>
               <button className="px-4 py-2 bg-white text-[var(--color-neutral-900)] hover:bg-gray-100 text-[12px] font-bold rounded-xl w-fit transition-colors shadow-md">
                 Explore Listings
               </button>
             </div>
          </div>
          
          <div className="w-full h-px bg-[var(--color-border-default)]" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[var(--color-text-primary)]">Top Experts in Real Estate</h3>
              <button className="text-[var(--color-primary-600)] text-[11px] font-bold hover:underline cursor-pointer bg-transparent border-none">
                View all
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { name: 'Ritika Sharma', role: 'Real Estate Analyst', initial: 'R' },
                { name: 'Amit Verma', role: 'Real Estate Consultant', initial: 'A' },
                { name: 'Rahul Prasad', role: 'Property Investment Expert', initial: 'R' },
                { name: 'Neha Iyer', role: 'Real Estate Strategist', initial: 'N' },
              ].map((expert, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-[var(--color-bg-muted)] p-1.5 -mx-1.5 rounded-xl transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[image:var(--color-brand-gradient)] flex items-center justify-center text-white shadow-sm shrink-0">
                      <span className="text-[13px] font-bold">{expert.initial}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">{expert.name}</span>
                        <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500" />
                      </div>
                      <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">{expert.role}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary-600)] transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}