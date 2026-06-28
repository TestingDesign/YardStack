import HomeNavMobile from './topNav/HomeNavMobile';
import HeroMobile from './01.Hero/HeroMobile';
import WhyN4reMobile from './02.WhyN4RE/WhyN4reMobile';
import FindYourPlaceMobile from './03.FindYourPlace/FindYourPlaceMobile';
import PillarsMobile from './04.ThreePillars/PillarsMobile';
import PlatformPreviewMobile from './05.Preview/PlatformPreviewMobile';
import SegmentsMobile from './10.Segments/SegmentsMobile';
/* import ComingSoonMobile from './07.ComingSoon/ComingSoonMobile'; */
import FinalCtaMobile from './08.CTA/FinalCtaMobile';
import FooterMobile from './09.Footer/FooterMobile';

interface HomeMobileProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeMobile({ viewMode }: HomeMobileProps) {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-[#F8F7FC] hide-scrollbar [&>*]:shrink-0 flex flex-col">
      <HomeNavMobile viewMode={viewMode} />
      <HeroMobile />
      <WhyN4reMobile />
      <PillarsMobile />
      <FindYourPlaceMobile />
      <PlatformPreviewMobile />
      {/* <EcosystemMobile /> */}
      <SegmentsMobile />
     {/*  <ProfilesMobile /> */}
      {/* <ComingSoonMobile /> */}
      <FinalCtaMobile />
      <FooterMobile />
    </div>
  );
}