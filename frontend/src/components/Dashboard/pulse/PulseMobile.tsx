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

const FeedCardMobile = memo(function FeedCardMobile({ item }: { item: PulseItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const config = FEED_TYPE_CONFIG[item.type]
  const author = getAuthorInfo(item)

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="bg-white rounded-[8px] mb-4 border border-gray-200 shadow-sm overflow-hidden"
    >
      {(item.type === 'spotlight' || item.type === 'expert') && (
        <div className="flex items-center gap-2.5 px-3.5 pt-3.5 pb-2">
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
          
          <MoreVertIcon sx={{ fontSize: 20 }} className="text-gray-400 active:text-gray-700 transition-colors p-0.5" />
        </div>
      )}

      <div className={item.type === 'spotlight' || item.type === 'expert' ? "px-3.5 pb-3.5 pt-1" : ""}>
        {item.type === 'spotlight' && (
          <div className="flex flex-col w-full max-w-[260px] mx-auto mb-1" onClick={() => !isPlaying && setIsPlaying(true)}>
            <div className="relative w-full aspect-[4/5] rounded-[8px] overflow-hidden mb-2.5 bg-gray-900 border border-black/5 shadow-sm active:scale-[0.98] transition-transform duration-300">
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
            <div className="relative w-full aspect-[16/9] rounded-[8px] overflow-hidden border border-black/5 bg-gray-900 shadow-sm active:scale-[0.98] transition-transform duration-300">
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
          <div className="flex flex-col gap-3 w-full p-4 bg-white relative">
            <div className="flex items-start gap-3">
              <div className="shrink-0 relative active:scale-105 transition-transform duration-300">
                {item.data.logoImg ? (
                  <img src={item.data.logoImg} alt={item.data.company} className="w-12 h-12 rounded-[8px] object-cover border border-gray-100 bg-white shadow-sm" />
                ) : (
                  <div className="w-12 h-12 rounded-[8px] flex items-center justify-center border border-gray-100 bg-gray-50 shadow-sm" style={{ backgroundColor: item.data.logoBg }}>
                    <span className="text-center font-medium text-[11px] leading-tight tracking-wide" style={{ color: item.data.logoColor }}>
                      {item.data.logoText}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 w-full">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[13px] font-medium text-gray-700 truncate">
                    {item.data.company}
                  </span>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-600 text-[9px] font-medium tracking-wide uppercase">
                    Hiring
                  </span>
                </div>
                <h3 className="text-[14px] font-medium text-gray-900 mt-1 leading-snug line-clamp-2 active:text-[#F14698] transition-colors">
                  {item.data.title}
                </h3>
                <div className="flex flex-wrap items-center mt-2 gap-1.5">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F5FF] text-[#2563EB] text-[10px] font-medium tracking-wide">
                    {item.data.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F5FF] text-[#2563EB] text-[10px] font-medium tracking-wide">
                    Full Time
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-1 border-t border-gray-50 pt-3">
              <div className="flex items-center gap-4 text-gray-400">
                <BookmarkBorderIcon sx={{ fontSize: 20 }} className="active:text-gray-700 transition-colors" />
                <ShareIcon sx={{ fontSize: 18 }} className="active:text-gray-700 transition-colors" />
              </div>
              <button className="flex items-center justify-center gap-1 px-4 py-1.5 rounded-[4px] text-[12px] font-medium text-white bg-[#F14698] active:bg-[#D93D89] transition-colors shadow-sm">
                View Job <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
          </div>
        )}

        {item.type === 'directory' && (
          <div className="flex items-center justify-between w-full bg-white p-4 relative">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center shrink-0 rounded-[4px] w-12 h-12 border border-gray-100 bg-gray-50 shadow-sm active:scale-105 transition-transform duration-300" style={{ backgroundColor: item.data.logoBg }}>
                <span className="text-[11px] font-medium tracking-wider truncate w-full text-center px-1" style={{ color: item.data.logoColor }}>
                  {item.data.logoText}
                </span>
              </div>
              
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-medium text-gray-900 text-[14px] truncate active:text-[#9B51E0] transition-colors">
                    {item.data.name}
                  </h3>
                  {item.data.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#9B51E0] shrink-0" />}
                </div>
                <p className="text-[12px] text-gray-500 truncate mt-0.5">
                  {item.data.category}
                </p>
              </div>
            </div>

            <div className="shrink-0 ml-3">
              <button className="px-4 py-1.5 rounded-[4px] text-[12px] font-medium text-[#9B51E0] bg-white border border-[#9B51E0] active:bg-[#F9F5FF] transition-colors shadow-sm">
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default function PulseMobile() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-[#F8F9FA] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
      <div className="p-3.5 pb-12">
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
    </div>
  )
}