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
    <div className="group flex flex-col aspect-square justify-between bg-white border border-[#EDEBF8] rounded-[12px] p-4 relative shadow-[0_2px_12px_rgba(107,33,168,0.04)] transition-all duration-300 ease-out hover:shadow-[0_8px_28px_rgba(107,33,168,0.12)] hover:-translate-y-1 hover:border-purple-200">

      <div className="flex flex-col items-center justify-center text-center gap-3 flex-1">
        <div className="shrink-0 group-hover:scale-110 transition-transform duration-300 ease-out">
          {item.icon}
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-[#1A1A2E] mb-1 leading-[1.2] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-800 group-hover:to-indigo-600 transition-all duration-300">
            {item.title}
          </h3>
          <p className="text-[11px] text-gray-500 leading-[1.4] m-0 font-normal line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-[#F0EDF8] text-purple-800 group-hover:border-purple-100 transition-colors duration-300">
        <Clock size={14} strokeWidth={2} className="text-purple-800 shrink-0 group-hover:animate-pulse" />
        <span className="text-[11px] font-semibold bg-gradient-to-r from-purple-800 to-indigo-600 bg-no-repeat [background-position:0_100%] [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-all duration-300 pb-0.5">
          Launching Soon
        </span>
      </div>
    </div>
  )
}

export default function LaunchingSoonMobile() {
  return (
    <div className="flex-1 w-full h-full bg-gradient-to-br from-[#F8F7FC] to-[#F1EEF9] overflow-y-auto py-4 px-4 box-border [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="w-full flex flex-col justify-center h-full">
        <div className="grid grid-cols-2 gap-4">
          {LAUNCHING_ITEMS.map((item) => (
            <LaunchingCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}