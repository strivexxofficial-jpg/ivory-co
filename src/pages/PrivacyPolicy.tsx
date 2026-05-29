import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy — Ivory & Co.";
  }, []);

  return (
    <div className="min-h-screen bg-stone text-sage font-sans">
      <Navbar />
      
      <main className="max-w-[1000px] mx-auto px-6 pt-48 pb-32">
        <div className="mb-16">
          <span className="text-accent text-clay mb-6 block">Legal / HIPAA</span>
          <h1 className="h2 text-sage mb-8">Privacy <span className="font-display italic text-clay">Policy.</span></h1>
          <p className="text-sage-light font-light uppercase tracking-[0.1em] text-xs">Last Updated: May 14, 2025</p>
        </div>

        <div className="prose prose-sage max-w-none prose-p:text-sage/80 prose-p:font-normal prose-p:leading-[1.65] prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-sage space-y-12">
          
          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">Our Commitment to Privacy</h2>
            <p>
              At Ivory & Co., we view your privacy as a fundamental architectural pillar of our service, not just a regulatory hurdle. We are fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) and employ enterprise-grade cryptographic standards to ensure your data remains strictly confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">Information We Collect</h2>
            <p>
              We collect information to provide you with world-class clinical care and a seamless digital experience. This includes:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-sage-light font-light text-sm">
              <li>Protected Health Information (PHI) including medical history, 3D digital scans, x-rays, and clinical notes.</li>
              <li>Personal Data such as your legal name, date of birth, contact information, and government-issued ID.</li>
              <li>Financial Data necessary for treatment routing and insurance verification.</li>
              <li>Usage Data from our digital properties to optimize the Ivory OS experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">How We Use Your Information</h2>
            <p>
              Your PHI is strictly used for the provision of healthcare, payment operations, and authorized healthcare operations as defined by HIPAA. We do not sell, rent, or cryptographically expose your medical data to third-party marketing entities. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">Data Security</h2>
            <p>
              Data at rest is secured via AES-256 bit encryption within our segmented cloud infrastructure. Data in transit is secured via TLS 1.3. Our patient portal utilizes token-based authentication and multi-factor validation flows for sensitive clinical document retrieval.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 border-b border-stone-dark pb-2">Your Patient Rights</h2>
            <p>
              Under HIPAA, you have the right to request access to your records, request amendments to your records, request restrictions on certain uses and disclosures, and receive an accounting of disclosures. To exercise these rights, please contact our Compliance Officer via the Patient Portal.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
