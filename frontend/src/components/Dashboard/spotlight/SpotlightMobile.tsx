import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Flame, Eye, LayoutGrid, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, type SpotlightVideo } from './data'

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
`

const EXPERTS = [
  { name: 'Ritika Sharma', views: '2.4M views', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', rank: 1 },
  { name: 'Amit Verma', views: '1.8M views', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rank: 2 },
  { name: 'Rahul Prasad', views: '1.2M views', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', rank: 3 },
  { name: 'Neha Iyer', views: '950K views', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', rank: 4 },
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
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-[110%] w-44 bg-white rounded-[6px] shadow-[0_20px_60px_-10px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.08)] border border-purple-100/60 z-50 py-1.5 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
        >
          {[
            { Icon: ShareOutlinedIcon,        label: 'Share spotlight'   },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button key={label} type="button" onClick={onAction}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left">
              <Icon sx={{ fontSize: 15 }} />{label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-1 mx-3" />
          <button type="button" onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left">
            <VisibilityOffIcon sx={{ fontSize: 15 }} />Not interested
          </button>
          <button type="button" onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left">
            <FlagOutlinedIcon sx={{ fontSize: 15 }} />Report spotlight
          </button>
        </div>
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
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden">
      <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} opacity-90`} />
      
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors border-none"
          aria-label="Close video"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </button>
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white">
          <PlayArrowOutlinedIcon sx={{ fontSize: 16 }} />
          <span className="text-[12px] font-semibold">{video.views} views</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
          <PlayArrowOutlinedIcon sx={{ fontSize: 40 }} />
        </div>
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-40">
        {onPrev && (
          <button onClick={onPrev} className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white border-none shadow-lg" aria-label="Previous video">
            <KeyboardArrowUpIcon sx={{ fontSize: 24 }} />
          </button>
        )}
        
        <div className="flex flex-col items-center gap-1">
          <button className="w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white border-none shadow-lg" aria-label="Like video">
            <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          </button>
          <span className="text-white text-[11px] font-semibold drop-shadow-md">Like</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white border-none shadow-lg" aria-label="Share video">
            <ShareOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
          <span className="text-white text-[11px] font-semibold drop-shadow-md">Share</span>
        </div>

        <div className="flex flex-col items-center gap-1 relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white border-none shadow-lg"
            aria-label="More options"
          >
            <MoreVertIcon sx={{ fontSize: 22 }} />
          </button>
          <span className="text-white text-[11px] font-semibold drop-shadow-md">More</span>
          
          {isMenuOpen && (
            <div className="absolute bottom-16 right-0 w-36 bg-white backdrop-blur-md rounded-[6px] shadow-xl py-1 z-50 flex flex-col text-[13px] overflow-hidden transform origin-bottom-right transition-all">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left font-medium border-none bg-transparent"
              >
                <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                Save
              </button>
              <div className="h-px w-full bg-gray-100 my-0.5" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left font-medium border-none bg-transparent"
              >
                <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} />
                Report
              </button>
            </div>
          )}
        </div>
        
        {onNext && (
          <button onClick={onNext} className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white border-none shadow-lg mt-2" aria-label="Next video">
            <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-4 right-20 flex flex-col gap-3 z-30">
        <h2 className="text-white text-[16px] font-extrabold leading-snug drop-shadow-xl line-clamp-3">
          {video.title}
        </h2>
        
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-[13px] font-extrabold text-[#1f1633]">{video.authorInitial}</span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-white text-[14px] font-bold drop-shadow-md truncate">
              {video.author}
            </span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 15 }} className="text-[#3B82F6] drop-shadow-md shrink-0" />}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div className="h-full bg-[#FF0000] w-1/3 rounded-r-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
      </div>
    </div>
  )
})

const SpotlightCard = memo(function SpotlightCard({
  video, onPlay, rank, isTrending, index = 0,
}: {
  video: SpotlightVideo
  onPlay: (v: SpotlightVideo) => void
  rank?: number
  isTrending?: boolean
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

  return (
    <div
      className={`m-card-shimmer group relative flex flex-col cursor-pointer animate-in fade-in fill-mode-both ${isTrending ? 'w-[140px] shrink-0 slide-in-from-right-4' : 'w-full slide-in-from-bottom-6'}`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onPlay(video)}
    >
      <div className="relative w-full aspect-[9/16] rounded-[6px] overflow-hidden mb-2 shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
        <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-100">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
            <PlayArrowOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-bold drop-shadow-md">
          {video.views} views
        </div>

        {rank && (
          <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-[4px] flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md ${
            rank === 1 ? 'bg-amber-400 text-amber-900' :
            rank === 2 ? 'bg-gray-300 text-gray-700'   :
            rank === 3 ? 'bg-amber-600 text-amber-100' :
            'bg-purple-500 text-white'
          }`}>{rank}</div>
        )}
      </div>

      <div className="flex items-start justify-between gap-1 px-1">
        <div className="flex-1 min-w-0">
          <h4 className="text-[12px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
            {video.title}
          </h4>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-semibold text-gray-600 truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 10 }} className="text-blue-500 shrink-0" />}
          </div>
        </div>
        {!isTrending && (
          <MobileMoreMenu
            open={moreOpen}
            menuRef={moreMenuRef}
            onToggle={(e) => { e.stopPropagation(); setMoreOpen(v => !v) }}
            onAction={(e) => { e.stopPropagation(); setMoreOpen(false) }}
          />
        )}
      </div>
    </div>
  )
})

export default function SpotlightMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 6

  const trendingRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setPage(1)
  }, [])

  useEffect(() => {
    if (activeVideo && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeVideo])

  const filtered = activeFilter === 'all'
    ? SPOTLIGHT_VIDEOS
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  const displayedVideos = filtered.slice(0, page * perPage)
  const hasMore = displayedVideos.length < filtered.length

  const activeIdx = activeVideo
    ? SPOTLIGHT_VIDEOS.findIndex((v) => v.id === activeVideo.id)
    : -1

  return (
    <>
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth bg-[#f8f9fa] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        {activeVideo && (
          <div className="px-3 pt-3 shrink-0 animate-in fade-in zoom-in-95 duration-300">
             <div className="w-full aspect-[9/16] max-h-[600px] mx-auto rounded-[12px] overflow-hidden relative bg-black shadow-lg border border-purple-100/10">
               <ActiveVideoPlayer
                 video={activeVideo}
                 onClose={() => setActiveVideo(null)}
                 onNext={activeIdx < SPOTLIGHT_VIDEOS.length - 1 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx + 1]) : undefined}
                 onPrev={activeIdx > 0 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx - 1]) : undefined}
               />
             </div>
          </div>
        )}

          <div className="flex-1 flex flex-col pb-10">
            <div className="mt-4 mx-4 bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-white/80 backdrop-blur-xl rounded-[8px] flex flex-col items-center justify-center h-[120px] relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] animate-in fade-in duration-500">
              <div className="text-center relative z-10 p-4 flex flex-col items-center">
                <span className="block text-sm mb-2 font-black text-indigo-900/30 tracking-widest uppercase drop-shadow-sm">
                  Advertisement
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3 px-4">
                <Flame className="text-orange-500 drop-shadow-sm" size={18} />
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight">Trending Shorts</h3>
              </div>
              <div className="relative w-full">
                <div
                  ref={trendingRef}
                  className="flex gap-3 overflow-x-auto pb-4 pt-1 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
                >
                  {filtered.slice(0, 8).map((v, mapIdx) => {
                    const rank = mapIdx + 1
                    return (
                      <SpotlightCard key={v.id} video={v} onPlay={setActiveVideo} rank={rank} isTrending index={mapIdx} />
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 mx-3 rounded-[6px] overflow-hidden relative shadow-[0_8px_24px_rgba(0,0,0,0.15)] bg-[#1a0533] aspect-[4/5] cursor-pointer">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/70 to-transparent" />
              <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/30 rounded-full px-2.5 py-1 bg-black/40 backdrop-blur-md w-fit">
                  Sponsored
                </span>
                <div>
                  <h3 className="text-[24px] font-black leading-tight mb-2 text-white drop-shadow-lg">
                    Elevate Your<br />Portfolio
                  </h3>
                  <p className="text-[12px] text-white/80 leading-relaxed mb-4 font-medium max-w-[200px]">
                    Join the elite network of property investors today.
                  </p>
                  <button className="w-full py-3.5 bg-white text-gray-900 text-[13px] font-black rounded-[6px] shadow-lg border-none">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 mx-3">
              <div className="flex flex-col gap-3 p-4 rounded-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="flex items-center gap-2 mb-1 relative z-10">
                  <Eye size={16} className="text-purple-600" />
                  <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Spotlight Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {[
                    { val: '12M+', lbl: 'Shorts Views', col: 'text-purple-600', border: 'border-purple-100' },
                    { val: '#1', lbl: 'Trending', col: 'text-orange-500', border: 'border-orange-100' },
                    { val: '850+', lbl: 'Creators', col: 'text-blue-500', border: 'border-blue-100' },
                    { val: '45K', lbl: 'Shares Today', col: 'text-green-600', border: 'border-green-100' },
                  ].map((s, i) => (
                    <div key={i} className={`p-3 rounded-[6px] bg-white/80 backdrop-blur-sm border ${s.border} shadow-sm`}>
                      <span className={`block text-[16px] font-black ${s.col} leading-none mb-1`}>{s.val}</span>
                      <span className="block text-[11px] font-bold text-gray-500">{s.lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 mx-3">
              <div className="flex flex-col gap-3 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-purple-600" />
                    <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Trending Creators</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {EXPERTS.map((expert) => (
                    <div key={expert.rank} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className={`text-[12px] font-black w-3 text-center ${expert.rank <= 3 ? 'text-gray-900' : 'text-gray-400'}`}>#{expert.rank}</span>
                        <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-purple-600 to-pink-500">
                          <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                            <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-[13px] font-bold text-gray-900 leading-tight">{expert.name}</span>
                            <VerifiedIcon sx={{ fontSize: 11 }} className="text-blue-500" />
                          </div>
                          <span className="text-[11px] font-medium text-gray-500 leading-tight mt-0.5">{expert.views}</span>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 rounded-[4px] bg-purple-50 text-purple-700 text-[11px] font-bold border-none shadow-sm flex-shrink-0">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 px-3">
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="p-1.5 bg-gradient-to-br from-[var(--color-primary-600)] to-purple-600 rounded-[4px] text-white shadow-[0_2px_8px_rgba(124,58,237,0.35)]">
                  <LayoutGrid size={14} />
                </div>
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight">All Spotlights</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                {displayedVideos.map((v, idx) => (
                  <SpotlightCard key={v.id} video={v} onPlay={setActiveVideo} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setPage(p => p + 1)}
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-[6px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 shadow-sm border-none cursor-pointer w-fit justify-center shadow-[0_2px_8px_rgba(124,58,237,0.1)] hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <AutorenewIcon sx={{ fontSize: 17 }} className="group-hover:rotate-180 transition-transform duration-700" />
                    Load More Spotlights
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
    </>
  )
}