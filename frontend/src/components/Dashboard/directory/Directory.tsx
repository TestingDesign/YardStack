import { useState, useMemo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import { BUILDERS } from './data'

type Builder = typeof BUILDERS[0]

function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <div 
      className="
        group relative flex items-center bg-white border border-gray-100 rounded-2xl cursor-pointer
        p-2.5 gap-3 @md:p-4 @md:gap-4
        transition-all duration-300 ease-out hover:border-gray-200 
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5
      "
    >
      <div 
        className="
          flex items-center justify-center shrink-0 rounded-md shadow-sm border border-black/5 
          transition-transform duration-300 group-hover:scale-105
          w-12 h-12 @md:w-14 @md:h-14
        "
        style={{ backgroundColor: builder.logoBg }}
      >
        <span className="text-sm font-bold tracking-wider" style={{ color: builder.logoColor }}>
          {builder.logoText}
        </span>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center pr-2">
        <div className="flex items-center gap-1 mb-0.5 justify-start">
          <h3 className="font-bold text-[#1f1633] text-sm truncate">
            {builder.name}
          </h3>
          {builder.verified && (
            <VerifiedIcon sx={{ fontSize: 16 }} className="text-blue-500 shrink-0" />
          )}
        </div>
        
        <p className="text-xs font-medium text-gray-500 mb-1.5 truncate w-full">
          {builder.category}
        </p>
        
        <div className="flex items-center text-gray-400 text-[11px] font-medium justify-start">
          <LocationOnOutlinedIcon sx={{ fontSize: 14 }} className="mr-0.5 shrink-0" />
          <span className="truncate">{builder.location}</span>
        </div>
      </div>

      <button className="
        shrink-0 px-3 py-1.5 @md:px-4 @md:py-2 rounded-lg text-xs font-bold text-white
        bg-linear-to-r from-pink-500 to-rose-500 
        hover:from-rose-500 hover:to-pink-500 
        shadow-[0_2px_8px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_12px_rgba(225,29,72,0.35)]
        transition-all duration-300 active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50
      ">
        Connect
      </button>
    </div>
  )
}

export default function Directory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)

  const allRecentlyJoined = useMemo(() => BUILDERS.filter(b => b.isRecentlyJoined), [])
  
  const recentlyJoined = allRecentlyJoined.slice(0, visibleCount)
  const hasMore = visibleCount < allRecentlyJoined.length

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + 6)
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none @container outline-none">
      <div className="w-full pt-2 @md:pt-4 pb-16 @md:pb-10 bg-white">
        <section className="px-3 @md:px-8 max-w-5xl mx-auto space-y-4 @md:space-y-6">
          
          {/* Search Bar */}
          <div className="group relative flex items-center rounded-md border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 focus-within:bg-white focus-within:border-[#6a5fc1]/50 focus-within:ring-4 focus-within:ring-[#6a5fc1]/10 transition-all duration-300">
            <div className="pl-3 pr-2 text-gray-400 group-focus-within:text-[#6a5fc1] transition-colors duration-300">
              <SearchIcon sx={{ fontSize: 20 }} />
            </div>
            <input
              type="text"
              placeholder="Search by name, company or skill"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 py-3 px-1 bg-transparent text-sm text-[#1f1633] placeholder-gray-400 focus:outline-none"
            />
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button className="flex items-center gap-1.5 px-3 py-3 text-gray-500 hover:text-[#1f1633] text-sm font-semibold transition-colors focus-visible:outline-none rounded-r-xl">
              <FilterListIcon sx={{ fontSize: 18 }} />
              <span className="hidden @sm:inline">Filters</span>
            </button>
          </div>

          {/* Directory List */}
          <div>
            <div className="flex flex-col @md:grid @md:grid-cols-2 gap-2.5 @md:gap-4">
              {recentlyJoined.map((builder) => (
                <BuilderCard key={builder.id} builder={builder} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-6 @md:mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="
                    group flex items-center justify-center gap-2 px-8 py-3 min-w-40 
                    text-sm font-bold text-white rounded-md
                    bg-linear-to-r from-[#6a5fc1] via-[#8b5cf6] to-[#6a5fc1] bg-size-[200%_auto]
                    shadow-[0_4px_14px_rgba(106,95,193,0.3)]
                    hover:bg-position-[100%_center] hover:shadow-[0_6px_20px_rgba(106,95,193,0.45)] 
                    hover:-translate-y-0.5 hover:scale-[1.02]
                    transition-all duration-500 ease-out active:scale-95 
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none 
                    disabled:hover:shadow-[0_4px_14px_rgba(106,95,193,0.3)] disabled:hover:bg-position-[0%_center]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/70
                  "
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={16} sx={{ color: 'white' }} />
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </div>

        </section>
      </div>
    </div>
  )
}