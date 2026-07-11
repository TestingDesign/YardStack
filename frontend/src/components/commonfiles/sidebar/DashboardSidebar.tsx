import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Home, Users, Settings2, Bookmark, PlusSquare, PanelLeftClose, PanelLeft } from 'lucide-react'

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
}

interface TooltipState {
  label: string
  x: number
  y: number
  visible: boolean
}

const HIDDEN_TOOLTIP: TooltipState = { label: '', x: 0, y: 0, visible: false }

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { key: 'home', label: 'Home', Icon: Home, description: 'Dashboard overview & activity feed' },
  { key: 'leads', label: 'Leads', Icon: Users, description: 'Manage and track your lead pipeline' },
  { key: 'manage', label: 'Manage', Icon: Settings2, description: 'Listings, settings & configurations' },
  { key: 'saved', label: 'Saved', Icon: Bookmark, description: 'Bookmarked properties & searches' },
  { key: 'post', label: 'Post', Icon: PlusSquare, description: 'Create & publish new listings' },
]

function getPos(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return { x: r.right + 10, y: r.top + r.height / 2 }
}

const SCROLL_THRESHOLD = 8

function useScrollDirection() {
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

  return isHidden
}

export default function DashboardSidebar({
  active = 'home',
  onNavigate,
  isOpen: externalIsOpen,
  onToggle,
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
  const isScrollHidden = useScrollDirection()

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
            from { opacity: 0; transform: translateX(-20px) scale(0.96); }
            to { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes tooltipEnter {
            from { opacity: 0; transform: translateY(-50%) translateX(-8px) scale(0.95); }
            to { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }
          }
          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .nav-item-enter {
            animation: slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
          }
          .tooltip-animate {
            animation: tooltipEnter 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .logo-float {
            animation: subtleFloat 4s ease-in-out infinite;
          }
        `}
      </style>

      <div
        className="shrink-0 h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ width: sidebarWidth }}
        aria-hidden={isScrollHidden}
      >
      <aside
        ref={sidebarRef}
        data-sidebar-root
        aria-label="Dashboard Navigation Sidebar"
        className={`flex flex-col shrink-0 h-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-[50] motion-reduce:transition-none ${!isOpen ? 'w-[72px]' : 'w-60'
          }`}
        style={{
          background: isScrollHidden ? 'transparent' : 'linear-gradient(175deg, #2a1550 0%, #1A1A2E 30%, #16213E 60%, #1A1A2E 80%, #16213E 100%)',
          boxShadow: isScrollHidden ? 'none' : '4px 0 32px rgba(0,0,0,0.5)',
        }}
      >

        <div 
          className="flex-1 flex flex-col min-h-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: isScrollHidden ? 'translateX(-100%)' : 'translateX(0)',
            opacity: isScrollHidden ? 0 : 1,
            pointerEvents: isScrollHidden ? 'none' : 'auto',
          }}
        >
          <div className="px-3 pb-2">
            <div className="border-t border-white/10 w-full shadow-[0_1px_2px_rgba(255,255,255,0.05)]" aria-hidden="true" />
          </div>

          <nav
            aria-label="Sidebar Menu"
            className="flex-1 overflow-y-auto overflow-x-hidden pb-2 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-2"
          >
            <ul className="list-none p-0 m-0 flex flex-col gap-1 flex-1" role="list">
              {DASHBOARD_NAV_ITEMS.map(({ key, label, Icon }, index) => {
                const isActive = key === active
                return (
                  <li
                    key={key}
                    className="relative group nav-item-enter"
                    style={{ animationDelay: `${index * 65}ms` }}
                  >
                    <button
                      onClick={() => handleNavigate(key)}
                      onMouseEnter={(e) => showTooltip(e, label)}
                      onFocus={(e) => showTooltip(e, label)}
                      onMouseLeave={hideTooltip}
                      onBlur={hideTooltip}
                      aria-label={label}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center py-2 rounded-[8px] transition-all duration-400 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none motion-reduce:transform-none ${!isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
                        } ${isActive
                          ? 'bg-white/10 shadow-[inset_0_0_20px_rgba(217,70,239,0.2),0_4px_12px_rgba(0,0,0,0.2)]'
                          : 'hover:bg-white/5 hover:translate-x-1.5'
                        }`}
                    >
                      <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-400 ease-out ${!isOpen ? 'w-full' : 'w-8 h-8'} ${isActive && isOpen ? 'bg-[#D946EF]/20 shadow-[0_0_15px_rgba(217,70,239,0.4)] scale-105' : 'group-hover:scale-110'}`}>
                        <Icon
                          size={!isOpen ? 22 : 18}
                          aria-hidden="true"
                          className={`shrink-0 transition-all duration-400 motion-reduce:transition-none ${isActive ? 'text-[#D946EF] stroke-[2.5] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : 'text-white/65 stroke-[1.8] group-hover:text-white'
                            }`}
                        />
                      </div>

                      <div
                        className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${!isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
                          }`}
                      >
                        <span className={`text-[0.875rem] text-left leading-tight font-semibold truncate transition-colors duration-300 ${isActive ? 'text-white drop-shadow-md' : 'text-white/80 group-hover:text-white'}`}>
                          {label}
                        </span>
                      </div>

                      {isActive && !isOpen && (
                        <span
                          aria-hidden="true"
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#D946EF] shadow-[0_0_12px_rgba(217,70,239,0.9)] animate-pulse"
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div
              className={`mx-2 mt-2 mb-2 rounded-[8px] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_60%,#16213E_100%)] shadow-[inset_0_0_20px_rgba(217,70,239,0.08),0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_0_30px_rgba(217,70,239,0.15),0_12px_32px_rgba(0,0,0,0.5)] hover:border-[#D946EF]/40 hover:-translate-y-1 cursor-pointer ${!isOpen ? 'max-h-0 opacity-0 border-none m-0 p-0 scale-90' : 'max-h-32 p-3 opacity-100 border border-[#D946EF]/25 scale-100'
                }`}
            >
              <p className="text-[0.62rem] font-extrabold tracking-[0.14em] uppercase text-[#D946EF] m-0 mb-1 whitespace-nowrap drop-shadow-[0_0_5px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105">
                Premium Platform
              </p>
              <p className="text-[0.7rem] text-center text-white/65 leading-tight m-0 whitespace-nowrap transition-colors duration-300 hover:text-white/90">
                Built for visionaries.<br />Designed for excellence.
              </p>
            </div>
          </nav>

          <div className="px-2 pb-3 mt-auto">
            <button
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
              className={`group w-full flex items-center py-2 rounded-[8px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] hover:bg-white/10 hover:shadow-lg ${!isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
                }`}
            >
              <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-300 group-hover:scale-110 ${!isOpen ? 'w-full' : 'w-8 h-8'}`}>
                {isOpen ? (
                  <PanelLeftClose size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                ) : (
                  <PanelLeft size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:translate-x-1" aria-hidden="true" />
                )}
              </div>
              <div
                className={`flex flex-col justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${!isOpen ? 'w-0 opacity-0 overflow-hidden translate-x-4' : 'flex-1 opacity-100 overflow-hidden translate-x-0'
                  }`}
              >
                <span className="text-[0.875rem] leading-tight font-semibold truncate text-white/80 group-hover:text-white text-left transition-colors duration-300">
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
            className="fixed -translate-y-1/2 z-[10000] pointer-events-none flex items-center gap-0 tooltip-animate"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[6px] border-y-transparent border-r-[7px] border-r-[#2a1550]"
              aria-hidden="true"
            />
            <div className="bg-[linear-gradient(135deg,#2a1550_0%,#1A1A2E_100%)] border border-white/15 rounded-[8px] px-3 py-1.5 text-white/90 text-[12px] font-semibold whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
              {tooltip.label}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}