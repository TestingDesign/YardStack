import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

  return (
    <div className="absolute inset-0 z-[100] bg-white animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-y-auto scrollbar-none">
      <button 
        onClick={() => setActiveEpisode(null)}
        className="absolute top-6 left-6 z-[110] w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-white hover:scale-105 transition-all cursor-pointer"
        aria-label="Close"
      >
        <ArrowBackIcon sx={{ fontSize: 20 }} />
      </button>

      <div className="flex-1 w-full max-w-[1500px] mx-auto p-4 pt-16 md:p-8 lg:p-10 flex flex-col xl:flex-row gap-8 lg:gap-14">
        
        {/* Left Column - Main Player and Details */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="relative w-full bg-black rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[2.2/1] shadow-[0_12px_32px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] shrink-0 group border border-gray-900/50">
            <PodcastVideoPlayerDesktop
              episode={activeEpisode}
              onClose={() => setActiveEpisode(null)}
              onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
              onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
              hasNext={activeIdx < PODCAST_EPISODES.length - 1}
              hasPrev={activeIdx > 0}
              inline
              hideTopOverlay
            />
          </div>
          
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="inline-block w-fit px-3 py-1 bg-purple-100 text-[11px] font-black text-purple-700 tracking-widest rounded-full uppercase">
                Podcast
              </span>
              <h1 className="text-[26px] lg:text-[32px] font-black text-gray-900 leading-tight tracking-tight">
                {activeEpisode.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-6 pb-10 border-b border-gray-100/80">
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
                <button className="flex items-center justify-center gap-2.5 px-6 py-2.5 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-full text-[13px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200">
                  <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
                </button>
                <button className="flex items-center justify-center gap-2.5 px-6 py-2.5 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-full text-[13px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200">
                  <ShareIcon sx={{ fontSize: 18 }} /> Share
                </button>
              </div>
            </div>

            {/* All Real Estate Episodes Section inside the Left Column */}
            <div className="mt-2 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-black text-gray-900">All Real Estate Episodes</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer bg-transparent">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {filteredWithoutTop.slice(0, 8).map((ep, idx) => (
                  <div key={ep.id} className="min-w-[280px] w-[280px] snap-start">
                    <DesktopEpisodeCard episode={ep} onPlay={setActiveEpisode} index={idx} />
                  </div>
                ))}
              </div>
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
