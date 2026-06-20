import React, {
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { X, Home, Users, Settings2, Bookmark, PlusSquare } from 'lucide-react'
import YardLogo from '../Images/YardStockLogowithouttext.png'

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
}

interface TooltipState {
  label: string
  x: number
  y: number
  visible: boolean
}

const HIDDEN_TOOLTIP: TooltipState = { label: '', x: 0, y: 0, visible: false }

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    key: 'home',
    label: 'Home',
    Icon: Home,
    description: 'Dashboard overview & activity feed',
  },
  {
    key: 'leads',
    label: 'Leads',
    Icon: Users,
    description: 'Manage and track your lead pipeline',
  },
  {
    key: 'manage',
    label: 'Manage',
    Icon: Settings2,
    description: 'Listings, settings & configurations',
  },
  {
    key: 'saved',
    label: 'Saved',
    Icon: Bookmark,
    description: 'Bookmarked properties & searches',
  },
  {
    key: 'post',
    label: 'Post',
    Icon: PlusSquare,
    description: 'Create & publish new listings',
  },
]

function getPos(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return { x: r.right + 10, y: r.top + r.height / 2 }
}

export default function DashboardSidebar({
  active = 'home',
  onNavigate,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipState>(HIDDEN_TOOLTIP)
  const [mounted, setMounted] = useState(false)

  // Avoid SSR hydration mismatches with Portals
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
      <aside
        aria-label="Dashboard Navigation Sidebar"
        className={`flex flex-col shrink-0 h-full text-white transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative z-[50] shadow-[4px_0_32px_rgba(0,0,0,0.4)] bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] motion-reduce:transition-none ${
          !isOpen ? 'w-[72px]' : 'w-64'
        }`}
      >
        <div className="flex flex-col w-full overflow-hidden shrink-0 mt-3 px-4">
          <div className="flex items-center w-full h-12">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-full border-none cursor-pointer bg-transparent hover:bg-white/10 active:scale-95 transition-all duration-300 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF]"
            >
              <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>

            <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ease-in-out ${!isOpen ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-4'}`}>
              <img
                src={YardLogo}
                alt="YardStock"
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="flex flex-col whitespace-nowrap">
                <p className="text-[1.1rem] font-serif tracking-wider leading-none text-white m-0">YARDStock</p>
                <p className="text-[0.45rem] font-medium tracking-[0.18em] uppercase text-white/55 mt-1">Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 my-3">
          <div className="border-t border-white/10 w-full" aria-hidden="true" />
        </div>

        <nav
          aria-label="Sidebar Menu"
          className="flex-1 overflow-y-auto overflow-x-hidden pb-4 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none px-2"
        >
          <ul className="list-none p-0 m-0 flex flex-col gap-1.5 flex-1" role="list">
            {DASHBOARD_NAV_ITEMS.map(({ key, label, Icon, description }) => {
              const isActive = key === active
              return (
                <li key={key} className="relative group">
                  <button
                    onClick={() => handleNavigate(key)}
                    onMouseEnter={(e) => showTooltip(e, label)}
                    onFocus={(e) => showTooltip(e, label)}
                    onMouseLeave={hideTooltip}
                    onBlur={hideTooltip}
                    aria-label={label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center py-2.5 rounded-xl transition-all duration-200 bg-transparent border-none cursor-pointer active:scale-[0.98] active:opacity-80 outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none motion-reduce:transform-none ${
                      !isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
                    } ${
                      isActive
                        ? 'bg-white/10 shadow-[inset_0_0_20px_rgba(217,70,239,0.15)]'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`flex items-center justify-center rounded-lg shrink-0 transition-all duration-200 ${!isOpen ? 'w-full' : 'w-9 h-9'} ${isActive && isOpen ? 'bg-[#D946EF]/20 shadow-[0_0_12px_rgba(217,70,239,0.3)]' : ''}`}>
                      <Icon
                        size={!isOpen ? 22 : 18}
                        aria-hidden="true"
                        className={`shrink-0 transition-all duration-300 motion-reduce:transition-none ${
                          isActive ? 'text-[#D946EF] stroke-[2.5]' : 'text-white/65 stroke-[1.8] group-hover:text-white'
                        }`}
                      />
                    </div>
                    
                    <div
                      className={`flex flex-col items-start transition-all duration-400 ease-in-out motion-reduce:transition-none ${
                        !isOpen ? 'w-0 opacity-0 overflow-hidden' : 'flex-1 opacity-100 overflow-hidden'
                      }`}
                    >
                      <span className={`text-[0.875rem] leading-tight font-semibold truncate transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        {label}
                      </span>
                      <span className="text-[0.65rem] text-white/40 leading-tight truncate mt-0.5 text-left w-full">
                        {description}
                      </span>
                    </div>

                    {isActive && !isOpen && (
                      <span
                        aria-hidden="true"
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#D946EF] shadow-[0_0_8px_rgba(217,70,239,0.7)]"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div
            className={`mx-1 mt-2 mb-4 rounded-xl transition-all duration-500 overflow-hidden flex flex-col items-center justify-center bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_60%,#16213E_100%)] shadow-[inset_0_0_20px_rgba(217,70,239,0.08),0_4px_16px_rgba(0,0,0,0.4)] ${
              !isOpen ? 'max-h-0 opacity-0 border-none m-0 p-0' : 'max-h-32 p-3.5 opacity-100 border border-[#D946EF]/25'
            }`}
          >
            <p className="text-[0.62rem] font-extrabold tracking-[0.14em] uppercase text-[#D946EF] m-0 mb-1.5 whitespace-nowrap">
              Premium Platform
            </p>
            <p className="text-[0.7rem] text-center text-white/65 leading-relaxed m-0 whitespace-nowrap">
              Built for visionaries.<br />Designed for excellence.
            </p>
          </div>
        </nav>
      </aside>

      {mounted &&
        tooltip.visible &&
        !isOpen &&
        createPortal(
          <div
            role="tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className="fixed -translate-y-1/2 z-[10000] pointer-events-none flex items-center gap-0 animate-in fade-in slide-in-from-left-1 duration-200"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[6px] border-y-transparent border-r-[7px] border-r-[#2a1550]"
              aria-hidden="true"
            />
            <div className="bg-[linear-gradient(135deg,#2a1550_0%,#1A1A2E_100%)] border border-white/15 rounded-lg px-3.5 py-1.5 text-white/90 text-[13px] font-semibold whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {tooltip.label}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}