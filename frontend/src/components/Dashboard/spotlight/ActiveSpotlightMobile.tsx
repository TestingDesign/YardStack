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
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

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
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-black/40 hover:scale-110 active:scale-90"
          aria-label="Close video"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} className="ml-1" />
        </button>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-4 transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
        <div className="relative flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100">
          <div className="absolute h-14 w-14 rounded-full border border-white/30 bg-white/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <PlayArrowRoundedIcon sx={{ fontSize: 24 }} className="ml-0.5" />
          </div>
        </div>
        {video.link && (
          <div className="pointer-events-auto max-w-[75%] mx-auto w-fit scale-90 origin-center transition-transform duration-300 hover:scale-95">
            <SpotlightLink linkData={video.link} />
          </div>
        )}
      </div>

      <div className="relative z-20 flex items-end justify-between px-4 pb-3 gap-3">
        
        <div className={`flex-1 min-w-0 flex flex-col gap-2.5 transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center gap-2 group cursor-pointer w-fit">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shrink-0 transition-transform duration-300 group-hover:scale-110">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-[9px] font-bold text-white">{video.authorInitial}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <span className="truncate text-[13px] font-semibold text-white drop-shadow-lg transition-colors group-hover:text-white/90">
                {video.author}
              </span>
              {video.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="shrink-0 text-blue-400 drop-shadow-md" />}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[12px] font-normal leading-[1.4] text-white/95 drop-shadow-lg line-clamp-2">
              {video.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 pb-1">
          <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${isDistractionFree ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => e.stopPropagation()}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition-all duration-300 hover:bg-black/50 active:scale-75"
                aria-label="Share video"
              >
                <ShareOutlinedIcon sx={{ fontSize: 18 }} className="text-white transition-transform group-hover:scale-110" />
              </button>
              <span className="text-[10px] font-medium text-white/90 drop-shadow-md">Share</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSaved((value) => !value)
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition-all duration-300 hover:bg-black/50 active:scale-75"
                aria-label="Save video"
              >
                <BookmarkBorderIcon
                  sx={{ fontSize: 20 }}
                  className={`transition-all duration-300 ${isSaved ? 'text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-110' : 'text-white group-hover:scale-110'}`}
                />
              </button>
              <span className="text-[10px] font-medium text-white/90 drop-shadow-md">Save</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen((value) => !value)
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition-all duration-300 hover:bg-black/50 active:scale-75"
                aria-label="More options"
              >
                <MoreVertIcon sx={{ fontSize: 20 }} className="text-white transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsDistractionFree((prev) => !prev)
            }}
            className={`flex h-8 w-8 mt-2 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white drop-shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-75 ${isDistractionFree ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
            aria-label="Toggle distraction free mode"
          >
            {isDistractionFree ? <FullscreenExitIcon sx={{ fontSize: 16 }} /> : <FullscreenIcon sx={{ fontSize: 16 }} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-[6.5rem] right-14 w-[140px] overflow-hidden rounded-xl border border-white/10 bg-neutral-900/95 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom-right z-30"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[12px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <BookmarkBorderIcon sx={{ fontSize: 16 }} />
            Save Video
          </button>
          <div className="mx-2 my-0.5 h-[1px] bg-white/10" />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[12px] font-medium text-red-400/90 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} />
            Report
          </button>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 transition-opacity duration-500 ${isDistractionFree ? 'opacity-0' : 'opacity-100'}`}>
        <div 
          className="h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-r-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  )
})

export default ActiveSpotlightMobile