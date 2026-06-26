import { useState, useMemo, useCallback } from 'react';
import {
  Search,
  ArrowRight,
  Check,
  Building2,
  MessageSquare,
  PlayCircle,
  Users,
  Briefcase,
  MonitorPlay,
  BarChart2,
  Mic,
  GraduationCap,
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';

const ModuleIcon = ({ name, size = 16, className = "text-[var(--color-primary-600)]" }: { name: string; size?: number; className?: string }) => {
  switch (name) {
    case 'Spotlight': return <MessageSquare size={size} className={className} />;
    case 'Directory': return <Users size={size} className={className} />;
    case 'Opportunities': return <Briefcase size={size} className={className} />;
    case 'Showcase': return <MonitorPlay size={size} className={className} />;
    case 'Polls & Surveys': return <BarChart2 size={size} className={className} />;
    case 'RED Expert': return <Mic size={size} className={className} />;
    case 'Learn': return <GraduationCap size={size} className={className} />;
    case 'City Inventory': return <Building2 size={size} className={className} />;
    default: return <PlayCircle size={size} className={className} />;
  }
};

export default function FindYourPlaceMobile() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleInfo>(ROLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ROLES.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleRoleSelect = useCallback((role: RoleInfo) => {
    setSelectedRole(role);
    setSearchQuery('');
    setIsDropdownOpen(false);
  }, []);

  return (
    <section
      id="find-your-place"
      className="bg-white font-sans py-8 pb-10"
    >
      <div className="px-4">
        <p className="text-center text-[10px] font-extrabold tracking-widest uppercase text-[var(--color-primary-600)] mb-3">
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 className="text-center text-[1.85rem] font-extrabold text-[var(--color-text-primary)] leading-[1.14] mb-3 tracking-[-0.02em]">
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p className="text-center text-[0.9rem] text-gray-500 mb-8 leading-relaxed max-w-[320px] mx-auto font-medium">
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div className="bg-white rounded-[8px] border border-purple-600/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2.5">
              {FIND_YOUR_PLACE_CONTENT.inputPrefix}
            </p>

            <div className="relative z-30">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                className="w-full pl-3.5 pr-9 py-3 rounded-[4px] border border-gray-200 text-sm font-medium text-gray-700 outline-none bg-white focus:border-[var(--color-primary-600)] focus:ring-2 focus:ring-[var(--color-primary-600)]/10 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              
              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[4px] border border-gray-200 shadow-[0_10px_24px_rgba(0,0,0,0.08)] z-40 max-h-[160px] overflow-y-auto list-none m-0 p-1.5">
                  {filteredRoles.map((role) => (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="w-full text-left px-3 py-2.5 text-[13px] font-medium text-gray-700 bg-transparent border-none rounded-[4px] hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white transition-colors"
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROLES.slice(0, 8).map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`px-3 py-1.5 rounded-[4px] text-[11px] font-semibold border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white border-transparent shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.48)] hover:-translate-y-px'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-[var(--color-primary-600)] hover:shadow-sm'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-[4px] bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] text-white shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] flex items-center justify-center shrink-0">
                <Building2 size={20} className="text-white" />
              </div>
              <h3 className="text-[1.1rem] font-extrabold text-[var(--color-text-primary)] m-0 leading-[1.3] tracking-[-0.01em]">
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[0.85rem] text-gray-600">
                  <div className="shrink-0 w-4 h-4 rounded-[2px] bg-gradient-to-r from-[var(--color-primary-600)] via-purple-600 to-[var(--color-primary-600)] flex items-center justify-center mt-0.5 shadow-sm">
                    <Check size={10} strokeWidth={3} className="text-white" />
                  </div>
                  <span className="font-medium leading-[1.5]">{point}</span>
                </li>
              ))}
            </ul>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                marginTop: '24px',
                padding: '12px 20px',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1.5px solid rgba(107,33,168,0.3)',
                color: '#6B21A8',
                fontSize: '13px',
                fontWeight: 700,
                }}
            >
              {selectedRole.ctaLabel}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-[11px] font-extrabold text-[var(--color-primary-600)] m-0 mb-3">
              Relevant Modules
            </p>

            <div className="flex flex-col gap-2">
              {selectedRole.relevantModules.map((module) => (
                <div
                  key={module.name}
                  className="group flex items-center justify-between p-2.5 rounded-[4px] bg-white border border-gray-100 transition-all cursor-pointer hover:bg-gradient-to-r hover:from-[var(--color-primary-600)] hover:via-purple-600 hover:to-[var(--color-primary-600)] hover:text-white hover:border-transparent hover:shadow-[0_4px_14px_rgba(124,58,237,0.38),0_1px_3px_rgba(124,58,237,0.2)] hover:-translate-y-px"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-[2px] bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <ModuleIcon name={module.name} size={14} className="text-[var(--color-primary-600)] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                      {module.name}
                    </span>
                  </div>
                  {module.comingSoon && (
                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-white/80 transition-colors whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}