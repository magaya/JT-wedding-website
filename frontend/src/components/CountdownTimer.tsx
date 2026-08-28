"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Target: September 3, 2027 11:00:00 AM EAT (UTC+3)
  const targetDate = new Date("2027-09-03T11:00:00+03:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#F5EFEB] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#C5A059]/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C5A059]/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg mx-auto text-center"
      >
        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold relative">
          
          {/* Header Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#C5A059]/30 bg-[#FAF7F2] text-[#B38F4D] mb-5">
            <Clock className="w-5 h-5" />
          </div>

          {/* User Requested Titles */}
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-medium tracking-tight mb-2">
            Counting the days.
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#7A6E60] mb-8 sm:mb-10">
            to the most special day of our lives
          </p>

          {/* Timer Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Number Box */}
                <div className="w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#FDFBF7] to-[#F5EFEB] border border-[#DFCBB0] shadow-sm flex items-center justify-center p-2 group hover:border-[#C5A059] transition-colors">
                  <span className="font-serif text-2xl sm:text-4xl font-semibold text-[#2C2723]">
                    {isClient ? String(unit.value).padStart(2, "0") : "00"}
                  </span>
                </div>
                
                {/* Label */}
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#8C8276] mt-2 font-medium">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Date Stamp */}
          <div className="inline-flex items-center space-x-2 bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#E8DFC9] text-[#736B63] text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#B38F4D]" />
            <span>September 3, 2027 • Save The Date</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
