import React from 'react';
import { motion } from 'framer-motion';
import { FOOTER_LINKS, SOCIAL_LINKS, FOOTER_COPYRIGHT } from '../08.CTA/data';
import LogoPng from '../../components/commonfiles/sidebar/Logo.png';

const ICON_PATHS: Record<string, React.ReactNode> = {
  linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
  youtube: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
};

const SocialIcon = ({ icon, size = 16 }: { icon: string; size?: number }) => {
  const path = ICON_PATHS[icon];
  if (!path) return null;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      {path}
    </svg>
  );
};

export default function FooterMobile() {
  return (
    <footer 
      id="footer" 
      className="relative bg-white py-6 border-t border-slate-200 selection:bg-purple-200 selection:text-purple-900 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="px-4 flex flex-col items-center gap-6" style={{ transformStyle: "preserve-3d" }}>
        
        <motion.div 
          initial={{ opacity: 0, rotateX: -60, z: -100 }}
          whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.img 
            whileHover={{ 
              rotateY: 15, 
              rotateX: -10, 
              scale: 1.05, 
              z: 30,
              filter: "drop-shadow(0px 10px 15px rgba(147, 51, 234, 0.2))"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src={LogoPng} 
            alt="N4RE Logo" 
            className="h-20 w-auto object-contain cursor-pointer" 
          />
          <span className="text-[11px] font-medium text-slate-500 text-center">
            {FOOTER_COPYRIGHT}
          </span>
        </motion.div>

        <motion.nav 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {FOOTER_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={{
                hidden: { opacity: 0, rotateX: -90, y: 10 },
                visible: { 
                  opacity: 1, 
                  rotateX: 0, 
                  y: 0,
                  transition: { type: "spring", damping: 12 } 
                }
              }}
              whileHover={{ 
                scale: 1.1, 
                z: 20, 
                color: "#9333ea"
              }}
              className="inline-block text-[12px] font-bold text-slate-600 underline decoration-dotted transition-colors duration-300 outline-none"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.4 }
            }
          }}
          className="flex items-center gap-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              variants={{
                hidden: { opacity: 0, scale: 0.5, rotateY: 90, z: -50 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0, 
                  z: 0,
                  transition: { type: "spring", stiffness: 100, damping: 10 } 
                }
              }}
              whileHover={{ 
                scale: 1.15, 
                rotateY: 15, 
                rotateX: -15, 
                z: 40,
                backgroundColor: "#faf5ff", 
                borderColor: "#e9d5ff", 
                color: "#9333ea", 
                boxShadow: "0 15px 25px -5px rgba(147, 51, 234, 0.25)"
              }}
              whileTap={{ scale: 0.95, z: 10 }}
              className="flex items-center justify-center w-10 h-10 rounded-[6px] bg-slate-50 border border-slate-200 text-slate-500 transition-colors duration-300 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <SocialIcon icon={social.icon} size={18} />
            </motion.a>
          ))}
        </motion.div>
        
      </div>
    </footer>
  );
}