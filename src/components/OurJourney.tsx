"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Compass, Sparkles, Flag, HeartHandshake, Gem, Plane } from "lucide-react";

export default function OurJourney() {
  const chapters = [
    {
      icon: Flag,
      chapterNumber: "01",
      title: "How We Met",
      text: "It started on a karting track on my 29th birthday, we celebrated together and went our separate ways, about a years after that we started to talk again.",
    },
    {
      icon: HeartHandshake,
      chapterNumber: "02",
      title: "Our Love Story",
      text: "From there was our first dates, we realised we had similar values and desires for life and decided we start dating, continued Roadtrips and late night phonecalls and video calls, shared prayer times every week online. Neither of us planned our love, only intention and somewhere between the intention, it just kept growing stronger one day at a time. We built to this day",
      image: "/images/moment_roadtrip.jpg",
    },
    {
      icon: Gem,
      chapterNumber: "03",
      title: "The Proposal",
      text: "On a quiet stretch if beach at golden hour, with the ring hidden in a coat pocket and the speech mostly forgotten, the question finally got asked. The answer was easy. The walk back to the longest, happiest one of our lives.",
      image: "/images/moment_proposal.jpg",
    },
    {
      icon: Plane,
      chapterNumber: "04",
      title: "The Next Chapter",
      text: "Now we are packing our favorite people, our families, and a few too many suitcases, and heading to a church in Uganda to make it official. This day is all about us, and we can't wait to begin the nect chapter with you in it.",
    },
  ];

  return (
    <section id="journey" className="min-h-screen py-20 px-4 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#B38F4D] font-semibold block mb-2">
            Our Journey
          </span>
          <div className="flex items-center justify-center space-x-2">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2C2723] font-normal">
              Our Story
            </h2>
            <Heart className="w-6 h-6 text-[#C5A059] fill-[#C5A059]/30 animate-pulse inline-block" />
          </div>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* Story Chapters Timeline */}
        <div className="relative border-l-2 border-[#E5D7BF] ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Timeline Pin Node */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] flex items-center justify-center text-[#B38F4D] shadow-sm group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Chapter Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(44,39,35,0.05)] border border-[#E8DFC9] luxury-border-gold transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(197,160,89,0.12)]">
                  
                  {/* Top Label */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#B38F4D]">
                      Chapter {chapter.chapterNumber}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]/40" />
                  </div>

                  {/* Title (H3) */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2723] font-medium mb-3">
                    {chapter.title}
                  </h3>

                  {/* Text */}
                  <p className="font-sans text-sm sm:text-base text-[#59524A] leading-relaxed font-light">
                    {chapter.text}
                  </p>

                  {/* Optional Chapter Image Thumbnail */}
                  {chapter.image && (
                    <div className="mt-5 relative w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-inner border border-[#EAE3D4]">
                      <Image
                        src={chapter.image}
                        alt={chapter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 672px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
