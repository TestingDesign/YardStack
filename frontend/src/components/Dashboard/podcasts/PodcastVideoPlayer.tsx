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
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Replay10Icon from '@mui/icons-material/Replay10'
import Forward10Icon from '@mui/icons-material/Forward10'
import VerifiedIcon from '@mui/icons-material/Verified'
import SettingsIcon from '@mui/icons-material/Settings'
import TheatreModeIcon from '@mui/icons-material/Theaters'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'

import { type PodcastEpisode } from './data'

export type ViewLayout = 'auto' | 'mobile' | 'desktop-theater' | 'fullscreen'

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
      className="group relative w-full cursor-pointer select-none"
      style={{ height: hovering ? (compact ? '10px' : '14px') : '3px', transition: 'height 0.15s ease' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={(e) => onChange(getPct(e))}
      onTouchEnd={(e) => onChange(getPct(e))}
    >
      <div className="absolute inset-0 rounded-full bg-white/20" />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-white/30 transition-all duration-300"
        style={{ width: `${buffered * 100}%` }}
      />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-[#A855F7]"
        style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  )
})

const VolumeControl = memo(function VolumeControl({
  volume,
  muted,
  onToggleMute,
  onVolume,
}: {
  volume: number
  muted: boolean
  onToggleMute: () => void
  onVolume: (v: number) => void
}) {
  const [show, setShow] = useState(false)
  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        type="button"
        onClick={onToggleMute}
        className="p-1 rounded-full hover:bg-white/10 text-white transition-all duration-150"
      >
        {muted || volume === 0
          ? <VolumeOffIcon sx={{ fontSize: 18 }} />
          : <VolumeUpIcon sx={{ fontSize: 18 }} />}
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${show ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={e => onVolume(Number(e.target.value))}
          className="w-full h-1 accent-[#A855F7] cursor-pointer"
        />
      </div>
    </div>
  )
})

const LayoutSwitcher = memo(function LayoutSwitcher({
  layout,
  onChange,
  dropUp = true,
}: {
  layout: ViewLayout
  onChange: (l: ViewLayout) => void
  dropUp?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const options: { value: ViewLayout; label: string; Icon: React.ElementType; desc: string }[] = [
    { value: 'auto',            label: 'Auto',        Icon: AutoAwesomeIcon,  desc: 'Match your device'    },
    { value: 'mobile',          label: 'Mobile',      Icon: SmartphoneIcon,   desc: 'Fits phone viewport'  },
    { value: 'desktop-theater', label: 'Theater',     Icon: TheatreModeIcon,  desc: 'Wide centered overlay' },
    { value: 'fullscreen',      label: 'Full Screen', Icon: FullscreenIcon,   desc: 'Immersive fullscreen'  },
  ]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold transition-all duration-150 border border-white/10"
        title="View layout"
      >
        <SettingsIcon sx={{ fontSize: 12 }} />
        View
      </button>

      {open && (
        <div
          className={`absolute ${dropUp ? 'bottom-[110%]' : 'top-[110%]'} right-0 w-48 bg-[#13131f]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] py-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-150 origin-bottom-right`}
        >
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-3 pt-1 pb-1.5">
            View Layout
          </p>
          {options.map(({ value, label, Icon, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => { onChange(value); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100 border-none cursor-pointer ${
                layout === value
                  ? 'bg-[#7C3AED]/30 text-[#C4B5FD]'
                  : 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon sx={{ fontSize: 16 }} />
              <div className="min-w-0">
                <p className="text-[12px] font-semibold leading-tight">{label}</p>
                <p className="text-[9px] opacity-50 leading-tight">{desc}</p>
              </div>
              {layout === value && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#A855F7] shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
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
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onToggle}
        title={landscape ? 'Switch to portrait' : 'Rotate to landscape'}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all duration-200 border ${
          landscape
            ? 'bg-[#A855F7]/20 border-[#A855F7]/40 text-[#C4B5FD]'
            : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
        }`}
      >
        <ScreenRotationIcon
          sx={{
            fontSize: 12,
            transform: landscape ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.3s ease',
          }}
        />
        {landscape ? 'Portrait' : 'Rotate'}
      </button>
      <button
        type="button"
        onClick={onLock}
        title={locked ? 'Unlock rotation' : 'Lock rotation'}
        className="p-1 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-150"
      >
        {locked ? <LockIcon sx={{ fontSize: 11 }} /> : <LockOpenIcon sx={{ fontSize: 11 }} />}
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
  initialLayout = 'auto',
}: PodcastVideoPlayerProps) {
  const [layout, setLayout] = useState<ViewLayout>(initialLayout)
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

  const effectiveLayout: Exclude<ViewLayout, 'auto'> =
    layout === 'auto'
      ? isNarrowViewport ? 'mobile' : 'desktop-theater'
      : (layout as Exclude<ViewLayout, 'auto'>)

  useEffect(() => {
    if (rotationLocked) return
    const handleOrientation = () => {
      const isLandscape =
        window.screen?.orientation?.type?.startsWith('landscape') ??
        (window.innerWidth > window.innerHeight)
      setLandscape(isLandscape)
    }
    window.addEventListener('orientationchange', handleOrientation)
    window.addEventListener('resize', handleOrientation)
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
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000)
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
      setLayout('fullscreen')
    } else {
      exitFullscreen()
    }
  }

  const exitFullscreen = () => {
    document.exitFullscreen?.()
    setIsFullscreen(false)
    setLayout(initialLayout)
  }

  useEffect(() => {
    const h = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
        if (layout === 'fullscreen') setLayout(initialLayout)
      }
    }
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [layout, initialLayout])

  if (!episode) return null

  const currentTime = fmtTime(Math.floor(progress * totalDuration))

  const eqBars = (
    <div className="absolute top-2 left-2 flex items-end gap-[2px]">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-[#A855F7]"
          style={{
            height: `${6 + i * 3}px`,
            animation: `pvp-eq ${0.3 + i * 0.1}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`@keyframes pvp-eq{from{transform:scaleY(.3)}to{transform:scaleY(1.1)}}`}</style>
    </div>
  )

  if (effectiveLayout === 'mobile') {
    return (
      <div
        className="absolute inset-0 z-[500] flex flex-col bg-[#0b0b16] overflow-hidden"
        style={landscape ? { flexDirection: 'row' } : {}}
      >
        {landscape ? (
          <>
            <div
              className="relative flex-1 bg-black flex items-center justify-center overflow-hidden"
              onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
              onTouchEnd={() => resetHideTimer()}
            >
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className={`w-full h-full object-contain transition-all duration-500 ${isPlaying ? 'scale-[1.012]' : 'scale-100'}`}
              />
              {!isPlaying && <div className="absolute inset-0 bg-black/40" />}

              {isPlaying && eqBars}

              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${!isPlaying ? 'scale-100' : 'scale-50 opacity-0'}`}
                >
                  {isPlaying
                    ? <PauseIcon sx={{ fontSize: 24 }} />
                    : <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5" />}
                </div>
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-2">
                  <ProgressBar
                    progress={progress}
                    buffered={Math.min(1, progress + 0.15)}
                    onChange={setProgress}
                    compact
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={!hasPrev}
                        onClick={onPrev}
                        className="p-0.5 text-white disabled:opacity-30"
                      >
                        <SkipPreviousIcon sx={{ fontSize: 18 }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))}
                        className="p-0.5 text-white"
                      >
                        <Replay10Icon sx={{ fontSize: 16 }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                        className="p-1 text-white active:scale-90 transition-transform"
                      >
                        {isPlaying
                          ? <PauseIcon sx={{ fontSize: 22 }} />
                          : <PlayArrowIcon sx={{ fontSize: 22 }} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))}
                        className="p-0.5 text-white"
                      >
                        <Forward10Icon sx={{ fontSize: 16 }} />
                      </button>
                      <button
                        type="button"
                        disabled={!hasNext}
                        onClick={onNext}
                        className="p-0.5 text-white disabled:opacity-30"
                      >
                        <SkipNextIcon sx={{ fontSize: 18 }} />
                      </button>
                      <span className="text-white/60 text-[9px] font-medium ml-1 tabular-nums">
                        {currentTime}/{episode.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LayoutSwitcher layout={layout} onChange={setLayout} dropUp />
                      <RotateBtn
                        landscape={landscape}
                        locked={rotationLocked}
                        onToggle={() => setLandscape(v => !v)}
                        onLock={() => setRotationLocked(v => !v)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-8 flex flex-col items-center pt-2 bg-[#0b0b16] shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-150"
              >
                <CloseIcon sx={{ fontSize: 13 }} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="shrink-0 flex items-center justify-between px-3 pt-3 pb-1">
              <div className="flex items-center gap-1.5">
                <GraphicEqIcon sx={{ fontSize: 14 }} className="text-[#A855F7]" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                  Now Playing
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateBtn
                  landscape={landscape}
                  locked={rotationLocked}
                  onToggle={() => setLandscape(v => !v)}
                  onLock={() => setRotationLocked(v => !v)}
                />
                <LayoutSwitcher layout={layout} onChange={setLayout} dropUp={false} />
                <button
                  type="button"
                  onClick={onClose}
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-150"
                >
                  <CloseIcon sx={{ fontSize: 13 }} />
                </button>
              </div>
            </div>

            <div
              className="relative shrink-0 w-full bg-black"
              style={{ aspectRatio: '16/9' }}
              onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
              onTouchEnd={() => resetHideTimer()}
            >
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${isPlaying ? 'scale-[1.012]' : 'scale-100'}`}
              />
              {!isPlaying && <div className="absolute inset-0 bg-black/40" />}

              {isPlaying && eqBars}

              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${!isPlaying ? 'scale-100' : 'scale-50 opacity-0'}`}
                >
                  {isPlaying
                    ? <PauseIcon sx={{ fontSize: 24 }} />
                    : <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5" />}
                </div>
              </div>
            </div>

            <div className="shrink-0 px-3 pt-2">
              <ProgressBar
                progress={progress}
                buffered={Math.min(1, progress + 0.15)}
                onChange={setProgress}
                compact
              />
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-white/40 tabular-nums">{currentTime}</span>
                <span className="text-[9px] text-white/40 tabular-nums">{episode.duration}</span>
              </div>
            </div>

            <div className="shrink-0 flex items-start gap-2.5 px-3 py-2">
              <div className="w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-md">
                <span className="text-[11px] font-bold text-white select-none">
                  {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[12px] font-semibold text-white leading-snug line-clamp-2">
                  {episode.title}
                </h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-white/50 truncate">{episode.speaker}</span>
                  {episode.verified && (
                    <VerifiedIcon sx={{ fontSize: 11 }} className="text-blue-400 shrink-0" />
                  )}
                  <span className="text-white/20 text-[9px]">·</span>
                  <span className="text-[9px] text-white/30 truncate">{episode.role}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-center gap-2 px-3 pb-1">
              <button
                type="button"
                disabled={!hasPrev}
                onClick={onPrev}
                className="p-1 text-white disabled:opacity-30"
              >
                <SkipPreviousIcon sx={{ fontSize: 22 }} />
              </button>
              <button
                type="button"
                onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))}
                className="p-1 text-white"
              >
                <Replay10Icon sx={{ fontSize: 20 }} />
              </button>
              <button
                type="button"
                onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                className="w-11 h-11 rounded-full bg-[#7C3AED] flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-90 transition-transform"
              >
                {isPlaying
                  ? <PauseIcon sx={{ fontSize: 24 }} />
                  : <PlayArrowIcon sx={{ fontSize: 24 }} className="ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))}
                className="p-1 text-white"
              >
                <Forward10Icon sx={{ fontSize: 20 }} />
              </button>
              <button
                type="button"
                disabled={!hasNext}
                onClick={onNext}
                className="p-1 text-white disabled:opacity-30"
              >
                <SkipNextIcon sx={{ fontSize: 22 }} />
              </button>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-4 pb-2">
              <VolumeOffIcon sx={{ fontSize: 13 }} className="text-white/30 shrink-0" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={e => {
                  setVolume(Number(e.target.value))
                  setMuted(Number(e.target.value) === 0)
                }}
                className="flex-1 h-0.5 accent-[#A855F7] cursor-pointer"
              />
              <VolumeUpIcon sx={{ fontSize: 13 }} className="text-white/30 shrink-0" />
            </div>

            <div className="shrink-0 flex items-end justify-center gap-[3px] h-8 px-6 pb-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full bg-[#7C3AED]/40"
                  style={{
                    height: `${4 + Math.sin(i * 0.8) * 10 + 8}px`,
                    opacity: isPlaying ? 1 : 0.4,
                    animation: isPlaying
                      ? `pvp-wave ${0.4 + (i % 5) * 0.12}s ease-in-out infinite alternate`
                      : 'none',
                  }}
                />
              ))}
              <style>{`@keyframes pvp-wave{from{transform:scaleY(.5)}to{transform:scaleY(1.3)}}`}</style>
            </div>
          </>
        )}
      </div>
    )
  }

  if (effectiveLayout === 'desktop-theater') {
    return (
      <div
        className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-[1100px] mx-4 rounded-2xl overflow-hidden bg-[#0d0d1a] shadow-[0_40px_120px_rgba(0,0,0,0.8)] border border-white/5"
          style={{ maxHeight: '90vh' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 hover:scale-105 transition-all duration-150"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>

          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 text-white/60 text-[10px] font-semibold px-2 py-1 rounded-full pointer-events-none">
            <DesktopWindowsIcon sx={{ fontSize: 11 }} /> Theater
            {layout === 'auto' && <span className="text-[#A855F7] ml-0.5">· Auto</span>}
          </div>

          <div
            className="relative bg-black"
            style={{ aspectRatio: '16/9' }}
            onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
            onMouseMove={resetHideTimer}
          >
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${isPlaying ? 'scale-[1.012]' : 'scale-100'}`}
            />
            {!isPlaying && <div className="absolute inset-0 bg-black/40" />}

            {isPlaying && (
              <div className="absolute top-3 left-3 flex items-end gap-[3px]">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-[#A855F7]"
                    style={{
                      height: `${8 + i * 3}px`,
                      animation: `pvp-eq ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            )}

            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
            >
              <div
                className={`w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${!isPlaying ? 'scale-100' : 'scale-50 opacity-0'}`}
              >
                {isPlaying
                  ? <PauseIcon sx={{ fontSize: 32 }} />
                  : <PlayArrowIcon sx={{ fontSize: 32 }} className="ml-1" />}
              </div>
            </div>

            <div
              className={`absolute inset-x-0 bottom-0 transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
              onClick={e => e.stopPropagation()}
              onMouseMove={resetHideTimer}
            >
              <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pt-8 pb-3 flex flex-col gap-2">
                <ProgressBar
                  progress={progress}
                  buffered={Math.min(1, progress + 0.15)}
                  onChange={setProgress}
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={!hasPrev}
                      onClick={onPrev}
                      className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-30"
                    >
                      <SkipPreviousIcon sx={{ fontSize: 20 }} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))}
                      className="p-1 rounded-full hover:bg-white/10 text-white"
                    >
                      <Replay10Icon sx={{ fontSize: 18 }} />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                      className="p-1.5 rounded-full hover:bg-white/10 text-white active:scale-90 transition-transform"
                    >
                      {isPlaying
                        ? <PauseIcon sx={{ fontSize: 24 }} />
                        : <PlayArrowIcon sx={{ fontSize: 24 }} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))}
                      className="p-1 rounded-full hover:bg-white/10 text-white"
                    >
                      <Forward10Icon sx={{ fontSize: 18 }} />
                    </button>
                    <button
                      type="button"
                      disabled={!hasNext}
                      onClick={onNext}
                      className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-30"
                    >
                      <SkipNextIcon sx={{ fontSize: 20 }} />
                    </button>
                    <VolumeControl
                      volume={volume}
                      muted={muted}
                      onToggleMute={() => setMuted(v => !v)}
                      onVolume={v => { setVolume(v); setMuted(v === 0) }}
                    />
                    <span className="text-white/60 text-[11px] font-medium ml-1 tabular-nums">
                      {currentTime} / {episode.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LayoutSwitcher layout={layout} onChange={setLayout} />
                    <button
                      type="button"
                      onClick={handleToggleFullscreen}
                      className="p-1 rounded-full hover:bg-white/10 text-white"
                    >
                      <FullscreenIcon sx={{ fontSize: 20 }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 bg-[#0d0d1a]">
            <div className="w-9 h-9 rounded-full shrink-0 bg-gradient-to-br from-[#7C3AED] to-[#D946EF] flex items-center justify-center shadow-md">
              <span className="text-[13px] font-bold text-white">
                {episode.speaker?.charAt(0).toUpperCase() ?? '?'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-[14px] font-semibold text-white leading-snug line-clamp-1">
                {episode.title}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[12px] text-white/50 truncate">{episode.speaker}</span>
                {episode.verified && (
                  <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-400 shrink-0" />
                )}
                <span className="text-white/20 text-[11px]">·</span>
                <span className="text-[11px] text-white/35">{episode.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9000] flex flex-col bg-black animate-in fade-in duration-200"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-150"
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </button>

      <div
        className="relative flex-1 overflow-hidden bg-black"
        onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
        onMouseMove={resetHideTimer}
      >
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-full object-contain"
        />
        {!isPlaying && <div className="absolute inset-0 bg-black/30" />}

        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className={`w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${!isPlaying ? 'scale-100' : 'scale-50 opacity-0'}`}
          >
            {isPlaying
              ? <PauseIcon sx={{ fontSize: 40 }} />
              : <PlayArrowIcon sx={{ fontSize: 40 }} className="ml-1" />}
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        onMouseMove={resetHideTimer}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-t from-black/90 to-transparent px-4 pt-12 pb-4">
          <h2 className="text-white text-[16px] font-semibold mb-0.5 line-clamp-1">
            {episode.title}
          </h2>
          <p className="text-white/40 text-[12px] mb-3">
            {episode.speaker} · {episode.role}
          </p>
          <ProgressBar
            progress={progress}
            buffered={Math.min(1, progress + 0.15)}
            onChange={setProgress}
          />
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={!hasPrev}
                onClick={onPrev}
                className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-30"
              >
                <SkipPreviousIcon sx={{ fontSize: 22 }} />
              </button>
              <button
                type="button"
                onClick={() => setProgress(p => Math.max(0, p - 10 / totalDuration))}
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <Replay10Icon sx={{ fontSize: 20 }} />
              </button>
              <button
                type="button"
                onClick={() => { setIsPlaying(v => !v); resetHideTimer() }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white active:scale-90 transition-transform"
              >
                {isPlaying
                  ? <PauseIcon sx={{ fontSize: 26 }} />
                  : <PlayArrowIcon sx={{ fontSize: 26 }} />}
              </button>
              <button
                type="button"
                onClick={() => setProgress(p => Math.min(1, p + 10 / totalDuration))}
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <Forward10Icon sx={{ fontSize: 20 }} />
              </button>
              <button
                type="button"
                disabled={!hasNext}
                onClick={onNext}
                className="p-1 rounded-full hover:bg-white/10 text-white disabled:opacity-30"
              >
                <SkipNextIcon sx={{ fontSize: 22 }} />
              </button>
              <VolumeControl
                volume={volume}
                muted={muted}
                onToggleMute={() => setMuted(v => !v)}
                onVolume={v => { setVolume(v); setMuted(v === 0) }}
              />
              <span className="text-white/60 text-[11px] ml-1 tabular-nums">
                {currentTime} / {episode.duration}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LayoutSwitcher layout={layout} onChange={setLayout} />
              <button
                type="button"
                onClick={exitFullscreen}
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <FullscreenExitIcon sx={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
