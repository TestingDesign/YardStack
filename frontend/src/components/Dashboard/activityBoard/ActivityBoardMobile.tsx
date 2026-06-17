import { useState, useCallback, useRef, memo, useEffect } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import ActivityTabs from './ActivityTabs'
import { ACTIVITY_ITEMS, type ActivityItem } from './data'

const ITEMS_PER_PAGE = 8

interface ActivityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
}

const ActivityCard = memo(function ActivityCard({ item, index, isExpanded, onToggle }: ActivityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<'top' | 'bottom'>(index === 0 ? 'bottom' : 'top')
  const [isVisible, setIsVisible] = useState(false)

  const startX = useRef(0)
  const initialOffset = useRef(0)
  const maxSwipe = 80
  const saveBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50)
    return () => clearTimeout(timer)
  }, [index])

  const handleTouchStart = (e: React.TouchEvent) => {
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

  return (
    <div 
      className={`relative mb-2.5 transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative z-10 rounded-lg group/card">
        <div className="absolute inset-y-0 right-0 w-20 bg-red-500 rounded-r-lg flex flex-col items-center justify-center text-white z-0 overflow-hidden">
          <button
            type="button"
            className="flex flex-col items-center justify-center w-full h-full active:bg-red-600 transition-colors border-none outline-none cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            onClick={() => console.log('Not Interested in', item.id)}
          >
            <CloseIcon sx={{ fontSize: 20 }} className="mb-0.5 hover:scale-110 transition-transform duration-300" />
            <span className="text-[9px] font-bold px-2 text-center leading-tight">
              Not<br />Interested
            </span>
          </button>
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${swipeOffset}px)`,
            transitionDuration: isSwiping ? '0ms' : '400ms',
            transitionTimingFunction: isSwiping ? 'linear' : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            backgroundColor: item.cardBg || '#FFFFFF'
          }}
          className="relative flex flex-col p-2.5 @md:p-3 border border-gray-100 rounded-lg z-10 transition-colors min-h-20 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="absolute top-2 right-2 bottom-2 z-20 flex flex-col items-end justify-between pointer-events-none">
            <div className="flex items-center pointer-events-auto">
              <button
                onClick={toggleSwipe}
                className={`flex items-center justify-center p-1 rounded-md text-red-500 bg-transparent border-none hover:bg-red-50 hover:scale-110 transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 cursor-pointer ${
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
                <button
                  onClick={toggleSave}
                  className={`flex items-center justify-center p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 transition-all duration-300 active:scale-90 text-[#6a5fc1] bg-transparent border-none hover:bg-gray-50 hover:scale-110 cursor-pointer ${
                    isSaved ? 'scale-110' : ''
                  }`}
                  aria-label={isSaved ? "Saved" : "Save"}
                >
                  {isSaved ? <BookmarkIcon sx={{ fontSize: 16 }} className="drop-shadow-sm" /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
                </button>

                <span
                  className={`absolute right-0 px-2 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-sm opacity-0 group-hover/save:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-100 ${
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

              <button
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className={`flex items-center gap-0.5 px-1.5 py-0.5 bg-white hover:bg-pink-50 rounded border border-pink-500/20 text-pink-600 font-bold text-[9px] @md:text-[10px] transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 pointer-events-auto shadow-sm cursor-pointer hover:shadow hover:border-pink-500/40 ${
                  swipeOffset < -10 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                {isExpanded ? 'Hide' : 'View'}
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 12 }}
                  className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 w-full overflow-hidden pr-20">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group/logo">
                {item.logoImg ? (
                  <img
                    src={item.logoImg}
                    alt={item.company}
                    className="w-10 h-10 @md:w-12 @md:h-12 rounded-md object-cover border border-black/5 transition-transform duration-500 group-hover/logo:scale-105"
                  />
                ) : (
                  <div
                    className="w-10 h-10 @md:w-12 @md:h-12 rounded-md flex items-center justify-center border border-black/5 transition-transform duration-500 group-hover/logo:scale-105"
                    style={{ backgroundColor: item.logoBg, color: item.logoColor }}
                  >
                    <span
                      className="text-center font-bold text-[9px] @md:text-[10px] leading-tight whitespace-pre-wrap tracking-wide"
                      style={{ color: item.logoColor }}
                    >
                      {item.logoText}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover/logo:bg-black/5 transition-colors rounded-md pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col min-w-0 w-full py-0.5 transition-transform duration-300 group-hover/card:translate-x-0.5">
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
                <span
                  className="px-1.5 py-0.5 rounded-sm text-[8px] @md:text-[9px] font-bold tracking-wide uppercase shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                >
                  {item.tag}
                </span>
                <span className="text-[10px] font-medium text-gray-500 truncate">
                  {item.detail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-top ${
          isExpanded ? 'max-h-56 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
        }`}
      >
        <div className="mx-2 p-3 pt-4 -mt-2 bg-gradient-to-b from-gray-50/80 to-white rounded-b-lg border border-t-0 border-gray-100 flex flex-col relative z-0 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <div className="flex items-start gap-2 text-[10px] @md:text-[11px] text-gray-500 leading-relaxed">
            <BusinessCenterIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f1633] block mb-0.5">Role Overview</span>
              We are actively looking for candidates/agencies specializing in <strong className="text-[#1f1633]">{item.tag}</strong> to fulfill the requirements for <strong className="text-[#1f1633]">{item.title}</strong>.
            </div>
          </div>

          <div className="pl-4 text-[10px] @md:text-[11px] text-gray-500 border-l-2 border-[#6a5fc1]/20 ml-1.5 mt-3 transition-colors duration-300 hover:border-[#6a5fc1]/50">
            <ul className="list-disc pl-3 space-y-1 marker:text-gray-300">
              <li><strong className="text-gray-600">Budget:</strong> {item.detail}</li>
              <li><strong className="text-gray-600">Company:</strong> {item.company} {item.verified ? '(Verified)' : ''}</li>
              <li>Portfolio and relevant experience required.</li>
            </ul>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="
              px-4 py-1.5 rounded-md text-[10px] @md:text-[11px] font-bold text-white cursor-pointer border-none
              bg-linear-to-r from-pink-500 to-rose-500 bg-size-[200%_auto]
              hover:bg-position-[100%_center] hover:scale-[1.02]
              shadow-[0_2px_8px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_12px_rgba(225,29,72,0.35)]
              transition-all duration-300 active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50
            ">
              Apply / Connect
            </button>
          </div>
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
    <div className="flex-1 w-full h-full overflow-y-auto bg-gray-50/30 font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none @container outline-none">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full pt-2 pb-16 max-w-5xl mx-auto px-3">
        {displayedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-12 h-12 mb-3 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center">
              <span className="text-xl">📭</span>
            </div>
            <h3 className="text-sm font-bold text-[#1f1633] mb-0.5">No activities found</h3>
            <p className="text-xs text-gray-500">There are no matching items in this category.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {displayedItems.map((item, index) => (
              <ActivityCard 
                key={item.id} 
                item={item} 
                index={index} 
                isExpanded={expandedId === item.id}
                onToggle={() => handleToggleExpand(item.id)}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-4 mb-4">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="
                group flex items-center justify-center gap-2 px-6 py-2.5 min-w-35
                text-xs font-bold text-white rounded-md cursor-pointer border-none
                bg-linear-to-r from-[#6a5fc1] via-[#8b5cf6] to-[#6a5fc1] bg-size-[200%_auto]
                shadow-[0_4px_12px_rgba(106,95,193,0.25)]
                hover:bg-position-[100%_center] hover:shadow-[0_6px_16px_rgba(106,95,193,0.4)]
                hover:-translate-y-px hover:scale-[1.02]
                transition-all duration-500 ease-out active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none
                disabled:hover:shadow-[0_4px_12px_rgba(106,95,193,0.25)] disabled:hover:bg-position-[0%_center]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/70
              "
            >
              {isLoading ? (
                <>
                  <CircularProgress size={14} sx={{ color: 'white' }} />
                  <span>Loading...</span>
                </>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}