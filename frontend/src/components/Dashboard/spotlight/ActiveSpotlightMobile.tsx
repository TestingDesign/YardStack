import { useState, useRef, useEffect, memo } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import type { SpotlightVideo } from './data'
import SpotlightLink from './SpotlightLink'

const ActiveSpotlightMobile = memo(function ActiveSpotlightMobile({ 
  video, 
  onClose
}: { 
  video: SpotlightVideo 
  onClose: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const primaryLabel = video.tag ?? 'Spotlight'
  const supportingLabel = video.timeAgo ?? video.link?.subtitle ?? video.author
  const detailsLabel = video.link
    ? [video.link.detail1, video.link.detail2].filter(Boolean).join(' • ')
    : video.views

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f4eee8] text-white @container/player">
      <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} opacity-30`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95)_0%,_rgba(248,245,240,0.94)_30%,_rgba(234,227,219,0.88)_68%,_rgba(226,220,214,0.96)_100%)]" />
      <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/18 blur-3xl" />
      <div className="absolute -top-12 right-[-3rem] h-72 w-72 rounded-full bg-amber-300/18 blur-3xl" />
      <div className="absolute bottom-[-5rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/14 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.14] mix-blend-screen" />

      <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3 pb-3">
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-white/70 text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Close video"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 15 }} />
          </button>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              Active Spotlight
            </div>
            <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-bold text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              {video.duration}
            </div>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 flex items-center justify-center py-2">
          <div className="relative w-full max-w-[360px]">
            <div className="absolute left-[-10%] top-[8%] h-[84%] w-[62%] rotate-[-9deg] rounded-[28px] border border-white/45 bg-white/30 shadow-[0_16px_44px_rgba(15,23,42,0.10)] blur-[0.2px] opacity-60" />
            <div className="absolute right-[-10%] top-[10%] h-[80%] w-[62%] rotate-[9deg] rounded-[28px] border border-white/45 bg-white/30 shadow-[0_16px_44px_rgba(15,23,42,0.10)] blur-[0.2px] opacity-60" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/60 bg-neutral-950 shadow-[0_28px_90px_rgba(17,24,39,0.38)] aspect-[9/16]">
              <div className={`absolute inset-0 bg-gradient-to-b ${video.gradient} opacity-95`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.24),transparent_36%),linear-gradient(to_bottom,rgba(15,23,42,0.08),rgba(0,0,0,0.74))]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_32%,transparent_68%,rgba(255,255,255,0.06)_100%)] opacity-70" />

              <div className="absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-3">
                <div className="max-w-[74%]">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/14 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                    {primaryLabel}
                  </div>
                  <h2 className="text-[clamp(24px,6.6vw,32px)] font-black leading-[0.94] tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
                    {video.title}
                  </h2>
                  <p className="mt-2 text-[12px] font-medium text-white/82 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
                    {supportingLabel}
                  </p>
                </div>

                {video.logoText && (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-white/18 bg-black/26 p-2 text-center shadow-[0_12px_34px_rgba(0,0,0,0.24)] backdrop-blur-md">
                    <span className="whitespace-pre-line text-[10px] font-black leading-tight tracking-[0.22em] text-white/92">
                      {video.logoText}
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-20 w-20 rounded-full border border-white/30 bg-white/10 animate-[pulse_2.8s_ease-in-out_infinite]" />
                  <div className="absolute h-24 w-24 rounded-full border border-white/15 bg-white/5 animate-[pulse_3.4s_ease-in-out_infinite]" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_12px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    <PlayArrowRoundedIcon sx={{ fontSize: 36 }} className="ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-20 space-y-3">
                {video.link && (
                  <div className="@container">
                    <SpotlightLink linkData={video.link} />
                  </div>
                )}

                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-white/75">
                      <span>{video.views} views</span>
                      <span className="text-white/35">•</span>
                      <span>{detailsLabel}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[1.5px] shadow-[0_8px_24px_rgba(0,0,0,0.24)] flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                          <span className="text-[11px] font-bold text-white">{video.authorInitial}</span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="truncate text-[13px] font-black text-white drop-shadow-md">
                            {video.author}
                          </span>
                          {video.verified && <VerifiedIcon sx={{ fontSize: 13 }} className="shrink-0 text-[#93c5fd] drop-shadow-md" />}
                        </div>
                        <p className="mt-0.5 truncate text-[11px] font-medium text-white/68">
                          {video.link?.subtitle ?? 'Spotlight feature'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="rounded-full border border-white/18 bg-black/24 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/88 backdrop-blur-md">
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsLiked((value) => !value)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${isLiked ? 'border-red-300/40 bg-red-500/20 text-red-100' : 'border-white/16 bg-black/24 text-white/88'}`}
                        aria-label="Like video"
                      >
                        {isLiked ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                      </button>
                      <button
                        onClick={() => setIsSaved((value) => !value)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${isSaved ? 'border-amber-200/40 bg-amber-300/20 text-amber-50' : 'border-white/16 bg-black/24 text-white/88'}`}
                        aria-label="Save video"
                      >
                        <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                      </button>
                      <button
                        onClick={() => setIsMenuOpen((value) => !value)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${isMenuOpen ? 'border-white/30 bg-white/20 text-white' : 'border-white/16 bg-black/24 text-white/88'}`}
                        aria-label="More options"
                      >
                        <MoreVertIcon sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute bottom-[4.75rem] right-4 w-[clamp(156px,42vw,192px)] overflow-hidden rounded-2xl border border-white/12 bg-[#1a1a1a]/95 py-1 shadow-[0_16px_44px_rgba(0,0,0,0.38)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 origin-bottom-right z-30"
                >
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 border-none bg-transparent px-3.5 py-2.5 text-left text-[12px] font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 15 }} />
                    Save
                  </button>
                  <div className="mx-2 h-px bg-white/10" />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 border-none bg-transparent px-3.5 py-2.5 text-left text-[12px] font-medium text-red-300 transition-colors hover:bg-white/8 hover:text-red-200"
                  >
                    <ReportProblemOutlinedIcon sx={{ fontSize: 15 }} />
                    Report
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-20">
                <div className="h-full w-1/3 rounded-r-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ActiveSpotlightMobile
