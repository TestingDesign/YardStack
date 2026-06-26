import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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
  Sparkles,
  Target
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';

const ModuleIcon = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  const defaultClass = "text-purple-600 transition-colors duration-300";
  const finalClass = className || defaultClass;

  switch (name) {
    case 'Spotlight': return <MessageSquare size={size} className={finalClass} />;
    case 'Directory': return <Users size={size} className={finalClass} />;
    case 'Opportunities': return <Briefcase size={size} className={finalClass} />;
    case 'Showcase': return <MonitorPlay size={size} className={finalClass} />;
    case 'Polls & Surveys': return <BarChart2 size={size} className={finalClass} />;
    case 'RED Expert': return <Mic size={size} className={finalClass} />;
    case 'Learn': return <GraduationCap size={size} className={finalClass} />;
    case 'City Inventory': return <Building2 size={size} className={finalClass} />;
    default: return <PlayCircle size={size} className={finalClass} />;
  }
};

export default function FindYourPlaceDesktop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleInfo>(ROLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ROLES.filter((role) => role.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleRoleSelect = useCallback((role: RoleInfo) => {
    setSelectedRole(role);
    setSearchQuery('');
    setIsDropdownOpen(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section
      id="find-your-place"
      className="relative bg-[#FAFAFA] overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-16 lg:py-24"
    >
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16 lg:mb-20 text-center">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-4">
            <Sparkles size={14} className="text-purple-600" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.15] font-extrabold text-slate-900 max-w-3xl tracking-tight mb-6">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
          <p className="text-lg font-medium text-slate-500 max-w-2xl leading-relaxed">
            {FIND_YOUR_PLACE_CONTENT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] bg-white/80 backdrop-blur-xl rounded-[32px] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Left Column: Search & Popular Roles */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-slate-50/30">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-purple-600" />
              <p className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <div className="relative z-30 mb-10" ref={dropdownRef}>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                  className="w-full py-3.5 pl-11 pr-4 rounded-xl border border-slate-200/80 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none bg-white hover:border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-600/5 transition-all shadow-sm"
                />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-40 max-h-[240px] overflow-y-auto p-2">
                  <ul className="flex flex-col gap-1">
                    {filteredRoles.map((role) => (
                      <li key={role.key}>
                        <button
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          {role.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <p className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-[0.15em]">
                Popular Roles
              </p>
              <div className="flex flex-wrap gap-2.5">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-all duration-300 ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25 scale-[1.02]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50 hover:shadow-sm'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column: Role Details */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 relative">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-bl-full -z-10 pointer-events-none opacity-50" />
            
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-inner">
                <Building2 size={28} className="text-purple-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-[28px] font-extrabold text-slate-900 leading-tight tracking-tight">
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul className="flex flex-col gap-5">
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-[15px] text-slate-600 font-medium leading-relaxed">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                    <Check size={14} strokeWidth={2.5} className="text-purple-700" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button className="group inline-flex items-center justify-center gap-2 mt-12 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-800 to-purple-600 text-white text-sm font-bold shadow-lg shadow-purple-800/25 hover:shadow-xl hover:shadow-purple-800/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] w-fit">
              {selectedRole.ctaLabel}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Relevant Modules */}
          <div className="p-8 lg:p-10 bg-slate-50/30">
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-6">
              Relevant Modules
            </p>

            <div className="flex flex-col gap-3">
              {selectedRole.relevantModules.map((module) => (
                <div
                  key={module.name}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 transition-all duration-300 cursor-pointer hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-purple-50 transition-colors duration-300">
                      <ModuleIcon name={module.name} size={18} className="text-slate-400 group-hover:text-purple-600 transition-colors duration-300" />
                    </div>
                    <span className="text-[14px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                      {module.name}
                    </span>
                  </div>
                  {module.comingSoon && (
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-md uppercase tracking-wider">
                      Soon
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