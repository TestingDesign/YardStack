import { useState, useMemo, useCallback } from 'react'
import { Search, ArrowRight, Check, Building2, MessageSquare, PlayCircle, Users, Briefcase, MonitorPlay, BarChart2, Mic, GraduationCap } from 'lucide-react'
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data'

const ModuleIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Spotlight': return <MessageSquare size={12} className="text-[#6B21A8]" />
    case 'Directory': return <Users size={12} className="text-[#6B21A8]" />
    case 'Opportunities': return <Briefcase size={12} className="text-[#6B21A8]" />
    case 'Showcase': return <MonitorPlay size={12} className="text-[#6B21A8]" />
    case 'Polls & Surveys': return <BarChart2 size={12} className="text-[#6B21A8]" />
    case 'RED Expert': return <Mic size={12} className="text-[#6B21A8]" />
    case 'Learn': return <GraduationCap size={12} className="text-[#6B21A8]" />
    case 'City Inventory': return <Building2 size={12} className="text-[#6B21A8]" />
    default: return <PlayCircle size={12} className="text-[#6B21A8]" />
  }
}

export default function FindYourPlaceMobile() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<RoleInfo>(ROLES[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return []
    return ROLES.filter((r) =>
      r.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleRoleSelect = useCallback((role: RoleInfo) => {
    setSelectedRole(role)
    setSearchQuery('')
    setIsDropdownOpen(false)
  }, [])

  return (
    <section id="find-your-place" className="bg-[#F9FAFB] font-['Outfit',sans-serif] py-10">
      <div className="px-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B21A8] mb-2">
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>
        <h2 className="text-center text-[1.25rem] leading-[1.25] font-extrabold text-[#1A1A2E] mb-1.5">
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>
        <p className="text-center text-[0.82rem] text-[#6B7280] mb-6">
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-5">
          {/* Role Selector */}
          <div>
            <p className="text-[11px] font-bold text-[#374151] m-0 mb-2">{FIND_YOUR_PLACE_CONTENT.inputPrefix}</p>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true) }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-200 text-[12px] font-medium text-[#374151] outline-none focus:border-[#6B21A8]/40 transition-all placeholder:text-gray-400 bg-white font-['Outfit',sans-serif]"
              />
              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-20 max-h-40 overflow-y-auto list-none m-0 p-1">
                  {filteredRoles.map((role) => (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="w-full text-left px-3 py-2 text-[11px] font-medium text-[#374151] hover:bg-[#6B21A8]/5 rounded-md transition-colors cursor-pointer border-none bg-transparent font-['Outfit',sans-serif]"
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {POPULAR_ROLES.slice(0, 8).map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all border cursor-pointer font-['Outfit',sans-serif] ${
                    selectedRole.key === role.key
                      ? 'bg-[#6B21A8] text-white border-[#6B21A8]'
                      : 'bg-white text-[#374151] border-gray-200 hover:border-[#6B21A8]/30'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Help */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center shrink-0">
                <Building2 size={16} className="text-[#6B21A8]" />
              </div>
              <h3 className="text-[0.88rem] font-bold text-[#1A1A2E] m-0">{selectedRole.helpTitle}</h3>
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.78rem] text-[#4B5563]">
                  <Check size={14} strokeWidth={3} className="shrink-0 mt-0.5 text-[#6B21A8]" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
            <button className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white border border-gray-200 text-[#6B21A8] text-[12px] font-bold cursor-pointer transition-all active:bg-gray-50 mt-3">
              {selectedRole.ctaLabel}
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Relevant Modules */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] m-0 mb-2">Relevant Modules</p>
            <div className="flex flex-col gap-1.5">
              {selectedRole.relevantModules.map((mod, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F9FAFB] border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#6B21A8]/10 flex items-center justify-center shrink-0">
                      <ModuleIcon name={mod.name} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#374151]">{mod.name}</span>
                  </div>
                  {mod.comingSoon && (
                    <span className="text-[7px] font-medium text-[#6B7280]">
                      (Coming Soon)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
