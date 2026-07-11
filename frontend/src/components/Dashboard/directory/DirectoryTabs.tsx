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
      ariaLabel="Directory category filters"
      containerClassName="px-4 py-1"
      extraControls={
        <div className="relative flex items-center flex-1 @md:w-[200px] @lg:w-[240px] h-8 @md:h-9 group animate-in fade-in zoom-in-[0.98] duration-400 ease-out">
          <SearchIcon
            className="absolute left-2.5 @md:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] @md:text-[17px] transition-all duration-300 group-focus-within:text-indigo-500 group-focus-within:scale-110 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search builders..."
            aria-label="Search builders"
            className="w-full h-full pl-8 @md:pl-9 pr-3 text-[12px] rounded-[2px] border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 hover:border-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-300 shadow-sm font-medium"
          />
        </div>
      }
    />
  )
})

export default DirectoryTabs
