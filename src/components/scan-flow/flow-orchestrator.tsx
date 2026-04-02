"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaceScanner, type ScanResult } from "@/components/face-scanner";
import { RecommendationResult } from "@/components/recommendation-result";
import { Camera, Sparkles, Wand2, ArrowRight, Heart, Star, CheckCircle, CalendarDays, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FlowStep = 
  | "SCAN" 
  | "ANALYSIS" 
  | "OCCASION" 
  | "TRY_ON" 
  | "COMPARE" 
  | "SHORTLIST" 
  | "EXPERT" 
  | "BOOK";

export function FlowOrchestrator() {
  const [step, setStep] = useState<FlowStep>("SCAN");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [occasion, setOccasion] = useState<string | null>(null);
  
  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setStep("ANALYSIS");
  };

  const nextStep = (next: FlowStep) => {
    setStep(next);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: -40, 
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center pt-10 pb-20 px-4">
      {/* Step Indicator */}
      <div className="mb-12 flex items-center justify-center gap-2 overflow-x-auto w-full max-w-3xl no-scrollbar px-4 relative z-20">
        {["SCAN", "ANALYSIS", "OCCASION", "TRY_ON", "COMPARE", "SHORTLIST", "EXPERT", "BOOK"].map((s, i, arr) => (
          <motion.div 
            key={s} 
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <motion.div 
              animate={step === s ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: step === s ? Infinity : 0 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${
                step === s ? "bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.6)]" : 
                arr.indexOf(step as string) > i ? "bg-white text-black" : "bg-white/10 text-white/50"
              }`}
            >
              {i + 1}
            </motion.div>
            {i !== arr.length - 1 && (
              <div className={`w-4 h-[1px] mx-1 transition-colors duration-500 ${arr.indexOf(step as string) > i ? "bg-white flex-1" : "bg-white/20"}`} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="w-full relative min-h-[500px] flex justify-center items-center">
        <AnimatePresence mode="wait">
          
          {step === "SCAN" && (
            <motion.div
              key="SCAN"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md flex flex-col items-center"
            >
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-light mb-4">Start Face Scan</h1>
                <p className="text-white/50 text-sm">Position your face within the frame to let our AI analyze your distinct features.</p>
              </motion.div>
              <FaceScanner onScanComplete={handleScanComplete} />
            </motion.div>
          )}

          {step === "ANALYSIS" && scanResult && (
            <motion.div
              key="ANALYSIS"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-4xl"
            >
              <RecommendationResult result={scanResult} onRetake={() => {
                setScanResult(null);
                setStep("SCAN");
              }} />
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => nextStep("OCCASION")}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-6 rounded-full tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all"
                  >
                    NEXT: CHOOSE OCCASION <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight className="ml-2 w-4 h-4" /></motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {step === "OCCASION" && (
            <motion.div
              key="OCCASION"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-4xl"
            >
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-4xl font-light mb-3">Select Your Look Category</h2>
                <p className="text-white/50 tracking-wide font-light">Choose the occasion to tailor the virtual try-on experience.</p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  { id: "Bridal", desc: "Regal & Timeless", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=500&q=80" },
                  { id: "Editorial", desc: "High Fashion", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80" },
                  { id: "Glamour", desc: "Bold & Dramatic", img: "https://images.unsplash.com/photo-1512413914583-1764cbbf71bd?w=500&q=80" },
                  { id: "Natural", desc: "Soft & Dewy", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80" },
                ].map((cat) => (
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    key={cat.id}
                    onClick={() => {
                      setOccasion(cat.id);
                      nextStep("TRY_ON");
                    }}
                    className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 hover:border-amber-500/50 transition-colors shadow-xl"
                  >
                    <img src={cat.img} alt={cat.id} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-medium tracking-wide mb-1">{cat.id}</h3>
                      <motion.p className="text-amber-400 text-xs tracking-widest uppercase" initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }}>{cat.desc}</motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {step === "TRY_ON" && (
            <motion.div
              key="TRY_ON"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-5xl"
            >
               <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
               >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[10px] tracking-widest font-bold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Star className="w-3 h-3" /> {occasion?.toUpperCase()} LOOK
                </div>
                <h2 className="text-4xl font-light mb-3">Virtual Try-On</h2>
                <p className="text-white/50 tracking-wide font-light">Customizing the AI look mapping for your facial features.</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)] group"
                >
                  {scanResult?.avatarResult.imageUrl ? (
                     <motion.img 
                        initial={{ filter: "blur(20px)", scale: 1.1 }}
                        animate={{ filter: "blur(0px)", scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={scanResult.avatarResult.imageUrl} 
                        className="w-full h-full object-cover" 
                        alt="Virtual Try On" 
                      />
                  ) : (
                     <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center">
                        <Sparkles className="w-8 h-8 text-amber-500 mb-4 animate-pulse" />
                        <span className="text-xs uppercase tracking-widest text-white/50">Simulating...</span>
                     </div>
                  )}
                  {/* Mockup UI Elements over image */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 border border-white/10"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    <span className="text-[10px] uppercase font-mono tracking-widest">Live Mapping</span>
                  </motion.div>
                </motion.div>

                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-light tracking-wide mb-8">Customize Elements</h3>
                    
                    {["Foundation Base", "Lip Shade", "Eye Drama", "Contour Intensity"].map((setting, i) => (
                      <div key={setting} className="mb-6 last:mb-0">
                        <div className="flex justify-between text-xs mb-3 text-white/70 tracking-wider">
                          <span>{setting}</span>
                          <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 1 + i * 0.2 }}
                          >
                            {80 - (i * 10)}%
                          </motion.span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-300" 
                            initial={{ width: 0 }}
                            animate={{ width: `${80 - (i * 10)}%` }}
                            transition={{ duration: 1.5, delay: 0.4 + i * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={() => nextStep("COMPARE")}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black py-8 rounded-2xl tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all"
                    >
                      APPLY CHANGES & COMPARE <Wand2 className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "COMPARE" && (
            <motion.div
              key="COMPARE"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-10">
                <h2 className="text-4xl font-light mb-3">Compare Results</h2>
                <p className="text-white/50 font-light tracking-wide">See the transformation based on your AI beauty profile.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group"
                >
                  {scanResult?.originalImage ? (
                    <img src={scanResult.originalImage} className="w-full h-full object-cover filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt="Before" />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-white/70">Before</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] z-10"
                >
                  {scanResult?.avatarResult.imageUrl ? (
                    <motion.img 
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2 }}
                      src={scanResult.avatarResult.imageUrl} 
                      className="w-full h-full object-cover" 
                      alt="After" 
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute top-4 left-4 bg-amber-500 text-black rounded-full px-5 py-2 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">After</span>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
                className="flex justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline"
                    onClick={() => nextStep("TRY_ON")}
                    className="border-white/20 text-white py-7 px-10 rounded-full tracking-widest text-xs hover:bg-white/5 transition-all"
                  >
                    ADJUST LOOK
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => nextStep("SHORTLIST")}
                    className="bg-white hover:bg-white/90 text-black py-7 px-10 rounded-full tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                  >
                    SAVE THIS LOOK <Heart className="ml-2 w-4 h-4 text-red-500 fill-red-500" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {step === "SHORTLIST" && (
            <motion.div
              key="SHORTLIST"
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="w-full max-w-md mx-auto text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
                />
                <CheckCircle className="w-14 h-14 text-green-400 relative z-10" />
              </motion.div>
              <h2 className="text-4xl font-light mb-4">Look Saved!</h2>
              <p className="text-white/50 text-sm mb-12 leading-relaxed font-light">
                We've added this signature <span className="text-amber-400">{occasion?.toLowerCase() || 'custom'}</span> look to your shortlists. You can access it anytime or share it with your makeup artist.
              </p>

              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => nextStep("EXPERT")}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-8 rounded-2xl tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  >
                    GET EXPERT REVIEW <Sparkles className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="ghost"
                    onClick={() => nextStep("BOOK")}
                    className="w-full text-white/50 hover:text-white py-8 rounded-2xl tracking-widest text-xs font-light hover:bg-white/5"
                  >
                    SKIP TO BOOKING
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "EXPERT" && (
            <motion.div
              key="EXPERT"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-2xl bg-gradient-to-br from-amber-900/20 to-black/80 border border-amber-500/30 rounded-[2.5rem] p-8 md:p-14 shadow-[0_0_50px_rgba(245,158,11,0.1)] backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
              />
              
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 20px rgba(245,158,11,0.4)", "0 0 0px rgba(245,158,11,0)"] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30"
                >
                  <Star className="w-6 h-6 fill-amber-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl tracking-widest uppercase text-amber-400 font-medium">Premium Suggestion</h3>
                  <p className="text-xs text-white/50 tracking-widest uppercase font-light mt-1">Consult with a Master Artist</p>
                </div>
              </div>

              <p className="text-lg font-light leading-relaxed mb-10 text-white/80 relative z-10">
                Want professional feedback on your AI-generated look? Our master artists can review your beauty profile and provide tailored recommendations for your skin type, tone, and the upcoming occasion.
              </p>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-4 bg-black/60 border border-white/5 rounded-3xl p-8 mb-10 relative z-10"
              >
                {[
                  "Personalized Product Recommendations",
                  "Customized Skin Prep Routine",
                  "1-on-1 Virtual Consultation (15 mins)"
                ].map((perk, idx) => (
                  <motion.div variants={itemVariants} key={idx} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-amber-500" />
                    </div>
                    <span className="text-[14px] font-light tracking-wide text-white/90">{perk}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => nextStep("BOOK")}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-8 rounded-2xl tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                  >
                    ADD FOR ₹2,000 <Wand2 className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline"
                    onClick={() => nextStep("BOOK")}
                    className="w-full border-white/20 text-white hover:bg-white/10 py-8 rounded-2xl tracking-widest text-xs font-light"
                  >
                    NO THANKS, CONTINUE
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "BOOK" && (
            <motion.div
              key="BOOK"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-5xl"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-5xl font-light mb-6 tracking-tight">Secure Your Session</h2>
                    <p className="text-white/60 mb-10 leading-relaxed font-light text-lg">
                      Book your appointment today to lock in your AI-tailored look. We'll ensure your actual styling perfectly mirrors the customized virtual try-on.
                    </p>
                  </motion.div>

                  <motion.div 
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-4 mb-10"
                  >
                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-[3px] border-amber-500 p-5 rounded-r-2xl relative overflow-hidden group hover:from-amber-500/20 transition-colors duration-500">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                      <div className="flex items-center gap-4 mb-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Gift className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="font-medium tracking-widest uppercase text-sm">Special Offer: <span className="text-amber-400">20% OFF</span></span>
                      </div>
                      <p className="text-xs text-white/50 ml-12 font-light">Applied automatically because you completed the AI Try-On!</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-green-500/10 to-transparent border-l-[3px] border-green-500 p-5 rounded-r-2xl relative overflow-hidden group hover:from-green-500/20 transition-colors duration-500">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                      <div className="flex items-center gap-4 mb-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Star className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="font-medium tracking-widest uppercase text-sm">Referral Bonus: <span className="text-green-400">10% OFF</span></span>
                      </div>
                      <p className="text-xs text-white/50 ml-12 font-light">Refer a friend and get an extra discount added to your session.</p>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="p-8 bg-white/[0.02] border border-white/10 rounded-3xl mb-8 backdrop-blur-sm"
                  >
                    <h3 className="uppercase tracking-widest text-[10px] text-white/40 mb-6 flex items-center gap-2">
                       <span className="w-4 h-px bg-white/20" /> ORDER SUMMARY
                    </h3>
                    <div className="flex justify-between text-sm mb-4 font-light text-white/80">
                      <span>{occasion || 'Custom'} Makeup Session</span>
                      <span>₹15,000</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4 text-amber-400 font-medium">
                      <span>AI Review Discount (20%)</span>
                      <span>-₹3,000</span>
                    </div>
                    <div className="w-full h-px bg-white/10 my-6 inline-block" />
                    <div className="flex justify-between text-xl font-medium tracking-wide">
                      <span>Estimated Total</span>
                      <span>₹12,000</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <h3 className="text-2xl font-light mb-8 flex items-center gap-3 relative z-10">
                    <CalendarDays className="w-6 h-6 text-amber-500" /> Choose Date & Time
                  </h3>
                  
                  <div className="space-y-5 mb-10 relative z-10">
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-light text-sm" />
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-light text-sm" />
                    <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-light text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-light text-[13px] text-white/50" />
                      <input type="time" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all font-light text-[13px] text-white/50" />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                    <Button 
                      asChild
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black py-8 rounded-2xl tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    >
                      <a
                        href="https://razorpay.com/payment-link/plink_S0whHB6te9yGl1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                         CONFIRM & PAY ADVANCE <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                  <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-6 font-mono relative z-10">Powered by Razorpay Secure</p>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
