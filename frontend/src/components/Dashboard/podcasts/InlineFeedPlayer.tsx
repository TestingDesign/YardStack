import { useState, useEffect, useRef } from 'react'
import type { PodcastEpisode } from './data'
import { parseDuration, ProgressBar } from './PodcastVideoPlayerShared'


export default function InlineFeedPlayer({ episode }: { episode: PodcastEpisode }) {
  const [progress, setProgress] = useState(0)
  const totalDuration = parseDuration(episode.duration) || 120
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (totalDuration > 0) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 1) {
            clearInterval(interval)
            return 1
          }
          return p + (1 / totalDuration)
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [totalDuration])

  const handleSeek = (pct: number) => {
    if (!videoRef.current) return
    const newTime = pct * (videoRef.current.duration || 1)
    videoRef.current.currentTime = newTime
    setProgress(pct)
  }

  return (
    <div className="absolute inset-0 bg-black z-20 border border-white/20 box-border pointer-events-auto rounded-[inherit]">
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
      
      <button 
        className="absolute top-0 right-0 p-2 z-20 outline-none tap-highlight-transparent"
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <div className="w-6 h-6 rounded bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors shadow-sm">
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </div>
      </button>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-1 pb-0.5">
        <div onClick={e => e.stopPropagation()}>
          <ProgressBar progress={progress} buffered={0} onChange={handleSeek} compact />
        </div>
      </div>
    </div>
  )
}
