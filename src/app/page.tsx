"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Play,
  ArrowRight,
  Sparkles,
  Camera,
  Heart,
  Star,
  ArrowUpRight } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const portfolioImages = [
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6988-resized-1766573545957.jpeg?width=8000&height=8000&resize=contain",
  alt: "Traditional Red Bridal Look",
  category: "Bridal"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2569-1766573551869.jpeg?width=8000&height=8000&resize=contain",
  alt: "Modern Pastel Bridal Glam",
  category: "Glamour"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2572-1766573557906.jpeg?width=8000&height=8000&resize=contain",
  alt: "Classic Bridal Elegance",
  category: "Natural"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6480-resized-1766573564056.jpeg?width=8000&height=8000&resize=contain",
  alt: "Soft Glam Bridal Reception",
  category: "Glamour"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2568-1766573566510.jpeg?width=8000&height=8000&resize=contain",
  alt: "Dewy Bridal Finish",
  category: "Natural"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_1200-resized-1766574473228.jpeg?width=8000&height=8000&resize=contain",
  alt: "Traditional Red Bridal Portrait",
  category: "Bridal"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_1201-resized-1766574473227.jpeg?width=8000&height=8000&resize=contain",
  alt: "Regal Red Bridal Look",
  category: "Bridal"
},

{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_1204-resized-1766574473227.jpeg?width=8000&height=8000&resize=contain",
  alt: "Classic Indian Bride",
  category: "Bridal"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6831-resized-1766574631459.jpeg?width=8000&height=8000&resize=contain",
  alt: "Emerald Green Bridal Look",
  category: "Glamour"
},
{
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6848-resized-1766574631460.jpeg?width=8000&height=8000&resize=contain",
  alt: "Radiant Emerald Bridal Glam",
  category: "Glamour"
},
{
  src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  alt: "Editorial look",
  category: "Editorial"
}];


const services = [
{
  title: "Bridal Makeup",
  description: "Your perfect look for the most important day",
  price: "From INR 21K TO 200K",
  icon: <Sparkles className="w-6 h-6" />
},
{
  title: "Editorial & Fashion",
  description: "High-fashion looks for photoshoots & campaigns",
  price: "From INR 15K",
  icon: <Camera className="w-6 h-6" />
},
{
  title: "Special Events",
  description: "Galas, red carpets, and memorable occasions",
  price: "From INR 15K",
  icon: <Star className="w-6 h-6" />
},
{
  title: "Lessons & Tutorials",
  description: "Learn professional techniques one-on-one",
  price: "From INR 40K",
  icon: <Heart className="w-6 h-6" />
}];


const videoPortfolio = [
{ id: "1150179208", title: "Signature Bridal" },
{ id: "1149184701", title: "Editorial Glam" },
{ id: "1150179045", title: "Traditional Elegance" },
{ id: "1149184324", title: "Natural Radiance" }];


const testimonials = [
{
  name: "Saloni Chawla",
  role: "Signature Look",
  text: "The makeup was absolutely flawless! It lasted throughout the entire ceremony and I felt so confident and beautiful.",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/34ca0830-31c5-41af-a3c4-8c2e9f976153/e0d9c9ee-2dd8-4042-b7e0-e82e568e2dfb-2-1767877701037.jpeg?width=8000&height=8000&resize=contain"
},
{
  name: "Sakshi Bajaj",
  role: "Classic Look",
  text: "I received so many compliments on my special day. The look was exactly what I wanted—natural yet glamorous.",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/34ca0830-31c5-41af-a3c4-8c2e9f976153/f9cad59e-f7d6-401e-a171-211c67c9bb58-2-1767877701035.jpeg?width=8000&height=8000&resize=contain"
},
{
  name: "Priyanka Kaushik",
  role: "Editorial Look",
  text: "Working with MG was a dream. The attention to detail and the way she understands lighting and skin texture is unparalleled.",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/34ca0830-31c5-41af-a3c4-8c2e9f976153/IMG_2676-2-1767877701273.jpeg?width=8000&height=8000&resize=contain"
}];


const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

function AnimatedText({ text, className, delay = 0 }: {text: string;className?: string;delay?: number;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}>

      {text.split("").map((char, i) =>
      <motion.span
        key={i}
        custom={i + delay}
        variants={letterAnimation}
        style={{ display: "inline-block" }}>

          {char === " " ? "\u00A0" : char}
        </motion.span>
      )}
    </motion.span>);

}

function AnimatedWords({ text, className }: {text: string;className?: string;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}>

      {text.split(" ").map((word, i) =>
      <motion.span
        key={i}
        custom={i}
        variants={wordAnimation}
        style={{ display: "inline-block", marginRight: "0.3em" }}>

          {word}
        </motion.span>
      )}
    </motion.span>);

}

function CountUp({ target, suffix = "", duration = 2 }: {target: number | string;suffix?: string;duration?: number;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && typeof target === "number") {
      let start = 0;
      const end = target;
      const incrementTime = duration * 1000 / (end || 1);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {typeof target === "number" ? count : target}{suffix}
    </span>);

}

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }} />
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 30, speed: 40 },
      { target: 60, speed: 30 },
      { target: 85, speed: 50 },
      { target: 100, speed: 20 },
    ];
    let stepIndex = 0;

    const tick = () => {
      if (stepIndex >= steps.length) return;
      const { target, speed } = steps[stepIndex];
      current += 1;
      setProgress(current);
      if (current >= target) {
        stepIndex++;
      }
      if (current < 100) {
        setTimeout(tick, speed);
      } else {
        setTimeout(onComplete, 600);
      }
    };
    setTimeout(tick, 300);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 bg-amber-500 rounded-full"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-8"
        >
          The Makeup Halt
        </motion.p>

        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] tracking-[0.3em] text-white/20 mt-4 tabular-nums"
        >
          {progress}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const activeTestimonial = testimonials[currentTestimonial] || testimonials[0];

  const filters = ["All", "Bridal", "Editorial", "Glamour", "Natural"];
  const filteredImages =
  activeFilter === "All" ?
  portfolioImages :
  portfolioImages.filter((img) => img.category === activeFilter);

  const handleLoaderComplete = () => setLoading(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <NoiseOverlay />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-[60] origin-left"
        style={{ scaleX }} />


      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ?
        "bg-black/90 backdrop-blur-2xl py-4" :
        "bg-transparent py-6"}`
        }>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 relative group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-amber-500/30 transition-transform duration-500 group-hover:scale-110">
              <Image src="/logo.png" alt="The Makeup Halt" fill className="object-cover" />
            </div>
            <span className="text-xl md:text-2xl font-light tracking-[0.15em] text-white hidden sm:block group-hover:text-amber-400 transition-colors duration-500">
              THE MAKEUP HALT
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {["Portfolio", "Services", "Products", "About", "Contact"].map((item, i) =>
            item === "Products" ?
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}>
              <Link
                href="/products"
                className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-amber-400 transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div> :
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-amber-400 transition-colors duration-300 relative group">

                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}>

              <Magnetic>
                <Button
                  asChild
                  className="bg-amber-500 hover:bg-amber-400 text-black rounded-full px-8 py-5 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-300">

                  <a
                    href="https://razorpay.com/payment-link/plink_S0whHB6te9yGl1"
                    target="_blank"
                    rel="noopener noreferrer">

                    BOOK NOW
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/5">

              <div className="p-8 flex flex-col gap-6">
                {["Portfolio", "Services", "Products", "About", "Contact"].map((item, i) =>
              item === "Products" ?
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}>
                <Link
                  href="/products"
                  className="text-lg font-light tracking-[0.15em] text-white/80 hover:text-amber-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </Link>
              </motion.div> :
              <motion.a
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-light tracking-[0.15em] text-white/80 hover:text-amber-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}>

                    {item}
                  </motion.a>
              )}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>

                  <Button
                  asChild
                  className="bg-amber-500 hover:bg-amber-400 text-black rounded-full w-full py-6 text-sm font-semibold tracking-[0.15em] mt-4">

                    <a
                    href="https://razorpay.com/payment-link/plink_S0whHB6te9yGl1"
                    target="_blank"
                    rel="noopener noreferrer">

                      BOOK NOW
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        </motion.div>

        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-2 border border-amber-500/30 rounded-full mb-8">

                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-amber-500 rounded-full" />

                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80 !whitespace-pre-line">PREMIUM MAKE UP  STUDIO

                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.95] tracking-tight mb-8">
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>

                  <motion.span
                    className="block"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}>

                    Elevate
                  </motion.span>
                </motion.span>
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>

                  <motion.span
                    className="block text-amber-400"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}>

                    Your
                  </motion.span>
                </motion.span>
                <motion.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>

                  <motion.span
                    className="block font-medium"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] }}>

                    Radiance
                  </motion.span>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-base md:text-lg text-white/50 font-light max-w-md mb-12 leading-relaxed">

                Crafting bespoke beauty experiences for your most cherished moments. 
                Luxury bridal artistry that celebrates your unique essence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4">

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="bg-white hover:bg-amber-400 text-black rounded-full px-10 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-500 group">

                    <Link href="/portfolio">
                      VIEW PORTFOLIO
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}>

                        <ArrowUpRight className="w-4 h-4" />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-500 bg-transparent">

                    <a
                      href="https://razorpay.com/payment-link/plink_S0whHB6te9yGl1"
                      target="_blank"
                      rel="noopener noreferrer">

                      BOOK SESSION
                    </a>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 rounded-full px-10 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-500">

                    <Link href="/face-scan" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      AI FACE SCAN
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-16 flex items-center gap-12">

                <div>
                  <p className="text-4xl font-light text-amber-400">
                    PAN
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">India</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative hidden lg:block">

              <div className="relative aspect-[3/4] w-full max-w-lg ml-auto">
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-2xl" />

                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/381bb900-123e-4289-839e-f9c554287579-1765905423868.jpeg?width=8000&height=8000&resize=contain"
                    alt="Signature Bridal Glamour"
                    fill
                    className="object-cover"
                    priority />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -40, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -left-8 bottom-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">

                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </motion.div>
                    <div>
                      <p className="text-white font-medium">Authentic</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Beauty Standard</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">

          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] tracking-[0.3em] uppercase text-white/30">

            Scroll
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="w-px bg-gradient-to-b from-amber-500/50 to-transparent" />

        </motion.div>
      </section>

      <section id="portfolio" className="py-32 px-6 md:px-12 relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left" />

        
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}>

              <motion.span
                variants={fadeInUp}
                className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

                The Gallery
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
                <AnimatedWords text="Moments Of" className="block" />
                <motion.span
                  variants={fadeInUp}
                  className="text-amber-400">

                  Elegance
                </motion.span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap gap-2">

              {filters.map((filter, i) =>
              <motion.div key={filter}>
                <Magnetic>
                  <motion.button
                    variants={fadeInUp}
                    custom={i}
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-500 ${
                    activeFilter === filter ?
                    "bg-amber-500 text-black" :
                    "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`
                    }>

                      {filter}
                    </motion.button>
                  </Magnetic>
              </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.slice(0, 9).map((image, index) =>
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">

                  <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110" />

                  <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-all duration-500" />

                  <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 p-6">

                    <span className="text-amber-400 text-[10px] tracking-[0.2em] uppercase block mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white text-lg font-light">{image.alt}</h3>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex justify-center">

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Magnetic>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-black rounded-full px-12 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-500 bg-transparent group">

                  <Link href="/portfolio">
                    EXPLORE FULL GALLERY
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}>

                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />

        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20">

            <motion.span
              variants={fadeInUp}
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

              What We Offer
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
              <AnimatedText text="Services " />
              <motion.span variants={fadeInUp} className="text-white/30">Designed For You</motion.span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) =>
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-500">

                <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500/20 transition-all duration-500">

                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-light mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <p className="text-amber-400 text-sm font-medium tracking-wide mb-6">
                  {service.price}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-black rounded-full py-5 h-auto text-[10px] tracking-[0.15em] font-semibold transition-all duration-500 bg-transparent">

                    <a
                    href="https://razorpay.com/payment-link/plink_S0whHB6te9yGl1"
                    target="_blank"
                    rel="noopener noreferrer">

                      BOOK NOW
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16">

            <motion.span
              variants={fadeInUp}
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

              Video Showcase
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
              <AnimatedText text="Motion " />
              <motion.span variants={fadeInUp} className="text-white/30">Portfolio</motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {videoPortfolio.map((video, index) =>
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5">

                <div className="absolute inset-0 z-0">
                  <iframe
                  src={`https://player.vimeo.com/video/${video.id}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p`}
                  className="absolute inset-0 w-[300%] h-full left-[-100%] pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                  allow="autoplay; fullscreen" />

                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
                <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute bottom-0 left-0 right-0 p-6 z-20">

                  <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 mb-3">

                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-white font-light text-lg">{video.title}</h3>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />

        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16">

            <motion.span
              variants={fadeInUp}
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

              Testimonials
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
              <AnimatedText text="Client " />
              <motion.span variants={fadeInUp} className="text-white/30">Stories</motion.span>
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                className="grid lg:grid-cols-2 gap-12 items-center">

                <motion.div
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">

                  <motion.div
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 bg-gradient-to-br from-amber-500/30 via-amber-600/20 to-transparent rounded-3xl blur-2xl" />

                  <div className="relative h-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                    <Image
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      fill
                      className="object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 p-8">

                      <div className="flex items-center gap-3 mb-2">
                        {[...Array(5)].map((_, i) =>
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                      <p className="text-amber-400 font-medium text-xl">
                        {activeTestimonial.name}
                      </p>
                      <p className="text-white/60 text-sm tracking-wide">
                        {activeTestimonial.role}
                      </p>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">

                    <span className="text-black font-bold text-2xl">&ldquo;</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex flex-col justify-center">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-8" />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-8">

                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-6">

                    <div className="flex -space-x-3">
                      {testimonials.map((t, i) =>
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                        i === currentTestimonial ?
                        "border-amber-500 ring-2 ring-amber-500/30" :
                        "border-white/20 opacity-60 hover:opacity-100"}`
                        }>

                          <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full" />

                        </motion.div>
                      )}
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <p className="text-white/40 text-sm">
                      <span className="text-amber-400 font-medium">{currentTestimonial + 1}</span>
                      <span className="mx-1">/</span>
                      <span>{testimonials.length}</span>
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-16">
              {testimonials.map((_, index) =>
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all duration-500 ${
                index === currentTestimonial ?
                "w-12 bg-gradient-to-r from-amber-400 to-amber-600" :
                "w-3 bg-white/20 hover:bg-white/40"}`
                } />

              )}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="relative">

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden">

                <Image
                  src="https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=800&q=80"
                  alt="Artist Portrait"
                  fill
                  className="object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute -bottom-8 -right-8 bg-amber-500 text-black rounded-full w-32 h-32 flex items-center justify-center">

                <div className="text-center">
                  <p className="text-2xl font-bold">PAN</p>
                  <p className="text-[9px] tracking-[0.15em] uppercase !whitespace-pre-line">INDIA</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}>

              <motion.span
                variants={fadeInUp}
                className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

                The Story
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-8">
                <AnimatedText text="Crafting " />
                <motion.span variants={fadeInUp} className="text-white/30">Enduring Beauty</motion.span>
              </h2>
              <motion.div
                variants={staggerContainer}
                className="space-y-6 text-white/50 leading-relaxed">

                <motion.p variants={fadeInUp} className="!whitespace-pre-line">“Tailored for flawless, long-lasting makeup that enhances your natural features, without heavy layers or overdone effects. Makeup that feels natural, comfortable and lets you feel like yourself.”

                </motion.p>
              </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8">

                  <div>
                    <p className="text-3xl font-light text-amber-400"><CountUp target={99} suffix="%" /></p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-1">Satisfaction</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-amber-400">PAN</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-1">India</p>
                  </div>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center" />

        
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}>

              <motion.span
                variants={fadeInUp}
                className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block">

                Get In Touch
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-8">
                <AnimatedText text="Begin Your " />
                <motion.span variants={fadeInUp} className="text-white/30">Transformation</motion.span>
              </h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/50 mb-12 leading-relaxed max-w-md">

                Inquire about availability for your upcoming wedding or event. 
                We operate across India for exclusive assignments.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-8">
                {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "Ranametog@gmail.com" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone / WhatsApp", value: "+91 767-820-2707" },
                { icon: <MapPin className="w-5 h-5" />, label: "Studio", value: "New Delhi, PAN INDIA" }].
                map((item, i) =>
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer">

                    <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-all duration-300">

                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">{item.label}</p>
                      <p className="text-white font-light text-lg">{item.value}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-12 flex gap-4">

                <motion.a
                  href="https://www.instagram.com/themakeuphalt_with_mg?igsh=dDdqbzc5OHJkZzl6&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-amber-500 hover:text-black transition-all duration-300">

                  <Instagram className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}>

              <motion.form
                whileHover={{ scale: 1.01 }}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-8">

                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp}>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                        First Name
                      </label>
                      <Input
                        placeholder="Your name"
                        className="bg-white/5 border-white/10 rounded-xl h-14 text-white placeholder:text-white/30 focus:border-amber-500/50 transition-colors" />

                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                        Last Name
                      </label>
                      <Input
                        placeholder="Last name"
                        className="bg-white/5 border-white/10 rounded-xl h-14 text-white placeholder:text-white/30 focus:border-amber-500/50 transition-colors" />

                    </motion.div>
                  </div>
                  <motion.div variants={fadeInUp}>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="hello@example.com"
                      className="bg-white/5 border-white/10 rounded-xl h-14 text-white placeholder:text-white/30 focus:border-amber-500/50 transition-colors" />

                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                      Event Date & Location
                    </label>
                    <Input
                      placeholder="Nov 24, 2024 • Udaipur"
                      className="bg-white/5 border-white/10 rounded-xl h-14 text-white placeholder:text-white/30 focus:border-amber-500/50 transition-colors" />

                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                      Your Vision
                    </label>
                    <Textarea
                      placeholder="Tell us about the look you desire..."
                      className="bg-white/5 border-white/10 rounded-xl min-h-[120px] text-white placeholder:text-white/30 focus:border-amber-500/50 transition-colors resize-none" />

                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black rounded-full py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-300 group">
                        SEND INQUIRY
                        <motion.span
                          className="inline-block ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}>

                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 md:px-12 border-t border-white/5">

        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-sm">

              <p className="text-2xl font-light tracking-[0.15em] mb-6">THE MAKEUP HALT</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Defining the new standard of bridal and editorial beauty in India.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">

              <motion.div variants={fadeInUp}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Navigate</p>
                <div className="flex flex-col gap-3">
                  {["Gallery", "Services", "About"].map((item) =>
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ x: 5, color: "#f59e0b" }}
                    className="text-sm text-white/60 transition-colors">

                      {item}
                    </motion.a>
                  )}
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Legal</p>
                <div className="flex flex-col gap-3">
                  {["Privacy", "Terms"].map((item) =>
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{ x: 5, color: "#f59e0b" }}
                    className="text-sm text-white/60 transition-colors">

                      {item}
                    </motion.a>
                  )}
                </div>
              </motion.div>
                <motion.div variants={fadeInUp}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Social</p>
                  <motion.a
                    href="https://www.instagram.com/themakeuphalt_with_mg?igsh=dDdqbzc5OHJkZzl6&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5, color: "#f59e0b" }}
                    className="text-sm text-white/60 transition-colors flex items-center gap-2">

                    <Instagram className="w-4 h-4" /> Instagram
                  </motion.a>
                </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">

            <p className="text-[10px] tracking-[0.15em] text-white/30">
              © {new Date().getFullYear()} THE MAKEUP HALT BY MG. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] tracking-[0.15em] text-white/30">
              DESIGNED FOR EXCELLENCE
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>);

}
