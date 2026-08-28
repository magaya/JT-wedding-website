"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, Heart, Mail, Phone, User, Users, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { submitRSVP } from "@/lib/api";
import { RSVPFormData } from "@/types";

export default function RsvpSection() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    phone: "",
    attending: true,
    guest_count: 1,
    dietary_notes: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A059", "#E6CA85", "#D4AF37", "#FFFFFF", "#1C3F2D"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      await submitRSVP(formData);
      setSubmitted(true);
      if (formData.attending) {
        triggerConfetti();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="min-h-screen py-20 px-4 sm:px-6 bg-[#F5EFEB] relative">
      <div className="max-w-2xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* User Requested H2 */}
          <h2 className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-[#B38F4D] font-bold block mb-2">
            BE OUR GUEST
          </h2>

          {/* User Requested H1 */}
          <h1 className="font-serif text-4xl sm:text-6xl text-[#2C2723] font-medium tracking-tight mb-3">
            RSVP
          </h1>

          {/* User Requested H3 */}
          <h3 className="font-serif italic text-lg sm:text-xl text-[#736B63]">
            Please let us know if you&apos;ll be joining us by August 1st 2027
          </h3>
          <div className="h-0.5 w-16 bg-[#C5A059]/40 mx-auto mt-4" />
        </motion.div>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] luxury-border-gold"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center space-x-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A69785]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all placeholder:text-[#B5AAA0]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                    Email address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A69785]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all placeholder:text-[#B5AAA0]"
                    />
                  </div>
                </div>

                {/* Phone Number (WhatsApp) */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                    Phone number (preferably Whatsapp) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A69785]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +256 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all placeholder:text-[#B5AAA0]"
                    />
                  </div>
                </div>

                {/* Will you attend */}
                <div className="space-y-2 pt-2">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                    Will you attend *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: true })}
                      className={`p-4 rounded-xl border flex items-center justify-center space-x-2 transition-all font-serif text-lg cursor-pointer ${
                        formData.attending
                          ? "bg-[#1C3F2D] text-white border-[#1C3F2D] shadow-md ring-2 ring-[#1C3F2D]/20"
                          : "bg-[#FAF7F2] text-[#59524A] border-[#DFCBB0] hover:border-[#B38F4D]"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${formData.attending ? "fill-white" : ""}`} />
                      <span>Joyfully accept</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: false })}
                      className={`p-4 rounded-xl border flex items-center justify-center space-x-2 transition-all font-serif text-lg cursor-pointer ${
                        !formData.attending
                          ? "bg-[#59524A] text-white border-[#59524A] shadow-md ring-2 ring-[#59524A]/20"
                          : "bg-[#FAF7F2] text-[#59524A] border-[#DFCBB0] hover:border-[#B38F4D]"
                      }`}
                    >
                      <span>Regretfully decline</span>
                    </button>
                  </div>
                </div>

                {/* Guest Count (if attending) */}
                {formData.attending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                      Number of Guests (including yourself)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A69785]">
                        <Users className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.guest_count}
                        onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) || 1 })}
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Message for the couple */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#59524A] font-semibold">
                    Message for the couple
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#A69785]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Share your warm wishes, prayers, or memories with Joseph & Thea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-sm text-[#2C2723] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all placeholder:text-[#B5AAA0]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full gold-gradient-button text-[#2C2723] font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin mr-2">◌</span>
                    ) : (
                      <Send className="w-4 h-4 text-[#2C2723]" />
                    )}
                    <span>{loading ? "Sending RSVP..." : "Send RSVP"}</span>
                  </button>
                </div>

              </form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#1C3F2D]/10 border-2 border-[#1C3F2D] text-[#1C3F2D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-medium">
                    {formData.attending ? "Thank You for Celebrating With Us!" : "Thank You for Letting Us Know"}
                  </h2>
                  <p className="font-sans text-sm text-[#59524A] mt-2 max-w-md mx-auto leading-relaxed">
                    {formData.attending
                      ? `We are overjoyed that you will be joining us, ${formData.name}! A confirmation has been saved.`
                      : `You will be dearly missed, ${formData.name}. Thank you for your warm thoughts and prayers.`}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-[#DFCBB0] text-xs uppercase tracking-wider font-semibold text-[#59524A] hover:bg-[#FAF7F2] transition-colors"
                  >
                    Edit Response
                  </button>
                  <a
                    href="#hero"
                    className="px-6 py-2.5 rounded-full bg-[#2C2723] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1A1816] transition-colors"
                  >
                    Back to Top
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
