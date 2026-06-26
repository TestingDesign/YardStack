import { Monitor, Building2, ClipboardList, GraduationCap, Clock } from 'lucide-react'

interface LaunchingItem {
  key: string
  icon: React.ReactNode
  title: string
  description: string
}

const LAUNCHING_ITEMS: LaunchingItem[] = [
  {
    key: 'showcase',
    icon: <Monitor size={44} strokeWidth={1.5} style={{ color: '#6B21A8' }} />,
    title: 'Showcase',
    description: 'Highlight your projects, wins, and impact in one centralized space.',
  },
  {
    key: 'city-inventory',
    icon: <Building2 size={44} strokeWidth={1.5} style={{ color: '#6B21A8' }} />,
    title: 'City Inventory',
    description: 'View and manage detailed information about cities and communities.',
  },
  {
    key: 'survey-pools',
    icon: <ClipboardList size={44} strokeWidth={1.5} style={{ color: '#6B21A8' }} />,
    title: 'Survey Pools',
    description: 'Access and contribute to a variety of surveys and polls.',
  },
  {
    key: 'lms',
    icon: <GraduationCap size={44} strokeWidth={1.5} style={{ color: '#6B21A8' }} />,
    title: 'LMS',
    description: 'Access learning resources and build your skills on your schedule.',
  },
]

function LaunchingCard({ item }: { item: LaunchingItem }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid #EDEBF8',
        borderRadius: '16px',
        padding: '24px',
        gap: '0',
        position: 'relative',
        fontFamily: "'Outfit', sans-serif",
        boxShadow: '0 2px 12px rgba(107, 33, 168, 0.04)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(107, 33, 168, 0.10)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(107, 33, 168, 0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '5px 14px',
          borderRadius: '999px',
          background: 'rgba(107, 33, 168, 0.08)',
          color: '#6B21A8',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '24px',
          letterSpacing: '0.01em',
        }}
      >
        Coming Soon
      </span>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flex: 1 }}>
        <div style={{ flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#1A1A2E',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {item.description}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #F0EDF8',
          color: '#6B21A8',
        }}
      >
        <Clock size={16} strokeWidth={2} style={{ color: '#6B21A8', flexShrink: 0 }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Launching Soon</span>
      </div>
    </div>
  )
}

export default function LaunchingSoon() {
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        background: '#F8F7FC',
        overflowY: 'auto',
        padding: '32px 28px',
        fontFamily: "'Outfit', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '900px' }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#1A1A2E',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}
        >
          Launching Soon
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: '0 0 32px',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          A preview of the tools and features we&apos;re building to enhance your RED experience.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {LAUNCHING_ITEMS.map((item) => (
            <LaunchingCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
