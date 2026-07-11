import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Home, Users, Bookmark, PlusSquare, PanelLeftClose, PanelLeft } from 'lucide-react'

export type DashboardNavKey = 'home' | 'leads' | 'manage' | 'saved' | 'post'

interface DashboardNavItem {
  key: DashboardNavKey
  label: string
  Icon: React.ElementType
  description: string
}

interface DashboardSidebarProps {
  active?: DashboardNavKey
  onNavigate?: (k: DashboardNavKey) => void
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
  isScrollEffectEnabled?: boolean
}

interface TooltipState {
  label: string
  x: number
  y: number
  visible: boolean
}

const HIDDEN_TOOLTIP: TooltipState = { label: '', x: 0, y: 0, visible: false }

// Custom asymmetrical layout grid icon from image_e9c1a3.png
const ManageIcon = ({ size = 24, className = '', ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="4" y="4" width="6" height="9" rx="1.5" />
    <rect x="4" y="16" width="6" height="4" rx="1.5" />
    <rect x="14" y="4" width="6" height="4" rx="1.5" />
    <rect x="14" y="11" width="6" height="9" rx="1.5" />
  </svg>
)

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { key: 'home', label: 'Home', Icon: Home, description: 'Dashboard overview & activity feed' },
  { key: 'leads', label: 'Leads', Icon: Users, description: 'Manage and track your lead pipeline' },
  { key: 'manage', label: 'Manage', Icon: ManageIcon, description: 'Listings, settings & configurations' },
  { key: 'saved', label: 'Saved', Icon: Bookmark, description: 'Bookmarked properties & searches' },
  { key: 'post', label: 'Post', Icon: PlusSquare, description: 'Create & publish new listings' },
]

function getPos(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return { x: r.right + 12, y: r.top + r.height / 2 }
}

const SCROLL_THRESHOLD = 8

function useScrollDirection(isOpen?: boolean) {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)
  const lastScrollEl = useRef<EventTarget | null>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target

      if (target instanceof HTMLElement) {
        if (target.closest('[data-sidebar-root]')) return
        if (target.scrollHeight <= target.clientHeight) return
      }

      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        let currentY = 0
        if (target instanceof HTMLElement) {
          currentY = target.scrollTop
        } else {
          currentY = window.scrollY || document.documentElement.scrollTop
        }

        if (lastScrollEl.current !== target) {
          lastScrollEl.current = target
          lastScrollY.current = currentY
          ticking.current = false
          return
        }

        const delta = currentY - lastScrollY.current

        if (delta > SCROLL_THRESHOLD) {
          setIsHidden(true)
          lastScrollY.current = currentY
        } else if (delta < -SCROLL_THRESHOLD) {
          setIsHidden(false)
          lastScrollY.current = currentY
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', onScroll, { capture: true })
  }, [])

  useEffect(() => {
    setIsHidden(false)
  }, [isOpen])

  return isHidden
}

export default function DashboardSidebar({
  active = 'home',
  onNavigate,
  isOpen: externalIsOpen,
  onToggle,
  isScrollEffectEnabled = false,
}: DashboardSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const isControlled = externalIsOpen !== undefined
  const isOpen = isControlled ? externalIsOpen : internalIsOpen

  const handleToggle = () => {
    const newVal = !isOpen
    if (!isControlled) {
      setInternalIsOpen(newVal)
    }
    onToggle?.(newVal)
  }
  
  const [tooltip, setTooltip] = useState<TooltipState>(HIDDEN_TOOLTIP)
  const [mounted, setMounted] = useState(false)
  const isScrollHiddenRaw = useScrollDirection(isOpen)
  const isScrollHidden = isScrollEffectEnabled ? isScrollHiddenRaw : false

  const sidebarRef = useRef<HTMLElement>(null)
  const [sidebarWidth, setSidebarWidth] = useState(isOpen ? 240 : 72)

  useEffect(() => {
    setSidebarWidth(isOpen ? 240 : 72)
  }, [isOpen])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const hide = () => setTooltip(HIDDEN_TOOLTIP)
    window.addEventListener('scroll', hide, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', hide, { capture: true })
  }, [])

  const showTooltip = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, label: string) => {
      if (isOpen) return
      const pos = getPos(e.currentTarget)
      setTooltip({ label, x: pos.x, y: pos.y, visible: true })
    },
    [isOpen]
  )

  const hideTooltip = useCallback(() => setTooltip(HIDDEN_TOOLTIP), [])

  const handleNavigate = (key: DashboardNavKey) => {
    onNavigate?.(key)
  }

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-15px) scale(0.98); }
            to { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes tooltipEnter {
            from { opacity: 0; transform: translateY(-50%) translateX(-10px) scale(0.9); }
            to { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }
          }
          @keyframes shimmerText {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          @keyframes activeIndicator {
            0% { transform: translateY(-50%) scaleY(0.5); opacity: 0; }
            100% { transform: translateY(-50%) scaleY(1); opacity: 1; }
          }
          .nav-item-enter {
            animation: slideInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            opacity: 0;
          }
          .tooltip-animate {
            animation: tooltipEnter 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .shimmer-text {
            background-size: 200% auto;
            animation: shimmerText 3s linear infinite;
          }
        `}
      </style>

      <div
        className="shrink-0 h-full transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
        style={{ width: sidebarWidth }}
        aria-hidden={isScrollHidden}
      >
        <aside
          ref={sidebarRef}
          data-sidebar-root
          aria-label="Dashboard Navigation Sidebar"
          className={`flex flex-col shrink-0 h-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-[50] motion-reduce:transition-none ${
            !isOpen ? 'w-[72px]' : 'w-60'
          }`}
          style={{
            background: isScrollHidden 
              ? 'transparent' 
              : 'linear-gradient(170deg, #1f0f3a 0%, #1A1A2E 40%, #131a30 100%)',
            boxShadow: isScrollHidden ? 'none' : '4px 0 32px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.05)',
          }}
        >
          <div 
            className="flex-1 flex flex-col min-h-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: isScrollHidden ? 'translateX(-100%)' : 'translateX(0)',
              opacity: isScrollHidden ? 0 : 1,
              pointerEvents: isScrollHidden ? 'none' : 'auto',
            }}
          >
            <div className="px-3 pb-4 pt-2">
              <div className="border-t border-white/5 w-full shadow-[0_1px_0_rgba(255,255,255,0.02)]" aria-hidden="true" />
            </div>

            <nav
              aria-label="Sidebar Menu"
              className="flex-1 overflow-y-auto overflow-x-hidden pb-2 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-3"
            >
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5 flex-1" role="list">
                {DASHBOARD_NAV_ITEMS.map(({ key, label, Icon }, index) => {
                  const isActive = key === active
                  return (
                    <li
                      key={key}
                      className="relative group nav-item-enter"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <button
                        onClick={() => handleNavigate(key)}
                        onMouseEnter={(e) => showTooltip(e, label)}
                        onFocus={(e) => showTooltip(e, label)}
                        onMouseLeave={hideTooltip}
                        onBlur={hideTooltip}
                        aria-label={label}
                        aria-current={isActive ? 'page' : undefined}
                        className={`w-full flex items-center py-2.5 rounded-[4px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] ${
                          !isOpen ? 'justify-center px-0' : 'justify-start px-3.5 gap-4'
                        } ${
                          isActive
                            ? 'bg-gradient-to-r from-white/10 to-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2)]'
                            : 'hover:bg-white/5 hover:translate-x-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        }`}
                      >
                        <div className={`flex items-center justify-center rounded-[4px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          !isOpen ? 'w-full' : 'w-7 h-7'
                        } ${
                          isActive && isOpen ? 'bg-[#D946EF]/20 shadow-[0_0_12px_rgba(217,70,239,0.25)] scale-110' : 'group-hover:scale-110'
                        }`}>
                          <Icon
                            size={!isOpen ? 22 : 18}
                            aria-hidden="true"
                            className={`shrink-0 transition-all duration-300 ${
                              isActive 
                                ? 'text-[#D946EF] stroke-[2.2] drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' 
                                : 'text-white/60 stroke-[1.8] group-hover:text-white/95'
                            }`}
                          />
                        </div>

                        <div
                          className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            !isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
                          }`}
                        >
                          <span className={`text-sm text-left leading-tight font-medium truncate transition-colors duration-300 ${
                            isActive ? 'text-white drop-shadow-sm' : 'text-white/70 group-hover:text-white'
                          }`}>
                            {label}
                          </span>
                        </div>

                        {isActive && !isOpen && (
                          <span
                            aria-hidden="true"
                            className="absolute right-0 top-1/2 w-1 h-6 rounded-l-[4px] bg-[#D946EF] shadow-[0_0_10px_rgba(217,70,239,0.6)]"
                            style={{ animation: 'activeIndicator 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
                          />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div
                className={`mt-4 mb-2 rounded-[4px] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#2a1550] via-[#1A1A2E] to-[#16213E] relative group cursor-pointer ${
                  !isOpen ? 'max-h-0 opacity-0 border-none m-0 p-0 scale-95' : 'max-h-32 p-4 opacity-100 border border-white/5 shadow-[inset_0_0_20px_rgba(217,70,239,0.05),0_4px_16px_rgba(0,0,0,0.2)] scale-100 hover:border-[#D946EF]/30 hover:-translate-y-0.5 hover:shadow-[inset_0_0_30px_rgba(217,70,239,0.1),0_8px_24px_rgba(0,0,0,0.3)]'
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmerText_3s_linear_infinite]" />
                
                <p className="text-[0.65rem] font-bold tracking-widest uppercase m-0 mb-1.5 whitespace-nowrap shimmer-text bg-gradient-to-r from-[#D946EF] via-[#ff7ee3] to-[#D946EF] bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105 relative z-10">
                  Premium Platform
                </p>
                <p className="text-xs text-center text-white/50 leading-relaxed m-0 whitespace-nowrap transition-colors duration-300 group-hover:text-white/80 relative z-10">
                  Built for visionaries.<br />Designed for excellence.
                </p>
              </div>
            </nav>

            <div className="px-3 pb-4 pt-2 mt-auto border-t border-white/5">
              <button
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
                className={`group w-full flex items-center py-2.5 rounded-[4px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] hover:bg-white/5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${
                  !isOpen ? 'justify-center px-0' : 'justify-start px-3.5 gap-4'
                }`}
              >
                <div className={`flex items-center justify-center rounded-[4px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 ${!isOpen ? 'w-full' : 'w-7 h-7'}`}>
                  {isOpen ? (
                    <PanelLeftClose size={!isOpen ? 22 : 18} className="text-white/50 stroke-[1.8] group-hover:text-white/95 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
                  ) : (
                    <PanelLeft size={!isOpen ? 22 : 18} className="text-white/50 stroke-[1.8] group-hover:text-white/95 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  )}
                </div>
                <div
                  className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    !isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
                  }`}
                >
                  <span className="text-sm leading-tight font-medium truncate text-white/60 group-hover:text-white/95 text-left transition-colors duration-300">
                    Collapse
                  </span>
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {mounted &&
        tooltip.visible &&
        !isOpen &&
        createPortal(
          <div
            role="tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className="fixed -translate-y-1/2 z-[10000] pointer-events-none flex items-center gap-0 tooltip-animate drop-shadow-xl"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[6px] border-y-transparent border-r-[7px] border-r-[#221042]"
              aria-hidden="true"
            />
            <div className="bg-gradient-to-r from-[#221042] to-[#1A1A2E] border border-white/10 rounded-[4px] px-3.5 py-2 text-white/95 text-xs font-medium whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {tooltip.label}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}