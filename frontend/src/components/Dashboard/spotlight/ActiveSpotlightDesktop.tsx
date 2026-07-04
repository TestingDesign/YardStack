import React, { useState, useRef, useEffect, memo } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const ActiveSpotlightDesktop = memo(function ActiveSpotlightDesktop({ 
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
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)
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
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] animate-in fade-in duration-500 overflow-hidden relative">
      <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-[0.15] blur-3xl scale-150 transition-all duration-1000`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_70%)]" />
      
      <button 
        onClick={onClose}
        className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center bg-white/8 hover:bg-white/15 backdrop-blur-xl rounded-full text-white/70 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 z-50 cursor-pointer border border-white/8 shadow-lg"
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 15 }} className="ml-0.5" />
      </button>

      <div className="flex flex-row items-center justify-center gap-5 h-[90vh] max-h-[920px] w-full px-6">
        <div 
          className="relative h-full aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] group shrink-0 cursor-pointer"
          onMouseEnter={() => setShowPlayButton(true)}
          onMouseLeave={() => setShowPlayButton(true)}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-90 transition-opacity duration-700`} />
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm">
              <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-300 ${showPlayButton ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/15 shadow-2xl transition-transform duration-400 group-hover:scale-110">
                <PlayArrowRoundedIcon sx={{ fontSize: 36 }} className="drop-shadow-lg ml-0.5" />
              </div>
            </div>
          )}

          <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10">
            <span className="text-white/90 text-[11px] font-medium tracking-wide">{video.duration}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-10" />

          <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end gap-3">
            {video.link && (
              <div className="w-full @container">
                <SpotlightLink linkData={video.link} />
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                   <span className="text-white text-[13px] font-medium tracking-wider">{video.authorInitial}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-white font-medium text-[14px] hover:underline cursor-pointer drop-shadow-md truncate">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-400 drop-shadow-md shrink-0" />}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-white/60 text-[12px] font-medium drop-shadow-md">
                    {video.views} views
                  </span>
                  <span className="text-white/30 text-[10px]">•</span>
                  <button className="text-white/80 font-medium text-[12px] hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <p className="text-white/90 text-[14px] leading-snug drop-shadow-md line-clamp-2 font-medium">
              {video.title}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-50">
            <div className={`h-full bg-white rounded-r-full relative transition-all duration-1000 ease-out ${isLoading ? 'w-0' : 'w-1/3'}`}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0 self-end pb-8">
          <div className="flex flex-col items-center gap-1.5 mb-2">
            <NavButton onClick={onPrev} disabled={!onPrev} icon={<KeyboardArrowUpIcon sx={{ fontSize: 20 }} />} ariaLabel="Previous video" />
            <NavButton onClick={onNext} disabled={!onNext} icon={<KeyboardArrowDownIcon sx={{ fontSize: 20 }} />} ariaLabel="Next video" />
          </div>
          
          <ActionButton 
            icon={isLiked 
              ? <FavoriteIcon sx={{ fontSize: 20 }} className="text-red-500" /> 
              : <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            } 
            label={video.views} 
            onClick={() => setIsLiked(v => !v)}
            active={isLiked}
          />
          
          <ActionButton icon={<ShareOutlinedIcon sx={{ fontSize: 20 }} />} label="Share" />
          
          <ActionButton 
            icon={<BookmarkBorderIcon sx={{ fontSize: 20 }} />} 
            label="Save" 
            onClick={() => setIsSaved(v => !v)}
            active={isSaved}
          />
          
          <div className="relative flex flex-col items-center" ref={menuRef}>
            <ActionButton 
              icon={<MoreVertIcon sx={{ fontSize: 20 }} />} 
              onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); setIsMenuOpen(!isMenuOpen) }}
              active={isMenuOpen}
            />
            
            {isMenuOpen && (
              <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 w-44 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-1 z-50 flex flex-col text-[13px] border border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom">
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center gap-2.5 px-3.5 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors w-full text-left font-medium cursor-pointer border-none bg-transparent"
                >
                  <BookmarkBorderIcon sx={{ fontSize: 16 }} /> Save to playlist
                </button>
                <div className="h-px bg-white/8 mx-2.5" />
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center gap-2.5 px-3.5 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/8 transition-colors w-full text-left font-medium cursor-pointer border-none bg-transparent"
                >
                  <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} /> Report Video
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

function ActionButton({ 
  icon, label, onClick, active 
}: { 
  icon: React.ReactNode, label?: string, onClick?: (e?: React.MouseEvent) => void, active?: boolean 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group cursor-pointer border-none bg-transparent p-0 transition-transform duration-200 hover:scale-105 active:scale-95`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
        active 
          ? 'bg-white/20 border border-white/25 text-white' 
          : 'bg-white/8 hover:bg-white/15 border border-white/8 hover:border-white/20 text-white/80 hover:text-white'
      }`}>
        {icon}
      </div>
      {label && (
        <span className={`text-[11px] font-medium drop-shadow-md transition-colors ${active ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
          {label}
        </span>
      )}
    </button>
  )
}

function NavButton({ onClick, disabled, icon, ariaLabel }: { onClick?: () => void, disabled: boolean, icon: React.ReactNode, ariaLabel: string }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      aria-label={ariaLabel}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 border-none ${
        !disabled 
          ? 'bg-white/8 hover:bg-white/15 text-white/70 hover:text-white cursor-pointer hover:scale-110 active:scale-95 border border-white/8 hover:border-white/20' 
          : 'bg-white/4 text-white/15 cursor-not-allowed'
      }`}
    >
      {icon}
    </button>
  )
}

export default ActiveSpotlightDesktop;
