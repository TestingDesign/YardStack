import React, { useState, useRef, useEffect, memo } from 'react'
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
  const [isLoading, setIsLoading] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const scrollLockRef = useRef<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const loadTimer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(loadTimer)
  }, [video])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return
      
      if (e.deltaY > 50 && onNext) {
        triggerScroll(onNext)
      } else if (e.deltaY < -50 && onPrev) {
        triggerScroll(onPrev)
      }
    }

    const triggerScroll = (action: () => void) => {
      scrollLockRef.current = true
      action()
      setTimeout(() => {
        scrollLockRef.current = false
      }, 1000)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && onNext) {
        triggerScroll(onNext)
      } else if (e.key === 'ArrowUp' && onPrev) {
        triggerScroll(onPrev)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onNext, onPrev])

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 animate-in fade-in duration-500 overflow-hidden relative">
      
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 z-50 cursor-pointer border border-white/10 shadow-lg"
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} className="ml-1" />
      </button>

      <div className="flex flex-row items-center justify-center px-10 gap-6 h-[92vh] max-h-[950px] w-full">
        
        <div className="relative h-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90 transition-opacity duration-700 group-hover:opacity-100`} />
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-24 h-24 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:bg-black/30">
                <PlayArrowOutlinedIcon sx={{ fontSize: 60 }} className="drop-shadow-lg" />
              </div>
            </div>
          )}

          {/* Bottom Gradient for Text Legibility */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
            
            {video.link && (
              <SpotlightLink linkData={video.link} />
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2px] shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-neutral-900 border-2 border-transparent flex items-center justify-center overflow-hidden">
                   <span className="text-white text-[15px] font-bold tracking-wider">{video.authorInitial}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-[16px] hover:underline cursor-pointer drop-shadow-md">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-400 drop-shadow-md" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white/80 text-[13px] flex items-center gap-1 drop-shadow-md">
                    <PlayArrowOutlinedIcon sx={{ fontSize: 14 }} /> {video.views}
                  </span>
                  <span className="text-white/40 text-xs">•</span>
                  <button className="text-white/90 font-bold text-[13px] hover:text-white transition-colors cursor-pointer border-none bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="text-white/95 text-[16px] leading-relaxed drop-shadow-md pr-12 line-clamp-3">
              {video.title}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-50">
            <div className={`h-full bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.8)] relative transition-all duration-1000 ${isLoading ? 'w-0' : 'w-1/3'}`}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full justify-end pb-12 shrink-0">
          <ActionIcon icon={<FavoriteBorderIcon sx={{ fontSize: 28 }} />} label="12.4K" />
          <ActionIcon icon={<ShareOutlinedIcon sx={{ fontSize: 28 }} />} label="Share" />
          <ActionIcon icon={<BookmarkBorderIcon sx={{ fontSize: 28 }} />} label="Save" />
          
          <div className="relative flex flex-col items-center gap-1.5 mt-2" ref={menuRef}>
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMenuOpen(!isMenuOpen) }}
              className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none shadow-lg ${isMenuOpen ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white'}`}
            >
              <MoreVertIcon sx={{ fontSize: 28 }} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-4 w-48 bg-[#262626]/95 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-1.5 z-50 flex flex-col text-[14px] border border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom">
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/10 transition-colors w-full text-left font-medium cursor-pointer border-none bg-transparent"
                >
                  <ReportProblemOutlinedIcon sx={{ fontSize: 20 }} /> Report Video
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <NavButton onClick={onPrev} disabled={!onPrev} icon={<KeyboardArrowUpIcon sx={{ fontSize: 30 }} />} ariaLabel="Previous video" />
        <NavButton onClick={onNext} disabled={!onNext} icon={<KeyboardArrowDownIcon sx={{ fontSize: 30 }} />} ariaLabel="Next video" />
      </div>
    </div>
  )
})

function ActionIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex flex-col items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0">
      <div className="w-[52px] h-[52px] rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 text-white shadow-lg border border-white/10 group-hover:border-white/30">
        {icon}
      </div>
      <span className="text-white/90 text-[13px] font-semibold drop-shadow-md group-hover:text-white transition-colors">{label}</span>
    </button>
  )
}

function NavButton({ onClick, disabled, icon, ariaLabel }: { onClick?: () => void, disabled: boolean, icon: React.ReactNode, ariaLabel: string }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      aria-label={ariaLabel}
      className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 border-none shadow-xl ${
        !disabled 
          ? 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white cursor-pointer hover:scale-110 active:scale-95 border border-white/10' 
          : 'bg-white/5 text-white/20 cursor-not-allowed'
      }`}
    >
      {icon}
    </button>
  )
}

export default SpotlightVideoPlayerDesktop;