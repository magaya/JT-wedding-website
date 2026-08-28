"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Shirt } from "lucide-react";

export default function DressCode() {
  const colorPalette = [
    { name: "Emerald Green", hex: "#1C3F2D", text: "#FFFFFF" },
    { name: "Champagne Gold", hex: "#C5A059", text: "#2C2723" },
    { name: "Midnight Charcoal", hex: "#23242A", text: "#FFFFFF" },
    { name: "Warm Ivory", hex: "#F3EDE2", text: "#2C2723" },
    { name: "Rich Navy", hex: "#1E2A38", text: "#FFFFFF" },
  ];

  return (
    <section id="dress-code" className="min-h-screen py-20 px-4 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C2723] font-medium tracking-tight mb-2">
            Dress Code
          </h1>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* Dress Code Luxury Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold text-center"
        >
          {/* Artistic Sketch of Black people dressed elegant and formally */}
          <div className="relative w-full aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden shadow-inner border border-[#EAE3D4] bg-[#F7F4EE] mb-8 group">
            <Image
              src="/images/dress_code.jpg"
              alt="Artistic sketch of Black people dressed elegant and formally"
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              priority
            />
          </div>

          {/* User Requested Subtitle (H3) & Text */}
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-[#B38F4D]">
              <Sparkles className="w-4 h-4" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold">
                Inspiration & Guidelines
              </span>
              <Sparkles className="w-4 h-4" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-medium">
              Elegant and Formal Attire
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#59524A] font-light leading-relaxed">
              &ldquo;Guests are encouraged to dress to impress refined and polished, Black tie not required.&rdquo;
            </p>
          </div>

          {/* Color Palette Inspiration */}
          <div className="mt-10 pt-8 border-t border-[#EAE3D4]">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#8C8276] font-semibold block mb-4">
              Suggested Color Palette
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {colorPalette.map((color) => (
                <div
                  key={color.name}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#DFCBB0] bg-white shadow-xs"
                >
                  <div
                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="font-sans text-xs text-[#59524A] font-medium">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
