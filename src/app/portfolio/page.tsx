"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioImages = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6988-resized-1766573545957.jpeg?width=8000&height=8000&resize=contain",
    alt: "Traditional Red Bridal Look",
    category: "Bridal"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2569-1766573551869.jpeg?width=8000&height=8000&resize=contain",
    alt: "Modern Pastel Bridal Glam",
    category: "Bridal"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2572-1766573557906.jpeg?width=8000&height=8000&resize=contain",
    alt: "Classic Bridal Elegance",
    category: "Bridal"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6480-resized-1766573564056.jpeg?width=8000&height=8000&resize=contain",
    alt: "Soft Glam Bridal Reception",
    category: "Bridal"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_2568-1766573566510.jpeg?width=8000&height=8000&resize=contain",
    alt: "Dewy Bridal Finish",
    category: "Bridal"
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
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_1205-resized-1766574473225.jpeg?width=8000&height=8000&resize=contain",
    alt: "Elegant Bridal Glamour",
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
    category: "Bridal"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_6848-resized-1766574631460.jpeg?width=8000&height=8000&resize=contain",
    alt: "Radiant Emerald Bridal Glam",
    category: "Bridal"
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    alt: "Editorial look",
    category: "Editorial"
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    alt: "Natural glam",
    category: "Natural"
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/IMG_1015-resized-1766574378728.webp?width=8000&height=8000&resize=contain",
    alt: "Natural glow look",
    category: "Natural"
  },
  {
    src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    alt: "Evening glamour",
    category: "Glamour"
  },
  {
    src: "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&q=80",
    alt: "Fashion shoot",
    category: "Editorial"
  },
  {
    src: "https://images.unsplash.com/photo-1560577345-019f5c2c3c3e?w=800&q=80",
    alt: "Bold lips",
    category: "Glamour"
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    alt: "Makeup products",
    category: "Products"
  }
];

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const filters = ["All", "Bridal", "Editorial", "Glamour", "Natural"];
  const filteredImages =
    activeFilter === "All"
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/90 backdrop-blur-2xl py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative group flex items-center gap-4">
            <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-amber-400 transition-colors" />
            <span className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white">
              THE MAKEUP HALT
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link
              href="/"
              className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-amber-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-400 text-black rounded-full px-8 py-5 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-300 hover:scale-105"
            >
              <a
                href="https://form.typeform.com/to/HrxfV7DA"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK NOW
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-t border-white/5"
            >
              <div className="p-8 flex flex-col gap-6">
                <Link
                  href="/"
                  className="text-lg font-light tracking-[0.15em] text-white/80 hover:text-amber-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Button
                  asChild
                  className="bg-amber-500 hover:bg-amber-400 text-black rounded-full w-full py-6 text-sm font-semibold tracking-[0.15em] mt-4"
                >
                  <a
                    href="https://form.typeform.com/to/HrxfV7DA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BOOK NOW
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32 pb-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 border border-amber-500/30 rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">
                  Complete Portfolio
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.95] tracking-tight mb-8">
                <span className="block">The Art Of</span>
                <span className="block text-amber-400">Transformation</span>
              </h1>

              <p className="text-base md:text-lg text-white/50 font-light max-w-xl leading-relaxed">
                Browse through our full collection of bridal, editorial, and
                natural glamour looks. Every image represents a unique story of
                beauty and confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium rounded-full transition-all duration-500 ${
                    activeFilter === filter
                      ? "bg-amber-500 text-black"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </header>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-amber-400 text-[10px] tracking-[0.2em] uppercase block mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white text-lg font-light">{image.alt}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <footer className="mt-32 pt-20 border-t border-white/5 text-center">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-8">
              Ready to begin your journey?
            </h2>
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-400 text-black rounded-full px-12 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-300 group"
            >
              <a
                href="https://form.typeform.com/to/HrxfV7DA"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK YOUR SESSION <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </footer>
        </div>
      </main>

      <footer className="py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <p className="text-[10px] tracking-[0.15em] text-white/30">
            © {new Date().getFullYear()} THE MAKEUP HALT BY MG. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] tracking-[0.15em] text-white/30 hover:text-amber-400 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="text-[10px] tracking-[0.15em] text-white/30 hover:text-amber-400 transition-colors"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
