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
import PodcastVideoPlayerMobile from './PodcastVideoPlayerMobile'

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
      swipeRef.current.style.transitionDuration = isSwiping ? '0ms' : '400ms'
      swipeRef.current.style.transitionTimingFunction = 'cubic-bezier(0.32, 0.72, 0, 1)'
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
    <div className={`relative overflow-hidden transition-all duration-300 ${moreOpen ? 'z-50' : 'z-0'}`}>
      <div className="absolute inset-y-0 right-0 w-20 bg-red-500 flex flex-col items-center justify-center text-white z-0">
        <button
          type="button"
          className="flex flex-col items-center justify-center w-full h-full hover:bg-red-600 active:bg-red-700 transition-colors duration-200 cursor-pointer bg-transparent"
          onClick={() => {}}
          aria-label="Delete episode"
        >
          <DeleteIcon sx={{ fontSize: 24 }} className="drop-shadow-sm mb-0.5" />
          <span className="text-[11px] font-semibold mt-1">Delete</span>
        </button>
      </div>
      
      <div
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex items-start gap-3 px-3 py-2.5 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer group relative w-full border-none ${moreOpen ? 'z-50' : 'z-10'}`}
      >
        <button
          type="button"
          className="relative shrink-0 w-[110px] h-[80px] rounded-xl overflow-hidden shadow-sm flex items-center justify-center border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          aria-label={`Play ${episode.title}`}
          onClick={(e) => {
            e.stopPropagation()
            onPlay(episode)
          }}
        >
          <img
            src={episode.thumbnail}
            alt={`Thumbnail for ${episode.title}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
            <div className="relative w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-active:scale-95 group-hover:opacity-100 group-active:opacity-100 transition-all duration-400 ease-out">
              <div className="absolute inset-0 rounded-full border border-white/30 animate-[spin_3s_linear_infinite] opacity-60" />
              <PlayArrowIcon sx={{ fontSize: 26 }} className="drop-shadow-md ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1.5 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium px-1.5 py-[2px] rounded-md pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
            <GraphicEqIcon sx={{ fontSize: 11 }} className="text-purple-400" />
            {episode.duration}
          </div>
        </button>

        <div className="flex-1 min-w-0 relative py-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-[var(--color-brand-purple)] transition-colors duration-200">
                {episode.title}
              </h3>

              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-gradient-to-br from-[var(--color-brand-purple-mid)] to-[var(--color-brand-magenta-mid)]">
                  <span className="text-[9px] font-bold text-white drop-shadow-sm select-none">
                    {speakerInitial}
                  </span>
                </div>

                <span className="text-[12px] font-medium text-gray-600 truncate">
                  {episode.speaker}
                </span>

                {episode.verified && (
                  <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />
                )}
              </div>

              <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 font-medium">
                {episode.role}
              </p>
            </div>

            <div className="flex items-center gap-0.5 shrink-0 relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMoreOpen(!moreOpen)
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 border-none bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] ${
                  moreOpen ? 'text-gray-900 bg-gray-100 rotate-90' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="More options"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                <MoreVertIcon sx={{ fontSize: 20 }} />
              </button>

              {moreOpen && (
                <div
                  className="absolute right-0 top-[115%] w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] py-1.5 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
                  role="menu"
                >
                  <button
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-purple-50 hover:text-[var(--color-brand-purple)] transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <ShareIcon sx={{ fontSize: 18 }} />
                    Share episode
                  </button>
                  <button
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-purple-50 hover:text-[var(--color-brand-purple)] transition-colors border-none bg-transparent cursor-pointer text-left"
                    role="menuitem"
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                    Save to playlist
                  </button>

                  <div className="h-px bg-gray-100 my-1 mx-2" />

                  <button
                    type="button"
                    onClick={handleMenuAction}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
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
    : PODCAST_EPISODES.filter((ep) => ep.category === activeFilter)

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  return (
    <div className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth bg-white font-['Outfit',sans-serif] hide-scrollbar animate-in fade-in duration-500 flex flex-col">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100 transition-all duration-300">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      {activeEpisode && (
        <PodcastVideoPlayerMobile
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
          inline={false}
        />
      )}

      <div className="max-w-3xl mx-auto w-full flex-1 bg-white">
        {activeEpisode && (
          <div className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-12 z-30 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Up Next</h3>
          </div>
        )}

        {filteredEpisodes.length > 0 ? (
          <div className="pb-24 pt-2">
            {filteredEpisodes.map((episode, index) => (
              <div
                key={episode.id}
                className={`transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-4 fade-in fill-mode-both ${
                  episode.id === activeEpisode?.id
                    ? 'bg-purple-50/50 shadow-[inset_4px_0_0_#7C3AED]'
                    : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EpisodeCard episode={episode} onPlay={setActiveEpisode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 mb-5 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
              <GraphicEqIcon sx={{ fontSize: 32 }} className="text-gray-300" />
            </div>
            <p className="text-[18px] font-bold text-gray-900 tracking-tight">No episodes found</p>
            <p className="text-[14px] font-medium text-gray-500 mt-2 max-w-[200px] leading-relaxed">
              Try selecting a different category or clearing your filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}