import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import GroupIcon from '@mui/icons-material/Group'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkIcon from '@mui/icons-material/Work'
import CircularProgress from '@mui/material/CircularProgress'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'

import ActivityTabs from './ActivityTabs'
import { ActivityBoardWidgets } from './ActivityBoardWidgets'
import {
  ACTIVITY_ITEMS,
  type ActivityItem,
} from './data'

const ITEMS_PER_PAGE = 10

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 } 
  },
  exit: { opacity: 0, scale: 0.95, height: 0, overflow: 'hidden', transition: { duration: 0.2 } }
}

export interface OpportunityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
  isEmbedded?: boolean
}

const SkeletonCard = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative flex flex-col rounded-[4px] border border-gray-100 bg-white/60 backdrop-blur-md p-3 min-h-[80px] shadow-sm overflow-hidden"
  >
    <motion.div 
      animate={{ x: ['-100%', '200%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-10"
    />
    <div className="flex items-start gap-3 w-full relative z-0">
      <div className="w-10 h-10 rounded-[4px] bg-gray-200/80 shrink-0" />
      <div className="flex flex-col w-full gap-2 pt-0.5">
        <div className="h-3 bg-gray-200/80 rounded-[2px] w-1/4" />
        <div className="h-3.5 bg-gray-200/80 rounded-[2px] w-2/3" />
        <div className="flex gap-2 mt-0.5">
          <div className="h-3 bg-gray-200/80 rounded-[2px] w-16" />
          <div className="h-3 bg-gray-200/80 rounded-[2px] w-24" />
        </div>
      </div>
    </div>
  </motion.div>
)

export const OpportunityCard = memo(function OpportunityCard({
  item,
  isExpanded,
  onToggle,
  isEmbedded,
}: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          layout
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{ y: -2 }}
          className="flex flex-col relative shrink-0 group/card origin-center"
        >
          <AnimatePresence>
            {isDismissing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, scale: 1, backdropFilter: "blur(8px)" }}
                exit={{ opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 rounded-[4px] border border-gray-100 shadow-lg"
              >
                <motion.p 
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[14px] font-medium text-slate-800 mb-4 drop-shadow-sm"
                >
                  Not interested in this opportunity?
                </motion.p>
                <motion.div 
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDismissed(true)
                    }}
                    className="px-5 py-2 rounded-[4px] text-[13px] font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer border-none shadow-sm hover:shadow-red-500/20 hover:shadow-md"
                  >
                    Yes, Remove
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDismissing(false)
                    }}
                    className="px-5 py-2 rounded-[4px] text-[13px] font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer shadow-sm"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`relative rounded-[4px] transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'border border-[#E91E8C] bg-white shadow-[0_12px_28px_rgba(233,30,140,0.15)] z-10'
                : isEmbedded
                  ? 'bg-transparent'
                  : 'border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm hover:border-[#E91E8C]/40 hover:shadow-md'
            }`}
          >
            <div className="flex flex-row h-full">
              <div
                className={`flex-1 ${isEmbedded ? 'px-3 py-2' : 'p-3'} cursor-pointer min-w-0`}
                onClick={onToggle}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:-rotate-2 mt-0.5 relative">
                    {item.logoImg ? (
                      <img
                        src={item.logoImg}
                        alt={item.company}
                        className="w-10 h-10 rounded-[4px] object-cover border border-black/5 shadow-sm"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-[4px] flex items-center justify-center border border-black/5 shadow-sm overflow-hidden relative"
                        style={{
                          backgroundColor: item.logoBg,
                          color: item.logoColor,
                        }}
                      >
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-4 opacity-20"
                          style={{
                            background: `conic-gradient(from 0deg, transparent, ${item.logoColor}, transparent)`
                          }}
                        />
                        <span
                          className="text-center font-medium text-[9px] leading-tight whitespace-pre-wrap tracking-wide relative z-10"
                          style={{ color: item.logoColor }}
                        >
                          {item.logoText}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className="text-[13px] font-medium text-gray-600 truncate max-w-full">
                        {item.company}
                      </span>
                      {item.verified && (
                        <VerifiedIcon
                          sx={{ fontSize: 14 }}
                          className="text-blue-500 shrink-0"
                        />
                      )}
                      {item.hiringBadge && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-1.5 py-0.5 rounded-[2px] text-[9px] font-medium tracking-wider uppercase bg-green-500 text-white shrink-0 ml-1 shadow-sm"
                        >
                          HIRING
                        </motion.span>
                      )}
                    </div>

                    <h3 
                      className={`text-[15px] font-medium transition-colors duration-300 leading-snug ${
                        isExpanded 
                          ? 'text-purple-700 whitespace-normal' 
                          : 'text-slate-800 truncate group-hover/card:text-purple-700'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1 text-[12px] text-gray-500 flex-wrap">
                      <span className="font-medium text-slate-700">
                        {item.salary}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 text-purple-600 font-medium">
                        <LocationOnIcon sx={{ fontSize: 13 }} className="text-purple-500" />
                        {item.location}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span>{item.type}</span>
                    </div>

                    <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, filter: "blur(4px)" }} 
                        animate={{ opacity: 1, height: 'auto', filter: "blur(0px)" }} 
                        exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                        className="overflow-hidden"
                      >
                        <div className="pt-3">
                          <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap gap-1.5 mb-3"
                          >
                            {item.skills.map((skill, i) => (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                key={skill}
                                className="px-2 py-0.5 rounded-[2px] text-[11px] font-medium bg-blue-50/80 text-blue-700 border border-blue-100 cursor-default hover:bg-blue-100 transition-colors"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </motion.div>

                          <motion.p 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[13px] text-gray-600 leading-relaxed mb-4"
                          >
                            {item.description}
                          </motion.p>

                          <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-between pt-3 border-t border-gray-100/80 flex-wrap gap-3"
                          >
                            <div className="flex items-center gap-3 text-[12px] font-medium text-gray-500">
                              <span className="flex items-center gap-1 group/stat hover:text-blue-600 transition-colors cursor-default">
                                <GroupIcon sx={{ fontSize: 16 }} className="text-blue-400 group-hover/stat:scale-110 transition-transform" />
                                {item.applicants} Applicants
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-1 group/stat hover:text-purple-600 transition-colors cursor-default">
                                <VisibilityIcon sx={{ fontSize: 16 }} className="text-purple-400 group-hover/stat:scale-110 transition-transform" />
                                {item.views} Views
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-1 group/stat hover:text-orange-600 transition-colors cursor-default">
                                <AccessTimeIcon sx={{ fontSize: 16 }} className="text-orange-400 group-hover/stat:rotate-12 transition-transform" />
                                {item.postedAgo}
                              </span>
                            </div>
                            
                            <div className="flex items-center -space-x-1.5 hover:space-x-0 transition-all duration-300">
                              {Array.from({ length: Math.min(item.applicants, 3) }).map(
                                (_, i) => (
                                  <motion.img
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    key={i}
                                    src={`https://i.pravatar.cc/32?u=${item.id}-${i}`}
                                    alt="Applicant"
                                    className="w-6 h-6 rounded-full border border-white object-cover shadow-sm hover:z-10 hover:scale-110 transition-transform duration-200 cursor-pointer"
                                  />
                                )
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-1.5 mt-2.5"
                      >
                        {item.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-[2px] text-[10px] font-medium bg-blue-50/50 text-blue-600 border border-blue-100/50 transition-colors hover:bg-blue-50"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 3 && (
                          <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-medium text-gray-400">
                            +{item.skills.length - 3} more
                          </span>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-[120px] sm:w-[140px] flex flex-col py-3 px-2 sm:px-3 border-l border-gray-100/80 bg-gray-50/30 relative">
                {isExpanded ? (
                  <motion.div 
                    key="expanded"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full w-full gap-3"
                  >
                    <div className="w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsDismissing(true)
                        }}
                        className="flex items-center justify-center gap-1 w-full py-1.5 rounded-[4px] text-[11px] font-medium cursor-pointer bg-transparent hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                        Not Interested
                      </motion.button>
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-auto">
                      <div className="flex flex-col gap-1.5 w-full">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleSave}
                          className={`w-full flex items-center justify-center gap-1 py-1.5 rounded-[4px] text-[12px] font-medium cursor-pointer border transition-colors ${
                            isSaved 
                              ? 'border-pink-200 bg-pink-50 text-[#E91E8C]' 
                              : 'border-gray-200 bg-white text-gray-700 hover:bg-pink-50 hover:text-[#E91E8C] hover:border-pink-200'
                          }`}
                        >
                          {isSaved ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <BookmarkIcon sx={{ fontSize: 16 }} className="text-[#E91E8C]" />
                            </motion.div>
                          ) : (
                            <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                          )}
                          {isSaved ? 'Saved' : 'Save'}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-center gap-1 py-1.5 rounded-[4px] text-[12px] font-medium text-gray-700 cursor-pointer border border-gray-200 bg-white hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors"
                        >
                          <ShareOutlinedIcon sx={{ fontSize: 16 }} className="text-inherit" />
                          Share
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-3 py-2 rounded-[4px] text-[12px] font-medium text-white cursor-pointer bg-gradient-to-r from-[#E91E8C] to-[#F472B6] hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(233,30,140,0.2)] hover:shadow-[0_6px_16px_rgba(233,30,140,0.3)]"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="collapsed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full w-full gap-3"
                  >
                    <div className="flex items-center gap-1 justify-center w-full">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={toggleSave}
                        className={`flex items-center justify-center w-8 h-8 rounded-[4px] bg-transparent transition-colors cursor-pointer ${
                          isSaved ? 'text-[#E91E8C] bg-pink-50' : 'text-gray-400 hover:text-[#E91E8C] hover:bg-pink-50'
                        }`}
                        aria-label={isSaved ? 'Saved' : 'Save'}
                      >
                        {isSaved ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <BookmarkIcon sx={{ fontSize: 18 }} />
                          </motion.div>
                        ) : (
                          <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                        )}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        className="flex items-center justify-center w-8 h-8 rounded-[4px] text-gray-400 bg-transparent hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Share"
                      >
                        <ShareOutlinedIcon sx={{ fontSize: 18 }} />
                      </motion.button>
                    </div>

                    <div className="mt-auto w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggle()
                        }}
                        className="w-full flex items-center justify-center gap-1 py-1.5 px-2 text-[12px] font-medium text-[#E91E8C] rounded-[4px] border border-pink-100 bg-pink-50 hover:bg-[#E91E8C] hover:text-white transition-colors cursor-pointer group/btn"
                      >
                        View Job
                        <KeyboardArrowDownIcon
                          sx={{ fontSize: 16 }}
                          className={`transition-transform duration-300 group-hover/btn:text-white ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export const AdvertisementPlaceholder = memo(function AdvertisementPlaceholder() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-indigo-100/50 backdrop-blur-xl rounded-[4px] flex flex-col items-center justify-center flex-1 min-h-[140px] max-h-[220px] relative overflow-hidden group shadow-sm transition-all duration-300"
    >
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
      <div className="text-center relative z-10 p-4 flex flex-col items-center">
        <span className="block text-[13px] mb-1 font-medium text-indigo-900/40 tracking-widest uppercase">
          Advertisement
        </span>
      </div>
    </motion.div>
  )
})

const SponsoredPlaceholder = memo(function SponsoredPlaceholder() {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-pink-50/60 to-rose-50/60 border border-pink-100/50 backdrop-blur-xl rounded-[4px] flex flex-col items-center justify-center h-[100px] shrink-0 relative overflow-hidden group shadow-sm transition-all duration-300"
    >
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
      <div className="text-center relative z-10 p-4 flex flex-col items-center">
        <span className="block text-[12px] mb-1 font-medium text-pink-900/40 tracking-widest uppercase">
          Sponsored
        </span>
      </div>
    </motion.div>
  )
})

const HiringCTA = memo(function HiringCTA() {
  return (
    <div className="rounded-[4px] overflow-hidden border border-slate-700/50 bg-gradient-to-br from-[#0f172a] to-[#1e293b] backdrop-blur-xl p-4 text-white relative shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 group">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 -top-8 w-32 h-32 bg-[#E91E8C] rounded-full blur-3xl pointer-events-none" 
      />
      <div className="flex items-start gap-3 relative z-10">
        <div className="flex-1">
          <h3 className="text-[14px] font-medium mb-1.5 text-white leading-tight">
            Looking to hire top talent?
          </h3>
          <p className="text-[12px] text-slate-300 leading-relaxed mb-3">
            Post a job and connect with verified professionals ready to help your business grow.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-[4px] text-[12px] font-medium text-white cursor-pointer bg-gradient-to-r from-[#E91E8C] to-[#F472B6] hover:opacity-90 transition-opacity w-full sm:w-auto text-center border-none shadow-[0_4px_12px_rgba(233,30,140,0.3)]"
          >
            Post a Job
          </motion.button>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-colors">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <WorkIcon sx={{ fontSize: 24 }} className="text-white/80" />
          </motion.div>
        </div>
      </div>
    </div>
  )
})

export default function ActivityBoardDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredItems =
    activeFilter === 'all'
      ? ACTIVITY_ITEMS
      : ACTIVITY_ITEMS.filter(
          (item) =>
            item.tag.toLowerCase() === activeFilter.toLowerCase()
        )

  const displayedItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setVisibleCount(ITEMS_PER_PAGE)
    setExpandedId(null)
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 600)
  }

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex flex-col w-full h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none outline-none overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none bg-radial-gradient from-transparent to-[#f8f9fb] z-0" />
      
      <div className="sticky top-0 z-30 bg-white backdrop-blur-xl shrink-0">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full flex-1 overflow-hidden max-w-[1280px] mx-auto relative z-10 bg-white ">
        <div className="grid grid-cols-12 h-full gap-4 p-4 lg:p-4">
          <div className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-y-auto pb-12 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            <AnimatePresence mode="wait">
              {displayedItems.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center p-6 text-center mt-8"
                >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 mb-4 rounded-[4px] bg-white border border-gray-100 shadow-sm flex items-center justify-center"
                  >
                    <span className="text-2xl drop-shadow-sm">📭</span>
                  </motion.div>
                  <h3 className="text-[16px] font-medium text-slate-800 mb-2">
                    No opportunities found
                  </h3>
                  <p className="text-[13px] text-gray-500 max-w-sm">
                    There are no matching opportunities in this category at the moment. Try checking back later or adjusting your filters.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="list"
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="visible" 
                  className="flex flex-col gap-2"
                >
                  {displayedItems.map((item, index) => (
                    <OpportunityCard
                      key={item.id}
                      item={item}
                      index={index}
                      isExpanded={expandedId === item.id}
                      onToggle={() => handleToggleExpand(item.id)}
                    />
                  ))}

                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-2 mt-2"
                    >
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {hasMore && displayedItems.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex justify-center mt-6 mb-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-medium text-purple-600 hover:bg-purple-50 hover:shadow-md transition-all cursor-pointer shadow-sm disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={14}
                        sx={{ color: 'inherit' }}
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-500" />
                      <span>Load More Opportunities</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="col-span-4 hidden lg:flex flex-col h-full gap-3 overflow-y-auto pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          >
            <ActivityBoardWidgets 
              adsContent={
                <div className="flex flex-col gap-2 shrink-0">
                  <AdvertisementPlaceholder />
                </div>
              }
            />
            <div className="flex flex-col gap-2 shrink-0">
              <SponsoredPlaceholder />
            </div>
            <div className="shrink-0 pb-4">
              <HiringCTA />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}