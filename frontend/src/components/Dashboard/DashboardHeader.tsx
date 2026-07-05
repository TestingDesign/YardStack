import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckIcon from '@mui/icons-material/Check'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavCardItem {
  key: string
  label: string
  Icon: string
  activeIcon?: string
  badge?: string
}

interface DashboardHeaderProps {
  onMenuClick?: () => void
  city?: string
  role?: string
  userName?: string
  avatarUrl?: string
  navItems?: NavCardItem[]
  activeTab?: string
  onTabChange?: (key: string) => void
}

const CITY_OPTIONS = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Chennai', 'Pune', 'Delhi']
const ROLE_OPTIONS = ['Builder', 'Agent', 'Buyer', 'Investor']

const NavCard = memo(function NavCard({
  item,
  isActive,
  onClick,
}: {
  item: NavCardItem
  isActive: boolean
  onClick: (key: string) => void
}) {
  const icon = isActive && item.activeIcon ? item.activeIcon : item.Icon
  const isImage = typeof icon === 'string' && (icon.includes('/') || icon.includes('.png'))

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={() => onClick(item.key)}
      className={`relative shrink-0 flex flex-row items-center justify-center gap-2 md:gap-2.5 transition-all duration-300 outline-none cursor-pointer px-3 md:px-4 h-[44px] md:h-[48px] rounded-[8px] border ${
        isActive
          ? 'bg-linear-to-r from-[#7C3AED] to-[#EC4899] border-transparent shadow-[0_4px_16px_rgba(124,58,237,0.25)] scale-[1.02]'
          : 'bg-white text-[#374151] border-gray-200 hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5'
      }`}
    >
      <span className={`flex items-center justify-center transition-all duration-300 ${isActive ? 'w-5 h-5 md:w-6 md:h-6 text-white' : 'w-5 h-5 md:w-6 md:h-6 text-[#374151]'}`}>
        {isImage ? (
          <img src={icon as string} alt={item.label} className="w-full h-full object-contain" draggable={false} />
        ) : (
          <span className="text-[20px] md:text-[24px]">
            {typeof icon === 'object' && icon !== null && '$$typeof' in icon && !('props' in icon)
              ? (() => { const IconCmp = icon as any; return <IconCmp />; })()
              : typeof icon === 'function'
              ? (() => { const IconCmp = icon as any; return <IconCmp />; })()
              : icon}
          </span>
        )}
      </span>

      <span
        className={`text-[12px] md:text-[13px] leading-[1.15] text-center whitespace-nowrap transition-all duration-200 ${
          isActive ? 'font-semibold text-white' : 'font-semibold text-[#374151]'
        }`}
      >
        {item.label}
      </span>

      {item.badge && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-[2px] rounded-full bg-[#7C3AED] text-white leading-none z-10 shadow-sm border border-white">
          {item.badge}
        </span>
      )}
    </motion.button>
  )
})

export default function DashboardHeader({
  onMenuClick,
  city: initialCity = 'Hyderabad',
  role: initialRole = 'Builder',
  userName = 'User',
  avatarUrl,
  navItems = [],
  activeTab = '',
  onTabChange,
}: DashboardHeaderProps) {
  const [city, setCity] = useState(initialCity)
  const [role, setRole] = useState(initialRole)
  const [cityOpen, setCityOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const cityRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const navScrollRef = useRef<HTMLElement>(null)

  const [canScrollLeftNav, setCanScrollLeftNav] = useState(false)
  const [canScrollRightNav, setCanScrollRightNav] = useState(true)

  const handleNavScroll = useCallback(() => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current
      setCanScrollLeftNav(scrollLeft > 5)
      setCanScrollRightNav(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5)
    }
  }, [])

  useEffect(() => {
    handleNavScroll()
    const timer = setTimeout(() => handleNavScroll(), 50)
    window.addEventListener('resize', handleNavScroll)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleNavScroll) }
  }, [handleNavScroll, navItems])

  const scrollNavLeft = () => navScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  const scrollNavRight = () => navScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })

  const closeAll = useCallback(() => {
    setCityOpen(false)
    setProfileOpen(false)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target
      if (target instanceof Node) {
        if (!cityRef.current?.contains(target) && !profileRef.current?.contains(target)) {
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
    <header className="sticky top-0 z-50 bg-[var(--color-bg-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border-default)]">
      <div className="flex items-center h-16 px-2 sm:px-2 w-full gap-4">

        {navItems.length > 0 && (
          <div className="flex-1 min-w-0 relative group/navslider h-full flex items-center">
            {canScrollLeftNav && (
              <div className="absolute left-0 top-0 bottom-0 w-12 z-20 pointer-events-none bg-gradient-to-r from-[var(--color-bg-surface)] via-[var(--color-bg-surface)]/80 to-transparent flex items-center">
                <div className="pointer-events-auto -ml-1">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollNavLeft}
                    className="w-7 h-7 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>
                </div>
              </div>
            )}

            <nav
              ref={navScrollRef}
              onScroll={handleNavScroll}
              aria-label="Primary Navigation"
              className="flex items-center justify-start gap-1.5 md:gap-2 overflow-x-auto w-full px-1 py-3 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none snap-x"
            >
              {navItems.map((item) => (
                <div key={item.key} className="snap-start shrink-0">
                  <NavCard
                    item={item}
                    isActive={item.key === activeTab}
                    onClick={(key) => onTabChange?.(key)}
                  />
                </div>
              ))}
            </nav>

            {canScrollRightNav && (
              <div className="absolute right-0 top-0 bottom-0 w-12 z-20 pointer-events-none bg-gradient-to-l from-[var(--color-bg-surface)] via-[var(--color-bg-surface)]/80 to-transparent flex items-center justify-end">
                <div className="pointer-events-auto -mr-1">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollNavRight}
                    className="w-7 h-7 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-1 min-w-0">
          {onMenuClick && (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onMenuClick}
                className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple-mid)]/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] shrink-0 cursor-pointer"
                aria-label="Toggle menu"
              >
                <MenuIcon sx={{ fontSize: 22 }} />
              </motion.button>

              <div className="w-px h-5 bg-[var(--color-border-default)] shrink-0" aria-hidden="true" />
            </>
          )}

          <div ref={cityRef} className="relative min-w-0 shrink">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => { setCityOpen((v) => !v); setProfileOpen(false) }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-purple-mid)]/5 hover:text-[var(--color-text-primary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] min-w-0 cursor-pointer"
            >
              <LocationOnIcon sx={{ fontSize: 18 }} className="text-[var(--color-brand-purple)] shrink-0" />
              <span className="text-[0.88rem] font-semibold text-[var(--color-text-primary)] leading-none truncate">
                {city}
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className={`text-[var(--color-text-secondary)]/70 shrink-0 transition-transform duration-200 ${cityOpen ? 'rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
            {cityOpen && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="absolute left-0 top-full mt-2 w-44 bg-[var(--color-bg-surface)] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] z-50 py-1.5 overflow-hidden"
              >
                {CITY_OPTIONS.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => { setCity(opt); closeAll() }}
                      className={`w-full text-left px-4 py-2.5 text-[0.82rem] cursor-pointer transition-colors duration-150 ${
                        opt === city
                          ? 'bg-[var(--color-brand-purple-mid)]/10 text-[var(--color-brand-purple)] font-semibold border-l-[3px] border-[var(--color-brand-purple-mid)]'
                          : 'text-[var(--color-text-secondary)] font-medium hover:bg-[var(--color-brand-purple-mid)]/5 border-l-[3px] border-transparent'
                      }`}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
            </AnimatePresence>
          </div>
        </div>  

        <div className="flex items-center shrink-0 ml-auto">
          <div ref={profileRef} className="relative">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => { setProfileOpen((v) => !v); setCityOpen(false) }}
              className="flex items-center gap-1.5 p-1 pr-2 rounded-md hover:bg-[var(--color-brand-purple-mid)]/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] cursor-pointer"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover border border-[var(--color-border-default)]"
                />
              ) : (
                <AccountCircleIcon sx={{ fontSize: 32 }} className="text-[var(--color-text-secondary)]/70" />
              )}
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className={`text-[var(--color-text-secondary)]/70 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="absolute right-0 top-full mt-2 w-52 bg-[var(--color-bg-surface)] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-[var(--color-border-default)] bg-[var(--color-bg-muted)]">
                  <p className="text-[0.65rem] font-bold text-[var(--color-text-secondary)]/70 uppercase tracking-wider mb-2">Role</p>
                  <div className="flex flex-col gap-0.5">
                    {ROLE_OPTIONS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRole(r); closeAll() }}
                        className={`flex items-center justify-between w-full text-left text-[0.82rem] px-2.5 py-2 rounded-lg transition-colors duration-150 cursor-pointer border-none ${
                          r === role
                            ? 'bg-[var(--color-brand-purple-mid)]/10 text-[var(--color-brand-purple)] font-semibold'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]/50 font-medium bg-transparent'
                        }`}
                      >
                        <span>{r}</span>
                        {r === role && (
                          <CheckIcon sx={{ fontSize: 16 }} className="text-[var(--color-brand-purple)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="py-1">
                  {['Profile', 'Settings', 'Sign out'].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={closeAll}
                        className="w-full text-left px-4 py-2.5 text-[0.82rem] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-purple-mid)]/5 hover:text-[var(--color-text-primary)] cursor-pointer transition-colors duration-150"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  )
}