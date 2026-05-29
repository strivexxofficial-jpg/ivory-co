import { SmileIcon, ShieldCheck, Phone, MessageSquare, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-sage text-stone py-32 px-6 border-t border-sage-light">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10 pr-12">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <SmileIcon className="w-10 h-10 text-clay" />
            <span className="font-sans text-4xl font-semibold tracking-tight text-ivory">Ivory.</span>
          </Link>
          <p className="text-white/95 text-lg md:text-xl font-normal leading-relaxed mb-10">
            Dr. Anushka Patil and her team have been serving the Nashik community with a commitment to clinical excellence and patient comfort.
          </p>

          <div className="space-y-6 pt-10 border-t border-white/10">
            <a href="https://www.google.com/maps/search/?api=1&query=Ivory+%26+Co.+Gangapur+Road+Nashik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/85 hover:text-white transition-colors group">
              <MapPin className="w-5 h-5 text-clay group-hover:scale-110 transition-transform" />
              <span className="text-base font-normal">Ivory & Co., Gangapur Road, Nashik, MH 422005</span>
            </a>
            <div className="flex flex-wrap gap-8">
              <a href="tel:+919876543210" className="flex items-center gap-4 text-white/85 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 text-clay group-hover:scale-110 transition-transform" />
                <span className="text-base font-normal">+91 98765 43210</span>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/85 hover:text-white transition-colors group">
                <MessageSquare className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-base font-normal">WhatsApp Message</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 lg:col-start-7">
          <h5 className="font-semibold text-sm uppercase tracking-wider text-clay mb-8">Patient Resources</h5>
          <ul className="space-y-5 text-base font-normal text-white/85">
            <li><Link to="/#booking" className="hover:text-white transition-colors">Digital Intake Forms</Link></li>
            <li><Link to="/#insurance" className="hover:text-white transition-colors">Insurance & Financing</Link></li>
            <li><Link to="/#membership" className="hover:text-white transition-colors">Ivory Elite Membership</Link></li>
            <li><a href="mailto:careers@ivorydental.com" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h5 className="font-semibold text-sm uppercase tracking-wider text-clay mb-8">Clinical Expertise</h5>
          <ul className="space-y-5 text-base font-normal text-white/85">
            <li><Link to="/#services" className="hover:text-white transition-colors">Preventative Care</Link></li>
            <li><Link to="/#services" className="hover:text-white transition-colors">Porcelain Veneers</Link></li>
            <li><Link to="/#services" className="hover:text-white transition-colors">Invisible Orthodontics</Link></li>
            <li><Link to="/#services" className="hover:text-white transition-colors">Surgical Implants</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h5 className="font-semibold text-sm uppercase tracking-wider text-clay mb-8">The Team</h5>
          <ul className="space-y-5 text-base font-normal text-white/85">
            <li><Link to="/#team" className="hover:text-white transition-colors">Dr. Anushka Patil</Link></li>
            <li><Link to="/#team" className="hover:text-white transition-colors">Our Specialists</Link></li>
            <li><Link to="/#team" className="hover:text-white transition-colors">Join Our Team</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h5 className="font-semibold text-sm uppercase tracking-wider text-clay mb-8">Legal</h5>
          <ul className="space-y-5 text-base font-normal text-white/85">
            <li><Link to="/ada" className="hover:text-white transition-colors">ADA Statement</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">HIPAA Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-32 pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium uppercase tracking-widest text-white/80">
        <p>© {new Date().getFullYear()} Ivory & Co. Elite Dental Studio.</p>
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> ADA Compliant</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> HIPAA Secure</span>
        </div>
      </div>
    </footer>
  );
}
