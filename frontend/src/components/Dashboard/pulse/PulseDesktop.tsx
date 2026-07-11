import { memo, useState } from 'react'
import PulseRightPane from './PulseRightPane'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { PULSE_FEED, FEED_TYPE_CONFIG } from './data'
import type { PulseItem } from './data'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import InlinePulsePlayer from './InlinePulsePlayer'
import { OpportunityCard } from '../activityBoard/ActivityBoardDesktop'
import { BuilderCard } from '../directory/DirectoryDesktop'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants: Variants = {
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

const FeedCard = memo(function FeedCard({ item }: { item: PulseItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const config = FEED_TYPE_CONFIG[item.type]
  const author = getAuthorInfo(item)

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="bg-white rounded-[4px] mb-2 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-200 relative"
    >
      <div className="flex items-center gap-3 px-4 pt-3 pb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-semibold shrink-0 shadow-sm"
          style={{ background: config.color }}
        >
          {author.initial}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-gray-900 leading-snug truncate">
            <span className="font-semibold hover:underline cursor-pointer">{author.name}</span>
            <span className="text-gray-500 font-normal ml-1.5">{TYPE_ACTION_MAP[item.type]}</span>
          </p>
          <p className="text-[12px] text-gray-500">{author.time}</p>
        </div>
        
        <div className="relative shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors border-none bg-transparent outline-none cursor-pointer flex items-center justify-center text-gray-500"
          >
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-50" onClick={() => setIsMenuOpen(false)} />
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

      <div className="w-full pb-3">
        {item.type === 'spotlight' && (
          <div className="flex flex-col w-full">
            <div 
              className="relative w-full aspect-[4/5] max-h-[600px] bg-black cursor-pointer overflow-hidden group flex items-center justify-center" 
              onClick={() => !isPlaying && setIsPlaying(true)}
            >
              {isPlaying ? (
                <InlinePulsePlayer duration={item.data.duration} />
              ) : (
                <>
                  {item.data.image ? (
                    <img 
                      src={item.data.image} 
                      alt={item.data.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.data.gradient}`} />
                  )}
                  
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-black/70 transition-all duration-300">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 36 }} />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-[4px] text-white text-[12px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm">
                    <PlayCircleFilledWhiteIcon sx={{ fontSize: 14 }} />
                    {item.data.views}
                  </div>
                </>
              )}
            </div>

            <div className="px-4 pt-3">
              <h4 className="text-[15px] font-semibold text-gray-900 leading-normal hover:text-blue-600 transition-colors cursor-pointer">
                {item.data.title}
              </h4>
            </div>
          </div>
        )}

        {item.type === 'expert' && (
          <div className="flex flex-col w-full">
            <div 
              className="relative w-full aspect-[16/9] bg-black cursor-pointer overflow-hidden group flex items-center justify-center" 
              onClick={() => !isPlaying && setIsPlaying(true)}
            >
              {isPlaying ? (
                <InlinePulsePlayer duration={item.data.duration} />
              ) : (
                <>
                  <img 
                    src={item.data.thumbnail} 
                    alt={item.data.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
                  />
                  
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-black/70 transition-all duration-300">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 36 }} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[12px] font-medium px-2 py-0.5 rounded-[4px]">
                    {item.data.duration}
                  </div>
                </>
              )}
            </div>
            
            <div className="px-4 pt-3">
              <h4 className="text-[16px] font-semibold text-gray-900 leading-normal hover:text-blue-600 transition-colors cursor-pointer">
                {item.data.title}
              </h4>
            </div>
          </div>
        )}

        {item.type === 'opportunity' && (
          <div className="px-2 pt-1">
            <OpportunityCard
              item={item.data}
              index={0}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              isEmbedded={true}
            />
          </div>
        )}

        {item.type === 'directory' && (
          <div className="px-2 pt-1">
            <BuilderCard builder={item.data} isEmbedded={true} />
          </div>
        )}
      </div>
    </motion.div>
  )
})

interface PulseDesktopProps {
  isSidebarExpanded?: boolean;
}

export default function PulseDesktop(_props: PulseDesktopProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#F3F2EF] px-12 pt-1 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen relative">
      <div className="max-w-[1128px] mx-auto flex justify-center gap-6 relative z-10">
        <div className="min-w-0 w-full max-w-[576px]">
          <AnimatePresence mode="wait">
            <motion.div
              key="pulse-feed"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {PULSE_FEED.map(item => (
                <FeedCard key={item.id} item={item} />
              ))}

              {PULSE_FEED.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-white rounded-[8px] border border-gray-200 shadow-sm"
                >
                  <AutorenewIcon className="text-gray-400 mb-3" sx={{ fontSize: 40 }} />
                  <h3 className="text-gray-900 text-[16px] font-semibold mb-1">No Updates Available</h3>
                  <p className="text-gray-500 text-[14px]">Check back later for more recent activity.</p>
                </motion.div>
              )}

              {PULSE_FEED.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.4 }}
                  className="text-center py-6"
                >
                  <button className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-300 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm cursor-pointer group">
                    <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-500 text-gray-500" />
                    Load more
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:block w-[300px] shrink-0 relative h-full">
          <div className="sticky top-6">
            <PulseRightPane />
          </div>
        </div>
      </div>
    </main>
  )
}