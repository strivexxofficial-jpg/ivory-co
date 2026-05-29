import { MapPin, Phone, MessageSquare, Clock, Navigation2 } from 'lucide-react';
import { motion } from 'motion/react';

/*
 * MAKE.COM AUTOMATION: PIPELINE B (Document Uploads via WhatsApp)
 * -------------------------------------------------------------
 * Instead of complex portals for file uploads, your co-founder can set up this Make.com 
 * pipeline so patients can simply text their IDs/X-rays to the clinic's WhatsApp:
 * 
 * 1. Trigger: WhatsApp Business -> "Watch New Messages" (Filter: Only messages with Media)
 * 2. Action: HTTP -> "Get a File" (Downloads the media from WhatsApp's temporary URL)
 * 3. Action: Google GenAI -> "Prompt: Extract the phone number of the sender from their message caption/metadata"
 * 4. Action: Supabase -> "Search Rows" -> patients table (Search by phone number to get their internal patient ID)
 * 5. Action: Supabase -> "Upload File" -> bucket: `patient-docs` (Uploads the downloaded file)
 * 6. Action: Supabase -> "Insert Row" -> documents table (Maps the patient ID, the new file URL, and file name)
 */

export default function ContactSection() {
  const address = "Ivory & Co., Gangapur Road, Nashik, MH 422005";
  const phoneNumber = "+91 98765 43210";
  const whatsappNumber = "+919876543210";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  // Nashik Coordinates for the embed (centered around Gangapur Road)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.0!2d73.7!3d20.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDAwJzAwLjAiTiA3M8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1714500000000!5m2!1sen!2sin";

  return (
    <section id="visit" className="py-32 bg-stone relative border-t border-stone-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-12 mb-8">
            <span className="text-accent text-clay mb-6 block">Our Location</span>
            <h2 className="h2 text-sage mb-8">Visit the <br/><span className="font-display italic text-clay">Studio.</span></h2>
          </div>

          {/* Contact Info & Actions */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-stone-dark flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <h4 className="h4 text-sage mb-2">Location</h4>
                  <p className="body-text">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-stone-dark flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <h4 className="h4 text-sage mb-2">Clinical Hours</h4>
                  <p className="body-text">
                    Monday — Thursday: 8:00 AM – 7:00 PM<br/>
                    Friday: 9:00 AM – 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-3 bg-sage text-ivory py-5 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-clay transition-all duration-300 shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call Studio
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white border border-stone-dark text-sage py-5 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-ivory transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-green-500" /> WhatsApp Us
              </a>
            </div>

            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full border border-clay/30 text-clay py-5 rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-clay hover:text-white transition-all duration-300"
            >
              <Navigation2 className="w-4 h-4" /> Get Directions
            </a>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 h-[500px] rounded-[3rem] overflow-hidden border border-stone-dark shadow-2xl relative group">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1) brightness(0.95)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ivory & Co. Location"
              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Overlay for better integration */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-stone border-opacity-50 rounded-[3rem]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
