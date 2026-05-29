import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { injectSEO } from '../lib/seo';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Filter, ArrowLeft } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: "Complete Smile Makeover",
    category: "Veneers",
    problem: "Severe discoloration and uneven spacing.",
    solution: "10 ultra-thin porcelain veneers.",
    beforeImg: "https://i.ibb.co/G4Xy0jwr/Chat-GPT-Image-May-9-2026-11-45-06-PM.png",
    afterImg: "https://i.ibb.co/XrRRL71S/Chat-GPT-Image-May-9-2026-11-46-48-PM.png"
  },
  {
    id: 2,
    title: "Orthodontic Realignment",
    category: "Aligners",
    problem: "Crowding and mild overbite.",
    solution: "8 months of invisible aligners.",
    beforeImg: "https://images.unsplash.com/photo-1598256989445-6bedfb461bea?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Restorative Implants",
    category: "Implants",
    problem: "Missing premolar causing bite shift.",
    solution: "Single titanium implant with custom crown.",
    beforeImg: "https://i.ibb.co/TMvGM8Rm/Chat-GPT-Image-May-9-2026-11-40-16-PM.png",
    afterImg: "https://i.ibb.co/pFhwMrV/Chat-GPT-Image-May-9-2026-11-41-22-PM.png"
  },
  {
    id: 4,
    title: "Cosmetic Bonding",
    category: "Bonding",
    problem: "Chipped front incisor.",
    solution: "Direct composite bonding.",
    beforeImg: "https://i.ibb.co/7Nj8FWnc/Chat-GPT-Image-May-9-2026-10-59-43-PM.png",
    afterImg: "https://i.ibb.co/Sq0qJPV/Chat-GPT-Image-May-9-2026-11-01-41-PM.png"
  }
];

const categories = ["All", "Veneers", "Aligners", "Implants", "Bonding"];

export default function Cases() {
  const [activeCategory, setActiveCategory] = useState("All");

  React.useEffect(() => {
    injectSEO({
      title: "Clinical Case Studies | Ivory & Co. Elite Dental",
      description: "Browse our portfolio of smile transformations categorized by treatment type.",
      path: "/cases"
    });
  }, []);

  const filteredCases = activeCategory === "All" 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  return (
    <div className="bg-stone min-h-screen font-sans text-sage selection:bg-clay selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-sage hover:text-clay transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="mb-16 md:mb-24 text-center">
            <span className="text-accent text-clay block mb-4">Before & After</span>
            <h1 className="h1 text-sage mb-4 md:mb-6">Clinical Case Studies</h1>
            <p className="text-lg md:text-xl text-sage/80 max-w-2xl mx-auto font-light">
              Explore our portfolio of transformations. Filter by concern to see what's possible for your smile.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 text-sage/80 mb-4 md:mb-0 md:mr-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Filter by:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-clay text-white shadow-md' 
                      : 'bg-white text-sage border border-sage/10 hover:border-clay/50 hover:bg-stone/50 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((caseStudy) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={caseStudy.id}
                  className="bg-white rounded-3xl overflow-hidden p-6 shadow-md border border-sage/10 hover:shadow-xl transition-colors duration-500"
                >
                  <div className="mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-clay bg-clay/10 px-3 py-1 rounded-full inline-block mb-4">
                      {caseStudy.category}
                    </span>
                    <h3 className="h4 text-clay mb-2">{caseStudy.title}</h3>
                    <div className="flex flex-col gap-1 text-sm font-medium text-sage/80">
                      <p><strong className="text-sage">Concern:</strong> {caseStudy.problem}</p>
                      <p><strong className="text-sage">Solution:</strong> {caseStudy.solution}</p>
                    </div>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <BeforeAfterSlider beforeImage={caseStudy.beforeImg} afterImage={caseStudy.afterImg} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
