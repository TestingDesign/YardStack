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
    resetHideTimer()
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isPlaying, resetHideTimer])

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
  }, [episode?.id])

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

  const bottomControls = (
    <div
      className={`absolute bottom-0 left-0 w-full z-30 flex flex-col justify-end pb-4 sm:pb-6 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 ease-out ${
        controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      onMouseMove={resetHideTimer}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full mb-4 px-4 sm:px-8">
        <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} compact />
      </div>

      <div className="flex items-center justify-between w-full px-4 sm:px-8">
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
          <div className="w-10 h-10 border border-white/20 rounded-full shrink-0 bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center shadow-md">
            <span className="text-[14px] font-bold text-white select-none">
              {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
            </span>
          </div>
          <div className="min-w-0 drop-shadow-lg">
            <h2 className="text-[13px] font-bold text-white leading-tight mb-0.5 break-words">
              {episode.title}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-[#c2ef4e] font-semibold break-words">{episode.speaker}</span>
              {episode.verified && <VerifiedIcon sx={{ fontSize: 11 }} className="text-[#6a5fc1] shrink-0" />}
              <span className="text-white/30 hidden sm:inline">·</span>
              <span className="text-white/70 break-words hidden sm:inline">{episode.role}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 shrink-0">
          <span className="text-[12px] text-white/90 tabular-nums font-medium drop-shadow-md tracking-wide hidden sm:block">
            {currentTime} <span className="text-white/40 mx-1">/</span> {episode.duration}
          </span>
          <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="text-white/80 hover:text-white transition-transform hover:scale-110 active:scale-95 outline-none p-1"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen (f)' : 'Full screen (f)'}
          >
            {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 24 }} /> : <FullscreenIcon sx={{ fontSize: 24 }} />}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={
        inline
          ? 'relative w-full h-full flex items-center justify-center bg-black/95 animate-in fade-in zoom-in-[0.98] duration-500 rounded-[32px] overflow-hidden'
          : 'fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-400 p-3 sm:p-5'
      }
      onClick={(e) => {
        if (e.target === e.currentTarget && !inline) onClose()
      }}
    >
      <div
        ref={containerRef}
        className={`relative w-full aspect-video overflow-hidden bg-[#05030a] group outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
          inline
            ? 'rounded-[32px]'
            : 'max-w-[1280px] border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(66,32,130,0.2)]'
        } ${isFullscreen ? '!max-w-none !rounded-none !border-none !aspect-auto h-full' : ''}`}
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

          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 sm:gap-4 z-20 pointer-events-none transition-all duration-500 ${
              controlsVisible || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <button
              type="button"
              disabled={!hasPrev}
              onClick={(e) => {
                e.stopPropagation()
                onPrev?.()
              }}
              className="pointer-events-auto text-white/70 hover:text-white disabled:opacity-30 transition-transform hover:scale-110 active:scale-95 p-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
            >
              <SkipPreviousIcon sx={{ fontSize: 32 }} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setProgress((p) => Math.max(0, p - 10 / totalDuration))
              }}
              className="pointer-events-auto text-white/70 hover:text-white transition-transform hover:scale-110 active:scale-95 p-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
            >
              <Replay10Icon sx={{ fontSize: 32 }} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying((v) => !v)
                resetHideTimer()
              }}
              className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/80 hover:bg-black flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 shadow-2xl border border-white/10 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: 40 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 40 }} className="ml-1" />
              )}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setProgress((p) => Math.min(1, p + 10 / totalDuration))
              }}
              className="pointer-events-auto text-white/70 hover:text-white transition-transform hover:scale-110 active:scale-95 p-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
            >
              <Forward10Icon sx={{ fontSize: 32 }} />
            </button>
            <button
              type="button"
              disabled={!hasNext}
              onClick={(e) => {
                e.stopPropagation()
                onNext?.()
              }}
              className="pointer-events-auto text-white/70 hover:text-white disabled:opacity-30 transition-transform hover:scale-110 active:scale-95 p-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
            >
              <SkipNextIcon sx={{ fontSize: 32 }} />
            </button>
          </div>
        </div>

        {!inline && closeButton}
        {!inline && bottomControls}
      </div>
      {inline && closeButton}
      {inline && bottomControls}
    </div>
  )
}