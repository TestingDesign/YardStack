
import VerifiedIcon from '@mui/icons-material/Verified'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import PodcastVideoPlayerDesktop from './PodcastVideoPlayerDesktop'
import { PODCAST_EPISODES, type PodcastEpisode } from './data'
import { motion, AnimatePresence } from 'framer-motion'

export default function InlineEpisodePlayer({
  activeEpisode,
  setActiveEpisode,
  activeIdx,
}: {
  activeEpisode: PodcastEpisode
  setActiveEpisode: (ep: PodcastEpisode | null) => void
  activeIdx: number
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeEpisode.id}
        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
        animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="col-span-full w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/50 mb-6 flex flex-col md:flex-row overflow-hidden"
      >
        <div className="flex-1 bg-black relative aspect-[16/9] md:aspect-auto md:min-h-[400px]">
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
        
        <div className="w-full md:w-[350px] lg:w-[400px] p-6 flex flex-col justify-between bg-gradient-to-br from-purple-50/30 to-fuchsia-50/20">
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight mb-2">
              {activeEpisode.title}
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
              Learn the latest trends in the real estate market.
            </p>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-purple-100/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white font-bold flex items-center justify-center text-[20px] shadow-md shrink-0 border-2 border-white">
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
          
          <div className="flex items-center gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-lg text-[13px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200 shadow-sm">
              <BookmarkBorderIcon sx={{ fontSize: 18 }} /> Save
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-purple-50 hover:text-purple-700 text-gray-700 rounded-lg text-[13px] font-bold transition-all cursor-pointer border border-gray-200 hover:border-purple-200 shadow-sm">
              <ShareIcon sx={{ fontSize: 18 }} /> Share
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
