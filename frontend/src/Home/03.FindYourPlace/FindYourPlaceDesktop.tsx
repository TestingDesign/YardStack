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
  switch (name) {
    case 'Spotlight': return <MessageSquare size={size} style={{ color: '#7C3AED' }} />;
    case 'Directory': return <Users size={size} style={{ color: '#7C3AED' }} />;
    case 'Opportunities': return <Briefcase size={size} style={{ color: '#7C3AED' }} />;
    case 'Showcase': return <MonitorPlay size={size} style={{ color: '#7C3AED' }} />;
    case 'Polls & Surveys': return <BarChart2 size={size} style={{ color: '#7C3AED' }} />;
    case 'RED Expert': return <Mic size={size} style={{ color: '#7C3AED' }} />;
    case 'Learn': return <GraduationCap size={size} style={{ color: '#7C3AED' }} />;
    case 'City Inventory': return <Building2 size={size} style={{ color: '#7C3AED' }} />;
    default: return <PlayCircle size={size} style={{ color: '#7C3AED' }} />;
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
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F7FC 50%, #FFFFFF 100%)',
        fontFamily: "'Outfit', sans-serif",
        padding: '80px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <p className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}>
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '2.6rem',
          fontWeight: 800,
          color: '#1A1A2E',
          lineHeight: 1.12,
          marginBottom: '16px',
          letterSpacing: '-0.03em',
        }}>
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p className="ys-fade-in-up" style={{
          textAlign: 'center',
          fontSize: '1rem',
          color: '#6B7280',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: 1.65,
          fontWeight: 500,
        }}>
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div className="ys-fade-in-up" style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 260px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '8px',
          border: '1px solid rgba(124,58,237,0.08)',
          boxShadow: '0 16px 48px rgba(124,58,237,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        }}>
          <div style={{ padding: '32px 24px', borderRight: '1px solid rgba(124,58,237,0.06)' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '12px' }}>
              {FIND_YOUR_PLACE_CONTENT.inputPrefix}
            </p>

            <div style={{ position: 'relative', zIndex: 30 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 14px',
                  borderRadius: '8px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  outline: 'none',
                  background: '#FFFFFF',
                  fontFamily: "'Outfit', sans-serif",
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocusCapture={(e) => {
                  e.currentTarget.style.borderColor = '#7C3AED';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Search size={16} style={{ color: '#9CA3AF' }} />
              </div>

              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(124,58,237,0.1)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                  zIndex: 40,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  listStyle: 'none',
                  margin: 0,
                  padding: '6px',
                }}>
                  {filteredRoles.map((role) => (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 14px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#374151',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: "'Outfit', sans-serif",
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; e.currentTarget.style.color = '#7C3AED'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Popular Roles
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {POPULAR_ROLES.map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isSelected ? 'none' : '1.5px solid #E5E7EB',
                        background: isSelected
                          ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                          : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#4B5563',
                        boxShadow: isSelected ? '0 4px 12px rgba(124,58,237,0.3)' : 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = '#C4B5FD'; e.currentTarget.style.color = '#7C3AED'; }}}
                      onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#4B5563'; }}}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ padding: '40px 32px', borderRight: '1px solid rgba(124,58,237,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.08))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Building2 size={24} style={{ color: '#7C3AED' }} />
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#1A1A2E',
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedRole.helpPoints.map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: '#4B5563' }}>
                  <div style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}>
                    <Check size={12} strokeWidth={3} style={{ color: '#FFFFFF' }} />
                  </div>
                  <span style={{ fontWeight: 500, lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '32px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.3)'; }}
            >
              {selectedRole.ctaLabel}
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ padding: '32px 24px', borderRadius: '0 24px 24px 0' }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 16px',
            }}>
              Relevant Modules
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedRole.relevantModules.map((module) => (
                <div
                  key={module.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: 'rgba(124,58,237,0.03)',
                    border: '1px solid rgba(124,58,237,0.08)',
                    transition: 'background 0.2s, border-color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.03)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.08)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ModuleIcon name={module.name} size={16} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>{module.name}</span>
                  </div>
                  {module.comingSoon && (
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#9CA3AF' }}>Soon</span>
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