import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { injectSEO } from '../lib/seo';
import { Calendar, Clock, Smile, Stethoscope, ArrowRight, ArrowLeft, Activity, Zap } from 'lucide-react';

export default function Roadmap() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    concern: '',
    severity: '',
    timeline: '',
    sensitivity: ''
  });

  const [roadmap, setRoadmap] = useState<{title: string, duration: string, steps: string[]} | null>(null);

  React.useEffect(() => {
    injectSEO({
      title: "Smile Roadmap Builder | Ivory & Co. Elite Dental",
      description: "Map out your custom dental transformation journey with our interactive roadmap builder.",
      path: "/roadmap"
    });
  }, []);

  const generateRoadmap = () => {
    // Logic to generate roadmap based on clinical typicals.
    let title = "Comprehensive Restoration";
    let duration = "3-5 Weeks";
    let steps = [
      "Week 1: Comprehensive Baseline Exam & 3D Imaging",
      "Week 2: Digital Smile Design Review & Preparatory Work",
      "Week 4: Final Placement & Adjustments",
      "Month 3: Healing Verification & Maintenance Check"
    ];

    if (answers.concern === 'alignment') {
      title = "Orthodontic Realignment Journey";
      duration = "6-12 Months";
      steps = [
        "Week 1: 3D Scan & Alignment Simulation",
        "Week 3: Delivery of First Aligner Set",
        "Monthly: Progress Tracking & Aligner Switches",
        "Final Month: Retainer Fitting & Professional Whitening"
      ];
    } else if (answers.concern === 'cosmetic') {
      title = "Esthetic Veneer Transformation";
      duration = "2-4 Weeks";
      steps = [
        "Week 1: Aesthetic Consultation & Try-in Smile",
        "Week 2: Gentle Preparation & Provisional Veneers",
        "Week 3: Fitting of Mastercraft Porcelain Veneers",
        "Week 4: Final Polish & Photo Reveal"
      ];
    }

    if (answers.sensitivity === 'high') {
       steps.splice(1, 0, "Pre-treatment: Desensitization Protocol & Comfort Planning");
    }

    setRoadmap({ title, duration, steps });
    setStep(5);
  };

  const handleNext = () => {
    if (step === 4) {
      generateRoadmap();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="bg-stone min-h-screen font-sans text-sage selection:bg-clay selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-sage hover:text-clay transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-16">
            <span className="text-accent text-clay block mb-4">Journey Planner</span>
            <h1 className="h1 text-sage mb-4 md:mb-6">Treatment Roadmap</h1>
            <p className="text-lg md:text-xl text-sage font-light max-w-2xl mx-auto">
              Remove the uncertainty from your transformation. Tell us about your goals, and we'll outline your anticipated clinical journey.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sage/10 relative overflow-hidden min-h-[400px]">
            {/* Progress Bar (Only show during questions) */}
            {step < 5 && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-sage/20">
                <motion.div 
                  className="h-full bg-clay"
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="q1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 h-full flex flex-col justify-center">
                  <h2 className="h3 text-sage text-center mb-8">What is your primary clinical concern?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'alignment', label: 'Crooked or Spaced Teeth' },
                      { id: 'cosmetic', label: 'Color, Shape, or Chips' },
                      { id: 'function', label: 'Pain, Wear, or Missing Teeth' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setAnswers({...answers, concern: opt.id}); setTimeout(handleNext, 300); }}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          answers.concern === opt.id ? 'border-clay shadow-md bg-clay/5' : 'border-sage/20 bg-white/80 hover:bg-white hover:border-clay/50 shadow-sm'
                        }`}
                      >
                        <span className="font-semibold text-clay">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="q2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 h-full flex flex-col justify-center">
                  <h2 className="h3 text-sage text-center mb-8">How significant is this issue to your daily life?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'mild', label: 'Minor Annoyance' },
                      { id: 'moderate', label: 'Noticeable Impact' },
                      { id: 'severe', label: 'Affects Function/Confidence heavily' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setAnswers({...answers, severity: opt.id}); setTimeout(handleNext, 300); }}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          answers.severity === opt.id ? 'border-clay shadow-md bg-clay/5' : 'border-white/50 bg-white/20 hover:bg-white/40'
                        }`}
                      >
                        <span className="font-semibold text-clay">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="q3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 h-full flex flex-col justify-center">
                  <h2 className="h3 text-sage text-center mb-8">Do you experience dental anxiety or sensitivity?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                    {[
                      { id: 'low', label: 'Rarely, I feel comfortable at the dentist.' },
                      { id: 'high', label: 'Yes, I usually require extra comfort measures.' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setAnswers({...answers, sensitivity: opt.id}); setTimeout(handleNext, 300); }}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          answers.sensitivity === opt.id ? 'border-clay shadow-md bg-clay/5' : 'border-white/50 bg-white/20 hover:bg-white/40'
                        }`}
                      >
                        <span className="font-semibold text-clay">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="q4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 h-full flex flex-col justify-center">
                  <h2 className="h3 text-sage text-center mb-8">What is your ideal timeline for completion?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'asap', label: 'As soon as possible' },
                      { id: 'upcoming', label: 'Event in 3-6 months' },
                      { id: 'flexible', label: 'Exploring options logically' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setAnswers({...answers, timeline: opt.id}); setTimeout(handleNext, 300); }}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          answers.timeline === opt.id ? 'border-clay shadow-md bg-clay/5' : 'border-white/50 bg-white/20 hover:bg-white/40'
                        }`}
                      >
                        <span className="font-semibold text-clay">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && roadmap && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="text-center mb-12 border-b border-sage/10 pb-8">
                    <h2 className="h3 text-clay mb-4">{roadmap.title}</h2>
                    <div className="flex items-center justify-center gap-2 text-sage/80 font-medium">
                      <Clock className="w-5 h-5 text-clay" />
                      Estimated Duration: {roadmap.duration}
                    </div>
                  </div>

                  <div className="relative pl-8 md:pl-0">
                    {/* Vertical Line */}
                    <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-px bg-clay/50 md:-translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                      {roadmap.steps.map((stepText, idx) => (
                        <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full md:even:flex-row-reverse group">
                          {/* Circle on timeline */}
                          <div className="absolute left-[-32px] md:left-1/2 w-4 h-4 bg-clay rounded-full border-4 border-stone md:-translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125"></div>
                          
                          <div className="md:w-[45%] bg-white p-6 rounded-2xl border border-sage/10 shadow-lg w-full">
                            <span className="font-semibold text-clay block leading-relaxed text-lg">{stepText}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 text-center bg-clay/5 p-6 rounded-2xl border border-clay/20">
                    <p className="text-sm text-sage font-medium italic mb-6">
                      * This is an estimated roadmap designed to provide clarity. Precise timelines are finalized after an in-person clinical evaluation.
                    </p>
                    <a href="/#booking" className="bg-clay text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-sage transition-colors shadow-lg shadow-clay/20">
                      Book Consultation <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
