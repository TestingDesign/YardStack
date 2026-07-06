import { useState, useMemo, useRef, memo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CircularProgress from '@mui/material/CircularProgress'
import { Flame, LayoutGrid } from 'lucide-react'
import DirectoryTabs from './DirectoryTabs'
import { BUILDERS } from './data'
import type { Builder } from './data'

const MOBILE_STYLES = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .hero-gradient-btn {
    background-size: 200% auto;
    transition: 0.5s;
  }
  .hero-gradient-btn:active {
    background-position: right center;
  }
`

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="relative flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[15px] font-black text-gray-900 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

const BuilderCardMobile = memo(function BuilderCardMobile({ builder, index = 0 }: { builder: Builder, index?: number }) {
  return (
    <div
      className="flex flex-col bg-white border border-gray-100 rounded-xl p-3 gap-3 shadow-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center shrink-0 rounded-lg shadow-sm border border-black/5 w-12 h-12"
          style={{ backgroundColor: builder.logoBg }}
        >
          <span className="text-xs font-bold tracking-wider" style={{ color: builder.logoColor }}>
            {builder.logoText}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 justify-start">
            <h3 className="font-bold text-gray-900 text-[13px] truncate">
              {builder.name}
            </h3>
            {builder.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />}
          </div>
          <p className="text-[11px] font-semibold text-gray-500 truncate mt-0.5">
            {builder.category}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center text-gray-400 text-[10px] font-medium">
          <LocationOnOutlinedIcon sx={{ fontSize: 12 }} className="mr-0.5 shrink-0" />
          <span className="truncate max-w-[120px]">{builder.location}</span>
        </div>
        <button className="px-4 py-2 rounded-[6px] text-[11px] font-bold text-white bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] shadow-[0_2px_12px_rgba(124,58,237,0.3)] active:scale-95 transition-all border-none">
          Connect
        </button>
      </div>
    </div>
  )
})

const TrendingBuilderCardMobile = memo(function TrendingBuilderCardMobile({ builder, index = 0 }: { builder: Builder, index?: number }) {
  return (
    <div className="relative w-[150px] shrink-0 bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center text-center gap-2 shadow-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm border border-gray-100"
        style={{ backgroundColor: builder.logoBg }}
      >
        <span className="text-sm font-bold tracking-wider" style={{ color: builder.logoColor }}>
          {builder.logoText}
        </span>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center gap-1">
          <h3 className="font-bold text-gray-900 text-[12px] truncate max-w-[100px]">
            {builder.name}
          </h3>
          {builder.verified && <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500 shrink-0" />}
        </div>
        <p className="text-[9px] font-semibold text-gray-500 truncate w-full mt-0.5">{builder.category}</p>
      </div>
      <button className="w-full mt-2 py-2 rounded-[4px] bg-purple-50 text-purple-700 text-[11px] font-bold transition-all duration-300 active:bg-purple-600 active:text-white border-none shadow-sm">
        View Profile
      </button>
    </div>
  )
})

export default function DirectoryMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let result = BUILDERS
    if (activeFilter !== 'all') {
      result = result.filter(b => b.category.toLowerCase().includes(activeFilter.toLowerCase()))
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(b => 
        b.name.toLowerCase().includes(q) || 
        b.category.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeFilter, searchQuery])

  const displayedBuilders = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + 8)
      setIsLoading(false)
    }, 300)
  }

  const featuredBuilder = BUILDERS.find(b => b.isFeatured) || BUILDERS[0]
  const trendingBuilders = BUILDERS.filter(b => b.isRecentlyJoined || b.isFeatured)

  return (
    <div className="relative w-full h-full flex flex-col bg-[#f8f9fa] overflow-hidden">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth hide-scrollbar flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white">
          <DirectoryTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="flex-1 flex flex-col pb-10">

          <div className="px-4 flex flex-col gap-5">
            {/* Mobile Hero Card */}
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col relative active:scale-[0.98] transition-transform">
              <div className="relative w-full h-[160px] bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 opacity-90" />
                <div className="relative z-10 w-20 h-20 rounded-full shadow-lg border-2 border-white/20 flex items-center justify-center" style={{ backgroundColor: featuredBuilder.logoBg }}>
                  <span className="text-2xl font-black" style={{ color: featuredBuilder.logoColor }}>
                    {featuredBuilder.logoText}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] px-2 py-1 rounded font-semibold uppercase">
                  <TrendingUpIcon sx={{ fontSize: 12 }} className="text-fuchsia-400" /> Sponsored
                </div>
              </div>

              <div className="p-4 flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 mb-1">
                  {featuredBuilder.category}
                </span>
                <h2 className="text-[18px] font-black text-gray-900 leading-tight mb-2">
                  {featuredBuilder.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600 font-semibold mb-4">
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                    <LocationOnOutlinedIcon sx={{ fontSize: 14 }} className="text-blue-500" /> {featuredBuilder.location}
                  </span>
                  {featuredBuilder.verified && (
                    <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-blue-700">
                      <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500" /> Verified
                    </span>
                  )}
                </div>
                <button className="w-full hero-gradient-btn flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[13px] font-bold rounded-[6px] shadow-[0_2px_12px_rgba(124,58,237,0.3)] active:scale-95 transition-all border-none">
                  View Profile
                </button>
              </div>
            </div>

            {/* Top Builders Carousel */}
            <div className="w-full flex flex-col bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <SectionHeader
                icon={<Flame className="text-orange-500" size={16} />}
                title="Top Builders"
              />
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
                {trendingBuilders.map((builder, idx) => (
                  <div key={builder.id} className="snap-start">
                    <TrendingBuilderCardMobile builder={builder} index={idx} />
                  </div>
                ))}
              </div>
            </div>

            {/* All Builders Grid */}
            <div className="w-full flex flex-col bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <SectionHeader
                icon={
                  <div className="p-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded text-white">
                    <LayoutGrid size={12} />
                  </div>
                }
                title="All Builders"
                badge={`${filtered.length}`}
              />
              
              <div className="relative flex items-center w-full mb-4">
                <SearchIcon className="absolute left-3 text-gray-400 pointer-events-none" sx={{ fontSize: 16 }} />
                <input
                  type="text"
                  placeholder="Search builders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button className="absolute right-2 p-1 text-gray-400 hover:text-purple-600 border-none bg-transparent">
                  <FilterListIcon sx={{ fontSize: 16 }} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {displayedBuilders.map((builder, idx) => (
                  <BuilderCardMobile key={builder.id} builder={builder} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-5 flex justify-center pb-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={14} sx={{ color: 'inherit' }} />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <AutorenewIcon sx={{ fontSize: 15 }} className="group-hover:rotate-180 transition-transform duration-700" />
                        <span>Load More Builders</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="py-8 flex flex-col items-center text-center">
                  <SearchIcon sx={{ fontSize: 24 }} className="text-gray-300 mb-2" />
                  <h3 className="text-gray-900 font-bold text-[13px]">No builders found</h3>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
