import React, {
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
  type FocusEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Home, Users, Settings2, Bookmark, PlusSquare, PanelLeftClose, PanelLeft, Menu } from 'lucide-react'
import LogoPng from './Logo.png'

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

export default function DashboardSidebar({
  active = 'home',
  onNavigate,
}: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipState>(HIDDEN_TOOLTIP)
  const [mounted, setMounted] = useState(false)

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
            from { opacity: 0; transform: translateX(-15px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .nav-item-enter {
            animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <aside
        aria-label="Dashboard Navigation Sidebar"
        className={`flex flex-col shrink-0 h-full text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-[50] shadow-[4px_0_32px_rgba(0,0,0,0.5)] bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] motion-reduce:transition-none ${!isOpen ? 'w-[72px]' : 'w-52'
          }`}
      >
        <div className="flex flex-col w-full overflow-hidden shrink-0 mt-2 px-3">
          <div className="flex items-center w-full h-10">
            <div className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${!isOpen ? 'justify-center w-full' : 'gap-3 px-1'}`}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:scale-110 hover:bg-white/10 p-1.5 rounded-sm transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF]"
                aria-label="Toggle menu"
              >
                <Menu size={24} className="text-white shrink-0" aria-hidden="true" />
              </button>
              <div className={`flex items-center transition-all duration-500 overflow-hidden ${!isOpen ? 'w-0 opacity-0 translate-x-4' : 'w-auto opacity-100 translate-x-0'}`}>
                <img src={LogoPng} alt="N4RE Logo" className="h-20 mt-0.5 w-auto object-contain drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 my-2">
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
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <button
                    onClick={() => handleNavigate(key)}
                    onMouseEnter={(e) => showTooltip(e, label)}
                    onFocus={(e) => showTooltip(e, label)}
                    onMouseLeave={hideTooltip}
                    onBlur={hideTooltip}
                    aria-label={label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center py-2 rounded-[8px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none motion-reduce:transform-none ${!isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
                      } ${isActive
                        ? 'bg-white/10 shadow-[inset_0_0_20px_rgba(217,70,239,0.2),0_4px_12px_rgba(0,0,0,0.2)]'
                        : 'hover:bg-white/5 hover:translate-x-1'
                      }`}
                  >
                    <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-300 ${!isOpen ? 'w-full' : 'w-8 h-8'} ${isActive && isOpen ? 'bg-[#D946EF]/20 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'group-hover:scale-110'}`}>
                      <Icon
                        size={!isOpen ? 22 : 18}
                        aria-hidden="true"
                        className={`shrink-0 transition-all duration-300 motion-reduce:transition-none ${isActive ? 'text-[#D946EF] stroke-[2.5] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : 'text-white/65 stroke-[1.8] group-hover:text-white'
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
            className={`mx-2 mt-2 mb-2 rounded-[8px] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_60%,#16213E_100%)] shadow-[inset_0_0_20px_rgba(217,70,239,0.08),0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_0_30px_rgba(217,70,239,0.15),0_12px_32px_rgba(0,0,0,0.5)] hover:border-[#D946EF]/40 hover:-translate-y-0.5 cursor-pointer ${!isOpen ? 'max-h-0 opacity-0 border-none m-0 p-0 scale-95' : 'max-h-32 p-3 opacity-100 border border-[#D946EF]/25 scale-100'
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
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse menu' : 'Expand menu'}
            className={`group w-full flex items-center py-2 rounded-[8px] transition-all duration-300 bg-transparent border-none cursor-pointer active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] hover:bg-white/10 hover:shadow-lg ${!isOpen ? 'justify-center px-0' : 'justify-start px-3 gap-3.5'
              }`}
          >
            <div className={`flex items-center justify-center rounded-[8px] shrink-0 transition-all duration-300 group-hover:scale-110 ${!isOpen ? 'w-full' : 'w-8 h-8'}`}>
              {isOpen ? (
                <PanelLeftClose size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
              ) : (
                <PanelLeft size={!isOpen ? 22 : 18} className="text-white/65 stroke-[1.8] group-hover:text-white shrink-0 transition-all duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
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
      </aside>

      {mounted &&
        tooltip.visible &&
        !isOpen &&
        createPortal(
          <div
            role="tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            className="fixed -translate-y-1/2 z-[10000] pointer-events-none flex items-center gap-0 animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200"
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