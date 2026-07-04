import { useState, useRef, useEffect, memo } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const SpotlightVideoPlayerMobile = memo(function SpotlightVideoPlayerMobile({ 
  video, 
  onClose
}: { 
  video: SpotlightVideo 
  onClose: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
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
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden @container/player">
      <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
      
      <div className="absolute top-[3cqh] left-[4cqw] right-[4cqw] flex items-center justify-between z-30">
        <button 
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-black/50 transition-all duration-200 border border-white/10"
          aria-label="Close video"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 15 }} />
        </button>

        <div className="bg-black/40 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10">
          <span className="text-white/80 text-[10px] font-semibold tracking-wide">{video.duration}</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/15 shadow-xl">
          <PlayArrowRoundedIcon sx={{ fontSize: 32 }} className="ml-0.5" />
        </div>
      </div>

      <div className="absolute right-[3cqw] bottom-[5cqh] flex flex-col items-center gap-4 z-40">
        <div className="flex flex-col items-center gap-0.5">
          <button 
            onClick={() => setIsLiked(v => !v)}
            className={`w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all duration-200 ${isLiked ? 'text-red-500' : 'text-white'}`} 
            aria-label="Like video"
          >
            {isLiked 
              ? <FavoriteIcon sx={{ fontSize: 20 }} /> 
              : <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            }
          </button>
          <span className="text-white/70 text-[10px] font-semibold drop-shadow-md">Like</span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <button className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full text-white border border-white/10 transition-all duration-200" aria-label="Share video">
            <ShareOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
          <span className="text-white/70 text-[10px] font-semibold drop-shadow-md">Share</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all duration-200 ${isMenuOpen ? 'text-white bg-black/50' : 'text-white'}`}
            aria-label="More options"
          >
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </button>
          <span className="text-white/70 text-[10px] font-semibold drop-shadow-md">More</span>
          
          {isMenuOpen && (
            <div className="absolute bottom-14 right-0 w-[38cqw] min-w-[130px] max-w-[180px] bg-[#1a1a1a]/95 backdrop-blur-xl rounded-lg shadow-xl py-1 z-50 flex flex-col text-[12px] border border-white/10 overflow-hidden animate-in zoom-in-95 fade-in duration-200 origin-bottom-right">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors w-full text-left font-medium border-none bg-transparent"
              >
                <BookmarkBorderIcon sx={{ fontSize: 14 }} />
                Save
              </button>
              <div className="h-px w-full bg-white/8 mx-2" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors w-full text-left font-medium border-none bg-transparent"
              >
                <ReportProblemOutlinedIcon sx={{ fontSize: 14 }} />
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-[3cqh] left-[4cqw] right-[15cqw] flex flex-col gap-2 z-30">
        {video.link && (
          <div className="mb-1 @container">
            <SpotlightLink linkData={video.link} />
          </div>
        )}

        <h2 className="text-white text-[clamp(13px,4cqw,16px)] font-bold leading-snug drop-shadow-xl line-clamp-2">
          {video.title}
        </h2>
        
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shadow-md flex-shrink-0">
            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
              <span className="text-[11px] font-bold text-white">{video.authorInitial}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-white text-[clamp(11px,3.5cqw,14px)] font-bold drop-shadow-md truncate">
              {video.author}
            </span>
            {video.verified && <VerifiedIcon sx={{ fontSize: 13 }} className="text-[#3B82F6] drop-shadow-md shrink-0" />}
          </div>
          <span className="text-white/40 text-[10px]">•</span>
          <span className="text-white/50 text-[clamp(10px,3cqw,12px)] font-medium shrink-0">{video.views}</span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15 z-30">
        <div className="h-full bg-white w-1/3 rounded-r-full shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
      </div>
    </div>
  )
})

export default SpotlightVideoPlayerMobile