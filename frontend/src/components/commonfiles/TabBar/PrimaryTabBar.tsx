import { useRef, useCallback, memo } from 'react'

export interface PrimaryTabItem {
  key: string
  label: string
  Icon: string
  activeIcon?: string 
  badge?: string
}

export interface PrimaryTabBarProps {
  tabs: PrimaryTabItem[]
  active: string
  onChange: (key: string) => void
}

interface TabCardProps extends Omit<PrimaryTabItem, 'key'> {
  tabKey: string
  isActive: boolean
  onClick: (key: string, el: HTMLButtonElement) => void
}

const TabCard = memo(({ tabKey, label, Icon, activeIcon, badge, isActive, onClick }: TabCardProps) => {
  const currentIcon = isActive && activeIcon ? activeIcon : Icon

  return (
    <button
      type="button"
      role="tab"
      title={label}
      aria-selected={isActive}
      id={`tab-${tabKey}`}
      tabIndex={isActive ? 0 : -1}
      aria-controls={`panel-${tabKey}`}
      onClick={(e) => onClick(tabKey, e.currentTarget)}
      className={`relative shrink-0 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 outline-none cursor-pointer w-[68px] h-[52px] px-1 py-0.5 rounded-[4px] ${
        isActive
          ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-sm shadow-violet-500/20'
          : 'bg-transparent border border-gray-200'
      }`}
    >
      {badge && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold px-1 py-0.5 rounded-full bg-[#7C3AED] text-white leading-none z-10">
          {badge}
        </span>
      )}

      <span className={`flex items-center justify-center transition-all duration-300 ${isActive ? 'h-5 w-5 text-white text-[16px]' : 'h-4 w-4 text-slate-500 text-[14px]'}`}>
        {typeof currentIcon === 'string' && (currentIcon.includes('/') || currentIcon.includes('.png')) ? (
          <img src={currentIcon} alt="" className="w-full h-full object-contain" />
        ) : (
          <span className="flex items-center justify-center w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5px]">
            {typeof currentIcon === 'object' && currentIcon !== null && '$$typeof' in currentIcon && !('props' in currentIcon)
              ? (() => { const IconCmp = currentIcon as React.ElementType; return <IconCmp strokeWidth={1.5} />; })()
              : typeof currentIcon === 'function'
              ? (() => { const IconCmp = currentIcon as React.ElementType; return <IconCmp strokeWidth={1.5} />; })()
              : currentIcon}
          </span>
        )}
      </span>
      
      <span
        title={label}
        className={`w-full px-0.5 text-[9px] leading-[1.1] text-center line-clamp-1 break-words transition-all duration-300 ${
          isActive ? 'font-semibold text-white' : 'font-medium text-[#374151]'
        }`}
      >
        {label}
      </span>
    </button>
  )
})

TabCard.displayName = 'TabCard'

export const PrimaryTabBar = memo(function PrimaryTabBar({ tabs, active, onChange }: PrimaryTabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((key: string, el: HTMLButtonElement) => {
    onChange(key)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [onChange])

  return (
    <div role="tablist" aria-label="Primary Navigation" className="bg-white">
      <div
        ref={scrollRef}
        className="relative z-10 flex items-center gap-1.5 overflow-x-auto px-2 py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        {tabs.map((tab) => (
          <TabCard
            key={tab.key}
            tabKey={tab.key}
            label={tab.label}
            Icon={tab.Icon}
            activeIcon={tab.activeIcon}
            badge={tab.badge}
            isActive={tab.key === active}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  )
})

export default PrimaryTabBar;