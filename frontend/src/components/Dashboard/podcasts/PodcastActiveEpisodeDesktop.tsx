import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react'
import VerifiedIcon from '@mui/icons-material/Verified'
import FeaturedListingCard from './FeaturedListingCard'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import { CircularProgress } from '@mui/material'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import { motion } from 'framer-motion'

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
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
    }, 300)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[100] bg-[#f8f9fa] flex flex-col overflow-y-auto scrollbar-none"
    >
      <div className="w-full max-w-[1400px] p-4 md:p-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="relative w-full bg-black rounded-[8px] overflow-hidden aspect-[16/9] shadow-lg border border-gray-900/50">
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
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d354ff] text-white font-medium flex items-center justify-center text-[22px] shadow-sm shrink-0">
              {activeEpisode.speaker?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-[18px] font-bold text-gray-900 leading-none tracking-tight">{activeEpisode.speaker}</h3>
                {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500" />}
              </div>
              <p className="text-[14px] text-gray-500 font-medium leading-none">{activeEpisode.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-[14px] font-medium transition-colors cursor-pointer border border-gray-200 shadow-sm">
              <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-[14px] font-medium transition-colors cursor-pointer border border-gray-200 shadow-sm">
              <ShareIcon sx={{ fontSize: 18 }} /> Share
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-gray-900">Up Next</h3>
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
              <h3 className="text-[18px] font-semibold text-gray-900">All Real Estate Episodes</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-md p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-sm transition-all duration-200 cursor-pointer border-none ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-all duration-200 cursor-pointer border-none ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                    }`}
                    aria-label="List view"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
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
                  className="group flex items-center justify-center gap-2 w-full max-w-[200px] py-2.5 rounded-md bg-white border border-gray-200 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={16} sx={{ color: '#6B7280' }} />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      Load More
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[320px] shrink-0 flex flex-col mt-4 lg:mt-0 gap-4 sticky top-4 self-start">
        <FeaturedListingCard episode={activeEpisode} />
      </div>
      </div>
    </motion.div>
  )
}
