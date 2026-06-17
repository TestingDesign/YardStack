import { useState, useCallback, useRef, memo } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CircularProgress from '@mui/material/CircularProgress'

import ActivityTabs from './ActivityTabs'
import { ACTIVITY_ITEMS, type ActivityItem } from './data'

const ITEMS_PER_PAGE = 15

interface ActivityCardProps {
  item: ActivityItem
  index: number
  isSelected: boolean
  onSelect: (id: string) => void
  isSplitMode: boolean
}

const SkeletonCard = ({ isSplitMode }: { isSplitMode: boolean }) => (
  <div className={`relative flex flex-col rounded-lg border border-gray-100 bg-white p-3 min-h-[80px] ${isSplitMode ? 'p-2.5 min-h-[72px]' : ''}`}>
    <div className="flex items-start gap-2.5 w-full">
      <div className={`${isSplitMode ? 'w-10 h-10' : 'w-12 h-12'} rounded-md bg-gray-200 animate-pulse shrink-0`} />
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

const JobDetailSkeleton = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
    <div className="flex-none flex items-center justify-between py-2 px-4 border-b border-gray-100 bg-gray-50/50 z-10">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center p-1.5 rounded-md text-gray-400">
          <OpenInNewIcon sx={{ fontSize: 16 }} />
        </button>
        <button onClick={onClose} className="flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-4 font-['Outfit',sans-serif]">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-lg bg-gray-200 animate-pulse shrink-0 mt-1" />
        <div className="flex flex-col w-full">
          <div className="flex items-start justify-between gap-3 w-full">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-2" />
            <div className="h-8 bg-gray-200 rounded-md animate-pulse w-28 shrink-0" />
          </div>
          <div className="flex gap-2 mt-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-5 bg-gray-200 rounded-md animate-pulse w-16" />
            <div className="h-5 bg-gray-200 rounded-md animate-pulse w-20" />
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-8">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-4" />
          <div className="space-y-2.5">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
          </div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mb-4" />
          <div className="space-y-2.5">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const DesktopActivityCard = memo(function DesktopActivityCard({ item, index, isSelected, onSelect, isSplitMode }: ActivityCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isDismissing, setIsDismissing] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<'top' | 'bottom'>(index < 3 ? 'bottom' : 'top')
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
    <div className="flex flex-col relative shrink-0">
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
        onClick={() => onSelect(item.id)}
        style={{ backgroundColor: item.cardBg || '#FFFFFF' }}
        className={`relative flex flex-col rounded-lg transition-all ease-out cursor-pointer border ${
          isSplitMode ? 'p-2.5 min-h-[72px]' : 'p-3 min-h-[80px]'
        } ${
          isSelected 
            ? 'border-[#6a5fc1] shadow-[0_0_0_1px_rgba(106,95,193,0.15)] bg-gray-50/80' 
            : 'border-gray-100 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="absolute top-2 right-2 bottom-2 z-20 flex flex-col items-end justify-between pointer-events-none">
          <div className="flex items-center gap-0.5 pointer-events-auto">
            <div
              ref={saveBtnRef}
              onMouseEnter={handleTooltipPosition}
              className="relative group/save flex items-center justify-center"
            >
              <button
                onClick={toggleSave}
                className="flex items-center justify-center p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50 transition-colors text-[#6a5fc1] bg-transparent border-none hover:bg-gray-100 cursor-pointer"
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

            {!isSelected && (
              <button
                onClick={(e) => { e.stopPropagation(); setIsDismissing(true); }}
                className="flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Not Interested"
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2.5 w-full overflow-hidden pr-14">
          {item.logoImg ? (
            <img
              src={item.logoImg}
              alt={item.company}
              className={`${isSplitMode ? 'w-10 h-10' : 'w-12 h-12'} rounded-md object-cover shrink-0 border border-black/5`}
            />
          ) : (
            <div
              className={`${isSplitMode ? 'w-10 h-10' : 'w-12 h-12'} rounded-md flex items-center justify-center shrink-0 border border-black/5`}
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
              <span className="text-[11px] font-semibold text-[#1f1633] truncate">
                {item.company}
              </span>
              {item.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
            </div>

            <h3 className={`font-bold text-[#1f1633] mt-0.5 leading-snug truncate ${isSplitMode ? 'text-[12px]' : 'text-[13px]'}`}>
              {item.title}
            </h3>

            <div className="flex items-center w-full mt-1.5 gap-1.5 min-w-0">
              <span
                className="px-1.5 py-0.5 rounded-sm text-[8px] font-bold tracking-wide uppercase shrink-0"
                style={{ backgroundColor: item.tagBg, color: item.tagColor }}
              >
                {item.tag}
              </span>
              <span className="text-[9px] font-medium text-gray-500 truncate">
                {item.detail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const JobDetailPane = ({ item, onClose }: { item: ActivityItem, onClose: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="flex-none flex items-center justify-between py-2 px-4 border-b border-gray-100 bg-gray-50/50 z-10">
        <h2 className="text-[13px] font-bold text-[#1f1633]">Job Details</h2>
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center p-1.5 rounded-md text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer border-none bg-transparent">
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </button>
          <button 
            onClick={onClose}
            className="flex items-center justify-center p-1.5 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer border-none bg-transparent"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-4 font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <div className="flex items-start gap-4 mb-6">
          {item.logoImg ? (
            <img
              src={item.logoImg}
              alt={item.company}
              className="w-14 h-14 rounded-lg object-cover shrink-0 border border-black/5 shadow-sm mt-1"
            />
          ) : (
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 border border-black/5 shadow-sm mt-1"
              style={{ backgroundColor: item.logoBg, color: item.logoColor }}
            >
              <span
                className="text-center font-bold text-[13px] leading-tight whitespace-pre-wrap tracking-wide"
                style={{ color: item.logoColor }}
              >
                {item.logoText}
              </span>
            </div>
          )}
          
          <div className="flex flex-col w-full min-w-0">
            <div className="flex items-start justify-between gap-3 w-full">
              <h1 className="text-lg font-bold text-[#1f1633] leading-tight mb-1 truncate whitespace-normal break-words">
                {item.title}
              </h1>
              
              {/* CLEANED UP: Apply / Connect button */}
              <button className="
                shrink-0 flex items-center justify-center px-4 py-1.5 rounded-md text-[11px] font-bold text-white cursor-pointer border-none
                bg-pink-500 hover:bg-pink-600 transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50
              ">
                Apply / Connect
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 text-[12px] text-gray-600 font-medium mb-3 mt-1">
              <span>{item.company}</span>
              {item.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" />}
              <span className="text-gray-300">•</span>
              <span>{item.detail}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2 py-1 rounded-md text-[9px] font-bold tracking-wide uppercase shrink-0"
                style={{ backgroundColor: item.tagBg, color: item.tagColor }}
              >
                {item.tag}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[9px] font-bold tracking-wide uppercase shrink-0">
                Full-Time
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5 text-[13px] text-gray-600 leading-relaxed pb-4">
          <div>
            <h3 className="flex items-center gap-1.5 font-bold text-[#1f1633] text-[13px] border-b border-gray-100 pb-1.5 mb-2.5">
              <BusinessCenterIcon sx={{ fontSize: 16 }} className="text-[#6a5fc1]" />
              Role Overview
            </h3>
            <p>
              We are actively looking for highly motivated candidates and agencies specializing in <strong className="text-[#1f1633]">{item.tag}</strong> to fulfill the core requirements for the <strong className="text-[#1f1633]">{item.title}</strong> position. You will be working closely with our cross-functional teams to deliver high-quality results.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#1f1633] text-[13px] border-b border-gray-100 pb-1.5 mb-2.5">
              Key Requirements
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[#6a5fc1]">
              <li>Proven experience working in a fast-paced environment.</li>
              <li>Strong portfolio demonstrating your expertise in <strong>{item.tag}</strong>.</li>
              <li>Excellent communication skills and ability to work independently.</li>
              <li>Familiarity with industry-standard tools and workflows.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1f1633] text-[13px] border-b border-gray-100 pb-1.5 mb-2.5">
              Compensation & Benefits
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-[#6a5fc1]">
              <li><strong className="text-[#1f1633]">Budget / Salary:</strong> {item.detail}</li>
              <li>Flexible working hours and remote-friendly culture.</li>
              <li>Comprehensive health and wellness benefits.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ActivityBoardDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [detailLoadingId, setDetailLoadingId] = useState<string | null>(null)

  const filteredItems = activeFilter === 'all'
    ? ACTIVITY_ITEMS
    : ACTIVITY_ITEMS.filter(item => item.tag.toLowerCase() === activeFilter.toLowerCase())

  const displayedItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length
  
  const selectedItem = ACTIVITY_ITEMS.find(i => i.id === selectedItemId)
  const isSplitMode = selectedItemId !== null

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setVisibleCount(ITEMS_PER_PAGE)
    setSelectedItemId(null)
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 800)
  }

  const handleSelectCard = useCallback((id: string) => {
    setSelectedItemId(id)
    setDetailLoadingId(id)
    setTimeout(() => {
      setDetailLoadingId(null)
    }, 500) 
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-white font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none outline-none overflow-hidden">
      <div className="sticky top-0 z-30 bg-white backdrop-blur-xl  shrink-0">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className={`w-full flex-1 ${isSplitMode ? 'overflow-hidden' : 'overflow-y-auto'} max-w-[1600px] mx-auto`}>
        <div className={`h-full ${isSplitMode ? 'p-4 lg:py-5 lg:px-6' : 'py-5 px-4 md:px-6 lg:px-8 pb-12'}`}>
          {displayedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
              <div className="w-14 h-14 mb-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <span className="text-2xl">📭</span>
              </div>
              <h3 className="text-[15px] font-bold text-[#1f1633] mb-1">No activities found</h3>
              <p className="text-[13px] text-gray-500">There are no matching items in this category.</p>
            </div>
          ) : (
            <div className="h-full relative">
              {isSplitMode ? (
                <div className="flex items-start gap-4 lg:gap-5 h-full relative">
                  <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 flex flex-col gap-2 h-full overflow-y-auto pb-6 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                    {displayedItems.map((item, index) => (
                      <DesktopActivityCard 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        isSelected={selectedItemId === item.id}
                        onSelect={handleSelectCard}
                        isSplitMode={true}
                      />
                    ))}
                    
                    {isLoading && (
                      <div className="flex flex-col gap-2">
                        <SkeletonCard isSplitMode={true} />
                        <SkeletonCard isSplitMode={true} />
                        <SkeletonCard isSplitMode={true} />
                      </div>
                    )}

                    {hasMore && !isLoading && (
                      <div className="flex justify-center mt-2 mb-2">
                        {/* CLEANED UP: Load More button (split view) */}
                        <button
                          onClick={handleLoadMore}
                          disabled={isLoading}
                          className="
                            flex items-center justify-center gap-2 px-6 py-2.5 w-full
                            text-xs font-bold text-white rounded-md cursor-pointer border-none
                            bg-[#6a5fc1] hover:bg-[#5b51a6] transition-colors
                            disabled:opacity-70 disabled:cursor-not-allowed
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/70
                          "
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="hidden lg:flex flex-col flex-1 h-full overflow-hidden pb-4">
                    {detailLoadingId === selectedItem?.id ? (
                      <JobDetailSkeleton onClose={() => setSelectedItemId(null)} />
                    ) : (
                      <JobDetailPane item={selectedItem!} onClose={() => setSelectedItemId(null)} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                    {displayedItems.map((item, index) => (
                      <DesktopActivityCard 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        isSelected={false}
                        onSelect={handleSelectCard}
                        isSplitMode={false}
                      />
                    ))}
                    
                    {isLoading && (
                      <>
                        <SkeletonCard isSplitMode={false} />
                        <SkeletonCard isSplitMode={false} />
                        <SkeletonCard isSplitMode={false} />
                      </>
                    )}
                  </div>

                  {hasMore && (
                    <div className="flex justify-center mt-8 mb-4">
                      {/* CLEANED UP: Load More button (grid view) */}
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}