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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

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
  const [isCleanMode, setIsCleanMode] = useState(false)
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
    <div className="w-full h-full flex items-end justify-center gap-4 bg-white animate-in fade-in duration-300 relative">
      
      {/* Back Button */}
      <button 
        onClick={onClose}
        className={`absolute top-6 left-6 w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-all z-50 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
      </button>

      {/* Video Container */}
      <div className={`w-[380px] h-[85vh] max-h-[800px] min-h-[500px] relative overflow-hidden bg-black flex flex-col my-auto transition-all duration-300 ${isCleanMode ? 'scale-105 rounded-none z-[100]' : 'rounded-2xl shadow-2xl border border-gray-200'}`}>
        <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} transition-opacity duration-300 ${isCleanMode ? 'opacity-0' : 'opacity-90'}`} />
        
        {/* Top bar inside video (Views & Duration) */}
        <div className={`absolute top-4 left-4 right-4 flex items-center justify-between z-30 transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white">
            <PlayArrowOutlinedIcon sx={{ fontSize: 18 }} />
            <span className="text-[13px] font-semibold">{video.views} views</span>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-[13px] font-bold text-white">
            {video.duration}
          </div>
        </div>

        {/* Play Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl">
            <PlayArrowOutlinedIcon sx={{ fontSize: 48 }} />
          </div>
        </div>

        {/* Bottom Info */}
        <div className={`absolute bottom-8 left-5 right-14 flex flex-col gap-3 z-20 pointer-events-none transition-opacity duration-300 ${isCleanMode ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-white text-[18px] font-extrabold leading-snug drop-shadow-xl pr-4">
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

        {/* Fullscreen Toggle */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            setIsCleanMode(!isCleanMode)
          }}
          className="absolute bottom-6 right-4 z-40 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
          aria-label={isCleanMode ? "Exit full screen" : "View full screen"}
        >
          {isCleanMode ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </button>

        {/* Progress Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-30 transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="h-full bg-[#FF0000] w-1/3 rounded-r-full shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
        </div>
      </div>

      {/* Right Side Actions & Navigation */}
      <div className="flex flex-col gap-6 mb-[10vh] animate-in slide-in-from-bottom-8 duration-500 delay-150 fill-mode-both">
        
        {/* Navigation Arrows */}
        <div className="flex flex-col gap-3 mb-2 bg-gray-50 p-2 rounded-full border border-gray-200">
          <button 
            onClick={onPrev}
            disabled={!onPrev}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${onPrev ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm' : 'text-gray-400 cursor-not-allowed'}`}
            aria-label="Previous video"
          >
            <KeyboardArrowUpIcon sx={{ fontSize: 28 }} />
          </button>
          <button 
            onClick={onNext}
            disabled={!onNext}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${onNext ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm' : 'text-gray-400 cursor-not-allowed'}`}
            aria-label="Next video"
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 28 }} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <button className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors shadow-sm">
            <FavoriteBorderIcon sx={{ fontSize: 24 }} />
          </button>
          <span className="text-gray-600 text-[13px] font-medium">Like</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <button className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors shadow-sm">
            <ShareOutlinedIcon sx={{ fontSize: 24 }} />
          </button>
          <span className="text-gray-600 text-[13px] font-medium">Share</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 relative" ref={menuRef}>
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors shadow-sm"
          >
            <MoreVertIcon sx={{ fontSize: 24 }} />
          </button>
          {isMenuOpen && (
            <div className="absolute bottom-full right-[120%] mb-2 mr-2 w-48 bg-white backdrop-blur-md rounded-xl shadow-xl py-1 z-40 flex flex-col text-[14px] border border-gray-100 overflow-hidden transform origin-bottom-right transition-all">
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

  const currentIndex = activeVideo ? filteredVideos.findIndex(v => v.id === activeVideo.id) : -1
  const handlePrev = currentIndex > 0 ? () => setActiveVideo(filteredVideos[currentIndex - 1]) : undefined
  const handleNext = currentIndex >= 0 && currentIndex < filteredVideos.length - 1 ? () => setActiveVideo(filteredVideos[currentIndex + 1]) : undefined

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-white overflow-hidden relative">
      {!activeVideo && (
        <div className="shrink-0 z-20 bg-white backdrop-blur-md ">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>
      )}

      {activeVideo ? (
        <div className="flex-1 w-full h-full relative">
          <ActiveVideoPlayer 
            video={activeVideo} 
            onClose={() => setActiveVideo(null)} 
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none w-full">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
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
