import { Building, Building2, Home, MapPin } from 'lucide-react';

export const SEGMENTS_CONTENT = {
  tagline: "REAL ESTATE SEGMENTS WE SERVE",
  heading: "We serve professionals and companies from every real estate segment",
  description: "Whether you work in residential, luxury, plotted developments, commercial real estate or investment advisory, N4RE helps professionals and businesses connect, collaborate and grow."
};

export const SEGMENTS = [
  {
    id: "residential",
    title: "Residential",
    description: "Apartments • Villas • Communities",
    icon: Building,
    color: "#E11D48", 
    bgColor: "#FFE4E6", 
  },
  
  {
    id: "luxury",
    title: "Luxury Housing",
    description: "Premium & Luxury Developments",
    icon: Home,
    color: "#EA580C", // Orange-600
    bgColor: "#FFF7ED", // Orange-50
  },
  {
    id: "commercial",
    title: "Commercial Real Estate",
    description: "Office • Retail • Leasing",
    icon: Building2,
    color: "#3B82F6", // Blue-500
    bgColor: "#EFF6FF", // Blue-50
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
