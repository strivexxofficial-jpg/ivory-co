import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5) + 1;
      if (count > 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
          window.scrollTo(0, 0);
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
          }
        }, 800); // Wait a bit at 100%
      }
      setProgress(count);
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-sage flex flex-col justify-end p-8 md:p-16"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between items-end text-ivory w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.3em] font-bold"
            >
              Ivory<span className="text-clay">OS</span> &copy; 2026
            </motion.div>

            <div className="font-sans font-medium text-8xl md:text-[15vw] leading-none tracking-tighter mix-blend-difference">
              {progress}<span className="text-clay">%</span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-white/20 mt-8 relative overflow-hidden">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-clay"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.1 }}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
