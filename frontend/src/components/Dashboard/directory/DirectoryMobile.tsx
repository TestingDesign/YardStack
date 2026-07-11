import { useState, useMemo, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import VerifiedIcon from '@mui/icons-material/Verified'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CircularProgress from '@mui/material/CircularProgress'
import StarIcon from '@mui/icons-material/Star'
import BusinessIcon from '@mui/icons-material/Business'
import { LayoutGrid, ArrowUpRight, Sparkles, Zap } from 'lucide-react'
import DirectoryTabs from './DirectoryTabs'
import { BUILDERS, DIRECTORY_STATS } from './data'
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
        <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[9px] font-semibold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  )
}

export const BuilderCardMobile = memo(function BuilderCardMobile({ builder, isEmbedded }: { builder: Builder, isEmbedded?: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`flex items-center ${isEmbedded ? 'px-3.5 pb-2.5 pt-1 bg-transparent' : 'p-3 bg-white shadow-sm'} rounded-[8px] gap-3 overflow-hidden relative`}
    >
      {/* Hover gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 to-fuchsia-50/0 active:from-purple-50/40 active:to-fuchsia-50/40 transition-all duration-300 rounded-[8px] pointer-events-none" />

      <div 
        className={`relative flex items-center justify-center shrink-0 rounded-[4px] ${isEmbedded ? 'w-10 h-10' : 'w-12 h-12'} overflow-hidden px-1 z-10`}
        style={{ backgroundColor: builder.logoBg }}
      >
        <span className="text-[10px] font-bold tracking-wider truncate w-full text-center" style={{ color: builder.logoColor }}>
          {builder.logoText}
        </span>
      </div>
      
      <div className="relative flex-1 min-w-0 flex flex-col justify-center z-10">
        <div className="flex items-center gap-1 justify-start">
          <h3 className="font-medium text-gray-800 text-[13px] truncate">
            {builder.name}
          </h3>
          {builder.verified && <VerifiedIcon sx={{ fontSize: 14 }} className="text-purple-500 shrink-0" />}
        </div>
        <p className={`text-[11px] font-medium text-gray-500 truncate ${!isEmbedded ? 'mt-0.5' : ''}`}>
          {builder.category}
        </p>
      </div>

      <button className="relative shrink-0 px-4 py-2 rounded-[4px] text-[11px] font-bold text-purple-600 bg-white border border-purple-200 shadow-[0_2px_12px_rgba(124,58,237,0.1)] active:scale-[0.97] hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 z-10">
        Connect
      </button>
    </motion.div>
  )
})


export default function DirectoryMobile() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let result = BUILDERS
    if (activeFilter !== 'all') {
      result = result.filter(b => b.category.toLowerCase().includes(activeFilter.toLowerCase()))
    }
    return result
  }, [activeFilter])

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
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden">
      <style>{MOBILE_STYLES}</style>

      <div 
        ref={scrollContainerRef}
        className="flex-1 min-h-0 w-full h-full overflow-y-auto scroll-smooth hide-scrollbar flex flex-col"
      >
        <div className="sticky top-0 z-40 bg-white">
          <DirectoryTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="flex-1 flex flex-col pb-10">
          <div className="px-3.5 flex flex-col gap-4 pt-0">

            <div className="grid grid-cols-4 gap-2">
              {DIRECTORY_STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="bg-white rounded-[4px] py-2.5 px-1.5 flex flex-col items-center justify-center shadow-sm relative overflow-hidden border border-gray-100"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {stat.isLucide ? (
                      <Icon size={14} style={{ color: stat.color }} />
                    ) : (
                      <Icon sx={{ fontSize: 15 }} style={{ color: stat.color }} />
                    )}
                    <span className="text-[15px] font-bold text-gray-800 leading-none">{stat.value}</span>
                  </div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{stat.shortLabel || stat.label}</p>
                </motion.div>
              )})}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-full bg-white rounded-[4px] overflow-hidden shadow-sm flex flex-col relative active:scale-[0.99] transition-transform"
            >
              <div className="relative w-full h-[150px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#6d28d9]" />
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
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-purple-600">
                    {featuredBuilder.category}
                  </span>
                  {featuredBuilder.verified && (
                    <VerifiedIcon sx={{ fontSize: 12 }} className="text-purple-500" />
                  )}
                </div>
                <h2 className="text-[18px] font-semibold text-gray-800 leading-tight mb-2">
                  {featuredBuilder.name}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-600 font-medium mb-4">

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

            <div className="w-full flex flex-col bg-white p-1">
              <SectionHeader
                icon={
                  <div className="w-6 h-6 rounded-[4px] bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
                    <LayoutGrid size={11} className="text-white" />
                  </div>
                }
                title="All Builders"
              />

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
                  <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                    <SearchIcon sx={{ fontSize: 22 }} className="text-purple-300" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-[14px]">No builders found</h3>
                  <p className="text-gray-500 text-[12px] font-medium mt-0.5">Try adjusting your search.</p>
                </motion.div>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#9333ea] rounded-[4px] p-5 text-white overflow-hidden shadow-[0_4px_20px_rgba(147,51,234,0.25)]"
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
                <button className="w-full py-2.5 bg-white text-purple-700 font-semibold text-[13px] rounded-[4px] active:bg-purple-50 active:scale-95 transition-all border-none cursor-pointer">
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
