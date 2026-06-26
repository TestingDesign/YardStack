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

const ModuleIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Spotlight': return <MessageSquare size={14} style={{ color: '#6B21A8' }} />;
    case 'Directory': return <Users size={14} style={{ color: '#6B21A8' }} />;
    case 'Opportunities': return <Briefcase size={14} style={{ color: '#6B21A8' }} />;
    case 'Showcase': return <MonitorPlay size={14} style={{ color: '#6B21A8' }} />;
    case 'Polls & Surveys': return <BarChart2 size={14} style={{ color: '#6B21A8' }} />;
    case 'RED Expert': return <Mic size={14} style={{ color: '#6B21A8' }} />;
    case 'Learn': return <GraduationCap size={14} style={{ color: '#6B21A8' }} />;
    case 'City Inventory': return <Building2 size={14} style={{ color: '#6B21A8' }} />;
    default: return <PlayCircle size={14} style={{ color: '#6B21A8' }} />;
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
      style={{ background: '#F9FAFB', fontFamily: "'Outfit', sans-serif", padding: '64px 0' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          marginBottom: '10px',
        }}>
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 800,
          color: '#1A1A2E',
          lineHeight: 1.2,
          marginBottom: '10px',
        }}>
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#6B7280',
          maxWidth: '560px',
          margin: '0 auto 36px',
          lineHeight: 1.6,
        }}>
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 220px',
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #ECEAF5',
          boxShadow: '0 10px 40px rgba(26,26,46,0.07)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '24px 20px', borderRight: '1px solid #F0EEF7' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#374151',
              marginBottom: '10px',
            }}>
              {FIND_YOUR_PLACE_CONTENT.inputPrefix}
            </p>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Search size={14} style={{ color: '#9CA3AF' }} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={FIND_YOUR_PLACE_CONTENT.placeholder}
                style={{
                  width: '100%',
                  paddingLeft: '32px',
                  paddingRight: '12px',
                  paddingTop: '9px',
                  paddingBottom: '9px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#374151',
                  outline: 'none',
                  background: '#FFFFFF',
                  fontFamily: "'Outfit', sans-serif",
                  boxSizing: 'border-box',
                }}
              />
              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 10px 24px rgba(26,26,46,0.1)',
                  zIndex: 20,
                  maxHeight: '180px',
                  overflowY: 'auto',
                  listStyle: 'none',
                  margin: 0,
                  padding: '4px',
                }}>
                  {filteredRoles.map((role) => (
                    <li key={role.key}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 12px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#334155',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Popular Roles
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {POPULAR_ROLES.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: selectedRole.key === role.key ? '1px solid #6B21A8' : '1px solid #E5E7EB',
                      background: selectedRole.key === role.key ? '#6B21A8' : '#FFFFFF',
                      color: selectedRole.key === role.key ? '#FFFFFF' : '#334155',
                      boxShadow: selectedRole.key === role.key ? '0 2px 8px rgba(107,33,168,0.2)' : 'none',
                      transition: 'all 0.15s ease',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '24px 28px', borderRight: '1px solid #F0EEF7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Building2 size={20} style={{ color: '#6B21A8' }} />
              </div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1A1A2E',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedRole.helpPoints.map((point) => (
                <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#475569' }}>
                  <Check size={16} strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px', color: '#6B21A8' }} />
                  <span style={{ fontWeight: 500, lineHeight: 1.5 }}>{point}</span>
                </li>
              ))}
            </ul>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                padding: '9px 18px',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#6B21A8',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.15s ease',
              }}
            >
              {selectedRole.ctaLabel}
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ padding: '24px 20px', background: '#FAFAF9' }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#9CA3AF',
              margin: '0 0 12px',
            }}>
              Relevant Modules
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedRole.relevantModules.map((module) => (
                <div
                  key={module.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid #EEEAF8',
                    boxShadow: '0 1px 4px rgba(26,26,46,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(107,33,168,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ModuleIcon name={module.name} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{module.name}</span>
                  </div>
                  {module.comingSoon && (
                    <span style={{ fontSize: '9px', fontWeight: 500, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
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