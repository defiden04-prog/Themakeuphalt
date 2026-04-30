"use client";

import { useState, useRef } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!containerRef.current) return;
    
    let clientX;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-crosshair select-none touch-none group shadow-[0_0_50px_rgba(245,158,11,0.15)] border border-amber-500/20"
      ref={containerRef}
      onPointerMove={(e) => {
        if (e.buttons === 1) handlePointerMove(e);
      }}
      onPointerDown={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage || "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter grayscale-[0.2]" 
      />
      
      {/* After Image (Clipped) */}
      <img 
        src={afterImage || "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80"} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-ew-resize mix-blend-overlay flex items-center justify-center transform -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center -translate-x-1/2 ml-0.5 text-black border border-neutral-200">
          <MoveHorizontal className="w-5 h-5 opacity-70" />
        </div>
      </div>

      <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/10 z-10 transition-opacity duration-300 md:group-hover:opacity-0 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">Before</span>
      </div>
      <div className="absolute top-6 right-6 bg-amber-500 rounded-full px-5 py-2 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-10 transition-opacity duration-300 md:group-hover:opacity-0 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-black">After</span>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 z-10 opacity-80 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 flex items-center gap-2">
          <MoveHorizontal className="w-3 h-3" />
          Drag to compare
        </span>
      </div>
    </div>
  );
}
