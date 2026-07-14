import React, { useState, useEffect, useCallback, type MouseEvent, type FocusEvent, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, Crown } from 'lucide-react'
import { NAV_ITEMS, type NavKey } from './data'
import N4RELogo from '../Images/N4RELogowithouttext.png'

interface SidebarProps {
  active?: NavKey
  onNavigate?: (k: NavKey) => void
}

interface TooltipState {
  type: 'nav' | 'premium' | null
  label?: string
  x: number
  y: number
}

const HIDDEN: TooltipState = { type: null, x: 0, y: 0 }

function getPos(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return { x: r.right + 8, y: r.top + r.height / 2 }
}

export default function Sidebar({ active = 'activityBoard', onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipState>(HIDDEN)
  const [mounted] = useState(typeof document !== 'undefined')

  useEffect(() => {
    const hide = () => setTooltip(HIDDEN)
    window.addEventListener('scroll', hide, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', hide, { capture: true })
  }, [])

  const showTooltip = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, type: 'nav' | 'premium', label?: string) => {
      if (!isCollapsed) return
      const pos = getPos(e.currentTarget)
      setTooltip({ type, label, x: pos.x, y: pos.y })
    },
    [isCollapsed]
  )

  const hideTooltip = useCallback(() => setTooltip(HIDDEN), [])

  return (
    <aside
      aria-label="Main Navigation Sidebar"
      className={`flex flex-col shrink-0 h-full text-white transition-all duration-500 ease-in-out relative z-9999 shadow-[4px_0_32px_rgba(0,0,0,0.4)] bg-[linear-gradient(175deg,#2a1550_0%,#1A1A2E_30%,#16213E_60%,#1A1A2E_80%,#16213E_100%)] motion-reduce:transition-none ${
        isCollapsed ? 'w-18' : 'w-60'
      }`}
    >
      <div className="flex flex-col items-center p-2 overflow-hidden shrink-0">
        <img
          src={N4RELogo}
          alt="N4RE Real Estate Intelligence"
          className={`object-contain transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isCollapsed ? 'w-8 h-8' : 'w-11 h-11'
          }`}
        />
        <div
          aria-hidden={isCollapsed ? "true" : "false"}
          className={`flex flex-col items-center overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isCollapsed ? 'h-0 opacity-0 mt-0' : 'h-9 opacity-100 mt-2.5'
          }`}
        >
          <p className="text-[1.3rem] tracking-wider leading-none text-white m-0">N4RE</p>
          <p className="text-[0.5rem] font-medium tracking-[0.18em] uppercase text-white/55 mt-1.5">
            Real Estate Intelligence
          </p>
        </div>
      </div>

      <nav
        aria-label="Sidebar Menu"
        className="flex-1 overflow-y-auto overflow-x-visible pb-4 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        <div
          aria-hidden="true"
          className={`px-6 mb-3 overflow-hidden transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isCollapsed ? 'opacity-0 h-0 hidden' : 'opacity-100 h-auto block'
          }`}
        />

        <ul className="list-none p-0 px-1 m-0 flex flex-col gap-0.5 flex-1" role="list">
          {NAV_ITEMS.map(({ key, label, Icon, activeIcon }: any) => {
            const isActive = key === active
            const CurrentIcon = isActive && activeIcon ? activeIcon : Icon
            return (
              <li key={key} className="relative group">
                <button
                  onClick={() => onNavigate?.(key)}
                  onMouseEnter={(e) => showTooltip(e, 'nav', label)}
                  onFocus={(e) => showTooltip(e, 'nav', label)}
                  onMouseLeave={hideTooltip}
                  onBlur={hideTooltip}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center py-2.5 rounded-[8px] text-[0.85rem] transition-all duration-200 bg-transparent border-none cursor-pointer active:scale-[0.97] active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none motion-reduce:transform-none ${
                    isCollapsed ? 'justify-center px-0' : 'justify-start px-3'
                  } ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {typeof CurrentIcon === 'string' ? (
                    <img
                      src={CurrentIcon}
                      alt=""
                      aria-hidden="true"
                      className={`shrink-0 transition-all duration-300 motion-reduce:transition-none object-contain ${
                        isCollapsed ? 'w-5 h-5' : 'w-[1.125rem] h-[1.125rem]'
                      } ${
                        isActive ? 'opacity-100 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    />
                  ) : React.isValidElement(CurrentIcon) ? (
                    CurrentIcon
                  ) : CurrentIcon ? (
                    (() => {
                      const IconComp = CurrentIcon as React.ElementType
                      return (
                        <IconComp
                          size={isCollapsed ? 20 : 18}
                          aria-hidden="true"
                          className={`shrink-0 transition-all duration-300 motion-reduce:transition-none ${
                            isActive ? 'text-[#D946EF] stroke-2 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'text-white/60 stroke-[1.6]'
                          }`}
                        />
                      )
                    })()
                  ) : null}
                  <div
                    className={`flex items-start overflow-hidden transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                      isCollapsed ? 'w-0 opacity-0 ml-0' : 'flex-1 opacity-100 ml-3.5'
                    }`}
                  >
                    <span className="leading-tight text-left">{label}</span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <div
          onMouseEnter={(e) => showTooltip(e, 'premium')}
          onFocus={(e) => showTooltip(e, 'premium')}
          onMouseLeave={hideTooltip}
          onBlur={hideTooltip}
          tabIndex={0}
          role="group"
          aria-label="Premium Platform Information"
          className={`relative mx-2 mt-2 mb-4 rounded-[14px] transition-all duration-300 overflow-visible flex flex-col items-center justify-center border border-[#D946EF]/35 bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_60%,#16213E_100%)] shadow-[inset_0_0_24px_rgba(217,70,239,0.1),0_4px_20px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] motion-reduce:transition-none ${
            isCollapsed ? 'p-2.5 cursor-pointer hover:scale-[1.02]' : 'px-4 pt-5 pb-4 cursor-default'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[52%] pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="wave-grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D946EF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="wave-grad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E91E8C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6B21A8" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d="M0 20 Q 20 8, 40 18 T 80 16 T 100 20 L 100 40 L 0 40 Z" fill="url(#wave-grad2)" />
              <path d="M0 28 Q 25 14, 50 24 T 100 26 L 100 40 L 0 40 Z" fill="url(#wave-grad3)" />
              <path d="M0 34 Q 30 24, 60 32 T 100 32 L 100 40 L 0 40 Z" fill="rgba(217,70,239,0.18)" />
            </svg>
          </div>

          <div
            className={`flex justify-center relative z-10 transition-all duration-300 motion-reduce:transition-none ${
              isCollapsed ? '' : 'mb-3'
            }`}
          >
            <Crown
              size={isCollapsed ? 20 : 30}
              aria-hidden="true"
              className="text-[#D946EF] stroke-[1.6] drop-shadow-[0_0_12px_rgba(217,70,239,0.35)]"
            />
          </div>

          <div
            aria-hidden={isCollapsed ? "true" : "false"}
            className={`text-center transition-all duration-300 relative z-10 flex flex-col items-center w-full motion-reduce:transition-none ${
              isCollapsed ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100 mt-1'
            }`}
          >
            <p className="text-[0.66rem] font-extrabold tracking-[0.12em] uppercase w-full px-2 whitespace-nowrap overflow-visible text-[#D946EF] drop-shadow-[0_0_10px_rgba(217,70,239,0.35)] m-0">
              Premium Platform
            </p>
            <p className="text-[0.72rem] mt-2 leading-tight font-medium w-full max-w-60 px-2 text-white/90 mb-0">
              Built for visionaries.<br />Designed for excellence.
            </p>
          </div>
        </div>
      </nav>

      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-expanded={!isCollapsed ? "true" : "false"}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className={`flex items-center py-4 text-[0.8rem] font-medium transition-colors duration-300 shrink-0 border-none border-t border-t-white/10 bg-[#16213E]/55 text-white/60 hover:text-white/90 hover:bg-[#16213E]/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D946EF] focus-visible:ring-inset motion-reduce:transition-none ${
          isCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-6'
        }`}
      >
        <ChevronLeft
          size={16}
          aria-hidden="true"
          className={`stroke-2 transition-transform duration-500 ease-in-out motion-reduce:transition-none ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          Collapse
        </span>
      </button>

      {mounted &&
        tooltip.type === 'nav' &&
        createPortal(
          <div
            role="tooltip"
            style={{ '--tw-tip-x': `${tooltip.x}px`, '--tw-tip-y': `${tooltip.y}px` } as CSSProperties}
            className="fixed -translate-y-1/2 z-10000 pointer-events-none flex items-center gap-0 animate-in fade-in duration-200 left-(--tw-tip-x) top-(--tw-tip-y)"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[6px] border-y-transparent border-r-[7px] border-r-[#2a1550]"
              aria-hidden="true"
            />
            <div className="bg-[linear-gradient(135deg,#2a1550_0%,#1A1A2E_100%)] border border-white/15 rounded-[8px] px-3.5 py-1.5 text-white/90 text-[13px] font-semibold whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {tooltip.label}
            </div>
          </div>,
          document.body
        )}

      {mounted &&
        tooltip.type === 'premium' &&
        createPortal(
          <div
            role="tooltip"
            style={{ '--tw-tip-x': `${tooltip.x}px`, '--tw-tip-y': `${tooltip.y}px` } as CSSProperties}
            className="fixed -translate-y-1/2 z-10000 pointer-events-none flex items-center gap-0 animate-in fade-in duration-200 left-(--tw-tip-x) top-(--tw-tip-y)"
          >
            <div
              className="w-0 h-0 shrink-0 border-y-[7px] border-y-transparent border-r-8 border-r-[#2a1550]"
              aria-hidden="true"
            />
            <div className="bg-[linear-gradient(160deg,#2a1550_0%,#1A1A2E_100%)] border border-[#D946EF]/30 rounded-[8px] px-4 py-3 min-w-45 shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_16px_rgba(217,70,239,0.1)]">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={16} aria-hidden="true" className="text-[#D946EF] stroke-[1.8] shrink-0" />
                <span className="text-[#D946EF] text-[11px] font-extrabold tracking-[0.18em] uppercase drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]">
                  Premium Platform
                </span>
              </div>
              <p className="text-white/65 text-[11.5px] leading-relaxed m-0">
                Built for visionaries.<br />Designed for excellence.
              </p>
            </div>
          </div>,
          document.body
        )}
    </aside>
  )
}