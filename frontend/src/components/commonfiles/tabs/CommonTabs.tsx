import { memo, useRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export interface CommonTabType {
  key: string
  label: string
  color?: string
  count?: number | string
}

export interface CommonTabsProps {
  tabs: CommonTabType[]
  active: string
  onChange: (key: string) => void
  extraControls?: ReactNode
  containerClassName?: string
  ariaLabel?: string
}

const TabButton = memo(function TabButton({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: CommonTabType
  isActive: boolean
  onClick: (key: string) => void 
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      data-active={isActive}
      onClick={() => onClick(tab.key)}
      className={`group shrink-0 flex items-center justify-center gap-1.5 px-2 @md:px-3 py-1 @md:py-1.5 rounded-md @md:rounded-lg text-[11px] @md:text-xs font-semibold transition-all duration-300 ease-out active:scale-95 border outline-none cursor-pointer ${
        isActive
          ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)] shadow-[0_4px_12px_rgba(90,29,238,0.35)] hover:shadow-[0_6px_16px_rgba(90,29,238,0.45)] hover:-translate-y-px'
          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:shadow-sm hover:-translate-y-px hover:border-[var(--color-primary-600)]/30 hover:text-[var(--color-primary-600)]'
      }`}
      style={!isActive && tab.color ? {
        backgroundColor: `${tab.color}08`,
        color: tab.color,
        borderColor: `${tab.color}30`,
      } : undefined}
    >
      <span>{tab.label}</span>
      {tab.count !== undefined && (
        <span className={`px-1.5 py-0.5 rounded-md text-[10px] transition-colors duration-300 ${
          isActive 
            ? 'bg-white/20 text-white' 
            : ''
        }`}
        style={!isActive && tab.color ? {
          backgroundColor: `${tab.color}25`, 
          color: tab.color
        } : undefined}
        >
          {tab.count}
        </span>
      )}
    </button>
  )
})

export const CommonTabs = memo(function CommonTabs({ 
  tabs, 
  active, 
  onChange, 
  extraControls, 
  containerClassName = "bg-transparent py-0.5 @md:pt-2 px-2 @md:px-0",
  ariaLabel = "Category filters"
}: CommonTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const activeElement = container.querySelector('[data-active="true"]') as HTMLElement
      
      if (activeElement) {
        const scrollLeft = activeElement.offsetLeft - container.clientWidth / 2 + activeElement.clientWidth / 2
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [active])

  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    const timer = setTimeout(handleScroll, 100)
    return () => {
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer)
    }
  }, [tabs])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth < 600 ? 120 : 200
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <div className={`flex flex-col @md:flex-row w-full items-start @md:items-center gap-2 @md:gap-0 ${containerClassName}`}>
      
      <div className="relative flex items-center flex-1 min-w-0 w-full group/container">
        {canScrollLeft && (
          <div className="absolute left-0 z-20 flex items-center h-full pl-0.5 @md:pl-2 pr-4 @md:pr-6 bg-gradient-to-r from-[var(--color-bg-surface)] via-[var(--color-bg-surface)] to-transparent pointer-events-none transition-opacity duration-300">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              className="flex items-center justify-center w-6 h-6 @md:w-7 @md:h-7 bg-[var(--color-bg-surface)] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-600)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="text-[16px] @md:text-[20px]" />
            </button>
          </div>
        )}

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-2 px-1 @md:px-3 py-1 overflow-x-auto w-full scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10"
        >
          <div 
            role="group" 
            aria-label={ariaLabel} 
            className="flex items-center gap-1.5 @md:gap-2 shrink-0"
          >
            {tabs.map((tab) => (
              <TabButton 
                key={tab.key} 
                tab={tab} 
                isActive={active === tab.key} 
                onClick={onChange} 
              />
            ))}
          </div>
        </div>

        {canScrollRight && (
          <div className="absolute right-0 z-20 flex items-center h-full pr-0.5 @md:pr-2 pl-4 @md:pl-6 bg-gradient-to-l from-[var(--color-bg-surface)] via-[var(--color-bg-surface)] to-transparent pointer-events-none transition-opacity duration-300">
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              className="flex items-center justify-center w-6 h-6 @md:w-7 @md:h-7 bg-[var(--color-bg-surface)] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-600)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="text-[16px] @md:text-[20px]" />
            </button>
          </div>
        )}
      </div>

      <div className="hidden @md:block w-px h-6 bg-[var(--color-border-default)] shrink-0 mx-2 @lg:mx-3" aria-hidden="true" />

      <div className="flex items-center w-full @md:w-auto shrink-0 gap-2 px-1 @md:px-3 pb-1 @md:pb-0">
        
        {extraControls}

        <button
          type="button"
          className="group shrink-0 flex items-center justify-center gap-1.5 px-3 h-8 @md:h-9 rounded-md @md:rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] hover:border-[var(--color-primary-600)]/30 hover:text-[var(--color-primary-600)] transition-all duration-300 ease-out active:scale-95 hover:shadow-sm font-semibold text-[12px] @md:text-[13px] outline-none cursor-pointer"
          aria-label="Filter options"
        >
          <TuneIcon 
            className="text-[var(--color-primary-600)] transition-transform duration-300 ease-out group-hover:rotate-90 text-[16px] @md:text-[18px]" 
            aria-hidden="true"
          />
          Filter
        </button>
      </div>

    </div>
  )
})
