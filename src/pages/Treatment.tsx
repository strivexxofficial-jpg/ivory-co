import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { injectSEO } from '../lib/seo';

const treatmentsData = {
  veneers: {
    title: "Porcelain Veneers",
    tagline: "The definitive smile makeover.",
    description: "Ultra-thin, custom-crafted porcelain bound to the front of your teeth. Correct gaps, chips, profound discoloration, and minor misalignment in just two visits.",
    price: "From ₹12,000 / tooth",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Stain-resistant porcelain matched perfectly to your ideal shade.",
      "Requires minimal to no tooth preparation (enamel preservation).",
      "Lasts 10-15+ years with proper maintenance.",
      "Designed digitally so you get a precise preview before we begin."
    ],
    beforeImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    seoDescription: "Premium porcelain veneers in Nashik. Custom-crafted smile makeovers designed for aesthetic perfection and clinical longevity."
  },
  invisalign: {
    title: "Invisalign® Clear Aligners",
    tagline: "Straighten invisibly.",
    description: "The gold standard in discreet orthodontic correction. Custom-mapped digital aligners shift your teeth precisely over time without wires or brackets.",
    price: "₹85,000 Average Complete Case",
    image: "https://images.unsplash.com/photo-1598256989445-6bedfb461bea?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Virtually invisible clear plastic trays.",
      "Removable for eating, brushing, and special occasions.",
      "Track your progress digitally with the iTero 5D scanner.",
      "Fewer office visits required compared to traditional braces."
    ],
    beforeImg: "https://images.unsplash.com/photo-1598256989445-6bedfb461bea?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    seoDescription: "Diamond-level Invisalign providers in Nashik. Straighten your smile discreetly and comfortably with 3D digital precision."
  },
  implants: {
    title: "Dental Implants",
    tagline: "Permanent foundations.",
    description: "The closest thing to a natural tooth. A titanium post fuses with your jawbone to support a lifelike porcelain crown, restoring 100% of your bite force and aesthetic confidence.",
    price: "From ₹25,000 complete",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=80",
    benefits: [
      "Prevents bone loss that occurs when teeth are missing.",
      "Functions and feels exactly like a natural tooth.",
      "No impact or damage to adjacent healthy teeth.",
      "Guided surgery ensures absolute precision and faster healing."
    ],
    beforeImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    seoDescription: "Advanced dental implant surgery in Nashik. Restore missing teeth securely with biocompatible implants and lifelike porcelain crowns."
  }
};

export default function Treatment() {
  const { id } = useParams();
  
  const treatment = id && treatmentsData[id as keyof typeof treatmentsData] 
    ? treatmentsData[id as keyof typeof treatmentsData] 
    : treatmentsData['veneers']; // Default fallback

  useEffect(() => {
    window.scrollTo(0, 0);
    injectSEO({
      title: `${treatment.title} | Ivory & Co. Dental`,
      description: treatment.seoDescription,
      path: `/treatments/${id}`
    });
  }, [treatment, id]);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-ivory min-h-screen text-sage selection:bg-sage selection:text-ivory">
      <Navbar />
      
      <main className="pt-[100px]">
        {/* Treatment Hero */}
        <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-stone">
          <div className="absolute inset-0 z-0">
            <img 
              src={treatment.image} 
              alt={treatment.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-[1400px] w-full px-6 text-center pt-12 md:pt-0">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="h1 text-sage mb-4 md:mb-6"
            >
              {treatment.title.split(' ')[0]}<br />
              <span className="italic text-clay">{treatment.title.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sage font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
            >
              {treatment.tagline}
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 md:py-32 bg-ivory">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-8">
            <div className="lg:col-span-5 lg:pr-12">
              <span className="text-accent text-clay mb-4 md:mb-6 block">The Details</span>
              <h2 className="h2 text-sage mb-6 md:mb-8">
                Is this right <span className="font-display italic text-clay">for you?</span>
              </h2>
              <p className="body-text mb-8 md:mb-8">
                {treatment.description}
              </p>
              
              <div className="p-6 md:p-8 rounded-[2rem] border border-stone-dark bg-stone/50 mb-10">
                <span className="block text-xs md:text-sm uppercase font-semibold tracking-wider text-clay mb-2">Investment Estimate</span>
                <span className="block h4 text-sage leading-tight">{treatment.price}</span>
                <span className="block text-[11px] md:text-xs uppercase font-bold text-sage-light/85 mt-4 tracking-widest">0% Financing Available</span>
              </div>

              <Link 
                to="/#booking"
                className="inline-flex group px-8 py-4 bg-sage text-ivory rounded-full shadow-xl items-center gap-3 hover:scale-105 transition-all duration-300"
              >
                <span className="font-semibold uppercase tracking-wider text-sm">Consultation Needed</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-clay" />
              </Link>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <span className="text-accent text-clay mb-6 block">Clinical Advantages</span>
              <div className="space-y-6 md:space-y-8">
                {treatment.benefits.map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex gap-5"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone flex items-center justify-center shrink-0 border border-stone-dark mt-1">
                      <Check className="w-4 h-4 text-clay" />
                    </div>
                    <p className="text-sage text-lg font-light leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Slider */}
        <section className="py-20 md:py-32 bg-stone border-t border-stone-dark">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12 md:mb-16 text-center">
              <span className="text-accent text-clay mb-4 block">Proven Outcomes</span>
              <h2 className="h2 text-sage md:mb-4">See the <span className="font-display italic text-clay">Difference.</span></h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider beforeImage={treatment.beforeImg} afterImage={treatment.afterImg} />
            </div>
            
            <div className="mt-16 text-center">
              <Link 
                to="/#booking"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-sage hover:text-clay transition-colors"
              >
                Start Your Transformation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
