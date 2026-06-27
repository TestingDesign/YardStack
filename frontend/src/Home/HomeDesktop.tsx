import HomeNavDesktop from './topNav/HomeNavDesktop';
import HeroDesktop from './01.Hero/HeroDesktop';
import WhyN4reDesktop from './02.WhyN4RE/WhyN4reDesktop';
import FindYourPlaceDesktop from './03.FindYourPlace/FindYourPlaceDesktop';
import PillarsDesktop from './04.ThreePillars/PillarsDesktop';
import PlatformPreviewDesktop from './05.Preview/PlatformPreviewDesktop';
import SegmentsDesktop from './10.Segments/SegmentsDesktop';
import ComingSoonDesktop from './07.ComingSoon/ComingSoonDesktop';
import FinalCtaDesktop from './08.CTA/FinalCtaDesktop';
import FooterDesktop from './09.Footer/FooterDesktop';

interface HomeDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeDesktop({ viewMode }: HomeDesktopProps) {
  return (
    <main 
      
      className="block h-full w-full overflow-x-hidden overflow-y-auto bg-[var(--color-bg-muted)] scroll-smooth selection:bg-purple-200 selection:text-purple-900 hide-scrollbar"
    >
      <HomeNavDesktop viewMode={viewMode} />
      <HeroDesktop />
      <WhyN4reDesktop />
      <FindYourPlaceDesktop />
      <PillarsDesktop />
      <PlatformPreviewDesktop />
      {/* <EcosystemDesktop /> */}
      <SegmentsDesktop />
      {/* <ProfilesDesktop /> */}
      <ComingSoonDesktop />
      <FinalCtaDesktop />
      <FooterDesktop />
    </main>
  );
}