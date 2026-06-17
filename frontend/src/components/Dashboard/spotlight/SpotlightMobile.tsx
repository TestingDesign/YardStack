import { useState, useCallback, memo, useRef, useEffect } from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VerifiedIcon from '@mui/icons-material/Verified'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

import SpotlightTabs from './SpotlightTabs'
import { SPOTLIGHT_VIDEOS, type SpotlightVideo } from './data'

interface VideoCardProps {
  video: SpotlightVideo
  onClick: () => void
}

const VideoCard = memo(function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="relative aspect-10/16 rounded-lg overflow-hidden group cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
      
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none">
        <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
          <PlayArrowOutlinedIcon sx={{ fontSize: 24 }} />
        </div>
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex flex-col z-10 pointer-events-none">
        <h3 className="text-white text-[12px] md:text-[13px] font-extrabold leading-tight drop-shadow-md line-clamp-3">
          {video.title}
        </h3>
      </div>
    </div>
  )
})

const ActiveVideoPlayer = memo(function ActiveVideoPlayer({ video, onClose }: { video: SpotlightVideo, onClose: () => void }) {
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
    <div className={`relative w-full h-full bg-black flex flex-col overflow-hidden transition-all ${isCleanMode ? 'z-[100]' : ''}`}>
      <div className={`absolute inset-0 bg-linear-to-b ${video.gradient} transition-opacity duration-300 ${isCleanMode ? 'opacity-0' : 'opacity-90'}`} />
      
      <div className={`absolute top-3 left-3 right-3 flex items-center justify-between z-30 transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
          aria-label="Go back"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
        </button>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-white">
            <PlayArrowOutlinedIcon sx={{ fontSize: 16 }} />
            <span className="text-[11px] font-semibold">{video.views}</span>
          </div>
          
          <div className="relative flex items-center gap-1.5" ref={menuRef}>
            <div className="bg-black/40 backdrop-blur-md rounded-lg px-2 py-1 text-[11px] font-bold text-white">
              {video.duration}
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="text-white bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors p-1 rounded-full"
              aria-label="More options"
            >
              <MoreVertIcon sx={{ fontSize: 18 }} />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-1 z-40 flex flex-col text-[13px] border border-gray-100 overflow-hidden transform origin-top-right transition-all">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left font-medium"
                >
                  <FavoriteBorderIcon sx={{ fontSize: 16 }} className="text-gray-500" />
                  Favorite
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left font-medium"
                >
                  <ShareOutlinedIcon sx={{ fontSize: 16 }} className="text-gray-500" />
                  Share
                </button>
                <div className="h-px w-full bg-gray-200 my-0.5" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                  className="flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left font-medium"
                >
                  <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} />
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${isCleanMode ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-14 h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
          <PlayArrowOutlinedIcon sx={{ fontSize: 36 }} />
        </div>
      </div>

      <div className={`absolute bottom-6 left-3 right-12 flex flex-col gap-2.5 z-20 pointer-events-none transition-opacity duration-300 ${isCleanMode ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-white text-[15px] md:text-[16px] font-extrabold leading-tight drop-shadow-lg pr-2">
          {video.title}
        </h2>
        
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
            <span className="text-[12px] font-extrabold text-[#1f1633]">{video.authorInitial}</span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-white text-[13px] font-bold drop-shadow-md truncate">
              {video.author}
            </span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#3B82F6] drop-shadow-md shrink-0" />}
          </div>
        </div>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation()
          setIsCleanMode(!isCleanMode)
        }}
        className={`absolute bottom-4 right-3 z-40 w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-full transition-all duration-300 ${isCleanMode ? 'bg-[#FF0000] text-white scale-110 shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'bg-black/40 text-white hover:bg-black/60'}`}
        aria-label={isCleanMode ? "Exit full screen" : "View full screen"}
      >
        {isCleanMode ? <FullscreenExitIcon sx={{ fontSize: 24 }} /> : <FullscreenIcon sx={{ fontSize: 22 }} />}
      </button>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30 transition-opacity duration-300 ${isCleanMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="h-full bg-[#FF0000] w-1/3 rounded-r-full shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
      </div>
    </div>
  )
})

export default function SpotlightMobile() {
  const [activeFilter, setActiveFilter] = useState('forYou')
  const [activeVideo, setActiveVideo] = useState<SpotlightVideo | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
  }, [])

  const filteredVideos = activeFilter === 'forYou' 
    ? SPOTLIGHT_VIDEOS 
    : SPOTLIGHT_VIDEOS.filter((v) => v.tag?.toLowerCase() === activeFilter.toLowerCase())

  useEffect(() => {
    if (activeVideo && scrollRef.current) {
      const index = filteredVideos.findIndex(v => v.id === activeVideo.id)
      if (index !== -1) {
        scrollRef.current.scrollTop = index * scrollRef.current.clientHeight
      }
    }
  }, [activeVideo, filteredVideos])

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-white overflow-hidden relative">
      {!activeVideo && (
        <div className="shrink-0 z-20 bg-white backdrop-blur-md ">
          <SpotlightTabs active={activeFilter} onChange={handleFilterChange} />
        </div>
      )}

      {activeVideo ? (
        <div 
          ref={scrollRef}
          className="flex-1 w-full h-full relative bg-black overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none animate-in slide-in-from-bottom-8 duration-300"
        >
          {filteredVideos.map((video) => (
            <div key={video.id} className="w-full h-full snap-start shrink-0 relative">
              <ActiveVideoPlayer video={video} onClose={() => setActiveVideo(null)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none w-full">
          <div className="grid grid-cols-3 gap-1 w-full">
            {filteredVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onClick={() => setActiveVideo(video)} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

