/* eslint-disable react-refresh/only-export-components */
import React, { useState, useRef, memo } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

export type ViewLayout = 'mobile' | 'desktop-theater' | 'fullscreen'

export interface PodcastVideoPlayerProps {
  episode: any
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
  initialLayout?: ViewLayout
  inline?: boolean
}

export function fmtTime(secs: number) {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function parseDuration(dur: string): number {
  const parts = dur.split(':').map(Number)
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return 0
}

interface ProgressBarProps {
  progress: number
  buffered: number
  onChange: (pct: number) => void
  compact?: boolean
}

export const ProgressBar = memo(function ProgressBar({
  progress,
  buffered,
  onChange,
  compact = false,
}: ProgressBarProps) {
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
      className="group relative w-full cursor-pointer select-none py-2 flex items-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={(e) => onChange(getPct(e))}
      onTouchEnd={(e) => onChange(getPct(e))}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Video progress"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onChange(Math.min(1, progress + 0.05))
        if (e.key === 'ArrowLeft') onChange(Math.max(0, progress - 0.05))
      }}
    >
      <div 
        className="w-full rounded-full bg-white/20 backdrop-blur-sm relative overflow-hidden"
        style={{ 
          height: hovering ? (compact ? '4px' : '6px') : (compact ? '2px' : '4px'), 
          transition: 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/30 transition-all duration-300 ease-out"
          style={{ width: `${buffered * 100}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b5cf6] to-[#c2ef4e]"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#c2ef4e] shadow-[0_0_12px_rgba(194,239,78,0.9)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ 
          left: `${progress * 100}%`, 
          width: compact ? '12px' : '14px', 
          height: compact ? '12px' : '14px' 
        }}
      />
    </div>
  )
})

interface VerticalVolumeControlProps {
  volume: number
  muted: boolean
  setVolume: (v: number) => void
  setMuted: (v: boolean) => void
}

export const VerticalVolumeControl = memo(function VerticalVolumeControl({
  volume,
  muted,
  setVolume,
  setMuted,
}: VerticalVolumeControlProps) {
  return (
    <div className="relative flex items-center justify-center group/vol">
      <div className="absolute bottom-full mb-3 w-10 h-32 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center opacity-0 invisible group-hover/vol:opacity-100 group-hover/vol:visible transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_8px_32px_rgba(0,0,0,0.6)] origin-bottom scale-90 group-hover/vol:scale-100 z-50">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const val = Number(e.target.value)
            setVolume(val)
            if (val > 0 && muted) setMuted(false)
            if (val === 0 && !muted) setMuted(true)
          }}
          aria-label="Volume"
          className="w-24 h-1.5 cursor-pointer accent-[#c2ef4e] bg-white/20 rounded-full appearance-none -rotate-90 hover:accent-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#c2ef4e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        />
      </div>
      <button
        type="button"
        onClick={() => setMuted(!muted)}
        aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
        className="p-2 rounded-full hover:bg-white/20 text-white transition-all duration-200 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        {muted || volume === 0 ? (
          <VolumeOffIcon sx={{ fontSize: 26 }} />
        ) : (
          <VolumeUpIcon sx={{ fontSize: 26 }} />
        )}
      </button>
    </div>
  )
})

export const HorizontalVolumeControl = memo(function HorizontalVolumeControl({
  volume,
  muted,
  setVolume,
  setMuted,
}: VerticalVolumeControlProps) {
  return (
    <div className="relative flex items-center justify-center group/vol">
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-24 h-8 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center opacity-0 invisible group-hover/vol:opacity-100 group-hover/vol:visible transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_8px_32px_rgba(0,0,0,0.6)] origin-bottom scale-90 group-hover/vol:scale-100 z-50 px-3">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const val = Number(e.target.value)
            setVolume(val)
            if (val > 0 && muted) setMuted(false)
            if (val === 0 && !muted) setMuted(true)
          }}
          aria-label="Volume"
          className="w-full h-1.5 cursor-pointer accent-[#c2ef4e] bg-white/20 rounded-full appearance-none hover:accent-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#c2ef4e] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        />
      </div>
      <button
        type="button"
        onClick={() => setMuted(!muted)}
        aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
        className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-[#c2ef4e] active:text-[#c2ef4e] transition-all duration-200 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        {muted || volume === 0 ? (
          <VolumeOffIcon sx={{ fontSize: 22 }} />
        ) : (
          <VolumeUpIcon sx={{ fontSize: 22 }} />
        )}
      </button>
    </div>
  )
})