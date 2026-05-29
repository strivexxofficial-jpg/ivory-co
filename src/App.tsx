import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useLayoutEffect, Suspense } from 'react';
import Lenis from 'lenis';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Preloader from './components/Preloader';
import StickyBookingCTA from './components/StickyBookingCTA';
import ConciergeChat from './components/ConciergeChat';
import BookingForm from './components/BookingForm';
import { injectSEO } from './lib/seo';

const Treatment = React.lazy(() => import('./pages/Treatment'));
const Cases = React.lazy(() => import('./pages/Cases'));
const Membership = React.lazy(() => import('./pages/Membership'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
import LeadMagnet from './components/LeadMagnet';


function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if it's the very first time this session loaded this page
    const isFirstLoad = !sessionStorage.getItem('hasLoadedBefore');
    
    if (isFirstLoad) {
      sessionStorage.setItem('hasLoadedBefore', 'true');
      
      // Force scroll to top using multiple methods to override Lenis/browser defaults
      window.scrollTo(0, 0);
      if ((window as any).lenis) (window as any).lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.scrollTo(0, 0));
      setTimeout(() => {
        window.scrollTo(0, 0);
        if ((window as any).lenis) (window as any).lenis.scrollTo(0, { immediate: true });
      }, 50);

      // If we landed here with a hash, remove it so we don't automatically scroll down
      if (hash) {
        navigate(pathname, { replace: true });
      }
      return;
    }

    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
      if ((window as any).lenis) (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, navigate]);

  return null;
}

export default function App() {
  useLayoutEffect(() => {
    injectSEO();
    
    document.title = "Ivory & Co. Elite Dental Studio";
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;

    // Reset scroll immediately on init
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-noise"></div>
      <Preloader />
      <BrowserRouter>
        <ScrollToTop />
        <div className="w-full relative flex flex-col min-h-screen overflow-x-hidden">
          <Suspense fallback={<div className="min-h-screen bg-stone"></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/treatments/:id" element={<Treatment />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/booking" element={
                <div style={{minHeight:'100vh',background:'#0F1A14',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'24px',padding:'40px'}}>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'48px',fontWeight:300,color:'#F9F6F0',textAlign:'center',lineHeight:1.1}}>
                    Book Your <em style={{fontStyle:'italic',color:'#C8986A'}}>Assessment</em>
                  </div>
                  <p style={{fontFamily:'Jost, sans-serif',fontSize:'14px',fontWeight:300,color:'rgba(249,246,240,0.5)',textAlign:'center',maxWidth:'400px',lineHeight:1.8}}>
                    Our team will confirm your appointment within 24 hours.
                  </p>
                  <BookingForm />
                </div>
              } />
            </Routes>
            <StickyBookingCTA />
            <ConciergeChat />
            <LeadMagnet />
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  );
}
