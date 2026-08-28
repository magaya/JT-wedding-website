"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, ExternalLink, Download, Heart, Church } from "lucide-react";
import { getGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export default function EventDetails() {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  // Google Maps link for Oguzulu Resort Beach Mukono Uganda
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Oguzulu+Resort+Beach+Mukono+Uganda";

  return (
    <section id="details" className="min-h-screen py-20 px-4 sm:px-6 bg-[#F5EFEB] relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C2723] font-medium tracking-tight mb-2">
            Event Details
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#736B63] max-w-xl mx-auto">
            We can&apos;t wait to celebrate this special day with you. Here&apos;s everything you need to know.
          </p>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* Main Event Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold space-y-8"
        >
          {/* Ceremony Title */}
          <div className="text-center pb-6 border-b border-[#EAE3D4]">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 text-[#B38F4D] mb-3">
              <Heart className="w-5 h-5 fill-[#B38F4D]/20" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-medium">
              Ceremony & Reception
            </h2>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#8C8276] mt-1 font-medium">
              Friday, September 3rd, 2027
            </p>
          </div>

          {/* Time & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Time Card */}
            <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#E8DFC9] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DFCBB0] flex items-center justify-center text-[#B38F4D] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C8276]">
                  Time
                </span>
                <p className="font-serif text-2xl text-[#2C2723] font-medium mt-0.5">
                  4:30 PM
                </p>
                <p className="font-sans text-xs text-[#736B63] mt-1">
                  (Church service begins at 11:00 AM)
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#E8DFC9] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#DFCBB0] flex items-center justify-center text-[#B38F4D] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C8276]">
                  Location
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#2C2723] font-medium mt-0.5">
                  Oguzulu Resort Beach
                </p>
                <p className="font-sans text-xs text-[#736B63] mt-1">
                  Mukono, Uganda
                </p>
              </div>
            </div>

          </div>

          {/* Google Maps Interactive Embed Preview Square */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden border border-[#DFCBB0] shadow-inner bg-[#EFECE6]">
              {/* Google Maps Embed iframe */}
              <iframe
                title="Google Maps Location of Oguzulu Resort Beach, Mukono"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Mukono%20Resort%20Beach%20Uganda&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full grayscale-[25%] contrast-[1.05]"
              />
            </div>

            {/* Open in Maps Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#2C2723] hover:bg-[#1A1816] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg group"
              >
                <MapPin className="w-4 h-4 text-[#E6CA85]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Add to Calendar Button with Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full gold-gradient-button text-[#2C2723] text-xs uppercase tracking-[0.2em] font-semibold shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Calendar</span>
                </button>

                {calendarMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-full sm:w-56 bg-white rounded-xl shadow-xl border border-[#E8DFC9] p-2 z-30 space-y-1">
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-[#2C2723] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                      onClick={() => setCalendarMenuOpen(false)}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Google Calendar</span>
                    </a>
                    <button
                      onClick={() => {
                        downloadIcsFile();
                        setCalendarMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-[#2C2723] hover:bg-[#FAF7F2] rounded-lg transition-colors text-left"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Apple iCal / Outlook (.ics)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
