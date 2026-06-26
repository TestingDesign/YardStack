import { useState, useEffect, useRef, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import VerifiedIcon from '@mui/icons-material/Verified'

import {
  type PodcastVideoPlayerProps,
  fmtTime,
  parseDuration,
  ProgressBar,
  VerticalVolumeControl
} from './PodcastVideoPlayerShared'

export default function PodcastVideoPlayerDesktop({
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

  const exitFullscreen = useCallback(() => {
    document.exitFullscreen?.()
    setIsFullscreen(false)
  }, [])

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
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying((v) => !v)
          break
        case 'Escape':
          if (isFullscreen) exitFullscreen()
          else onClose()
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
  }, [episode, isFullscreen, totalDuration, onClose, handleToggleFullscreen, exitFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (!episode) return null

  const currentTime = fmtTime(Math.floor(progress * totalDuration))

  const closeButton = (
    <div
      className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-30 transition-all duration-500 ease-out ${
        controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#422082] hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50 shadow-lg"
        aria-label="Close player"
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </button>
    </div>
  )

  const topControls = (
    <div
      className={`absolute top-0 left-0 w-full z-30 flex items-start justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-all duration-500 ease-out pointer-events-none ${
        controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0 pr-16 pointer-events-auto">
        <div className="w-12 h-12 border border-white/20 rounded-full shrink-0 bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center shadow-lg">
          <span className="text-[16px] font-bold text-white select-none">
            {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
          </span>
        </div>
        <div className="min-w-0 drop-shadow-lg">
          <h2 className="text-[18px] font-bold text-white leading-tight mb-1 truncate">
            {episode.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            <span className="text-[#c2ef4e] font-semibold">{episode.speaker}</span>
            {episode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1] shrink-0" />}
          </div>
        </div>
      </div>
    </div>
  )

  const bottomControls = (
    <div
      className={`absolute bottom-0 left-0 w-full z-30 flex flex-col justify-end pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ease-out ${
        controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      onMouseMove={resetHideTimer}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full px-2 -mb-1 z-40 relative">
        <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
      </div>

      <div className="flex items-center justify-between w-full px-4 sm:px-6 py-3 bg-black/40 backdrop-blur-sm z-30">
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
            className="text-white hover:text-[#c2ef4e] disabled:opacity-30 transition-transform hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <SkipPreviousIcon sx={{ fontSize: 28 }} />
          </button>
          
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsPlaying((v) => !v); resetHideTimer(); }}
            className="text-white hover:text-[#c2ef4e] transition-transform hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 36 }} /> : <PlayArrowIcon sx={{ fontSize: 36 }} />}
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            className="text-white hover:text-[#c2ef4e] disabled:opacity-30 transition-transform hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <SkipNextIcon sx={{ fontSize: 28 }} />
          </button>

          <div className="ml-2 hidden sm:block">
            <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
          </div>

          <span className="text-[14px] text-white/90 tabular-nums font-semibold drop-shadow-md tracking-wider ml-2">
            {currentTime} <span className="text-white/40 mx-1.5">/</span> {episode.duration}
          </span>
        </div>

        <div className="flex items-center justify-end gap-6 shrink-0">
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="text-white hover:text-[#c2ef4e] transition-transform hover:scale-110 active:scale-95 outline-none p-1"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen (f)' : 'Full screen (f)'}
          >
            {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 28 }} /> : <FullscreenIcon sx={{ fontSize: 28 }} />}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={
        inline
          ? 'relative w-full h-full bg-black/95 animate-in fade-in zoom-in-[0.98] duration-500'
          : 'fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-400 p-3 sm:p-5'
      }
      onClick={(e) => {
        if (e.target === e.currentTarget && !inline) onClose()
      }}
    >
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-[#05030a] group outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
          inline
            ? 'h-full'
            : 'aspect-video max-w-[1280px] border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(66,32,130,0.2)]'
        } ${isFullscreen ? '!max-w-none !rounded-none !border-none !aspect-auto !h-screen w-screen' : ''}`}
        tabIndex={-1}
      >
        <div
          className="relative w-full bg-black flex items-center justify-center overflow-hidden shrink-0 cursor-pointer absolute inset-0 h-full"
          onClick={() => {
            setIsPlaying((v) => !v)
            resetHideTimer()
          }}
          onMouseMove={resetHideTimer}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110 transition-opacity duration-1000"
            style={{ backgroundImage: `url(${episode.thumbnail})` }}
          />
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className={`relative z-10 w-full h-full object-contain transition-transform duration-2000 ease-out ${
              isPlaying ? 'scale-[1.02]' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-500 pointer-events-none ${
              isPlaying && !controlsVisible ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Center Play Icon (YouTube style pulse) */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
              !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-2xl">
              <PlayArrowIcon sx={{ fontSize: 48 }} className="ml-1" />
            </div>
          </div>
        </div>

        {topControls}
        {closeButton}
        {bottomControls}
      </div>
    </div>
  )
}