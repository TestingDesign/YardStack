export interface FinalCtaContent {
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  footerTagline: string;
}

export const FINAL_CTA_CONTENT: FinalCtaContent = {
  heading: "Join Hyderabad's Real Estate Ecosystem",
  description: 'Learn from experts. Connect with professionals. Discover opportunities. Grow with the ecosystem.',
  primaryCta: 'Join N4RE Today',
  secondaryCta: 'Create Your Profile',
  footerTagline: 'Content • Connections • Conversations',
};

export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'About Us', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'YouTube', icon: 'youtube', href: '#' },
];

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} N4RE. All rights reserved.`;