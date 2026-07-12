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
      className={`group relative shrink-0 flex items-center justify-center gap-1.5 px-2 py-1 rounded-[4px] text-[12px] font-medium transition-all duration-300 ease-out border outline-none cursor-pointer overflow-hidden tab-enter ${
        isActive
          ? 'bg-gradient-to-br from-violet-50 via-white to-violet-50/50 text-violet-700 border-violet-800 shadow-[0_4px_16px_-4px_rgba(139,92,246,0.15)] -translate-y-[1px] scale-[1.02]'
          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50/80 hover:text-gray-900 hover:border-gray-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] active:scale-[0.96] active:translate-y-0'
      }`}
    >
      {isActive && (
        <>
          <span className="absolute inset-0 bg-violet-100/30 animate-pulse duration-[3000ms]" aria-hidden="true" />
          <span className="absolute bottom-0 left-1/2 w-1/2 h-[2px] bg-violet-400 -translate-x-1/2 rounded-t-[2px] opacity-70 blur-[1px]" aria-hidden="true" />
        </>
      )}
      
      <span className="relative z-10 whitespace-nowrap">{tab.label}</span>

      {tab.count !== undefined && (
        <span
          className={`relative z-10 px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold transition-all duration-300 ${
            isActive
              ? 'bg-violet-100 text-violet-700 shadow-[0_0_8px_-2px_rgba(139,92,246,0.25)] scale-105'
              : 'bg-gray-50 text-gray-500 border border-gray-200 group-hover:bg-white group-hover:shadow-sm'
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
  containerClassName = 'bg-transparent py-1 px-1',
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
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .tab-enter {
            animation: tabEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
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
            <div className="absolute left-0 z-20 flex items-center h-full pl-0.5 pr-8 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none transition-opacity duration-300 animate-in fade-in">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                className="flex items-center justify-center w-7 h-7 bg-white/90 backdrop-blur-sm rounded-[2px] border border-gray-200 text-gray-500 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.12)] hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50/80 hover:shadow-[0_4px_16px_-4px_rgba(139,92,246,0.2)] hover:-translate-y-0.5 active:scale-90 active:translate-y-0 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} strokeWidth={2.5} className="ml-[-1px]" />
              </button>
            </div>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-1.5 overflow-x-auto w-full scroll-smooth hide-scrollbar relative z-10 py-2 px-1"
          >
            <div
              role="group"
              aria-label={ariaLabel}
              className="flex items-center gap-2 shrink-0"
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
            <div className="absolute right-0 z-20 flex items-center h-full pr-0.5 pl-8 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none transition-opacity duration-300 animate-in fade-in">
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                className="flex items-center justify-center w-7 h-7 bg-white/90 backdrop-blur-sm rounded-[2px] border border-gray-200 text-gray-500 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.12)] hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50/80 hover:shadow-[0_4px_16px_-4px_rgba(139,92,246,0.2)] hover:-translate-y-0.5 active:scale-90 active:translate-y-0 transition-all duration-300 pointer-events-auto cursor-pointer outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} strokeWidth={2.5} className="mr-[-1px]" />
              </button>
            </div>
          )}
        </div>

        <div className="hidden @md:block w-px h-5 bg-gradient-to-b from-transparent via-gray-200 to-transparent shrink-0 mx-1" aria-hidden="true" />

        <div className="flex flex-row items-center justify-between @md:justify-end w-full @md:w-auto shrink-0 gap-2 px-1 @md:px-0">
          {extraControls && (
            <div className="flex-1 min-w-0 flex items-center animate-in fade-in slide-in-from-right-4 duration-500">
              {extraControls}
            </div>
          )}

          <button
            type="button"
            onClick={onFilterClick}
            className="group shrink-0 flex items-center justify-center gap-2 px-3.5 h-[34px] rounded-[2px] border border-gray-200 bg-white text-gray-600 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50/80 hover:text-gray-900 hover:border-gray-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] transition-all duration-300 ease-out active:scale-[0.96] active:translate-y-0 font-medium text-[13px] outline-none cursor-pointer w-auto tracking-wide overflow-hidden relative"
            aria-label="Filter options"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" aria-hidden="true" />
            <ListFilter
              size={14}
              strokeWidth={2.5}
              className="text-gray-400 group-hover:text-violet-500 transition-colors duration-300"
              aria-hidden="true"
            />
            <span>Filter</span>
          </button>
        </div>

      </div>
    </>
  )
})