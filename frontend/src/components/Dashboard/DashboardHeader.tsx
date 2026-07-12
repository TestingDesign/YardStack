import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  MapPin,
  ChevronDown,
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  UserCircle,
  Video,
  Mic,
  Briefcase,
  Users,
  Bell
} from 'lucide-react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import type { TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import LogoPng from '../../Home/01.Hero/Logo.png'

const NavTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  zIndex: 9999,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#334155',
    maxWidth: 288,
    fontSize: '0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)',
    borderRadius: '0.375rem',
    padding: '1rem',
    backdropFilter: 'blur(24px)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(255, 255, 255, 0.95)',
    '&::before': {
      border: '1px solid rgba(255, 255, 255, 0.4)',
    }
  },
}))

export interface NavCardItem {
  key: string
  label: string
  Icon: React.ElementType | string
  activeIcon?: React.ElementType | string
  badge?: string
  tooltip?: string
}

export interface DashboardHeaderProps {
  onMenuClick?: () => void
  city?: string
  role?: string
  userName?: string
  avatarUrl?: string
  navItems?: NavCardItem[]
  activeTab?: string
  onTabChange?: (key: string) => void
  isMobileView?: boolean
}

const CITY_OPTIONS = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Chennai', 'Pune', 'Delhi']
const ROLE_OPTIONS = ['Builder', 'Agent', 'Buyer', 'Investor']

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New Message', desc: 'Sarah left a comment on your video.', time: '5m ago', unread: true },
  { id: 2, title: 'Opportunity Alert', desc: 'New commercial property listed in Hyderabad.', time: '2h ago', unread: true },
  { id: 3, title: 'System Update', desc: 'Your profile visibility has been updated.', time: '1d ago', unread: false },
]

export const navigationData: NavCardItem[] = [
  {
    key: 'short-videos',
    label: 'Short Videos',
    Icon: Video,
    badge: 'SPOTLIGHT',
    tooltip: 'Bite-sized, high-impact videos to engage, learn, build credibility and stay updated with the real estate ecosystem.',
  },
  {
    key: 'podcasts',
    label: 'Podcasts',
    Icon: Mic,
    badge: 'RED EXPERT',
    tooltip: 'In-depth conversations with real estate domain experts, practitioners and industry leaders sharing practical insights and experiences.',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    Icon: Briefcase,
    badge: 'MARKETPLACE',
    tooltip: 'Discover jobs, vendor requirements, agent hiring, partnerships, collaborations and other B2B opportunities across the ecosystem.',
  },
  {
    key: 'directory',
    label: 'Directory',
    Icon: Users,
    badge: 'DATABASE',
    tooltip: 'Explore a comprehensive directory of verified professionals, businesses and service providers across the real estate ecosystem.',
  }
]

function useScrollDirection(threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      if (Math.abs(scrollY - lastScrollY.current) < threshold) return
      setIsScrolled(scrollY > 20)
      lastScrollY.current = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [threshold])

  return isScrolled
}

const NavCard = memo(function NavCard({
  item,
  isActive,
  onClick,
}: {
  item: NavCardItem
  isActive: boolean
  onClick: (key: string) => void
}) {
  const [open, setOpen] = useState(false)
  
  const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.Icon
  const isImage = typeof IconComponent === 'string'

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  const tooltipContent = item.tooltip ? (
    <span className="block font-medium text-slate-600">{item.tooltip}</span>
  ) : ""

  const buttonContent = (
    <div className="relative flex items-center justify-center group">
      <motion.button
        type="button"
        onKeyDown={handleKeyDown}
        onClick={() => onClick(item.key)}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`relative shrink-0 flex flex-row items-center justify-center gap-2.5 transition-all duration-400 ease-out outline-none cursor-pointer px-4 h-[42px] md:h-[46px] rounded border ${
          isActive
            ? 'border-transparent shadow-[0_8px_20px_-6px_rgba(124,58,237,0.4)]'
            : 'border-slate-200/60 bg-white/50 hover:bg-white hover:border-slate-300 hover:text-slate-900 text-slate-600 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] backdrop-blur-sm'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeNavTabGlow"
            className="absolute inset-0 rounded bg-gradient-to-r from-purple-600 to-pink-500"
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        )}
        
        {isActive && (
          <div className="absolute inset-0 rounded shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
        )}

        <span className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
          isActive ? 'text-white scale-110 drop-shadow-md' : 'text-slate-400 group-hover:text-violet-600'
        }`}>
          {isImage ? (
            <img src={IconComponent as string} alt={item.label} className="w-4 h-4 object-contain" draggable={false} />
          ) : (
            <IconComponent className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
          )}
        </span>

        <span
          className={`relative z-10 text-[13px] tracking-wide whitespace-nowrap transition-all duration-300 ${
            isActive ? 'font-bold text-white drop-shadow-sm' : 'font-medium text-slate-600 group-hover:text-slate-900'
          }`}
        >
          {item.label}
        </span>

        {item.badge && (
          <span className={`absolute -top-1.5 -right-1.5 whitespace-nowrap text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none z-20 shadow-sm border transition-colors duration-300 ${
            isActive 
              ? 'bg-white text-fuchsia-600 border-white/20'
              : 'bg-violet-50 text-violet-600 border-violet-100' 
          }`}>
            {item.badge}
          </span>
        )}
      </motion.button>
    </div>
  )

  return item.tooltip ? (
    <NavTooltip 
      title={tooltipContent} 
      arrow 
      placement="bottom" 
      enterTouchDelay={50}
      leaveTouchDelay={3000}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      {buttonContent}
    </NavTooltip>
  ) : buttonContent
})

export default function DashboardHeader({
  onMenuClick,
  city: initialCity = 'Hyderabad',
  role: initialRole = 'Builder',
  userName = 'Alex Mitchell',
  avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  navItems = navigationData,
  activeTab = 'short-videos',
  onTabChange,
  isMobileView = false,
}: DashboardHeaderProps) {
  const [city, setCity] = useState(initialCity)
  const [role, setRole] = useState(initialRole)
  const [cityOpen, setCityOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const isScrolled = useScrollDirection()

  const cityRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const navScrollRef = useRef<HTMLElement>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleNavScroll = useCallback(() => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5)
    }
  }, [])

  useEffect(() => {
    handleNavScroll()
    const timer = setTimeout(() => handleNavScroll(), 100)
    window.addEventListener('resize', handleNavScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleNavScroll)
    }
  }, [handleNavScroll, navItems])

  const scrollNav = (direction: 'left' | 'right') => {
    navScrollRef.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const closeAll = useCallback(() => {
    setCityOpen(false)
    setProfileOpen(false)
    setNotificationOpen(false)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target
      if (target instanceof Node) {
        if (
          !cityRef.current?.contains(target) && 
          !profileRef.current?.contains(target) &&
          !notificationRef.current?.contains(target)
        ) {
          closeAll()
        }
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAll()
    }

    document.addEventListener('mousedown', handleClick, { capture: true })
    document.addEventListener('keydown', handleKey, { capture: true })
    return () => {
      document.removeEventListener('mousedown', handleClick, { capture: true })
      document.removeEventListener('keydown', handleKey, { capture: true })
    }
  }, [closeAll])

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] py-1' 
          : 'bg-white/40 backdrop-blur-lg border-b border-slate-200/30'
      }`}
    >
      <div className={`max-w-[1600px] mx-auto flex items-center ${isMobileView ? 'h-14 pl-1 pr-2 gap-1' : 'h-16 pl-4 pr-4 md:pr-8 gap-6 lg:gap-10'} w-full`}>
        
        <div className={`flex items-center shrink-0 relative z-10 ${isMobileView ? 'gap-0' : 'gap-3'}`}>
          {onMenuClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className={`flex items-center justify-center rounded text-slate-500 hover:text-violet-600 hover:bg-violet-50/80 hover:shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 shrink-0 ${isMobileView ? 'w-9 h-9 mt-1.5' : 'w-10 h-10 mt-1.5'}`}
              aria-label="Toggle menu"
            >
              <Menu className={`${isMobileView ? 'w-5 h-5' : 'w-5 h-5'}`} />
            </motion.button>
          )}
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group cursor-pointer"
          >
            {LogoPng ? (
              <img src={LogoPng} alt="N4RE Logo" className={`${isMobileView ? 'h-10' : 'h-12 ml-1'} w-auto object-contain shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105`} />
            ) : (
              <div className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                N4RE
              </div>
            )}
          </motion.div>
          
          {!isMobileView && <div className="hidden lg:block w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-200 to-transparent shrink-0 ml-2" />}
        </div>

        {!isMobileView && (
        <div className="flex-1 min-w-0 relative h-full flex items-center justify-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-slate-50/50 rounded -z-10 mx-4 border border-slate-100/50" />

          <AnimatePresence>
            {canScrollLeft && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-2 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent flex items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollNav('left')}
                  className="pointer-events-auto w-8 h-8 rounded bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-100 transition-all ml-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <nav
            ref={navScrollRef}
            onScroll={handleNavScroll}
            className="flex items-center justify-start gap-2 md:gap-3 overflow-x-auto w-full max-w-full px-6 py-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none snap-x"
          >
            <div className="flex items-center gap-2 md:gap-3 m-auto">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.key} 
                  className="snap-center shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                >
                  <NavCard
                    item={item}
                    isActive={item.key === activeTab}
                    onClick={(key) => onTabChange?.(key)}
                  />
                </motion.div>
              ))}
            </div>
          </nav>

          <AnimatePresence>
            {canScrollRight && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-2 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollNav('right')}
                  className="pointer-events-auto w-8 h-8 rounded bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-100 transition-all mr-1"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        )}

        <div className={`flex items-center shrink-0 relative z-10 ml-auto ${isMobileView ? 'gap-1' : 'gap-2 md:gap-4'}`}>
          {!isMobileView && (
          <div ref={notificationRef} className="relative hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { 
                setNotificationOpen((v) => !v); 
                setProfileOpen(false); 
                setCityOpen(false); 
              }}
              className={`flex w-10 h-10 items-center justify-center rounded transition-colors relative ${
                notificationOpen ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/50'
              }`}
            >
              <Bell className="w-4 h-4" />
              {MOCK_NOTIFICATIONS.some(n => n.unread) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              )}
            </motion.button>

            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-full mt-3 w-80 bg-white/95 backdrop-blur-xl rounded shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100/80 bg-slate-50/50">
                    <span className="text-sm font-semibold text-slate-800">Notifications</span>
                    <button className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors cursor-pointer ${
                          notif.unread ? 'bg-violet-50/30' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-sm ${notif.unread ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {notif.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          )}

          {!isMobileView && <div className="hidden lg:block w-[1px] h-6 bg-slate-200 shrink-0 mx-1" />}

          <div ref={cityRef} className={`relative ${isMobileView ? '' : 'hidden sm:block'}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setCityOpen((v) => !v); setProfileOpen(false); setNotificationOpen(false); }}
              className={`flex items-center rounded border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
                isMobileView ? 'gap-1 px-1.5 py-1' : 'gap-2 px-3 md:px-4 py-2 md:py-2.5'
              } ${
                cityOpen 
                  ? 'bg-violet-50 border-violet-200 text-violet-700 shadow-sm' 
                  : 'bg-white/80 border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className={`rounded-full ${isMobileView ? 'p-0.5' : 'p-1'} ${cityOpen ? 'bg-violet-100/50' : 'bg-slate-100'}`}>
                <MapPin className={`${isMobileView ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${cityOpen ? 'text-violet-600' : 'text-slate-400'}`} />
              </div>
              <span className={`${isMobileView ? 'text-[11px] max-w-[65px] truncate' : 'text-sm'} font-medium leading-none mt-0.5`}>{city}</span>
              <ChevronDown className={`${isMobileView ? 'w-3 h-3' : 'w-3.5 h-3.5'} transition-transform duration-300 shrink-0 ${cityOpen ? 'rotate-180 text-violet-600' : 'text-slate-400'}`} />
            </motion.button>

            <AnimatePresence>
              {cityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`absolute right-0 top-full mt-3 ${isMobileView ? 'w-48 p-1.5' : 'w-56 p-2'} bg-white/95 backdrop-blur-xl rounded shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] z-50 overflow-hidden`}
                >
                  <div className={`px-2 ${isMobileView ? 'py-1 mb-0.5' : 'py-2 mb-1'}`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Region</p>
                  </div>
                  {CITY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setCity(opt); closeAll() }}
                      className={`w-full text-left rounded transition-all duration-200 flex items-center justify-between group hover:bg-violet-50/50 ${
                        isMobileView ? 'px-2.5 py-1.5 text-[13px]' : 'px-3 py-2.5 text-sm'
                      }`}
                    >
                      <span className={`transition-colors ${opt === city ? 'text-violet-700 font-semibold' : 'text-slate-600 group-hover:text-violet-900 font-medium'}`}>
                        {opt}
                      </span>
                      {opt === city && (
                        <motion.div layoutId="cityCheck">
                          <Check className={`${isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-violet-600`} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={profileRef} className="relative ml-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setProfileOpen((v) => !v); setCityOpen(false); setNotificationOpen(false); }}
              className={`flex items-center rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
                isMobileView ? 'gap-1 p-0.5 pr-1' : 'gap-2 p-1 pr-2.5'
              } ${
                profileOpen ? 'bg-slate-100 shadow-inner' : 'bg-white/80 hover:shadow-sm'
              }`}
            >
              <div className="relative">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className={`${isMobileView ? 'w-7 h-7' : 'w-9 h-9'} rounded-full object-cover border-2 border-white shadow-sm`} />
                ) : (
                  <div className={`${isMobileView ? 'w-7 h-7' : 'w-9 h-9'} rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center border-2 border-white shadow-sm text-violet-600`}>
                    <User className={`${isMobileView ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  </div>
                )}
                <div className={`absolute bottom-0 right-0 ${isMobileView ? 'w-2 h-2 border-[1.5px]' : 'w-2.5 h-2.5 border-2'} bg-emerald-400 border-white rounded-full`} />
              </div>
              <ChevronDown className={`${isMobileView ? 'w-3 h-3' : 'w-3.5 h-3.5'} transition-transform duration-300 ${profileOpen ? 'rotate-180 text-violet-600' : 'text-slate-400'}`} />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`absolute right-0 top-full mt-3 ${isMobileView ? 'w-56' : 'w-64'} bg-white/95 backdrop-blur-xl rounded shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] z-50 overflow-hidden`}
                >
                  <div className={`${isMobileView ? 'px-4 py-3' : 'px-5 py-4'} border-b border-slate-100/80 bg-gradient-to-b from-slate-50/50 to-transparent`}>
                    <p className={`${isMobileView ? 'text-xs' : 'text-sm'} font-semibold text-slate-800 truncate`}>{userName}</p>
                    <p className={`${isMobileView ? 'text-[10px]' : 'text-xs'} text-slate-400 mt-0.5 truncate`}>{userName.toLowerCase().replace(' ', '.')}@example.com</p>
                  </div>

                  <div className={`${isMobileView ? 'px-2 py-2' : 'px-3 py-3'} border-b border-slate-100/80`}>
                    <p className={`px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${isMobileView ? 'mb-1' : 'mb-2'}`}>Switch Role</p>
                    <div className="space-y-0.5">
                      {ROLE_OPTIONS.map((r) => (
                        <button
                          key={r}
                          onClick={() => { setRole(r); closeAll() }}
                          className={`flex items-center justify-between w-full rounded transition-all duration-200 ${
                            isMobileView ? 'px-2.5 py-1.5 text-[13px]' : 'px-3 py-2 text-sm'
                          } ${
                            r === role
                              ? 'bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700 font-semibold shadow-sm border border-violet-100/50'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium border border-transparent'
                          }`}
                        >
                          {r}
                          {r === role && (
                            <motion.div layoutId="roleCheck">
                              <Check className={`${isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-violet-600`} />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={isMobileView ? 'p-1' : 'p-2'}>
                    <button onClick={closeAll} className={`w-full flex items-center rounded font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors group ${isMobileView ? 'gap-2 px-2 py-1.5 text-xs' : 'gap-3 px-3 py-2.5 text-sm'}`}>
                      <div className={`rounded bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-violet-500 transition-all ${isMobileView ? 'p-1' : 'p-1.5'}`}>
                        <UserCircle className={isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                      </div>
                      My Profile
                    </button>
                    <button onClick={closeAll} className={`w-full flex items-center rounded font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors group ${isMobileView ? 'gap-2 px-2 py-1.5 text-xs' : 'gap-3 px-3 py-2.5 text-sm'}`}>
                      <div className={`rounded bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-violet-500 transition-all ${isMobileView ? 'p-1' : 'p-1.5'}`}>
                        <Settings className={isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                      </div>
                      Account Settings
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button onClick={closeAll} className={`w-full flex items-center rounded font-medium text-rose-600 hover:bg-rose-50 transition-colors group ${isMobileView ? 'gap-2 px-2 py-1.5 text-xs' : 'gap-3 px-3 py-2.5 text-sm'}`}>
                      <div className={`rounded bg-rose-50/50 text-rose-500 group-hover:bg-white group-hover:shadow-sm transition-all ${isMobileView ? 'p-1' : 'p-1.5'}`}>
                        <LogOut className={isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                      </div>
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  )
}