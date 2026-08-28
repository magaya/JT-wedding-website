"use client";

import React from "react";
import { motion } from "framer-motion";
import { Church, Users, Wine, Heart, Utensils, Sparkles, Music, Disc } from "lucide-react";

export default function DayProgram() {
  const schedule = [
    {
      time: "11:00 AM",
      title: "Wedding Service",
      description: "Arrival to church.",
      icon: Church,
      locationBadge: "Kampala Baptist Church",
    },
    {
      time: "3:00 PM",
      title: "Guest Arrival",
      description: "Arrival to church.",
      icon: Users,
      locationBadge: "Resort Grounds",
    },
    {
      time: "3:30 PM",
      title: "Cocktail Hour",
      description: "Champagne, canapes, and conversation in the hall",
      icon: Wine,
      locationBadge: "Lakeside Terrace",
    },
    {
      time: "4:30 PM",
      title: "Ceremony",
      description: "We say 'I do', surrounded by the people we love most.",
      icon: Heart,
      locationBadge: "Beachfront Altar",
      featured: true,
    },
    {
      time: "6:00 PM",
      title: "Cake Cutting",
      description: "A sweet moment to share before the feast begins",
      icon: Sparkles,
      locationBadge: "Grand Pavilion",
    },
    {
      time: "7:00 PM",
      title: "Dinner",
      description: "A long table dinner with toasts and good company",
      icon: Utensils,
      locationBadge: "Banquet Hall",
    },
    {
      time: "9:00 PM",
      title: "Party",
      description: "Drinks flow, music starts - the celebration begins",
      icon: Music,
      locationBadge: "Lounge & Bar",
    },
    {
      time: "10:00 PM",
      title: "Dancing",
      description: "Dance the night away under the chandeliers",
      icon: Disc,
      locationBadge: "Main Ballroom",
    },
  ];

  return (
    <section id="program" className="min-h-screen py-20 px-4 sm:px-6 bg-[#F5EFEB] relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2C2723] font-medium tracking-tight mb-2">
            Day Program
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#736B63]">
            What we have planned for you
          </p>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* Schedule List */}
        <div className="space-y-4">
          {schedule.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.time + item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                  item.featured
                    ? "bg-white border-[#C5A059] shadow-[0_10px_30px_rgba(197,160,89,0.18)] ring-1 ring-[#C5A059]/40"
                    : "bg-white/80 hover:bg-white border-[#E8DFC9] hover:border-[#C5A059]/60 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Time & Icon */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      item.featured
                        ? "bg-[#C5A059] text-white shadow-md"
                        : "bg-[#FAF7F2] text-[#B38F4D] border border-[#DFCBB0] group-hover:bg-[#FAF0D9]"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-bold text-sm sm:text-base tracking-wider text-[#B38F4D]">
                          {item.time}
                        </span>
                        {item.featured && (
                          <span className="bg-[#C5A059]/15 text-[#916E28] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                            Key Moment
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl text-[#2C2723] font-medium mt-0.5">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* Right: Description & Location */}
                  <div className="sm:text-right pl-16 sm:pl-0">
                    <p className="font-sans text-xs sm:text-sm text-[#59524A] font-normal leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-block text-[11px] font-sans tracking-wider uppercase text-[#8C8276] mt-1">
                      {item.locationBadge}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
