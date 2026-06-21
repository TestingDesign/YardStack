import { memo, useRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react'

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
  onClick,
  index = 0,
}: {
  tab: CommonTabType
  isActive: boolean
  onClick: (key: string) => void
  index?: number
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      data-active={isActive}
      onClick={() => onClick(tab.key)}
      className={`group relative shrink-0 flex items-center justify-center gap-1.5 px-3 @md:px-4 py-1 @md:py-2 rounded-md @md:rounded-[8px] text-[12px] @md:text-[13px] font-bold transition-all duration-300 ease-out active:scale-95 border outline-none cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
        isActive
          ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.48)] hover:-translate-y-px'
          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-px hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50/60'
      }`}
      style={{
        animationDelay: `${index * 35}ms`,
        ...(!isActive && tab.color ? {
          backgroundColor: `${tab.color}08`,
          color: tab.color,
          borderColor: `${tab.color}30`,
        } : undefined),
      }}
    >
      <span className="relative z-10 whitespace-nowrap">{tab.label}</span>

      {tab.count !== undefined && (
        <span
          className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-black transition-colors duration-300 ${
            isActive
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
          }`}
          style={!isActive && tab.color ? {
            backgroundColor: `${tab.color}20`,
            color: tab.color,
          } : undefined}
        >
          {tab.count}
        </span>
      )}

      {isActive && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 pointer-events-none" />
      )}

      {!isActive && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full pointer-events-none" style={{ transition: 'opacity 0.3s, transform 0.5s' }} />
      )}
    </button>
  )
})

export const CommonTabs = memo(function CommonTabs({
  tabs,
  active,
  onChange,
  extraControls,
  containerClassName = 'bg-transparent py-0.5 @md:pt-2 px-2 @md:px-0',
  ariaLabel = 'Category filters',
}: CommonTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5)
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
      const scrollAmount = scrollRef.current.clientWidth < 600 ? 150 : 250
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={`flex flex-col @md:flex-row w-full items-start @md:items-center gap-2 @md:gap-0 ${containerClassName}`}>

      <div className="relative flex items-center flex-1 min-w-0 w-full group/container">
        {canScrollLeft && (
          <div className="absolute left-0 z-20 flex items-center h-full pl-1 pr-6 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              className="flex items-center justify-center w-7 h-7 @md:w-8 @md:h-8 bg-white rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-500 hover:text-purple-600 hover:bg-purple-50 hover:shadow-[0_4px_16px_rgba(124,58,237,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
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
            className="flex items-center gap-2 @md:gap-2.5 shrink-0"
          >
            {tabs.map((tab, idx) => (
              <TabButton
                key={tab.key}
                tab={tab}
                isActive={active === tab.key}
                onClick={onChange}
                index={idx}
              />
            ))}
          </div>
        </div>

        {canScrollRight && (
          <div className="absolute right-0 z-20 flex items-center h-full pr-1 pl-6 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none">
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              className="flex items-center justify-center w-7 h-7 @md:w-8 @md:h-8 bg-white rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-500 hover:text-purple-600 hover:bg-purple-50 hover:shadow-[0_4px_16px_rgba(124,58,237,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      <div className="hidden @md:block w-px h-6 bg-gradient-to-b from-transparent via-gray-200 to-transparent shrink-0 mx-2 @lg:mx-3" aria-hidden="true" />

      <div className="flex items-center w-full @md:w-auto shrink-0 gap-2 px-1 @md:px-3 pb-1 @md:pb-0">
        {extraControls}

        <button
          type="button"
          className="group shrink-0 flex items-center justify-center gap-1.5 px-3 @md:px-3.5 h-7 @md:h-[34px] rounded-md @md:rounded-[8px] border border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)] hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 hover:shadow-[0_4px_16px_rgba(124,58,237,0.15)] transition-all duration-300 ease-out active:scale-95 font-bold text-[12px] @md:text-[13px] outline-none cursor-pointer shadow-sm"
          aria-label="Filter options"
        >
          <ListFilter
            size={14}
            strokeWidth={2.5}
            className="text-(--color-primary-600) transition-transform duration-300 ease-out group-hover:scale-110"
            aria-hidden="true"
          />
          Filter
        </button>
      </div>

    </div>
  )
})