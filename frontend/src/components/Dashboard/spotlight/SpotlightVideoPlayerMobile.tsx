import { useState, useRef, useEffect, memo } from 'react'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const SpotlightVideoPlayerMobile = memo(function SpotlightVideoPlayerMobile({ 
  video, 
  onClose,
  onNext,
  onPrev
}: { 
  video: SpotlightVideo 
  onClose: () => void
  onNext?: () => void
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
      <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90`} />
      
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
        {video.link && (
          <SpotlightLink linkData={video.link} />
        )}
        
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

export default SpotlightVideoPlayerMobile
