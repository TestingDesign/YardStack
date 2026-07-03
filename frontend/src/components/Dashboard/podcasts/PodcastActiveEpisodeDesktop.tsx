import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import { LayoutGrid, List } from 'lucide-react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

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
  const perPage = 6
  
  const displayedCount = page * perPage
  const displayedVideos = filteredWithoutTop.slice(0, displayedCount)
  const hasMore = displayedVideos.length < filteredWithoutTop.length
  
  const handleLoadMore = () => setPage(p => p + 1)

  return (
    <div className="absolute inset-0 z-[100] bg-white animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-y-auto scrollbar-none">


      <div className="flex-1 w-full max-w-[1500px] mx-auto p-4 flex flex-col xl:flex-row gap-4 lg:gap-4">
        
        {/* Left Column - Main Player and Details */}
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
            
            <div className="flex flex-wrap items-center justify-between gap-6 pb-4">
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

            {/* All Real Estate Episodes Section inside the Left Column */}
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-black text-gray-900">All Real Estate Episodes</h3>
                <div className="flex items-center bg-gray-100/80 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 cursor-pointer border-none ${viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 cursor-pointer border-none ${viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 bg-transparent hover:text-gray-600'}`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-4 pt-1">
                  {displayedVideos.map((ep, idx) => (
                    <DesktopEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-1">
                  {displayedVideos.map((ep, idx) => (
                    <HorizontalEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
                  ))}
                </div>
              )}
              
              {hasMore && (
                <div className="mt-2 mb-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="group flex items-center gap-2 px-7 py-2.5 rounded-lg bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Load More Episodes
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column - Up Next Sidebar */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col mt-4 xl:mt-0">
          <div className="flex items-center justify-between mb-5 px-2">
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
          <div className="flex flex-col gap-2">
            {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
              <HorizontalEpisodeCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
