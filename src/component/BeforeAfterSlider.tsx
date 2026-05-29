import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After Treatment" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="eager"
        fetchPriority="high"
      />

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Treatment" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-sage pointer-events-auto transition-transform hover:scale-110">
          <MoveHorizontal className="w-6 h-6 text-clay" />
        </div>
      </div>

      <div className="absolute top-6 left-6 md:top-8 md:left-8 px-5 py-2.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-semibold uppercase tracking-wider pointer-events-none">
        Before
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-8 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-sage text-xs sm:text-sm font-semibold uppercase tracking-wider pointer-events-none">
        After
      </div>
    </div>
  );
}
