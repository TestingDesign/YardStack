import HomeNavMobile from './topNav/HomeNavMobile';
import HeroMobile from './01.Hero/HeroMobile';
import WhyN4reMobile from './02.WhyN4RE/WhyN4reMobile';
import FindYourPlaceMobile from './03.FindYourPlace/FindYourPlaceMobile';
import PillarsMobile from './04.ThreePillars/PillarsMobile';
import PlatformPreviewMobile from './05.Preview/PlatformPreviewMobile';
import SegmentsMobile from './10.Segments/SegmentsMobile';
import ProfilesMobile from './11.Profiles/ProfilesMobile';
import ComingSoonMobile from './07.ComingSoon/ComingSoonMobile';
import FooterMobile from './09.Footer/FooterMobile';

interface HomeMobileProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeMobile({ viewMode }: HomeMobileProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-[#F8F7FC] hide-scrollbar">
      <HomeNavMobile viewMode={viewMode} />
      <HeroMobile />
      <WhyN4reMobile />
      <FindYourPlaceMobile />
      <PillarsMobile />
      <PlatformPreviewMobile />
      {/* <EcosystemMobile /> */}
      <SegmentsMobile />
      <ProfilesMobile />
      <ComingSoonMobile />
      <FooterMobile />
    </div>
  );
}