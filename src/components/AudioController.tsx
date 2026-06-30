"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cyber/Ambient sci-fi background soundtrack placeholder
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Low ambient volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio playback error:", e);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[999] flex items-center gap-3">
      {/* Equalizer animation bars (displayed only when playing) */}
      <div className="flex gap-[3px] items-center h-5 w-6 pointer-events-none">
        {isPlaying ? (
          [0.6, 0.9, 0.4, 0.7, 0.5].map((delay, index) => (
            <span
              key={index}
              className="w-[3px] h-full bg-brand-purple rounded-full origin-bottom animate-audio-wave"
              style={{ animationDelay: `${delay}s`, animationDuration: `${0.8 + delay}s` }}
            />
          ))
        ) : (
          [0, 0, 0, 0, 0].map((_, index) => (
            <span
              key={index}
              className="w-[3px] h-[3px] bg-zinc-600 rounded-full"
            />
          ))
        )}
      </div>

      {/* Floating mute/unmute control button */}
      <button
        onClick={togglePlayback}
        className="w-10 h-10 rounded-full bg-zinc-950/80 border border-brand-purple/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-violet hover:shadow-[0_0_15px_#7B2EFF] transition-all duration-300 pointer-events-auto cursor-pointer"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-brand-violet" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
