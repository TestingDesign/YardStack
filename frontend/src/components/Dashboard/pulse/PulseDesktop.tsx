import { memo, useState } from 'react'
import PulseRightPane from './PulseRightPane'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { PULSE_FEED, FEED_TYPE_CONFIG } from './data'
import type { PulseItem } from './data'

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import VerifiedIcon from '@mui/icons-material/Verified'
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
      whileHover={{ y: -2 }}
      className="bg-white rounded-[4px] mb-3 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-purple-100/50 transition-all duration-500 group/card relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[4px]" />
      <div className="flex items-center gap-2 px-4 pt-2 pb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-medium shadow-sm"
          style={{ background: config.color }}
        >
          {author.initial}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-gray-900 leading-tight truncate">
            <span className="font-medium">{author.name}</span>
            <span className="text-gray-500 font-normal ml-1.5">{TYPE_ACTION_MAP[item.type]}</span>
          </p>
          <p className="text-[12px] text-gray-500 mt-0.5">{author.time}</p>
        </div>
        
        <div className="relative shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors border-none bg-transparent outline-none cursor-pointer flex items-center justify-center"
          >
            <MoreVertIcon sx={{ fontSize: 20 }} className="text-gray-400 group-hover/card:text-gray-500" />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-9999" onClick={() => setIsMenuOpen(false)} />
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

      <div className={item.type === 'spotlight' || item.type === 'expert' ? "px-4 pb-4 pt-2" : "px-0 pb-2 pt-0"}>
        {item.type === 'spotlight' && (
          <div className="flex flex-col cursor-pointer group w-full max-w-[280px] mx-auto mb-2" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[4/5] rounded-[4px] overflow-hidden mb-3 bg-gray-900 border border-black/5 shadow-sm group-hover:shadow-md transition-all duration-500">
              {isPlaying && <InlinePulsePlayer duration={item.data.duration} />}
              {!isPlaying && (
                <>
                  {item.data.image ? (
                    <img src={item.data.image} alt={item.data.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out" />
                  ) : (
                    <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${item.data.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 32 }} />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center z-20">
                    <div className="flex items-center gap-1.5 text-white text-[12px] font-medium tracking-wide drop-shadow-md">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 14 }} />
                      {item.data.views}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-start justify-between px-1">
              <div className="flex flex-col flex-1 pr-3">
                <h4 className="text-[15px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.data.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mt-1.5">
                  <span className="truncate font-medium">{item.data.author || 'Author Name'}</span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />}
                </div>
              </div>
              <MoreVertIcon sx={{ fontSize: 18 }} className="text-gray-400 mt-0.5 shrink-0 hover:text-gray-700" />
            </div>
          </div>
        )}

        {item.type === 'expert' && (
          <div className="relative flex flex-col gap-3 cursor-pointer group mt-1" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[16/9] rounded-[4px] overflow-hidden border border-black/5 bg-gray-900 shadow-sm group-hover:shadow-md transition-all duration-500">
              {isPlaying && <InlinePulsePlayer duration={item.data.duration} />}
              {!isPlaying && (
                <>
                  <img src={item.data.thumbnail} alt={item.data.title} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out" />
                  
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                      <PlayCircleFilledWhiteIcon sx={{ fontSize: 32 }} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 bg-[#3B0764]/90 backdrop-blur-sm text-white text-[12px] font-medium px-2.5 py-1 rounded-[4px] flex items-center gap-1.5 shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    {item.data.duration}
                  </div>
                </>
              )}
            </div>
            
            <div className="flex flex-col px-1">
              <h4 className="text-[16px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9B51E0] transition-colors duration-300">
                {item.data.title}
              </h4>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium" style={{ background: config.color }}>
                    {item.data.speaker[0]}
                  </div>
                  <span className="text-[13px] text-gray-700 font-medium">{item.data.speaker}</span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />}
                </div>
                <p className="text-[12px] text-gray-500 ml-8">{item.data.category} · {item.data.listens} listens</p>
              </div>
            </div>
          </div>
        )}

        {item.type === 'opportunity' && (
          <div className="mt-2">
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
          <div className="mt-2">
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
    <main className="flex-1 overflow-y-auto bg-[#F8F9FA] px-4 pt-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen selection:bg-purple-200 selection:text-purple-900 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px] gap-6 relative z-10">
        <div className="min-w-0 max-w-[760px] mx-auto w-full">
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
                  <AutorenewIcon className="text-gray-300 mb-3" sx={{ fontSize: 40 }} />
                  <h3 className="text-gray-900 text-[16px] font-medium mb-1">No Updates Available</h3>
                  <p className="text-gray-500 text-[14px]">Check back later for more recent activity.</p>
                </motion.div>
              )}

              {PULSE_FEED.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.4 }}
                  className="text-center py-8"
                >
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-white border border-[#9B51E0] text-[14px] font-medium text-[#9B51E0] hover:bg-[#F9F5FF] transition-all shadow-sm cursor-pointer group">
                    <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-500" />
                    Load More Updates
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:block relative">
          <PulseRightPane />
        </div>
      </div>
    </main>
  )
}