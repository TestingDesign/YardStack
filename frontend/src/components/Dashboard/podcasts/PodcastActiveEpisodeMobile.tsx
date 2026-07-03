import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'

import PodcastVideoPlayerMobile from './PodcastVideoPlayerMobile'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'

export default function PodcastActiveEpisodeMobile({
  activeEpisode,
  setActiveEpisode,
  activeIdx,
  filteredWithoutTop,
  displayedEpisodes,
  EpisodeListCard,
  EpisodeGridCard
}: {
  activeEpisode: PodcastEpisode
  setActiveEpisode: (ep: PodcastEpisode | null) => void
  activeIdx: number
  filteredWithoutTop: PodcastEpisode[]
  displayedEpisodes: PodcastEpisode[]
  EpisodeListCard: React.FC<any>
  EpisodeGridCard: React.FC<any>
}) {
  const [autoplay, setAutoplay] = useState(true)

  return (
    <div className="absolute inset-0 z-[100] bg-white animate-in slide-in-from-bottom-full duration-300 flex flex-col overflow-y-auto scrollbar-none">
      <button 
        onClick={() => setActiveEpisode(null)}
        className="absolute top-4 left-4 z-[110] w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-white transition-all cursor-pointer"
        aria-label="Close"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="w-full bg-black shrink-0 aspect-[16/9] lg:aspect-[2.2/1]">
        <PodcastVideoPlayerMobile
          episode={activeEpisode}
          onClose={() => setActiveEpisode(null)}
          onNext={() => setActiveEpisode(activeIdx < PODCAST_EPISODES.length - 1 ? PODCAST_EPISODES[activeIdx + 1] : null)}
          onPrev={() => setActiveEpisode(activeIdx > 0 ? PODCAST_EPISODES[activeIdx - 1] : null)}
          hasNext={activeIdx < PODCAST_EPISODES.length - 1}
          hasPrev={activeIdx > 0}
          hideTopOverlay
        />
      </div>
      
      <div className="px-5 pt-6 pb-8 flex flex-col gap-4 border-b border-gray-100/80">
        <div className="flex flex-col gap-3">
          <span className="inline-block w-fit px-3 py-1 bg-purple-100 text-[10px] font-black text-purple-700 tracking-widest rounded-full uppercase">
            Podcast
          </span>
          <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">{activeEpisode.title}</h1>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white font-bold flex items-center justify-center text-[18px] shadow-sm shrink-0 border-2 border-white">
              {activeEpisode.speaker?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-[15px] font-bold text-gray-900 leading-none tracking-tight">{activeEpisode.speaker}</h3>
                {activeEpisode.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />}
              </div>
              <p className="text-[12px] text-gray-500 font-medium leading-none">{activeEpisode.role}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-xl text-[13px] font-bold border border-gray-200 transition-colors">
            <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50/80 hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-xl text-[13px] font-bold border border-gray-200 transition-colors">
            <ShareIcon sx={{ fontSize: 18 }} /> Share
          </button>
        </div>
      </div>

      <div className="px-5 py-8 flex flex-col gap-5 border-b border-gray-100/80">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[18px] font-black text-gray-900">Up Next</h3>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-gray-500">Autoplay</span>
            <button 
              type="button"
              onClick={() => setAutoplay(v => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 outline-none ${
                autoplay ? 'bg-purple-600' : 'bg-gray-200'
              }`}
              aria-label="Toggle autoplay"
            >
              <span 
                className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-300 ${
                  autoplay ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {filteredWithoutTop.slice(0, 10).map((ep, idx) => (
            <EpisodeListCard key={ep.id} episode={ep} onPlay={setActiveEpisode} index={idx} />
          ))}
        </div>
      </div>

      <div className="px-5 py-8 flex flex-col gap-5 pb-16">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-black text-gray-900">All Real Estate Episodes</h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {displayedEpisodes.slice(0, 10).map((ep, idx) => (
            <div key={ep.id} className="min-w-[240px] w-[240px] snap-start">
              <EpisodeGridCard episode={ep} onPlay={setActiveEpisode} index={idx} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
