import { 
  Camera, 
  CreditCard, 
  Building2, 
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';

export interface VerificationMethod {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
  bgFrom: string;
  bgTo: string;
  borderColor: string;
  glowColor: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const TRUST_CONTENT = {
  tagline: "TRUST IS OUR FOUNDATION",
  headingPart1: "Do business with",
  headingHighlight1: "real people",
  headingConnector: "and",
  headingHighlight2: "real business.",
  description: "N4RE is a verified network of professionals and businesses across the real estate ecosystem.",
  calloutTitle: "Multi-layered. Optional Verification.",
  calloutDescription: "You choose how you verify. Every verified layer helps you build trust and unlock more opportunities.",
  shieldText: "N4RE VERIFIED",
  bottomTagline: "Your verification. Your choice. More confidence in every connection.",
};

export const VERIFICATION_METHODS: VerificationMethod[] = [
  {
    id: 'selfie',
    icon: Camera,
    label: 'Live Selfie',
    description: 'Verify your real identity',
    color: '#6B21A8',
    bgFrom: '#F3E8FF',
    bgTo: '#EDE9FE',
    borderColor: '#D8B4FE',
    glowColor: 'rgba(107,33,168,0.15)',
    position: 'top-left',
  },
  {
    id: 'aadhaar',
    icon: ShieldCheck,
    label: 'Aadhaar',
    description: 'Verify with Aadhaar',
    color: '#0369A1',
    bgFrom: '#E0F2FE',
    bgTo: '#BAE6FD',
    borderColor: '#7DD3FC',
    glowColor: 'rgba(3,105,161,0.15)',
    position: 'top-right',
  },
  {
    id: 'pan',
    icon: CreditCard,
    label: 'PAN',
    description: 'Verify your identity',
    color: '#059669',
    bgFrom: '#D1FAE5',
    bgTo: '#A7F3D0',
    borderColor: '#6EE7B7',
    glowColor: 'rgba(5,150,105,0.15)',
    position: 'bottom-left',
  },
  {
    id: 'business',
    icon: Building2,
    label: 'Business',
    description: 'Verify your business details',
    color: '#D97706',
    bgFrom: '#FEF3C7',
    bgTo: '#FDE68A',
    borderColor: '#FCD34D',
    glowColor: 'rgba(217,119,6,0.15)',
    position: 'bottom-right',
  },
];
