import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Replay10Icon from '@mui/icons-material/Replay10'
import Forward10Icon from '@mui/icons-material/Forward10'
import VerifiedIcon from '@mui/icons-material/Verified'
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'

import { type PodcastEpisode } from './data'

export type ViewLayout = 'mobile' | 'desktop-theater' | 'fullscreen'

interface PodcastVideoPlayerProps {
  episode: PodcastEpisode | null
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
  initialLayout?: ViewLayout
}

function fmtTime(secs: number) {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function parseDuration(dur: string): number {
  const parts = dur.split(':').map(Number)
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return 0
}

const ProgressBar = memo(function ProgressBar({
  progress,
  buffered,
  onChange,
  compact = false,
}: {
  progress: number
  buffered: number
  onChange: (pct: number) => void
  compact?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const getPct = (e: React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return 0
    const rect = trackRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  return (
    <div
      ref={trackRef}
      className="group relative w-full cursor-pointer select-none py-1.5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={e => onChange(getPct(e))}
      onTouchEnd={e => onChange(getPct(e))}
    >
      <div 
        className="w-full rounded-full bg-white/20 backdrop-blur-sm relative overflow-hidden"
        style={{ height: hovering ? (compact ? '4px' : '6px') : (compact ? '2px' : '4px'), transition: 'height 0.2s ease' }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/30 transition-all duration-300"
          style={{ width: `${buffered * 100}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b5cf6] to-[#c2ef4e]"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#c2ef4e] shadow-[0_0_10px_rgba(194,239,78,0.8)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-200"
        style={{ left: `${progress * 100}%`, width: compact ? '12px' : '14px', height: compact ? '12px' : '14px' }}
      />
    </div>
  )
})

const RotateBtn = memo(function RotateBtn({
  landscape,
  locked,
  onToggle,
  onLock,
}: {
  landscape: boolean
  locked: boolean
  onToggle: () => void
  onLock: () => void
}) {
  return (
    <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          landscape
            ? 'bg-gradient-to-r from-[#422082] to-[#6a5fc1] text-white'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <ScreenRotationIcon
          sx={{
            fontSize: 16,
            transform: landscape ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </button>
      <button
        type="button"
        onClick={onLock}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          locked ? 'bg-white/20 text-[#c2ef4e]' : 'text-white/50 hover:text-white'
        }`}
      >
        {locked ? <LockIcon sx={{ fontSize: 14 }} /> : <LockOpenIcon sx={{ fontSize: 14 }} />}
      </button>
    </div>
  )
})

const VerticalVolumeControl = memo(function VerticalVolumeControl({
  volume,
  muted,
  setVolume,
  setMuted,
}: {
  volume: number
  muted: boolean
  setVolume: (v: number) => void
  setMuted: (v: boolean) => void
}) {
  return (
    <div className="relative flex items-center justify-center group/vol">
      <div className="absolute bottom-full mb-3 w-9 h-28 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center opacity-0 invisible group-hover/vol:opacity-100 group-hover/vol:visible transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.6)] origin-bottom scale-90 group-hover/vol:scale-100 z-50">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={e => {
            const val = Number(e.target.value)
            setVolume(val)
            if (val > 0 && muted) setMuted(false)
            if (val === 0 && !muted) setMuted(true)
          }}
          className="w-20 h-1.5 cursor-pointer accent-[#c2ef4e] bg-white/20 rounded-full appearance-none -rotate-90 hover:accent-white transition-all"
        />
      </div>
      <button
        type="button"
        onClick={() => setMuted(!muted)}
        className="p-2 rounded-full hover:bg-white/20 text-white transition-all duration-200 active:scale-90"
      >
        {muted || volume === 0 ? (
          <VolumeOffIcon sx={{ fontSize: 20 }} />
        ) : (
          <VolumeUpIcon sx={{ fontSize: 20 }} />
        )}
      </button>
    </div>
  )
})

export default function PodcastVideoPlayer({
  episode,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  initialLayout,
}: PodcastVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [landscape, setLandscape] = useState(false)
  const [rotationLocked, setRotationLocked] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalDuration = episode ? parseDuration(episode.duration) : 0

  const [isNarrowViewport, setIsNarrowViewport] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const h = (e: MediaQueryListEvent) => setIsNarrowViewport(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const effectiveLayout: ViewLayout =
    initialLayout ?? (isNarrowViewport ? 'mobile' : 'desktop-theater')

  useEffect(() => {
    if (rotationLocked) return
    const handleOrientation = () => {
      const isLand =
        window.screen?.orientation?.type?.startsWith('landscape') ??
        window.innerWidth > window.innerHeight
      setLandscape(isLand)
    }
    window.addEventListener('orientationchange', handleOrientation)
    window.addEventListener('resize', handleOrientation)
    handleOrientation()
    return () => {
      window.removeEventListener('orientationchange', handleOrientation)
      window.removeEventListener('resize', handleOrientation)
    }
  }, [rotationLocked])

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
        case 'r':
          if (effectiveLayout === 'mobile') setLandscape(v => !v)
          break
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [episode, isFullscreen, totalDuration, effectiveLayout, onClose])

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

  if (effectiveLayout === 'mobile') {
    return (
      <div
        className="fixed inset-0 z-[9000] flex flex-col bg-[#0f0f0f] animate-in fade-in duration-300"
        ref={containerRef}
      >
        {!landscape && (
          <div className="w-full flex items-center justify-between p-2 shrink-0 bg-black">
            <button onClick={onClose} className="p-2 text-white/80 hover:text-white">
              <CloseIcon sx={{ fontSize: 24 }} />
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={() => setLandscape(true)} className="p-2 text-white/80 hover:text-white">
                <FullscreenIcon sx={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
        )}

        <div
          className={`relative w-full bg-black shrink-0 flex items-center justify-center overflow-hidden ${
            landscape ? 'absolute inset-0 z-10 h-full' : 'aspect-video'
          }`}
          onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
          onTouchEnd={() => resetHideTimer()}
        >
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className={`relative z-10 w-full h-full object-contain transition-transform duration-[2000ms] ease-out ${isPlaying ? 'scale-[1.02]' : 'scale-100'}`}
          />

          <div className={`absolute inset-0 z-20 bg-black/50 transition-opacity duration-300 ${isPlaying && !controlsVisible ? 'opacity-0' : 'opacity-100'}`} />

          <div className={`absolute inset-0 z-30 flex items-center justify-center gap-8 sm:gap-16 transition-all duration-300 ${controlsVisible || !isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
            <button onClick={(e) => { e.stopPropagation(); setProgress(p => Math.max(0, p - 10 / totalDuration)) }} className="p-2 text-white hover:text-[#c2ef4e] transition-transform active:scale-90">
              <Replay10Icon sx={{ fontSize: landscape ? 36 : 30 }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsPlaying(v => !v); resetHideTimer() }} className={`${landscape ? 'w-16 h-16' : 'w-14 h-14'} rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 transition-transform active:scale-90`}>
              {isPlaying ? <PauseIcon sx={{ fontSize: landscape ? 36 : 32 }} /> : <PlayArrowIcon sx={{ fontSize: landscape ? 36 : 32 }} className="ml-1" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setProgress(p => Math.min(1, p + 10 / totalDuration)) }} className="p-2 text-white hover:text-[#c2ef4e] transition-transform active:scale-90">
              <Forward10Icon sx={{ fontSize: landscape ? 36 : 30 }} />
            </button>
          </div>

          {landscape && (
            <div className={`absolute top-0 inset-x-0 z-40 flex items-start justify-between p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="flex items-center gap-3">
                <button type="button" onClick={onClose} className="p-1 text-white hover:text-[#c2ef4e] transition-transform active:scale-90">
                  <CloseIcon sx={{ fontSize: 26 }} />
                </button>
                <h2 className="text-white text-[15px] font-semibold line-clamp-1 drop-shadow-md">{episode.title}</h2>
              </div>
              <RotateBtn landscape={landscape} locked={rotationLocked} onToggle={() => setLandscape(v => !v)} onLock={() => setRotationLocked(v => !v)} />
            </div>
          )}

          <div 
            className={`absolute bottom-0 inset-x-0 z-40 px-3 pb-1 pt-12 bg-gradient-to-t from-black/80 to-transparent flex flex-col transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-white/90 text-[12px] tabular-nums font-medium drop-shadow-md">
                {currentTime} <span className="text-white/40 mx-0.5">/</span> {episode.duration}
              </span>
              {landscape && (
                <div className="flex items-center gap-4 text-white">
                  <button disabled={!hasPrev} onClick={onPrev} className="disabled:opacity-30 active:scale-90 transition-transform"><SkipPreviousIcon sx={{fontSize: 24}}/></button>
                  <button disabled={!hasNext} onClick={onNext} className="disabled:opacity-30 active:scale-90 transition-transform"><SkipNextIcon sx={{fontSize: 24}}/></button>
                </div>
              )}
            </div>
            <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} compact />
          </div>
        </div>

        {!landscape && (
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-[18px] font-bold text-white leading-snug mb-3">
              {episode.title}
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center shadow-md">
                <span className="text-[14px] font-bold text-white">{episode.speaker?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-white font-medium text-[15px]">{episode.speaker}</span>
                  {episode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1]" />}
                </div>
                <span className="text-white/60 text-[12px]">{episode.role}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-around py-4 border-y border-white/10">
              <button type="button" disabled={!hasPrev} onClick={onPrev} className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white disabled:opacity-30 active:scale-95 transition-transform">
                <SkipPreviousIcon sx={{ fontSize: 26 }} />
                <span className="text-[11px] font-medium">Previous</span>
              </button>
              <RotateBtn landscape={landscape} locked={rotationLocked} onToggle={() => setLandscape(v => !v)} onLock={() => setRotationLocked(v => !v)} />
              <button type="button" disabled={!hasNext} onClick={onNext} className="flex flex-col items-center gap-1.5 text-white/80 hover:text-white disabled:opacity-30 active:scale-95 transition-transform">
                <SkipNextIcon sx={{ fontSize: 26 }} />
                <span className="text-[11px] font-medium">Next</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-400"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={containerRef}
        className={`relative w-full ${effectiveLayout === 'fullscreen' ? 'h-full max-w-none rounded-none' : 'max-w-[1200px] mx-6 rounded-2xl aspect-video max-h-[85vh] shadow-[0_20px_80px_rgba(66,32,130,0.2)]'} overflow-hidden bg-[#05030a] border border-white/10 group`}
      >
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
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
          <div className={`absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-500 ${isPlaying && !controlsVisible ? 'opacity-0' : 'opacity-100'}`} />
          {centerPlayBtnDesktop(80)}
        </div>

        <div className={`absolute top-4 right-4 z-30 flex gap-3 transition-all duration-500 ${controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <button type="button" onClick={handleToggleFullscreen} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95" title={isFullscreen ? 'Exit fullscreen (f)' : 'Full screen (f)'}>
            {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 20 }} /> : <FullscreenIcon sx={{ fontSize: 20 }} />}
          </button>
          <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#422082] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        <div
          className={`absolute bottom-0 inset-x-0 z-30 flex flex-col justify-end px-8 pb-8 pt-32 transition-all duration-500 ease-out ${controlsVisible || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          onMouseMove={resetHideTimer}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-end gap-5 mb-6">
            <div className="w-16 h-16 rounded-full shrink-0 bg-gradient-to-br from-[#422082] to-[#6a5fc1] flex items-center justify-center shadow-[0_8px_24px_rgba(66,32,130,0.6)] border-2 border-white/20">
              <span className="text-[22px] font-bold text-white select-none">
                {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
              </span>
            </div>
            <div className="min-w-0 flex-1 drop-shadow-lg">
              <h2 className="text-[24px] font-bold text-white leading-tight mb-2 line-clamp-1">
                {episode.title}
              </h2>
              <div className="flex items-center gap-3 text-[14px]">
                <span className="text-[#c2ef4e] font-semibold">{episode.speaker}</span>
                {episode.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-[#6a5fc1] shrink-0" />}
                <span className="text-white/30">·</span>
                <span className="text-white/70">{episode.role}</span>
              </div>
            </div>
          </div>

          <ProgressBar progress={progress} buffered={Math.min(1, progress + 0.15)} onChange={setProgress} />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-6">
              <button type="button" disabled={!hasPrev} onClick={onPrev} className="text-white/70 hover:text-white disabled:opacity-30 transition-all hover:scale-110 active:scale-95">
                <SkipPreviousIcon sx={{ fontSize: 28 }} />
              </button>
              <button type="button" onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))} className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95">
                <Replay10Icon sx={{ fontSize: 24 }} />
              </button>
              <button 
                type="button"
                onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                {isPlaying ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} className="ml-1" />}
              </button>
              <button type="button" onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))} className="text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95">
                <Forward10Icon sx={{ fontSize: 24 }} />
              </button>
              <button type="button" disabled={!hasNext} onClick={onNext} className="text-white/70 hover:text-white disabled:opacity-30 transition-all hover:scale-110 active:scale-95">
                <SkipNextIcon sx={{ fontSize: 28 }} />
              </button>
              
              <div className="h-6 w-px bg-white/20 mx-2" />
              <span className="text-[13px] text-white/70 tabular-nums font-medium drop-shadow-md">
                {currentTime} <span className="text-white/30 mx-1">/</span> {episode.duration}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <VerticalVolumeControl volume={volume} muted={muted} setVolume={setVolume} setMuted={setMuted} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}