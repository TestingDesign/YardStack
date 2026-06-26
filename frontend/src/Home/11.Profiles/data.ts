import { 
  Building2, 
  Armchair, 
  Mic,
  PackageSearch,
  Users,
  Megaphone,
  Image as ImageIcon,
  Handshake,
  Mail,
  PenTool,
  Briefcase,
  Star,
  Users as UsersStats,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

export const PROFILES_CONTENT = {
  tagline: "BUILT FOR MULTI-ROLE PROFESSIONALS",
  headingHighlight: "One Person.",
  heading: "Multiple Profiles.",
  description: "Create separate identities for every business, service or profession you operate under.",
  subDescription: "Manage everything from a single dashboard.",
  dashboardTitle: "One Login.\nMultiple Identities.\nUnlimited Possibilities.",
  dashboardDesc: "Switch between profiles and grow every business you own."
};

export const PROFILES_CARDS = [
  {
    id: "channel-partner",
    title: "Channel Partner",
    icon: Building2,
    color: "#6B21A8", // Purple
    bgColor: "#F3E8FF",
    features: [
      { icon: PackageSearch, text: "Sell Inventory" },
      { icon: Users, text: "Hire Team" },
      { icon: Megaphone, text: "Promote Projects" }
    ]
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    icon: Armchair,
    color: "#16A34A", // Green
    bgColor: "#DCFCE7",
    features: [
      { icon: ImageIcon, text: "Showcase Work" },
      { icon: Handshake, text: "Collaborate" },
      { icon: Mail, text: "Receive Enquiries" }
    ]
  },
  {
    id: "influencer",
    title: "Real Estate Influencer",
    icon: Mic,
    color: "#EA580C", // Orange
    bgColor: "#FFF7ED",
    features: [
      { icon: PenTool, text: "Publish Content" },
      { icon: Briefcase, text: "Brand Deals" },
      { icon: Star, text: "Get Opportunities" }
    ]
  }
];

export const DASHBOARD_STATS = [
  { icon: UsersStats, value: "128", label: "Team Members" },
  { icon: ShoppingBag, value: "245", label: "Active Leads" },
  { icon: Megaphone, value: "42", label: "Opportunities" },
  { icon: TrendingUp, value: "3.6K", label: "Profile Views" }
];
