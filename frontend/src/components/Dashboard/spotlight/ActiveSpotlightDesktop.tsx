import React, { useState, useRef, useEffect, memo } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
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
  const [isSaved, setIsSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [clickAnim, setClickAnim] = useState(false)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const scrollLockRef = useRef<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)
    setIsPlaying(true)
    const loadTimer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(loadTimer)
  }, [video])

  useEffect(() => {
    if (isLoading || !isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15))
    }, 16)
    return () => clearInterval(interval)
  }, [isLoading, isPlaying])

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
      } else if (e.key === ' ') {
        e.preventDefault()
        handleVideoClick(e as unknown as React.MouseEvent)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onNext, onPrev])

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying((prev) => !prev)
    setClickAnim(true)
    setTimeout(() => setClickAnim(false), 400)
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] animate-in fade-in duration-500 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 overflow-hidden mix-blend-screen">
        <img src={video.image} alt="" className="w-full h-full object-cover blur-[80px] scale-150 transition-all duration-1000 animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_80%)] pointer-events-none" />
      
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-6 left-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-2xl rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 z-50 cursor-pointer border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        aria-label="Go back"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 18 }} className="ml-1" />
      </button>

      <div className="flex flex-row items-center justify-center w-full h-[90vh] max-h-[920px] px-8">
        
        <div className="flex-1 flex justify-end h-full min-w-0">
          <div className="flex flex-col justify-end gap-6 h-full w-[300px] shrink-0 pb-10 z-10 mr-10 animate-in slide-in-from-left-8 fade-in duration-700 delay-100 fill-mode-both">
            {video.link && (
              <div className="w-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <SpotlightLink linkData={video.link} />
              </div>
            )}

            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2px] shadow-[0_0_20px_rgba(236,72,153,0.3)] flex-shrink-0 cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                   <span className="text-white text-[16px] font-bold tracking-wider">{video.authorInitial}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-[16px] hover:underline cursor-pointer drop-shadow-lg truncate transition-colors hover:text-pink-100">{video.author}</span>
                  {video.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500 drop-shadow-md shrink-0" />}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-white/70 text-[13px] font-medium drop-shadow-md">
                    {video.views} views
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white/95 text-[16px] leading-relaxed drop-shadow-xl font-medium tracking-wide">
              {video.title}
            </p>
          </div>
        </div>

        <div 
          className="relative h-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-[0_30px_100px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 shrink-0 cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_30px_100px_-15px_rgba(255,255,255,0.05)] animate-in zoom-in-95 fade-in duration-700"
          onClick={handleVideoClick}
        >
          <img 
            src={video.image} 
            alt={video.title} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60" />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-md">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin" />
              </div>
            </div>
          )}

          <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${!isPlaying ? 'opacity-100 backdrop-blur-sm bg-black/20' : 'opacity-0'}`}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-white/10 rounded-full animate-ping" />
              <div className="w-20 h-20 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110">
                <PlayArrowRoundedIcon sx={{ fontSize: 50 }} className="drop-shadow-2xl ml-1.5" />
              </div>
            </div>
          </div>

          {clickAnim && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-20 h-20 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 animate-in zoom-in-50 fade-out duration-300 fill-mode-forwards">
                <PlayArrowRoundedIcon sx={{ fontSize: 50 }} className="drop-shadow-2xl ml-1.5" />
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-lg rounded-lg px-2.5 py-1 border border-white/10 shadow-lg">
            <span className="text-white text-[12px] font-semibold tracking-wider">{video.duration}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-50 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 relative transition-all ease-linear"
              style={{ width: `${progress}%`, transitionDuration: isPlaying ? '16ms' : '0ms' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] translate-x-1/2" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-start h-full min-w-0">
          <div className="flex flex-col items-center justify-end gap-2 shrink-0 pb-10 z-10 ml-4 animate-in slide-in-from-right-8 fade-in duration-700 delay-100 fill-mode-both">
            <div className="flex flex-col items-center gap-2 mb-4 bg-white/5 backdrop-blur-xl p-2 rounded-[8px] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
              <NavButton onClick={onPrev} disabled={!onPrev} icon={<KeyboardArrowUpIcon sx={{ fontSize: 24 }} />} ariaLabel="Previous video" />
              <div className="w-6 h-px bg-white/10" />
              <NavButton onClick={onNext} disabled={!onNext} icon={<KeyboardArrowDownIcon sx={{ fontSize: 24 }} />} ariaLabel="Next video" />
            </div>
            
            <ActionButton icon={<ShareOutlinedIcon sx={{ fontSize: 22 }} />} label="Share" />
            
            <ActionButton 
              icon={<BookmarkBorderIcon sx={{ fontSize: 22 }} />} 
              label="Save" 
              onClick={() => setIsSaved(v => !v)}
              active={isSaved}
            />
            
            <div className="relative flex flex-col items-center" ref={menuRef}>
              <ActionButton 
                icon={<MoreVertIcon sx={{ fontSize: 22 }} />} 
                onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); setIsMenuOpen(!isMenuOpen) }}
                active={isMenuOpen}
              />
              
              {isMenuOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-neutral-900/95 backdrop-blur-2xl rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] py-1.5 z-50 flex flex-col text-[14px] border border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                    className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all w-full text-left font-medium cursor-pointer border-none bg-transparent"
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save to playlist
                  </button>
                  <div className="h-px bg-white/10 mx-3" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full text-left font-medium cursor-pointer border-none bg-transparent"
                  >
                    <ReportProblemOutlinedIcon sx={{ fontSize: 18 }} /> Report Video
                  </button>
                </div>
              )}
            </div>
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
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      className="flex flex-col items-center gap-1.5 group cursor-pointer border-none bg-transparent p-0 transition-transform duration-300 hover:scale-110 active:scale-90"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
        active 
          ? 'bg-white/25 border border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
          : 'bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-white/80 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
      }`}>
        {icon}
      </div>
      {label && (
        <span className={`text-[12px] font-semibold tracking-wide drop-shadow-md transition-colors ${active ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>
          {label}
        </span>
      )}
    </button>
  )
}

function NavButton({ onClick, disabled, icon, ariaLabel }: { onClick?: () => void, disabled: boolean, icon: React.ReactNode, ariaLabel: string }) {
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }} 
      disabled={disabled} 
      aria-label={ariaLabel}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border-none ${
        !disabled 
          ? 'bg-transparent hover:bg-white/15 text-white/70 hover:text-white cursor-pointer hover:scale-110 active:scale-90' 
          : 'bg-transparent text-white/10 cursor-not-allowed'
      }`}
    >
      {icon}
    </button>
  )
}

export default ActiveSpotlightDesktop