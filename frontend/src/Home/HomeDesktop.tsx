import HomeNavDesktop from './topNav/HomeNavDesktop'
import HeroDesktop from './hero/HeroDesktop'
import WhyN4reDesktop from './whyN4re/WhyN4reDesktop'
import FindYourPlaceDesktop from './findYourPlace/FindYourPlaceDesktop'
import PillarsDesktop from './pillars/PillarsDesktop'
import PlatformPreviewDesktop from './platformPreview/PlatformPreviewDesktop'
import RoadmapDesktop from './roadmap/RoadmapDesktop'
import FinalCtaDesktop from './finalCta/FinalCtaDesktop'

interface HomeDesktopProps {
  viewMode: 'desktop' | 'mobile'
}

export default function HomeDesktop({ viewMode }: HomeDesktopProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-[#F8F7FC] hide-scrollbar">
      <HomeNavDesktop viewMode={viewMode} />
      <HeroDesktop />
      <WhyN4reDesktop />
      <FindYourPlaceDesktop />
      <PillarsDesktop />
      <PlatformPreviewDesktop />
      <RoadmapDesktop />
      <FinalCtaDesktop />
    </div>
  )
}
