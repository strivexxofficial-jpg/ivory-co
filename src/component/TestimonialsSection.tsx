import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="border-b border-stone-dark bg-stone py-16 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-stone to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-stone to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-0">
        <div className="flex flex-col items-center justify-center shrink-0">
          <span className="h2 text-sage hover:text-clay transition-colors duration-500">4.9</span>
          <div className="flex gap-1 my-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-clay text-clay" />)}
          </div>
          <span className="text-accent text-sage/80 block uppercase tracking-wider">312 Google Reviews</span>
        </div>
        <div className="flex w-full justify-start items-center overflow-x-auto gap-8 no-scrollbar flex-nowrap pb-4">
          {[
            { name: "Priya S.", tag: "Invisalign Patient", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", quote: "I have serious dental anxiety and they made me feel completely at ease. Best experience I've ever had." },
            { name: "Suresh P.", tag: "Restorative Patient", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", quote: "Transparent pricing, no surprise bills. They told me exactly what everything cost before touching anything." },
            { name: "Meera K.", tag: "Routine Care", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", quote: "The office is stunning but what really got me was how kind everyone was. I actually fell asleep during my cleaning." },
            { name: "Rahul M.", tag: "New Patient", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", quote: "Been avoiding the dentist for 6 years. Wish I'd found these guys sooner. Zero judgment, zero lecture." },
            { name: "Aarav C.", tag: "Veneers Patient", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", quote: "Got veneers done here. The before and after is unbelievable. Worth every rupee and more." }
          ].map((review, i) => (
            <div key={i} className="bg-ivory rounded-3xl p-6 md:p-8 shrink-0 w-[300px] md:w-[400px] border border-stone-dark flex flex-col h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500">
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-clay text-clay" />)}
              </div>
              <p className="body-text flex-grow text-sage/90">"{review.quote}"</p>
              
              <div className="flex items-center gap-4 mt-auto pt-6">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-stone-dark" />
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-sage block">{review.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-clay block mt-1 opacity-80">{review.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
