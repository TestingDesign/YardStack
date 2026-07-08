import { useState, useMemo, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CircularProgress from '@mui/material/CircularProgress'
import StarIcon from '@mui/icons-material/Star'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CampaignIcon from '@mui/icons-material/Campaign'
import ComputerIcon from '@mui/icons-material/Computer'
import PaletteIcon from '@mui/icons-material/Palette'
import WorkIcon from '@mui/icons-material/Work'
import HandshakeIcon from '@mui/icons-material/Handshake'
import { LayoutGrid, ChevronRight, ArrowUpRight, Sparkles, Crown, Zap, Shield } from 'lucide-react'
import DirectoryTabs from './DirectoryTabs'
import { BUILDERS } from './data'
import type { Builder } from './data'

const STYLES = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  .card-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
    border-radius: inherit;
  }
  .card-shimmer:hover::after {
    opacity: 1;
    animation: shimmer .6s ease forwards;
  }
  .float-animation {
    animation: float 4s ease-in-out infinite;
  }
`

const DIRECTORY_STATS = [
  { label: 'Builders Listed', value: '450+', icon: BusinessIcon, color: '#6366F1', isLucide: false },
  { label: 'Cities Covered', value: '28', icon: LocationOnOutlinedIcon, color: '#EC4899', isLucide: false },
  { label: 'Verified Partners', value: '320+', icon: Shield, color: '#10B981', isLucide: true },
  { label: 'Active Connections', value: '12K+', icon: PeopleIcon, color: '#F59E0B', isLucide: false },
]

const TOPICS = [
  { name: 'Builders', count: '1,200+ Listed', color: '#2563EB', bgColor: '#EFF6FF', icon: BusinessIcon },
  { name: 'Channel Partners', count: '5,500+ Listed', color: '#E11D48', bgColor: '#FFF1F2', icon: PeopleIcon },
  { name: 'Bankers', count: '300+ Listed', color: '#059669', bgColor: '#ECFDF5', icon: AccountBalanceIcon },
  { name: 'Agencies', count: '450+ Listed', color: '#D97706', bgColor: '#FFFBEB', icon: CampaignIcon },
  { name: 'Tech Providers', count: '150+ Listed', color: '#9333EA', bgColor: '#FAF5FF', icon: ComputerIcon },
  { name: 'Designers', count: '800+ Listed', color: '#0891B2', bgColor: '#ECFEFF', icon: PaletteIcon },
  { name: 'Legal Consultants', count: '250+ Listed', color: '#2563EB', bgColor: '#EFF6FF', icon: WorkIcon },
  { name: 'Investors', count: '1,000+ Listed', color: '#E11D48', bgColor: '#FFF1F2', icon: HandshakeIcon },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 22 }
  }
}

function SectionHeader({ icon, title, action }: { icon: React.ReactNode; title: string; badge?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-[16px] font-semibold text-gray-800 tracking-tight">{title}</h3>
      </div>
      {action}
    </div>
  )
}

const BuilderCard = memo(function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      className="group relative flex items-center bg-white border border-gray-100/80 rounded-lg cursor-pointer p-4 gap-4 transition-all duration-300 ease-out hover:border-indigo-200 hover:shadow-[0_8px_30px_rgba(99,102,241,0.10)] outline-none card-shimmer overflow-hidden"
    >
      {/* Subtle gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/40 group-hover:via-purple-50/30 group-hover:to-pink-50/40 transition-all duration-500 rounded-lg pointer-events-none" />

      <div 
        className="relative flex items-center justify-center shrink-0 rounded-lg shadow-sm border border-black/5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-md w-14 h-14 overflow-hidden px-1"
        style={{ backgroundColor: builder.logoBg }}
      >
        <span className="text-[10px] sm:text-[11px] font-bold tracking-wider truncate w-full text-center" style={{ color: builder.logoColor }}>
          {builder.logoText}
        </span>
      </div>
      
      <div className="relative flex-1 min-w-0 flex flex-col justify-center pr-2">
        <div className="flex items-center gap-1.5 mb-1 justify-start">
          <h3 className="font-medium text-gray-800 text-[15px] truncate group-hover:text-indigo-700 transition-colors duration-300">
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

      <button className="relative shrink-0 px-5 py-2 bg-white border border-purple-200 text-purple-600 text-[12px] font-bold rounded-[4px] hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97] z-10">
        Connect
      </button>
    </motion.div>
  )
})

export default function DirectoryDesktop() {
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
    <>
      <style>{STYLES}</style>
      
      <div ref={scrollContainerRef} className="flex-1 w-full h-full flex flex-col bg-white overflow-y-auto scroll-smooth hide-scrollbar pb-12">
        {/* Tabs - Kept as-is */}
        <div className="sticky top-0 z-40 shrink-0 bg-white/95 backdrop-blur-sm px-1 py-1">
          <DirectoryTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="flex-1 flex flex-col gap-6 px-4 md:px-6 py-5 max-w-[1600px] w-full mx-auto">
          
          {/* ── Stats Banner ── */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {DIRECTORY_STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group relative bg-white rounded-lg border border-gray-100/80 p-4 flex items-center gap-3.5 cursor-default transition-all duration-300 hover:shadow-sm hover:border-gray-200 overflow-hidden"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}12` }}
                  >
                    {stat.isLucide ? (
                      <Icon size={18} style={{ color: stat.color }} />
                    ) : (
                      <Icon sx={{ fontSize: 20 }} style={{ color: stat.color }} />
                    )}
                  </div>
                  <div>
                    <p className="text-[20px] font-bold text-gray-800 leading-tight">{stat.value}</p>
                    <p className="text-[11px] font-medium text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                  {/* Decorative accent */}
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-[0.06] -translate-y-1/2 translate-x-1/3"
                    style={{ backgroundColor: stat.color }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Main Content Area ── */}
          <div className="flex flex-col xl:flex-row gap-6">

            {/* ── Left Column ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-7">

              {/* ── Featured Spotlight ── */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100/80 flex flex-col lg:flex-row group cursor-pointer transition-all duration-400 hover:shadow-md hover:border-indigo-100"
              >
                {/* Image Side */}
                <div className="relative w-full lg:w-[42%] min-h-[260px] shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] group-hover:scale-105 transition-transform duration-700" />
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 gap-5">
                    {/* Floating decorative elements */}
                    <div className="absolute top-6 right-6 float-animation">
                      <Sparkles size={16} className="text-yellow-300/60" />
                    </div>
                    <div className="absolute bottom-8 left-6 float-animation" style={{ animationDelay: '1s' }}>
                      <Crown size={14} className="text-amber-300/50" />
                    </div>

                    <div 
                      className="w-24 h-24 rounded-full shadow-2xl border-[3px] border-white/15 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-white/30"
                      style={{ backgroundColor: featuredBuilder.logoBg }}
                    >
                      <span className="text-2xl font-bold tracking-wider" style={{ color: featuredBuilder.logoColor }}>
                        {featuredBuilder.logoText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold uppercase tracking-widest rounded-full">
                        <Zap size={10} className="inline mr-1 -mt-px" />
                        Featured Builder
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 lg:p-8 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold uppercase tracking-widest rounded-full">
                      {featuredBuilder.category}
                    </span>
                    {featuredBuilder.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full">
                        <VerifiedIcon sx={{ fontSize: 11 }} /> Verified
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-[22px] lg:text-[26px] font-semibold text-gray-800 leading-tight mb-2 group-hover:text-indigo-700 transition-colors duration-300">
                    {featuredBuilder.name}
                  </h2>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-5 max-w-[460px]">
                    An industry leader known for delivering exceptional residential and commercial spaces. Connect with their team to explore collaboration opportunities.
                  </p>

                  <div className="flex items-center gap-3 text-[12px] text-gray-600 font-medium mb-6">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <LocationOnOutlinedIcon sx={{ fontSize: 15 }} className="text-indigo-400" /> 
                      {featuredBuilder.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <StarIcon sx={{ fontSize: 14 }} className="text-amber-400" />
                      4.8 Rating
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <BusinessIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                      120+ Projects
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white text-[13px] font-bold rounded-[4px] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] transition-all duration-350 active:scale-[0.97] cursor-pointer border-none shadow-[0_2px_12px_rgba(124,58,237,0.3)]">
                      View Full Profile
                      <ArrowUpRight size={14} />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-700 text-[13px] font-semibold rounded-[4px] hover:bg-gray-100 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300">
                      Send Message
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="w-full flex flex-col gap-4">
                <SectionHeader
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                      <LayoutGrid size={13} className="text-white" />
                    </div>
                  }
                  title="All Builders"
                  badge={`${filtered.length} found`}
                />

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedBuilders.map((builder) => (
                      <BuilderCard key={builder.id} builder={builder} />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex justify-center pb-6"
                  >
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="group flex items-center gap-2 px-7 py-2.5 rounded-[4px] bg-white border border-purple-200 text-[13px] font-bold text-purple-600 hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-350 cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.1)] hover:shadow-[0_8px_28px_rgba(124,58,237,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress size={16} sx={{ color: 'inherit' }} />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <AutorenewIcon sx={{ fontSize: 15 }} className="group-hover:rotate-180 transition-transform duration-500" />
                          <span>Load More Builders</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {filtered.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center justify-center text-center bg-white rounded-lg border border-dashed border-gray-200 shadow-sm"
                  >
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                      <SearchIcon sx={{ fontSize: 28 }} className="text-indigo-300" />
                    </div>
                    <h3 className="text-gray-800 font-semibold text-lg mb-1">No builders found</h3>
                    <p className="text-gray-500 text-sm font-medium max-w-[300px]">Try adjusting your search or filters to find what you're looking for.</p>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* ── Right Sidebar ── */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full xl:w-[320px] 2xl:w-[350px] flex flex-col gap-5 shrink-0"
            >
              {/* Image-based Topics Grid (Categories) */}
              <div className="flex flex-col gap-3">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon
                  return (
                    <button 
                      key={topic.name}
                      className="group flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-purple-500/20 active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: topic.bgColor }}
                        >
                          <Icon sx={{ fontSize: 22 }} style={{ color: topic.color }} />
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[var(--color-primary-600)] transition-colors duration-300">
                            {topic.name}
                          </h4>
                          <p className="text-[12px] font-medium text-gray-500 mt-0.5">
                            {topic.count}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  )
                })}
              </div>

              {/* CTA Card */}
              <div className="relative bg-gradient-to-br from-[#312e81] via-[#4338ca] to-[#6366f1] rounded-lg p-6 text-white overflow-hidden shadow-[0_8px_30px_rgba(99,102,241,0.25)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.35)] transition-shadow duration-300">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.06] rounded-full blur-xl -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/[0.04] rounded-full blur-lg translate-y-1/3 -translate-x-1/4" />
                
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                    <Sparkles size={18} className="text-amber-300" />
                  </div>
                  <h3 className="text-[17px] font-semibold mb-2 text-white">Join the Directory</h3>
                  <p className="text-[13px] font-medium text-white/70 mb-5 leading-relaxed">
                    Showcase your projects and connect with 12K+ industry professionals on YardStock.
                  </p>
                  <button className="w-full py-2.5 bg-white text-indigo-700 font-semibold text-[13px] rounded-lg hover:bg-indigo-50 transition-all active:scale-[0.97] border-none cursor-pointer shadow-sm">
                    Apply Now
                  </button>
                </div>
              </div>


            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}