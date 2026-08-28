"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, Images, Heart } from "lucide-react";

export default function MomentsGallery() {
  const photos = [
    {
      src: "/images/couple_hero.jpg",
      title: "Joseph & Thea",
      caption: "Our forever begins here",
    },
    {
      src: "/images/moment_proposal.jpg",
      title: "The Golden Hour Proposal",
      caption: "On a quiet stretch of beach where she said yes",
    },
    {
      src: "/images/moment_roadtrip.jpg",
      title: "Roadtrips & Laughter",
      caption: "Every adventure brought us closer together",
    },
    {
      src: "/images/dress_code.jpg",
      title: "Elegance & Style",
      caption: "Celebrating in refined style with our loved ones",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="moments" className="min-h-screen py-20 px-4 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C2723] font-medium tracking-tight mb-2">
            Moments
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#736B63]">
            Glimpse of Us
          </p>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* Main Photo Carousel Frame */}
        <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold">
          
          {/* Main Large Image Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-[#F5EFEB] group">
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Gradient Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E6CA85] font-semibold">
                Photo {currentIndex + 1} of {photos.length}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-1">
                {photos[currentIndex].title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#F5EFEB] font-light mt-1 max-w-md">
                {photos[currentIndex].caption}
              </p>
            </div>

            {/* Expand / Lightbox Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md"
              title="View Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Arrow Navigation */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#2C2723] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#2C2723] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-4">
            {photos.map((photo, index) => (
              <button
                key={photo.title + index}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-[#C5A059] shadow-md scale-102"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 25vw, 200px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Open Gallery Modal Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#B38F4D] hover:text-[#8C6D33] transition-colors py-2 px-4 rounded-full border border-[#DFCBB0] hover:border-[#B38F4D] bg-[#FDFBF7]"
            >
              <Images className="w-4 h-4" />
              <span>View Full Moments Gallery</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
         LIGHTBOX MODAL
         ======================================================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[currentIndex].src}
                alt={photos[currentIndex].title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-serif text-2xl text-[#E6CA85]">{photos[currentIndex].title}</h2>
              <p className="font-sans text-sm text-gray-300 mt-1">{photos[currentIndex].caption}</p>
            </div>

            {/* Modal Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
