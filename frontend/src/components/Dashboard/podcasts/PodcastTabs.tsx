import { memo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CommonTabs } from '../../commonfiles/tabs/CommonTabs'
import { FILTER_TABS } from './data'

interface PodcastTabsProps {
  active: string
  onChange: (key: string) => void
}

const PodcastTabs = memo(function PodcastTabs({ active, onChange }: PodcastTabsProps) {
  return (
    <CommonTabs
      tabs={FILTER_TABS}
      active={active}
      onChange={onChange}
      ariaLabel="Podcast category filters"
      extraControls={
        <div className="relative flex items-center flex-1 @md:w-[200px] @lg:w-[240px] h-8 @md:h-9 group animate-in fade-in zoom-in-[0.98] duration-300 ease-out">
          <SearchIcon 
            className="absolute left-2 @md:left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] text-[16px] @md:text-[18px] transition-colors duration-300 group-focus-within:text-[var(--color-brand-purple)]" 
          />
          <input 
            type="text" 
            placeholder="Search episodes..." 
            aria-label="Search episodes"
            className="w-full h-full pl-8 @md:pl-9 pr-3 text-[12px] @md:text-[13px] rounded-md @md:rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/70 hover:border-gray-300 focus:outline-none focus:border-[var(--color-brand-purple)] focus:ring-2 focus:ring-[var(--color-brand-purple)]/20 transition-all duration-300 shadow-sm focus:shadow-md"
          />
        </div>
      }
    />
  )
})

export default PodcastTabs;