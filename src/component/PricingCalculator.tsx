import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronRight, Check } from 'lucide-react';

type Treatment = 'veneers' | 'invisalign' | 'implants';

export default function PricingCalculator() {
  const [treatment, setTreatment] = useState<Treatment>('veneers');
  const [units, setUnits] = useState(8);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculatePrice = () => {
    let total = 0;
    if (treatment === 'veneers') total = units * 12000; // ₹12,000 per veneer
    if (treatment === 'invisalign') total = 85000; // Flat fee avg
    if (treatment === 'implants') total = units * 25000; // ₹25,000 per implant

    return total;
  };

  const total = calculatePrice();
  const monthly = Math.floor(total / 36); // Approx 36 month financing

  return (
    <section className="py-24 md:py-32 bg-stone relative overflow-hidden" id="pricing">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-5">
          <span className="text-accent text-clay mb-6 block">Transparent Investment</span>
          <h2 className="h2 text-sage mb-6 md:mb-8">
            No surprise<br className="hidden md:block"/><span className="font-display italic text-clay">bills.</span>
          </h2>
          <p className="body-text mb-10 md:mb-12">
            We believe in complete financial transparency. Use our calculator to get an initial estimate of your investment before you even sit in the chair.
          </p>

          <div className="space-y-4 md:space-y-6">
            {['Flexible 0% financing for up to 24 months', 'In-network with major PPO plans', 'FSA/HSA accepted forms of payment'].map((perk, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-sage/5 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-clay" />
                </div>
                <span className="text-sage text-sm md:text-base font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="bg-ivory rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-dark relative overflow-hidden">
            <h3 className="h3 text-sage mb-6 md:mb-8">Payment Estimator</h3>
            
            <div className="space-y-8">
              {/* Treatment Selection */}
              <div>
                <label className="text-sm uppercase font-semibold tracking-wider text-clay mb-4 block">Select Treatment</label>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    { id: 'veneers', label: 'Veneers' },
                    { id: 'invisalign', label: 'Invisalign' },
                    { id: 'implants', label: 'Implants' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTreatment(t.id as Treatment)}
                      className={`py-3 md:py-4 px-2 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                        treatment === t.id 
                          ? 'bg-sage text-ivory border-sage' 
                          : 'bg-transparent text-sage border-stone-dark hover:border-clay'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Range Slider (Only for Veneers and Implants) */}
              <AnimatePresence mode="popLayout">
                {treatment !== 'invisalign' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-end">
                      <label className="text-sm uppercase font-semibold tracking-wider text-clay block">
                        Estimated Units (Teeth)
                      </label>
                      <span className="h3 font-medium text-sage">{units}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      value={units} 
                      onChange={(e) => setUnits(parseInt(e.target.value))}
                      className="w-full accent-clay h-2 bg-stone rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-sage/80 font-medium">
                      <span>1</span>
                      <span>12+</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <div className="pt-8 border-t border-stone-dark mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                  <div>
                    <span className="text-sm uppercase font-semibold tracking-wider text-sage-light block mb-2">Estimated Total</span>
                    <div className="h1 md:text-5xl text-sage">
                      ₹{total.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <span className="text-sm uppercase font-semibold tracking-wider text-clay block mb-2">Or As Low As</span>
                    <div className="h2 text-clay">
                      ₹{monthly}<span className="text-lg text-sage-light font-sans italic">/mo</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-sage-light/85 font-light leading-relaxed mb-8">
                  * This is an estimate based on average clinical cases. Actual pricing varies based on individual anatomical needs, bone grafting requirements, and exact materials chosen.
                </p>

                <a href="#booking" className="w-full py-5 bg-sage text-ivory rounded-full font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2 hover:bg-clay transition-colors duration-500">
                  <Calculator className="w-4 h-4" /> Schedule Final Quote
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
