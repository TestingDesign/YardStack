import { useState, useCallback } from 'react';
import { NAV_LINKS, NAV_CTAS } from './data';

interface HomeNavDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeNavDesktop({ viewMode }: HomeNavDesktopProps) {
  const [activeLink, setActiveLink] = useState('home');

  const handleNavClick = useCallback((key: string, href: string) => {
    setActiveLink(key);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(107,33,168,0.08)',
      fontFamily: "'Outfit', sans-serif",
      boxShadow: '0 1px 24px rgba(26,26,46,0.04)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '68px',
        padding: '0 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>
        <a
          href="#hero"
          onClick={() => setActiveLink('home')}
          style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', marginRight: '40px', textDecoration: 'none' }}
        >
          <span style={{
            fontSize: '1.7rem',
            fontWeight: 800,
            color: '#1A1A2E',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            N<span style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4</span>RE
          </span>
          <span style={{ fontSize: '7px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.1em', marginTop: '2px' }}>
            Content • Connections • Conversations
          </span>
        </a>

        <nav aria-label="Main Navigation" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.key, link.href)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: activeLink === link.key ? 'rgba(124,58,237,0.08)' : 'transparent',
                    color: activeLink === link.key ? '#7C3AED' : '#374151',
                    fontFamily: "'Outfit', sans-serif",
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeLink !== link.key) {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.05)';
                      e.currentTarget.style.color = '#7C3AED';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.key) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {NAV_CTAS.map((cta) => (
            <a
              key={cta.label}
              href={`/${viewMode}${cta.href}`}
              style={{
                padding: cta.variant === 'primary' ? '10px 24px' : '9px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                ...(cta.variant === 'primary'
                  ? {
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
                  }
                  : {
                    background: 'transparent',
                    color: '#374151',
                    border: '1.5px solid #E5E7EB',
                  }
                ),
              }}
              onMouseEnter={(e) => {
                if (cta.variant === 'primary') {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,58,237,0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                } else {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                  e.currentTarget.style.color = '#7C3AED';
                }
              }}
              onMouseLeave={(e) => {
                if (cta.variant === 'primary') {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                } else {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}