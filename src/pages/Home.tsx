import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { Menu, X, MapPin, Phone, Clock, ArrowRight, ShieldCheck, 
  Sparkles, Smile as SmileIcon, Check, ChevronsLeftRight,
  Accessibility, Calendar, ArrowUpRight, Search, Star, CreditCard,
  Play, Award, Zap, Users, GraduationCap, Camera
} from 'lucide-react';
import Magnetic from '../components/Magnetic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCalculator from '../components/PricingCalculator';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FAQSection from '../components/FAQSection';
import InteractiveSmileSimulator from '../components/InteractiveSmileSimulator';
import TestimonialsSection from '../components/TestimonialsSection';
import BookingForm from '../components/BookingForm';

import ContactSection from '../components/ContactSection';

import type { Variants } from 'motion/react';
import { trackCTAClick, trackFormStart, trackFormSubmit, trackInsuranceCheck, trackSectionView } from '../lib/analytics';

// Shared Animations
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const textReveal: any = {
  hidden: { y: "150%" },
  visible: { y: 0, transition: { duration: 1.2, ease: "circOut" } }
};

export default function Home() {
  const [sliderPos, setSliderPos] = useState(50);
  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const [insuranceProvider, setInsuranceProvider] = useState('');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroScrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const techConsoleY = useTransform(scrollYProgress, [0.4, 0.8], ["-20%", "20%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(entry.target.id || 'hero');
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleInsuranceCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if(insuranceProvider) {
      setInsuranceChecked(true);
      trackInsuranceCheck(insuranceProvider);
    }
  };

  return (
    <div className="min-h-screen bg-stone text-sage">
      {/* Forced refresh comment */}

      {/* Main Nav */}
      <Navbar transparent={true} />

      <main id="main-content">
        {/* Cinematic Scrollytelling Hero */}
        <section ref={heroRef} className="relative w-full h-[85svh] md:h-screen min-h-[600px] overflow-hidden bg-[#181615] flex flex-col justify-center pt-[100px] pb-16 lg:pt-[120px]">
          
          {/* Background & Image */}
          <motion.div 
            style={{ 
              y: heroScrollY,
              scale: heroScale,
              opacity: heroScrollOpacity
            }}
            className="absolute right-0 top-0 w-full lg:w-[70%] h-[115%] z-0 origin-center lg:origin-right translate-x-4 lg:translate-x-12"
          >
            <img 
              src="https://i.ibb.co/ZppKLXWr/wmremove-transformed.png" 
              alt="Luxury dental clinic interior"

object-cover object-[70%_center] lg:object-center opacity-85

              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
            />
            {/* Cinematic grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          </motion.div>

          {/* Cinematic gradient overlay for contrast architecture */}
          <div className="absolute inset-0 z-10 w-full lg:w-[85%]" style={{
            background: 'linear-gradient(90deg, rgba(8,8,8,0.58) 0%, rgba(8,8,8,0.38) 28%, rgba(8,8,8,0.14) 52%, rgba(8,8,8,0.02) 72%, transparent 100%)'
          }} />
          <div className="absolute inset-0 bg-black/10 z-10" />

          {/* Aesthetic geometric framing lines */}
          <div className="absolute inset-x-0 lg:inset-x-12 top-0 lg:top-24 bottom-0 lg:bottom-12 border-x-0 border-t-0 lg:border-x lg:border-t border-ivory/10 z-10 pointer-events-none hidden lg:block">
            <div className="absolute top-0 right-1/2 w-px h-16 bg-ivory/10"></div>
          </div>

          <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pt-10 lg:pt-0 -translate-y-4 lg:-translate-y-8 lg:-translate-x-4">
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-20 w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-16 pt-12 lg:pt-0 lg:pl-8"
            >
            <div className="flex flex-col space-y-3 max-w-5xl shrink-1 lg:w-[70%] xl:w-2/3">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2 lg:mb-4">
                <span className="w-8 md:w-12 h-[1px] bg-clay shrink-0 shadow-sm"></span>
                <span className="text-accent text-ivory/90 whitespace-normal font-semibold tracking-wider" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.22)' }}>Elite Restorative Dentistry</span>
              </motion.div>
                
              <div className="transform -translate-x-1 lg:-translate-x-2">
                <motion.h1 variants={fadeUp} className="text-white break-words" style={{ fontSize: 'clamp(58px, 6.5vw, 92px)', lineHeight: '0.92', fontWeight: 500, letterSpacing: '-0.04em', textShadow: '0 1px 2px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.18)' }}>
                  The New Era
                </motion.h1>
              </div>
              <div className="transform -translate-x-1 lg:-translate-x-2 mt-[-10px] lg:mt-[-12px]">
                <motion.h1 variants={fadeUp} className="font-display italic break-words" style={{ fontSize: 'clamp(58px, 6.5vw, 92px)', lineHeight: '0.92', fontWeight: 500, letterSpacing: '-0.04em', color: '#D0A06B', textShadow: '0 1px 2px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.18)' }}>
                  of Oral Artistry.
                </motion.h1>
              </div>
            </div>
              
              <motion.div variants={fadeUp} className="flex flex-col items-start gap-8 lg:gap-10 max-w-[500px] w-full shrink-0 pt-6 lg:pt-0">
                <p className="text-pretty w-full pr-4 lg:pr-0" style={{ fontSize: '18px', fontWeight: 450, lineHeight: '1.75', color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 2px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.18)' }}>
                  Ivory & Co. is a boutique dental studio combining clinical mastery with spa-level hospitality. An uncompromising standard of excellence.
                </p>
                
                <div className="flex flex-col items-start gap-6 w-full">
                  <Magnetic intensity={0.1}>
                    <a href="#booking" onClick={() => trackCTAClick('book_visit')} className="group relative w-full sm:w-auto px-10 py-5 bg-clay text-white overflow-hidden rounded-full flex justify-center items-center gap-3 hover:scale-105 transition-all duration-500 border border-white/10" style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                      <span className="relative z-10 uppercase text-center" style={{ fontWeight: 600, letterSpacing: '0.04em', fontSize: '13px', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Schedule Your Private Visit</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse relative z-10 shrink-0"></div>
                      <div className="absolute inset-0 bg-[#9A7045] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
                    </a>
                  </Magnetic>
                  
                  <div className="flex flex-row items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex -space-x-2 shadow-sm rounded-full bg-ivory/10 backdrop-blur-sm p-1 shrink-0 border border-ivory/5">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#181615] bg-ivory overflow-hidden shrink-0">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient client" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-start shrink-0">
                      <div className="flex gap-0.5 mb-0.5 shrink-0">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-clay fill-clay drop-shadow-sm" />)}
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-ivory/60">500+ Perfect Reviews</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-6 lg:bottom-8 left-6 lg:left-12 flex flex-row items-center gap-4 z-20 pointer-events-none"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-ivory/40 -rotate-90 origin-left translate-y-6 lg:translate-y-8 hidden sm:block">Scroll</span>
            <div className="w-[1px] h-12 lg:h-16 bg-ivory/20 relative overflow-hidden hidden sm:block">
              <div className="absolute top-0 left-0 w-full h-full bg-clay origin-top animate-[scaleY_2s_infinite]"></div>
            </div>
          </motion.div>
        </section>

        {/* Press / Social Proof Bar */}
        <TestimonialsSection />

        {/* Why Choice Us / Differentiators */}
        <section id="why-ivory" className="py-20 md:py-32 bg-ivory overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-4 sticky top-40">
                <span className="text-accent mb-8 block">Distinction</span>
                <h2 className="h2 mb-8 md:mb-10">
                  Not just another dental office.<br className="hidden md:block"/><span className="font-display italic text-clay">An elite sanctuary.</span>
                </h2>
                <div className="w-12 h-[1px] bg-clay mb-10"></div>
                <p className="body-text mb-10">
                  We’ve stripped away everything you hate about traditional dentistry — the smells, the sounds, the rush — and replaced them with clinical mastery and patient-first hospitality.
                </p>
                <div className="flex gap-4">
                  <Magnetic intensity={0.1}>
                    <button className="w-12 h-12 rounded-full border border-stone-dark flex items-center justify-center hover:bg-sage hover:border-sage group transition-all duration-500">
                      <ArrowRight className="w-4 h-4 text-sage group-hover:text-white" />
                    </button>
                  </Magnetic>
                  <span className="text-xs uppercase tracking-widest font-bold text-sage self-center">Discover our process</span>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {[
                  {
                    title: "Advanced Technology",
                    desc: "From 3D digital scans to AI-powered mapping, our equipment ensures microscopic precision and eliminates traditional discomfort.",
                    icon: Zap,
                    image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    title: "Pain-Minimized Procedures",
                    desc: "Anxiety is optional. We utilize state-of-the-art localized numbing and sedation options to ensure your visit is entirely painless.",
                    icon: ShieldCheck,
                    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    title: "Same-Day Restoration",
                    desc: "Your time is valuable. We often complete final diagnostics and preliminary planning in a single visit, reducing clinic time by 40%.",
                    icon: Clock,
                    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    title: "Elite Aesthetics",
                    desc: "Our resident Master Prosthodontists design each restorative case with a focus on facial symmetry and natural brilliance.",
                    icon: Sparkles,
                    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-xl bg-stone-dark relative">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                       <div className="absolute top-6 left-6 w-10 h-10 bg-ivory/90 backdrop-blur rounded-full flex items-center justify-center text-clay shadow-lg">
                         <item.icon className="w-5 h-5" />
                       </div>
                    </div>
                    <h3 className="h4 text-sage mb-3">{item.title}</h3>
                    <p className="body-text">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credentials & Excellence Bar */}
        <section className="py-16 md:py-24 border-y border-stone-dark bg-stone/30">
          <div className="max-w-[1400px] mx-auto px-6 overflow-hidden">
             <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 opacity-60">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-sage/90 shrink-0">Recognized Excellence</span>
                <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between w-full grayscale contrast-125 gap-8 items-center">
                   {['Indian Dental Association', 'MDS — Prosthodontics', 'Invisalign Certified Provider', 'ISOI Member'].map((text, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <ShieldCheck className="w-4 h-4 text-sage" />
                       <span className="text-sm font-semibold uppercase tracking-wider text-center">{text}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section id="transformation" className="py-20 md:py-24 lg:py-32 bg-sage text-ivory relative overflow-hidden">
          
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center md:text-left mb-16 md:mb-20 flex flex-col items-center md:items-start max-w-2xl">
              <span className="text-accent text-clay mb-6">Clinical Mastery</span>
              <h2 className="h2 mb-6 md:mb-8 text-ivory">Visible Perfection.</h2>
              <div className="w-12 h-[1px] bg-clay mb-8"></div>
              <p className="body-text text-ivory/90 font-light">
                Drag the slider to experience the architectural transformation of our signature porcelain veneer case. From heavy staining to an absolutely flawless, radiant smile.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl mx-auto"
            >
              <BeforeAfterSlider 
                beforeImage="https://i.ibb.co/5WJBBcLv/row-1-column-1-1.webp" 
                afterImage="https://i.ibb.co/ym2KcXmV/row-1-column-2.webp" 
              />
            </motion.div>

            {/* Expanded Case Studies & Video Reviews */}
            <div className="mt-32 border-t border-white/10 pt-24 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <span className="text-accent text-clay opacity-80 mb-4 block">Case Studies</span>
                  <h3 className="h2 text-ivory">Life-Changing Results.<br/><span className="font-display italic text-clay">In their own words.</span></h3>
                </div>
                <div className="w-full md:w-auto h-auto">
                  <Link to="/cases" className="inline-block px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                    View Full Gallery
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Case Study 1 */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-stone-dark mb-6 border border-white/10">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" alt="Patient Video Review" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:bg-clay group-hover:border-clay transition-all duration-500 scale-90 group-hover:scale-100">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                  <h4 className="h3 text-ivory mb-2">"I stopped hiding my smile."</h4>
                  <p className="text-white/80 font-light flex items-center gap-3">
                    <span className="uppercase tracking-widest text-xs font-bold text-clay">Sneha R.</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span>Full Arch Veneers</span>
                  </p>
                </motion.div>

                {/* Case Study 2 */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-stone-dark mb-6 border border-white/10">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Patient Video Review" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:bg-clay group-hover:border-clay transition-all duration-500 scale-90 group-hover:scale-100">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                  <h4 className="h3 text-ivory mb-2">"No judgment, just incredible care."</h4>
                  <p className="text-white/80 font-light flex items-center gap-3">
                    <span className="uppercase tracking-widest text-xs font-bold text-clay">Devesh M.</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span>Invisalign & Whitening</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium E-Commerce Bento Box Services -> Editorial List */}
        <section id="services" className="py-20 md:py-24 lg:py-32 bg-stone">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col mb-16 gap-4">
              <span className="text-accent">Curated Treatments</span>
              <h2 className="h2 text-sage">Design Your<br/><span className="font-display italic text-clay">Smile.</span></h2>
            </div>

            <div className="flex flex-col border-t border-stone-dark overflow-hidden">
              {[
                { name: "The Baseline Exam", category: "Preventative", desc: "Our signature high-tech cleaning, deep exam, and oral cancer screening. Fully covered by most PPOs.", icon: ShieldCheck, price: "Financing Available" },
                { name: "Esthetic Veneers", category: "Cosmetic", desc: "Ultra-thin porcelain masterpieces to redesign your smile's shape, color, and symmetry.", icon: Sparkles, price: "From ₹12,000" },
                { name: "Invisible Aligners", category: "Orthodontics", desc: "Discreet transparent trays paired with hyper-accurate 3D digital simulation.", icon: SmileIcon, price: "From ₹85,000" },
                { name: "Surgical Implants", category: "Restorative", desc: "Permanent, functional, and visually indistinguishable titanium tooth replacements.", icon: ShieldCheck, price: "From ₹25,000" },
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative border-b border-stone-dark py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 cursor-pointer hover:bg-ivory/50 transition-colors duration-500 px-6 -mx-6"
                >
                  <div className="flex items-center gap-6 md:gap-8 lg:w-[40%]">
                    <span className="text-accent text-clay w-8 md:w-12 shrink-0">0{idx + 1}</span>
                    <h3 className="h3 font-medium transition-all duration-300">{service.name}</h3>
                  </div>
                  
                  <div className="lg:w-[35%] body-text pr-6">
                    {service.desc}
                  </div>
                  
                  <div className="flex items-center justify-between lg:w-1/4 gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-base font-normal text-clay whitespace-nowrap">{service.price}</span>
                      <span className="text-sm uppercase tracking-widest font-medium border border-sage/20 px-4 py-2 rounded-full hidden md:block">{service.category}</span>
                    </div>
                    {service.category === 'Restorative' || service.category === 'Cosmetic' ? (
                      <Link 
                        to={service.name.includes('Veneers') ? '/treatments/veneers' : service.name.includes('Invisalign') ? '/treatments/invisalign' : service.name.includes('Implants') ? '/treatments/implants' : '/treatments/veneers'}
                        className="w-12 h-12 rounded-full border border-stone-dark flex items-center justify-center group-hover:bg-sage group-hover:border-sage transition-all duration-500 shrink-0"
                        aria-label={`View details for ${service.name}`}
                      >
                        <ArrowRight className="w-5 h-5 text-sage group-hover:text-stone -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </Link>
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-stone-dark flex items-center justify-center group-hover:bg-sage group-hover:border-sage transition-all duration-500 shrink-0">
                        <ArrowRight className="w-5 h-5 text-sage group-hover:text-stone -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor Section */}
        <section id="team" className="bg-ivory py-20 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-stone rounded-full blur-[100px] opacity-50 -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col mb-12 md:mb-16">
              <span className="text-accent mb-6 md:mb-8">Clinical Directory</span>
              <div>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="h2 text-sage">Meet Dr. Anushka Patil</motion.h2>
              </div>
              <div>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="h2 font-display text-clay italic">& her team.</motion.h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
              <div className="lg:col-span-5 relative">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-stone relative group"
                >
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" alt="Dr. Anushka Patil" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale-[0.2]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </motion.div>
                
                {/* Floating badge */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                   whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.4 }}
                   className="absolute -bottom-10 -right-10 w-40 h-40 bg-sage rounded-full shadow-2xl flex items-center justify-center p-4 border-[8px] border-ivory scale-75 md:scale-100"
                >
                  <div className="text-center">
                    <Award className="w-6 h-6 text-clay mx-auto mb-2" />
                    <p className="text-white text-sm font-semibold uppercase tracking-wider leading-tight">Master of<br/>Restorative Art</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center gap-12 pt-12 lg:pt-0">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-6">
                  <span className="text-clay font-bold tracking-[0.2em] uppercase text-xs">The Clinical Lead</span>
                  <p className="h3 text-sage">
                    "I believe dentistry is the intersection of architecture, biology, and trust."
                  </p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 py-12 border-y border-stone-dark">
                  {[
                    { label: "Academic Foundation", value: "Government Dental College, Mumbai — BDS, MDS", icon: GraduationCap },
                    { label: "Industry Standing", value: "Invisalign Certified Provider", icon: Award },
                    { label: "Global Perspective", value: "IDA (Indian Dental Association) Member", icon: Camera },
                    { label: "Innovations", value: "ISOI Certified Implantologist", icon: Zap }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <item.icon className="w-5 h-5 text-clay" />
                      <div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-sage/90 block mb-1">{item.label}</span>
                        <span className="text-sm font-medium text-sage leading-snug">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-sage-light font-light text-lg leading-relaxed max-w-xl">
                  Dr. Patil built Ivory & Co. on a single belief — that exceptional dental care should feel nothing like traditional dentistry. Together with her team, she delivers a high standard of oral health to the Nashik community.
                </motion.p>
                
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                  <Magnetic intensity={0.2}>
                    <a href="#booking" className="inline-flex relative px-10 py-5 bg-sage text-ivory overflow-hidden rounded-full justify-center items-center gap-3 hover:scale-105 transition-all duration-500 ease-out shadow-xl group border border-white/10">
                      <span className="relative z-10 font-semibold uppercase tracking-wider text-sm">Read Full Bio & Case Studies</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-clay translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                    </a>
                  </Magnetic>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-24 pt-16 border-t border-stone-dark grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { name: "Dr. Marcus Chen", role: "Specialist Prosthodontist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
                 { name: "Dr. Sarah Jenkins", role: "Periodontal Surgery", img: "https://images.unsplash.com/photo-1594824436998-058a231d6bbd?auto=format&fit=crop&w=400&q=80" },
                 { name: "Dr. Amina Patel", role: "Lead Endodontist", img: "https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&w=400&q=80" }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-stone-dark">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="h4 text-sage">{doc.name}</h4>
                    <p className="font-bold uppercase tracking-widest text-xs text-clay mt-1">{doc.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingCalculator />

        {/* Technology & Clinical Expertise */}
        <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ y: techConsoleY }}
             className="absolute inset-0 z-0 origin-center"
           >
             <img 
               src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80" 
               alt="Advanced digital 3D dental scanning technology" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
               loading="lazy"
               width="1200"
               height="800"
             />
             <div className="absolute inset-0 bg-sage/95"></div>
          </motion.div>
          
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center text-ivory">
             <span className="text-accent text-clay opacity-80 mb-6 md:mb-8 block">Our Technology</span>
             <h2 className="h2 mb-6 md:mb-8">No impressions. No discomfort.<br className="hidden sm:block"/><span className="font-display italic text-clay">Just a perfect digital scan.</span></h2>
             <p className="body-text text-white/90 max-w-2xl mx-auto">
               Our 3D digital scanning technology means we skip the messy putty molds entirely. In under two minutes, we have a perfect model of your teeth — and you can watch it appear on the screen in real time.
             </p>
          </div>
        </section>

        <InteractiveSmileSimulator />

        {/* Treatment Roadmap Builder Hook */}
        <section className="py-20 md:py-24 bg-sage relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-overlay"></div>
          <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <span className="text-accent text-clay mb-4 block">Remove Uncertainty</span>
              <h2 className="h2 text-ivory mb-6">Design your personal<br className="hidden sm:block"/><span className="font-display italic text-clay">treatment roadmap.</span></h2>
              <p className="body-text text-ivory/80 max-w-xl mb-8 mx-auto md:mx-0">
                Answer a few quick questions to generate an estimated journey timeline, from consultation to final results. Gain clarity before you even step in the door.
              </p>
              <Link to="/roadmap" className="inline-flex items-center gap-3 bg-clay text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-ivory hover:text-sage transition-colors duration-500 shadow-lg group">
                Build My Roadmap <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="md:w-5/12 bg-white/15 p-8 md:p-12 rounded-[2rem] border border-white/30 backdrop-blur-md">
               <div className="h-64 relative flex items-center justify-center">
                  <div className="absolute inset-x-8 top-1/2 h-px bg-clay/60 -translate-y-1/2"></div>
                  <div className="w-16 h-16 bg-sage border-2 border-clay rounded-full flex items-center justify-center absolute left-0 z-10 shadow-lg">
                    <span className="text-ivory font-sans font-medium">Wk 1</span>
                  </div>
                  <div className="w-20 h-20 bg-clay rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-20 shadow-[0_0_40px_rgba(186,140,99,0.4)]">
                    <span className="text-ivory font-sans font-medium text-xl">You</span>
                  </div>
                  <div className="w-16 h-16 bg-sage border-2 border-clay/60 rounded-full flex items-center justify-center absolute right-0 z-10 shadow-lg">
                    <span className="text-white/80 font-sans font-medium">Wk 4</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Financial Triage: Insurance Checker Module */}
        <section id="insurance" className="py-20 md:py-24 lg:py-32 bg-ivory text-sage relative overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-6 z-10 relative flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              
              <div className="lg:w-5/12">
                <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-clay mb-8 opacity-80" />
                <h2 className="h2 mb-6 md:mb-8">Do we take your insurance? <br/><span className="font-display italic text-clay">(Probably, yes.)</span></h2>
                <p className="body-text mb-8">
                  Select your provider to see if we're in-network. We handle all the paperwork, billing, and strict benefit optimization.
                </p>
                
                <div className="mt-12 pt-12 border-t border-stone-dark hidden lg:block">
                  <span className="text-accent text-clay mb-6 block">We're in-network with</span>
                  <div className="flex flex-wrap gap-4 items-center opacity-80 hover:opacity-100 transition-opacity duration-700">
                    {["Star Health", "Niva Bupa", "HDFC Ergo", "Mediassist", "CGHS", "ESI"].map((provider) => (
                      <div key={provider} className="px-5 py-3 bg-stone-dark/30 backdrop-blur border border-sage/10 rounded-xl flex items-center justify-center text-sage font-sans font-medium italic text-[1.125rem] tracking-tight transition-transform hover:scale-105 duration-300">
                        {provider}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-7/12 w-full">
                <div className="bg-stone p-8 md:p-12 rounded-[2rem] border border-stone-dark shadow-sm">
                  <span className="text-accent text-sage/80 mb-6 block">Verify Coverage</span>
                  <form onSubmit={handleInsuranceCheck} className="flex flex-col gap-6">
                    <div className="relative w-full">
                      <select 
                        required
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        className="w-full appearance-none bg-transparent border-b-2 border-sage/20 text-sage py-4 pr-12 text-xl font-light focus:outline-none focus:border-clay transition-colors cursor-pointer"
                      >
                        <option value="" disabled>Select your PPO Provider...</option>
                        <option value="starhealth">Star Health</option>
                        <option value="nivabupa">Niva Bupa</option>
                        <option value="hdfcergo">HDFC Ergo</option>
                        <option value="mediassist">Mediassist</option>
                        <option value="cghs">CGHS</option>
                        <option value="other">Other / I'm not sure</option>
                      </select>
                      <ChevronsLeftRight className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-sage/60 rotate-90 pointer-events-none" />
                    </div>
                    <button type="submit" className="bg-sage text-ivory px-10 py-5 rounded-full font-semibold uppercase tracking-wider text-sm shadow-[0_20px_40px_-10px_rgba(42,54,45,0.4)] hover:bg-clay transition-colors duration-500 self-start">
                      Verify Benefits
                    </button>
                  </form>

                  <AnimatePresence>
                    {insuranceChecked && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 bg-ivory p-8 rounded-2xl border border-sage/10"
                      >
                        <h4 className="font-sans font-medium italic text-2xl mb-3 text-sage">
                           Great News! 
                        </h4>
                        <p className="font-light text-base text-sage/80 leading-relaxed">
                           We are fully in-network with {insuranceProvider === 'other' ? 'most major PPOs' : insuranceProvider.charAt(0).toUpperCase() + insuranceProvider.slice(1)}. 
                           Your preventative care is likely 100% covered. <a href="#booking" className="text-clay font-medium hover:underline ml-1">Book your visit now.</a>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Mobile Network list */}
                <div className="mt-12 pt-12 border-t border-stone-dark lg:hidden">
                  <span className="text-accent text-clay mb-6 block">We're in-network with</span>
                  <div className="flex flex-wrap gap-4 items-center opacity-80 hover:opacity-100 transition-opacity duration-700">
                    {["Star Health", "Niva Bupa", "HDFC Ergo", "Mediassist", "CGHS", "ESI"].map((provider) => (
                      <div key={provider} className="px-5 py-3 bg-stone-dark/30 backdrop-blur border border-sage/10 rounded-xl flex items-center justify-center text-sage font-sans font-medium italic text-[1.125rem] tracking-tight transition-transform hover:scale-105 duration-300">
                        {provider}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
           </div>
        </section>

        {/* Subscription Membership Funnel (High ROI Section) */}
        <section id="membership" className="py-20 md:py-32 bg-stone relative">
          <div className="absolute inset-0 bg-sage/5 pointer-events-none"></div>
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <span className="text-accent mb-4 md:mb-6 block">No Insurance? No Problem.</span>
                <h2 className="h2 mb-6 md:mb-8 text-sage">The Ivory <span className="font-display italic text-clay">Elite</span></h2>
                <p className="body-text mb-10 md:mb-12 max-w-lg">
                  Premium care shouldn't depend on restrictive insurance networks. Join our in-house membership for comprehensive preventative care and VIP pricing.
                </p>
                <div className="space-y-6">
                  {['2 Comprehensive Exams & Cleanings', 'All Necessary 3D Digital X-Rays', '1 Emergency Visit Included', '15% Off All Restorative Treatments'].map(text => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0"></div>
                      <span className="text-sage text-lg font-light">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 w-full">
                <div className="bg-sage text-ivory rounded-[3rem] p-12 md:p-16 shadow-[0_40px_80px_-20px_rgba(42,54,45,0.4)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-clay/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-colors duration-1000"></div>
                  
                  <span className="text-clay font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Annual Plan</span>
                  <div className="flex items-end gap-2 mb-12 md:mb-16 relative">
                    <span className="text-[4rem] md:text-[6rem] font-sans font-medium leading-[0.8] text-clay/20 absolute -top-8 md:-top-12 -left-2 md:-left-4 pointer-events-none select-none">₹5000</span>
                    <span className="text-[3rem] md:text-[4.5rem] font-sans font-medium leading-[0.8] relative z-10">₹5000</span>
                    <span className="text-white/80 mb-2 font-light relative z-10">/ year</span>
                  </div>
                  
                  <div className="space-y-6 pt-10 border-t border-white/10 mb-12">
                    <div className="flex justify-between items-center text-lg font-light">
                      <span className="text-white/80">Non-Member Value</span>
                      <span className="line-through text-white/85">₹12000+</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-medium text-clay">
                      <span>Annual Savings</span>
                      <span>₹7000+</span>
                    </div>
                  </div>
                  
                  <Link to="/membership" className="w-full bg-ivory text-sage py-6 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-clay hover:text-white transition-colors duration-500 flex items-center justify-center gap-4">
                    Join The List <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-white/85 mt-6 uppercase tracking-[0.2em]">Cancel anytime. No waiting periods.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* Real-time Booking / Contact Triage */}
        <section id="booking" className="py-20 md:py-24 lg:py-32 bg-ivory relative border-t border-stone-dark">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              <div className="lg:col-span-5 space-y-12 md:space-y-16">
                <div>
                  <span className="text-accent mb-4 md:mb-6 block">Book Your Visit</span>
                  <h2 className="h2 text-sage mb-6 md:mb-8">Ready when<br/><span className="font-display italic text-clay">you are.</span></h2>
                  <p className="body-text">
                    Schedule seamlessly via our digital intake. No hold music, no archaic paperwork. Just smooth, modern healthcare.
                  </p>
                </div>
                
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2 p-6 bg-clay/5 rounded-3xl border border-clay/10">
                    <div className="flex items-center gap-2 text-clay">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm uppercase font-semibold tracking-wider">Limited Slots Available</span>
                    </div>
                    <p className="text-xs text-sage/90 font-medium">We only accept 4 new cosmetic consultations per week to ensure elite attention. 2 slots remaining this week.</p>
                  </div>

                  <div className="flex gap-6 items-start group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-stone-dark group-hover:border-clay flex items-center justify-center transition-colors duration-500 shrink-0">
                      <MapPin className="w-5 h-5 text-sage group-hover:text-clay transition-colors" />
                    </div>
                    <div>
                      <h4 className="h4 text-sage mb-2">The Studio</h4>
                      <p className="text-sage-light font-light leading-relaxed">
                        Ivory & Co., Gangapur Road<br/>Nashik, MH 422005
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-stone-dark group-hover:border-clay flex items-center justify-center transition-colors duration-500 shrink-0">
                      <Clock className="w-5 h-5 text-sage group-hover:text-clay transition-colors" />
                    </div>
                    <div>
                      <h4 className="h4 text-sage mb-2">Hours</h4>
                      <p className="text-sage-light font-light leading-relaxed">
                        Mon - Thu: 8:00 AM - 7:00 PM<br/>
                        Fri: 9:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Container */}
              <div className="lg:col-span-7">
                <div className="bg-stone p-6 md:p-16 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-stone-dark overflow-hidden relative min-h-[600px] flex flex-col justify-center">
                  <BookingForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
