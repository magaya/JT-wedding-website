"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle romantic ambient harmonic synthesizer using Web Audio API
  const playRomanticChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Chord progression in F Major / D Minor (romantic, warm, gentle acoustic feel)
      // Notes: F3, A3, C4, E4 / D3, F3, A3, C4 / Bb2, D3, F3, A3 / C3, E3, G3, C4
      const chordProgressions = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [146.83, 174.61, 220.0, 261.63], // Dm7
        [116.54, 146.83, 174.61, 220.0], // Bbmaj7
        [130.81, 164.81, 196.0, 261.63], // C7
      ];

      let chordIdx = 0;

      const triggerChord = () => {
        if (!isPlaying || !audioContextRef.current) return;
        const now = ctx.currentTime;
        const notes = chordProgressions[chordIdx % chordProgressions.length];
        chordIdx++;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.12);

          // Soft bell-like envelope
          gain.gain.setValueAtTime(0, now + i * 0.12);
          gain.gain.linearRampToValueAtTime(0.04, now + i * 0.12 + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 4.0);
        });
      };

      triggerChord();
      intervalRef.current = setInterval(triggerChord, 4000);
    } catch {
      // Audio context fallback
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playRomanticChords();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={togglePlay}
        className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C2723] backdrop-blur-md shadow-[0_4px_20px_rgba(44,39,35,0.15)] border border-[#DFCBB0] hover:border-[#C5A059] transition-all hover:scale-105 group"
        title={isPlaying ? "Mute Music" : "Play Romantic Ambiance"}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isPlaying ? "bg-[#C5A059] text-white" : "bg-[#FAF7F2] text-[#8C7A5B]"
        }`}>
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-[#59524A] pr-1">
          {isPlaying ? "Sound On" : "Music"}
        </span>
      </button>
    </div>
  );
}
