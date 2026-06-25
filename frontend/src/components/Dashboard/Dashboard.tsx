import { useState, useCallback, memo } from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PeopleIcon from '@mui/icons-material/People'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import EventNoteIcon from '@mui/icons-material/EventNote'
import TabBar from '../commonfiles/TabBar'
import SubTabBar from '../commonfiles/TabBar/SubTabBar'
import FooterNav from '../commonfiles/FooterNav'
import { NAV_ITEMS, type NavKey } from '../commonfiles/sidebar/data'
import ActivityBoardDesktop from './activityBoard/ActivityBoardDesktop'
import ActivityBoardMobile from './activityBoard/ActivityBoardMobile'
import PodcastDesktop from './podcasts/PodcastDesktop'
import PodcastMobile from './podcasts/PodcastMobile'
import SpotlightDesktop from './spotlight/SpotlightDesktop'
import SpotlightMobile from './spotlight/SpotlightMobile'
import LaunchingSoon from './launchingSoon/LaunchingSoon'
import Directory from './directory/Directory'
import CityInventory from './cityInventory/CityInventory'
import Learn from './learn/Learn'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from '../commonfiles/sidebar/DashboardSidebar'
import type { DashboardNavKey } from '../commonfiles/sidebar/DashboardSidebar'

interface DashboardProps {
  viewMode?: 'desktop' | 'mobile'
}

const STAT_CARDS = [
  { Icon: ApartmentIcon, color: '#6B21A8', bgGradient: 'from-[#7C3AED]/10 to-[#7C3AED]/5', border: 'border-[#7C3AED]/15' },
  { Icon: PeopleIcon, color: '#A8155F', bgGradient: 'from-[#E91E8C]/10 to-[#E91E8C]/5', border: 'border-[#E91E8C]/15' },
  { Icon: CurrencyRupeeIcon, color: '#B45309', bgGradient: 'from-amber-50/80 to-amber-100/40', border: 'border-amber-100/50' },
  { Icon: EventNoteIcon, color: '#6B21A8', bgGradient: 'from-[#D946EF]/10 to-[#D946EF]/5', border: 'border-[#D946EF]/15' },
]

const STAGGER_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:65ms]',
  '[animation-delay:130ms]',
  '[animation-delay:195ms]',
] as const

const TAB_ITEMS = NAV_ITEMS.map(({ key, label, Icon, activeIcon, badge, subTabs }) => ({
  key,
  label,
  Icon: Icon || '',
  activeIcon,
  badge,
  subTabs: subTabs ?? [],
}))

/** Nav items shaped for the desktop header's integrated nav cards */
const HEADER_NAV_ITEMS = NAV_ITEMS.map(({ key, label, Icon, activeIcon, badge }) => ({
  key,
  label,
  Icon: Icon || '',
  activeIcon,
  badge,
}))

const StatCards = memo(function StatCards() {
  return (
    <section aria-label="Key Statistics Loading" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STAT_CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`ys-fade-in-up motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 ${STAGGER_DELAYS[idx]}`}
        >
          <div
            role="status"
            aria-label="Loading statistic card"
            className={`ys-skeleton rounded-xl min-h-22 border ${card.border} bg-linear-to-br ${card.bgGradient} shadow-sm backdrop-blur-sm relative overflow-hidden flex items-center p-4`}
          >
            <card.Icon
              className="absolute -right-2 -bottom-2 opacity-[0.07]"
              sx={{ fontSize: 64, color: card.color }}
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </section>
  )
})

const RecentProperties = memo(function RecentProperties() {
  return (
    <section aria-label="Recent Properties Loading" className="ys-fade-in-up motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 [animation-delay:180ms]">
      <div
        role="status"
        aria-label="Loading recent properties"
        className="ys-skeleton rounded-xl overflow-hidden h-64 border border-[#eef0f3] bg-linear-to-br from-white to-[#f8f9fa] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
      />
    </section>
  )
})

const ActivityFeed = memo(function ActivityFeed() {
  return (
    <section aria-label="Activity Feed Loading" className="ys-fade-in-up motion-reduce:animate-none motion-reduce:transform-none motion-reduce:opacity-100 [animation-delay:260ms]">
      <div
        role="status"
        aria-label="Loading activity feed"
        className="ys-skeleton rounded-xl h-64 border border-[#eef0f3] bg-linear-to-br from-white to-[#f8f9fa] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
      />
    </section>
  )
})

function DesktopDashboard() {
  const [activeTab, setActiveTab] = useState<NavKey>('pulse')
  const [activeSubTab, setActiveSubTab] = useState(TAB_ITEMS[0]?.subTabs?.[0]?.label ?? '')
  const [activeFooterTab, setActiveFooterTab] = useState<DashboardNavKey>('home')

  const activeItem = TAB_ITEMS.find(t => t.key === activeTab)
  const currentSubTabs = activeTab === 'podcasts' ? [] : (activeItem?.subTabs ?? [])

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key as NavKey)
    const item = TAB_ITEMS.find(t => t.key === key)
    if (item?.subTabs?.length) {
      setActiveSubTab(item.subTabs[0].label)
    }
  }, [])

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-white">
      {/* Inline Sidebar */}
      <DashboardSidebar 
        active={activeFooterTab} 
        onNavigate={(k) => {
          setActiveFooterTab(k)
        }} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header with integrated navigation cards */}
        <DashboardHeader
          navItems={HEADER_NAV_ITEMS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

      {/* Sub-tabs (only shown for tabs that have them) */}
      {currentSubTabs.length > 0 && (
        <nav aria-label="Secondary Navigation" className="shrink-0 border-b border-[#eef0f3] bg-white/60 backdrop-blur-md px-6 py-1">
          <SubTabBar subTabs={currentSubTabs} active={activeSubTab} onChange={setActiveSubTab} variant="desktop" />
        </nav>
      )}

      {/* Content area */}
      <div className="flex-1 overflow-hidden flex flex-col focus-visible:outline-none" tabIndex={-1}>
        {activeTab === 'activityBoard' ? (
          <ActivityBoardDesktop />
        ) : activeTab === 'podcasts' ? (
          <PodcastDesktop />
        ) : activeTab === 'spotlight' ? (
          <SpotlightDesktop />
        ) : activeTab === 'cityInventory' ? (
          <CityInventory />
        ) : activeTab === 'lms' ? (
          <Learn />
        ) : activeTab === 'showcase' || activeTab === 'surveyPools' ? (
          <LaunchingSoon />
        ) : activeTab === 'directory' ? (
          <Directory />
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <header className="mb-6">
              <p className="text-[0.7rem] font-semibold text-[#6b7280] uppercase tracking-widest truncate">
                {activeItem?.label ?? 'Dashboard'}
              </p>
              <h2 className="text-[1.5rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#6B21A8] to-[#D946EF] mt-1 truncate">
                {activeSubTab}
              </h2>
            </header>
            <StatCards />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RecentProperties />
              </div>
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
            </div>
          </div>
        )}
      </div>
      </main>
    </div>
  )
}

function MobileDashboard() {
  const [activeTab, setActiveTab] = useState<NavKey>('pulse')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [activeFooterTab, setActiveFooterTab] = useState<DashboardNavKey>('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeItem = TAB_ITEMS.find(t => t.key === activeTab)
  const currentSubTabs = activeTab === 'podcasts' ? [] : (activeItem?.subTabs ?? [])

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key as NavKey)
    const item = TAB_ITEMS.find(t => t.key === key)
    if (item?.subTabs?.length) {
      setActiveSubTab(item.subTabs[0].label)
    }
  }, [])

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-white">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Fixed Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full z-[100] transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <DashboardSidebar 
          active={activeFooterTab} 
          onNavigate={(k) => {
            setActiveFooterTab(k)
            setIsSidebarOpen(false)
          }} 
        />
      </div>

      <main className="flex-1 h-full flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <nav aria-label="Main Navigation" className="shrink-0 bg-white z-10">
        <TabBar
          tabs={TAB_ITEMS}
          active={activeTab}
          onChange={handleTabChange}
          onSubTabChange={setActiveSubTab}
        />
      </nav>

      {currentSubTabs.length > 0 && (
        <nav aria-label="Secondary Navigation" className="shrink-0 border-b border-[#eef0f3] bg-white/60 backdrop-blur-md">
          <SubTabBar subTabs={currentSubTabs} active={activeSubTab} onChange={setActiveSubTab} variant="mobile" />
        </nav>
      )}

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col hide-scrollbar focus-visible:outline-none" tabIndex={-1}>
        {activeTab === 'activityBoard' ? (
          <ActivityBoardMobile />
        ) : activeTab === 'podcasts' ? (
          <PodcastMobile />
        ) : activeTab === 'spotlight' ? (
          <SpotlightMobile />
        ) : activeTab === 'cityInventory' ? (
          <CityInventory />
        ) : activeTab === 'lms' ? (
          <Learn />
        ) : activeTab === 'showcase' || activeTab === 'surveyPools' ? (
          <LaunchingSoon />
        ) : activeTab === 'directory' ? (
          <Directory />
        ) : (
          <div className="flex-1 overflow-y-auto px-2 py-2 bg-white">
            <header className="mb-5">
              <p className="text-[0.65rem] font-semibold text-[#6b7280] uppercase tracking-widest truncate">
                {activeItem?.label ?? 'Dashboard'}
              </p>
              <h2 className="text-[1.2rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#6B21A8] to-[#D946EF] mt-1 truncate">
                {activeSubTab}
              </h2>
            </header>
            <StatCards />
            <div className="mb-5">
              <RecentProperties />
            </div>
            <ActivityFeed />
          </div>
        )}
      </div>

      <FooterNav active={activeFooterTab} onChange={(k) => setActiveFooterTab(k as DashboardNavKey)} />
      </main>
    </div>
  )
}

export default function Dashboard({ viewMode = 'desktop' }: DashboardProps) {
  return viewMode === 'mobile' ? <MobileDashboard /> : <DesktopDashboard />
}