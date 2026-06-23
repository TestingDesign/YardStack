import HomeNavMobile from './topNav/HomeNavMobile'
import HeroMobile from './hero/HeroMobile'
import WhyN4reMobile from './whyN4re/WhyN4reMobile'
import FindYourPlaceMobile from './findYourPlace/FindYourPlaceMobile'
import PillarsMobile from './pillars/PillarsMobile'
import PlatformPreviewMobile from './platformPreview/PlatformPreviewMobile'
import RoadmapMobile from './roadmap/RoadmapMobile'
import FinalCtaMobile from './finalCta/FinalCtaMobile'

interface HomeMobileProps {
  viewMode: 'desktop' | 'mobile'
}

export default function HomeMobile({ viewMode }: HomeMobileProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-white hide-scrollbar">
      <HomeNavMobile viewMode={viewMode} />
      <HeroMobile />
      <WhyN4reMobile />
      <FindYourPlaceMobile />
      <PillarsMobile />
      <PlatformPreviewMobile />
      <RoadmapMobile />
      <FinalCtaMobile />
    </div>
  )
}
