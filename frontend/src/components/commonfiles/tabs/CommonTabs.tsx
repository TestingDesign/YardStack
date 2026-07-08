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
  onFilterClick?: () => void
  extraControls?: ReactNode
  containerClassName?: string
  ariaLabel?: string
}

const TabButton = memo(function TabButton({
  tab,
  isActive,
  onClick,
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
      className={`group relative shrink-0 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-[4px] text-[12px] font-medium transition-all duration-200 ease-out active:scale-95 border outline-none cursor-pointer overflow-hidden ${
        isActive
          ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white shadow-[0_2px_10px_rgba(124,58,237,0.35)] border-transparent hover:shadow-[0_4px_16px_rgba(124,58,237,0.5)]'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300'
      }`}
      style={{
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
          className={`relative z-10 px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors duration-200 ${
            isActive
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
          }`}
          style={!isActive && tab.color ? {
            backgroundColor: `${tab.color}20`,
            color: tab.color,
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
  onFilterClick,
  extraControls,
  containerClassName = 'bg-transparent py-1 px-2',
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
    <div className={`flex flex-col @md:flex-row w-full items-stretch @md:items-center gap-3 @md:gap-0 ${containerClassName}`}>
      
      <div className="relative flex items-center flex-1 min-w-0 w-full group/container">
        {canScrollLeft && (
          <div className="absolute left-0 z-20 flex items-center h-full pl-1 pr-6 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              className="flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-2 overflow-x-auto w-full scroll-smooth hide-scrollbar relative z-10 py-1"
        >
          <div
            role="group"
            aria-label={ariaLabel}
            className="flex items-center gap-2 shrink-0"
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
          <div className="absolute right-0 z-20 flex items-center h-full pr-1 pl-6 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none">
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              className="flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 pointer-events-auto cursor-pointer outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <div className="hidden @md:block w-px h-5 bg-gray-200 shrink-0 mx-3" aria-hidden="true" />

      <div className="flex flex-row items-center justify-between @md:justify-end w-full @md:w-auto shrink-0 gap-2">
        {extraControls && (
          <div className="flex-1 min-w-0 flex items-center">
            {extraControls}
          </div>
        )}

        <button
          type="button"
          onClick={onFilterClick}
          className="group shrink-0 flex items-center justify-center gap-1.5 px-3 h-[32px] rounded-[2px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 ease-out active:scale-95 font-medium text-[13px] outline-none cursor-pointer shadow-sm w-auto"
          aria-label="Filter options"
        >
          <ListFilter
            size={14}
            strokeWidth={2}
            className="text-gray-500"
            aria-hidden="true"
          />
          Filter
        </button>
      </div>

    </div>
  )
})