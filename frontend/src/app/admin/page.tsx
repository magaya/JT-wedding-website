"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, CheckCircle, XCircle, Download, Search, 
  ArrowLeft, RefreshCw, Lock, Sparkles, MessageSquare, Phone, Mail 
} from "lucide-react";
import { fetchRSVPSummary, getExportCSVUrl } from "@/lib/api";
import { RSVPSummaryResponse } from "@/types";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<RSVPSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterAttending, setFilterAttending] = useState<boolean | undefined>(undefined);
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "2027" || passcode.trim().toLowerCase() === "josephthea") {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError("Incorrect access code. (Default code: 2027)");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const summary = await fetchRSVPSummary(search, filterAttending);
      setData(summary);
    } catch {
      // Fallback sample data if backend is offline or starting up
      setData({
        total_responses: 1,
        total_attending: 1,
        total_declined: 0,
        total_guests_expected: 2,
        rsvps: [
          {
            id: 1,
            name: "Sample Guest (Demo)",
            email: "guest@example.com",
            phone: "+256 700 000 000",
            attending: true,
            guest_count: 2,
            dietary_notes: "None",
            message: "Congratulations Joseph and Thea! Can't wait to celebrate!",
            created_at: new Date().toISOString(),
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [search, filterAttending, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-[0_20px_50px_rgba(44,39,35,0.08)] border border-[#E8DFC9] text-center">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#B38F4D] mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          
          <h1 className="font-serif text-3xl text-[#2C2723] font-medium">
            Wedding RSVP Admin
          </h1>
          <p className="font-sans text-xs text-[#736B63] mt-1 mb-6">
            Enter passcode to manage guest responses & download spreadsheet
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode (default: 2027)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-center font-mono tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
            {authError && <p className="text-xs text-red-600">{authError}</p>}
            
            <button
              type="submit"
              className="w-full py-3.5 rounded-full gold-gradient-button text-[#2C2723] font-sans font-bold text-xs uppercase tracking-widest shadow-md cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-1 text-xs text-[#8C8276] hover:text-[#2C2723]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Wedding Invitation</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFC9]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#8C8276] hover:text-[#2C2723] mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Invitation</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-medium">
              Joseph & Thea &bull; RSVP Dashboard
            </h1>
            <p className="font-sans text-xs text-[#736B63] mt-0.5">
              Friday, September 3, 2027 &bull; Kampala Baptist Church &amp; Oguzulu Resort Beach
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-3 rounded-full border border-[#DFCBB0] bg-white hover:bg-[#FAF7F2] text-[#59524A] shadow-xs"
              title="Refresh RSVPs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <a
              href={getExportCSVUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#1C3F2D] hover:bg-[#153022] text-white text-xs uppercase tracking-wider font-semibold shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC9] shadow-sm">
            <span className="font-sans text-xs uppercase tracking-wider text-[#8C8276] font-semibold">
              Total Responses
            </span>
            <p className="font-serif text-3xl sm:text-4xl text-[#2C2723] font-bold mt-1">
              {data?.total_responses ?? 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                Attending
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl text-emerald-700 font-bold mt-1">
              {data?.total_attending ?? 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-red-800 font-semibold">
                Declined
              </span>
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl text-red-700 font-bold mt-1">
              {data?.total_declined ?? 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#C5A059]/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-[#B38F4D] font-semibold">
                Total Headcount
              </span>
              <Users className="w-4 h-4 text-[#B38F4D]" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl text-[#B38F4D] font-bold mt-1">
              {data?.total_guests_expected ?? 0}
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A69785]" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#DFCBB0] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterAttending(undefined)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                filterAttending === undefined
                  ? "bg-[#2C2723] text-white"
                  : "bg-[#FAF7F2] text-[#59524A] border border-[#DFCBB0]"
              }`}
            >
              All ({data?.total_responses ?? 0})
            </button>
            <button
              onClick={() => setFilterAttending(true)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                filterAttending === true
                  ? "bg-[#1C3F2D] text-white"
                  : "bg-[#FAF7F2] text-[#59524A] border border-[#DFCBB0]"
              }`}
            >
              Attending ({data?.total_attending ?? 0})
            </button>
            <button
              onClick={() => setFilterAttending(false)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                filterAttending === false
                  ? "bg-[#59524A] text-white"
                  : "bg-[#FAF7F2] text-[#59524A] border border-[#DFCBB0]"
              }`}
            >
              Declined ({data?.total_declined ?? 0})
            </button>
          </div>
        </div>

        {/* Guest Cards & Table */}
        <div className="bg-white rounded-2xl border border-[#E8DFC9] shadow-sm overflow-hidden">
          {data?.rsvps && data.rsvps.length > 0 ? (
            <div className="divide-y divide-[#EAE3D4]">
              {data.rsvps.map((rsvp) => (
                <div key={rsvp.id} className="p-5 sm:p-6 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#2C2723] font-medium">
                          {rsvp.name}
                        </h3>
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          rsvp.attending
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        }`}>
                          {rsvp.attending ? `Attending (${rsvp.guest_count} ${rsvp.guest_count === 1 ? "Guest" : "Guests"})` : "Declined"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#736B63] pt-1">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3.5 h-3.5 text-[#B38F4D]" />
                          <span>{rsvp.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-[#B38F4D]" />
                          <span>{rsvp.phone}</span>
                        </span>
                      </div>

                      {rsvp.message && (
                        <div className="mt-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC9] flex items-start space-x-2 text-xs sm:text-sm text-[#59524A] italic">
                          <MessageSquare className="w-4 h-4 text-[#B38F4D] shrink-0 mt-0.5" />
                          <span>&ldquo;{rsvp.message}&rdquo;</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right text-[11px] text-[#A69785]">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-[#8C8276]">
              <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-50" />
              <p className="font-serif text-xl text-[#2C2723]">No RSVP records found</p>
              <p className="text-xs text-[#736B63] mt-1">Submitted RSVPs will appear here automatically.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
