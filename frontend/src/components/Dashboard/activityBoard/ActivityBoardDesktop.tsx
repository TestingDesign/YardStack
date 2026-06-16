import { useState, useCallback, useRef, memo } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CircularProgress from '@mui/material/CircularProgress'

import ActivityTabs from './ActivityTabs'
import { ACTIVITY_ITEMS, type ActivityItem } from './data'

const ITEMS_PER_PAGE = 8

interface ActivityCardProps {
  item: ActivityItem
  index: number
}

const DesktopActivityCard = memo(function DesktopActivityCard({ item, index }: ActivityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<'top' | 'bottom'>(index === 0 ? 'bottom' : 'top')
  const saveBtnRef = useRef<HTMLDivElement>(null)

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  const handleTooltipPosition = () => {
    if (saveBtnRef.current) {
      const rect = saveBtnRef.current.getBoundingClientRect()
      setTooltipPos(rect.top < 120 ? 'bottom' : 'top')
    }
  }

  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundColor: item.cardBg || '#FFFFFF' }}
        className="relative flex flex-col p-3 border border-gray-100 rounded-lg transition-colors min-h-20 ease-out hover:border-gray-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
      >
        <div className="absolute top-2 right-2 bottom-2 z-20 flex flex-col items-end justify-between pointer-events-none">
          <div className="flex items-center pointer-events-auto">
            <div
              ref={saveBtnRef}
              onMouseEnter={handleTooltipPosition}
              className="relative group/save flex items-center justify-center"
            >
              <button
                onClick={toggleSave}
                className="flex items-center justify-center p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 transition-transform duration-300 active:scale-90 text-[#6a5fc1] bg-transparent border-none hover:bg-gray-50"
                aria-label={isSaved ? "Saved" : "Save"}
              >
                {isSaved ? <BookmarkIcon sx={{ fontSize: 16 }} /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
              </button>
              <span
                className={`absolute right-0 px-2 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-sm opacity-0 group-hover/save:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-100 ${
                  tooltipPos === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
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
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="flex items-center gap-0.5 px-2 py-1 bg-white hover:bg-gray-50 rounded-md border border-pink-500/20 text-pink-600 font-bold text-[10px] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 pointer-events-auto shadow-sm cursor-pointer"
          >
            {isExpanded ? 'Hide' : 'View'}
            <KeyboardArrowDownIcon
              sx={{ fontSize: 14 }}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div className="flex items-start gap-2.5 w-full overflow-hidden pr-12">
          {item.logoImg ? (
            <img
              src={item.logoImg}
              alt={item.company}
              className="w-12 h-12 rounded-md object-cover shrink-0 border border-black/5"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-md flex items-center justify-center shrink-0 border border-black/5"
              style={{ backgroundColor: item.logoBg, color: item.logoColor }}
            >
              <span
                className="text-center font-bold text-[10px] leading-tight whitespace-pre-wrap tracking-wide"
                style={{ color: item.logoColor }}
              >
                {item.logoText}
              </span>
            </div>
          )}

          <div className="flex flex-col min-w-0 w-full py-0.5">
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-semibold text-[#1f1633] truncate">
                {item.company}
              </span>
              {item.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
            </div>

            <h3 className="text-[13px] font-bold text-[#1f1633] mt-0.5 leading-snug truncate">
              {item.title}
            </h3>

            <div className="flex items-center w-full mt-2 gap-1.5 min-w-0">
              <span
                className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold tracking-wide uppercase shrink-0"
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

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden transform origin-top ${
          isExpanded ? 'max-h-56 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
        }`}
      >
        <div className="mx-2 p-3 pt-4 -mt-2 bg-gray-50/50 rounded-b-lg border border-t-0 border-gray-100 flex flex-col relative z-0">
          <div className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
            <BusinessCenterIcon sx={{ fontSize: 14 }} className="text-[#6a5fc1] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f1633] block mb-0.5">Role Overview</span>
              We are actively looking for candidates/agencies specializing in <strong className="text-[#1f1633]">{item.tag}</strong> to fulfill the requirements for <strong className="text-[#1f1633]">{item.title}</strong>.
            </div>
          </div>

          <div className="pl-4 text-[11px] text-gray-500 border-l-2 border-gray-200 ml-1.5 mt-2">
            <ul className="list-disc pl-3 space-y-0.5 marker:text-gray-300">
              <li><strong className="text-gray-600">Budget:</strong> {item.detail}</li>
              <li><strong className="text-gray-600">Company:</strong> {item.company} {item.verified ? '(Verified)' : ''}</li>
              <li>Portfolio and relevant experience required.</li>
            </ul>
          </div>

          <div className="mt-3 flex justify-end">
            <button className="
              px-4 py-1.5 rounded-md text-[11px] font-bold text-white cursor-pointer border-none
              bg-linear-to-r from-pink-500 to-rose-500
              hover:from-rose-500 hover:to-pink-500
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

export default function ActivityBoardDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  const filteredItems = activeFilter === 'all'
    ? ACTIVITY_ITEMS
    : ACTIVITY_ITEMS.filter(item => item.tag.toLowerCase() === activeFilter.toLowerCase())

  const displayedItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setVisibleCount(ITEMS_PER_PAGE)
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none @container outline-none">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full pt-1 pb-10 max-w-6xl mx-auto px-6">
        {displayedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 mb-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
              <span className="text-xl">📭</span>
            </div>
            <h3 className="text-sm font-bold text-[#1f1633] mb-0.5">No activities found</h3>
            <p className="text-xs text-gray-500">There are no matching items in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {displayedItems.map((item, index) => (
              <DesktopActivityCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-5 mb-4">
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
