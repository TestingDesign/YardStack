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
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none ${
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
          className="absolute right-0 top-[110%] w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200 ease-out"
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
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-[#6B21A8] transition-colors border-none bg-transparent cursor-pointer text-left"
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
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
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
}: {
  episode: PodcastEpisode
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
      className={`group flex flex-col rounded-xl overflow-visible cursor-pointer transition-all duration-300 hover:-translate-y-1 ${moreOpen ? 'z-50 relative' : ''}`}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-3 flex-shrink-0 bg-gray-100">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 transition-opacity duration-300" />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
          <div className="relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-center text-white opacity-0 scale-75 translate-y-4 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 cubic-bezier(0.34,1.56,0.64,1) hover:bg-white/30 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] opacity-50" />
            <PlayArrowIcon sx={{ fontSize: 32 }} className="drop-shadow-md ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium px-2 py-1 rounded-md pointer-events-none group-hover:opacity-0 group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
          <GraphicEqIcon sx={{ fontSize: 12 }} className="text-[#D946EF]" />
          {episode.duration}
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#6B21A8] transition-colors duration-200">
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
          <p className="text-[10px] text-gray-500 -mt-1 truncate font-medium ml-7">
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
  const perPage = 8

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

  return (
    <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none animate-in fade-in duration-500">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="px-4 py-4 max-w-[1600px] mx-auto">
        {displayedEpisodes.length > 0 ? (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
              {displayedEpisodes.map((ep) => (
                <DesktopEpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="group flex items-center gap-2 px-6 py-1.5 rounded-[4px] bg-white border border-gray-200 text-[14px] font-bold text-gray-700 hover:text-[#6B21A8] hover:border-[#C4B5FD] hover:bg-[#FAFAFF] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.15)] transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/30"
                >
                  <AutorenewIcon sx={{ fontSize: 18 }} className="transition-transform duration-500 group-hover:rotate-180" />
                  Load More Episodes
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in-95 fade-in duration-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <GraphicEqIcon sx={{ fontSize: 32 }} className="text-gray-400" />
            </div>
            <p className="text-[18px] font-bold text-gray-800">No episodes found</p>
            <p className="text-[14px] font-medium text-gray-500 mt-1.5">Try selecting a different category or clearing filters</p>
          </div>
        )}
      </div>
    </div>
  )
}