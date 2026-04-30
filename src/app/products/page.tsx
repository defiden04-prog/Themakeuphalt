"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Check,
  ChevronDown,
  Sparkles,
  Eye,
  Palette,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const product = {
  name: "OMBRE ESSENTIELLE",
  subtitle: "Multi-Use Longwearing Eyeshadow",
  brand: "CHANEL",
  price: "$40.00",
  priceINR: "INR 3,350",
  size: "0.08 OZ.",
  description:
    "An ultra-soft powder enriched with sage oil that delivers buildable, blendable color with up to 8 hours of wear and comfort. Use as eyeshadow, eyeliner, or brow color for a versatile, multi-use experience.",
  features: [
    "Multi-use: eyeshadow, eyeliner, brow color",
    "Up to 8 hours of wear and comfort",
    "Ophthalmologist-tested, suitable for contact lens wearers",
    "Ultra-soft powder enriched with sage oil",
    "Buildable coverage from sheer to intense",
    "Includes mirror and dual-ended brush",
  ],
  shades: [
    { id: "220", name: "BLANC PERLE", color: "#f5ece0", finish: "Shimmer" },
    { id: "224", name: "BLÉ D'OR ANTIQUE", color: "#c9a86c", finish: "Metallic" },
    { id: "228", name: "ROSE CHARNEL", color: "#c4908a", finish: "Satin" },
    { id: "230", name: "GRIS PARIS", color: "#8a8a8a", finish: "Matte" },
    { id: "232", name: "LILAS POUDRÉ", color: "#b8a0c4", finish: "Satin" },
    { id: "234", name: "BEIGE SABLE", color: "#d4b896", finish: "Matte" },
    { id: "238", name: "QUARTZ FUMÉ", color: "#9c8e80", finish: "Shimmer" },
    { id: "240", name: "BRUN FAUVE", color: "#7a5c3e", finish: "Matte" },
    { id: "242", name: "BEIGE SUEDE", color: "#c4a882", finish: "Matte" },
    { id: "246", name: "BOIS NOIR", color: "#2e2420", finish: "Matte" },
    { id: "248", name: "LATTE FRAPPÉ", color: "#a88c6e", finish: "Satin" },
  ],
  images: [
    "https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.2/w_1240/ombre-essentielle-multi-use-longwearing-eyeshadow-246-bois-noir-0-08oz--packshot-default-181246-8825418031134.jpg",
    "https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.2/w_1240/ombre-essentielle-multi-use-longwearing-eyeshadow-246-bois-noir-0-08oz--packshot-hover-181246-8825418489886.jpg",
  ],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function ProductsPage() {
  const [selectedShade, setSelectedShade] = useState(product.shades[9]); // BOIS NOIR default
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const detailsRef = useRef(null);
  const isDetailsInView = useInView(detailsRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30">
      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl py-4"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative group overflow-hidden">
            <motion.span
              className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white block"
              whileHover={{ y: -30 }}
              transition={{ duration: 0.3 }}
            >
              THE MAKEUP HALT
            </motion.span>
            <motion.span
              className="text-2xl md:text-3xl font-light tracking-[0.2em] text-amber-400 absolute top-0 left-0"
              initial={{ y: 30 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              THE MAKEUP HALT
            </motion.span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/#portfolio" },
              { label: "Services", href: "/#services" },
              { label: "Products", href: "/products" },
              { label: "Contact", href: "/#contact" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`text-[11px] font-medium tracking-[0.25em] uppercase transition-colors duration-300 relative group ${
                    item.label === "Products"
                      ? "text-amber-400"
                      : "text-white/60 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </motion.nav>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase"
        >
          <Link href="/" className="text-white/30 hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/30">Products</span>
          <span className="text-white/20">/</span>
          <span className="text-amber-400/80">{product.brand}</span>
        </motion.div>
      </div>

      {/* Product Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center p-12"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                      unoptimized
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute top-6 left-6 bg-amber-500/90 backdrop-blur-sm text-black px-4 py-2 rounded-full"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
                  Recommended
                </span>
              </motion.div>

              {/* Like button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    liked ? "text-red-400 fill-red-400" : "text-white/60"
                  }`}
                />
              </motion.button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all duration-300 ${
                    activeImage === i
                      ? "border-amber-500 ring-2 ring-amber-500/30"
                      : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-contain p-2 bg-white/[0.03]"
                    unoptimized
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col"
          >
            {/* Brand */}
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="text-[11px] tracking-[0.4em] uppercase text-amber-400/80">
                {product.brand}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extralight tracking-tight mb-2"
            >
              {product.name}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/40 font-light mb-6"
            >
              {product.subtitle}
            </motion.p>

            {/* Rating */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? "text-amber-400 fill-amber-400"
                        : "text-amber-400/40 fill-amber-400/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/40">4.2 / 5</span>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/40">15 shades</span>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeInUp} className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-light text-white">{product.price}</span>
              <span className="text-lg text-white/30">({product.priceINR})</span>
              <span className="text-[11px] tracking-[0.15em] text-white/30 uppercase">
                {product.size}
              </span>
            </motion.div>

            {/* Shade Selector */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                  Shade:{" "}
                  <span className="text-white">
                    {selectedShade.id} {selectedShade.name}
                  </span>
                </p>
                <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
                  {selectedShade.finish}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.shades.map((shade) => (
                  <motion.button
                    key={shade.id}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedShade(shade)}
                    className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                      selectedShade.id === shade.id
                        ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0a]"
                        : "hover:ring-1 hover:ring-white/30 hover:ring-offset-1 hover:ring-offset-[#0a0a0a]"
                    }`}
                    style={{ backgroundColor: shade.color }}
                    title={`${shade.id} ${shade.name}`}
                  >
                    {selectedShade.id === shade.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check
                          className={`w-4 h-4 ${
                            shade.color === "#2e2420" ||
                            shade.color === "#7a5c3e"
                              ? "text-white"
                              : "text-black"
                          }`}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed mb-8"
            >
              {product.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black rounded-full py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-300 group"
                >
                  <a
                    href="https://www.chanel.com/in/makeup/p/181246/ombre-essentielle-multi-use-longwearing-eyeshadow/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    SHOP ON CHANEL
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 h-auto text-[11px] tracking-[0.2em] font-semibold transition-all duration-500 bg-transparent"
                >
                  <a
                    href="https://form.typeform.com/to/HrxfV7DA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BOOK A SESSION
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Key Features Icons */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-4 py-6 border-t border-b border-white/10"
            >
              {[
                { icon: <Eye className="w-5 h-5" />, label: "Ophthalmologist Tested" },
                { icon: <Sparkles className="w-5 h-5" />, label: "8 Hour Wear" },
                { icon: <Palette className="w-5 h-5" />, label: "Multi-Use Formula" },
              ].map((feat) => (
                <div key={feat.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-400">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-white/40">
                    {feat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Accordion sections */}
            <motion.div variants={fadeInUp} className="mt-6 space-y-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                  Product Details
                </span>
                <motion.div
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </motion.div>
              </button>
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="py-4 space-y-3">
                      {product.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-white/50"
                        >
                          <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowIngredients(!showIngredients)}
                className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                  How To Apply
                </span>
                <motion.div
                  animate={{ rotate: showIngredients ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </motion.div>
              </button>
              <AnimatePresence>
                {showIngredients && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="py-4 space-y-3 text-sm text-white/50 leading-relaxed">
                      <p>
                        <strong className="text-white/70">As Eyeshadow:</strong> Sweep
                        across the eyelid with the fluffy end of the dual-ended brush.
                        Build intensity with additional layers.
                      </p>
                      <p>
                        <strong className="text-white/70">As Eyeliner:</strong> Use
                        the tapered end of the brush dampened with water for a precise,
                        intense line along the lash line.
                      </p>
                      <p>
                        <strong className="text-white/70">As Brow Color:</strong>{" "}
                        Lightly feather through brows using the tapered brush for
                        subtle definition and natural fullness.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why We Recommend Section */}
      <section ref={detailsRef} className="py-24 px-6 md:px-12 relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
        />
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-amber-400 text-[11px] tracking-[0.3em] uppercase mb-4 block"
            >
              Artist&apos;s Pick
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extralight tracking-tight"
            >
              Why We <span className="text-amber-400">Recommend</span> This
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Versatile Formula",
                desc: "One product replaces three - use as eyeshadow, liner, or brow color. Perfect for on-the-go touch-ups during events and photoshoots.",
                icon: <Palette className="w-6 h-6" />,
              },
              {
                title: "All-Day Wear",
                desc: "Clinically tested for 8 hours of comfortable wear. Stays put through ceremonies, receptions, and emotional moments without creasing.",
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                title: "Buildable Pigment",
                desc: "From a soft wash of color to intense drama - the ultra-fine powder blends seamlessly for any look, any occasion.",
                icon: <Eye className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                whileHover={{ y: -8 }}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500/20 transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-light mb-3 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 md:px-12 border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            <div className="max-w-sm">
              <Link href="/">
                <p className="text-2xl font-light tracking-[0.15em] mb-6">
                  THE MAKEUP HALT
                </p>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed">
                Defining the new standard of bridal and editorial beauty in India.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Navigate
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Gallery", href: "/#portfolio" },
                    { label: "Services", href: "/#services" },
                    { label: "Products", href: "/products" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Legal
                </p>
                <div className="flex flex-col gap-3">
                  {["Privacy", "Terms"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Social
                </p>
                <a
                  href="https://www.instagram.com/themakeuphalt_with_mg?igsh=dDdqbzc5OHJkZzl6&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <p className="text-[10px] tracking-[0.15em] text-white/30">
              &copy; {new Date().getFullYear()} THE MAKEUP HALT BY MG. ALL RIGHTS
              RESERVED.
            </p>
            <p className="text-[10px] tracking-[0.15em] text-white/30">
              DESIGNED FOR EXCELLENCE
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
