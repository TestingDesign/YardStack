import { Building2, Home, TrendingUp, MapPin, Building } from 'lucide-react';

export const SEGMENTS_CONTENT = {
  tagline: "REAL ESTATE SEGMENTS WE SERVE",
  heading: "We serve professionals and companies from every real estate segment",
  description: "Whether you work in residential, luxury, plotted developments, commercial real estate or investment advisory, N4RE helps professionals and businesses connect, collaborate and grow."
};

export const SEGMENTS = [
  {
    id: "commercial",
    title: "Commercial Real Estate",
    description: "Office • Retail • Leasing",
    icon: Building2,
    color: "#3B82F6", // Blue-500
    bgColor: "#EFF6FF", // Blue-50
  },
  {
    id: "luxury",
    title: "Luxury Housing",
    description: "Apartments • Villas • Communities • Premium & Luxury Developments",
    icon: Home,
    color: "#EA580C", // Orange-600
    bgColor: "#FFF7ED", // Orange-50
  },
  {
    id: "investment",
    title: "Investment Advisory",
    description: "Investments • Advisory • Wealth Planning",
    icon: TrendingUp,
    color: "#EAB308", // Yellow-500
    bgColor: "#FEFCE8", // Yellow-50
  },
  {
    id: "plotted",
    title: "Plotted Developments",
    description: "Layouts • Farm Plots • Investment Corridors",
    icon: MapPin,
    color: "#22C55E", // Green-500
    bgColor: "#F0FDF4", // Green-50
  }
];
