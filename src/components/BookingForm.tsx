import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronsLeftRight } from 'lucide-react';
import { createBooking } from '../lib/booking';
import { trackFormStart, trackFormSubmit } from '../lib/analytics';

/*
 * MAKE.COM AUTOMATION: PIPELINE A (Patient Intake & PIN Gen)
 * ----------------------------------------------------------
 * Your non-technical co-founder can replicate this virtual intake form entirely via WhatsApp
 * with the following Make.com scenario:
 * 
 * 1. Trigger: WhatsApp Business -> "Watch New Messages"
 * 2. Action: Google GenAI -> "Prompt: Extract patient_name, phone, and service from this message into strict JSON"
 * 3. Action: JSON -> "Parse JSON" (maps the AI output variables to Make data)
 * 4. Action: Tools -> Math -> Generate a random 4-digit number (e.g. {{ floor(random * 8999) + 1000 }} for the PIN)
 * 5. Action: Supabase -> "Insert Row" -> patients table (Map name, phone, service, PIN)
 * 6. Action: WhatsApp Business -> "Send Message" -> Reply with their portal URL (https://your-domain.com/portal) and their secure PIN.
 */

export const bookingSchema = z.object({
  patientName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  date: z.string().min(1, "Please select a date"),
  service: z.string().min(1, "Please select a service"),
});
export type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data: BookingFormData) => {
    setBookingStatus('submitting');
    try {
      const confId = await createBooking(data);
      setBookingStatus('success');
      trackFormSubmit(data.service);
      reset();
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingStatus('error');
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-10 pb-6 border-b border-stone-dark absolute top-10 left-10 md:left-16 right-10 md:right-16 z-20">
        <div className={`flex-1 h-1 rounded-full transition-colors duration-1000 ${bookingStatus !== 'success' ? 'bg-clay' : 'bg-stone-dark'}`}></div>
        <div className={`flex-1 h-1 rounded-full transition-colors duration-1000 ${bookingStatus === 'submitting' || bookingStatus === 'success' ? 'bg-clay shadow-[0_0_15px_rgba(194,168,120,0.5)]' : 'bg-stone-dark'}`}></div>
        <div className={`flex-1 h-1 rounded-full transition-colors duration-1000 ${bookingStatus === 'success' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-stone-dark'}`}></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 group/form mt-12 relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {bookingStatus === 'idle' && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label htmlFor="patientName" className="text-sm uppercase tracking-wider font-semibold text-sage">Legal Name</label>
                  <input 
                    id="patientName"
                    {...register('patientName')}
                    onFocus={() => trackFormStart()}
                    className={`w-full bg-transparent border-b ${errors.patientName ? 'border-red-400' : 'border-sage/20'} py-4 focus:outline-none focus:border-clay transition-all text-sage text-lg font-light placeholder:text-sage/80`}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="email" className="text-sm uppercase tracking-wider font-semibold text-sage">Email Address</label>
                  <input 
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-sage/20'} py-4 focus:outline-none focus:border-clay transition-all text-sage text-lg font-light placeholder:text-sage/80`}
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label htmlFor="phone" className="text-sm uppercase tracking-wider font-semibold text-sage">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-sage/20'} py-4 focus:outline-none focus:border-clay transition-all text-sage text-lg font-light placeholder:text-sage/80`}
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="date" className="text-sm uppercase tracking-wider font-semibold text-sage">Preferred Date</label>
                  <input 
                    id="date"
                    type="date"
                    {...register('date')}
                    className={`w-full bg-transparent border-b ${errors.date ? 'border-red-400' : 'border-sage/20'} py-4 focus:outline-none focus:border-clay transition-all text-sage-light text-lg font-light uppercase`}
                  />
                </div>
              </div>

              <div className="space-y-4 relative">
                <label htmlFor="service" className="text-sm uppercase tracking-wider font-semibold text-sage">Reason for Visit</label>
                <select 
                  id="service"
                  {...register('service')}
                  className={`w-full bg-transparent border-b ${errors.service ? 'border-red-400' : 'border-sage/20'} py-4 focus:outline-none focus:border-clay transition-all text-sage text-lg font-light appearance-none cursor-pointer`}
                >
                  <option value="">Select a reason...</option>
                  <option value="new_patient">New Patient Exam + Cleaning</option>
                  <option value="consult_cosmetic">Cosmetic Consultation (Veneers/Whitening)</option>
                  <option value="consult_ortho">Orthodontic Consultation (Invisalign)</option>
                  <option value="emergency">Emergency Dental Pain</option>
                  <option value="other">Other</option>
                </select>
                <ChevronsLeftRight className="absolute right-0 top-12 w-5 h-5 text-sage/90 rotate-90 pointer-events-none" />
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-sage text-ivory py-6 rounded-full font-semibold uppercase tracking-wider text-sm sm:text-sm hover:bg-clay transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(42,54,45,0.4)]"
                >
                  Secure Consult Selection <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {bookingStatus === 'submitting' && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-12 absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 bg-stone z-10"
            >
              <div className="w-20 h-20 border-4 border-sage/10 border-t-clay rounded-full animate-spin"></div>
              <div>
                <h3 className="h3 text-sage mb-2">Confirming your appointment...</h3>
                <p className="text-sage-light font-light max-w-xs mx-auto">We're reserving your slot and will send a confirmation to your email.</p>
              </div>
            </motion.div>
          )}

          {bookingStatus === 'success' && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 bg-stone z-10"
            >
              <div className="w-24 h-24 bg-green-100/50 rounded-full flex items-center justify-center mb-2 border border-green-200">
                 <Check className="w-10 h-10 text-green-600 drop-shadow-md" />
              </div>
              <div>
                <h3 className="h3 text-sage mb-3">Appointment Requested.</h3>
                <p className="text-sage-light text-lg font-light max-w-md mx-auto">You're all set. Our front desk will reach out within 10 minutes to confirm your time.</p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-stone-dark w-full max-w-md text-center shadow-sm mt-4">
                <Check className="w-10 h-10 text-green-500 mx-auto mb-4" />
                <p className="text-sage font-light text-lg">A confirmation has been sent to your email.</p>
              </div>

              <button 
                type="button"
                onClick={() => setBookingStatus('idle')}
                className="text-sage font-semibold uppercase tracking-wider text-sm hover:text-clay transition-all duration-300 border-b border-sage/20 hover:border-clay pb-1 mt-6"
              >
                Return to Selection
              </button>
            </motion.div>
          )}

          {bookingStatus === 'error' && (
            <motion.div 
              key="step-error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 bg-stone z-10"
            >
              <div className="w-24 h-24 bg-red-100/50 rounded-full flex items-center justify-center mb-2 border border-red-200">
                 <span className="text-4xl">!</span>
              </div>
              <div>
                <h3 className="h3 text-sage mb-3">Booking Failed.</h3>
                <p className="text-red-500 text-lg font-light max-w-md mx-auto">Something went wrong. Please call us directly at +91 98765 43210.</p>
              </div>

              <button 
                type="button"
                onClick={() => setBookingStatus('idle')}
                className="text-sage font-semibold uppercase tracking-wider text-sm hover:text-clay transition-all duration-300 border-b border-sage/20 hover:border-clay pb-1 mt-6"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
