"use client";

import React, { useState, useEffect } from "react";
import { Heart, Calendar, Clock, BookOpen, Images, MapPin, Sparkles, UserCheck } from "lucide-react";

export default function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { id: "hero", label: "Invite", icon: Heart },
    { id: "statement", label: "Church", icon: Sparkles },
    { id: "countdown", label: "Countdown", icon: Clock },
    { id: "journey", label: "Story", icon: BookOpen },
    { id: "program", label: "Program", icon: Calendar },
    { id: "moments", label: "Moments", icon: Images },
    { id: "details", label: "Venue", icon: MapPin },
    { id: "dress-code", label: "Attire", icon: Sparkles },
    { id: "rsvp", label: "RSVP", icon: UserCheck, highlight: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 300px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 350;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-fit">
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(44,39,35,0.12)] border border-[#E8DFC9]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                item.highlight && !isActive
                  ? "bg-[#1C3F2D] text-white hover:bg-[#153022]"
                  : isActive
                  ? "bg-[#C5A059] text-white shadow-sm font-semibold"
                  : "text-[#736B63] hover:text-[#2C2723] hover:bg-[#FAF7F2]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
