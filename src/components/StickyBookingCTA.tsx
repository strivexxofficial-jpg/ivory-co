import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar } from 'lucide-react';

export default function StickyBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the hero section (roughly 100vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 z-40 hidden md:flex"
        >
          <a
            href="#booking"
            aria-label="Book a consultation"
            className="group bg-sage/95 backdrop-blur-md text-ivory px-8 py-4 rounded-full shadow-[0_20px_40px_-5px_rgba(30,45,37,0.4)] flex items-center gap-3 hover:scale-105 hover:bg-clay transition-all duration-500 border border-white/10"
          >
            <Calendar className="w-4 h-4 text-clay group-hover:text-ivory transition-colors" />
            <span className="text-sm uppercase tracking-wider font-semibold mt-px">Book Consultation</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
