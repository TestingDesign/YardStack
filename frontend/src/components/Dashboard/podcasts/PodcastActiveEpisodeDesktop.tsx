import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VerifiedIcon from '@mui/icons-material/Verified'
import FeaturedListingCard from './FeaturedListingCard'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import { CircularProgress } from '@mui/material'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

const DesktopEpisodeSkeleton = () => (
  <div className="flex flex-col rounded-2xl animate-pulse bg-white p-1 pb-2 shadow-sm border border-gray-100/50">
    <div className="w-full aspect-video rounded-[8px] mb-2.5 bg-gray-200/80" />
    <div className="flex flex-col gap-1.5 px-1.5">
      <div className="h-3.5 bg-gray-200/80 rounded-[4px] w-5/6" />
      <div className="h-3.5 bg-gray-200/80 rounded-[4px] w-2/3" />
      <div className="flex items-center gap-2 mt-1.5">
        <div className="w-5 h-5 rounded-full bg-gray-200/80 shrink-0" />
        <div className="h-3 bg-gray-200/80 rounded-[4px] w-1/2" />
      </div>
      <div className="h-2.5 bg-gray-200/80 rounded-[4px] w-1/3 ml-7 mt-0.5" />
    </div>
  </div>
)

const HorizontalEpisodeSkeleton = () => (
  <div className="relative flex items-start gap-2.5 p-1.5 animate-pulse bg-white/60 rounded-xl">
    <div className="shrink-0 w-[128px] aspect-video rounded-[4px] bg-gray-200/80" />
    <div className="flex-1 min-w-0 pt-0.5 flex flex-col gap-2">
      <div className="h-3.5 bg-gray-200/80 rounded-[4px] w-3/4" />
      <div className="flex items-center gap-2 mt-1">
        <div className="h-3 bg-gray-200/80 rounded-[4px] w-1/2" />
      </div>
      <div className="h-2.5 bg-gray-200/80 rounded-[4px] w-1/3 mt-0.5" />
    </div>
  </div>
)

export default function PodcastActiveEpisodeDesktop({
  activeEpisode,
  setActiveEpisode,
  activeIdx,
  filteredWithoutTop,
  DesktopEpisodeCard,
  HorizontalEpisodeCard
}: {
  activeEpisode: PodcastEpisode
  setActiveEpisode: (ep: PodcastEpisode | null) => void
  activeIdx: number
  filteredWithoutTop: PodcastEpisode[]
  DesktopEpisodeCard: React.FC<any>
  HorizontalEpisodeCard: React.FC<any>
}) {
  const [autoplay, setAutoplay] = useState(true)
  const viewMode = 'grid' as const
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const perPage = 6
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 24)
    }
  }, [])

  useEffect(() => {
    handleScroll()
    const timer = setTimeout(() => handleScroll(), 50)
    window.addEventListener('resize', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleScroll) }
  }, [handleScroll, filteredWithoutTop])

  const scrollRight = () => sliderRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
  const scrollLeft  = () => sliderRef.current?.scrollBy({ left: -280, behavior: 'smooth' })
  
  const displayedCount = page * perPage
  const displayedVideos = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedVideos.length < filteredWithoutTop.length
  
  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPage(p => p + 1)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="absolute inset-0 z-[100] bg-white animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-y-auto scrollbar-none">


      <div className="flex-1 w-full max-w-[1500px] mx-auto p-4 flex flex-col xl:flex-row gap-4 lg:gap-4">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-[16/9] lg:aspect-[2.2/1] shadow-[0_12px_32px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] shrink-0 group border border-gray-900/50">
            <PodcastVideoPlayerDesktop
              episode={activeEpisode}
              onClose={() => setActiveEpisode(null)}
              onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
              onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
              hasNext={activeIdx < PODCAST_EPISODES.length - 1}
              hasPrev={activeIdx > 0}
              inline
            />
          </div>
          
          <div className="mt-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white font-black flex items-center justify-center text-[20px] shadow-md shrink-0 border-2 border-white">
                  {activeEpisode.speaker?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-[16px] font-bold text-gray-900 leading-none tracking-tight">{activeEpisode.speaker}</h3>
                    {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 15 }} className="text-blue-500" />}
                  </div>
                  <p className="text-[13px] text-gray-500 font-medium leading-none">{activeEpisode.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center justify-center gap-2.5 px-2 py-2 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200">
                  <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
                </button>
                <button className="flex items-center justify-center gap-2.5 px-2 py-2 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200">
                  <ShareIcon sx={{ fontSize: 18 }} /> Share
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-black text-gray-900">Up Next</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-gray-500">Autoplay</span>
                  <button 
                    type="button"
                    onClick={() => setAutoplay(v => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 ${
                      autoplay ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                    aria-label="Toggle autoplay"
                  >
                    <span 
                      className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform duration-300 ${
                        autoplay ? 'translate-x-[20px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="relative group/slider w-full mt-1">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollLeft}
                        className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-px-0 snap-x snap-mandatory hide-scrollbar"
                >
                  {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
                    <div key={ep.id} className="min-w-[200px] w-[200px] snap-start relative pt-2 pl-1">
                      <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={idx} />
                    </div>
                  ))}
                </div>

                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 w-10 z-30 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollRight}
                        className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-black text-gray-900">More Episodes</h3>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                  {displayedVideos.map((ep, idx) => (
                    <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                  ))}
                  {isLoading && (
                    <>
                      <DesktopEpisodeSkeleton />
                      <DesktopEpisodeSkeleton />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-1">
                  {displayedVideos.map((ep, idx) => (
                    <HorizontalEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                  ))}
                  {isLoading && (
                    <>
                      <HorizontalEpisodeSkeleton />
                      <HorizontalEpisodeSkeleton />
                      <HorizontalEpisodeSkeleton />
                    </>
                  )}
                </div>
              )}
              
              {hasMore && (
                <div className="mt-2 mb-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={16} sx={{ color: '#7C3AED' }} />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Load More Episodes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="w-full xl:w-[360px] shrink-0 flex flex-col mt-4 xl:mt-0 gap-4">
          <FeaturedListingCard episode={activeEpisode} />
        </div>

      </div>
    </div>
  )
}
