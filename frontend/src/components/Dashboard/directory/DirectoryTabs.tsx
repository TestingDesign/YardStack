import { memo } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { CommonTabs } from '../../commonfiles/tabs/CommonTabs'
import { DIRECTORY_TABS } from './data'

interface DirectoryTabsProps {
  active: string
  onChange: (key: string) => void
}

const DirectoryTabs = memo(function DirectoryTabs({ active, onChange }: DirectoryTabsProps) {
  return (
    <CommonTabs
      tabs={DIRECTORY_TABS}
      active={active}
      onChange={onChange}
      ariaLabel="Directory filters"
      extraControls={
        <div className="relative flex items-center flex-1 @md:w-[200px] @lg:w-[240px] h-8 @md:h-9 group animate-in fade-in zoom-in-[0.98] duration-400 ease-out">
          <SearchIcon
            className="absolute left-2.5 @md:left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] text-[15px] @md:text-[17px] transition-all duration-300 group-focus-within:text-purple-600 group-focus-within:scale-110 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search builders..."
            aria-label="Search builders"
            className="w-full h-full pl-8 @md:pl-9 pr-3 text-[12px] @md:text-[13px] rounded-lg border border-[var(--color-border-default)] bg-white text-[var(--color-text-primary)] placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-[0_4px_16px_rgba(124,58,237,0.15)] font-medium"
          />
        </div>
      }
    />
  )
})

export default DirectoryTabs
