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
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  }
}

export interface OpportunityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
  isEmbedded?: boolean
}

const SkeletonCard = () => (
  <div className="relative flex flex-col rounded-[8px] border border-gray-100 bg-white/60 backdrop-blur-md p-4 min-h-[80px]">
    <div className="flex items-start gap-3 w-full">
      <div className="w-14 h-14 rounded-[8px] bg-gray-200/80 animate-pulse shrink-0" />
      <div className="flex flex-col w-full py-0.5 mt-0.5 gap-2.5">
        <div className="h-3 bg-gray-200/80 rounded-[4px] animate-pulse w-1/3" />
        <div className="h-4 bg-gray-200/80 rounded-[4px] animate-pulse w-3/4" />
        <div className="flex gap-2 mt-1">
          <div className="h-3.5 bg-gray-200/80 rounded-[2px] animate-pulse w-16" />
          <div className="h-3.5 bg-gray-200/80 rounded-[2px] animate-pulse w-24" />
        </div>
      </div>
    </div>
  </div>
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

  if (isDismissed) return null

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className="flex flex-col relative shrink-0 group/card"
    >
      {isDismissing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg rounded-[8px] border border-white transition-all duration-300 animate-in zoom-in-95 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <p className="text-[13px] font-bold text-slate-800 mb-3 drop-shadow-sm">
            Not interested in this opportunity?
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDismissed(true)
              }}
              className="px-5 py-2 rounded-[4px] text-[12px] font-bold bg-red-500 text-white hover:bg-red-600 transition-all duration-300 cursor-pointer border-none shadow-[0_4px_12px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_16px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Yes, Remove
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDismissing(false)
              }}
              className="px-5 py-2 rounded-[4px] text-[12px] font-bold bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        className={`relative rounded-[8px] transition-all duration-500 ease-out overflow-hidden ${
          isExpanded
            ? 'border border-[#E91E8C]/40 bg-white shadow-[0_12px_40px_rgba(233,30,140,0.08)] scale-[1.01] z-10'
            : isEmbedded
              ? ''
              : 'border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-[#E91E8C]/20 hover:scale-[1.005]'
        }`}
      >
        <div className="flex">
          <div
            className={`flex-1 ${isEmbedded ? 'px-4 py-2' : 'p-4'} cursor-pointer min-w-0`}
            onClick={onToggle}
          >
            <div className="flex items-start gap-3.5">
              <div className="shrink-0 transition-transform duration-500 group-hover/card:scale-105">
                {item.logoImg ? (
                  <img
                    src={item.logoImg}
                    alt={item.company}
                    className="w-12 h-12 rounded-[8px] object-cover border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-[8px] flex items-center justify-center border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    style={{
                      backgroundColor: item.logoBg,
                      color: item.logoColor,
                    }}
                  >
                    <span
                      className="text-center font-bold text-[9px] leading-tight whitespace-pre-wrap tracking-wide"
                      style={{ color: item.logoColor }}
                    >
                      {item.logoText}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[13px] font-semibold text-gray-600 truncate">
                    {item.company}
                  </span>
                  {item.verified && (
                    <VerifiedIcon
                      sx={{ fontSize: 14 }}
                      className="text-blue-500 shrink-0 drop-shadow-sm"
                    />
                  )}
                  {item.hiringBadge && (
                    <span className="px-2 py-0.5 rounded-[2px] text-[9px] font-black tracking-wider uppercase bg-green-500 text-white shrink-0 ml-1 shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
                      HIRING
                    </span>
                  )}
                </div>

                <h3 
                  className={`text-[16px] font-medium transition-colors duration-300 leading-snug ${
                    isExpanded 
                      ? 'text-purple-700 whitespace-normal' 
                      : 'text-slate-800 truncate group-hover/card:text-purple-700'
                  }`}
                >
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 mt-1.5 text-[12px] text-gray-500 flex-wrap">
                  <span className="font-semibold text-slate-700">
                    {item.salary}
                  </span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <span className="flex items-center gap-0.5 text-purple-600 font-medium">
                    <LocationOnIcon sx={{ fontSize: 13 }} className="text-purple-500" />
                    {item.location}
                  </span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <span>{item.type}</span>
                </div>

                <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }} 
                    className="mt-3"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-[4px] text-[11px] font-semibold bg-blue-50/50 text-blue-600 border border-blue-100/50 shadow-[0_2px_8px_rgba(59,130,246,0.05)] backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.12)] hover:bg-blue-100/50 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100/80">
                      <div className="flex items-center -space-x-2">
                        {Array.from({ length: Math.min(item.applicants, 3) }).map(
                          (_, i) => (
                            <img
                              key={i}
                              src={`https://i.pravatar.cc/32?u=${item.id}-${i}`}
                              alt="Applicant"
                              className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-300 hover:scale-125 hover:z-10"
                            />
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] font-medium text-gray-600">
                        <span className="flex items-center gap-1 group/stat hover:text-blue-600 transition-colors cursor-default">
                          <GroupIcon sx={{ fontSize: 16 }} className="text-blue-500 transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:-translate-y-0.5" />
                          {item.applicants} Applicants
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1 group/stat hover:text-purple-600 transition-colors cursor-default">
                          <VisibilityIcon sx={{ fontSize: 16 }} className="text-purple-500 transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:-translate-y-0.5" />
                          {item.views} Views
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1 group/stat hover:text-orange-600 transition-colors cursor-default">
                          <AccessTimeIcon sx={{ fontSize: 16 }} className="text-orange-500 transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:-translate-y-0.5" />
                          {item.postedAgo}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>

                {!isExpanded && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-blue-50/50 text-blue-600 border border-blue-100/50 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-between py-4 px-4 border-l border-gray-100/80 w-[160px] bg-gray-50/30 backdrop-blur-sm relative overflow-hidden">
            {isExpanded ? (
              <motion.div 
                key="expanded"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex flex-col items-center justify-between h-full w-full relative z-10"
              >
                <div className="flex flex-col items-center gap-2.5 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDismissing(true)
                    }}
                    className="flex items-center justify-center gap-1 w-full py-1.5 rounded-[4px] text-[11px] font-medium cursor-pointer border-none bg-transparent hover:bg-red-50 text-red-500 transition-all duration-300"
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                    Not Interested
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2.5 w-full">
                  <div className="flex flex-col items-center gap-1.5 w-full">
                    <button
                      onClick={toggleSave}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[4px] text-[12px] font-semibold text-gray-700 cursor-pointer border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-pink-50 hover:border-pink-200 hover:text-[#E91E8C] hover:shadow-[0_4px_12px_rgba(233,30,140,0.12)] hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
                    >
                      {isSaved ? (
                        <BookmarkIcon sx={{ fontSize: 16 }} className="text-[#E91E8C]" />
                      ) : (
                        <BookmarkBorderIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                      )}
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[4px] text-[12px] font-semibold text-gray-700 cursor-pointer border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 hover:shadow-[0_4px_12px_rgba(147,51,234,0.12)] hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
                      aria-label="Share"
                    >
                      <ShareOutlinedIcon sx={{ fontSize: 16 }} className="text-inherit" />
                      Share
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="w-full px-5 py-2.5 rounded-[4px] text-[12px] font-bold text-white cursor-pointer border border-pink-500/20 bg-gradient-to-r from-[#E91E8C] to-[#F472B6] bg-size-[200%_auto] hover:bg-position-[100%_center] hover:scale-[1.03] shadow-[0_4px_12px_rgba(233,30,140,0.3)] hover:shadow-[0_6px_20px_rgba(233,30,140,0.4)] transition-all duration-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-between h-full w-full relative z-10"
              >
                <div className="flex items-center gap-1 justify-center w-full">
                  <button
                    onClick={toggleSave}
                    className="flex items-center justify-center w-9 h-9 rounded-[4px] text-gray-400 bg-transparent border border-transparent hover:text-[#E91E8C] hover:bg-white hover:border-pink-100 hover:shadow-[0_4px_12px_rgba(233,30,140,0.12)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.95] active:translate-y-0 cursor-pointer"
                    aria-label={isSaved ? 'Saved' : 'Save'}
                  >
                    {isSaved ? (
                      <BookmarkIcon sx={{ fontSize: 20 }} className="text-[#E91E8C] drop-shadow-sm" />
                    ) : (
                      <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                    )}
                  </button>
                  <button
                    className="flex items-center justify-center w-9 h-9 rounded-[4px] text-gray-400 bg-transparent border border-transparent hover:text-gray-800 hover:bg-white hover:border-gray-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.95] active:translate-y-0 cursor-pointer"
                    aria-label="Share"
                  >
                    <ShareOutlinedIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle()
                  }}
                  className="w-full flex items-center justify-center gap-0.5 py-2 px-2 text-[12px] font-bold text-white rounded-[4px] border border-pink-500/20 bg-gradient-to-r from-[#E91E8C] to-[#F472B6] hover:from-[#d11a7d] hover:to-[#ec4899] hover:shadow-[0_6px_16px_rgba(233,30,140,0.35)] shadow-[0_2px_8px_rgba(233,30,140,0.2)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  View Job
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 16 }}
                    className={`transition-transform duration-500 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export const AdvertisementPlaceholder = memo(function AdvertisementPlaceholder() {
  return (
    <div className="bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-white/80 backdrop-blur-xl rounded-[8px] flex flex-col items-center justify-center flex-1 min-h-[160px] max-h-[260px] relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-500">
      <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700" />
      <div className="text-center relative z-10 p-6 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-105">
        <span className="block text-xl mb-3 font-black text-indigo-900/30 tracking-widest uppercase drop-shadow-sm">
          Advertisement
        </span>
      </div>
    </div>
  )
})

const SponsoredPlaceholder = memo(function SponsoredPlaceholder() {
  return (
    <div className="bg-gradient-to-br from-pink-50/60 to-rose-50/60 border border-white/80 backdrop-blur-xl rounded-[8px] flex flex-col items-center justify-center h-[120px] shrink-0 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(233,30,140,0.12)] hover:-translate-y-1 transition-all duration-500">
      <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700" />
      <div className="text-center relative z-10 p-6 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-105">
        <span className="block text-sm mb-3 font-black text-pink-900/30 tracking-widest uppercase drop-shadow-sm">
          Sponsored
        </span>
      </div>
    </div>
  )
})

const HiringCTA = memo(function HiringCTA() {
  return (
    <div className="rounded-[8px] overflow-hidden border border-slate-700/50 bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 backdrop-blur-xl p-5 text-white relative shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_48px_rgba(233,30,140,0.2)] hover:-translate-y-1 transition-all duration-500 group">
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#E91E8C]/20 rounded-full blur-3xl group-hover:bg-[#E91E8C]/40 transition-colors duration-700" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex-1">
          <h3 className="text-[15px] font-bold mb-1.5 text-white drop-shadow-sm">
            Looking to hire top talent?
          </h3>
          <p className="text-[12px] text-gray-300 leading-relaxed mb-3">
            Post a job and connect with verified professionals ready to help
            your business grow.
          </p>
          <button className="px-5 py-2.5 rounded-[4px] text-[12px] font-bold text-white cursor-pointer border border-pink-500/30 bg-gradient-to-r from-[#E91E8C] to-[#F472B6] hover:from-[#d11a7d] hover:to-[#ec4899] transition-all duration-500 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 shadow-[0_4px_16px_rgba(233,30,140,0.4)]">
            Post a Job
          </button>
        </div>
        <div className="shrink-0 w-16 h-16 rounded-[8px] bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md shadow-inner group-hover:bg-white/10 group-hover:scale-105 transition-all duration-500">
          <WorkIcon sx={{ fontSize: 32 }} className="text-white/80 drop-shadow-lg" />
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
    }, 300)
  }

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-[#f8f9fb]/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none outline-none overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none bg-radial-gradient from-transparent to-[#f8f9fb] z-0" />
      
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl shrink-0 border-b border-gray-100/50 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full flex-1 overflow-hidden max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-12 h-full gap-6 p-5 lg:px-6 lg:py-5">
          <div className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-y-auto pb-12 px-2 -mx-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {displayedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 mb-4 rounded-[8px] bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-center">
                  <span className="text-3xl drop-shadow-sm">📭</span>
                </div>
                <h3 className="text-[16px] font-bold text-slate-800 mb-1">
                  No opportunities found
                </h3>
                <p className="text-[13px] text-gray-500">
                  There are no matching opportunities in this category at the moment.
                </p>
              </div>
            ) : (
              <>
                <motion.div 
                  variants={containerVariants} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "50px" }}
                  className="flex flex-col gap-4"
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
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}
                </motion.div>

                {hasMore && (
                  <div className="flex justify-center mt-8 mb-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress
                            size={14}
                            sx={{ color: '#7C3AED' }}
                          />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <AutorenewIcon sx={{ fontSize: 18 }} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                          <span>Load More Opportunities</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-span-4 hidden lg:flex flex-col h-full gap-4 px-1 pt-1 overflow-y-auto pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
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
          </div>
        </div>
      </div>
    </div>
  )
}