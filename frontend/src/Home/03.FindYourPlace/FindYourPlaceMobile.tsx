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
      style={{ background: '#FFFFFF', fontFamily: "'Outfit', sans-serif", padding: '40px 0 60px' }}
    >
      <div style={{ padding: '0 16px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6B21A8',
          marginBottom: '12px',
        }}>
          {FIND_YOUR_PLACE_CONTENT.sectionLabel}
        </p>

        <h2 style={{
          textAlign: 'center',
          fontSize: '1.85rem',
          fontWeight: 800,
          color: '#1A1A2E',
          lineHeight: 1.14,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          {FIND_YOUR_PLACE_CONTENT.heading}
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#6B7280',
          marginBottom: '32px',
          lineHeight: 1.6,
          maxWidth: '320px',
          margin: '0 auto 32px',
          fontWeight: 500,
        }}>
          {FIND_YOUR_PLACE_CONTENT.description}
        </p>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid rgba(107,33,168,0.06)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151', margin: '0 0 10px' }}>
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
                  paddingLeft: '14px',
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
                }}
              />
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Search size={16} style={{ color: '#9CA3AF' }} />
              </div>
              
              {isDropdownOpen && filteredRoles.length > 0 && (
                <ul style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  right: 0,
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
                  zIndex: 40,
                  maxHeight: '160px',
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
                          padding: '10px 12px',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#374151',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {POPULAR_ROLES.slice(0, 8).map((role) => {
                  const isSelected = selectedRole.key === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: isSelected ? '1px solid #6B21A8' : '1px solid #E5E7EB',
                        background: isSelected ? '#6B21A8' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#4B5563',
                        boxShadow: isSelected ? '0 2px 8px rgba(107,33,168,0.25)' : 'none',
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#1A1A2E',
                margin: 0,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}>
                {selectedRole.helpTitle}
              </h3>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedRole.helpPoints.map((point) => (
                <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#4B5563' }}>
                  <Check size={16} strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px', color: '#6B21A8' }} />
                  <span style={{ fontWeight: 500, lineHeight: 1.5 }}>{point}</span>
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
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1.5px solid rgba(107,33,168,0.3)',
                color: '#6B21A8',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {selectedRole.ctaLabel}
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#6B21A8',
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
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#F5F3FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ModuleIcon name={module.name} size={14} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A2E' }}>{module.name}</span>
                  </div>
                  {module.comingSoon && (
                    <span style={{ fontSize: '9px', fontWeight: 600, color: '#9CA3AF', whiteSpace: 'nowrap' }}>
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