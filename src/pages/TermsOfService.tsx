import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service — Ivory & Co.";
  }, []);

  return (
    <div className="min-h-screen bg-stone text-sage font-sans">
      <Navbar />
      
      <main className="max-w-[1000px] mx-auto px-6 pt-48 pb-32">
        <div className="mb-16">
          <span className="text-accent text-clay mb-6 block">Legal</span>
          <h1 className="h2 text-sage mb-8">Terms of <span className="font-display italic text-clay">Service.</span></h1>
          <p className="text-sage-light font-light uppercase tracking-[0.1em] text-xs">Last Updated: October 14, 2026</p>
        </div>

          <div className="prose prose-sage max-w-none prose-p:text-sage/80 prose-p:font-normal prose-p:leading-[1.65] prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-sage space-y-12">
          
          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Ivory & Co. Elite Dental Studio website, services, and physical studio locations (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">2. Clinical Services Disclaimer</h2>
            <p>
              The content provided on this website is for informational purposes only and does not constitute medical or dental advice. While we strive to provide accurate information regarding our treatments (including porcelain veneers, invisible orthodontics, and surgical implants), individual results may vary. A formal clinical examination is required before any diagnosis or treatment plan is established.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">3. Appointments and Booking</h2>
            <p>
              When booking an appointment through our digital intake system, you agree to provide accurate and complete information. A valid credit card may be required to reserve your dedicated clinical time. We strictly enforce a 48-hour cancellation policy to respect the time of our clinicians and other patients.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">4. Financial Policies and Insurance</h2>
            <p>
              By using our insurance verification algorithms, you understand that verification is not a guarantee of payment by your provider. You remain financially responsible for all treatments rendered, regardless of insurance coverage. Ivory Elite Membership fees are non-refundable and auto-renew annually unless canceled prior to the renewal date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">5. Privacy and Security</h2>
            <p>
              Your use of our Services is also governed by our HIPAA Privacy Policy. We utilize AES-256 encryption for the transmission of all Protected Health Information (PHI). We reserve the right to revoke access to the Patient Portal for any user discovered attempting to breach our security infrastructure.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
