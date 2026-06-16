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

interface EpisodeCardProps {
  episode: PodcastEpisode
}

const EpisodeCard = memo(function EpisodeCard({ episode }: EpisodeCardProps) {
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
      swipeRef.current.style.transitionDuration = isSwiping ? '0ms' : '200ms'
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
    if (nextOffset < -maxSwipe) nextOffset = -maxSwipe
    
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
    <div className={`relative ${moreOpen ? 'z-50' : 'z-0'}`}>
      <div className="absolute inset-y-0 right-0 w-20 bg-red-500 flex flex-col items-center justify-center text-white">
        <button 
          type="button"
          className="flex flex-col items-center justify-center w-full h-full active:bg-red-600 transition-colors border-none outline-none cursor-pointer bg-transparent"
          onClick={() => console.log('Delete episode', episode.id)}
        >
          <DeleteIcon sx={{ fontSize: 22 }} />
          <span className="text-[11px] font-normal mt-1">Delete</span>
        </button>
      </div>

      <div
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex items-start gap-3 px-3 py-2 bg-(--color-bg-surface) hover:bg-(--color-bg-muted) transition-colors cursor-pointer group relative w-full ease-out border-b border-(--color-border-default) last:border-b-0 ${moreOpen ? 'z-50' : 'z-10'}`}
      >
        <div 
          className="relative shrink-0 w-30 h-21.5 rounded-xl overflow-hidden shadow-sm flex items-center justify-center"
          aria-label={`Play ${episode.title}`}
          role="button"
          tabIndex={0}
        >
          <img
            src={episode.thumbnail}
            alt={episode.speaker}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-200 z-10 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-(--color-text-primary) shadow-lg transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
              <PlayArrowIcon sx={{ fontSize: 24 }} />
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-1 bg-black/70 text-white text-[11px] font-normal px-1.5 py-0.5 rounded pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
            <GraphicEqIcon sx={{ fontSize: 12 }} />
            {episode.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-[12px] font-medium text-(--color-text-primary) leading-tight line-clamp-2">
                {episode.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-linear-to-br from-violet-500 to-fuchsia-500">
                  <span className="text-[10px] font-medium text-white drop-shadow-sm select-none">
                    {speakerInitial}
                  </span>
                </div>
                
                <span className="text-[10px] font-normal text-(--color-text-primary) truncate">
                  {episode.speaker}
                </span>
                
                {episode.verified && (
                  <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />
                )}
              </div>
              
              <p className="text-[12px] text-(--color-text-secondary) mt-0.5 line-clamp-1 font-normal">
                {episode.role}
              </p>
            </div>
            
            <div className="flex items-center gap-0.5 shrink-0 relative" ref={moreMenuRef}>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setMoreOpen(!moreOpen) }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 border-none bg-transparent cursor-pointer ${
                  moreOpen ? 'text-(--color-text-primary) bg-(--color-bg-muted)' : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-muted)'
                }`}
                aria-label="More options"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                <MoreVertIcon sx={{ fontSize: 20 }} />
              </button>

              {moreOpen && (
                <div 
                  className="absolute right-0 top-[110%] w-48 bg-(--color-bg-surface) rounded-xl shadow-lg border border-(--color-border-default) z-60 py-1 origin-top-right animate-[fadeScale_0.2s_ease-out]"
                  role="menu"
                >
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-(--color-text-secondary) hover:bg-(--color-bg-muted) hover:text-(--color-text-primary) transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <ShareIcon sx={{ fontSize: 18 }} />
                    Share episode
                  </button>
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-(--color-text-secondary) hover:bg-(--color-bg-muted) hover:text-(--color-text-primary) transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                    Save to playlist
                  </button>
                  
                  <div className="h-px bg-(--color-border-default) my-1 w-full" />
                  
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-(--color-text-secondary) hover:bg-(--color-bg-muted) hover:text-(--color-text-primary) transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    Remove from feed
                  </button>
                  <button 
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
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

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
  }, [])

  const filteredEpisodes = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter(ep => ep.category === activeFilter)

  return (
    <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth bg-(--color-bg-surface) font-['Outfit'] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <div className="sticky top-0 z-20 bg-(--color-bg-surface)">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>
      <div className="max-w-3xl mx-auto w-full overflow-x-hidden">
        {filteredEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
        {filteredEpisodes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-3 text-center">
            <p className="text-[15px] font-medium text-(--color-text-primary)">No episodes found</p>
            <p className="text-[13px] font-normal text-(--color-text-secondary) mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}
