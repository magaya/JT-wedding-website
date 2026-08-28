"use client";

import React, { useState } from "react";
import EnvelopeHero from "@/components/EnvelopeHero";
import InvitationIntro from "@/components/InvitationIntro";
import CountdownTimer from "@/components/CountdownTimer";
import OurJourney from "@/components/OurJourney";
import DayProgram from "@/components/DayProgram";
import MomentsGallery from "@/components/MomentsGallery";
import EventDetails from "@/components/EventDetails";
import DressCode from "@/components/DressCode";
import RsvpSection from "@/components/RsvpSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export default function WeddingInvitationPage() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2C2723] relative">
      {/* Floating Navigation Pill */}
      <FloatingNavbar />

      {/* Floating Audio Player */}
      <AudioPlayer />

      {/* Page 1: Envelope Opening Animation & Couple Cover */}
      <EnvelopeHero onOpen={() => setIsOpened(true)} isOpened={isOpened} />

      {/* Subsequent Sections (Always available or smooth reveal after opening) */}
      <div className="relative">
        {/* Page 2: Church Announcement Statement */}
        <InvitationIntro />

        {/* Page 3: Countdown Timer */}
        <CountdownTimer />

        {/* Page 4: Our Journey & 4 Story Chapters */}
        <OurJourney />

        {/* Page 5: Day Program Timeline */}
        <DayProgram />

        {/* Page 6: Moments & Photo Lightbox */}
        <MomentsGallery />

        {/* Page 7: Event Details, Google Maps Preview & Add to Calendar */}
        <EventDetails />

        {/* Page 8: Dress Code & Black Guests Illustration */}
        <DressCode />

        {/* Page 9: RSVP Form & Database Persistence */}
        <RsvpSection />
      </div>

      {/* Luxury Footer */}
      <footer className="py-16 px-4 bg-[#23201D] text-[#FAF7F2] text-center border-t border-[#C5A059]/30">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-script text-4xl sm:text-5xl text-[#E6CA85]">
              Joseph & Thea
            </span>
          </div>

          <div className="flex items-center justify-center space-x-3 text-[#C5A059]">
            <div className="h-px w-10 bg-[#C5A059]/40" />
            <Heart className="w-4 h-4 fill-[#C5A059]" />
            <div className="h-px w-10 bg-[#C5A059]/40" />
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C2B7A8]">
            September 3, 2027 &bull; Kampala, Uganda
          </p>

          <p className="font-serif italic text-sm text-[#8C8070] pt-2">
            &ldquo;And over all these virtues put on love, which binds them all together in perfect unity.&rdquo; &bull; Colossians 3:14
          </p>

          <div className="pt-6 border-t border-white/10">
            <Link
              href="/admin"
              className="font-sans text-[11px] uppercase tracking-widest text-[#8C8070] hover:text-[#E6CA85] transition-colors"
            >
              Couple / Admin RSVP Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
