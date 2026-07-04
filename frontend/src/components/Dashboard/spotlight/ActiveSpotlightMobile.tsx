import { useState, useRef, useEffect, memo } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const ActiveSpotlightMobile = memo(function ActiveSpotlightMobile({
  video,
  onClose,
  onSwipeUp,
  onSwipeDown
}: {
  video: SpotlightVideo
  onClose: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isDistractionFree, setIsDistractionFree] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [clickAnim, setClickAnim] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.15))
    }, 16)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY
    const minSwipeDistance = 50

    if (deltaY > minSwipeDistance && onSwipeUp) {
      onSwipeUp()
    } else if (deltaY < -minSwipeDistance && onSwipeDown) {
      onSwipeDown()
    }
    touchStartY.current = null
  }

  const handleScreenTap = () => {
    if (isDistractionFree) {
      setIsDistractionFree(false)
    } else {
      setIsPlaying((prev) => !prev)
      setClickAnim(true)
      setTimeout(() => setClickAnim(false), 400)
    }
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-black text-white flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleScreenTap}
    >
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-0">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      )}
  
      <img
        src={video.image}
        alt={video.title}
        onLoad={() => setIsImageLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,transparent_15%,transparent_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none transition-opacity duration-500 ${isDistractionFree ? 'opacity-0' : 'opacity-100'}`} />
      
      <div className={`relative z-20 flex justify-between items-center px-4 pt-[max(12px,env(safe-area-inset-top))] transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-black/40 hover:scale-110 active:scale-90 border border-white/10"
          aria-label="Close video"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} className="ml-1" />
        </button>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
        <div className={`transition-all duration-300 ${!isPlaying ? 'opacity-100 backdrop-blur-sm bg-black/20 rounded-full p-2' : 'opacity-0'}`}>
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-white/10 rounded-full animate-ping" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300">
              <PlayArrowRoundedIcon sx={{ fontSize: 32 }} className="ml-0.5 drop-shadow-xl" />
            </div>
          </div>
        </div>

        {clickAnim && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-16 h-16 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 animate-in zoom-in-50 fade-out duration-300 fill-mode-forwards">
              <PlayArrowRoundedIcon sx={{ fontSize: 36 }} className="drop-shadow-2xl ml-1" />
            </div>
          </div>
        )}

        {video.link && (
          <div className="pointer-events-auto max-w-[75%] mx-auto w-fit scale-90 origin-center transition-transform duration-300 hover:scale-95 mt-4">
            <SpotlightLink linkData={video.link} />
          </div>
        )}
      </div>

      <div className="relative z-20 flex items-end justify-between px-4 pb-4 gap-3">
        
        <div className={`flex-1 min-w-0 flex flex-col gap-3 transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center gap-3 group cursor-pointer w-fit">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-[11px] font-bold text-white tracking-wider">{video.authorInitial}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="truncate text-[14px] font-semibold text-white drop-shadow-lg transition-colors group-hover:text-pink-100">
                  {video.author}
                </span>
                {video.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="shrink-0 text-blue-400 drop-shadow-md" />}
              </div>
              <span className="text-white/70 text-[11px] font-medium drop-shadow-md mt-0.5">
                {video.views} views
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-medium leading-[1.4] text-white/95 drop-shadow-lg line-clamp-2">
              {video.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 pb-1">
          <div className={`flex flex-col items-center gap-3.5 transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => e.stopPropagation()}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/60 active:scale-90 border border-white/10"
                aria-label="Share video"
              >
                <ShareOutlinedIcon sx={{ fontSize: 20 }} className="text-white transition-transform group-hover:scale-110" />
              </button>
              <span className="text-[11px] font-semibold text-white/90 drop-shadow-md">Share</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSaved((value) => !value)
                }}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/60 active:scale-90 border border-white/10"
                aria-label="Save video"
              >
                <BookmarkBorderIcon
                  sx={{ fontSize: 22 }}
                  className={`transition-all duration-300 ${isSaved ? 'text-white fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110' : 'text-white group-hover:scale-110'}`}
                />
              </button>
              <span className="text-[11px] font-semibold text-white/90 drop-shadow-md">Save</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen((value) => !value)
                }}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/60 active:scale-90 border border-white/10"
                aria-label="More options"
              >
                <MoreVertIcon sx={{ fontSize: 22 }} className="text-white transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsDistractionFree((prev) => !prev)
            }}
            className={`flex h-8 w-8 mt-2 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-90 ${isDistractionFree ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Toggle distraction free mode"
          >
            {isDistractionFree ? <FullscreenExitIcon sx={{ fontSize: 16 }} /> : <FullscreenIcon sx={{ fontSize: 16 }} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-[7rem] right-14 w-[150px] overflow-hidden rounded-xl border border-white/10 bg-neutral-900/95 py-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom-right z-30"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <BookmarkBorderIcon sx={{ fontSize: 18 }} />
            Save Video
          </button>
          <div className="mx-3 my-0.5 h-[1px] bg-white/10" />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(false)
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium text-red-400/90 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <ReportProblemOutlinedIcon sx={{ fontSize: 18 }} />
            Report
          </button>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden transition-opacity duration-500 ${isDistractionFree ? 'opacity-0' : 'opacity-100'}`}>
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 relative transition-all ease-linear"
          style={{ width: `${progress}%`, transitionDuration: isPlaying ? '16ms' : '0ms' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] translate-x-1/2" />
        </div>
      </div>
    </div>
  )
})

export default ActiveSpotlightMobile