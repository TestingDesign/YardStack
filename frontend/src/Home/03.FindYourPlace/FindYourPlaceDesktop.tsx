import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Check,
  Building2,
  Sparkles,
  Target
} from 'lucide-react';
import { FIND_YOUR_PLACE_CONTENT, ROLES, POPULAR_ROLES, type RoleInfo } from './data';
import BG from './BG.png';

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
      className="relative bg-[var(--color-bg-muted)] overflow-hidden selection:bg-purple-200 selection:text-purple-900 py-10 lg:py-16"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-10 lg:mb-12 text-center">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-fuchsia-600 mb-3">
            <Sparkles size={14} className="text-purple-600" />
            {FIND_YOUR_PLACE_CONTENT.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-[44px] leading-[1.15] font-extrabold text-[var(--color-text-primary)] max-w-3xl tracking-tight mb-4">
            {FIND_YOUR_PLACE_CONTENT.heading}
          </h2>
          <p className="text-lg font-medium text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            {FIND_YOUR_PLACE_CONTENT.description}
          </p>
        </div>

        {/* Added items-stretch so both columns are always the exact same height */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] items-stretch bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Made left column flex flex-col h-full to align items properly top-to-bottom */}
          <div className="flex flex-col h-full p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-purple-600" />
              <p className="text-sm font-extrabold text-[var(--color-text-primary)] uppercase tracking-wide">
                {FIND_YOUR_PLACE_CONTENT.inputPrefix}
              </p>
            </div>

            <div className="relative z-30 mb-6" ref={dropdownRef}>
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-[var(--color-border-default)]/80 text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none bg-white hover:border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-600/5 transition-all shadow-sm"
                />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-40 max-h-[200px] overflow-y-auto p-1.5">
                  <ul className="flex flex-col gap-1">
                    {filteredRoles.map((role) => (
                      <li key={role.key}>
                        <button
                          type="button"
                          onClick={() => handleRoleSelect(role)}
                          className="w-full text-left px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          {role.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-auto pt-2">
              <p className="text-[11px] font-black text-[var(--color-text-muted)] mb-3 uppercase tracking-[0.15em]">
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-300 ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25 scale-[1.02]'
                          : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50/50 hover:shadow-sm'
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Made right column flex flex-col justify-center h-full to perfectly center the content vertically */}
          <div className="flex flex-col justify-center h-full p-6 lg:p-10 relative overflow-hidden bg-white">
            <div className="absolute bottom-0 right-0 w-[55%] h-[90%] pointer-events-none z-0">
              <img src={BG} alt="City Background" className="w-full h-full object-contain object-right-bottom" draggable={false} />
            </div>
            
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-bl-full -z-10 pointer-events-none opacity-50" />
            
            <div className="relative z-10 w-full lg:w-[65%]">
              <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50 shadow-inner">
                <Building2 size={24} className="text-purple-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-[26px] font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight">
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul className="flex flex-col gap-3">
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                    <Check size={12} strokeWidth={2.5} className="text-purple-700" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button className="group inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-800 to-purple-600 text-white text-sm font-bold shadow-lg shadow-purple-800/25 hover:shadow-xl hover:shadow-purple-800/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] w-fit">
              {selectedRole.ctaLabel}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}