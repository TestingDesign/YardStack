import { useState, useCallback, useRef, memo } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

import ActivityTabs from './ActivityTabs'
import { ACTIVITY_ITEMS, type ActivityItem } from './data'

const ITEMS_PER_PAGE = 16

interface ActivityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
}

const SkeletonCard = () => (
  <div className="relative flex flex-col rounded-lg border border-gray-100 bg-white p-3 min-h-[80px]">
    <div className="flex items-start gap-2.5 w-full">
      <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse shrink-0" />
      <div className="flex flex-col w-full py-0.5 mt-0.5 gap-2.5">
        <div className="h-3 bg-gray-200 rounded-md animate-pulse w-1/3" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
        <div className="flex gap-2 mt-1">
          <div className="h-3.5 bg-gray-200 rounded-sm animate-pulse w-12" />
          <div className="h-3.5 bg-gray-200 rounded-sm animate-pulse w-24" />
        </div>
      </div>
    </div>
  </div>
)

const DesktopExpandingCard = memo(function DesktopExpandingCard({ item, index, isExpanded, onToggle }: ActivityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<'top' | 'bottom'>(index < 2 ? 'bottom' : 'top')
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

  if (isDismissed) return null

  return (
    <div 
      className="flex flex-col relative shrink-0 mb-3 group/card animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {isDismissing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 transition-all duration-300">
          <p className="text-[12px] font-bold text-[#1f1633] mb-2.5">Not interested in this post?</p>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
              className="px-4 py-1.5 rounded-md text-[11px] font-bold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer border-none shadow-sm"
            >
              Yes
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsDismissing(false); }}
              className="px-4 py-1.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer border-none shadow-sm"
            >
              No
            </button>
          </div>
        </div>
      )}

      <div
        style={{ backgroundColor: item.cardBg || '#FFFFFF' }}
        className={`relative flex flex-col rounded-lg transition-all duration-300 ease-out border p-3 min-h-[80px] z-10 hover:-translate-y-1 hover:border-[#6a5fc1]/30 hover:shadow-[0_12px_32px_rgba(106,95,193,0.15)] ${
          isExpanded ? 'border-[#6a5fc1]/50 shadow-[0_8px_24px_rgba(106,95,193,0.12)] bg-gray-50/80 scale-[1.01]' : 'border-gray-100 shadow-sm'
        }`}
      >
        <div className="absolute top-2 right-2 bottom-2 z-20 flex flex-col items-end justify-between pointer-events-none">
          <div className="flex items-center pointer-events-auto">
            <button
              onClick={(e) => { e.stopPropagation(); setIsDismissing(true); }}
              className="flex items-center justify-center p-1 rounded-md text-red-500 bg-transparent border-none hover:bg-red-50 hover:scale-110 transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 cursor-pointer"
              aria-label="Not Interested"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <div
              ref={saveBtnRef}
              onMouseEnter={handleTooltipPosition}
              className="relative group/save flex items-center justify-center transition-opacity duration-300"
            >
              <button
                onClick={toggleSave}
                className="flex items-center justify-center p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 transition-colors text-[#6a5fc1] bg-transparent border-none hover:bg-gray-100 cursor-pointer"
                aria-label={isSaved ? "Saved" : "Save"}
              >
                {isSaved ? <BookmarkIcon sx={{ fontSize: 16 }} /> : <BookmarkBorderIcon sx={{ fontSize: 16 }} />}
              </button>
              <span
                className={`absolute right-0 px-2 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-sm opacity-0 group-hover/save:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] ${
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

            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white hover:bg-pink-50 rounded border border-pink-500/20 text-pink-600 font-bold text-[9px] md:text-[10px] transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 pointer-events-auto shadow-sm cursor-pointer hover:shadow hover:border-pink-500/40"
            >
              {isExpanded ? 'Hide' : 'View'}
              <KeyboardArrowDownIcon
                sx={{ fontSize: 14 }}
                className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2.5 w-full overflow-hidden pr-24">
          <div className="flex flex-col items-center shrink-0">
            <div className="relative group/logo cursor-pointer" onClick={onToggle}>
              {item.logoImg ? (
                <img
                  src={item.logoImg}
                  alt={item.company}
                  className="w-12 h-12 rounded-md object-cover border border-black/5 transition-transform duration-500 group-hover/logo:scale-105"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center border border-black/5 transition-transform duration-500 group-hover/logo:scale-105"
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
            </div>
          </div>

          <div className="flex flex-col min-w-0 w-full py-0.5 cursor-pointer" onClick={onToggle}>
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-semibold text-[#1f1633] truncate">
                {item.company}
              </span>
              {item.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
            </div>

            <h3 className="font-bold text-[#1f1633] mt-0.5 leading-snug truncate text-[13px]">
              {item.title}
            </h3>

            <div className="flex items-center w-full mt-1.5 gap-1.5 min-w-0">
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
        className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-top ${
          isExpanded ? 'max-h-[400px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
        }`}
      >
        <div className="mx-2 p-4 pt-5 -mt-2 bg-gradient-to-b from-gray-50/80 to-white rounded-b-lg border border-t-0 border-gray-100 flex flex-col relative z-0 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <div className="flex items-start gap-2 text-[12px] text-gray-600 leading-relaxed mb-4">
            <BusinessCenterIcon sx={{ fontSize: 16 }} className="text-[#6a5fc1] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1f1633] block mb-1">Role Overview</span>
              We are actively looking for highly motivated candidates and agencies specializing in <strong className="text-[#1f1633]">{item.tag}</strong> to fulfill the core requirements for the <strong className="text-[#1f1633]">{item.title}</strong> position. You will be working closely with our cross-functional teams to deliver high-quality results.
            </div>
          </div>

          <div className="pl-5 text-[12px] text-gray-600 border-l-2 border-[#6a5fc1]/20 ml-2 mb-4">
            <ul className="list-disc pl-3 space-y-1.5 marker:text-[#6a5fc1]">
              <li><strong className="text-[#1f1633]">Budget:</strong> {item.detail}</li>
              <li>Proven experience working in a fast-paced environment.</li>
              <li>Strong portfolio demonstrating your expertise in <strong>{item.tag}</strong>.</li>
              <li>Excellent communication skills and ability to work independently.</li>
            </ul>
          </div>

          <div className="mt-2 flex justify-end">
            <button className="
              px-5 py-2 rounded-md text-[12px] font-bold text-white cursor-pointer border-none
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

const AdsViewPlaceholder = () => (
  <div className="flex flex-col gap-4 h-full">
    <div className="bg-gray-50 border border-gray-200 rounded-[8px] flex flex-col items-center justify-center flex-1 min-h-[300px]">
      <div className="text-center text-gray-400">
        <span className="block text-2xl mb-2 font-bold opacity-60">Advertisement</span>
        <span className="text-sm opacity-50">700 x 800 Area</span>
      </div>
    </div>
    <div className="bg-gray-50 border border-gray-200 rounded-[4px] flex flex-col items-center justify-center flex-1 min-h-[200px]">
      <div className="text-center text-gray-400">
        <span className="block text-xl mb-2 font-bold opacity-60">Sponsored Content</span>
        <span className="text-sm opacity-50">Recommended</span>
      </div>
    </div>
  </div>
)

export default function ActivityBoardDesktop() {
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
    }, 800)
  }

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none outline-none overflow-hidden">
      <div className="sticky top-0 z-30 bg-white backdrop-blur-xl shrink-0 border-b border-gray-100">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full flex-1 overflow-hidden max-w-[1600px] mx-auto">
        <div className="grid grid-cols-10 h-full p-4 lg:py-5 lg:px-6 gap-6">
          {/* Left Content (70%) */}
          <div className="col-span-10 lg:col-span-7 flex flex-col h-full overflow-y-auto pb-12 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {displayedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                <div className="w-14 h-14 mb-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <span className="text-2xl">📭</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1f1633] mb-1">No activities found</h3>
                <p className="text-[13px] text-gray-500">There are no matching items in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-2 auto-rows-max w-[80%] max-w-100 mx-auto">
                  {displayedItems.map((item, index) => (
                    <DesktopExpandingCard
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
                      <SkeletonCard />
                    </>
                  )}
                </div>

                {hasMore && !isLoading && (
                  <div className="flex justify-center mt-8 mb-4 w-full col-span-full">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="
                        flex items-center justify-center gap-2 px-8 py-3 min-w-40
                        text-[13px] font-bold text-white rounded-lg cursor-pointer border-none
                        bg-[#6a5fc1] hover:bg-[#5b51a6] transition-colors
                        disabled:opacity-70 disabled:cursor-not-allowed
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
              </>
            )}
          </div>

          {/* Right Content - Ads View (30%) */}
          <div className="col-span-3 hidden lg:flex flex-col h-full overflow-hidden pb-4">
            <AdsViewPlaceholder />
          </div>
        </div>
      </div>
    </div>
  )
}