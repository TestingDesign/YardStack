import { useState, useEffect, useRef, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Replay10Icon from '@mui/icons-material/Replay10'
import Forward10Icon from '@mui/icons-material/Forward10'
import VerifiedIcon from '@mui/icons-material/Verified'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


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
  inline = false,
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
    const h = (e: KeyboardEvent) => {
      if (!episode) return
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying(v => !v)
          break
        case 'Escape':
          if (isFullscreen) exitFullscreen()
          else onClose()
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
  }, [episode, isFullscreen, totalDuration, onClose])

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      exitFullscreen()
    }
  }

  const exitFullscreen = () => {
    document.exitFullscreen?.()
    setIsFullscreen(false)
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
        className={`relative w-full shrink-0 bg-black flex items-center justify-center overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-full z-[9999]' : 'aspect-video'}`}
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

        <div className={`absolute top-0 inset-x-0 p-2 sm:p-3 z-30 flex items-start justify-between transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white drop-shadow-md p-1 hover:bg-white/10 rounded-full transition-colors">
            <ExpandMoreIcon sx={{ fontSize: 32 }} />
          </button>
          <div className="flex items-center justify-center text-white drop-shadow-md pr-1" onClick={e => e.stopPropagation()}>
             <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
          </div>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center gap-3 sm:gap-6 z-30 transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button type="button" disabled={!hasPrev} onClick={(e) => { e.stopPropagation(); onPrev(); }} className="text-white hover:scale-110 active:scale-95 disabled:opacity-30 transition-transform">
            <SkipPreviousIcon sx={{ fontSize: 32 }} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setProgress(p => Math.max(0, p - 10 / totalDuration)); resetHideTimer(); }} className="text-white hover:scale-110 active:scale-95 transition-transform hidden sm:block">
            <Replay10Icon sx={{ fontSize: 28 }} />
          </button>
          
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsPlaying(v => !v); resetHideTimer(); }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 56 }} /> : <PlayArrowIcon sx={{ fontSize: 56 }} />}
          </button>

          <button type="button" onClick={(e) => { e.stopPropagation(); setProgress(p => Math.min(1, p + 10 / totalDuration)); resetHideTimer(); }} className="text-white hover:scale-110 active:scale-95 transition-transform hidden sm:block">
            <Forward10Icon sx={{ fontSize: 28 }} />
          </button>
          <button type="button" disabled={!hasNext} onClick={(e) => { e.stopPropagation(); onNext(); }} className="text-white hover:scale-110 active:scale-95 disabled:opacity-30 transition-transform">
            <SkipNextIcon sx={{ fontSize: 32 }} />
          </button>
        </div>

        <div className={`absolute bottom-0 inset-x-0 z-30 px-3 pb-2 pt-8 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${!isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex items-center justify-between text-white text-[12px] font-medium mb-2 drop-shadow-md">
            <span className="tabular-nums opacity-90 tracking-wide">{currentTime} <span className="opacity-60 mx-1">/</span> {episode.duration}</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); handleToggleFullscreen(); }} className="hover:scale-110 active:scale-95 transition-transform">
              {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 22 }} /> : <FullscreenIcon sx={{ fontSize: 22 }} />}
            </button>
          </div>
          <div className="w-full px-1" onClick={e => e.stopPropagation()}>
             <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="w-full bg-[#0f0f0f] pb-2">
          <div className="p-4 flex flex-col gap-3">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-white leading-snug">
              {episode.title}
            </h2>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full shrink-0 bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center border border-white/10">
                  <span className="text-[16px] font-bold text-white select-none">
                    {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-[15px] font-semibold">{episode.speaker}</span>
                    {episode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-white/60 shrink-0" />}
                  </div>
                  <span className="text-white/60 text-[12px]">{episode.role}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))} className="text-white/80 hover:text-white transition-colors sm:hidden flex flex-col items-center">
                  <Replay10Icon sx={{ fontSize: 22 }} />
                </button>
                <button type="button" onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))} className="text-white/80 hover:text-white transition-colors sm:hidden flex flex-col items-center">
                  <Forward10Icon sx={{ fontSize: 22 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
