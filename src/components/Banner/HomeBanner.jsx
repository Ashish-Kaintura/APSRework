import React, { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";

// Import your existing slides
import { slides } from "../AccordionSlider";

const securityDestinations = slides.map((s, index) => ({
  image: s.image,
  title: s.title.toUpperCase(),
  tagline: s.label || "Security Protocol Active",
  description: s.description,
  id: `SEC-0${index + 102}`,
  threatLevel: index === 0 ? "STABLE" : "MONITORING",
}));

export default function SecurityHomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const triggerSlideChange = (newIndex) => {
    if (newIndex === currentSlide) return;
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setImageLoaded(false);
      setTimeout(() => setIsGlitching(false), 500);
    }, 50);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentSlide + 1) % securityDestinations.length;
      triggerSlideChange(next);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const current = securityDestinations[currentSlide];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black font-sans text-white mt-22">
      {/* 1. BACKGROUND & LAYERS */}
      <div className="absolute inset-0 z-0">
        <img
          src={current.image}
          key={current.id}
          className={`w-full h-full object-cover transition-transform duration-[10000ms] ${
            imageLoaded ? "scale-110" : "scale-100"
          } brightness-[0.4] contrast-125 ${isGlitching ? "animate-glitch-image blur-sm" : ""}`}
          onLoad={() => setImageLoaded(true)}
          alt="Security Feed"
        />
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] pointer-events-none z-10" />
        {/* Scanning Line */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-[2px] bg-red-600/50 shadow-[0_0_15px_red] absolute top-0 animate-[scan_4s_linear_infinite]" />
        </div>
      </div>

      {/* 2. HUD INTERFACE (Corners) - Scaled for Mobile */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[10px] sm:border-[20px] border-black/20">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-t-2 border-red-600/40" />
        <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-t-2 border-red-600/40" />
        <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-b-2 border-red-600/40" />
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-b-2 border-red-600/40" />
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="relative h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-30 pt-10 lg:pt-0">
        {/* Left Side: Info */}
        <div
          className={`w-full lg:max-w-2xl transition-all duration-200 ${isGlitching ? "translate-x-2 skew-y-1" : ""}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-600 text-[8px] sm:text-[10px] font-mono font-black px-2 py-0.5 tracking-[0.2em]">
              {current.id}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[8px] sm:text-[10px] font-mono">
              <Activity className="w-3 h-3 text-red-500" />
              THREAT_LVL: {current.threatLevel}
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter mb-4 uppercase leading-tight">
            {current.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-start lg:items-center gap-4 sm:gap-8 mb-8 sm:mb-10">
            <div className="h-1 lg:h-12 w-12 lg:w-1 bg-red-600" />
            <div className="space-y-2">
              <p className="text-lg sm:text-xl text-red-500 font-bold uppercase tracking-widest leading-none">
                {current.tagline}
              </p>
              <p className="text-gray-400 max-w-md text-xs sm:text-sm leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-5">
            <a
              href="tel:+919911498262"
              className="w-full sm:w-auto text-center group flex items-center justify-center gap-4 bg-red-700 hover:bg-red-500 text-white px-6 py-4 sm:px-10 sm:py-5 font-black uppercase transition-all shadow-[4px_4px_0px_#4c0519] active:translate-y-1 active:shadow-none text-sm sm:text-base"
            >
              <FaPhoneAlt className="group-hover:animate-shake" />
              Request Intervention
            </a>
          </div>
        </div>

        {/* Right Side: Tactical Thumbnails (Desktop Only) */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="text-right mb-2">
            <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest animate-pulse">
              Live_Feeds
            </span>
          </div>

          {securityDestinations.map((dest, index) => (
            <button
              key={index}
              onClick={() => triggerSlideChange(index)}
              className={`relative w-40 h-24 overflow-hidden transition-all duration-300 group border ${
                index === currentSlide
                  ? "border-red-600 scale-110 z-10 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                  : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/40"
              }`}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-0 left-0 bg-black/70 px-2 py-0.5 font-mono text-[9px] text-white/70">
                CAM-0{index + 1}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                <div
                  className={`h-full bg-red-600 transition-all duration-500 ${index === currentSlide ? "w-full" : "w-0"}`}
                />
              </div>
              {index === currentSlide && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FOOTER TERMINAL - Hidden on Small Mobile */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 right-6 sm:left-10 sm:right-10 flex flex-col sm:flex-row justify-between items-center sm:items-end z-40 pointer-events-none gap-4">
        <div className="font-mono text-[8px] sm:text-[9px] text-white/30 text-center sm:text-left">
          <p className="inline sm:block">CRITICAL_SYSTEMS: ONLINE • </p>
          <p className="inline sm:block">DATA_STREAM: ENCRYPTED • </p>
          <p className="inline sm:block">SIGNAL: 98%</p>
        </div>

        {/* Responsive Progress Dots */}
        <div className="flex gap-2 pointer-events-auto">
          {securityDestinations.map((_, i) => (
            <button
              key={i}
              onClick={() => triggerSlideChange(i)}
              className={`h-1 transition-all duration-500 ${currentSlide === i ? "w-8 sm:w-12 bg-red-600" : "w-3 sm:w-4 bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes glitch-anim {
          0% { clip-path: inset(10% 0 30% 0); transform: translate(-3px, 1px); }
          50% { clip-path: inset(50% 0 10% 0); transform: translate(3px, -1px); }
          100% { clip-path: inset(10% 0 30% 0); transform: translate(3px, 1px); }
        }
        .animate-glitch-image {
          animation: glitch-anim 0.2s linear infinite;
          filter: hue-rotate(90deg) brightness(1.2);
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `,
        }}
      />
    </div>
  );
}
