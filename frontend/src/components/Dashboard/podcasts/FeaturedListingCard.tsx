import React from 'react'
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
        linkData: SPOTLIGHT_LINKS.seniorAgent
      }
    case 'health':
    case 'true-crime':
      return {
        title: 'Exclusive Property',
        tag: 'For Sale',
        heading: 'Luxury Coastal Villa',
        description: 'Experience unparalleled luxury with breathtaking ocean views in this 6-bedroom masterpiece.',
        linkData: SPOTLIGHT_LINKS.luxuryVilla
      }
    case 'news':
    case 'education':
      return {
        title: 'Featured Investment',
        tag: 'Fund',
        heading: 'Global Real Estate Fund',
        description: 'Diversify your portfolio with our premier global real estate fund targeting high-growth urban centers.',
        linkData: SPOTLIGHT_LINKS.capitalFund
      }
    default:
      return {
        title: 'Featured Listing',
        tag: 'For Lease',
        heading: 'Prime Commercial Space',
        description: 'A 5,000 sq ft modern office space located in the heart of the tech district. Perfect for growing startups and established enterprises.',
        linkData: SPOTLIGHT_LINKS.commercialOffice
      }
  }
}

export default function FeaturedListingCard({ episode }: { episode: PodcastEpisode }) {
  const content = getCardContent(episode.category)
  
  return (
    <div className="w-full bg-white rounded-[4px] border border-gray-100 shadow-sm p-4 flex flex-col gap-4 sticky top-4">
      <h3 className="text-[18px] font-black text-gray-900">
        {content.title}
      </h3>
      
      <div className="flex flex-col gap-1.5">
        <h4 className="text-[16px] font-bold text-gray-900 leading-snug">
          {content.heading}
        </h4>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          {content.description}
        </p>
      </div>
      
      <div className="flex flex-col gap-2 mt-2">
        <div className="w-full flex [&>div]:w-full [&_button]:w-full [&_button]:py-2.5">
          <SpotlightLink linkData={content.linkData} />
        </div>
      </div>
    </div>
  )
}
