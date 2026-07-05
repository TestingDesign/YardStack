import type { PodcastEpisode } from './data'
import SpotlightLink, { SPOTLIGHT_LINKS } from '../spotlight/SpotlightLink'

const getCardContent = (category: string) => {
  switch (category) {
    case 'business':
    case 'tech':
      return {
        description: 'Join a fast-growing team. We are looking for experienced strategists to lead our new global campaigns and elevate our market presence.',
        linkData: SPOTLIGHT_LINKS.seniorAgent
      }
    case 'health':
    case 'true-crime':
      return {
        description: 'Experience unparalleled luxury with breathtaking ocean views in this 6-bedroom masterpiece.',
        linkData: SPOTLIGHT_LINKS.luxuryVilla
      }
    case 'news':
    case 'education':
      return {
        description: 'Diversify your portfolio with our premier global real estate fund targeting high-growth urban centers.',
        linkData: SPOTLIGHT_LINKS.capitalFund
      }
    default:
      return {
        description: 'A 5,000 sq ft modern office space located in the heart of the tech district. Perfect for growing startups and established enterprises.',
        linkData: SPOTLIGHT_LINKS.commercialOffice
      }
  }
}

export default function FeaturedListingCardMobile({ episode }: { episode: PodcastEpisode }) {
  const content = getCardContent(episode.category)
  
  return (
    <div className="flex flex-col p-2 bg-white rounded-[4px] border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full transition-all">
      <p className="text-[13px] text-slate-600 mb-3 leading-relaxed">
        {content.description}
      </p>
      
      <div className="mt-auto pt-3 border-t border-slate-100 flex justify-start">
        <SpotlightLink linkData={content.linkData} />
      </div>
    </div>
  )
}
