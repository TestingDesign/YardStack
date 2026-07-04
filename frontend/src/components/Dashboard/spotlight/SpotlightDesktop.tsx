import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { Users, Eye, Flame, ChevronRight, ChevronLeft, LayoutGrid, TrendingUp } from 'lucide-react'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, type SpotlightVideo } from './data'
import ActiveSpotlightDesktop from './ActiveSpotlightDesktop'

const STYLES = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.15) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .7s ease forwards;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
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
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
          open
            ? 'bg-purple-100 text-purple-700 shadow-inner'
            : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-700'
        }`}
        aria-label="More options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertIcon sx={{ fontSize: 16 }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[110%] w-44 bg-white rounded-[4px] shadow-xl border border-gray-100 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200"
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
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-none bg-transparent cursor-pointer text-left"
              role="menuitem"
            >
              <Icon sx={{ fontSize: 16 }} />
              {label}
            </button>
          ))}
          <div className="h-px bg-gray-100 my-1 mx-2" />
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer text-left"
            role="menuitem"
          >
            <VisibilityOffIcon sx={{ fontSize: 16 }} />
            Not interested
          </button>
          <button
            type="button"
            onClick={onAction}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
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
      className={`card-shimmer group flex flex-col cursor-pointer transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in fill-mode-both outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
        moreOpen ? 'z-50 relative' : ''
      }`}
      style={{ animationDelay: `${index * 40}ms` }}
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
      <div className="relative w-full aspect-[9/16] rounded-[4px] overflow-hidden mb-2 bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 border border-black/5">
        <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none">
          <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg">
            <PlayArrowOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 z-20">
          <div className="flex items-center gap-0.5 text-white text-[12px] font-bold drop-shadow-md">
            <PlayArrowIcon sx={{ fontSize: 14 }} className="text-white/90" />
            {video.views}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-bold text-gray-900 leading-tight line-clamp-2 mb-0.5 group-hover:text-purple-700 transition-colors duration-200">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 text-[12px] text-gray-500 font-medium">
            <span className="truncate">{video.author}</span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
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
      className={`p-2 rounded-[4px] ${bg} border ${border} flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm animate-in fade-in slide-in-from-bottom-2 fill-mode-both`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-8 h-8 rounded-full ${color} ${bg} filter brightness-95 flex items-center justify-center shadow-sm shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-black text-gray-900 leading-none tracking-tight">{value}</span>
        <span className="text-[11px] font-medium text-gray-500 truncate mt-0.5">{label}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500 mb-1">
      <div className="relative flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[16px] font-black text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-[2px] bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

const CoverflowCarousel = memo(function CoverflowCarousel({
  videos, onPlay
}: {
  videos: SpotlightVideo[]
  onPlay: (v: SpotlightVideo) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(2)

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, Math.min(videos.length - 1, 4)))
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0))

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center overflow-hidden py-4 bg-gray-50/40 rounded-[8px] border border-gray-100/60" style={{ perspective: '1000px' }}>
      <button 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
        className="absolute left-4 z-50 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="relative w-full max-w-[900px] h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {videos.slice(0, 5).map((video, idx) => {
          const isActive = idx === currentIndex
          const offset = idx - currentIndex
          const absOffset = Math.abs(offset)
          
          let transform = ''
          let zIndex = 10 - absOffset
          let opacity = 1
          
          if (offset === 0) {
            transform = 'translateX(0) scale(1) translateZ(0px)'
          } else if (offset === -1) {
            transform = 'translateX(-55%) scale(0.85) translateZ(-80px) rotateY(12deg)'
            opacity = 0.9
          } else if (offset === 1) {
            transform = 'translateX(55%) scale(0.85) translateZ(-80px) rotateY(-12deg)'
            opacity = 0.9
          } else if (offset === -2) {
            transform = 'translateX(-90%) scale(0.7) translateZ(-160px) rotateY(20deg)'
            opacity = 0.6
          } else if (offset === 2) {
            transform = 'translateX(90%) scale(0.7) translateZ(-160px) rotateY(-20deg)'
            opacity = 0.6
          } else {
             opacity = 0
             transform = 'translateX(0) scale(0)'
          }
          
          return (
            <div 
              key={video.id}
              className={`absolute w-[180px] sm:w-[220px] aspect-[9/16] rounded-[8px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'ring-2 ring-purple-500/40 ring-offset-1' : 'border border-black/10'}`}
              style={{ transform, zIndex, opacity }}
              onClick={() => isActive ? onPlay(video) : setCurrentIndex(idx)}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-md hover:scale-110 transition-transform">
                    <PlayArrowIcon sx={{ fontSize: 24 }} />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="inline-block px-1.5 py-0.5 mb-1.5 rounded-[2px] text-[10px] font-black bg-white/20 backdrop-blur-md text-white uppercase tracking-wider shadow-sm border border-white/10">
                  {video.tag || 'Insight'}
                </span>
                <h3 className="text-white text-[16px] font-black leading-tight line-clamp-2 mb-1 drop-shadow-md">{video.title}</h3>
                <p className="text-white/90 text-[12px] font-medium flex items-center gap-1 drop-shadow-md">
                  <span className="truncate">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-400" />}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      <button 
        onClick={handleNext}
        disabled={currentIndex >= Math.min(videos.length - 1, 4)}
        className="absolute right-4 z-50 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white hover:border-transparent disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
})

export default function SpotlightDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const perPage = 10

  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const activeIdx = activeVideo
    ? SPOTLIGHT_VIDEOS.findIndex((v) => v.id === activeVideo.id)
    : -1

  return (
    <div className="relative flex-1 w-full h-full flex flex-col bg-[#F8F9FA] overflow-hidden">
      <style>{STYLES}</style>

      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col animate-in fade-in duration-500 overflow-y-auto scroll-smooth hide-scrollbar pb-8">
        <div className="sticky top-0 z-40 shrink-0 bg-white px-4 py-2">
          <div className="max-w-[1600px] mx-auto">
            <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
          </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row gap-6 px-2 py-2 max-w-[1600px] bg-white w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          <main className="flex-1 min-w-0 flex flex-col gap-6 bg-white p-4 rounded-[8px]">
            <section>
              <CoverflowCarousel videos={filtered} onPlay={setActiveVideo} />
            </section>

            <section className="w-full flex flex-col gap-4 pt-2 pb-4">
              <SectionHeader
                icon={
                  <div className="p-1 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[4px] text-white shadow-sm">
                    <LayoutGrid size={14} />
                  </div>
                }
                title="Discover More"
              />

              {displayedVideos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 mt-2">
                    {displayedVideos.map((video, idx) => (
                      <DesktopSpotlightCard key={video.id} video={video} onPlay={setActiveVideo} index={idx} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-6 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className="group flex items-center justify-center gap-2 px-8 py-3 rounded-[8px] bg-white/80 backdrop-blur-md border border-purple-200/50 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-500 cursor-pointer shadow-[0_4px_16px_rgba(124,58,237,0.1)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        <AutorenewIcon sx={{ fontSize: 16 }} className="group-hover:rotate-180 transition-transform duration-700" />
                        Load More Spotlights
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-[8px] border border-dashed border-gray-200">
                  <div className="w-12 h-12 mb-3 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                    <LayoutGrid size={20} className="text-gray-400" />
                  </div>
                  <p className="text-[15px] font-bold text-gray-900">No spotlights found</p>
                  <p className="text-[12px] text-gray-500 mt-1 max-w-xs">
                    We couldn't find any content matching your current filters.
                  </p>
                </div>
              )}
            </section>
          </main>

          <aside className="w-full xl:w-[300px] shrink-0 flex flex-col gap-4 h-fit animate-in fade-in slide-in-from-right-4 duration-500">
            
            <div className="bg-white rounded-[8px] p-4 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Flame size={18} className="text-orange-500" />
                <h3 className="text-[15px] font-black text-gray-900 tracking-tight">Spotlight Impact</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <StatCard icon={<Eye size={14} />} value="12M+" label="Total Views" color="text-purple-600" bg="bg-purple-50" border="border-purple-100/50" delay={0} />
                <StatCard icon={<Flame size={14} />} value="#1" label="Trending" color="text-orange-600" bg="bg-orange-50" border="border-orange-100/50" delay={40} />
                <StatCard icon={<Users size={14} />} value="850+" label="Creators" color="text-blue-600" bg="bg-blue-50" border="border-blue-100/50" delay={80} />
                <StatCard icon={<TrendingUp size={14} />} value="45K" label="Shares" color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100/50" delay={120} />
              </div>
            </div>

            <div className="relative w-full rounded-[8px] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 p-4 text-center shadow-md flex flex-col items-center justify-center min-h-[280px] group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="relative w-[140px] h-[200px] mx-auto -mt-8 mb-4 rounded-[8px] overflow-hidden shadow-xl -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 border-[3px] border-white/10">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" alt="App preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <PlayArrowIcon sx={{ fontSize: 24 }} className="text-white ml-0.5 drop-shadow-md" />
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 w-full mt-auto">
                <h3 className="text-white text-[18px] font-black mb-1 drop-shadow-md leading-tight">Create. Share.</h3>
                <p className="text-white/80 text-[12px] font-medium mb-4 max-w-[200px] mx-auto leading-tight drop-shadow-sm">Join thousands showcasing ideas.</p>
                <button className="bg-white text-purple-700 text-[13px] font-bold px-4 py-2.5 rounded-[8px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all w-full border-none cursor-pointer flex items-center justify-center gap-1.5">
                  Start Now
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[8px] p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[4px] bg-purple-50 flex items-center justify-center">
                    <TrendingUp size={12} className="text-purple-600" />
                  </div>
                  <h3 className="text-[14px] font-black text-gray-900 tracking-tight">Top Creators</h3>
                </div>
                <button className="text-purple-600 text-[12px] font-bold hover:text-purple-800 cursor-pointer bg-transparent border-none transition-colors">
                  See all
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { name: 'Ritika Sharma', views: '2.4M views', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', rank: 1 },
                  { name: 'Amit Verma', views: '1.8M views', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rank: 2 },
                  { name: 'Rahul Prasad', views: '1.2M views', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', rank: 3 },
                  { name: 'Neha Iyer', views: '950K views', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', rank: 4 },
                ].map((expert) => (
                  <div
                    key={expert.rank}
                    className="flex items-center group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-[4px] transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[12px] font-black w-4 text-center ${expert.rank <= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                        {expert.rank}
                      </span>
                      <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-indigo-500 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                          <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{expert.name}</span>
                          <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500" />
                        </div>
                        <span className="text-[11px] font-medium text-gray-500 mt-0.5 leading-tight">{expert.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
      
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <ActiveSpotlightDesktop
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