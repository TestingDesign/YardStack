import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PULSE_FEED, FEED_TYPE_CONFIG } from './data'
import type { PulseItem } from './data'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import VerifiedIcon from '@mui/icons-material/Verified'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InlinePulsePlayer from './InlinePulsePlayer'
import { ActivityCard } from '../activityBoard/ActivityBoardMobile'
import { BuilderCardMobile } from '../directory/DirectoryMobile'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 350, damping: 28 }
  }
}

const TYPE_ACTION_MAP = {
  spotlight: 'posted a video',
  expert: 'shared a podcast',
  opportunity: 'posted an opportunity',
  directory: 'joined the directory',
} as const

function getAuthorInfo(item: PulseItem) {
  switch (item.type) {
    case 'spotlight':
      return { name: item.data.author, initial: item.data.authorInitial, time: item.data.timeAgo || 'Recently' }
    case 'expert':
      return { name: item.data.speaker, initial: item.data.speaker[0], time: item.data.timeAgo || 'Recently' }
    case 'opportunity':
      return { name: item.data.company, initial: item.data.company[0], time: item.data.postedAgo || 'Recently' }
    case 'directory':
      return { name: item.data.name, initial: item.data.name[0], time: 'Recently added' }
  }
}

const FeedCardMobile = memo(function FeedCardMobile({ item }: { item: PulseItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)



  const config = FEED_TYPE_CONFIG[item.type]
  const author = getAuthorInfo(item)

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="bg-white rounded-[4px] mb-2 border border-gray-200 shadow-sm relative"
    >
      <div className="flex items-center gap-2 px-3 pt-2 pb-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-medium shadow-sm"
          style={{ background: config.color }}
        >
          {author.initial}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-gray-900 leading-tight truncate">
            <span className="font-medium">{author.name}</span>
            <span className="text-gray-500 font-normal ml-1">{TYPE_ACTION_MAP[item.type]}</span>
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">{author.time}</p>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors border-none bg-transparent outline-none cursor-pointer flex items-center justify-center"
          >
            <MoreVertIcon sx={{ fontSize: 20 }} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-99999" onClick={() => setIsMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-white rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 py-1.5 z-50 overflow-hidden"
                >
                  <button className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors border-none bg-transparent outline-none cursor-pointer">
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} className="text-gray-400" />
                    Save post
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors border-none bg-transparent outline-none cursor-pointer">
                    <ShareIcon sx={{ fontSize: 18 }} className="text-gray-400" />
                    Share via...
                  </button>
                  <div className="h-[1px] bg-gray-100 my-1 mx-2" />
                  <button className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors border-none bg-transparent outline-none cursor-pointer">
                    <span className="w-4 h-4 flex items-center justify-center text-[16px] leading-none mb-0.5">×</span>
                    Hide this post
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={item.type === 'spotlight' || item.type === 'expert' ? "px-3.5 pb-3.5 pt-1" : "px-0 pb-1 pt-0"}>
        {item.type === 'spotlight' && (
          <div className="flex flex-col w-full max-w-[260px] mx-auto mb-1" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[4/5] rounded-[4px] overflow-hidden mb-2.5 bg-gray-900 border border-black/5 shadow-sm active:scale-[0.98] transition-transform duration-300">
              {isPlaying && <InlinePulsePlayer duration={item.data.duration} />}
              {!isPlaying && (
                <>
                  {item.data.image ? (
                    <img src={item.data.image} alt={item.data.title} className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300" />
                  ) : (
                    <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${item.data.gradient} opacity-90`} />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg active:bg-black/40 active:scale-105 transition-all duration-200">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 28 }} />
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 flex items-center z-20">
                    <div className="flex items-center gap-1.5 text-white text-[11px] font-medium tracking-wide drop-shadow-md">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 12 }} />
                      {item.data.views}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-start justify-between px-1">
              <div className="flex flex-col flex-1 pr-2">
                <h4 className="text-[14px] font-medium text-gray-900 leading-snug line-clamp-2 active:text-blue-600 transition-colors">
                  {item.data.title}
                </h4>
                <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-1">
                  <span className="truncate font-medium">{item.data.author || 'Author Name'}</span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {item.type === 'expert' && (
          <div className="relative flex flex-col gap-2.5 mt-1" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[16/9] rounded-[4px] overflow-hidden border border-black/5 bg-gray-900 shadow-sm active:scale-[0.98] transition-transform duration-300">
              {isPlaying && <InlinePulsePlayer duration={item.data.duration} />}
              {!isPlaying && (
                <>
                  <img src={item.data.thumbnail} alt={item.data.title} className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-300" />

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg active:bg-black/40 active:scale-105 transition-all duration-200">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 28 }} />
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-[#3B0764]/90 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-[4px] flex items-center gap-1 shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    {item.data.duration}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col px-1">
              <h4 className="text-[14px] font-medium text-gray-900 leading-snug line-clamp-2 active:text-[#9B51E0] transition-colors">
                {item.data.title}
              </h4>
              <div className="flex flex-col gap-1 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-medium" style={{ background: config.color }}>
                    {item.data.speaker[0]}
                  </div>
                  <span className="text-[12px] text-gray-700 font-medium">{item.data.speaker}</span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500" />}
                </div>
                <p className="text-[11px] text-gray-500 ml-6">{item.data.category} · {item.data.listens} listens</p>
              </div>
            </div>
          </div>
        )}

        {item.type === 'opportunity' && (
          <div className="mt-1">
            <ActivityCard
              item={item.data}
              index={0}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              isEmbedded={true}
            />
          </div>
        )}

        {item.type === 'directory' && (
          <div className="mt-1">
            <BuilderCardMobile builder={item.data} isEmbedded={true} />
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default function PulseMobile() {
  return (
    <main className="flex-1 w-full h-full overflow-y-auto bg-[#F8F9FA] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-300/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[250px] h-[250px] bg-blue-300/10 rounded-full blur-[50px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div className="py-3.5 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="pulse-feed"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex flex-col"
          >
            {PULSE_FEED.map(item => (
              <FeedCardMobile key={item.id} item={item} />
            ))}

            {PULSE_FEED.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-white rounded-[8px] border border-gray-200 shadow-sm"
              >
                <AutorenewIcon className="text-gray-300 mb-2" sx={{ fontSize: 32 }} />
                <h3 className="text-gray-900 text-[14px] font-medium mb-1">No Updates Available</h3>
                <p className="text-gray-500 text-[12px]">Check back later for more activity.</p>
              </motion.div>
            )}

            {PULSE_FEED.length > 0 && (
              <div className="text-center pt-2 pb-4">
                <button className="flex items-center gap-1.5 mx-auto px-5 py-2.5 rounded-[4px] bg-white border border-[#9B51E0] text-[13px] font-medium text-[#9B51E0] active:bg-[#F9F5FF] transition-all shadow-sm">
                  <AutorenewIcon sx={{ fontSize: 16 }} />
                  Load More Updates
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}