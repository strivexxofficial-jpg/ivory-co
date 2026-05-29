import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, SmileIcon, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(!transparent);
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (transparent) {
      if (latest > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  const handleNavClick = (hash: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-6 lg:px-10 py-6 lg:py-8 transition-all duration-500`}>
        <div className={`absolute inset-0 bg-[#181615]/95 backdrop-blur-md transition-opacity duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.1)] ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`max-w-[1500px] mx-auto flex justify-between items-center relative z-10 transition-colors duration-500 text-ivory`}>
          <Link to="/" className="flex items-center gap-3 group text-white/95 translate-y-[2px]" aria-label="Home">
            <SmileIcon className="w-9 h-9 lg:w-10 lg:h-10 group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-sans font-semibold tracking-tight text-xl lg:text-2xl">Ivory & Co.</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-xs lg:text-sm font-medium tracking-[0.1em]">
            <button onClick={() => handleNavClick('#philosophy')} className="hover:opacity-70 transition-opacity after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300">
              Philosophy
            </button>
            <button onClick={() => handleNavClick('#services')} className="hover:opacity-70 transition-opacity after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300">
              Services
            </button>
              <Link to="/cases" className="relative hover:opacity-70 transition-opacity after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300">
                Cases
              </Link>
              <Link to="/roadmap" className="relative hover:opacity-70 transition-opacity after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300">
                Roadmap
              </Link>
              <Link to="/membership" className="relative hover:opacity-70 transition-opacity after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all after:duration-300">
                Membership
              </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end mr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse"></div>
                <span className="text-[11px] font-medium tracking-wider text-clay/90 uppercase">2 Slots Available</span>
              </div>
              <span className="text-[11px] font-medium tracking-wider opacity-60 uppercase">Consultations this week</span>
            </div>
            <button onClick={() => handleNavClick('#booking')} className="bg-clay text-ivory px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-ivory hover:text-[#181615] transition-colors duration-500 shadow-lg shadow-clay/10">
              Book Visit
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#181615]/95 backdrop-blur-xl h-screen pt-28 px-6 flex flex-col pb-10"
          >
            <div className="flex flex-col gap-8 h2 mt-8 text-ivory">
              <button onClick={() => handleNavClick('#philosophy')} className="hover:text-clay transition-colors text-left flex items-center justify-between group">
                Philosophy <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-clay" />
              </button>
              <button onClick={() => handleNavClick('#services')} className="hover:text-clay transition-colors text-left flex items-center justify-between group">
                Services <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-clay" />
              </button>
              <Link to="/cases" onClick={() => setIsMenuOpen(false)} className="hover:text-clay transition-colors text-left flex items-center justify-between group">
                Cases <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-clay" />
              </Link>
              <Link to="/roadmap" onClick={() => setIsMenuOpen(false)} className="hover:text-clay transition-colors text-left flex items-center justify-between group">
                Roadmap <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-clay" />
              </Link>
              <Link to="/membership" onClick={() => setIsMenuOpen(false)} className="hover:text-clay transition-colors text-left flex items-center justify-between group">
                Membership <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-clay" />
              </Link>
            </div>
            
            <div className="mt-auto flex flex-col gap-4">
              <button onClick={() => handleNavClick('#booking')} className="w-full bg-clay text-ivory py-5 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-sage transition-colors duration-300">
                Book Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
