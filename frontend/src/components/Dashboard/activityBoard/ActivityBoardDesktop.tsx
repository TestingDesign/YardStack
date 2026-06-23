import { useState, useCallback, memo } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import GroupIcon from '@mui/icons-material/Group'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkIcon from '@mui/icons-material/Work'
import CircularProgress from '@mui/material/CircularProgress'
import AutorenewIcon from '@mui/icons-material/Autorenew'

import ActivityTabs from './ActivityTabs'
import {
  ACTIVITY_ITEMS,
  TOP_COMPANIES,
  type ActivityItem,
} from './data'

const ITEMS_PER_PAGE = 10

interface OpportunityCardProps {
  item: ActivityItem
  index: number
  isExpanded: boolean
  onToggle: () => void
}

const SkeletonCard = () => (
  <div className="relative flex flex-col rounded-xl border border-gray-100 bg-white p-4 min-h-[80px]">
    <div className="flex items-start gap-3 w-full">
      <div className="w-14 h-14 rounded-lg bg-gray-200 animate-pulse shrink-0" />
      <div className="flex flex-col w-full py-0.5 mt-0.5 gap-2.5">
        <div className="h-3 bg-gray-200 rounded-md animate-pulse w-1/3" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
        <div className="flex gap-2 mt-1">
          <div className="h-3.5 bg-gray-200 rounded-sm animate-pulse w-16" />
          <div className="h-3.5 bg-gray-200 rounded-sm animate-pulse w-24" />
        </div>
      </div>
    </div>
  </div>
)

const OpportunityCard = memo(function OpportunityCard({
  item,
  index,
  isExpanded,
  onToggle,
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
    <div
      className="flex flex-col relative shrink-0 group/card animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {isDismissing && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 transition-all duration-300">
          <p className="text-[13px] font-bold text-[#1f1633] mb-3">
            Not interested in this opportunity?
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDismissed(true)
              }}
              className="px-5 py-2 rounded-lg text-[12px] font-bold bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer border-none shadow-sm"
            >
              Yes, Remove
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDismissing(false)
              }}
              className="px-5 py-2 rounded-lg text-[12px] font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer border-none shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        className={`relative rounded-xl transition-all duration-300 ease-out border bg-white overflow-hidden ${
          isExpanded
            ? 'border-[#E91E8C]/30 shadow-[0_8px_32px_rgba(233,30,140,0.08)]'
            : 'border-gray-200 shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gray-300'
        }`}
      >
        <div className="flex">
          <div
            className="flex-1 p-4 cursor-pointer min-w-0"
            onClick={onToggle}
          >
            <div className="flex items-start gap-3.5">
              <div className="shrink-0">
                {item.logoImg ? (
                  <img
                    src={item.logoImg}
                    alt={item.company}
                    className="w-12 h-12 rounded-lg object-cover border border-black/5"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center border border-black/5"
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
                  <span className="text-[13px] font-semibold text-gray-800 truncate">
                    {item.company}
                  </span>
                  {item.verified && (
                    <VerifiedIcon
                      sx={{ fontSize: 14 }}
                      className="text-blue-500 shrink-0"
                    />
                  )}
                  {item.hiringBadge && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-green-500 text-white shrink-0 ml-1">
                      HIRING
                    </span>
                  )}
                </div>

                <h3 className="text-[16px] font-bold text-[#1f1633] leading-snug truncate">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 mt-1.5 text-[12px] text-gray-500 flex-wrap">
                  <span className="font-semibold text-gray-700">
                    {item.salary}
                  </span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <span className="flex items-center gap-0.5">
                    <LocationOnIcon sx={{ fontSize: 13 }} className="text-gray-400" />
                    {item.location}
                  </span>
                  <span className="text-gray-300 mx-0.5">•</span>
                  <span>{item.type}</span>
                </div>

                {isExpanded && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 mt-3">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center -space-x-2">
                        {Array.from({ length: Math.min(item.applicants, 3) }).map(
                          (_, i) => (
                            <img
                              key={i}
                              src={`https://i.pravatar.cc/32?u=${item.id}-${i}`}
                              alt="Applicant"
                              className="w-7 h-7 rounded-full border-2 border-white object-cover"
                            />
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <GroupIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                          {item.applicants} Applicants
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <VisibilityIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                          {item.views} Views
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <AccessTimeIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                          {item.postedAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!isExpanded && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-between py-4 px-4 border-l border-gray-100 w-[160px]">
            {isExpanded ? (
              <div className="flex flex-col items-center gap-2.5 w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="w-full px-5 py-2 rounded-[4px] text-[12px] font-bold text-white cursor-pointer border-none bg-linear-to-r from-pink-500 to-rose-500 bg-size-[200%_auto] hover:bg-position-[100%_center] hover:scale-[1.02] shadow-[0_2px_8px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_12px_rgba(225,29,72,0.35)] transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
                >
                  Apply Now
                </button>
                <button
                  onClick={toggleSave}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-[2px] text-[12px] font-semibold text-gray-700 cursor-pointer border border-gray-200 bg-white hover:bg-pink-50 hover:border-pink-200 hover:text-[#E91E8C] hover:shadow-[0_2px_8px_rgba(233,30,140,0.12)] transition-all duration-300"
                >
                  {isSaved ? (
                    <BookmarkIcon sx={{ fontSize: 16 }} className="text-[#E91E8C]" />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                  )}
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDismissing(true)
                  }}
                  className="flex items-center justify-center gap-1 w-full py-1.5 rounded-[2px] text-[11px] font-medium text-gray-400 cursor-pointer border-none bg-transparent hover:text-red-500 transition-colors duration-200"
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                  Not Interested
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={toggleSave}
                  className="flex items-center justify-center w-9 h-9 rounded-[2px] text-gray-400 bg-transparent border-none hover:text-[#E91E8C] hover:bg-pink-50 hover:border-pink-200 hover:shadow-[0_2px_8px_rgba(233,30,140,0.12)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
                  aria-label={isSaved ? 'Saved' : 'Save'}
                >
                  {isSaved ? (
                    <BookmarkIcon sx={{ fontSize: 20 }} className="text-[#E91E8C]" />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle()
                  }}
                  className="w-full flex items-center justify-center gap-0.5 py-2 px-2 text-[12px] font-bold text-white rounded-[4px] border-none bg-gradient-to-r from-[#E91E8C] to-[#F472B6] hover:from-[#d11a7d] hover:to-[#ec4899] hover:shadow-[0_4px_12px_rgba(233,30,140,0.3)] shadow-[0_2px_8px_rgba(233,30,140,0.2)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                >
                  View Job
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 16 }}
                    className={`transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

const TopCompaniesHiring = memo(function TopCompaniesHiring() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-bold text-[#1f1633]">
          Top Companies Hiring
        </h3>
        <button className="text-[12px] font-semibold text-[#E91E8C] hover:underline cursor-pointer bg-transparent border-none">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {TOP_COMPANIES.map((company) => (
          <div
            key={company.name}
            className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="shrink-0">
              {company.logoImg ? (
                <img
                  src={company.logoImg}
                  alt={company.name}
                  className="w-9 h-9 rounded-lg object-cover border border-black/5"
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-black/5"
                  style={{
                    backgroundColor: company.logoBg,
                    color: company.logoColor,
                  }}
                >
                  <span
                    className="text-center font-bold text-[7px] leading-tight whitespace-pre-wrap"
                    style={{ color: company.logoColor }}
                  >
                    {company.logoText}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 truncate">
                {company.name}
              </p>
              <p className="text-[11px] text-gray-500">
                {company.openings} Openings
              </p>
            </div>
            <ChevronRightIcon
              sx={{ fontSize: 18 }}
              className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
})

const AdsPlaceholder = memo(function AdsPlaceholder() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="bg-gray-100 border border-gray-200 rounded-xl flex flex-col items-center justify-center flex-1 min-h-[300px]">
        <div className="text-center text-gray-400">
          <span className="block text-2xl mb-2 font-bold opacity-60">Advertisement</span>
          <span className="text-sm opacity-50">700 x 800 Area</span>
        </div>
      </div>
      <div className="bg-gray-100 border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[180px]">
        <div className="text-center text-gray-400">
          <span className="block text-xl mb-2 font-bold opacity-60">Sponsored Content</span>
          <span className="text-sm opacity-50">Recommended</span>
        </div>
      </div>
    </div>
  )
})

const HiringCTA = memo(function HiringCTA() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-5 text-white relative">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-[15px] font-bold mb-1.5">
            Looking to hire top talent?
          </h3>
          <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
            Post a job and connect with verified professionals ready to help
            your business grow.
          </p>
          <button className="px-5 py-2 rounded-lg text-[12px] font-bold text-white cursor-pointer border-none bg-[#E91E8C] hover:bg-[#d11a7d] transition-all duration-300 active:scale-95 shadow-[0_4px_12px_rgba(233,30,140,0.4)]">
            Post a Job
          </button>
        </div>
        <div className="shrink-0 w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
          <WorkIcon sx={{ fontSize: 32 }} className="text-white/60" />
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
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 800)
  }

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-[#f8f9fb] font-['Outfit',sans-serif] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none outline-none overflow-hidden">
      <div className="sticky top-0 z-30 bg-white backdrop-blur-xl shrink-0 border-b border-gray-100">
        <ActivityTabs active={activeFilter} onChange={handleFilterChange} />
      </div>

      <div className="w-full flex-1 overflow-hidden max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 h-full gap-6 p-5 lg:px-6 lg:py-5">
          <div className="col-span-12 lg:col-span-8 flex flex-col h-full overflow-y-auto pb-12 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {displayedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                <div className="w-14 h-14 mb-4 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                  <span className="text-2xl">📭</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#1f1633] mb-1">
                  No opportunities found
                </h3>
                <p className="text-[13px] text-gray-500">
                  There are no matching opportunities in this category.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
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
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-6 mb-4">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="group flex items-center justify-center gap-2 px-7 py-2.5 rounded-[8px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
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
                          <AutorenewIcon sx={{ fontSize: 17 }} className="group-hover:rotate-180 transition-transform duration-700" />
                          <span>Load More Opportunities</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="col-span-4 hidden lg:flex flex-col h-full overflow-hidden pb-4">
            <TopCompaniesHiring />
            <AdsPlaceholder />
            <div className="mt-4 shrink-0">
              <HiringCTA />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}