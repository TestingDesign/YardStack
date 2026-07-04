import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Flame, Eye, LayoutGrid, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, TOP_CREATORS, SPOTLIGHT_IMPACT_STATS, type SpotlightVideo } from './data'
import ActiveSpotlightMobile from './ActiveSpotlightMobile'
import { AdvertisementBlock } from '../activityBoard/ActivityBoardMobile'

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
            { Icon: ShareOutlinedIcon, label: 'Share spotlight' },
            { Icon: BookmarkBorderIcon, label: 'Save to playlist' },
          ].map(({ Icon, label }) => (
            <button 
              key={label} 
              type="button" 
              onClick={onAction}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
            >
              <Icon sx={{ fontSize: 15 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-purple-50 my-1 mx-3" />
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <VisibilityOffIcon sx={{ fontSize: 15 }} />
            Not interested
          </button>
          <button 
            type="button" 
            onClick={onAction}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <FlagOutlinedIcon sx={{ fontSize: 15 }} />
            Report spotlight
          </button>
        </div>
      )}
    </div>
  )
}



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
        <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
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


const MobileHeroCarousel = memo(function MobileHeroCarousel({
  videos, onPlay
}: {
  videos: SpotlightVideo[]
  onPlay: (v: SpotlightVideo) => void
}) {
  return (
    <div className="w-full pt-4 pb-6 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
        {videos.slice(0, 5).map((video, idx) => (
          <div 
            key={video.id} 
            className="min-w-[85%] sm:min-w-[70%] aspect-[4/5] rounded-[16px] snap-center shrink-0 relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer"
            onClick={() => onPlay(video)}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-[6px] text-[10px] font-black bg-[var(--color-primary-500)] text-white uppercase tracking-wider shadow-sm">
                {video.tag || 'Insight'}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg">
                <PlayArrowIcon sx={{ fontSize: 26 }} className="ml-0.5" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h3 className="text-white text-[18px] font-black leading-tight line-clamp-2 mb-1.5 drop-shadow-md">{video.title}</h3>
              <p className="text-white/80 text-[12px] font-medium flex items-center gap-1.5 drop-shadow-md">
                <span className="truncate">{video.author}</span>
                {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-400" />}
              </p>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-white/90 text-[11px] font-bold">
                  <PlayArrowIcon sx={{ fontSize: 14 }} className="text-[var(--color-primary-400)]" /> {video.views} views
                </div>
              </div>
            </div>
          </div>
        ))}
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

  return (
    <div className="relative w-full h-full flex flex-col bg-[#f8f9fa] overflow-hidden">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>

        <div className="flex-1 flex flex-col pb-2">
            <div className="mt-2 mx-2">
              <MobileHeroCarousel videos={filtered} onPlay={setActiveVideo} />
            </div>

            <div className="mt-2">
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


            <div className="mt-2 mx-2">
              <div className="flex flex-col gap-3 p-4 rounded-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="flex items-center gap-2 mb-1 relative z-10">
                  <Eye size={16} className="text-purple-600" />
                  <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Spotlight Impact</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {SPOTLIGHT_IMPACT_STATS.map((s, i) => (
                    <div key={i} className={`p-3 rounded-[6px] bg-white/80 backdrop-blur-sm border ${s.borderMobile} shadow-sm`}>
                      <span className={`block text-[16px] font-black ${s.colorMobile} leading-none mb-1`}>{s.value}</span>
                      <span className="block text-[11px] font-bold text-gray-500">{s.labelMobile}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 mx-2">
              <div className="flex flex-col gap-3 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-purple-600" />
                    <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Trending Creators</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {TOP_CREATORS.map((expert) => (
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

            
            <div className="mt-4 mx-4">
              <div className="relative w-full rounded-[16px] overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#7c3aed] to-[#c026d3] p-6 text-center shadow-[0_8px_24px_rgba(124,58,237,0.25)] flex flex-col items-center justify-center min-h-[280px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative w-[120px] h-[180px] mx-auto -mt-6 mb-4 rounded-[10px] overflow-hidden shadow-2xl rotate-[-2deg]">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80" alt="App preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                      <PlayArrowIcon sx={{ fontSize: 22 }} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 w-full mt-auto">
                  <h3 className="text-white text-[20px] font-black mb-1.5 drop-shadow-md leading-tight">Create. Share. Inspire.</h3>
                  <button className="bg-white text-[var(--color-primary-600)] text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg transition-all w-full border-none">
                    Start Creating
                  </button>
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

      {activeVideo && (
        <div className="absolute inset-0 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-300">
          <ActiveSpotlightMobile
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
            onNext={activeIdx < SPOTLIGHT_VIDEOS.length - 1 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx + 1]) : undefined}
            onPrev={activeIdx > 0 ? () => setActiveVideo(SPOTLIGHT_VIDEOS[activeIdx - 1]) : undefined}
          />
        </div>
      )}
    </div>
  )
}