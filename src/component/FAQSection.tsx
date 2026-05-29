import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is the procedure painful?",
    answer: "Pain is the primary reason people avoid the dentist, which is why we've pioneered a 'Comfort First' protocol. We use computer-controlled local anesthesia for precise, painless numbing, and offer various sedation levels for a completely stress-free experience."
  },
  {
    question: "Do you offer transparent pricing and financing?",
    answer: "Yes. Excellence shouldn't be a mystery. We provide a complete, transparent breakdown of costs before any work begins. We offer 0% interest financing for up to 24 months through multiple providers to ensure the investment fits your lifestyle."
  },
  {
    question: "How long is the recovery for veneers or implants?",
    answer: "Most patients return to work the very next day. While there might be minor sensitivity for 48 hours, our minimally invasive techniques significantly reduce inflammation and downtime compared to traditional methods."
  },
  {
    question: "How many visits does a total transformation require?",
    answer: "Every case is unique, but our efficiency-first approach typically completes a full porcelain transformation in just 2-3 visits. We minimize your clinic time without ever compromising the artisanal quality of the results."
  },
  {
    question: "Do you take my insurance?",
    answer: "We are in-network with all major PPO providers including Star Health, Niva Bupa, HDFC Ergo, Mediassist, and CGHS. Our concierge team handles 100% of the paperwork so you can focus on your recovery."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-stone">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center md:text-left mb-16 md:mb-20">
           <span className="text-accent text-clay mb-4 md:mb-6 block">Common Questions</span>
           <h2 className="h2 text-sage">Clarity Before<br className="hidden md:block"/><span className="font-display italic text-clay">You Commit.</span></h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-stone-dark pb-6 ${index === 0 ? 'border-t pt-6' : ''}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left group gap-8"
              >
                <h3 className={`h4 transition-colors duration-300 ${openIndex === index ? 'text-clay italic' : 'text-sage group-hover:text-clay/80'}`}>
                  {faq.question}
                </h3>
                <div className="w-10 h-10 rounded-full border border-stone-dark flex items-center justify-center shrink-0 text-sage group-hover:border-clay transition-all">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 text-sage-light text-lg font-light leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
