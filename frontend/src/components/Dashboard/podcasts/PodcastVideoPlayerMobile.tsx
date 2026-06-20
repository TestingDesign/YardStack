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

import MobileViewport from '../../commonfiles/MobileViewport'
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

  const centerPlayBtnDesktop = (size: number) => (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 z-20 ${
        controlsVisible || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
      }`}
    >
      <div
        className={`rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
          !isPlaying ? 'scale-100' : 'scale-75 opacity-0'
        }`}
        style={{ width: size, height: size }}
      >
        {isPlaying
          ? <PauseIcon sx={{ fontSize: size * 0.45 }} />
          : <PlayArrowIcon sx={{ fontSize: size * 0.45 }} className="ml-[4px]" />}
      </div>
    </div>
  )

  const isOverlaid = isFullscreen

  return (
    <MobileViewport isMobile={false}>
      <div
        className={inline ? "relative w-full flex items-center justify-center bg-black/95 animate-in fade-in duration-400 rounded-2xl overflow-hidden h-full" : "fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-400"}
        onClick={e => { if (e.target === e.currentTarget && !inline) onClose() }}
      >
        <div
          ref={containerRef}
          className={`relative w-full ${isOverlaid ? 'h-full max-w-none rounded-none' : 'flex flex-col h-full'} overflow-hidden bg-[#05030a] ${inline ? '' : 'border border-white/10 mx-auto rounded-2xl shadow-[0_20px_80px_rgba(66,32,130,0.2)]'} group`}
        >
          <div 
            className={`relative w-full bg-black flex items-center justify-center overflow-hidden shrink-0 ${isOverlaid ? 'absolute inset-0 h-full' : 'aspect-video'}`}
            onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
            onMouseMove={resetHideTimer}
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
            {isOverlaid && (
              <div className={`absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-500 ${isPlaying && !controlsVisible ? 'opacity-0' : 'opacity-100'}`} />
            )}
            {centerPlayBtnDesktop(50)}
          </div>

          <div className={`absolute top-4 right-4 z-30 flex gap-3 transition-all duration-500 ${controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#422082] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95" aria-label="Close player">
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
          </div>

          <div
            className={`
              ${isOverlaid ? 'absolute bottom-0 inset-x-0 z-30 flex flex-col justify-end px-4 pb-4 pt-16 bg-gradient-to-t from-black/80 to-transparent' : 'relative w-full bg-[#05030a] p-4 z-30 flex-shrink-0 border-t border-white/5'}
              transition-all duration-500 ease-out 
              ${controlsVisible || !isPlaying || !isOverlaid ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
            onMouseMove={resetHideTimer}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-end gap-3 mb-4">
              <div className="w-10 h-10 border rounded-full shrink-0 bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center shadow-[0_8px_24px_rgba(66,32,130,0.6)] border-white/20">
                <span className="text-[16px] font-bold text-white select-none">
                  {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
                </span>
              </div>
              <div className="min-w-0 flex-1 drop-shadow-lg">
                <h2 className="text-[16px] sm:text-[18px] mb-1 font-bold text-white leading-tight line-clamp-1">
                  {episode.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] sm:text-[12px]">
                  <span className="text-[#c2ef4e] font-semibold">{episode.speaker}</span>
                  {episode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1] shrink-0" />}
                  <span className="text-white/30">·</span>
                  <span className="text-white/70">{episode.role}</span>
                </div>
              </div>
            </div>

            <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <button type="button" disabled={!hasPrev} onClick={onPrev} className="text-white/70 hover:text-white disabled:opacity-30 transition-all hover:scale-110 active:scale-95">
                  <SkipPreviousIcon sx={{ fontSize: 20 }} />
                </button>
                <button type="button" onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))} className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95">
                  <Replay10Icon sx={{ fontSize: 18 }} />
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 22 }} /> : <PlayArrowIcon sx={{ fontSize: 22 }} className="ml-1" />}
                </button>
                <button type="button" onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))} className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95">
                  <Forward10Icon sx={{ fontSize: 18 }} />
                </button>
                <button type="button" disabled={!hasNext} onClick={onNext} className="text-white/70 hover:text-white disabled:opacity-30 transition-all hover:scale-110 active:scale-95">
                  <SkipNextIcon sx={{ fontSize: 20 }} />
                </button>
                
                <div className="h-6 w-px bg-white/20 mx-1 sm:mx-2" />
                <span className="text-[11px] text-white/70 tabular-nums font-medium drop-shadow-md">
                  {currentTime} <span className="text-white/30 mx-0.5 sm:mx-1">/</span> {episode.duration}
                </span>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-5">
                <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
                <button type="button" onClick={handleToggleFullscreen} className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95" title={isFullscreen ? 'Exit fullscreen (f)' : 'Full screen (f)'}>
                  {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 20 }} /> : <FullscreenIcon sx={{ fontSize: 20 }} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileViewport>
  )
}
