import { motion } from 'framer-motion';

import HomeNavDesktop from './topNav/HomeNavDesktop';
import HeroDesktop from './01.Hero/HeroDesktop';
import WhyN4reDesktop from './02.WhyN4RE/WhyN4reDesktop';
import FindYourPlaceDesktop from './03.FindYourPlace/FindYourPlaceDesktop';
import PillarsDesktop from './04.ThreePillars/PillarsDesktop';
import PlatformPreviewDesktop from './05.Preview/PlatformPreviewDesktop';
import SegmentsDesktop from './10.Segments/SegmentsDesktop';
/* import ComingSoonDesktop from './07.ComingSoon/ComingSoonDesktop'; */
import FinalCtaDesktop from './08.CTA/FinalCtaDesktop';
import FooterDesktop from './09.Footer/FooterDesktop';

interface HomeDesktopProps {
  viewMode: 'desktop' | 'mobile';
}

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }} // Smooth ease-out
    >
      {children}
    </motion.div>
  );
};

export default function HomeDesktop({ viewMode }: HomeDesktopProps) {
  return (
    <main 
      className="block h-full w-full overflow-x-hidden overflow-y-auto bg-[var(--color-bg-muted)] scroll-smooth selection:bg-purple-200 selection:text-purple-900 hide-scrollbar"
    >
      <motion.div 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HomeNavDesktop viewMode={viewMode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HeroDesktop />
      </motion.div>

      <ScrollReveal>
        <WhyN4reDesktop />
      </ScrollReveal>

      <ScrollReveal>
        <PillarsDesktop />
      </ScrollReveal>

      <ScrollReveal>
        <FindYourPlaceDesktop />
      </ScrollReveal>

      <ScrollReveal>
        <PlatformPreviewDesktop />
      </ScrollReveal>

      {/* <EcosystemDesktop /> */}
      
      <ScrollReveal>
        <SegmentsDesktop />
      </ScrollReveal>

      {/* <ProfilesDesktop /> */}
      {/* <ComingSoonDesktop /> */}

      <ScrollReveal>
        <FinalCtaDesktop />
      </ScrollReveal>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FooterDesktop />
      </motion.div>
    </main>
  );
}
