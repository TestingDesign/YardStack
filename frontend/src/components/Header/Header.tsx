import { useEffect, useRef, useState, useId, useCallback } from 'react'
import { Monitor, Smartphone, ChevronDown, X } from 'lucide-react'
import Dropdown from '../commonfiles/Dropdown'

export type Page = 'home' | 'dashboard' | 'forms' | 'login' | 'createAccount'
export type ViewMode = 'desktop' | 'mobile'

interface HeaderProps {
  activePage: Page
  onNavigate: (page: Page) => void
  viewMode: ViewMode
  onViewModeChange: (v: ViewMode) => void
  showViewControls?: boolean
  onClose?: () => void
}

const PAGE_LABELS: Record<Page, string> = {
  home: 'Home',
  dashboard: 'Dashboard',
  forms: 'Forms',
  login: 'Login',
  createAccount: 'Create Account',
}

const PAGE_OPTIONS = (Object.keys(PAGE_LABELS) as Page[]).map((p) => ({
  value: p,
  label: PAGE_LABELS[p],
}))

export default function Header({
  activePage,
  onNavigate,
  viewMode,
  onViewModeChange,
  showViewControls = true,
  onClose,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const closeMenu = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleMouseDown, { capture: true, passive: true })
      document.addEventListener('keydown', handleKeyDown, { capture: true })
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, { capture: true })
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
    }
  }, [mobileMenuOpen, closeMenu])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#7B2FBE] shadow-[0px_1px_8px_rgba(107,33,168,0.06)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          <div className="flex items-center gap-2 shrink-0" aria-label="N4RE Logo">
            <div 
              aria-hidden="true"
              className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#6B21A8] text-white font-bold text-[1.1rem] leading-none shadow-sm select-none"
            >
              N
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-[0.88rem] font-extrabold text-[#6B21A8] tracking-[-0.03em] m-0">
                N4<span className="text-[#E91E8C]">RE</span>
              </p>
            </div>
          </div>

          <nav aria-label="View Controls" className="hidden md:flex flex-1 justify-center">
            {showViewControls && (
              <div 
                role="group"
                aria-label="Select view mode"
                className="flex items-center bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-[8px] p-1 gap-0.5"
              >
                <button
                  type="button"
                  aria-pressed={viewMode === 'desktop'}
                  onClick={() => onViewModeChange('desktop')}
                  className={`flex items-center gap-2 px-5 py-[7px] rounded-[8px] text-[0.76rem] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#7C3AED]/10 motion-reduce:transition-none ${
                    viewMode === 'desktop'
                      ? 'bg-gradient-to-br from-[#7C3AED] to-[#6B21A8] text-white shadow-md'
                      : 'text-[#6B21A8] bg-transparent hover:bg-white/80'
                  }`}
                >
                  <Monitor size={15} strokeWidth={viewMode === 'desktop' ? 2.5 : 2} aria-hidden="true" />
                  Desktop View
                </button>
                <button
                  type="button"
                  aria-pressed={viewMode === 'mobile'}
                  onClick={() => onViewModeChange('mobile')}
                  className={`flex items-center gap-2 px-5 py-[7px] rounded-[8px] text-[0.76rem] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#7C3AED]/10 motion-reduce:transition-none ${
                    viewMode === 'mobile'
                      ? 'bg-gradient-to-br from-[#7C3AED] to-[#6B21A8] text-white shadow-md'
                      : 'text-[#6B21A8] bg-transparent hover:bg-white/80'
                  }`}
                >
                  <Smartphone size={15} strokeWidth={viewMode === 'mobile' ? 2.5 : 2} aria-hidden="true" />
                  Mobile View
                </button>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {showViewControls && (
              <div 
                role="group" 
                aria-label="Select view mode" 
                className="flex md:hidden items-center gap-1"
              >
                {(['desktop', 'mobile'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-label={v === 'desktop' ? 'Desktop view' : 'Mobile view'}
                    aria-pressed={viewMode === v}
                    onClick={() => onViewModeChange(v)}
                    className={`w-8 h-8 flex items-center justify-center rounded-[8px] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] focus-visible:ring-offset-1 motion-reduce:transition-none ${
                      viewMode === v
                        ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#6B21A8]'
                        : 'border-[#e4e7ec] bg-white text-[#9199a8] hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    {v === 'desktop' ? (
                      <Monitor size={14} strokeWidth={viewMode === v ? 2.5 : 2} aria-hidden="true" />
                    ) : (
                      <Smartphone size={14} strokeWidth={viewMode === v ? 2.5 : 2} aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="hidden sm:flex items-center gap-2">
              <label 
                htmlFor="desktop-page-selector" 
                className="text-[0.68rem] font-semibold text-[#9199a8] tracking-[0.08em] uppercase select-none whitespace-nowrap"
              >
                Current View
              </label>
              <Dropdown
                id="desktop-page-selector"
                options={PAGE_OPTIONS}
                value={activePage}
                onChange={(v) => onNavigate(v as Page)}
                size="sm"
                className="w-36"
              />
            </div>

            <div className="relative sm:hidden" ref={mobileMenuRef}>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-haspopup="menu"
                aria-controls={`mobile-menu-${menuId}`}
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-[7px] rounded-[8px] border border-[#eef0f3] bg-white text-[0.78rem] font-semibold text-[#1A1A2E] shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B21A8] focus-visible:border-[#6B21A8] transition-all duration-200"
              >
                {PAGE_LABELS[activePage]}
                <ChevronDown 
                  size={13} 
                  aria-hidden="true"
                  className={`text-[#9199a8] transition-transform duration-200 motion-reduce:transition-none ${
                    mobileMenuOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {mobileMenuOpen && (
                <div 
                  id={`mobile-menu-${menuId}`}
                  role="menu"
                  aria-label="Navigation Menu"
                  className="absolute right-0 mt-2 w-40 bg-white rounded-[8px] border border-[#eef0f3] shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ease-out"
                >
                  {(Object.keys(PAGE_LABELS) as Page[]).map((p) => {
                    const isActive = activePage === p
                    return (
                      <button
                        key={p}
                        type="button"
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => {
                          onNavigate(p)
                          closeMenu()
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:bg-[#7C3AED]/10 focus-visible:text-[#6B21A8] motion-reduce:transition-none ${
                          isActive 
                            ? 'bg-[#7C3AED]/10 text-[#6B21A8]' 
                            : 'text-[#1A1A2E] hover:bg-[#7C3AED]/5'
                        }`}
                      >
                        {PAGE_LABELS[p]}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-[8px] bg-white border border-[#eef0f3] text-[#9199a8] hover:bg-red-50 hover:text-red-500 hover:border-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-all duration-200 ml-2 shadow-sm"
                aria-label="Close navigation"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="sm:hidden flex items-center justify-center w-8 h-8 rounded-[8px] bg-white border border-[#eef0f3] text-[#9199a8] hover:bg-red-50 hover:text-red-500 focus-visible:outline-none transition-all duration-200 shadow-sm"
                aria-label="Close navigation"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}