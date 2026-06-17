import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'

import PodcastTabs from './PodcastTabs'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import PodcastVideoPlayer from './PodcastVideoPlayer'

interface EpisodeCardProps {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
}

const EpisodeCard = memo(function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  
  const startX = useRef(0)
  const initialOffset = useRef(0)
  const maxSwipe = 80
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const swipeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (swipeRef.current) {
      swipeRef.current.style.transform = `translateX(${swipeOffset}px)`
      swipeRef.current.style.transitionDuration = isSwiping ? '0ms' : '300ms'
      swipeRef.current.style.transitionTimingFunction = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
    }
  }, [swipeOffset, isSwiping])

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    initialOffset.current = swipeOffset
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientX - startX.current
    let nextOffset = initialOffset.current + diff
    
    if (nextOffset > 0) nextOffset = 0
    if (nextOffset < -maxSwipe - 20) nextOffset = -maxSwipe - 20
    
    setSwipeOffset(nextOffset)
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    setSwipeOffset((prev) => (prev < -maxSwipe / 2 ? -maxSwipe : 0))
  }

  const handleMenuAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMoreOpen(false)
  }

  const speakerInitial = episode.speaker ? episode.speaker.charAt(0).toUpperCase() : '?'

  return (
    <div className={`relative overflow-hidden ${moreOpen ? 'z-50' : 'z-0'}`}>
      <div className="absolute inset-y-0 right-0 w-20 bg-red-500 flex flex-col items-center justify-center text-white z-0">
        <button 
          type="button"
          className="flex flex-col items-center justify-center w-full h-full active:bg-red-600 transition-colors border-none outline-none cursor-pointer bg-transparent"
          onClick={() => {}}
          aria-label="Delete episode"
        >
          <DeleteIcon sx={{ fontSize: 24 }} className="drop-shadow-sm" />
          <span className="text-[11px] font-semibold mt-1">Delete</span>
        </button>
      </div>
      <div
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex items-start gap-3 px-3 py-3 bg-white hover:bg-gray-50 active:bg-gray-50 transition-colors cursor-pointer group relative w-full border-none ${moreOpen ? 'z-50' : 'z-10'}`}
      >
        <button 
          type="button"
          className="relative shrink-0 w-[110px] h-[80px] rounded-xl overflow-hidden shadow-sm flex items-center justify-center border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)]"
          aria-label={`Play ${episode.title}`}
          onClick={(e) => { e.stopPropagation(); onPlay(episode) }}
        >
          <img
            src={episode.thumbnail}
            alt={`Thumbnail for ${episode.title}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
            <div className="relative w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-active:scale-90 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] opacity-50" />
              <PlayArrowIcon sx={{ fontSize: 26 }} className="drop-shadow-md ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium px-1.5 py-[2px] rounded-md pointer-events-none group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-200">
            <GraphicEqIcon sx={{ fontSize: 11 }} className="text-[var(--color-brand-magenta-mid)]" />
            {episode.duration}
          </div>
        </button>

        <div className="flex-1 min-w-0 relative py-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-tight line-clamp-2 group-hover:text-[var(--color-brand-purple)] transition-colors duration-200">
                {episode.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-purple-mid)] to-[var(--color-brand-magenta-mid)]">
                  <span className="text-[9px] font-bold text-white drop-shadow-sm select-none">
                    {speakerInitial}
                  </span>
                </div>
                
                <span className="text-[11px] font-medium text-[var(--color-text-secondary)] truncate">
                  {episode.speaker}
                </span>
                
                {episode.verified && (
                  <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />
                )}
              </div>
              
              <p className="text-[11px] text-[var(--color-text-secondary)]/80 mt-1 line-clamp-1 font-medium">
                {episode.role}
              </p>
            </div>
            
            <div className="flex items-center gap-0.5 shrink-0 relative" ref={moreMenuRef}>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setMoreOpen(!moreOpen) }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 border-none bg-transparent cursor-pointer ${
                  moreOpen ? 'text-[var(--color-text-primary)] bg-gray-100' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-100'
                }`}
                aria-label="More options"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                <MoreVertIcon sx={{ fontSize: 20 }} />
              </button>

              {moreOpen && (
                <div 
                  className="absolute right-0 top-[110%] w-48 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-[60] py-1.5 origin-top-right animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-purple-mid)]/5 hover:text-[var(--color-brand-purple)] transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <ShareIcon sx={{ fontSize: 18 }} />
                    Share episode
                  </button>
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-purple-mid)]/5 hover:text-[var(--color-brand-purple)] transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                    Save to playlist
                  </button>
                  
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                  
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-text-primary)] transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    Remove from feed
                  </button>
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <FlagOutlinedIcon sx={{ fontSize: 18 }} />
                    Report episode
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default function PodcastMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
  }, [])

  const filteredEpisodes = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter(ep => ep.category === activeFilter)

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex(ep => ep.id === activeEpisode.id)
    : -1

  return (
    <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none animate-in fade-in duration-300">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>
      
      <div className="max-w-3xl mx-auto w-full overflow-x-hidden">
        {filteredEpisodes.length > 0 ? (
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 fill-mode-both">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} onPlay={setActiveEpisode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in zoom-in-95 fade-in duration-400">
            <div className="w-14 h-14 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
              <GraphicEqIcon sx={{ fontSize: 28 }} className="text-[var(--color-text-secondary)]/50" />
            </div>
            <p className="text-[16px] font-bold text-[var(--color-text-primary)]">No episodes found</p>
            <p className="text-[13px] font-medium text-[var(--color-text-secondary)] mt-1.5">Try selecting a different category or clearing filters</p>
          </div>
        )}
      </div>

      <PodcastVideoPlayer
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

      />
    </div>
  )
}