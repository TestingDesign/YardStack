import { memo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CommonTabs } from '../../commonfiles/tabs/CommonTabs'
import { FILTER_TABS } from './data'

interface SpotlightTabsProps {
  active: string
  onChange: (key: string) => void
}

const SpotlightTabs = memo(function SpotlightTabs({ active, onChange }: SpotlightTabsProps) {
  return (
    <CommonTabs
      tabs={FILTER_TABS}
      active={active}
      onChange={onChange}
      ariaLabel="Spotlight category filters"
      extraControls={
        <div className="relative flex items-center flex-1 @md:w-[200px] @lg:w-[240px] h-8 @md:h-9">
          <SearchIcon className="absolute left-2 @md:left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] text-[16px] @md:text-[18px]" />
          <input 
            type="text" 
            placeholder="Search spotlights..." 
            className="w-full h-full pl-8 @md:pl-9 pr-3 text-[12px] @md:text-[13px] rounded-[4px] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/70 focus:outline-none focus:border-[var(--color-brand-purple)] focus:ring-1 focus:ring-[var(--color-brand-purple)] transition-all"
          />
        </div>
      }
    />
  )
})

export default SpotlightTabs;