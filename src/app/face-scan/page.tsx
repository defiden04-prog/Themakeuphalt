"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FlowOrchestrator } from "@/components/scan-flow/flow-orchestrator";

export default function FaceScanPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative font-sans flex flex-col pt-12 pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Header and Back Link */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6 absolute top-6 left-0 right-0 px-6 z-50">
        <Link 
          href="/" 
          className="text-xs tracking-widest uppercase font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2 group z-50"
        >
          <motion.span
            whileHover={{ x: -4 }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-light tracking-[0.2em] text-white hidden sm:block">
            THE MAKEUP HALT
          </span>
        </div>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col pt-12">
        <FlowOrchestrator />
      </div>
    </div>
  );
}
