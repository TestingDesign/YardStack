export interface NavLink {
  key: string
  label: string
  href: string
}

export interface NavCta {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

export const NAV_LINKS: NavLink[] = [
  { key: 'home', label: 'Home', href: '#hero' },
  { key: 'spotlight', label: 'Spotlight', href: '#pillars' },
  { key: 'red-expert', label: 'RED Expert', href: '#pillars' },
  { key: 'opportunities', label: 'Opportunities', href: '#pillars' },
  { key: 'directory', label: 'Directory', href: '#pillars' },
  { key: 'about', label: 'About Us', href: '#final-cta' },
]

export const NAV_CTAS: NavCta[] = [
  { label: 'Login', href: '/login', variant: 'secondary' },
  { label: 'Join N4RE', href: '/create-account', variant: 'primary' },
]
