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

const SpotlightVideoPlayerDesktop = memo(function SpotlightVideoPlayerDesktop({ 
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

export default SpotlightVideoPlayerDesktop
