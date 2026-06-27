import React from 'react';
import { PlayCircle, Briefcase, Users, Handshake, Megaphone, Building2, Landmark, Monitor, Palette } from 'lucide-react';

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
  ],
  redExpert: [
    { title: 'Mastering Real Estate Sales', author: 'Arjun Reddy', gradient: 'from-blue-600 to-purple-600', duration: '12:45' },
    { title: 'Negotiation Tactics 2024', author: 'Meera Menon', gradient: 'from-rose-600 to-pink-600', duration: '08:20' },
    { title: 'Building Trust with Clients', author: 'Siddharth Rao', gradient: 'from-emerald-600 to-teal-600', duration: '15:10' },
    { title: 'Effective Digital Marketing', author: 'Priya Sharma', gradient: 'from-orange-600 to-amber-600', duration: '10:05' },
  ],
  opportunities: [
    { title: 'Looking for CRM Vendor', company: 'Apex Developments', location: 'Hyderabad', budget: '₹5L - ₹10L', type: 'Full-Time' },
    { title: 'Hiring Sales Manager', company: 'Zenith Strategies', location: 'Bangalore', budget: '₹12L - ₹15L PA', type: 'Contract' },
    { title: 'Seeking Channel Partners', company: 'Elite Estates', location: 'Remote', budget: 'Commission Based', type: 'Partnership' },
    { title: 'Marketing Agency Requirement', company: 'Verma Associates', location: 'Mumbai', budget: '₹2L / month', type: 'Project' },
  ],
  directory: [
    { title: 'Builders', count: '1,200+', icon: Building2, color: 'text-purple-500' },
    { title: 'Channel Partners', count: '5,500+', icon: Users, color: 'text-blue-500' },
    { title: 'Bankers', count: '300+', icon: Landmark, color: 'text-emerald-500' },
    { title: 'Agencies', count: '450+', icon: Megaphone, color: 'text-rose-500' },
    { title: 'Tech Providers', count: '150+', icon: Monitor, color: 'text-cyan-500' },
    { title: 'Designers', count: '800+', icon: Palette, color: 'text-orange-500' },
  ],
};
