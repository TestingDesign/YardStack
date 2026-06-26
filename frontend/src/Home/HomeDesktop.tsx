import HomeNavDesktop from './topNav/HomeNavDesktop';
import HeroDesktop from './01.Hero/HeroDesktop';
import WhyN4reDesktop from './02.WhyN4RE/WhyN4reDesktop';
import FindYourPlaceDesktop from './03.FindYourPlace/FindYourPlaceDesktop';
import PillarsDesktop from './04.ThreePillars/PillarsDesktop';
import PlatformPreviewDesktop from './05.Preview/PlatformPreviewDesktop';
import EcosystemDesktop from './06.Ecosystem/EcosystemDesktop';
import ComingSoonDesktop from './07.ComingSoon/ComingSoonDesktop';
import FooterDesktop from './09.Footer/FooterDesktop';

interface HomeDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

export default function HomeDesktop({ viewMode }: HomeDesktopProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-white hide-scrollbar">
      <HomeNavDesktop viewMode={viewMode} />
      <HeroDesktop />
      <WhyN4reDesktop />
      <FindYourPlaceDesktop />
      <PillarsDesktop />
      <PlatformPreviewDesktop />
      <EcosystemDesktop />
      <ComingSoonDesktop />
      <FooterDesktop />
    </div>
  );
}