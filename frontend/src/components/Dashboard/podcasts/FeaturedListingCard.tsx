import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { PodcastEpisode } from './data'
import SpotlightLink, { SPOTLIGHT_LINKS } from '../spotlight/SpotlightLink'

const getCardContent = (category: string) => {
  switch (category) {
    case 'business':
    case 'tech':
      return {
        title: 'Featured Opportunity',
        tag: 'Hiring',
        heading: 'Senior Brand Strategist',
        description: 'Join a fast-growing team. We are looking for experienced strategists to lead our new global campaigns and elevate our market presence.',
        details: [
          'Competitive commission splits', 
          'Premium lead generation provided', 
          'Flexible scheduling and autonomy'
        ],
        linkData: SPOTLIGHT_LINKS.seniorAgent
      }
    case 'health':
    case 'true-crime':
      return {
        title: 'Exclusive Property',
        tag: 'For Sale',
        heading: 'Luxury Coastal Villa',
        description: 'Experience unparalleled luxury with breathtaking ocean views in this 6-bedroom masterpiece.',
        details: [
          'Prime waterfront locations', 
          'Smart home integration built-in', 
          'Private security patrols'
        ],
        linkData: SPOTLIGHT_LINKS.luxuryVilla
      }
    case 'news':
    case 'education':
      return {
        title: 'Featured Investment',
        tag: 'Fund',
        heading: 'Global Real Estate Fund',
        description: 'Diversify your portfolio with our premier global real estate fund targeting high-growth urban centers.',
        details: [
          'Targeted 8-12% annual returns', 
          'Quarterly dividend payouts', 
          'Professionally managed assets'
        ],
        linkData: SPOTLIGHT_LINKS.capitalFund
      }
    default:
      return {
        title: 'Featured Listing',
        tag: 'For Lease',
        heading: 'Prime Commercial Space',
        description: 'A 5,000 sq ft modern office space located in the heart of the tech district. Perfect for growing startups and established enterprises.',
        details: [
          'Class A office buildings', 
          'Fully furnished options available', 
          'Long-term and short-term leases'
        ],
        linkData: SPOTLIGHT_LINKS.commercialOffice
      }
  }
}

export default function FeaturedListingCard({ episode }: { episode: PodcastEpisode }) {
  const content = getCardContent(episode.category)
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-[4px] border border-slate-200 shadow-sm w-full transition-all hover:shadow-md sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {content.title}
        </h3>
      </div>
      
      <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-2">
        {content.heading}
      </h4>
      
      <p className="text-sm text-slate-600 mb-5 leading-relaxed">
        {content.description}
      </p>
      
      <ul className="mb-6 space-y-3">
        {content.details.map((detail, idx) => (
          <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-2.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto pt-5 border-t border-slate-100 flex justify-start">
        <SpotlightLink linkData={content.linkData} />
      </div>
    </div>
  )
}