import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Users, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, type SpotlightVideo } from './data'
import { AdvertisementPlaceholder } from '../activityBoard/ActivityBoardDesktop'

const STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes floatUp {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-4px); }
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
            { Icon: ShareIcon, label: 'Share spotlight' },
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
            Not interested
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <FlagOutlinedIcon sx={{ fontSize: 16 }} />
            Report spotlight
          </button>
        </div>
      )}
    </div>
  )
})

const DesktopSpotlightCard = memo(function DesktopSpotlightCard({
  video, onPlay, index = 0,
}: {
  video: SpotlightVideo
  onPlay: (ep: SpotlightVideo) => void
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

  return (
    <article
      className={`card-shimmer group flex flex-col cursor-pointer transition-all duration-500 ease-out animate-in slide-in-from-bottom-8 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{ animationDelay: `${index * 55}ms` }}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { 
          e.preventDefault() 
          onPlay(video) 
        }
      }}
    >
      <div className="relative w-full aspect-[9/16] rounded-[4px] overflow-hidden mb-3 flex-shrink-0 bg-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:shadow-[0_20px_48px_rgba(124,58,237,0.22),0_8px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
        <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none">
          <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
            <PlayArrowOutlinedIcon sx={{ fontSize: 28 }} />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-20">
          <span className="text-white text-[13px] font-bold drop-shadow-md">
            {video.views} views
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-purple-700 transition-colors duration-250">
            {video.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
            <span className="truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 13 }} className="text-gray-400 shrink-0" />}
          </div>
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

const ActiveVideoPlayer = memo(function ActiveVideoPlayer({ 
  video, 
  onClose,
  onNext,
  onPrev
}: { 
  video: SpotlightVideo, 
  onClose: () => void,
  onNext?: () => void,
  onPrev?: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full h-full flex flex-row bg-black animate-in fade-in duration-300 overflow-hidden relative">
      
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all z-50 cursor-pointer border-none"
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} className="ml-1" />
      </button>

      <div className="absolute bottom-8 left-8 max-w-[350px] z-40 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center overflow-hidden">
               <span className="text-white text-[13px] font-bold">{video.authorInitial}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-[14px] hover:underline cursor-pointer">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />}
            <span className="text-white font-bold text-[14px] mx-1">·</span>
            <button className="text-blue-500 font-bold text-[14px] hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0">Follow</button>
          </div>
        </div>
        <div className="text-white/90 text-[14px] leading-relaxed">
          {video.title}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative py-6">
        <div className="h-full aspect-[9/16] relative overflow-hidden rounded-[8px] bg-[#111]">
          <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl">
              <PlayArrowOutlinedIcon sx={{ fontSize: 48 }} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
            <div className="h-full bg-white w-1/3 rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="absolute bottom-4 left-4 z-40">
            <div className="bg-black/60 backdrop-blur-md text-white text-[12px] font-semibold px-2 py-1 rounded flex items-center gap-1">
              <PlayArrowOutlinedIcon sx={{ fontSize: 14 }} /> {video.views}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+max(30vh,220px)+24px)] flex flex-col gap-6 z-40">
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#262626] hover:bg-[#363636] flex items-center justify-center transition-colors">
              <FavoriteBorderIcon sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <span className="text-white text-[12px] font-medium">12.4K</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#262626] hover:bg-[#363636] flex items-center justify-center transition-colors">
              <ShareOutlinedIcon sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <span className="text-white text-[12px] font-medium">Share</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#262626] hover:bg-[#363636] flex items-center justify-center transition-colors">
              <BookmarkBorderIcon sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <span className="text-white text-[12px] font-medium">Save</span>
          </div>
          <div className="relative" ref={menuRef}>
            <div 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMenuOpen(!isMenuOpen) }}
              className="w-12 h-12 rounded-full bg-[#262626] hover:bg-[#363636] flex items-center justify-center transition-colors group cursor-pointer"
            >
              <MoreVertIcon sx={{ fontSize: 24, color: 'white' }} />
            </div>
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#262626] backdrop-blur-md rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] py-1 z-40 flex flex-col text-[14px] border border-[#363636] overflow-hidden transform origin-top-left transition-all">
                <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-[#363636] transition-colors w-full text-left font-medium cursor-pointer border-none bg-transparent">
                  <ReportProblemOutlinedIcon sx={{ fontSize: 18 }} /> Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button onClick={onPrev} disabled={!onPrev} className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors border-none ${onPrev ? 'bg-[#262626] hover:bg-[#363636] text-white cursor-pointer' : 'bg-[#111] text-white/30 cursor-not-allowed'}`}>
          <KeyboardArrowUpIcon sx={{ fontSize: 28 }} />
        </button>
        <button onClick={onNext} disabled={!onNext} className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors border-none ${onNext ? 'bg-[#262626] hover:bg-[#363636] text-white cursor-pointer' : 'bg-[#111] text-white/30 cursor-not-allowed'}`}>
          <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
        </button>
      </div>

    </div>
  )
})

export default function SpotlightDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const perPage = 5

  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  useEffect(() => {
    if (activeVideo && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeVideo])

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  const filtered = activeFilter === 'all'
    ? SPOTLIGHT_VIDEOS
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  const topVideoId = activeVideo ? activeVideo.id : filtered[0]?.id;
  const filteredWithoutTop = filtered.filter((v) => v.id !== topVideoId);

  const displayedCount = page * perPage
  const displayedVideos = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedVideos.length < filteredWithoutTop.length

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

  const activeIdx = activeVideo
    ? SPOTLIGHT_VIDEOS.findIndex((v) => v.id === activeVideo.id)
    : -1

  return (
    <>
      <style>{STYLES}</style>

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col bg-[var(--color-bg-muted)] animate-in fade-in duration-500 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none pb-12">
        <div className="sticky top-0 z-40 shrink-0 bg-white/95 backdrop-blur-sm px-2 py-1 ">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        <div className="flex-1 bg-white flex flex-col xl:flex-row gap-6 px-4 md:px-6 py-2 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex-1 min-w-0 flex flex-col gap-7">
            {activeVideo ? (
              <div className="w-full h-[80vh] min-h-[600px] max-h-[900px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.15)] shrink-0 relative animate-in fade-in zoom-in-[0.98] duration-500 ease-out">
                <ActiveVideoPlayer
                  video={activeVideo}
                  onClose={() => setActiveVideo(null)}
                  onNext={activeIdx < SPOTLIGHT_VIDEOS.length - 1 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx + 1]) : undefined}
                  onPrev={activeIdx > 0 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx - 1]) : undefined}
                />
              </div>
            ) : (
              <div
                className="w-full bg-white rounded-[8px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row group cursor-pointer transition-all duration-500 hover:shadow-[0_16px_48px_rgba(124,58,237,0.14),0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-6 duration-600"
                onClick={() => setActiveVideo(filtered[0])}
              >
                <div className="relative w-full lg:w-[45%] xl:w-[35%] aspect-[9/16] max-h-[450px] bg-black shrink-0 overflow-hidden mx-auto lg:mx-0 rounded-l-none lg:rounded-r-[8px]">
                  <div className={`absolute inset-0 bg-gradient-to-b ${filtered[0]?.gradient || 'from-[#0f172a] to-[#1e3a8a]'} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_8px_40px_rgba(217,70,239,0.6)] hover:bg-white/35">
                      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                      <PlayArrowIcon sx={{ fontSize: 36 }} className="drop-shadow-lg ml-1 relative z-10" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[12px] px-3 py-1.5 rounded-lg font-semibold">
                    <GraphicEqIcon sx={{ fontSize: 14 }} className="text-fuchsia-400" />
                    {filtered[0]?.duration || '0:28'}
                  </div>
                </div>

                <div className="p-5 lg:p-7 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)] text-[10px] font-black uppercase tracking-widest rounded-full">
                      <TrendingUp size={10} />
                      Featured Spotlight
                    </span>
                  </div>
                  <h2 className="text-[20px] lg:text-[26px] font-black text-[var(--color-text-primary)] leading-tight mb-3 group-hover:text-[var(--color-primary-600)] transition-colors duration-300 line-clamp-2">
                    {filtered[0]?.title || 'Modern Living Redefined'}
                  </h2>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-2 max-w-[500px]">
                    Experience the pinnacle of modern architecture and luxury in this exclusive showcase. Don't miss out on these insights.
                  </p>

                  <div className="flex items-center gap-4 text-[12.5px] text-[var(--color-text-muted)] font-semibold mb-8">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Eye size={14} className="text-purple-500" /> {filtered[0]?.views || '12.4K'} Views
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-gray-700">
                      <Users size={14} className="text-blue-500" /> {filtered[0]?.author || 'ABC Realty'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <button className="hero-gradient-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[14px] font-bold rounded-[8px] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(124,58,237,0.3)] cursor-pointer">
                      <PlayArrowIcon sx={{ fontSize: 20 }} />
                      Watch Now
                    </button>
                    <button
                      className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-[var(--color-text-primary)] text-[14px] font-semibold rounded-[8px] hover:bg-gray-50 hover:border-purple-200 hover:text-purple-700 hover:shadow-[0_4px_16px_rgba(124,58,237,0.12)] transition-all duration-300 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BookmarkBorderIcon sx={{ fontSize: 19 }} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full flex flex-col gap-3">
              <SectionHeader
                icon={<Flame className="text-orange-500 drop-shadow-[0_2px_6px_rgba(249,115,22,0.5)]" size={20} />}
                title="Trending Spotlights"
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
                  className="flex gap-4 overflow-x-auto pb-6 pt-5 px-4 scroll-px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
                >
                  {filteredWithoutTop.slice(0, 10).map((video, mapIdx) => {
                    const actualIdx = filtered.findIndex((e) => e.id === video.id);
                    const rank = actualIdx + 1;
                    
                    return (
                      <div key={video.id} className="min-w-[180px] w-[180px] md:min-w-[200px] md:w-[200px] snap-start relative">
                        <div className={`absolute -top-2.5 -left-2 w-[26px] h-[26px] rounded-lg z-20 flex items-center justify-center text-[11px] font-black border-2 border-white shadow-[0_3px_10px_rgba(0,0,0,0.15)] ${
                          rank === 1 ? 'bg-amber-400 text-amber-900' :
                          rank === 2 ? 'bg-gray-300 text-gray-700' :
                          rank === 3 ? 'bg-amber-600 text-amber-100' :
                          'bg-[var(--color-secondary-500)] text-white'
                        }`}>
                          {rank}
                        </div>
                        <DesktopSpotlightCard video={video} onPlay={setActiveVideo} index={mapIdx} />
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
                title="All Spotlights"
              />

              {displayedVideos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-8 pt-1">
                    {displayedVideos.map((video, idx) => (
                      <DesktopSpotlightCard key={video.id} video={video} onPlay={setActiveVideo} index={idx} />
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
                        Load More Spotlights
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-50 flex items-center justify-center shadow-[0_4px_16px_rgba(124,58,237,0.1)] border border-purple-100">
                    <LayoutGrid size={26} className="text-purple-300" />
                  </div>
                  <p className="text-[16px] font-bold text-[var(--color-text-primary)] tracking-tight">No spotlights found</p>
                  <p className="text-[13px] font-medium text-[var(--color-text-muted)] mt-1 max-w-[240px] leading-relaxed">
                    Try selecting a different category or clearing your filters
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full xl:w-[310px] shrink-0 flex flex-col gap-6 h-fit animate-in fade-in slide-in-from-right-6 duration-600 delay-150">
            <div className="flex flex-col gap-3.5 p-4 ">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center gap-2 mb-0.5 relative z-10">
                <Flame size={16} className="text-orange-500 drop-shadow-sm" />
                <h3 className="text-[14px] font-black text-[var(--color-text-primary)] tracking-tight">Spotlight Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5 relative z-10">
                <StatCard icon={<Eye size={15} />} value="12M+" label="Shorts Views" color="text-purple-600" bg="bg-white" border="border-purple-100" delay={0} />
                <StatCard icon={<Flame size={15} />} value="#1" label="Trending" color="text-orange-500" bg="bg-white" border="border-orange-100" delay={60} />
                <StatCard icon={<Users size={15} />} value="850+" label="Creators" color="text-blue-500" bg="bg-white" border="border-blue-100" delay={120} />
                <StatCard icon={<TrendingUp size={15} />} value="45K" label="Shares Today" color="text-green-600" bg="bg-white" border="border-green-100" delay={180} />
              </div>
            </div>

            <AdvertisementPlaceholder />

            <div className="flex flex-col rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center">
                    <TrendingUp size={14} className="text-purple-600" />
                  </div>
                  <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Top Creators</h3>
                </div>
                <button className="text-purple-600 text-[12px] font-bold hover:text-purple-700 cursor-pointer bg-transparent border-none transition-colors">
                  See all
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: 'Ritika Sharma', views: '2.4M views', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', rank: 1 },
                  { name: 'Amit Verma', views: '1.8M views', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rank: 2 },
                  { name: 'Rahul Prasad', views: '1.2M views', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', rank: 3 },
                  { name: 'Neha Iyer', views: '950K views', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', rank: 4 },
                ].map((expert) => (
                  <div
                    key={expert.rank}
                    className="expert-row flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[13px] font-black w-4 text-center ${expert.rank <= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                        #{expert.rank}
                      </span>
                      <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-indigo-500 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                          <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[13.5px] font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500" />
                        </div>
                        <span className="text-[11.5px] font-medium text-gray-500 mt-0.5 leading-tight">{expert.views}</span>
                      </div>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-[4px] bg-purple-50 text-purple-700 text-[12px] font-bold transition-all duration-300 hover:bg-purple-600 hover:text-white cursor-pointer border-none shadow-sm flex-shrink-0">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}