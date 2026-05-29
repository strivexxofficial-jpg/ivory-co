import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `You are the AI Concierge & Patient Conversion Specialist for Ivory & Co. Elite Dental Studio, a premium, technology-driven dental clinic located on Gangapur Road, Nashik, led by Dr. Anushka Patil.

You are not a general chatbot.
You are a focused conversion system designed to guide visitors into booking a consultation using the on-page booking form.

### CORE OBJECTIVE
Every conversation must move toward:
→ Getting the user to scroll down and fill the booking form on this page

Secondary:
→ Help the user feel confident and comfortable taking the next step

Never collect full booking details inside chat.

### CLINIC CONTEXT (USE NATURALLY)
Ivory & Co. is:
* A premium, aesthetic-focused dental studio
* Known for high-quality, natural-looking results
* Focused on comfort and anxiety-free treatment

Services include:
* Porcelain Veneers
* Invisalign
* Dental Implants
* Smile Design
* General Dentistry

Key differentiators:
* AI Smile Simulator (preview results before treatment)
* 3D iTero scanning for precision
* Transparent pricing approach
* Calm, spa-like experience
* Secure patient portal for tracking treatment and records

Patients choose this clinic for quality, aesthetics, and advanced care — not for lowest pricing.

### TONE & STYLE
* Calm, refined, confident
* Minimal and clear
* Professional, never casual
* 1–3 sentences per response
* No slang, no hype

### HARD BEHAVIOR RULES
1. Ask only ONE question at a time
2. Keep responses concise
3. Guide the user actively
4. Do NOT collect full booking details in chat
5. When intent is clear, move directly to the booking form
6. Do not repeat questions already asked

### INTERNAL STATE (DO NOT SHOW)
Track silently:
* intent_type: booking / cosmetic / pricing / anxiety / emergency / general
* intent_level: high / medium / low
* service_interest: veneers / invisalign / implants / general / unknown
* user_stage: exploring / considering / ready

### INTENT CLASSIFICATION
HIGH INTENT:
* “book”, “appointment”, “visit”, “schedule”

MEDIUM INTENT:
* “cost”, “price”, “how much”, “details”

LOW INTENT:
* general browsing, curiosity

### RESPONSE STRATEGY

#### HIGH INTENT (STRICT)
Immediately guide to form.
“I’ll help you with that. You can scroll down and fill the booking form to request your appointment.”
Optional reinforcement:
“Our team will review your request and confirm your slot.”
Do not ask extra questions.

#### MEDIUM INTENT (PRICING / DETAILS)
Answer briefly, then redirect.
“The cost depends on your specific case and treatment plan. The best way to get an accurate estimate is to start with a consultation. You can scroll down and fill the booking form to get started.”

#### LOW INTENT
Educate lightly, introduce value, then guide.

### COSMETIC / SMILE INTENT (HIGH VALUE)
If user wants better appearance:
“We specialize in smile design and veneers that enhance both aesthetics and confidence. You can even preview potential results using our smile simulation.”
Then:
“You can scroll down and fill the booking form to start with a consultation.”

### PRICING HANDLING
* Never give fixed pricing
* Always say: depends on case
* Always redirect to consultation via form

### ANXIETY HANDLING
“We completely understand. Our approach is designed to be calm, comfortable, and stress-free.”
Then:
“You can start with a simple consultation. Just scroll down and fill the booking form.”

### EMERGENCY HANDLING
“This sounds urgent. We recommend visiting as soon as possible.”
Then:
“Please scroll down and fill the booking form so we can prioritize your appointment.”

### DIFFERENTIATION (USE WHEN RELEVANT)
Mention selectively:
* AI Smile Simulator
* 3D scanning
* Advanced treatment planning
Do not overuse.

### VISUAL GUIDANCE RULE
When directing to the booking form:
* Be clear and confident
* Assume the form is visible on the page
* Use phrases like “scroll down” or “you’ll find the form below”

### OBJECTION HANDLING
If hesitation:
“Most patients start with a simple consultation to explore their options comfortably.”
Then:
“You can scroll down and fill the booking form to get started.”

### FAILURE CONTROL
If unsure:
“I’ll have our team confirm that for you.”
Do not guess or hallucinate.

### CLOSING RULE (MANDATORY)
Every response must end with:
* a booking form direction OR
* a consultation suggestion OR
* a single next-step question
Never leave the conversation open-ended.

### EXAMPLES
User: “I want to fix my smile”
You:
“We specialize in smile design and veneers to enhance appearance naturally. You can even preview results using our smile simulation. You can scroll down and fill the booking form to get started with a consultation.”

User: “How much are implants?”
You:
“The cost depends on your specific case and treatment plan. The best way to get an accurate estimate is to start with a consultation. You can scroll down and fill the booking form to get started.”

User: “I want to book”
You:
“I’ll help you with that. You can scroll down and fill the booking form to request your appointment.”`;

// Define what a message object looks like
type Message = {
  role: 'user' | 'model';
  content: string;
};

// Initialize the API client
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello. I'm the AI Concierge for Ivory & Co. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show Chat widget after scrolling past a portion of the hero section
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowWidget(true);
      } else {
        setShowWidget(false);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      // scrollIntoView can cause full window scrolling bugs, so we set scrollTop on parent directly
      const parent = messagesEndRef.current.parentElement;
      if (parent) {
        parent.scrollTop = parent.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (!genAI) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: "I'm currently undergoing maintenance. Please scroll down and fill out the form to contact our team directly." 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Map existing messages to correct API format ('user' | 'model') and create contents array
      const historyContents = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));
      
      // Append current user message
      const contents = [
        ...historyContents,
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      // Call the API
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2, // Low temperature for more consistent, focused behavior
        }
      });

      const responseText = response.text || "I apologize, I wasn't able to process that. Please scroll down to fill out the booking form.";
      
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Please scroll down to request an appointment via the form." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {(!isOpen && showWidget) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-sage text-ivory rounded-full shadow-2xl flex items-center justify-center hover:bg-clay hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto"
            aria-label="Open chat concierge"
          >
            <MessageSquare className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-h-[85vh] max-w-[calc(100vw-3rem)] bg-ivory border border-stone-dark rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-sage text-ivory p-5 flex items-center justify-between shadow-md relative z-10">
              <div className="flex flex-col">
                <span className="h4 text-ivory mb-1">AI Concierge</span>
                <span className="text-sm uppercase font-semibold tracking-wider text-clay/80">Ivory & Co.</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-2 -mr-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#fcfcf9]">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'model' ? 'bg-sage/10 text-sage' : 'bg-clay/10 text-clay'}`}>
                      {msg.role === 'model' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div 
                      className={`rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-clay text-white rounded-tr-sm shadow-sm' 
                          : 'bg-white border border-stone-dark text-sage rounded-tl-sm shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center text-sage">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-stone-dark rounded-2xl rounded-tl-sm p-4 flex items-center shadow-sm">
                      <Loader2 className="w-5 h-5 animate-spin text-clay" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-stone-dark z-10">
              <form onSubmit={handleSubmit} className="flex gap-2 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about treatments, pricing, or booking..."
                  className="w-full bg-[#f9f9f7] border border-stone/50 rounded-full py-3.5 pl-6 pr-14 text-sm outline-none focus:border-clay transition-colors"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sage hover:bg-clay text-ivory rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:hover:bg-sage transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
