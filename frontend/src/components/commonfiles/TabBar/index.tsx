import { useCallback } from 'react'
import PrimaryTabBar, { type PrimaryTabItem } from './PrimaryTabBar'
import { type SubTabItem } from './SubTabBar'

export type { PrimaryTabItem, SubTabItem }

export interface TabItem {
  key: string
  label: string
  Icon: string
  activeIcon?: string
  badge?: string
  subTabs?: SubTabItem[]
}

interface TabBarProps {
  tabs: TabItem[]
  active: string
  activeSubTab: string
  onChange: (key: string) => void
  onSubTabChange: (sub: string) => void
}

export default function TabBar({
  tabs,
  active,
  onChange,
  onSubTabChange,
}: TabBarProps) {
  const handleMainChange = useCallback(
    (key: string) => {
      onChange(key)
      const item = tabs.find((t) => t.key === key)
      if (item?.subTabs?.length) {
        onSubTabChange(item.subTabs[0].label)
      }
    },
    [tabs, onChange, onSubTabChange]
  )

  return (
    <nav 
      aria-label="Section Navigation" 
      className="flex flex-col w-full shrink-0 bg-transparent"
    >
      <PrimaryTabBar
        tabs={tabs}
        active={active}
        onChange={handleMainChange}
      />
    </nav>
  )
}