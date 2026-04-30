"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Copy, Check, Twitter, Facebook, Instagram, Link2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef, MouseEvent, TouchEvent } from "react";
import type { ScanResult } from "./face-scanner";

interface RecommendationResultProps {
  result: ScanResult;
  onRetake: () => void;
}

const PREVIEW_STYLES = [
  { name: "Bridal HD", imageUrl: "https://images.unsplash.com/photo-1487627448834-8b6ee3c2f0f8?auto=format&fit=crop&w=800&q=80" },
  { name: "Soft Glam", imageUrl: "https://images.unsplash.com/photo-1512413914488-66236b2803b8?auto=format&fit=crop&w=800&q=80" },
  { name: "Party Glam", imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" },
  { name: "Natural Look", imageUrl: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?auto=format&fit=crop&w=800&q=80" },
  { name: "Editorial", imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80" }
];

export function RecommendationResult({ result, onRetake }: RecommendationResultProps) {
  const { originalImage, avatarResult } = result;
  
  const [copiedDiscount, setCopiedDiscount] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);
  
  // Interactive style toggling
  const [activeStyle, setActiveStyle] = useState({
    name: avatarResult.makeupType || "Bridal HD",
    imageUrl: avatarResult.imageUrl || PREVIEW_STYLES[0].imageUrl
  });
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const discountCode = "SCAN20";
  const referralLink = "themakeuphalt.com/ref/1a2b3c";

  const handleCopyDiscount = () => {
    navigator.clipboard.writeText(discountCode);
    setCopiedDiscount(true);
    setTimeout(() => setCopiedDiscount(false), 2000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const shareText = encodeURIComponent(`I just got my AI Beauty Analysis and scored ${avatarResult.beautyScore}! My perfect look is ${activeStyle.name}. Get yours and 20% off your next session!`);
  const shareUrl = encodeURIComponent(`https://${referralLink}`);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const touchMoveHandler = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-4 gap-12"
    >
      
      {/* Top Header & Toggles */}
      <motion.div variants={itemVariants} className="text-center w-full max-w-3xl">
        <h2 className="text-4xl font-light mb-4 text-white">Your AI Beauty Profile</h2>
        <p className="text-white/60 font-light mb-8 tracking-wide">
          Explore endless makeup styles with our AI tool — Instantly see natural, realistic looks mapped to your unique facial features.
        </p>

        {/* Style Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PREVIEW_STYLES.map((style) => {
            const isActive = activeStyle.name === style.name;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={style.name}
                onClick={() => setActiveStyle({ name: style.name, imageUrl: style.imageUrl })}
                className={`px-6 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-500 ${
                  isActive 
                    ? "bg-amber-500 text-black font-semibold shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105" 
                    : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                {style.name}
              </motion.button>
            );
          })}
        </div>

        {/* AI Scan Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.div 
            animate={{ boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 20px rgba(245,158,11,0.3)", "0 0 0px rgba(245,158,11,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-1 bg-black/80 border border-amber-500/30 px-6 py-3 rounded-2xl backdrop-blur-md"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-500" /> AI Symmetry</span>
            <span className="font-mono text-amber-400 font-semibold">{avatarResult.beautyScore}/100</span>
          </motion.div>
          
          {avatarResult.skinTone && (
            <div className="inline-flex flex-col items-center gap-1 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md shadow-inner">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Detected Tone</span>
              <span className="font-mono text-white/90 font-medium">{avatarResult.skinTone}</span>
            </div>
          )}
          
          {avatarResult.skinTexture && (
            <div className="inline-flex flex-col items-center gap-1 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md shadow-inner">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Skin Base</span>
              <span className="font-mono text-white/90 font-medium">{avatarResult.skinTexture}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Before / After Slider Section */}
      <motion.div 
        variants={itemVariants}
        ref={sliderRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-4xl mx-auto rounded-none sm:rounded-[2.5rem] overflow-hidden cursor-ew-resize bg-[#111] shadow-[0_0_60px_rgba(0,0,0,0.6)] border-y sm:border border-white/10 group"
        onMouseMove={mouseMoveHandler}
        onTouchMove={touchMoveHandler}
        onMouseDown={(e) => handleMove(e.clientX)}
      >
        {/* Left Side (Before - Original Canvas Image) */}
        <img 
          src={originalImage} 
          alt="Original face without makeup"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter grayscale transition-all duration-700 group-hover:grayscale-0 opacity-80"
        />

        {/* Right Side (After - AI Makeup Avatar) */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={activeStyle.imageUrl}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              src={activeStyle.imageUrl} 
              alt="AI Makeup Result"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
        </div>

        {/* Slider Thumb / Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none z-10 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Thumb button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-white/50 pointer-events-auto cursor-ew-resize transition-transform group-hover:scale-110 active:scale-95">
            <div className="flex gap-1">
              <div className="w-[2px] h-4 bg-white/70 rounded-full" />
              <div className="w-[2px] h-4 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>

        {/* Helper text on overlay */}
        <div className="absolute bottom-6 left-6 bg-black/60 border border-white/10 backdrop-blur-md px-5 py-2 rounded-full pointer-events-none">
          <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">BEFORE</span>
        </div>
        <div className="absolute bottom-6 right-6 bg-amber-500 text-black border border-amber-400 backdrop-blur-md px-5 py-2 rounded-full pointer-events-none shadow-[0_0_20px_rgba(245,158,11,0.5)]">
          <span className="text-black text-[10px] uppercase tracking-widest font-bold">{activeStyle.name} <Sparkles className="inline w-3 h-3 ml-1" /></span>
        </div>
      </motion.div>

      {/* Reward & Sharing Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"
      >
        {/* Discount Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mb-4">Your Exclusive Reward</p>
          <h4 className="text-3xl font-light mb-4">20% OFF Your Booking</h4>
          <p className="text-white/50 text-sm mb-8 leading-relaxed font-light">
            Love your new AI-mapped look? Book a professional session today and get 20% off your entire package.
          </p>
          <div className="bg-black/60 border border-amber-500/20 px-6 py-5 rounded-2xl flex items-center justify-between shadow-inner">
            <span className="font-mono text-amber-400 tracking-[0.3em] font-bold text-xl">{discountCode}</span>
            <button 
              onClick={handleCopyDiscount}
              className="text-white/50 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-xl hover:scale-105 active:scale-95"
              title="Copy discount code"
            >
              {copiedDiscount ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Referral Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-bl-2xl shadow-lg">
            Earn 20% Cash
          </div>
          <div>
            <p className="text-[10px] text-amber-400/80 tracking-[0.2em] uppercase mb-4">Give 20%, Get 20%</p>
            <h4 className="text-3xl font-light mb-4">Share & Earn Huge</h4>
            <p className="text-white/50 text-sm mb-8 leading-relaxed font-light">
              When your friends book their perfect look using your link, they get 20% off, and you earn an incredible 20% referral bonus!
            </p>
          </div>
          <div className="bg-black/60 border border-amber-500/20 px-6 py-5 rounded-2xl flex items-center justify-between mt-auto">
            <span className="font-mono text-white/70 tracking-widest text-xs truncate mr-4">{referralLink}</span>
            <button 
              onClick={handleCopyReferral}
              className="text-amber-400 hover:text-amber-300 transition-colors p-3 shrink-0 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl hover:scale-105 active:scale-95"
              title="Copy referral link"
            >
              {copiedReferral ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Actions & Social Footer */}
      <motion.div variants={itemVariants} className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-10 pb-12">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Share Profile</span>
          <div className="flex items-center gap-3">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#1DA1F2] hover:border-transparent transition-all">
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4267B2] hover:border-transparent transition-all">
              <Facebook className="w-5 h-5" />
            </motion.a>
            <motion.button whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} onClick={handleCopyReferral} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:border-transparent transition-all">
              <Instagram className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={onRetake}
            className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:bg-white/5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-colors"
          >
            Retake Scan
          </motion.button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="https://form.typeform.com/to/HrxfV7DA"
              target="_blank"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black py-5 px-10 rounded-full font-bold tracking-[0.15em] text-[11px] uppercase transition-colors flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
            >
              BOOK SESSION NOW <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
