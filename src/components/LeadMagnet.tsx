import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Download, Check } from 'lucide-react';

export default function LeadMagnet() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const scrollDelay = setTimeout(() => {
      setCanShow(true);
    }, 5000); // Prevent showing in the first 5 seconds
    
    return () => clearTimeout(scrollDelay);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling down 2 viewport heights (past hero and intro)
      if (canShow && window.scrollY > window.innerHeight * 3.5 && !isDismissed && !submitted) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed, submitted, canShow]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await emailjs.send(
        'service_7v5k4zg',
        'template_qneedoa',
        {
          to_email: email,
          to_name: 'Future Patient',
          guide_link: `https://ivory-co-elite-dental-studio.vercel.app/guide-veneers.html`,
          booking_link: `https://ivory-co-elite-dental-studio.vercel.app/#booking`,
          from_name: 'Ivory & Co. Elite Dental Studio'
        },
        'tSqSrskIk2nH58LJf'
      );
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 50 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100%-2rem)] md:w-72 bg-white shadow-2xl rounded-2xl z-50 overflow-hidden border border-stone-dark/10"
        >
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 w-8 h-8 bg-stone/50 hover:bg-stone rounded-full flex items-center justify-center text-sage transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="p-6 relative">
            <div className="w-12 h-12 bg-clay/10 text-clay rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>

            {!submitted ? (
              <div className="space-y-3">
                <h4 className="h5 text-clay leading-tight">The Modern Guide to Esthetic Veneers</h4>
                <p className="text-xs font-light text-sage/80 leading-relaxed text-balance">
                  Understand the materials and timeline. Enter your email for the free PDF guide.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    required
                    className="w-full bg-stone px-3 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-clay/30 border border-transparent focus:border-clay/30 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || submitted}
                    className="w-full bg-clay text-white px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase hover:bg-sage transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending...' : submitted ? 'Guide Sent ✓' : error ? 'Try Again' : 'Download Free Guide'}
                  </button>
                  {error && (
                    <p style={{fontSize:'11px', color:'#ef4444', marginTop:'8px', textAlign:'center'}}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-4"
              >
                <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center text-sage mx-auto mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="h5 text-clay mb-2">Sent via Email</h4>
                <p className="text-xs text-sage/80 font-light text-balance">Check your inbox shortly for the guide.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
