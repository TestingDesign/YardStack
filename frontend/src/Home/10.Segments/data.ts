import { Building, Building2, Home, MapPin } from 'lucide-react';

export const SEGMENTS_CONTENT = {
  tagline: "REAL ESTATE SEGMENTS WE SERVE",
  heading: "We serve professionals and companies from every real estate segment",
  description: "Whether you work in residential, luxury, plotted developments, commercial real estate or investment advisory, N4RE helps professionals and businesses connect, collaborate and grow."
};

export const SEGMENTS = [
  {
    id: "residential",
    title: "Residential Properties",
    icon: Building,
    color: "#E11D48", 
    bgColor: "#FFE4E6", 
  },
  
  {
    id: "luxury",
    title: "Luxury Housing",
    icon: Home,
    color: "#EA580C", 
    bgColor: "#FFF7ED", 
  },
  {
    id: "commercial",
    title: "Commercial Properties",
    icon: Building2,
    color: "#3B82F6", 
    bgColor: "#EFF6FF", 
  },
  {
    id: "plotted",
    title: "Plotted Developments",
    icon: MapPin,
    color: "#22C55E", 
    bgColor: "#F0FDF4", 
  }
];
