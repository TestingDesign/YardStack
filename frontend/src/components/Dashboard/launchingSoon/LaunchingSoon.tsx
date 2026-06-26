import { Monitor, Building2, ClipboardList, GraduationCap, Clock } from 'lucide-react'

interface LaunchingItem {
  key: string
  icon: React.ReactNode
  title: string
  description: string
}

const LAUNCHING_ITEMS: LaunchingItem[] = [
  {
    key: 'showcase',
    icon: <Monitor size={44} strokeWidth={1.5} className="text-purple-800" />,
    title: 'Showcase',
    description: 'Highlight your projects, wins, and impact in one centralized space.',
  },
  {
    key: 'city-inventory',
    icon: <Building2 size={44} strokeWidth={1.5} className="text-purple-800" />,
    title: 'City Inventory',
    description: 'View and manage detailed information about cities and communities.',
  },
  {
    key: 'survey-pools',
    icon: <ClipboardList size={44} strokeWidth={1.5} className="text-purple-800" />,
    title: 'Survey Pools',
    description: 'Access and contribute to a variety of surveys and polls.',
  },
  {
    key: 'lms',
    icon: <GraduationCap size={44} strokeWidth={1.5} className="text-purple-800" />,
    title: 'LMS',
    description: 'Access learning resources and build your skills on your schedule.',
  },
]

function LaunchingCard({ item }: { item: LaunchingItem }) {
  return (
    <div className="flex flex-col bg-white border border-[#EDEBF8] rounded-2xl p-6 relative shadow-[0_2px_12px_rgba(107,33,168,0.04)] transition-all duration-200 ease-out hover:shadow-[0_8px_28px_rgba(107,33,168,0.10)] hover:-translate-y-0.5">
      <span className="inline-flex self-start py-[5px] px-[14px] rounded-full bg-purple-800/10 text-purple-800 text-xs font-bold mb-6 tracking-[0.01em]">
        Coming Soon
      </span>

      <div className="flex items-start gap-5 flex-1">
        <div className="shrink-0 mt-0.5">{item.icon}</div>
        <div>
          <h3 className="text-lg font-extrabold text-[#1A1A2E] mb-2 leading-[1.2]">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 leading-[1.6] m-0 font-normal">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-[#F0EDF8] text-purple-800">
        <Clock size={16} strokeWidth={2} className="text-purple-800 shrink-0" />
        <span className="text-[13px] font-semibold">Launching Soon</span>
      </div>
    </div>
  )
}

export default function LaunchingSoon() {
  return (
    <div className="flex-1 w-full h-full bg-[#F8F7FC] overflow-y-auto py-8 px-7 box-border">
      <div className="max-w-[900px]">
        <div className="grid grid-cols-2 gap-5">
          {LAUNCHING_ITEMS.map((item) => (
            <LaunchingCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}