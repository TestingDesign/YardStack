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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import InlinePulsePlayer from './InlinePulsePlayer'

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
    transition: { type: "spring", stiffness: 350, damping: 28 }
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
  const config = FEED_TYPE_CONFIG[item.type]
  const author = getAuthorInfo(item)

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="bg-white rounded-[8px] mb-5 border border-gray-200 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden group/card"
    >
      {(item.type === 'spotlight' || item.type === 'expert') && (
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
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
          
          <MoreVertIcon sx={{ fontSize: 20 }} className="text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" />
        </div>
      )}

      <div className={item.type === 'spotlight' || item.type === 'expert' ? "px-4 pb-4 pt-2" : ""}>
        {item.type === 'spotlight' && (
          <div className="flex flex-col cursor-pointer group w-full max-w-[280px] mx-auto mb-2" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[4/5] rounded-[8px] overflow-hidden mb-3 bg-gray-900 border border-black/5 shadow-sm group-hover:shadow-md transition-all duration-500">
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
            <div className="relative w-full aspect-[16/9] rounded-[8px] overflow-hidden border border-black/5 bg-gray-900 shadow-sm group-hover:shadow-md transition-all duration-500">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full p-5 bg-white cursor-pointer relative">
            <div className="flex items-start gap-4 flex-1">
              <div className="shrink-0 relative group-hover/card:scale-105 transition-transform duration-500">
                {item.data.logoImg ? (
                  <img src={item.data.logoImg} alt={item.data.company} className="w-14 h-14 rounded-[8px] object-cover border border-gray-100 bg-white shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-[8px] flex items-center justify-center border border-gray-100 bg-gray-50 shadow-sm" style={{ backgroundColor: item.data.logoBg }}>
                    <span className="text-center font-medium text-[12px] leading-tight tracking-wide" style={{ color: item.data.logoColor }}>
                      {item.data.logoText}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium text-gray-700 truncate">
                    {item.data.company}
                  </span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />}
                  <span className="ml-1 px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-600 text-[10px] font-medium tracking-wide uppercase">
                    Hiring
                  </span>
                </div>
                <h3 className="text-[16px] font-medium text-gray-900 mt-1 leading-snug truncate group-hover/card:text-[#F14698] transition-colors">
                  {item.data.title}
                </h3>
                <div className="flex flex-wrap items-center mt-2.5 gap-2">
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#F0F5FF] text-[#2563EB] text-[11px] font-medium tracking-wide">
                    {item.data.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#F0F5FF] text-[#2563EB] text-[11px] font-medium tracking-wide">
                    Full Time
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 pl-18 sm:pl-0">
              <div className="flex items-center gap-3 text-gray-400">
                <BookmarkBorderIcon sx={{ fontSize: 20 }} className="hover:text-gray-700 transition-colors" />
                <ShareIcon sx={{ fontSize: 18 }} className="hover:text-gray-700 transition-colors" />
              </div>
              <button className="flex items-center justify-center gap-1 px-5 py-2 rounded-[4px] text-[13px] font-medium text-white bg-[#F14698] hover:bg-[#D93D89] transition-colors shadow-sm w-full sm:w-auto">
                View Job <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        )}

        {item.type === 'directory' && (
          <div className="flex items-center justify-between w-full bg-white p-5 cursor-pointer relative">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex items-center justify-center shrink-0 rounded-[4px] w-14 h-14 border border-gray-100 bg-gray-50 shadow-sm group-hover/card:scale-105 transition-transform duration-500" style={{ backgroundColor: item.data.logoBg }}>
                <span className="text-[13px] font-medium tracking-wider truncate w-full text-center px-1" style={{ color: item.data.logoColor }}>
                  {item.data.logoText}
                </span>
              </div>
              
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-medium text-gray-900 text-[16px] truncate group-hover/card:text-[#9B51E0] transition-colors">
                    {item.data.name}
                  </h3>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 16 }} className="text-[#9B51E0] shrink-0" />}
                </div>
                <p className="text-[13px] text-gray-500 truncate mt-1">
                  {item.data.category}
                </p>
              </div>
            </div>

            <div className="shrink-0 ml-4">
              <button className="px-6 py-2 rounded-[4px] text-[13px] font-medium text-[#9B51E0] bg-white border border-[#9B51E0] hover:bg-[#F9F5FF] transition-colors shadow-sm w-full">
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default function PulseDesktop() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 sm:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none min-h-screen">
      <div className="max-w-[760px] mx-auto">
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
    </div>
  )
}