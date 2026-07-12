import React, { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { CircularProgress } from '@mui/material'

import PodcastVideoPlayerMobile from './PodcastVideoPlayerMobile'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import { motion } from 'framer-motion'
import FeaturedListingCardMobile from './FeaturedListingCardMobile'

type EpisodeCardProps = {
  episode: PodcastEpisode
  onPlay: (ep: PodcastEpisode) => void
  index?: number
}

const MobileEpisodeGridSkeleton = () => (
  <div className="flex flex-col group rounded-[4px] animate-pulse bg-white p-1 shadow-[0_3px_12px_rgba(0,0,0,0.05)] border border-gray-100/50">
    <div className="relative w-full aspect-video rounded-[4px] mb-2 bg-gray-200/80" />
    <div className="px-0.5 pt-1">
      <div className="h-3 bg-gray-200/80 rounded-[2px] w-full mb-1.5" />
      <div className="h-3 bg-gray-200/80 rounded-[2px] w-3/4 mb-1.5" />
      <div className="flex items-center gap-1.5 mt-1">
        <div className="w-3.5 h-3.5 rounded-full bg-gray-200/80 shrink-0" />
        <div className="h-2.5 bg-gray-200/80 rounded-[2px] w-1/2" />
      </div>
    </div>
  </div>
)

const MobileEpisodeListSkeleton = () => (
  <div className="flex items-start gap-2 py-2 px-2 -mx-2 rounded-[4px] animate-pulse">
    <div className="w-[155px] aspect-[16/10] rounded-[4px] bg-gray-200/80 shrink-0" />
    <div className="flex-1 min-w-0 pr-1 py-1 flex flex-col gap-1.5">
      <div className="h-3.5 bg-gray-200/80 rounded-[2px] w-full" />
      <div className="h-3.5 bg-gray-200/80 rounded-[2px] w-2/3" />
      <div className="flex items-center gap-1.5 mt-1">
        <div className="w-5 h-5 rounded-full bg-gray-200/80 shrink-0" />
        <div className="h-3 bg-gray-200/80 rounded-[2px] w-1/2" />
      </div>
    </div>
  </div>
)

export default function PodcastActiveEpisodeMobile({
  activeEpisode,
  setActiveEpisode,
  activeIdx,
  filteredWithoutTop,
  EpisodeListCard,
  EpisodeGridCard
}: {
  activeEpisode: PodcastEpisode
  setActiveEpisode: (ep: PodcastEpisode | null) => void
  activeIdx: number
  filteredWithoutTop: PodcastEpisode[]
  EpisodeListCard: React.ComponentType<EpisodeCardProps>
  EpisodeGridCard: React.ComponentType<EpisodeCardProps>
}) {
  const [autoplay, setAutoplay] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const perPage = 6

  const displayedCount = page * perPage
  const displayedForGrid = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedForGrid.length < filteredWithoutTop.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPage(p => p + 1)
      setIsLoading(false)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, type: "spring", damping: 25, stiffness: 350 }}
      className="relative w-full flex-1 bg-[#FDFDFD] flex flex-col z-10"
    >
      <div className="relative w-full bg-black shrink-0 aspect-[16/9] lg:aspect-[2.2/1] z-20 shadow-sm">
        <PodcastVideoPlayerMobile
          episode={activeEpisode}
          onClose={() => setActiveEpisode(null)}
          onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
          onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
          hasNext={activeIdx < PODCAST_EPISODES.length - 1}
          hasPrev={activeIdx > 0}
        />
      </div>

      <div className="px-3 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white font-medium flex items-center justify-center text-[16px] shadow-sm shrink-0 border border-white">
              {activeEpisode.speaker?.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-[14px] font-medium text-gray-900 leading-none tracking-tight truncate">
                  {activeEpisode.speaker}
                </h3>
                {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />}
              </div>
              <p className="text-[12px] text-gray-500 font-medium leading-none truncate">{activeEpisode.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-[4px] text-[12px] font-medium border border-gray-200 shadow-sm transition-colors cursor-pointer">
              <BookmarkBorderIcon sx={{ fontSize: 15 }} /> Save
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-[4px] text-[12px] font-medium border border-gray-200 shadow-sm transition-colors cursor-pointer">
              <ShareIcon sx={{ fontSize: 15 }} /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 py-2">
        <FeaturedListingCardMobile episode={activeEpisode} />
      </div>

      <div className="px-2 pt-2 flex flex-col gap-2 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between mb-1 px-1">
          <h3 className="text-[15px] font-medium text-gray-900">Up Next</h3>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-gray-500">Autoplay</span>
            <button
              type="button"
              onClick={() => setAutoplay(v => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 outline-none border-none cursor-pointer shadow-inner ${
                autoplay ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500' : 'bg-gray-200'
              }`}
              aria-label="Toggle autoplay"
            >
              <span
                className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  autoplay ? 'translate-x-[16px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pb-2">
          {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
            <EpisodeListCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
          ))}
        </div>
      </div>

      <div className="px-2 py-2 flex flex-col gap-4 pb-4 pt-3 bg-white mt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[16px] font-medium text-gray-900">All Real Estate Episodes</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-[4px] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[2px] transition-all duration-150 cursor-pointer border-none ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={13} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-[2px] transition-all duration-150 cursor-pointer border-none ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'
                }`}
                aria-label="List view"
              >
                <List size={13} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3 pb-4 pt-1">
            {displayedForGrid.map((ep, idx) => (
              <EpisodeGridCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
            ))}
            {isLoading && (
              <>
                <MobileEpisodeGridSkeleton />
                <MobileEpisodeGridSkeleton />
                <MobileEpisodeGridSkeleton />
                <MobileEpisodeGridSkeleton />
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-2">
            {displayedForGrid.map((ep, idx) => (
              <EpisodeListCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
            ))}
            {isLoading && (
              <>
                <MobileEpisodeListSkeleton />
                <MobileEpisodeListSkeleton />
                <MobileEpisodeListSkeleton />
              </>
            )}
          </div>
        )}

        {hasMore && (
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-medium text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-500 hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={14} sx={{ color: 'inherit' }} />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <AutorenewIcon sx={{ fontSize: 14 }} className="group-hover:rotate-180 transition-transform duration-300" />
                  Load More Episodes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}