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

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-black text-white flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={video.image}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,transparent_15%,transparent_70%,rgba(0,0,0,0.7)_100%)] pointer-events-none transition-opacity duration-300 ${isDistractionFree ? 'opacity-0' : 'opacity-100'}`} />

      <div className={`relative z-20 flex justify-between items-center px-4 pt-[max(16px,env(safe-area-inset-top))] transition-opacity duration-300 ${isDistractionFree ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white drop-shadow-md backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label="Close video"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} className="ml-1" />
        </button>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-6 transition-opacity duration-300 ${isDistractionFree ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative flex items-center justify-center opacity-70">
          <div className="absolute h-16 w-16 rounded-full border border-white/20 bg-white/10 animate-[pulse_2.8s_ease-in-out_infinite]" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
            <PlayArrowRoundedIcon sx={{ fontSize: 28 }} className="ml-0.5" />
          </div>
        </div>

        {video.link && (
          <div className="pointer-events-auto max-w-[80%] mx-auto w-fit">
            <SpotlightLink linkData={video.link} />
          </div>
        )}
      </div>

      <div className="relative z-20 flex items-end justify-between px-4 pb-6 gap-4">
        <div className={`flex-1 min-w-0 flex flex-col gap-3 transition-opacity duration-300 ${isDistractionFree ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shrink-0">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                <span className="text-[10px] font-bold text-white">{video.authorInitial}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="truncate text-[14px] font-semibold text-white drop-shadow-md">
                {video.author}
              </span>
              {video.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="shrink-0 text-blue-400 drop-shadow-md" />}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-normal leading-[1.3] text-white drop-shadow-md line-clamp-2">
              {video.title}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-5 pb-2">
          <div className={`flex flex-col items-center gap-5 transition-opacity duration-300 ${isDistractionFree ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Share Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Share video"
              >
                <ShareOutlinedIcon sx={{ fontSize: 24 }} className="text-white" />
              </button>
              <span className="text-[12px] font-semibold text-white drop-shadow-md">Share</span>
            </div>

            {/* Save Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => setIsSaved((value) => !value)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Save video"
              >
                <BookmarkBorderIcon
                  sx={{ fontSize: 26 }}
                  className={isSaved ? 'text-white fill-white' : 'text-white'}
                />
              </button>
              <span className="text-[12px] font-semibold text-white drop-shadow-md">Save</span>
            </div>

            {/* More Options Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen((value) => !value)
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform active:scale-90"
                aria-label="More options"
              >
                <MoreVertIcon sx={{ fontSize: 26 }} className="text-white" />
              </button>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsDistractionFree((prev) => !prev)
            }}
            className="flex h-10 w-10 mt-2 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white drop-shadow-md backdrop-blur-md transition-transform active:scale-90"
            aria-label="Toggle distraction free mode"
          >
            {isDistractionFree ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-[9rem] right-16 w-[160px] overflow-hidden rounded-md border border-white/10 bg-neutral-900/95 py-1 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 origin-bottom-right z-30"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium text-white transition-colors hover:bg-white/10"
          >
            <BookmarkBorderIcon sx={{ fontSize: 16 }} />
            Save Video
          </button>
          <div className="mx-2 h-px bg-white/10" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium text-red-400 transition-colors hover:bg-white/10 hover:text-red-300"
          >
            <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} />
            Report
          </button>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-20 transition-opacity duration-300 ${isDistractionFree ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-full w-1/3 bg-white" />
      </div>
    </div>
  )
})

export default ActiveSpotlightMobile