import { useState, useMemo, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CircularProgress from '@mui/material/CircularProgress'
import StarIcon from '@mui/icons-material/Star'
import BusinessIcon from '@mui/icons-material/Business'
import { LayoutGrid, ArrowUpRight, Sparkles, Zap } from 'lucide-react'
import DirectoryTabs from './DirectoryTabs'
import { BUILDERS } from './data'
import type { Builder } from './data'

const MOBILE_STYLES = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  .float-animation {
    animation: float 4s ease-in-out infinite;
  }
`

const DIRECTORY_STATS = [
  { label: 'Builders', value: '450+', color: '#6366F1' },
  { label: 'Cities', value: '28', color: '#EC4899' },
  { label: 'Verified', value: '320+', color: '#10B981' },
  { label: 'Connections', value: '12K+', color: '#F59E0B' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 22 }
  }
}

function SectionHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="relative flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-gray-800 tracking-tight">{title}</h3>
      {badge && (
        <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-semibold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

const BuilderCardMobile = memo(function BuilderCardMobile({ builder }: { builder: Builder }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col bg-white border border-gray-100/80 rounded-lg p-3.5 gap-3 shadow-sm overflow-hidden relative"
    >
      {/* Hover gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 to-purple-50/0 active:from-indigo-50/40 active:to-purple-50/40 transition-all duration-300 rounded-lg pointer-events-none" />

      <div className="relative flex items-center gap-3">
        <div 
          className="flex items-center justify-center shrink-0 rounded-lg shadow-sm border border-black/5 w-12 h-12 overflow-hidden px-1"
          style={{ backgroundColor: builder.logoBg }}
        >
          <span className="text-[10px] font-bold tracking-wider truncate w-full text-center" style={{ color: builder.logoColor }}>
            {builder.logoText}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 justify-start">
            <h3 className="font-medium text-gray-800 text-[13px] truncate">
              {builder.name}
            </h3>
            {builder.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />}
          </div>
          <p className="text-[11px] font-medium text-gray-500 truncate mt-0.5">
            {builder.category}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-between mt-0.5">
        <div className="flex items-center text-gray-400 text-[10px] font-medium">
          <LocationOnOutlinedIcon sx={{ fontSize: 12 }} className="mr-0.5 shrink-0" />
          <span className="truncate max-w-[120px]">{builder.location}</span>
        </div>
        <button className="px-4 py-2 rounded-[4px] text-[11px] font-bold text-purple-600 bg-white border border-purple-200 shadow-[0_2px_12px_rgba(124,58,237,0.1)] active:scale-[0.97] hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 z-10">
          Connect
        </button>
      </div>
    </motion.div>
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

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FC] overflow-hidden">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth hide-scrollbar flex flex-col"
      >
        {/* Tabs - Kept as-is */}
        <div className="sticky top-0 z-40 bg-white">
          <DirectoryTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="flex-1 flex flex-col pb-10">
          <div className="px-3.5 flex flex-col gap-4 pt-4">

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-4 gap-2">
              {DIRECTORY_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="bg-white rounded-lg border border-gray-100/80 p-2.5 flex flex-col items-center text-center shadow-sm"
                >
                  <p className="text-[16px] font-bold text-gray-800 leading-tight">{stat.value}</p>
                  <p className="text-[8px] font-medium text-gray-400 mt-0.5 uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* ── Mobile Featured Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100/80 flex flex-col relative active:scale-[0.99] transition-transform"
            >
              <div className="relative w-full h-[150px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca]" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                
                {/* Floating decorations */}
                <div className="absolute top-3 right-3 float-animation">
                  <Sparkles size={12} className="text-yellow-300/50" />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div 
                    className="w-16 h-16 rounded-full shadow-lg border-2 border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: featuredBuilder.logoBg }}
                  >
                    <span className="text-lg font-semibold" style={{ color: featuredBuilder.logoColor }}>
                      {featuredBuilder.logoText}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[8px] font-semibold uppercase tracking-widest rounded-full">
                    <Zap size={8} className="inline mr-0.5 -mt-px" />
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-indigo-600">
                    {featuredBuilder.category}
                  </span>
                  {featuredBuilder.verified && (
                    <VerifiedIcon sx={{ fontSize: 12 }} className="text-blue-500" />
                  )}
                </div>
                <h2 className="text-[18px] font-semibold text-gray-800 leading-tight mb-2">
                  {featuredBuilder.name}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-600 font-medium mb-4">
                  <span className="flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded">
                    <LocationOnOutlinedIcon sx={{ fontSize: 12 }} className="text-indigo-400" /> {featuredBuilder.location}
                  </span>
                  <span className="flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded">
                    <StarIcon sx={{ fontSize: 11 }} className="text-amber-400" /> 4.8
                  </span>
                  <span className="flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded">
                    <BusinessIcon sx={{ fontSize: 11 }} className="text-gray-400" /> 120+ Projects
                  </span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[13px] font-bold rounded-[4px] shadow-[0_2px_12px_rgba(124,58,237,0.3)] active:scale-[0.97] transition-all border-none">
                  View Profile
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>


            {/* ── All Builders Grid ── */}
            <div className="w-full flex flex-col bg-white rounded-lg p-3.5 shadow-sm border border-gray-100/80">
              <SectionHeader
                icon={
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <LayoutGrid size={11} className="text-white" />
                  </div>
                }
                title="All Builders"
                badge={`${filtered.length}`}
              />
              
              <div className="relative flex items-center w-full mb-4">
                <SearchIcon className="absolute left-3 text-gray-400 pointer-events-none" sx={{ fontSize: 16 }} />
                <input
                  type="text"
                  placeholder="Search by name, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
                <button className="absolute right-2 p-1 text-gray-400 active:text-indigo-600 border-none bg-transparent">
                  <FilterListIcon sx={{ fontSize: 16 }} />
                </button>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                <AnimatePresence mode="popLayout">
                  {displayedBuilders.map((builder) => (
                    <BuilderCardMobile key={builder.id} builder={builder} />
                  ))}
                </AnimatePresence>
              </motion.div>

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
                        <AutorenewIcon sx={{ fontSize: 15 }} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span>Load More Builders</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                    <SearchIcon sx={{ fontSize: 22 }} className="text-indigo-300" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-[14px]">No builders found</h3>
                  <p className="text-gray-500 text-[12px] font-medium mt-0.5">Try adjusting your search.</p>
                </motion.div>
              )}
            </div>

            {/* ── Mobile CTA ── */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative bg-gradient-to-br from-[#312e81] via-[#4338ca] to-[#6366f1] rounded-lg p-5 text-white overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.25)]"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.06] rounded-full blur-xl -translate-y-1/3 translate-x-1/4" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-amber-300" />
                  <h3 className="text-[15px] font-semibold text-white">Join the Directory</h3>
                </div>
                <p className="text-[12px] font-medium text-white/70 mb-4 leading-relaxed">
                  Showcase your projects and connect with 12K+ industry professionals.
                </p>
                <button className="w-full py-2.5 bg-white text-indigo-700 font-semibold text-[13px] rounded-lg active:bg-indigo-50 active:scale-95 transition-all border-none cursor-pointer">
                  Apply Now
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
