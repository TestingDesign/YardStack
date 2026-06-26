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

const ModuleIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const className = "text-purple-600";
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

export default function FindYourPlaceDesktop() {
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
      className="bg-gradient-to-b from-white via-slate-50 to-white font-sans py-20"
    >
      <div className="max-w-6xl mx-auto px-8">
        
        <p className="ys-fade-in-up text-xs font-extrabold tracking-widest uppercase bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 text-center">
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 className="ys-fade-in-up text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4 text-center">
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p className="ys-fade-in-up text-base text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-center">
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div className="ys-fade-in-up grid grid-cols-[280px_1fr_260px] bg-white/90 backdrop-blur-md rounded-lg border border-purple-600/10 shadow-2xl shadow-purple-600/5">
          
          {/* Left Column: Search & Roles */}
          <div className="p-8 border-r border-purple-600/5">
            <p className="text-sm font-bold text-gray-700 mb-3">
              {FIND_YOUR_PLACE_CONTENT.inputPrefix}
            </p>

            <div className="relative z-30">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                className="w-full py-3 pr-10 pl-4 rounded-lg border-2 border-gray-200 text-sm font-medium text-gray-700 outline-none bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg border border-purple-600/10 shadow-xl z-40 max-h-48 overflow-y-auto p-1">
                  {filteredRoles.map((role) => (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-600/5 hover:text-purple-600 rounded-lg transition-colors"
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6">
              <p className="text-xs font-extrabold text-gray-400 mb-3 uppercase tracking-widest">
                Popular Roles
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white border-transparent shadow-md shadow-purple-600/30'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column: Role Details */}
          <div className="p-10 border-r border-purple-600/5">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/10 to-pink-500/10 flex items-center justify-center shrink-0">
                <Building2 size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium leading-relaxed">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mt-0.5">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/40 transition-all">
              {selectedRole.ctaLabel}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Relevant Modules */}
          <div className="p-8 rounded-r-lg">
            <p className="text-xs font-extrabold uppercase tracking-widest bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
              Relevant Modules
            </p>

            <div className="flex flex-col gap-2.5">
              {selectedRole.relevantModules.map((module) => (
                <div
                  key={module.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-purple-600/5 border border-purple-600/10 hover:bg-purple-600/10 hover:border-purple-600/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/10 to-pink-500/10 flex items-center justify-center shrink-0">
                      <ModuleIcon name={module.name} size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {module.name}
                    </span>
                  </div>
                  {module.comingSoon && (
                    <span className="text-[10px] font-bold text-gray-400">Soon</span>
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