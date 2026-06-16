import { useState, useCallback, memo, useRef, useEffect } from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, type SpotlightVideo } from './data'

interface VideoCardProps {
  video: SpotlightVideo
  onClick: () => void
}

const DesktopVideoCard = memo(function DesktopVideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="relative aspect-9/16 rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
      
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-md px-1.5 py-0.5 text-white border border-white/10 z-20">
        <GraphicEqIcon sx={{ fontSize: 12 }} />
        <span className="text-[11px] font-bold tracking-wide">{video.duration}</span>
      </div>

      <div className="absolute top-3 right-3 z-20">
        <button 
          type="button" 
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <BookmarkBorderIcon sx={{ fontSize: 16 }} />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none">
        <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
          <PlayArrowOutlinedIcon sx={{ fontSize: 28 }} />
        </div>
      </div>

      <div className="absolute bottom-10 left-3 right-3 flex flex-col z-10 pointer-events-none gap-1.5">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-1 shadow-sm"
          style={{ backgroundColor: video.logoBg, color: video.logoColor }}
        >
          <span className="text-center font-bold text-[9px] leading-tight whitespace-pre-wrap tracking-wide">
            {video.logoText}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white text-[12px] font-bold drop-shadow-md truncate">
            {video.author}
          </span>
          {video.verified && <VerifiedIcon sx={{ fontSize: 13 }} className="text-[#3B82F6] drop-shadow-md shrink-0" />}
        </div>

        <h3 className="text-white text-[14px] font-extrabold leading-tight drop-shadow-md line-clamp-2">
          {video.title}
        </h3>

        {video.tag && (
          <div className="mt-1">
            <span 
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase"
              style={{ backgroundColor: video.tagBg, color: video.tagColor }}
            >
              {video.tag}
            </span>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
        <span className="text-white/80 text-[11px] font-medium drop-shadow-sm pointer-events-none">
          {video.timeAgo}
        </span>
        <button 
          type="button" 
          className="text-white/80 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  )
})

const ActiveVideoPlayer = memo(function ActiveVideoPlayer({ video, onClose }: { video: SpotlightVideo, onClose: () => void }) {
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
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} opacity-90`} />
      
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
          aria-label="Go back"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white">
            <PlayArrowOutlinedIcon sx={{ fontSize: 18 }} />
            <span className="text-[13px] font-semibold">{video.views} views</span>
          </div>
          
          <div className="relative flex items-center gap-2" ref={menuRef}>
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5 text-[13px] font-bold text-white">
              {video.duration}
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="text-white bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors w-10 h-10 flex items-center justify-center rounded-full"
              aria-label="More options"
            >
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-1 z-40 flex flex-col text-[14px] border border-gray-100 overflow-hidden transform origin-top-right transition-all">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left font-medium"
                >
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} className="text-gray-500" />
                  Favorite
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left font-medium"
                >
                  <ShareOutlinedIcon sx={{ fontSize: 18 }} className="text-gray-500" />
                  Share
                </button>
                <div className="h-px w-full bg-gray-200 my-1" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left font-medium"
                >
                  <ReportProblemOutlinedIcon sx={{ fontSize: 18 }} />
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl">
          <PlayArrowOutlinedIcon sx={{ fontSize: 48 }} />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4 z-20 pointer-events-none">
        <h2 className="text-white text-[24px] font-extrabold leading-tight drop-shadow-xl pr-4">
          {video.title}
        </h2>
        
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-[14px] font-extrabold text-[#1f1633]">{video.authorInitial}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-white text-[15px] font-bold drop-shadow-md truncate">
              {video.author}
            </span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-[#3B82F6] drop-shadow-md shrink-0" />}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-30">
        <div className="h-full bg-[#FF0000] w-1/3 rounded-r-full shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
      </div>
    </div>
  )
})

export default function SpotlightDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
  }, [])

  const filteredVideos = activeFilter === 'all'
    ? SPOTLIGHT_VIDEOS
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-white overflow-hidden relative">
      {!activeVideo && (
        <div className="shrink-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>
      )}

      {activeVideo ? (
        <div className="flex-1 w-full h-full relative">
          <ActiveVideoPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {filteredVideos.map((video) => (
                <DesktopVideoCard 
                  key={video.id} 
                  video={video} 
                  onClick={() => setActiveVideo(video)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-[15px] font-semibold text-gray-800">No videos found</p>
              <p className="text-[13px] text-gray-500 mt-1">Try selecting a different category</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
