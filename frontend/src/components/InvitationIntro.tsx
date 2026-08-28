"use client";

import React from "react";
import { motion } from "framer-motion";
import { Church, Sparkles } from "lucide-react";

export default function InvitationIntro() {
  return (
    <section id="statement" className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#FAF7F2] relative">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8DFC9_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        {/* The White Invitation Statement Card */}
        <div className="relative bg-white rounded-2xl p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold">
          
          {/* Top Monogram Ornament */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-[#FDFBF7] mb-3">
              <Church className="w-5 h-5 text-[#B38F4D]" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-px w-10 bg-[#D4AF37]/50" />
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <div className="h-px w-10 bg-[#D4AF37]/50" />
            </div>
          </div>

          {/* User Requested Statement */}
          <div className="space-y-6">
            <span className="font-script text-3xl sm:text-4xl text-[#B38F4D] block">
              We are getting married
            </span>

            <p className="font-serif text-2xl sm:text-3xl text-[#2C2723] leading-relaxed font-normal">
              &ldquo;Joseph and Thea are getting married at Kampala Baptist church in Uganda and would be honoured to have you celebrate with them.&rdquo;
            </p>

            <div className="pt-4">
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#8C8276] font-medium">
                Kampala Baptist Church • Kampala, Uganda
              </p>
              <p className="font-sans text-xs tracking-widest text-[#B38F4D] uppercase mt-1">
                Friday, September 3rd, 2027
              </p>
            </div>
          </div>

          {/* Bottom Flourish */}
          <div className="mt-10 flex items-center justify-center space-x-3 text-[#C5A059]">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-serif italic text-sm text-[#736B63]">with joy & love</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
