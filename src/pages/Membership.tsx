import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { injectSEO } from '../lib/seo';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';

export default function Membership() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    members: 1,
    frequency: 'bi-annual',
    whitening: false,
    emergency: false
  });

  React.useEffect(() => {
    injectSEO({
      title: "Concierge Dental Care | Ivory & Co. Elite Dental",
      description: "Join our exclusive concierge dental care membership for predictable, premium oral health.",
      path: "/membership"
    });
  }, []);

  const calculatePrice = () => {
    let base = formData.members * (formData.frequency === 'bi-annual' ? 60000 : 90000);
    if (formData.whitening) base += (formData.members * 15000);
    if (formData.emergency) base += (formData.members * 10000);
    return base;
  };

  const calculateSavings = () => {
    return formData.members * 25000; // Estimated savings per member vs unbundled
  };

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="bg-stone min-h-screen font-sans text-sage selection:bg-clay selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          
          <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold text-sage hover:text-clay transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-sage block mb-4">Elite Prevention</span>
            <h1 className="h1 text-sage mb-4 md:mb-6">Concierge Dental Care</h1>
            <p className="text-lg md:text-xl text-sage/80 font-light">
              Predictable costs. Priority scheduling. Complete peace of mind.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sage/10 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/30">
              <motion.div 
                className="h-full bg-clay"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="h3 text-sage">1. Household Size</h2>
                  <div className="space-y-4">
                    <label className="text-sm uppercase tracking-wider font-semibold text-sage block">Number of Members</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          onClick={() => setFormData({ ...formData, members: num })}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-sans font-medium transition-all ${
                            formData.members === num 
                              ? 'bg-clay text-white shadow-md scale-105' 
                              : 'bg-white text-sage hover:bg-stone/50 border border-sage/20 hover:border-clay/50 shadow-sm'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        onClick={() => setFormData({ ...formData, members: 5 })}
                        className={`px-6 h-16 rounded-2xl flex items-center justify-center text-lg font-sans font-medium transition-all ${
                          formData.members === 5 
                            ? 'bg-clay text-white shadow-md scale-105' 
                            : 'bg-white/50 text-sage hover:bg-white border border-white/20'
                        }`}
                      >
                        5+
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-sage/10 text-right">
                    <button onClick={handleNext} className="bg-clay text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-sage transition-colors">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="h3 text-sage">2. Coverage Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      onClick={() => setFormData({ ...formData, frequency: 'bi-annual' })}
                      className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                        formData.frequency === 'bi-annual' 
                          ? 'border-clay shadow-md bg-clay/5' 
                          : 'border-sage/20 bg-white hover:border-clay/50 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-clay text-lg">Essential Care</h3>
                        {formData.frequency === 'bi-annual' && <Check className="w-5 h-5 text-clay" />}
                      </div>
                      <p className="text-sage/80 text-sm">2 professional cleanings & exams per year per member.</p>
                    </div>

                    <div 
                      onClick={() => setFormData({ ...formData, frequency: 'tri-annual' })}
                      className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                        formData.frequency === 'tri-annual' 
                          ? 'border-clay shadow-md bg-clay/5' 
                          : 'border-white/50 bg-white/20 hover:bg-white/40'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-clay text-lg">Optimal Care</h3>
                        {formData.frequency === 'tri-annual' && <Check className="w-5 h-5 text-clay" />}
                      </div>
                      <p className="text-sage/80 text-sm">3 professional cleanings & exams per year per member. Recommended for coffee/tea drinkers.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-sage">Add-on Privileges</h3>
                    
                    <label className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer hover:bg-stone/50 border border-sage/10 hover:border-clay/30 shadow-sm transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-clay accent-clay rounded border-sage/30"
                        checked={formData.whitening}
                        onChange={(e) => setFormData({ ...formData, whitening: e.target.checked })}
                      />
                      <div>
                        <span className="block font-semibold text-clay">Annual Laser Whitening</span>
                        <span className="text-sm text-sage/80">Keep your smile brilliantly white year-round.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer hover:bg-stone/50 border border-sage/10 hover:border-clay/30 shadow-sm transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-clay accent-clay rounded border-sage/30"
                        checked={formData.emergency}
                        onChange={(e) => setFormData({ ...formData, emergency: e.target.checked })}
                      />
                      <div>
                        <span className="block font-semibold text-clay">24/7 Priority Emergency Access</span>
                        <span className="text-sm text-sage/80">Direct line to a doctor after hours.</span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-8 border-t border-sage/10 flex justify-between">
                    <button onClick={handlePrev} className="text-sm font-semibold uppercase tracking-wider text-sage hover:text-clay transition-colors px-4 py-2">
                      Back
                    </button>
                    <button onClick={handleNext} className="bg-clay text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-sage transition-colors">
                      View Summary <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <ShieldCheck className="w-12 h-12 text-clay mx-auto mb-4" />
                    <h2 className="h3 text-clay">Your Concierge Plan</h2>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 border border-sage/10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-stone/50 rounded-full blur-[40px] -z-10 translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="flex justify-between items-end mb-8 border-b border-sage/10 pb-8">
                      <div>
                        <p className="text-sm uppercase tracking-wider font-semibold text-sage mb-2">Annual Investment</p>
                        <p className="text-[2.25rem] md:text-4xl text-clay">
                          ₹{(calculatePrice() / 12).toLocaleString()}<span className="text-lg text-sage/80 font-medium">/mo</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm uppercase tracking-wider font-semibold text-sage mb-2">Est. Annual Savings</p>
                        <p className="text-2xl text-sage">₹{calculateSavings().toLocaleString()}</p>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                        <span className="text-sage font-medium">{formData.members} Member{formData.members > 1 ? 's' : ''} Covered</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                        <span className="text-sage font-medium">{formData.frequency === 'bi-annual' ? '2' : '3'} Professional Cleanings & Exams per year</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                        <span className="text-sage font-medium">Any needed x-rays included</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                        <span className="text-sage font-medium">15% courtesy savings on restorative & cosmetic procedures</span>
                      </li>
                      {formData.whitening && (
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                          <span className="text-sage font-medium">Annual Laser Whitening included</span>
                        </li>
                      )}
                      {formData.emergency && (
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                          <span className="text-sage font-medium">24/7 Priority Emergency Access included</span>
                        </li>
                      )}
                    </ul>

                  </div>

                  <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <button onClick={handlePrev} className="text-sm font-semibold uppercase tracking-wider text-sage hover:text-clay transition-colors px-4 py-2 order-2 md:order-1">
                      Edit Plan
                    </button>
                    <button className="w-full md:w-auto bg-clay text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-sage transition-colors order-1 md:order-2 shadow-lg shadow-clay/20">
                      <CreditCard className="w-4 h-4" /> Secure Checkout
                    </button>
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
