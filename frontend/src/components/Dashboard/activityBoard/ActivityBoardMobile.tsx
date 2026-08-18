import React, { useState, useCallback, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import GroupIcon from '@mui/icons-material/Group'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import ActivityTabs from './ActivityTabs'
import { ActivityBoardWidgets } from './ActivityBoardWidgets'
import { ACTIVITY_ITEMS, type ActivityItem } from './data'

const ITEMS_PER_PAGE = 8

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

export interface ActivityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
  isEmbedded?: boolean
}

export const ActivityCard = memo(function ActivityCard({ 
  item, 
  index, 
  isExpanded, 
  onToggle,
  isEmbedded 
}: ActivityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<'top' | 'bottom'>(index === 0 ? 'bottom' : 'top')

  const startX = useRef(0)
  const initialOffset = useRef(0)
  const maxSwipe = 80
  const saveBtnRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEmbedded) return
    if (isExpanded) onToggle()
    startX.current = e.touches[0].clientX
    initialOffset.current = swipeOffset
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientX - startX.current
    let nextOffset = initialOffset.current + diff

    if (nextOffset > 0) nextOffset = 0
    if (nextOffset < -maxSwipe) nextOffset = -maxSwipe

    setSwipeOffset(nextOffset)
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    setSwipeOffset((prev) => (prev < -maxSwipe / 2 ? -maxSwipe : 0))
  }

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  const toggleSwipe = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSwipeOffset(prev => prev === 0 ? -maxSwipe : 0)
  }

  const handleTooltipPosition = () => {
    if (saveBtnRef.current) {
      const rect = saveBtnRef.current.getBoundingClientRect()
      if (rect.top < 120) {
        setTooltipPos('bottom')
      } else {
        setTooltipPos('top')
      }
    }
  }

  if (isDismissed) return null

  return (
    <motion.div 
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileTap={{ scale: isExpanded ? 1 : 0.98 }}
      className={`relative origin-center ${isEmbedded ? '' : 'mb-3'}`}
    >
      <div className={`relative z-10 rounded-[4px] group/card ${isEmbedded ? '' : 'shadow-sm hover:shadow-md transition-shadow duration-300 bg-red-500'}`}>
        {!isEmbedded && (
          <div className="absolute inset-y-0 right-0 w-20 rounded-r-[4px] flex flex-col items-center justify-center text-white z-0 overflow-hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full hover:bg-red-600 transition-colors border-none outline-none cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              onClick={() => setIsDismissed(true)}
            >
              <CloseIcon sx={{ fontSize: 20 }} className="mb-0.5 hover:scale-110 transition-transform duration-300" />
              <span className="text-[9px] font-bold px-2 text-center leading-tight">
                Not<br />Interested
              </span>
            </motion.button>
          </div>
        )}

        <div
          onTouchStart={isEmbedded ? undefined : handleTouchStart}
          onTouchMove={isEmbedded ? undefined : handleTouchMove}
          onTouchEnd={isEmbedded ? undefined : handleTouchEnd}
          style={{
            transform: `translateX(${swipeOffset}px)`,
            transitionDuration: isSwiping ? '0ms' : '400ms',
            transitionTimingFunction: isSwiping ? 'linear' : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            backgroundColor: item.cardBg || '#FFFFFF'
          }}
          className={`relative flex flex-col ${isEmbedded ? 'px-3.5 pb-2.5 pt-1 border-transparent' : 'p-2 border border-gray-200'} rounded-[4px] z-10 transition-colors min-h-20`}
        >
          <div className={`absolute top-2 ${isEmbedded ? 'right-3.5' : 'right-2'} bottom-2 z-20 flex flex-col items-end justify-between pointer-events-none`}>
            <div className="flex items-center pointer-events-auto">
              <button
                onClick={toggleSwipe}
                className={`flex items-center justify-center p-1 rounded-[4px] text-red-500 bg-transparent border-none hover:bg-red-50 hover:scale-110 transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 cursor-pointer ${
                  swipeOffset < -10 ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
                }`}
                aria-label="Swipe Left"
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <div
                ref={saveBtnRef}
                onMouseEnter={handleTooltipPosition}
                onTouchStart={handleTooltipPosition}
                className={`relative group/save flex items-center justify-center transition-all duration-300 ${
                  swipeOffset < -10 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSave}
                  className={`flex items-center justify-center w-7 h-7 rounded-[2px] border border-pink-100 text-[#E91E8C] bg-white hover:bg-pink-50 hover:border-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C]/50 transition-all duration-300 cursor-pointer ${
                    isSaved ? 'scale-110' : ''
                  }`}
                  aria-label={isSaved ? "Saved" : "Save"}
                >
                  {isSaved ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <BookmarkIcon sx={{ fontSize: 16 }} className="drop-shadow-sm text-[#E91E8C]" />
                    </motion.div>
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                  )}
                </motion.button>

                <span
                  className={`absolute right-0 px-2 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-[2px] opacity-0 group-hover/save:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] ${
                    tooltipPos === 'top' ? 'bottom-full mb-1.5 translate-y-1 group-hover/save:translate-y-0' : 'top-full mt-1.5 -translate-y-1 group-hover/save:translate-y-0'
                  }`}
                >
                  {isSaved ? 'Saved to List' : 'Save for Later'}
                  <div
                    className={`absolute right-2 w-1.5 h-1.5 bg-gray-900 rotate-45 ${
                      tooltipPos === 'top' ? '-bottom-0.5' : '-top-0.5'
                    }`}
                  />
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`flex items-center justify-center w-7 h-7 rounded-[2px] border border-gray-200 text-gray-500 bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 transition-all duration-300 cursor-pointer ${
                  swipeOffset < -10 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-label="Share"
              >
                <ShareOutlinedIcon sx={{ fontSize: 16 }} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className={`flex items-center gap-0.5 px-1.5 py-0.5 bg-white hover:bg-pink-50 rounded-[4px] border border-pink-500/20 text-pink-600 font-bold text-[9px] md:text-[10px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 pointer-events-auto shadow-sm cursor-pointer hover:shadow hover:border-pink-500/40 ${
                  swipeOffset < -10 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                {isExpanded ? 'Hide' : 'View'}
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 12 }}
                  className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </motion.button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 w-full overflow-hidden pr-20">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group/logo">
                {item.logoImg ? (
                  <img
                    src={item.logoImg}
                    alt={item.company}
                    className="w-10 h-10 @md:w-12 @md:h-12 rounded-[4px] object-cover border border-black/5 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:-rotate-2 shadow-sm"
                  />
                ) : (
                  <div
                    className="w-10 h-10 @md:w-12 @md:h-12 rounded-[4px] flex items-center justify-center border border-black/5 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:-rotate-2 shadow-sm overflow-hidden relative"
                    style={{ backgroundColor: item.logoBg, color: item.logoColor }}
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
                      className="text-center font-bold text-[9px] @md:text-[10px] leading-tight whitespace-pre-wrap tracking-wide relative z-10"
                      style={{ color: item.logoColor }}
                    >
                      {item.logoText}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover/logo:bg-black/5 transition-colors rounded-[4px] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col min-w-0 w-full py-0.5 transition-transform duration-300 group-hover/card:translate-x-1">
              <div className="flex items-center gap-1">
                <span className="text-[11px] @md:text-[12px] font-semibold text-[#1f1633] truncate">
                  {item.company}
                </span>
                {item.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
              </div>

              <h3 className="text-[12px] @md:text-[13px] font-bold text-[#1f1633] mt-0.5 leading-snug truncate">
                {item.title}
              </h3>

              <div className="flex items-center w-full mt-2 gap-1.5 min-w-0">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-1.5 py-0.5 rounded-[2px] text-[8px] @md:text-[9px] font-bold tracking-wide uppercase shrink-0 transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                >
                  {item.tag}
                </motion.span>
                <span className="text-[10px] font-medium text-gray-500 truncate">
                  {item.detail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
          exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="overflow-hidden"
        >
          <div className="mx-2 p-4 pt-5 -mt-2 bg-gradient-to-b from-gray-50/80 to-white rounded-b-[8px] border border-t-0 border-gray-100 flex flex-col relative z-0 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1.5 mb-3 text-[11px] font-bold text-[#1f1633]"
          >
            <BusinessCenterIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1]" />
            Role Overview
          </motion.div>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-1.5 mb-3"
          >
            {item.skills?.map((skill, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                key={skill}
                className="px-2 py-1 rounded-[4px] text-[10px] font-semibold bg-blue-50/50 text-blue-600 border border-blue-100/50 hover:bg-blue-100 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] text-gray-600 leading-relaxed mb-4"
          >
            {item.description || `We are actively looking for candidates/agencies specializing in ${item.tag} to fulfill the requirements for ${item.title}. The ideal candidate should have strong leadership skills and a proven track record.`}
          </motion.p>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-gray-100/80"
          >
            <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500 whitespace-nowrap">
                <span className="flex items-center gap-1 group/stat hover:text-blue-600 transition-colors cursor-default">
                  <GroupIcon sx={{ fontSize: 14 }} className="text-blue-500 group-hover/stat:scale-110 transition-transform" />
                  {item.applicants || 0} Applicants
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 group/stat hover:text-purple-600 transition-colors cursor-default">
                  <VisibilityIcon sx={{ fontSize: 14 }} className="text-purple-500 group-hover/stat:scale-110 transition-transform" />
                  {item.views || 0} Views
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 group/stat hover:text-orange-600 transition-colors cursor-default">
                  <AccessTimeIcon sx={{ fontSize: 14 }} className="text-orange-500 group-hover/stat:rotate-12 transition-transform" />
                  {item.postedAgo || 'Just now'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex justify-end"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-5 py-2 rounded-[4px] text-[12px] font-bold text-white cursor-pointer border-none
                bg-gradient-to-r from-pink-500 to-rose-500 bg-[length:200%_auto]
                hover:bg-[position:100%_center]
                shadow-[0_2px_8px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_12px_rgba(225,29,72,0.35)]
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50
              "
            >
              Apply / Connect
            </motion.button>
          </motion.div>
        </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  )
})

export const AdvertisementBlock = memo(function AdvertisementBlock() {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-indigo-50/60 to-blue-50/60 border border-white/80 backdrop-blur-xl rounded-[4px] flex flex-col items-center justify-center w-full h-[120px] my-3 relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] group"
    >
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
      <div className="text-center relative z-10 p-4 flex flex-col items-center">
        <span className="block text-sm mb-2 font-black text-indigo-900/30 tracking-widest uppercase drop-shadow-sm">
          Advertisement
        </span>
      </div>
    </motion.div>
  )
})

const SponsoredBlock = memo(function SponsoredBlock() {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-pink-50/60 to-rose-50/60 border border-white/80 backdrop-blur-xl rounded-[4px] flex flex-col items-center justify-center h-[100px] w-full mt-4 mb-2 relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] group"
    >
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
      <div className="text-center relative z-10 p-4 flex flex-col items-center">
        <span className="block text-xs mb-2 font-black text-pink-900/30 tracking-widest uppercase drop-shadow-sm">
          Sponsored
        </span>
      </div>
    </motion.div>
  )
})

const HiringCTA = memo(function HiringCTA() {
  return (
    <div className="rounded-[4px] overflow-hidden border border-slate-700/50 bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 backdrop-blur-xl p-4 text-white relative shadow-[0_8px_24px_rgba(0,0,0,0.15)] mt-4 mb-6 group transition-shadow hover:shadow-[0_12px_28px_rgba(0,0,0,0.25)]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 -top-8 w-24 h-24 bg-[#E91E8C] rounded-full blur-2xl pointer-events-none" 
      />
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex-1">
          <h3 className="text-[14px] font-bold mb-1 text-white drop-shadow-sm">
            Looking to hire top talent?
          </h3>
          <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
            Post a job and connect with verified professionals.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-[4px] text-[11px] font-bold text-white cursor-pointer border border-pink-500/30 bg-gradient-to-r from-[#E91E8C] to-[#F472B6] shadow-[0_2px_8px_rgba(233,30,140,0.4)] transition-all duration-300"
          >
            Post a Job
          </motion.button>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-[4px] bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md shadow-inner group-hover:bg-white/10 transition-colors">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <BusinessCenterIcon sx={{ fontSize: 24 }} className="text-white/80 drop-shadow-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  )
})

export default function ActivityBoardMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredItems = activeFilter === 'all'
    ? ACTIVITY_ITEMS
    : ACTIVITY_ITEMS.filter(item => item.tag.toLowerCase() === activeFilter.toLowerCase())

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
    setExpandedId(prev => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-gray-50/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none @container outline-none">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-5xl mx-auto w-full">
          <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
        </div>
      </div>

      <div className="w-full pt-0 pb-16 max-w-5xl mx-auto px-3">
        <AnimatePresence mode="wait">
          {displayedItems.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 mb-3 rounded-[4px] bg-white shadow-sm border border-gray-100 flex items-center justify-center"
              >
                <span className="text-xl">📭</span>
              </motion.div>
              <h3 className="text-sm font-bold text-[#1f1633] mb-0.5">No activities found</h3>
              <p className="text-xs text-gray-500">There are no matching items in this category.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              className="flex flex-col"
            >
              {displayedItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ActivityCard 
                    item={item} 
                    index={index} 
                    isExpanded={expandedId === item.id}
                    onToggle={() => handleToggleExpand(item.id)}
                  />
                  {index === 3 && displayedItems.length > 3 && (
                    <AdvertisementBlock />
                  )}
                </React.Fragment>
              ))}
              <SponsoredBlock />
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && displayedItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex justify-center mt-4 mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={14} sx={{ color: 'inherit' }} />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <AutorenewIcon sx={{ fontSize: 16 }} className="group-hover:rotate-180 transition-transform duration-700" />
                  <span>Load More Opportunities</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {displayedItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 mt-6"
          >
            <ActivityBoardWidgets />
            <HiringCTA />
          </motion.div>
        )}
      </div>
    </div>
  )
}