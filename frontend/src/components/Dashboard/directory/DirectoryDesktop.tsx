import { useState, useMemo, useRef, useEffect, memo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CircularProgress from '@mui/material/CircularProgress'
import { Flame, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react'
import DirectoryTabs from './DirectoryTabs'
import { BUILDERS } from './data'
import type { Builder } from './data'

const STYLES = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .hero-gradient-btn {
    background-size: 200% auto;
    transition: 0.5s ease-out;
  }
  .hero-gradient-btn:hover {
    background-position: right center;
  }
`

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="relative flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[16px] font-black text-[var(--color-text-primary)] tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-2 py-0.5 rounded-full bg-[var(--color-secondary-500)]/10 text-[var(--color-secondary-500)] text-[10px] font-bold uppercase tracking-wider animate-in zoom-in-75 duration-500 delay-200">
          {badge}
        </span>
      )}
    </div>
  )
}

const BuilderCard = memo(function BuilderCard({ builder, index = 0 }: { builder: Builder, index?: number }) {
  return (
    <div
      className="group relative flex items-center bg-white border border-gray-100 rounded-[8px] cursor-pointer p-4 gap-4 transition-all duration-500 ease-out hover:border-purple-300 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)] hover:-translate-y-1 outline-none animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-both"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div 
        className="flex items-center justify-center shrink-0 rounded-[8px] shadow-sm border border-black/5 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-14 h-14"
        style={{ backgroundColor: builder.logoBg }}
      >
        <span className="text-sm font-bold tracking-wider" style={{ color: builder.logoColor }}>
          {builder.logoText}
        </span>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center pr-2">
        <div className="flex items-center gap-1 mb-1 justify-start">
          <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-purple-700 transition-colors duration-300">
            {builder.name}
          </h3>
          {builder.verified && (
            <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500 shrink-0" />
          )}
        </div>
        
        <p className="text-xs font-semibold text-gray-500 mb-1.5 truncate w-full">
          {builder.category}
        </p>
        
        <div className="flex items-center text-gray-400 text-[11px] font-medium justify-start">
          <LocationOnOutlinedIcon sx={{ fontSize: 14 }} className="mr-0.5 shrink-0" />
          <span className="truncate">{builder.location}</span>
        </div>
      </div>

      <button className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[13px] font-bold rounded-[8px] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(124,58,237,0.3)] cursor-pointer border-none">
        Connect
      </button>
    </div>
  )
})

const TrendingBuilderCard = memo(function TrendingBuilderCard({ builder, index = 0 }: { builder: Builder, index?: number }) {
  return (
    <div className="relative group w-[220px] shrink-0 bg-white border border-gray-100 rounded-[8px] p-5 cursor-pointer transition-all duration-500 ease-out hover:border-fuchsia-300 hover:shadow-[0_12px_40px_rgba(217,70,239,0.15)] hover:-translate-y-1 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex flex-col items-center text-center gap-3">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg"
          style={{ backgroundColor: builder.logoBg }}
        >
          <span className="text-xl font-bold tracking-wider" style={{ color: builder.logoColor }}>
            {builder.logoText}
          </span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <h3 className="font-bold text-gray-900 text-[15px] truncate max-w-[160px] group-hover:text-fuchsia-600 transition-colors">
              {builder.name}
            </h3>
            {builder.verified && <VerifiedIcon sx={{ fontSize: 15 }} className="text-blue-500 shrink-0" />}
          </div>
          <p className="text-[11px] font-semibold text-gray-500 line-clamp-1">{builder.category}</p>
          <div className="flex items-center justify-center text-gray-400 text-[10px] font-medium mt-1.5">
            <LocationOnOutlinedIcon sx={{ fontSize: 13 }} className="mr-0.5" />
            <span className="truncate">{builder.location}</span>
          </div>
        </div>
        <button className="w-full mt-2 py-2.5 rounded-[8px] bg-purple-50 text-purple-700 text-[13px] font-bold transition-all duration-300 hover:bg-purple-600 hover:text-white cursor-pointer border-none shadow-sm">
          View Profile
        </button>
      </div>
    </div>
  )
})

export default function DirectoryDesktop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 24)
  }

  useEffect(() => {
    handleScroll()
    const timer = setTimeout(() => handleScroll(), 50)
    window.addEventListener('resize', handleScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleScroll) }
  }, [])

  const scrollRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  const scrollLeft  = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' })

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
    }, 600)
  }

  const featuredBuilder = BUILDERS.find(b => b.isFeatured) || BUILDERS[0]
  const trendingBuilders = BUILDERS.filter(b => b.isRecentlyJoined || b.isFeatured)

  return (
    <>
      <style>{STYLES}</style>
      
      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col bg-[var(--color-bg-muted)] animate-in fade-in duration-500 overflow-y-auto scroll-smooth hide-scrollbar pb-12">
        <div className="sticky top-0 z-40 shrink-0 bg-white/95 backdrop-blur-sm px-1 py-1 ">
          <DirectoryTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="flex-1 bg-white flex flex-col xl:flex-row gap-6 px-4 md:px-6 py-6 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            <div className="w-full bg-white rounded-[8px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row group cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] hover:-translate-y-1">
              <div className="relative w-full lg:w-[40%] aspect-[16/9] lg:aspect-auto min-h-[250px] bg-black shrink-0 overflow-hidden mx-auto lg:mx-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                
                <div className="relative z-10 flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                  <div 
                    className="w-24 h-24 rounded-full shadow-2xl border-4 border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-3"
                    style={{ backgroundColor: featuredBuilder.logoBg }}
                  >
                    <span className="text-3xl font-black tracking-wider" style={{ color: featuredBuilder.logoColor }}>
                      {featuredBuilder.logoText}
                    </span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] px-3 py-1.5 rounded-[2.4px] font-semibold uppercase tracking-wider">
                  <TrendingUpIcon sx={{ fontSize: 14 }} className="text-fuchsia-400" />
                  Sponsored
                </div>
              </div>

              <div className="p-6 lg:p-8 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-[2.4px]">
                    {featuredBuilder.category}
                  </span>
                </div>
                <h2 className="text-[24px] lg:text-[28px] font-black text-gray-900 leading-tight mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {featuredBuilder.name}
                </h2>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-6 max-w-[500px]">
                  An industry leader known for delivering exceptional residential and commercial spaces. Connect with their team to explore collaboration opportunities.
                </p>

                <div className="flex items-center gap-4 text-[13px] text-gray-600 font-semibold mb-8">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-[8px]">
                    <LocationOnOutlinedIcon sx={{ fontSize: 16 }} className="text-blue-500" /> 
                    {featuredBuilder.location}
                  </span>
                  {featuredBuilder.verified && (
                    <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-[8px] text-blue-700">
                      <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500" /> Verified Partner
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button className="hero-gradient-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[14px] font-bold rounded-[8px] hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_2px_12px_rgba(124,58,237,0.3)] cursor-pointer border-none">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-2">
              <SectionHeader
                icon={<Flame className="text-orange-500 drop-shadow-[0_2px_6px_rgba(249,115,22,0.5)]" size={20} />}
                title="Top Builders"
              />

              <div className="relative group/slider w-full">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-30 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollLeft}
                        className="w-9 h-9 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 hover:shadow-[0_6px_24px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  ref={sliderRef}
                  onScroll={handleScroll}
                  className="flex gap-4 px-6 overflow-x-auto pb-6 pt-2  snap-x snap-mandatory hide-scrollbar scroll-smooth"
                >
                  {trendingBuilders.map((builder, idx) => (
                    <div key={builder.id} className="snap-start">
                      <TrendingBuilderCard builder={builder} index={idx} />
                    </div>
                  ))}
                </div>

                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-30 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent">
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-auto">
                      <button
                        onClick={scrollRight}
                        className="w-9 h-9 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 hover:shadow-[0_6px_24px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <SectionHeader
                  icon={
                    <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[8px] text-white shadow-md">
                      <LayoutGrid size={14} />
                    </div>
                  }
                  title="All Builders"
                  badge={`${filtered.length} found`}
                />

                <div className="relative flex items-center w-[280px]">
                  <SearchIcon className="absolute left-3 text-gray-400 pointer-events-none" sx={{ fontSize: 18 }} />
                  <input
                    type="text"
                    placeholder="Search builders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-[8px] text-[13px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                  <button className="absolute right-2 p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-[2.4px] transition-colors border-none bg-transparent cursor-pointer">
                    <FilterListIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedBuilders.map((builder, idx) => (
                  <BuilderCard key={builder.id} builder={builder} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 flex justify-center pb-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="
                      group flex items-center justify-center gap-2 px-7 py-2.5 min-w-[160px] 
                      rounded-[8px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 
                      shadow-[0_2px_12px_rgba(124,58,237,0.1)]
                      hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white 
                      hover:border-transparent transition-all duration-350 cursor-pointer
                      hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]
                      disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none 
                    "
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={16} sx={{ color: 'inherit' }} />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <AutorenewIcon sx={{ fontSize: 17 }} className="group-hover:rotate-180 transition-transform duration-700" />
                        <span>Load More Builders</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50 rounded-[8px] border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <SearchIcon sx={{ fontSize: 28 }} className="text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-1">No builders found</h3>
                  <p className="text-gray-500 text-sm font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>

          </div>
          
          <div className="w-full xl:w-[320px] 2xl:w-[360px] flex flex-col gap-6 shrink-0 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="bg-white rounded-[8px] border border-gray-100 p-5 shadow-sm">
              <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
              <div className="flex flex-col gap-2">
                {['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Villas & Resorts'].map((cat) => (
                  <button key={cat} className="flex items-center justify-between p-3 rounded-[8px] hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-semibold text-[13px] transition-colors cursor-pointer border-none bg-transparent text-left">
                    <span>{cat}</span>
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[8px] p-6 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2">Join the Directory</h3>
                <p className="text-sm font-medium text-white/80 mb-5 leading-relaxed">
                  Are you a builder or developer? Showcase your projects and connect with industry leaders.
                </p>
                <button className="w-full py-2.5 bg-white text-purple-900 font-bold text-[13px] rounded-[8px] hover:shadow-lg hover:bg-gray-50 transition-all active:scale-95 border-none cursor-pointer">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}