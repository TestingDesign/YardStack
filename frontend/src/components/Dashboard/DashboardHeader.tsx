import { useState, useRef, useEffect, useCallback, memo } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckIcon from '@mui/icons-material/Check'

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
  const isImage = icon?.includes('/') || icon?.includes('.png')

  return (
    <button
      type="button"
      onClick={() => onClick(item.key)}
      className={`relative flex flex-col items-center justify-center gap-1 min-w-[90px] md:min-w-[100px] h-[50px] md:h-[58px] rounded-xl transition-all duration-250 ease-out cursor-pointer outline-none border ${
        isActive
          ? 'bg-[var(--color-primary-600)] text-white border-transparent shadow-[0_4px_16px_rgba(90,29,238,0.3)] scale-[1.02]'
          : 'bg-white text-[var(--color-text-primary)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] hover:shadow-sm hover:-translate-y-0.5'
      }`}
    >
      {item.badge && (
        <span className="absolute -top-1.5 -right-1.5 whitespace-nowrap text-[9px] font-bold px-1.5 py-[2px] rounded-full bg-[var(--color-secondary-500)] text-white leading-none z-10 shadow-sm">
          {item.badge}
        </span>
      )}

      <span className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'w-5 h-5 md:w-6 md:h-6 text-white' : 'w-4 h-4 md:w-5 md:h-5 text-[var(--color-primary-600)]'}`}>
        {isImage ? (
          <img src={icon} alt={item.label} className="w-full h-full object-contain" draggable={false} />
        ) : (
          <span className="text-[20px] md:text-[24px]">{icon}</span>
        )}
      </span>

      <span
        className={`text-[10px] md:text-[11px] leading-[1.15] text-center whitespace-nowrap transition-all duration-200 ${
          isActive ? 'font-bold text-white' : 'font-bold text-[var(--color-text-primary)]'
        }`}
      >
        {item.label}
      </span>
    </button>
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
    <header className="sticky top-0 z-50 bg-[var(--color-bg-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border-default)] font-['Outfit',sans-serif]">
      <div className="flex items-center h-16 md:h-20 px-4 sm:px-6 w-full gap-4">

        {navItems.length > 0 && (
          <nav
            aria-label="Primary Navigation"
            className="flex-1 flex items-center justify-start gap-1.5 md:gap-2 min-w-0 px-1"
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

        <div className="flex items-center gap-2 sm:gap-1 min-w-0">
          {onMenuClick && (
            <>
              <button
                type="button"
                onClick={onMenuClick}
                className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple-mid)]/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] shrink-0 cursor-pointer"
                aria-label="Toggle menu"
              >
                <MenuIcon sx={{ fontSize: 22 }} />
              </button>

              <div className="w-px h-5 bg-[var(--color-border-default)] shrink-0" aria-hidden="true" />
            </>
          )}

          <div ref={cityRef} className="relative min-w-0 shrink">
            <button
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
            </button>

            {cityOpen && (
              <ul className="absolute left-0 top-full mt-2 w-44 bg-[var(--color-bg-surface)] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] z-50 py-1.5 overflow-hidden animate-[fadeScale_0.15s_ease-out]">
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
              </ul>
            )}
          </div>
        </div>  

        <div className="flex items-center shrink-0 ml-auto">
          <div ref={profileRef} className="relative">
            <button
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
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[var(--color-bg-surface)] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] z-50 overflow-hidden animate-[fadeScale_0.15s_ease-out]">
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
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}