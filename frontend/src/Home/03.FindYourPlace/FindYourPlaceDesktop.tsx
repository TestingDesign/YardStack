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
    case 'Spotlight': return <MessageSquare size={size} style={{ color: '#6B21A8' }} />;
    case 'Directory': return <Users size={size} style={{ color: '#6B21A8' }} />;
    case 'Opportunities': return <Briefcase size={size} style={{ color: '#6B21A8' }} />;
    case 'Showcase': return <MonitorPlay size={size} style={{ color: '#6B21A8' }} />;
    case 'Polls & Surveys': return <BarChart2 size={size} style={{ color: '#6B21A8' }} />;
    case 'RED Expert': return <Mic size={size} style={{ color: '#6B21A8' }} />;
    case 'Learn': return <GraduationCap size={size} style={{ color: '#6B21A8' }} />;
    case 'City Inventory': return <Building2 size={size} style={{ color: '#6B21A8' }} />;
    default: return <PlayCircle size={size} style={{ color: '#6B21A8' }} />;
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
      style={{ background: '#FFFFFF', fontFamily: "'Outfit', sans-serif", padding: '80px 0' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          marginBottom: '16px',
        }}>
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 style={{
          textAlign: 'center',
          fontSize: '2.6rem',
          fontWeight: 800,
          color: '#1A1A2E',
          lineHeight: 1.12,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '1rem',
          color: '#6B7280',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: 1.65,
        }}>
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 260px',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(107,33,168,0.06)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.04), 0 4px 12px rgba(107,33,168,0.02)',
          overflow: 'visible',
        }}>
          <div style={{ padding: '32px 24px', borderRight: '1px solid #F3F4F6' }}>
            <p style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#374151',
              marginBottom: '12px',
            }}>
              {FIND_YOUR_PLACE_CONTENT.inputPrefix}
            </p>

            <div style={{ position: 'relative', zIndex: 30 }}>
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
                  paddingLeft: '16px',
                  paddingRight: '36px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  outline: 'none',
                  background: '#FFFFFF',
                  fontFamily: "'Outfit', sans-serif",
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
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
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
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
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {role.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#6B7280',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
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
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid #6B21A8' : '1px solid #E5E7EB',
                        background: isSelected ? '#6B21A8' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#4B5563',
                        boxShadow: isSelected ? '0 2px 8px rgba(107,33,168,0.25)' : 'none',
                        transition: 'all 0.2s ease',
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#D1D5DB';
                          e.currentTarget.style.color = '#374151';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.color = '#4B5563';
                        }
                      }}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ padding: '40px 32px', borderRight: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Building2 size={24} style={{ color: '#6B21A8' }} />
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#1A1A2E',
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}>
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedRole.helpPoints.map((point) => (
                <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: '#4B5563' }}>
                  <Check size={18} strokeWidth={3} style={{ flexShrink: 0, marginTop: '3px', color: '#6B21A8' }} />
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
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1.5px solid rgba(107,33,168,0.3)',
                color: '#6B21A8',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FDFBFF';
                e.currentTarget.style.borderColor = '#6B21A8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(107,33,168,0.3)';
              }}
            >
              {selectedRole.ctaLabel}
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ padding: '32px 24px', background: '#FFFFFF', borderRadius: '0 24px 24px 0' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#6B21A8',
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
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#F5F3FF',
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
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
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