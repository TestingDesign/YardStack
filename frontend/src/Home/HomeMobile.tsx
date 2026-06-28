import { motion } from 'framer-motion';
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

const MobileScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }} 
    >
      {children}
    </motion.div>
  );
};

export default function HomeMobile({ viewMode }: HomeMobileProps) {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-[#F8F7FC] hide-scrollbar [&>*]:shrink-0 flex flex-col">
      <motion.div 
        initial={{ y: -60, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <HomeNavMobile viewMode={viewMode} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <HeroMobile />
      </motion.div>
      <MobileScrollReveal>
        <WhyN4reMobile />
      </MobileScrollReveal>

      <MobileScrollReveal>
        <PillarsMobile />
      </MobileScrollReveal>

      <MobileScrollReveal>
        <FindYourPlaceMobile />
      </MobileScrollReveal>

      <MobileScrollReveal>
        <PlatformPreviewMobile />
      </MobileScrollReveal>

      {/* <EcosystemMobile /> */}
      
      <MobileScrollReveal>
        <SegmentsMobile />
      </MobileScrollReveal>

      {/* <ProfilesMobile /> */}
      {/* <ComingSoonMobile /> */}

      <MobileScrollReveal>
        <FinalCtaMobile />
      </MobileScrollReveal>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <FooterMobile />
      </motion.div>
      
    </div>
  );
}