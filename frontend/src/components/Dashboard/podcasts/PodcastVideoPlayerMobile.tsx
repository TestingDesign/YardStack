import { useState, useEffect, useRef, useCallback } from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import CloseIcon from '@mui/icons-material/Close'
import Replay10Icon from '@mui/icons-material/Replay10'
import Forward10Icon from '@mui/icons-material/Forward10'

import {
  type PodcastVideoPlayerProps,
  fmtTime,
  parseDuration,
  ProgressBar,
  VerticalVolumeControl
} from './PodcastVideoPlayerShared'

export default function PodcastVideoPlayerMobile({
  episode,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: PodcastVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const closingRef = useRef(false)
  const totalDuration = episode ? parseDuration(episode.duration) : 0

  useEffect(() => {
    if (isPlaying && totalDuration > 0) {
      progressTimerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 1) { setIsPlaying(false); return 1 }
          return prev + 1 / totalDuration
        })
      }, 1000)
    }
    return () => { if (progressTimerRef.current) clearInterval(progressTimerRef.current) }
  }, [isPlaying, totalDuration])

  const resetHideTimer = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3500)
    }
  }, [isPlaying])

  useEffect(() => {
    resetHideTimer()
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current) }
  }, [isPlaying, resetHideTimer])

  useEffect(() => { setIsPlaying(false); setProgress(0) }, [episode?.id])

  useEffect(() => {
    closingRef.current = false
  }, [episode?.id])

  const exitFullscreen = useCallback(async () => {
    if (!document.fullscreenElement || !document.exitFullscreen) {
      setIsFullscreen(false)
      return
    }

    try {
      await document.exitFullscreen()
    } catch {
      // Ignore fullscreen exit failures and still recover the player state.
    } finally {
      setIsFullscreen(false)
    }
  }, [])

  const handleClose = useCallback(async () => {
    if (closingRef.current) return
    closingRef.current = true

    setIsPlaying(false)
    setControlsVisible(true)

    await exitFullscreen()
    onClose()
  }, [exitFullscreen, onClose])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!episode) return
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying(v => !v)
          break
        case 'Escape':
          void handleClose()
          break
        case 'm':
          setMuted(v => !v)
          break
        case 'ArrowRight':
          setProgress(p => Math.min(1, p + 10 / totalDuration))
          break
        case 'ArrowLeft':
          setProgress(p => Math.max(0, p - 10 / totalDuration))
          break
        case 'f':
          handleToggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [episode, totalDuration, handleClose])

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      exitFullscreen()
    }
  }

  useEffect(() => {
    const h = () => {
      if (!document.fullscreenElement) setIsFullscreen(false)
    }
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleOrientation = () => {
      const isLandscape = window.screen?.orientation?.type?.startsWith('landscape') || window.innerWidth > window.innerHeight
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      if (isLandscape && isTouch && containerRef.current) {
        if (!document.fullscreenElement) {
          containerRef.current.requestFullscreen().catch(() => {})
        }
      }
    }
    window.addEventListener('orientationchange', handleOrientation)
    return () => window.removeEventListener('orientationchange', handleOrientation)
  }, [])

  if (!episode) return null

  const currentTime = fmtTime(Math.floor(progress * totalDuration))

  return (
    <div className={`w-full flex flex-col bg-[#0f0f0f] font-['Outfit',sans-serif] animate-in slide-in-from-top-4 duration-300 shrink-0`}>
      
      <div 
        ref={containerRef}
        className={`relative shrink-0 bg-black flex items-center justify-center overflow-hidden transition-all duration-300 ${isFullscreen ? 'w-full h-full z-[9999]' : 'w-full aspect-[20/9]'}`}
        onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${episode.thumbnail})` }}
        />
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`relative z-10 w-full h-full object-contain transition-transform duration-[2000ms] ease-out ${isPlaying ? 'scale-[1.02]' : 'scale-100'}`}
        />
        
        <div className={`absolute inset-0 z-20 bg-black/50 transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`absolute top-0 inset-x-0 p-1.5 sm:p-2 z-30 flex items-start justify-between transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
          <div className="flex flex-col gap-1.5 items-start pointer-events-auto max-w-[75%]">
            <div className="flex flex-col gap-1 px-1.5 drop-shadow-lg">
              <h2 className="text-[11px] sm:text-[13px] font-bold text-white leading-tight line-clamp-2">
                {episode.title}
              </h2>
            </div>
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); void handleClose(); }} onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); void handleClose(); }} className="text-white drop-shadow-md p-2 -m-1 hover:bg-white/10 rounded-full transition-colors shrink-0 pointer-events-auto ml-2">
            <CloseIcon sx={{ fontSize: 16 }} />
          </button>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-3 z-30 transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button type="button" disabled={!hasPrev} onClick={(e) => { e.stopPropagation(); onPrev?.(); }} className="text-white hover:scale-110 active:scale-95 disabled:opacity-30 transition-transform">
            <SkipPreviousIcon sx={{ fontSize: 16 }} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setProgress(p => Math.max(0, p - 10 / totalDuration)); resetHideTimer(); }} className="text-white hover:scale-110 active:scale-95 transition-transform">
            <Replay10Icon sx={{ fontSize: 14 }} />
          </button>
          
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsPlaying(v => !v); resetHideTimer(); }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
          </button>

          <button type="button" onClick={(e) => { e.stopPropagation(); setProgress(p => Math.min(1, p + 10 / totalDuration)); resetHideTimer(); }} className="text-white hover:scale-110 active:scale-95 transition-transform">
            <Forward10Icon sx={{ fontSize: 14 }} />
          </button>
          <button type="button" disabled={!hasNext} onClick={(e) => { e.stopPropagation(); onNext?.(); }} className="text-white hover:scale-110 active:scale-95 disabled:opacity-30 transition-transform">
            <SkipNextIcon sx={{ fontSize: 16 }} />
          </button>
        </div>

        <div className={`absolute bottom-0 inset-x-0 z-30 px-1.5 pb-1 pt-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex items-center justify-between text-white text-[10px] font-medium mb-1 drop-shadow-md">
            <span className="tabular-nums opacity-90 tracking-wide">{currentTime} <span className="opacity-60 mx-1">/</span> {episode.duration}</span>
            <div className="flex items-center gap-2 pointer-events-auto" onClick={e => e.stopPropagation()}>
               <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
               <button type="button" onClick={() => { handleToggleFullscreen(); }} className="hover:scale-110 active:scale-95 transition-transform">
                 {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 11 }} /> : <FullscreenIcon sx={{ fontSize: 11 }} />}
               </button>
            </div>
          </div>
          <div className="w-full px-1" onClick={e => e.stopPropagation()}>
             <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
          </div>
        </div>
      </div>
    </div>
  )
}
