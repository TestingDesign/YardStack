import { Briefcase, Users, Handshake, Megaphone, Building2, Landmark, Monitor, Palette } from 'lucide-react';

export interface PreviewSection {
  key: string;
  title: string;
  description: string;
  badge: string;
}

export const PREVIEW_TABS: PreviewSection[] = [
  {
    key: 'spotlight',
    title: 'Spotlight',
    description: 'Bite-sized, high-impact video content driving market trends.',
    badge: 'Video Feed',
  },
  {
    key: 'red-expert',
    title: 'RED Expert',
    description: 'Connect with verified industry leaders and seasoned professionals.',
    badge: 'Network',
  },
  {
    key: 'opportunities',
    title: 'Opportunities',
    description: 'Live requirements, vendor matching, and B2B lead generation.',
    badge: 'Marketplace',
  },
  {
    key: 'directory',
    title: 'Directory',
    description: 'A comprehensive database of all real estate stakeholders.',
    badge: 'Database',
  },
];

export const MOCK_DATA = {
  spotlight: [
    { title: 'Hyderabad Market Trends Q3', views: '12.4k', gradient: 'from-purple-600 to-blue-600', duration: '2:15' },
    { title: 'Lead Generation Masterclass', views: '8.1k', gradient: 'from-rose-500 to-orange-500', duration: '4:30' },
    { title: 'Commercial Real Estate Outlook', views: '15.2k', gradient: 'from-emerald-500 to-teal-600', duration: '3:45' },
    { title: 'NRI Investment Guide', views: '9.3k', gradient: 'from-blue-500 to-cyan-500', duration: '5:10' },
    { title: 'PropTech Innovations 2024', views: '11.2k', gradient: 'from-indigo-500 to-purple-600', duration: '3:20' },
    { title: 'Understanding RERA Guidelines', views: '6.5k', gradient: 'from-amber-500 to-orange-600', duration: '6:15' },
    { title: 'Top 10 Emerging Markets', views: '18.7k', gradient: 'from-pink-500 to-rose-600', duration: '4:45' },
    { title: 'Luxury Housing Demand', views: '7.9k', gradient: 'from-teal-500 to-emerald-600', duration: '2:50' },
  ],
  spotlightReels: [
    {
      tag: 'PROPERTY TOUR',
      tagColor: 'bg-purple-600 text-white',
      title: 'Grade A Office in Gachibowli',
      subtitle: 'Hyderabad',
      subtitleIcon: 'map-pin',
      views: '1.2K',
      text: 'A premium workspace in the heart of growth.',
      bgImage: '/images/spotlight/spotlight_office_exterior_1782618730061.png',
      showSideIcons: false
    },
    {
      tag: 'FRANCHISE',
      tagColor: 'bg-orange-600 text-white',
      title: 'Cafe Business Opportunity',
      subtitle: 'Low Investment',
      subtitleIcon: 'briefcase',
      views: '2.8K',
      text: 'Be your own boss. Start your journey with the right brand.',
      bgImage: '/images/spotlight/spotlight_cafe_owner_1782618747418.png',
      showSideIcons: false
    },
    {
      tag: '',
      tagColor: '',
      title: 'Retail Leasing Trends 2024',
      subtitle: 'What tenants should know',
      subtitleIcon: '',
      views: '3.6K',
      text: 'Key trends shaping high street retail.',
      bgImage: '/images/spotlight/spotlight_speaker_1_1782618759889.png',
      showSideIcons: true
    },
    {
      tag: 'BROKER INSIGHT',
      tagColor: 'bg-emerald-600 text-white',
      title: 'Market Update Mumbai',
      subtitle: 'Q2 Commercial Outlook',
      subtitleIcon: '',
      views: '1.7K',
      text: 'Office demand is shifting to new hubs.',
      bgImage: '/images/spotlight/spotlight_speaker_2_1782618769595.png',
      showSideIcons: false
    },
    {
      tag: 'EDUCATION',
      tagColor: 'bg-purple-600 text-white',
      title: 'How Commercial Leasing Works',
      subtitle: 'A quick guide for businesses',
      subtitleIcon: '',
      views: '1.9K',
      text: 'Understand terms, structure & key considerations.',
      bgImage: '/images/spotlight/spotlight_office_interior_1782618779165.png',
      showSideIcons: false
    }
  ],
  redExpert: [
    { title: 'Mastering Real Estate Sales', author: 'Arjun Reddy', bgImage: '/images/red-expert/red_expert_sales_1782619586183.png', duration: '12:45' },
    { title: 'Negotiation Tactics 2024', author: 'Meera Menon', bgImage: '/images/red-expert/red_expert_negotiation_1782619595642.png', duration: '08:20' },
    { title: 'Building Trust with Clients', author: 'Siddharth Rao', bgImage: '/images/red-expert/red_expert_trust_1782619607852.png', duration: '15:10' },
    { title: 'Effective Digital Marketing', author: 'Priya Sharma', bgImage: '/images/red-expert/red_expert_marketing_1782619620147.png', duration: '10:05' },
    { title: 'Legal Pitfalls to Avoid', author: 'Rahul Verma', bgImage: '/images/red-expert/red_expert_legal_1782619629904.png', duration: '14:30' },
  ],
  opportunities: [
    { title: 'Looking for CRM Vendor', company: 'Apex Developments', location: 'Hyderabad', budget: '₹5L - ₹10L', type: 'Full-Time' },
    { title: 'Hiring Sales Manager', company: 'Zenith Strategies', location: 'Bangalore', budget: '₹12L - ₹15L PA', type: 'Contract' },
    { title: 'Seeking Channel Partners', company: 'Elite Estates', location: 'Remote', budget: 'Commission Based', type: 'Partnership' },
    { title: 'Marketing Agency Requirement', company: 'Verma Associates', location: 'Mumbai', budget: '₹2L / month', type: 'Project' },
    { title: 'Architectural Designer Needed', company: 'Space Crafters', location: 'Pune', budget: '₹8L - ₹12L PA', type: 'Full-Time' },
    { title: 'Property Management App', company: 'TechNova', location: 'Chennai', budget: '₹15L - ₹20L', type: 'Technology' },
    { title: 'Freelance Content Writer', company: 'RealTrends', location: 'Remote', budget: '₹30k / month', type: 'Freelance' },
    { title: 'Legal Advisor on Retainer', company: 'BuildCorp', location: 'Delhi', budget: '₹1L / month', type: 'Contract' },
  ],
  directory: [
    { title: 'Builders', count: '1,200+', icon: Building2, color: 'text-purple-500' },
    { title: 'Channel Partners', count: '5,500+', icon: Users, color: 'text-blue-500' },
    { title: 'Bankers', count: '300+', icon: Landmark, color: 'text-emerald-500' },
    { title: 'Agencies', count: '450+', icon: Megaphone, color: 'text-rose-500' },
    { title: 'Tech Providers', count: '150+', icon: Monitor, color: 'text-cyan-500' },
    { title: 'Designers', count: '800+', icon: Palette, color: 'text-orange-500' },
    { title: 'Legal Consultants', count: '250+', icon: Briefcase, color: 'text-indigo-500' },
    { title: 'Investors', count: '1,000+', icon: Handshake, color: 'text-pink-500' },
  ],
};
