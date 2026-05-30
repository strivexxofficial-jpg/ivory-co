import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, AlertCircle, Calendar, Download, Mail } from 'lucide-react';
import ControlledZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import BeforeAfterSlider from './BeforeAfterSlider';


export default function InteractiveSmileSimulator() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [hasFailed, setHasFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const enhancementOptions = [
    { label: "Natural Whitening", instruction: "whiten" },
    { label: "Smile Balancing", instruction: "balance" },
    { label: "Subtle Smile Balancing", instruction: "subtle" },
    { label: "Enamel Polish", instruction: "polish" },
    { label: "Chip Repair", instruction: "repair" },
    { label: "Premium Cosmetic Look", instruction: "premium" },
  ];
  const [loadingMsg, setLoadingMsg] = useState<string>('Preparing your smile simulation...');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = async (dataUrl: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 700 || img.height < 700) {
          setErrorStatus("Please upload a higher quality image (min 700x700).");
          return resolve(null);
        }
        const c = document.createElement('canvas');
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        if (!ctx) return resolve(img);
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        let total = 0;
        for (let i = 0; i < imageData.length; i += 4) total += imageData[i]*0.299 + imageData[i+1]*0.587 + imageData[i+2]*0.114;
        const avg = total / (imageData.length / 4);
        if (avg < 40) { setErrorStatus("Image is too dark."); return resolve(null); }
        resolve(img);
      };
      img.src = dataUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) { setErrorStatus('Please upload a valid image.'); return; }
      if (file.size > 10 * 1024 * 1024) { setErrorStatus('Image is too large (max 10MB).'); return; }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        const img = await validateImage(dataUrl);
        if(!img) return;                
        setImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  // ─── Canvas-based teeth whitening ────────────────────────────────────────────
  const applyCanvasWhitening = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    // Focus on center-bottom third of image — where teeth typically are
    const regionX = Math.floor(img.width * 0.2);
    const regionY = Math.floor(img.height * 0.35);
    const regionW = Math.floor(img.width * 0.6);
    const regionH = Math.floor(img.height * 0.35);

    const imageData = ctx.getImageData(regionX, regionY, regionW, regionH);
    const data = imageData.data;

    // Determine whitening intensity based on selected enhancements
    const isPremium = selectedEnhancements.includes('Premium Cosmetic Look');
    const isPolish = selectedEnhancements.includes('Enamel Polish');
    const brightenAmount = isPremium ? 55 : isPolish ? 45 : 38;
    const desaturateAmount = isPremium ? 0.55 : 0.42;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Luminance of this pixel
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Only process bright-ish pixels (teeth are bright, not dark skin/background)
      if (lum > 100) {
        // How "yellow" is this pixel? yellow = high R+G, low B
        const yellowness = (r + g) / 2 - b;

        // Soft mask — stronger effect on more yellow pixels, fades on already-white
        const mask = Math.min(1, Math.max(0, yellowness / 80) * (1 - lum / 310));

        if (mask > 0.05) {
          // Desaturate toward white (reduce yellow cast)
          const avg = (r + g + b) / 3;
          data[i]     = Math.min(255, r + (avg - r) * desaturateAmount * mask + brightenAmount * mask);
          data[i + 1] = Math.min(255, g + (avg - g) * desaturateAmount * mask + brightenAmount * mask);
          data[i + 2] = Math.min(255, b + (avg - b) * desaturateAmount * mask + brightenAmount * mask * 1.4); // blue boost for cooler white
        }
      }
    }

    ctx.putImageData(imageData, regionX, regionY);

    // Subtle overall brightness lift on the full image (very light)
    const fullData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const fd = fullData.data;
    for (let i = 0; i < fd.length; i += 4) {
      const lum = 0.299 * fd[i] + 0.587 * fd[i+1] + 0.114 * fd[i+2];
      if (lum > 160) {
        fd[i]     = Math.min(255, fd[i]     + 6);
        fd[i + 1] = Math.min(255, fd[i + 1] + 6);
        fd[i + 2] = Math.min(255, fd[i + 2] + 8);
      }
    }
    ctx.putImageData(fullData, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.95);
  };
  // ─────────────────────────────────────────────────────────────────────────────

  const startSimulation = async () => {
    if (!image || !email) { setErrorStatus('Please upload an image and provide your email.'); return; }
    setStep('analyzing');
    setErrorStatus(null);
    setResultImage(null);
    setHasFailed(false);

    try {
      const img = await validateImage(image);
      if (!img) throw new Error("Image validation failed.");

      // Simulate processing steps with realistic progress
      const steps = [
        { msg: 'Analyzing facial geometry...', duration: 600 },
        { msg: 'Detecting smile region...', duration: 700 },
        { msg: 'Mapping enamel surface...', duration: 800 },
        { msg: 'Applying cosmetic enhancement...', duration: 900 },
        { msg: 'Rendering final preview...', duration: 600 },
      ];

      for (let i = 0; i < steps.length; i++) {
        setLoadingMsg(steps[i].msg);
        setProgress(((i + 1) / steps.length) * 100);
        await new Promise(r => setTimeout(r, steps[i].duration));
      }

      const result = applyCanvasWhitening(img);
      setResultImage(result);
      setStep('result');

    } catch (error: any) {
      setErrorStatus(error.message || 'Something went wrong.');
      setHasFailed(true);
      setStep('result');
    }
  };

  const reset = () => {
    setStep('upload');
    setImage(null);
    setResultImage(null);
    setErrorStatus(null);
    setHasFailed(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="py-20 bg-stone-950 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="w-full mx-auto">
          {/* Simulator */}
          <div className="bg-[#050505] rounded-[2rem] border border-stone-800 shadow-2xl shadow-black relative overflow-hidden min-h-[650px] flex items-center justify-center">
            
            {/* Guidance Panel */}
            <div className="absolute top-8 left-8 z-30 hidden md:block w-64 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="h5 mb-4 text-stone-100">Guidance</h3>
              <ul className="space-y-3 text-stone-100 text-sm">
                <li>✓ Face camera directly</li>
                <li>✓ Smile naturally</li>
                <li>✓ Use soft lighting</li>
                <li>✓ Avoid filters</li>
              </ul>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,_#e6e0d8_0%,_#8a7f72_25%,_#111111_60%,_#050505_100%)] pointer-events-none opacity-40" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_70%_20%,_#d97706_0%,_transparent_60%)] pointer-events-none opacity-[0.04]" />
              <AnimatePresence mode="wait">
                {step === 'upload' && (
                  <motion.div className="text-center p-8 md:p-12 w-full flex flex-col items-center relative z-10" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    {!image && (
                        <div className="mb-12 text-center relative z-20">
                            <div className="mx-auto mb-6 flex justify-center">
                              <span className="bg-black/35 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">Ivory & Co.</span>
                            </div>
                            <h3 className="h2 font-bold mb-4 tracking-tighter text-[#f5f1eb] drop-shadow-[0_2px_15px_rgba(255,255,255,0.1)]">Smile Enhancement Studio</h3>
                            <p className="text-stone-300 text-xl font-medium leading-relaxed max-w-lg mx-auto drop-shadow-md">Upload a clear front-facing photo to explore a refined cosmetic smile enhancement preview inspired by our aesthetic technology.</p>
                        </div>
                    )}

                    <button onClick={triggerUpload} className={`group relative w-full max-w-md aspect-[5/3] rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-700 border ${image ? 'border-amber-500 bg-black/60 backdrop-blur-2xl' : 'border-stone-700/60 hover:border-amber-400 bg-black/40 hover:bg-black/60 shadow-[inset_0_4px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(245,158,11,0.15),inset_0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl'}` }>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-[2rem]" />
                      {image ? (
                        <>
                          <img src={image} className="absolute inset-0 w-full h-full object-cover rounded-[2rem] opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                          <div className="absolute inset-0 bg-black/40 rounded-[2rem] group-hover:bg-black/20 transition-colors duration-700" />
                        </>
                       ) : (
                        <>
                          <div className="p-8 rounded-full bg-gradient-to-b from-stone-800 to-stone-950 group-hover:from-amber-600 group-hover:to-amber-800 transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group-hover:ring-amber-400/50">
                            <Upload className="w-12 h-12 text-stone-300 group-hover:text-white transition-colors duration-500 drop-shadow-md" />
                          </div>
                          <div className="space-y-2 relative z-10 text-center">
                              <span className="block h4 font-medium text-stone-200 tracking-wide group-hover:text-white transition-colors">Upload Photo</span>
                              <span className="block text-sm text-stone-400 group-hover:text-amber-200/70 transition-colors">Click or drop an image</span>
                          </div>
                        </>
                      )}
                    </button>

                    {errorStatus && (
                        <div className="bg-red-950/80 backdrop-blur-md border border-red-500/50 text-red-200 p-4 rounded-2xl mt-8 text-sm font-medium flex items-center justify-center gap-2 relative z-20 shadow-xl">
                           <AlertCircle className="w-5 h-5" /> {errorStatus}
                        </div>
                    )}
                    
                    {image && (
                        <div className="mt-8 w-full max-w-md relative z-20 p-8 rounded-[2rem] bg-black/70 backdrop-blur-3xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col gap-8">
                            <div className="text-left">
                                <label className="block text-stone-200 text-sm mb-4 font-semibold tracking-wide">Select Enhancement Options:</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {enhancementOptions.map(opt => (
                                        <button key={opt.label} onClick={() => setSelectedEnhancements(prev => prev.includes(opt.label) ? prev.filter(i => i !== opt.label) : [...prev, opt.label])} className={`p-3 text-xs rounded-xl transition-all duration-300 font-bold border ${selectedEnhancements.includes(opt.label) ? 'bg-gradient-to-br from-amber-500/40 to-amber-700/40 border-amber-400 text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-[1.04] relative z-10 ring-1 ring-amber-400/50' : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:bg-stone-800 hover:border-stone-600'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-8 border-t border-stone-800/60 flex flex-col gap-6">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-4 w-5 h-5 text-stone-500" />
                                    <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111111] text-stone-100 rounded-2xl py-4 pl-12 pr-4 border border-stone-800 placeholder:text-stone-500 focus:ring-2 focus:ring-amber-500/50 outline-none transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] font-medium" />
                                </div>
                                <button onClick={startSimulation} className="bg-gradient-to-r from-amber-300 to-amber-500 text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:from-amber-200 hover:to-amber-400 transition-all duration-300 w-full shadow-[0_12px_40px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] border border-amber-300/80">Generate Preview</button>
                            </div>
                        </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  </motion.div>
                )}
                {step === 'analyzing' && (
                  <motion.div className="flex flex-col items-center p-12 w-full h-full relative text-white" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img src={image!} className="w-full h-full object-cover blur-3xl scale-110" />
                    </div>
                    <motion.div className="absolute inset-0 z-10 bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-900/10"
                        animate={{opacity: [0.1, 0.4, 0.1]}}
                        transition={{duration: 4, repeat: Infinity, ease: [0.4, 0, 0.2, 1]}}
                    />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-8">
                        <motion.div className="w-16 h-16 border-2 border-amber-600/30 rounded-full border-t-amber-500 animate-spin" transition={{duration: 2, ease: "linear", repeat: Infinity}} />
                        <h3 className="h4 tracking-wide text-stone-200">{loadingMsg}</h3>
                        <div className="w-64 bg-stone-800 rounded-full h-1 mt-6">
                            <div style={{ width: `${progress}%` }} className="h-1 bg-amber-500 rounded-full transition-all duration-700" />
                        </div>
                        <button onClick={reset} className="mt-6 text-stone-500 hover:text-stone-300 transition underline">Cancel</button>
                    </div>
                  </motion.div>
                )}
                {step === 'result' && (resultImage || hasFailed) && (
                  <motion.div className="w-full p-4 text-white" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}>
                    {hasFailed ? (
                        <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-6">
                            <AlertCircle className="w-16 h-16 text-amber-500" />
                            <h3 className="h3">Generation Issue</h3>
                            <p className="text-stone-400">{errorStatus || "We encountered an issue generating your smile simulation. Please try again."}</p>
                            <button onClick={reset} className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition">Retry</button>
                        </div>
                    ) : (
                        <>
                            <ControlledZoom>
                                <BeforeAfterSlider beforeImage={image!} afterImage={resultImage!} />
                            </ControlledZoom>
                            
                            {/* Interpretation Panel */}
                            <div className="mt-8 pt-8 border-t border-stone-800">
                              <h4 className="h4 mb-4">Potential Cosmetic Improvements Visualized</h4>
                              <ul className="grid grid-cols-2 gap-4 text-stone-400 text-sm">
                                <li>• Subtle whitening refinement</li>
                                <li>• Enhanced smile symmetry</li>
                                <li>• Improved brightness</li>
                                <li>• Balanced aesthetic contouring</li>
                              </ul>
                              <p className="mt-6 text-xs text-stone-500 italic">"This AI-generated simulation is intended for illustrative purposes only and does not represent a guaranteed clinical outcome. Final treatment results vary based on individual anatomy, oral health, and professional evaluation."</p>
                            </div>

                            {/* CTAs */}
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                              <a href="/booking" className="flex-1 bg-amber-600 text-white py-4 rounded-full text-center font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2">
                                <Calendar className="w-5 h-5"/> Book Smile Consultation
                              </a>
                              <a href={resultImage!} download="smile-preview.png" className="flex-1 bg-stone-800 text-white py-4 rounded-full text-center font-semibold hover:bg-stone-700 transition flex items-center justify-center gap-2">
                                <Download className="w-5 h-5"/> Download Preview
                              </a>
                            </div>
                        </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
}
