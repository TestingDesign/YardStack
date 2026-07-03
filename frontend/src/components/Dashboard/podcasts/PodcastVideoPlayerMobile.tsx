import { useState, useEffect, useRef, useCallback } from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import Forward10Icon from '@mui/icons-material/Forward10'
import Replay10Icon from '@mui/icons-material/Replay10'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

import {
  type PodcastVideoPlayerProps,
  fmtTime,
  parseDuration,
  ProgressBar,
  HorizontalVolumeControl
} from './PodcastVideoPlayerShared'

export default function PodcastVideoPlayerMobile({
  episode,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  hideTopOverlay = false,
}: PodcastVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const closingRef = useRef(false)
  const totalDuration = episode ? parseDuration(episode.duration) : 0

  useEffect(() => {
    if (isPlaying && totalDuration > 0) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false)
            return 1
          }
          return prev + 1 / totalDuration
        })
      }, 1000)
    }
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [isPlaying, totalDuration])

  const resetHideTimer = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3500)
    }
  }, [isPlaying])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetHideTimer()
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isPlaying, resetHideTimer])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlaying(false)
    setProgress(0)
  }, [episode?.id])

  useEffect(() => {
    if (!isPlaying) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setControlsVisible(true)
    }
  }, [isPlaying])

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
      // ignore error on exit
    } finally {
      setIsFullscreen(false)
    }
  }, [])

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true

    setIsPlaying(false)
    setControlsVisible(true)

    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
    setIsFullscreen(false)
    onClose()
  }, [onClose])

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      exitFullscreen()
    }
  }, [exitFullscreen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!episode) return
      
      if (e.key === ' ') {
        if (e.target === document.body || e.target === containerRef.current) {
          e.preventDefault()
        }
      }

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying((v) => !v)
          break
        case 'Escape':
          void handleClose()
          break
        case 'm':
          setMuted((v) => !v)
          break
        case 'ArrowRight':
          setProgress((p) => Math.min(1, p + 10 / totalDuration))
          break
        case 'ArrowLeft':
          setProgress((p) => Math.max(0, p - 10 / totalDuration))
          break
        case 'f':
          handleToggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [episode, totalDuration, handleClose, handleToggleFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkOrientation = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      const landscape = isTouch && (
        window.screen?.orientation?.type?.startsWith('landscape') ||
        window.innerWidth > window.innerHeight
      )
      setIsLandscape(landscape)
      if (landscape && containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {})
      }
    }
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  if (!episode) return null

  const currentTime = fmtTime(Math.floor(progress * totalDuration))

  return (
    <div className={`animate-in slide-in-from-top-4 fade-in duration-400 ${
      isLandscape && !isFullscreen
        ? 'fixed inset-0 z-[9999] bg-[#05030a]'
        : 'w-full flex flex-col bg-[#05030a] shrink-0'
    }`}>
      
      <div 
        ref={containerRef}
        className={`relative bg-black flex items-center justify-center overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
          isFullscreen ? 'w-full h-full z-[9999]' :
          isLandscape ? 'w-full h-full' :
          'w-full shrink-0 aspect-[20/9]'
        }`}
        tabIndex={-1}
        onClick={() => {
          setIsPlaying((v) => !v)
          resetHideTimer()
        }}
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
          className={`relative z-10 w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out ${
            isPlaying ? 'scale-[1.02]' : 'scale-100'
          }`}
        />
        
        <div 
          className={`absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-300 pointer-events-none ${
            !isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'
          }`} 
        />


        {/* Fading top overlay – title only */}
        {!hideTopOverlay && (
          <div 
            className={`absolute top-0 inset-x-0 p-1.5 sm:p-2 z-30 flex items-start pointer-events-none transition-opacity duration-300 ${
              !isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-start gap-1.5 pointer-events-auto max-w-full">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClose() }}
                className="mt-[-2px] p-1 text-white/80 hover:text-white transition-colors outline-none cursor-pointer"
                aria-label="Close player"
              >
                <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />
              </button>
              <div className="flex flex-col gap-1 drop-shadow-lg pt-0.5">
                <h2 className="text-[12px] sm:text-[14px] font-bold text-white leading-tight line-clamp-2">
                  {episode.title}
                </h2>
              </div>
            </div>
          </div>
        )}

        <div 
          className={`absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 z-30 transition-opacity duration-300 ${
            !isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button 
            type="button" 
            disabled={!hasPrev} 
            onClick={(e) => { e.stopPropagation(); onPrev?.(); }} 
            className="text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-110 active:scale-95 disabled:opacity-30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-1"
            aria-label="Previous episode"
          >
            <SkipPreviousIcon sx={{ fontSize: 24 }} />
          </button>
          <button 
            type="button" 
            onClick={(e) => { e.stopPropagation(); setProgress((p) => Math.max(0, p - 10 / totalDuration)); resetHideTimer(); }} 
            className="text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-110 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-1"
            aria-label="Rewind 10 seconds"
          >
            <Replay10Icon sx={{ fontSize: 22 }} />
          </button>
          
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsPlaying((v) => !v); resetHideTimer(); }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white bg-black/60 hover:bg-black active:bg-black backdrop-blur-sm border border-white/10 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/50 shadow-xl mx-2"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
          </button>

          <button 
            type="button" 
            onClick={(e) => { e.stopPropagation(); setProgress((p) => Math.min(1, p + 10 / totalDuration)); resetHideTimer(); }} 
            className="text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-110 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-1"
            aria-label="Fast forward 10 seconds"
          >
            <Forward10Icon sx={{ fontSize: 22 }} />
          </button>
          <button 
            type="button" 
            disabled={!hasNext} 
            onClick={(e) => { e.stopPropagation(); onNext?.(); }} 
            className="text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-110 active:scale-95 disabled:opacity-30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-1"
            aria-label="Next episode"
          >
            <SkipNextIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        <div 
          className={`absolute bottom-0 inset-x-0 z-30 px-2 pb-2 pt-6 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
            !isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between text-white text-[12px] font-medium mb-1.5 px-1 drop-shadow-md">
            <span className="tabular-nums text-white/90 tracking-wide">
              {currentTime} <span className="text-white/40 mx-1">/</span> {episode.duration}
            </span>
            <div className="flex items-center gap-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <HorizontalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
              <button 
                type="button" 
                onClick={() => handleToggleFullscreen()} 
                className="text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] hover:scale-110 active:scale-95 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm p-0.5"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 20 }} /> : <FullscreenIcon sx={{ fontSize: 20 }} />}
              </button>
            </div>
          </div>
          <div className="w-full px-2" onClick={(e) => e.stopPropagation()}>
             <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
          </div>
        </div>
      </div>
    </div>
  )
}