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
  index,
}: {
  tab: CommonTabType
  isActive: boolean
  onClick: (key: string) => void
  index: number
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      data-active={isActive}
      onClick={() => onClick(tab.key)}
      style={{ animationDelay: `${index * 40}ms` }}
      className={`group relative shrink-0 flex items-center justify-center gap-1.5 px-3 py-1 rounded-[4px] text-[13px] font-medium transition-all duration-300 ease-out active:scale-[0.96] border outline-none cursor-pointer overflow-hidden tab-enter ${
        isActive
          ? 'bg-gradient-to-b from-violet-50 to-violet-100/50 text-violet-700 border-violet-200 shadow-sm ring-1 ring-violet-500/20'
          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:-translate-y-[0.5px]'
      }`}
    >
      {isActive && (
        <span className="absolute inset-0 bg-violet-100/40 animate-pulse" aria-hidden="true" />
      )}
      
      <span className="relative z-10 whitespace-nowrap">{tab.label}</span>

      {tab.count !== undefined && (
        <span
          className={`relative z-10 px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold transition-all duration-300 ${
            isActive
              ? 'bg-violet-200 text-violet-800 scale-105'
              : 'bg-gray-100 text-gray-500 border border-gray-200/60 group-hover:bg-gray-200 group-hover:text-gray-700'
          }`}
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
  containerClassName = 'bg-transparent py-0.5 px-1',
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
    <>
      <style>
        {`
          @keyframes tabEnter {
            from { opacity: 0; transform: translateY(4px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .tab-enter {
            animation: tabEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className={`flex flex-col @md:flex-row w-full items-stretch @md:items-center gap-1 ${containerClassName}`}>
        
        <div className="relative flex items-center flex-1 min-w-0 w-full group/container">
          {canScrollLeft && (
            <div className="absolute left-0 z-20 flex items-center h-full pl-0.5 pr-6 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none transition-opacity duration-300">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.1)] border border-gray-200 text-gray-600 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-1 overflow-x-auto w-full scroll-smooth hide-scrollbar relative z-10 py-1"
          >
            <div
              role="group"
              aria-label={ariaLabel}
              className="flex items-center gap-1 shrink-0 px-0.5"
            >
              {tabs.map((tab, index) => (
                <TabButton
                  key={tab.key}
                  tab={tab}
                  isActive={active === tab.key}
                  onClick={onChange}
                  index={index}
                />
              ))}
            </div>
          </div>

          {canScrollRight && (
            <div className="absolute right-0 z-20 flex items-center h-full pr-0.5 pl-6 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none transition-opacity duration-300">
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.1)] border border-gray-200 text-gray-600 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div className="hidden @md:block w-px h-4 bg-gray-200/80 shrink-0 mx-2.5" aria-hidden="true" />

        <div className="flex flex-row items-center justify-between @md:justify-end w-full @md:w-auto shrink-0 gap-1">
          {extraControls && (
            <div className="flex-1 min-w-0 flex items-center">
              {extraControls}
            </div>
          )}

          <button
            type="button"
            onClick={onFilterClick}
            className="group shrink-0 flex items-center justify-center gap-1.5 px-3 h-7 rounded-[6px] border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm hover:-translate-y-[0.5px] transition-all duration-300 ease-out active:scale-95 font-medium text-[13px] outline-none cursor-pointer w-auto tracking-wide"
            aria-label="Filter options"
          >
            <ListFilter
              size={13}
              strokeWidth={2}
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden="true"
            />
            Filter
          </button>
        </div>

      </div>
    </>
  )
})