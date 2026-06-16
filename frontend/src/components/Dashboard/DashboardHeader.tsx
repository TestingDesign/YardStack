import { useState, useRef, useEffect, useCallback, memo } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckIcon from '@mui/icons-material/Check'

/* ── Types ─────────────────────────────────────────────────────── */

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
  /** Navigation items for the center nav cards (desktop only) */
  navItems?: NavCardItem[]
  /** Currently active navigation key */
  activeTab?: string
  /** Callback when a navigation card is clicked */
  onTabChange?: (key: string) => void
}

/* ── Constants ─────────────────────────────────────────────────── */

const CITY_OPTIONS = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Chennai', 'Pune', 'Delhi']
const ROLE_OPTIONS = ['Builder', 'Agent', 'Buyer', 'Investor']

/* ── Nav Card ──────────────────────────────────────────────────── */

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
  const isImage = icon?.includes('/') || icon?.includes('.png')

  return (
    <button
      type="button"
      onClick={() => onClick(item.key)}
      className={`
        relative flex flex-col items-center justify-center gap-0.5
        w-[90px] h-[46px] rounded-lg
        transition-all duration-250 ease-out cursor-pointer
        outline-none border
        ${isActive
          ? 'bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white border-transparent shadow-[0_3px_14px_rgba(124,58,237,0.22)] scale-[1.02]'
          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#C4B5FD] hover:shadow-[0_2px_10px_rgba(124,58,237,0.08)] hover:-translate-y-0.5 hover:bg-[#FAFAFF]'
        }
      `}
    >
      {/* Badge */}
      {item.badge && (
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold px-1.5 py-[1px] rounded-full bg-[#7C3AED] text-white leading-none z-10 shadow-sm">
          {item.badge}
        </span>
      )}

      {/* Icon */}
      <span className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'w-5 h-5' : 'w-4 h-4'}`}>
        {isImage ? (
          <img src={icon} alt="" className="w-full h-full object-contain" draggable={false} />
        ) : (
          <span className="text-[18px]">{icon}</span>
        )}
      </span>

      {/* Label */}
      <span
        className={`
          text-[9.5px] leading-[1.15] text-center whitespace-nowrap
          transition-all duration-200
          ${isActive ? 'font-bold text-white' : 'font-semibold text-[#4B5563]'}
        `}
      >
        {item.label}
      </span>
    </button>
  )
})

/* ── Main Header ───────────────────────────────────────────────── */

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

  const closeAll = useCallback(() => {
    setCityOpen(false)
    setProfileOpen(false)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (!cityRef.current?.contains(target) && !profileRef.current?.contains(target)) {
        closeAll()
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] font-['Outfit',sans-serif]">
      <div className="flex items-center h-14 px-3 sm:px-2 w-full gap-4">

        <div className="flex items-center gap-2 sm:gap-1 min-w-0">
          {/* Hamburger */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex items-center justify-center w-8 h-8 rounded-md text-[#4B5563] hover:text-[#6B21A8] hover:bg-[#7C3AED]/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] shrink-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <MenuIcon sx={{ fontSize: 22 }} />
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-[#E5E7EB] shrink-0" aria-hidden="true" />

          {/* City selector */}
          <div ref={cityRef} className="relative min-w-0 shrink">
            <button
              type="button"
              onClick={() => { setCityOpen((v) => !v); setProfileOpen(false) }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#4B5563] hover:bg-[#7C3AED]/5 hover:text-[#1A1A2E] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] min-w-0 cursor-pointer"
            >
              <LocationOnIcon sx={{ fontSize: 18 }} className="text-[#6B21A8] shrink-0" />
              <span className="text-[0.88rem] font-semibold text-[#1A1A2E] leading-none truncate">
                {city}
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className={`text-[#9CA3AF] shrink-0 transition-transform duration-200 ${cityOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {cityOpen && (
              <ul className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E5E7EB] z-50 py-1.5 overflow-hidden animate-[fadeScale_0.15s_ease-out]">
                {CITY_OPTIONS.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => { setCity(opt); closeAll() }}
                    className={`px-4 py-2.5 text-[0.82rem] cursor-pointer transition-colors duration-150 ${
                      opt === city
                        ? 'bg-[#7C3AED]/10 text-[#6B21A8] font-semibold border-l-[3px] border-[#7C3AED]'
                        : 'text-[#4B5563] font-medium hover:bg-[#7C3AED]/5 border-l-[3px] border-transparent'
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ─── CENTER ZONE: Navigation Cards ─── */}
        {navItems.length > 0 && (
          <nav
            aria-label="Primary Navigation"
            className="flex-1 flex items-center justify-center gap-1.5 min-w-0 px-1"
          >
            {navItems.map((item) => (
              <NavCard
                key={item.key}
                item={item}
                isActive={item.key === activeTab}
                onClick={(key) => onTabChange?.(key)}
              />
            ))}
          </nav>
        )}

        {/* ─── RIGHT ZONE: Profile ─── */}
        <div className="flex items-center shrink-0 ml-auto">
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => { setProfileOpen((v) => !v); setCityOpen(false) }}
              className="flex items-center gap-1.5 p-1 pr-2 rounded-md hover:bg-[#7C3AED]/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] cursor-pointer"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]"
                />
              ) : (
                <AccountCircleIcon sx={{ fontSize: 32 }} className="text-[#9CA3AF]" />
              )}
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className={`text-[#9CA3AF] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E5E7EB] z-50 overflow-hidden animate-[fadeScale_0.15s_ease-out]">
                {/* Role selector */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <p className="text-[0.65rem] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Role</p>
                  <div className="flex flex-col gap-0.5">
                    {ROLE_OPTIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRole(r); closeAll() }}
                        className={`flex items-center justify-between w-full text-left text-[0.82rem] px-2.5 py-2 rounded-lg transition-colors duration-150 cursor-pointer border-none ${
                          r === role
                            ? 'bg-[#7C3AED]/10 text-[#6B21A8] font-semibold'
                            : 'text-[#4B5563] hover:bg-[#F3F4F6] font-medium bg-transparent'
                        }`}
                      >
                        <span>{r}</span>
                        {r === role && (
                          <CheckIcon sx={{ fontSize: 16 }} className="text-[#6B21A8]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu items */}
                <ul className="py-1">
                  {['Profile', 'Settings', 'Sign out'].map((item) => (
                    <li
                      key={item}
                      onClick={closeAll}
                      className="px-4 py-2.5 text-[0.82rem] font-medium text-[#4B5563] hover:bg-[#7C3AED]/5 hover:text-[#1A1A2E] cursor-pointer transition-colors duration-150"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}