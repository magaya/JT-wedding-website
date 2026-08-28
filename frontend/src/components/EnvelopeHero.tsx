"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Heart } from "lucide-react";

interface EnvelopeHeroProps {
  onOpen?: () => void;
  isOpened?: boolean;
}

export default function EnvelopeHero({ onOpen, isOpened: externalOpened }: EnvelopeHeroProps) {
  const [isOpen, setIsOpen] = useState(externalOpened || false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#F7F3EB]">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFDF9] via-[#F6F1E6] to-[#ECE5D8] -z-10" />
      
      {/* Background Decorative Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-[#C5A059]/15 pointer-events-none -z-10" />
      <div className="absolute w-[800px] h-[800px] rounded-full border border-[#C5A059]/10 pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================
             CLOSED ENVELOPE STATE
             ======================================================== */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto flex flex-col items-center text-center cursor-pointer select-none"
            onClick={handleOpen}
          >
            {/* Top Monogram Header */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <span className="font-script text-4xl sm:text-5xl text-[#B38F4D] block">
                Joseph & Thea
              </span>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#736B63] mt-1">
                Formal Wedding Invitation
              </p>
            </motion.div>

            {/* Envelope Graphic Container */}
            <div className="relative w-full aspect-[4/3] max-w-[400px] bg-[#FAF8F5] rounded-xl shadow-[0_20px_50px_rgba(44,39,35,0.12)] border border-[#E5D7BF] p-6 flex flex-col items-center justify-center overflow-hidden group">
              {/* Envelope Triangular Flap Borders */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F2ECE0] to-transparent border-b border-[#E1D1B6]/60 clip-path-triangle" />
              
              {/* Corner Gold Flourishes */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/40 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/40 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/40 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/40 rounded-br-sm pointer-events-none" />

              {/* Gold Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-2xl animate-pulse-seal border-2 border-[#E6CA85]">
                  <Image
                    src="/images/wax_seal.jpg"
                    alt="JT Wax Seal"
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="mt-5 flex items-center space-x-2 bg-[#FAF5EC]/90 px-4 py-1.5 rounded-full border border-[#C5A059]/30 text-[#8B6E33] shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="font-sans text-xs font-medium tracking-wider uppercase">
                    Tap to Open Invitation
                  </span>
                </div>
              </motion.div>
            </div>

            <p className="mt-8 font-sans text-xs text-[#8C8276] tracking-widest uppercase">
              September 3, 2027 • Kampala, Uganda
            </p>
          </motion.div>
        ) : (
          /* ========================================================
             OPENED INVITATION HERO STATE (Couple Picture Cover)
             ======================================================== */
          <motion.div
            key="opened-card"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mx-auto flex flex-col items-center"
          >
            {/* The Luxury Wedding Card */}
            <div className="relative w-full bg-white rounded-2xl shadow-[0_25px_60px_rgba(44,39,35,0.15)] border border-[#E8DFC9] p-4 sm:p-7 overflow-hidden luxury-border-gold">
              
              {/* Couple Photo Container */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-inner bg-[#F5EFEB]">
                <Image
                  src="/images/couple_hero.jpg"
                  alt="Joseph and Thea"
                  fill
                  sizes="(max-width: 768px) 100vw, 512px"
                  className="object-cover object-center"
                  priority
                />
                
                {/* Photo Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white text-center" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-0 right-0 px-6 text-center text-white z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="font-script text-4xl sm:text-6xl text-[#FCEAC2] drop-shadow-md block">
                      Joseph & Thea
                    </span>
                    <div className="flex items-center justify-center space-x-3 my-2">
                      <div className="h-px w-8 bg-[#E6CA85]" />
                      <Heart className="w-3.5 h-3.5 text-[#E6CA85] fill-[#E6CA85]" />
                      <div className="h-px w-8 bg-[#E6CA85]" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FAF5EC] font-light">
                      Friday, September 3, 2027
                    </p>
                    <p className="font-sans text-[11px] tracking-widest text-[#E6CA85] uppercase mt-1">
                      Kampala, Uganda
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Card Note */}
              <div className="mt-5 text-center px-2">
                <span className="font-serif italic text-lg sm:text-xl text-[#6B5D4E] block">
                  Together with their families
                </span>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#A69785] mt-1">
                  Invite you to share in their joy
                </p>
              </div>
            </div>

            {/* Floating Scroll Down Indicator */}
            <motion.a
              href="#statement"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-col items-center text-[#8C7A5B] hover:text-[#5E513A] transition-colors group cursor-pointer"
            >
              <span className="font-sans text-[11px] tracking-[0.25em] uppercase mb-1.5 font-medium">
                Scroll to Read Invitation
              </span>
              <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-white/80 shadow-sm group-hover:border-[#C5A059] group-hover:scale-110 transition-all">
                <ChevronDown className="w-4 h-4 animate-bounce text-[#C5A059]" />
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
