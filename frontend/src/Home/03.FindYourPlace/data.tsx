export const FIND_YOUR_PLACE_CONTENT = {
  sectionLabel: 'FIND YOUR PLACE IN N4RE',
  heading: 'How Can N4RE Help You?',
  description: 'Select your role and discover how N4RE can help you learn, connect and grow.',
  placeholder: 'Search your role...',
  inputPrefix: 'I am a',
};

export interface RoleModule {
  name: string;
  comingSoon?: boolean;
}

export interface DetailPoint {
  icon: string;
  title: string;
  description: string;
}

export interface RoleInfo {
  key: string;
  label: string;
  roleIcon: string;
  isPopular?: boolean;
  description: string;
  ctaLabel: string;
  offerPoints: DetailPoint[];
  getPoints: DetailPoint[];
  relevantModules: RoleModule[];
}

export const ROLES: RoleInfo[] = [
  {
    key: 'builder',
    label: 'Builder / Developer',
    roleIcon: 'Building2',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Builder / Developer',
    offerPoints: [
      { icon: 'Building', title: 'Publish Projects & Inventory', description: 'Promote launches and inventory through dedicated business pages and engaging video content.' },
      { icon: 'Briefcase', title: 'Post Jobs & Business Requirements', description: 'Invite agencies, consultants and vendors to respond to your hiring and business needs.' },
      { icon: 'Video', title: 'Share Project Videos', description: 'Build confidence through construction updates, walkthroughs and expert conversations.' },
      { icon: 'BarChart2', title: 'Run Polls & Surveys', description: 'Validate pricing, amenities and market sentiment before making key decisions.' },
      { icon: 'Users', title: 'Build Partnerships', description: 'Collaborate with channel partners, PropTech companies and ecosystem businesses.' },
    ],
    getPoints: [
      { icon: 'ShieldCheck', title: 'Hire Verified Vendors', description: 'Discover trusted agencies, consultants and technology providers.' },
      { icon: 'FileText', title: 'Receive Business Proposals', description: 'Receive relevant proposals after publishing your requirements.' },
      { icon: 'MonitorPlay', title: 'Explore Product Demos', description: 'Compare products and services through demos and showcases.' },
      { icon: 'Lightbulb', title: 'Learn From Industry Experts', description: 'Stay updated with market insights and expert discussions.' },
      { icon: 'Compass', title: 'Discover Opportunities', description: 'Connect with partners and grow your business.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'Directory' },
      { name: 'Opportunities' },
      { name: 'Showcase', comingSoon: true },
      { name: 'Polls & Surveys', comingSoon: true },
    ],
  },
  {
    key: 'channel-partner',
    label: 'Channel Partner / Agent',
    roleIcon: 'Handshake',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Channel Partner',
    offerPoints: [
      { icon: 'Megaphone', title: 'Promote Projects', description: 'Publish inventory and locality highlights.' },
      { icon: 'Video', title: 'Create Video Content', description: 'Share walkthroughs and market updates.' },
      { icon: 'BookOpen', title: 'Share Market Knowledge', description: 'Educate customers and peers.' },
      { icon: 'Users', title: 'Build Partnerships', description: 'Collaborate with builders and service providers.' },
      { icon: 'UserPlus', title: 'Refer Services', description: 'Recommend trusted ecosystem partners.' },
    ],
    getPoints: [
      { icon: 'Building2', title: 'Access Builder Inventory', description: 'Discover new launches.' },
      { icon: 'ShieldCheck', title: 'Connect With Verified Builders', description: 'Build trusted relationships.' },
      { icon: 'Network', title: 'Generate Referrals', description: 'Find collaboration opportunities.' },
      { icon: 'GraduationCap', title: 'Learn Modern Sales', description: 'Consume expert content.' },
      { icon: 'Star', title: 'Build Your Brand', description: 'Grow visibility through content.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'Opportunities' },
      { name: 'Directory' },
      { name: 'City Inventory', comingSoon: true },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'marketing-professional',
    label: 'Marketing Professional',
    roleIcon: 'Megaphone',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Marketing Pro',
    offerPoints: [
      { icon: 'Palette', title: 'Showcase Campaigns', description: 'Display successful campaigns and measurable outcomes.' },
      { icon: 'Layout', title: 'Offer Marketing Services', description: 'Promote branding and campaign expertise.' },
      { icon: 'Lightbulb', title: 'Publish Insights', description: 'Educate the market through content.' },
      { icon: 'MonitorPlay', title: 'Host Webinars', description: 'Demonstrate expertise.' },
      { icon: 'Handshake', title: 'Build Partnerships', description: 'Collaborate with builders.' },
    ],
    getPoints: [
      { icon: 'Inbox', title: 'Marketing Requirements', description: 'Receive enquiries.' },
      { icon: 'Users', title: 'Connect With Decision Makers', description: 'Reach builders.' },
      { icon: 'TrendingUp', title: 'Generate Leads', description: 'Convert visibility into consulting.' },
      { icon: 'Award', title: 'Industry Recognition', description: 'Strengthen reputation.' },
      { icon: 'Clock', title: 'Stay Updated', description: 'Follow trends.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'Opportunities' },
      { name: 'Directory' },
      { name: 'Showcase', comingSoon: true },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'performance-marketer',
    label: 'Performance Marketer',
    roleIcon: 'TrendingUp',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Performance Marketer',
    offerPoints: [
      { icon: 'BarChart', title: 'Show Campaign Results', description: 'Publish ROI-driven case studies.' },
      { icon: 'Target', title: 'Offer Lead Generation', description: 'Promote paid marketing expertise.' },
      { icon: 'TrendingUp', title: 'Share Growth Strategies', description: 'Educate businesses.' },
      { icon: 'PieChart', title: 'Publish Analytics', description: 'Demonstrate measurable outcomes.' },
      { icon: 'MessageSquare', title: 'Consult Businesses', description: 'Offer growth consulting.' },
    ],
    getPoints: [
      { icon: 'Briefcase', title: 'Lead Generation Projects', description: 'Find businesses.' },
      { icon: 'Users', title: 'Agency Partnerships', description: 'Collaborate with agencies.' },
      { icon: 'Shield', title: 'Build Authority', description: 'Become known for results.' },
      { icon: 'Globe', title: 'Industry Exposure', description: 'Reach B2B audience.' },
      { icon: 'Repeat', title: 'Long-term Clients', description: 'Generate recurring work.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'Opportunities' },
      { name: 'Directory' },
      { name: 'Showcase', comingSoon: true },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'proptech-company',
    label: 'PropTech Company',
    roleIcon: 'Cpu',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as PropTech Company',
    offerPoints: [
      { icon: 'Laptop', title: 'Showcase Products', description: 'Present software solutions.' },
      { icon: 'Video', title: 'Publish Product Demos', description: 'Explain features via video.' },
      { icon: 'MonitorPlay', title: 'Host Webinars', description: 'Educate customers.' },
      { icon: 'Bell', title: 'Share Updates', description: 'Keep ecosystem informed.' },
      { icon: 'Code', title: 'Offer Technology', description: 'Position as trusted partner.' },
    ],
    getPoints: [
      { icon: 'Inbox', title: 'Qualified Enquiries', description: 'Reach builders.' },
      { icon: 'Handshake', title: 'Technology Partnerships', description: 'Collaborate.' },
      { icon: 'Eye', title: 'Product Awareness', description: 'Increase visibility.' },
      { icon: 'Award', title: 'Industry Credibility', description: 'Build trust.' },
      { icon: 'Zap', title: 'Adoption Opportunities', description: 'Drive implementations.' },
    ],
    relevantModules: [
      { name: 'Showcase', comingSoon: true },
      { name: 'Directory' },
      { name: 'Opportunities' },
      { name: 'Spotlight' },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'crm-provider',
    label: 'CRM / Software Provider',
    roleIcon: 'Database',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as CRM Provider',
    offerPoints: [
      { icon: 'Workflow', title: 'Demonstrate Workflows', description: 'Show operational improvements.' },
      { icon: 'Settings', title: 'Share Automation Guides', description: 'Educate businesses.' },
      { icon: 'Tool', title: 'Offer Implementation', description: 'Promote consulting.' },
      { icon: 'PlayCircle', title: 'Host Live Demos', description: 'Engage prospects.' },
      { icon: 'FileText', title: 'Publish Case Studies', description: 'Build confidence.' },
    ],
    getPoints: [
      { icon: 'Briefcase', title: 'Implementation Projects', description: 'Receive deployment work.' },
      { icon: 'Building', title: 'Builder Connections', description: 'Reach companies.' },
      { icon: 'Users', title: 'Agency Collaborations', description: 'Partner with firms.' },
      { icon: 'MessageCircle', title: 'Consulting Enquiries', description: 'Generate leads.' },
      { icon: 'Megaphone', title: 'Brand Awareness', description: 'Strengthen presence.' },
    ],
    relevantModules: [
      { name: 'Showcase', comingSoon: true },
      { name: 'Directory' },
      { name: 'Opportunities' },
      { name: 'Spotlight' },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'interior-designer',
    label: 'Interior Designer',
    roleIcon: 'Palette',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Interior Designer',
    offerPoints: [
      { icon: 'Image', title: 'Showcase Projects', description: 'Display completed work.' },
      { icon: 'Video', title: 'Publish Design Videos', description: 'Share walkthroughs.' },
      { icon: 'MessageSquare', title: 'Offer Consultations', description: 'Promote services.' },
      { icon: 'Building', title: 'Collaborate With Builders', description: 'Support launches.' },
      { icon: 'BookOpen', title: 'Share Design Knowledge', description: 'Build authority.' },
    ],
    getPoints: [
      { icon: 'Inbox', title: 'Interior Enquiries', description: 'Generate leads.' },
      { icon: 'Share2', title: 'Builder Referrals', description: 'Receive opportunities.' },
      { icon: 'Users', title: 'Vendor Network', description: 'Connect with suppliers.' },
      { icon: 'Eye', title: 'Professional Visibility', description: 'Grow your brand.' },
      { icon: 'Lightbulb', title: 'Industry Inspiration', description: 'Learn from peers.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'Directory' },
      { name: 'Opportunities' },
      { name: 'Showcase', comingSoon: true },
      { name: 'RED Expert' },
    ],
  },
  {
    key: 'banking-professional',
    label: 'Banking Professional / Loan DSA',
    roleIcon: 'Landmark',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Banking Pro',
    offerPoints: [
      { icon: 'CreditCard', title: 'Offer Loan Solutions', description: 'Promote financing services.' },
      { icon: 'DollarSign', title: 'Share Finance Tips', description: 'Educate buyers.' },
      { icon: 'Handshake', title: 'Partner With Builders', description: 'Build referral relationships.' },
      { icon: 'FileText', title: 'Publish EMI Guidance', description: 'Help customers.' },
      { icon: 'Video', title: 'Create Awareness Videos', description: 'Explain loan products.' },
    ],
    getPoints: [
      { icon: 'Inbox', title: 'Loan Referrals', description: 'Generate enquiries.' },
      { icon: 'Building', title: 'Builder Tie-ups', description: 'Expand network.' },
      { icon: 'Users', title: 'CP Collaborations', description: 'Work with agents.' },
      { icon: 'Shield', title: 'Professional Visibility', description: 'Build trust.' },
      { icon: 'TrendingUp', title: 'Industry Insights', description: 'Stay updated.' },
    ],
    relevantModules: [
      { name: 'Directory' },
      { name: 'Opportunities' },
      { name: 'RED Expert' },
      { name: 'Spotlight' },
      { name: 'City Inventory', comingSoon: true },
    ],
  },
  {
    key: 're-influencer',
    label: 'RE Influencer',
    roleIcon: 'Star',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Influencer',
    offerPoints: [
      { icon: 'Video', title: 'Publish Video Content', description: 'Share market updates.' },
      { icon: 'Megaphone', title: 'Promote Brands', description: 'Collaborate with businesses.' },
      { icon: 'Mic', title: 'Host Discussions', description: 'Lead conversations.' },
      { icon: 'BookOpen', title: 'Educate Community', description: 'Create valuable content.' },
      { icon: 'ThumbsUp', title: 'Build Engagement', description: 'Grow audience.' },
    ],
    getPoints: [
      { icon: 'Handshake', title: 'Brand Collaborations', description: 'Work with builders.' },
      { icon: 'Target', title: 'Campaign Opportunities', description: 'Participate in promotions.' },
      { icon: 'TrendingUp', title: 'Audience Growth', description: 'Expand reach.' },
      { icon: 'Award', title: 'Industry Recognition', description: 'Become trusted voice.' },
      { icon: 'DollarSign', title: 'Monetization', description: 'Create new income.' },
    ],
    relevantModules: [
      { name: 'Spotlight' },
      { name: 'RED Expert' },
      { name: 'Opportunities' },
      { name: 'Directory' },
      { name: 'Showcase', comingSoon: true },
    ],
  },
  {
    key: 'trainer',
    label: 'Trainer',
    roleIcon: 'BookOpen',
    isPopular: true,
    description: 'Use N4RE to build visibility, create opportunities and collaborate with the real estate ecosystem.',
    ctaLabel: 'Join N4RE as Trainer',
    offerPoints: [
      { icon: 'Calendar', title: 'Promote Workshops', description: 'Publish training sessions.' },
      { icon: 'Video', title: 'Create Learning Content', description: 'Educate through videos.' },
      { icon: 'Users', title: 'Offer Mentorship', description: 'Guide professionals.' },
      { icon: 'MonitorPlay', title: 'Host Webinars', description: 'Reach wider audiences.' },
      { icon: 'Award', title: 'Share Expertise', description: 'Build credibility.' },
    ],
    getPoints: [
      { icon: 'Users', title: 'Learner Community', description: 'Reach professionals.' },
      { icon: 'Briefcase', title: 'Corporate Training', description: 'Secure engagements.' },
      { icon: 'Mic', title: 'Speaking Opportunities', description: 'Expand influence.' },
      { icon: 'Shield', title: 'Professional Authority', description: 'Strengthen reputation.' },
      { icon: 'MessageCircle', title: 'Consulting Engagements', description: 'Generate revenue.' },
    ],
    relevantModules: [
      { name: 'Learn', comingSoon: true },
      { name: 'RED Expert' },
      { name: 'Spotlight' },
      { name: 'Directory' },
      { name: 'Showcase', comingSoon: true },
    ],
  },
];

export const POPULAR_ROLES = ROLES.filter((r) => r.isPopular);