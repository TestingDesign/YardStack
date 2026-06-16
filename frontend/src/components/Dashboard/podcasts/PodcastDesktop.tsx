import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import PodcastTabs from './PodcastTabs'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

const PER_PAGE_OPTIONS = [8, 12, 16, 24]

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

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
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-150 border-none cursor-pointer outline-none ${
          open
            ? 'bg-black/10 text-gray-800'
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
          className="absolute right-0 top-[110%] w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1 origin-top-right animate-[fadeScale_0.15s_ease-out]"
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
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
              role="menuitem"
            >
              <Icon sx={{ fontSize: 17 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-1" />
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <VisibilityOffIcon sx={{ fontSize: 17 }} />
            Remove from feed
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-normal text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
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
      className={`group flex flex-col rounded-xl overflow-visible cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${moreOpen ? 'z-50 relative' : ''}`}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-3 flex-shrink-0">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#6B21A8] shadow-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
            <PlayArrowIcon sx={{ fontSize: 26 }} />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-black/70 text-white text-[11px] font-normal px-1.5 py-0.5 rounded pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
          <GraphicEqIcon sx={{ fontSize: 11 }} />
          {episode.duration}
        </div>
      </div>

      <div className="flex items-start justify-between gap-1 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5">
            {episode.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-semibold text-white select-none">
                {speakerInitial}
              </span>
            </div>
            <span className="text-[12px] font-medium text-gray-700 truncate">
              {episode.speaker}
            </span>
            {episode.verified && (
              <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5 truncate font-normal">
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

const Pagination = memo(function Pagination({
  current,
  total,
  perPage,
  perPageOptions,
  onPage,
  onPerPage,
}: {
  current: number
  total: number
  perPage: number
  perPageOptions: number[]
  onPage: (p: number) => void
  onPerPage: (n: number) => void
}) {
  const [perPageOpen, setPerPageOpen] = useState(false)
  const ppRef = useRef<HTMLDivElement>(null)
  const pages = buildPages(current, total)

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (ppRef.current && !ppRef.current.contains(e.target as Node)) setPerPageOpen(false)
    }
    document.addEventListener('mousedown', onOut)
    return () => document.removeEventListener('mousedown', onOut)
  }, [])

  return (
    <div className="flex items-center justify-between mt-6 px-1 select-none">
      <div />

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={current === 1}
          onClick={() => onPage(current - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer outline-none"
          aria-label="Previous page"
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>

        {pages.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPage(p as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-all cursor-pointer outline-none border ${
                current === p
                  ? 'bg-[#6B21A8] text-white border-[#6B21A8] shadow-[0_3px_10px_rgba(107,33,168,0.35)]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
              aria-current={current === p ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={current === total}
          onClick={() => onPage(current + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer outline-none"
          aria-label="Next page"
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[12px] text-gray-500">Show</span>
        <div className="relative" ref={ppRef}>
          <button
            type="button"
            onClick={() => setPerPageOpen((v) => !v)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer outline-none min-w-[52px] justify-between"
          >
            {perPage}
            <KeyboardArrowDownIcon sx={{ fontSize: 15 }} className={`transition-transform duration-200 ${perPageOpen ? 'rotate-180' : ''}`} />
          </button>
          {perPageOpen && (
            <div className="absolute bottom-full mb-1 right-0 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 min-w-[64px] animate-[fadeScale_0.15s_ease-out] origin-bottom-right">
              {perPageOptions.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { onPerPage(n); setPerPageOpen(false) }}
                  className={`w-full px-3 py-1.5 text-[12px] text-left cursor-pointer border-none transition-colors ${
                    n === perPage
                      ? 'bg-[#6B21A8]/10 text-[#6B21A8] font-semibold'
                      : 'bg-transparent text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-[12px] text-gray-500">per page</span>
      </div>
    </div>
  )
})

export default function PodcastDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const handlePerPage = useCallback((n: number) => {
    setPerPage(n)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter((ep) => ep.category === activeFilter)

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const pageEpisodes = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  return (
    <div className="flex-1 w-full h-full overflow-y-auto scroll-smooth bg-white font-['Outfit'] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <PodcastTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="px-6 py-5">
        {pageEpisodes.length > 0 ? (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-6">
              {pageEpisodes.map((ep) => (
                <DesktopEpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>

            <Pagination
              current={safePage}
              total={totalPages}
              perPage={perPage}
              perPageOptions={PER_PAGE_OPTIONS}
              onPage={setPage}
              onPerPage={handlePerPage}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-semibold text-gray-800">No episodes found</p>
            <p className="text-[13px] text-gray-500 mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}
