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

import PodcastTabs from './PodcastTabs'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'

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
      className={`flex items-start gap-3 p-2 rounded-xl cursor-pointer transition-all duration-300 animate-in slide-in-from-right-4 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] ${
        isActive 
          ? 'bg-purple-50/50 border border-purple-200 shadow-sm' 
          : 'hover:bg-gray-50 border border-transparent'
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
      className={`group flex flex-col rounded-xl overflow-visible cursor-pointer transition-all duration-400 ease-out hover:-translate-y-1.5 animate-in slide-in-from-bottom-8 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 ${
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
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-3 flex-shrink-0 bg-gray-100 group-hover:shadow-lg transition-shadow duration-400">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 transition-opacity duration-300" />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
          <div className="relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-center text-white opacity-0 scale-75 translate-y-4 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/30 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] opacity-50" />
            <PlayArrowIcon sx={{ fontSize: 32 }} className="drop-shadow-md ml-0.5" />
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
  const perPage = 10 // Adjusted to fit cleaner in 5-column grids

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

  const activeIdx = activeEpisode
    ? PODCAST_EPISODES.findIndex((ep) => ep.id === activeEpisode.id)
    : -1

  return (
    <div className={`flex-1 w-full h-full flex flex-col bg-white font-['Outfit',sans-serif] animate-in fade-in duration-500 ${activeEpisode ? 'overflow-hidden' : 'overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none'}`}>
      <div className="sticky top-0 z-40 shrink-0 bg-white/90  transition-all duration-300">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      {activeEpisode ? (
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 px-6 py-6 max-w-[1800px] w-full mx-auto animate-in fade-in zoom-in-[0.98] duration-500 ease-out">
          <div className="flex-1 min-w-0 flex flex-col h-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 bg-black">
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
          
          <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 h-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none scroll-smooth">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 pb-2 mb-2 pt-1">
              <h3 className="text-[18px] font-bold text-gray-900 px-2 tracking-tight">Up Next</h3>
            </div>
            <div className="flex flex-col gap-1 pb-12">
              {filtered.map((ep, idx) => (
                <SidebarEpisodeCard 
                  key={ep.id} 
                  episode={ep} 
                  onPlay={setActiveEpisode} 
                  isActive={ep.id === activeEpisode.id}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 py-4 max-w-[1800px] mx-auto w-full">
          {displayedEpisodes.length > 0 ? (
            <div className="pb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
                {displayedEpisodes.map((ep, idx) => (
                  <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-16 flex items-center justify-center animate-in fade-in duration-500">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="group flex items-center gap-2.5 px-8 py-3 rounded-full bg-white border border-gray-200 text-[14px] font-bold text-gray-700 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    <AutorenewIcon sx={{ fontSize: 20 }} className="transition-transform duration-700 ease-in-out group-hover:rotate-180 text-gray-400 group-hover:text-purple-500" />
                    Load More Episodes
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
                <GraphicEqIcon sx={{ fontSize: 40 }} className="text-gray-300" />
              </div>
              <p className="text-[20px] font-bold text-gray-900 tracking-tight">No episodes found</p>
              <p className="text-[15px] font-medium text-gray-500 mt-2 max-w-[250px] leading-relaxed">
                Try selecting a different category or clearing your current filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}