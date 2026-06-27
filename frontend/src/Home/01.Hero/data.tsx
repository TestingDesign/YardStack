export const HERO_CONTENT = {
  tagline: 'Network 4 Real Estate(N4RE)',
  headline: <>Connecting Hyderabad's Real Estate Ecosystem</>,
  subHeading: <>A dedicated platform for professionals, businesses and service providers who power Hyderabad's real estate market.</>,
  primaryCta: 'Join N4RE',
  secondaryCta: 'Explore Ecosystem',
  supportingTextBold: <>Built for Hyderabad.</>,
  supportingText: 'Designed for Real Estate Professionals.',
}

export interface EcosystemCategory {
  label: string
  icon: string
  description?: string
  position: { top: string; left: string }
  size: 'sm' | 'md' | 'lg'
}

export const ECOSYSTEM_CATEGORIES: EcosystemCategory[] = [
  {
    label: 'Builders\n& Developers',
    icon: 'building',
    position: { top: '-5%', left: '50%' },
    size: 'lg',
  },
  {
    label: 'Channel Partners\n& Agents',
    icon: 'users',
    position: { top: '25%', left: '90%' },
    size: 'md',
  },
  {
    label: 'Vendors &\nService Providers',
    icon: 'briefcase',
    position: { top: '65%', left: '95%' },
    size: 'sm',
  },
  {
    label: 'Bankers &\nFinancial Experts',
    icon: 'bank',
    position: { top: '95%', left: '70%' },
    size: 'sm',
  },
  {
    label: 'Influencers &\nTrainers',
    icon: 'graduation',
    position: { top: '95%', left: '30%' },
    size: 'md',
  },
  {
    label: 'Marketing\nAgencies',
    icon: 'megaphone',
    position: { top: '65%', left: '5%' },
    size: 'md',
  },
  {
    label: 'Employees &\nProfessionals',
    icon: 'person',
    position: { top: '25%', left: '10%' },
    size: 'md',
  },
]
