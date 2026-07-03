export interface SpotlightLinkData {
  title: string
  subtitle: string
  detail1?: string
  detail2?: string
  url: string
  actionText?: string
  iconType?: 'job' | 'post' | 'opportunity' | 'property-buy' | 'property-lease' | 'interior-design'
}

export const SPOTLIGHT_LINKS: Record<string, SpotlightLinkData> = {
  seniorAgent: {
    title: 'Senior Real Estate Agent',
    subtitle: 'ABC Realty',
    detail1: 'Remote',
    detail2: '$80k - $120k',
    url: '#',
    actionText: 'Apply',
    iconType: 'job'
  },
  luxuryVilla: {
    title: 'Luxury Villa - 4BHK',
    subtitle: 'Prime Infra',
    detail1: '$1.2M',
    detail2: 'Los Angeles, CA',
    url: '#',
    actionText: 'Buy Now',
    iconType: 'property-buy'
  },
  commercialOffice: {
    title: 'Commercial Office Space',
    subtitle: 'City Spaces',
    detail1: 'Bangalore',
    detail2: 'Lease: $5k/mo',
    url: '#',
    actionText: 'Lease',
    iconType: 'property-lease'
  },
  minimalistInteriors: {
    title: 'Modern Minimalist Interiors',
    subtitle: 'Studio V',
    detail1: 'Consultation',
    url: '#',
    actionText: 'Book',
    iconType: 'interior-design'
  }
};
