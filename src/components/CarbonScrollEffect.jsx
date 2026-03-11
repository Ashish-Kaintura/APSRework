import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ExactCarbonScroll = () => {
  const containerRef = useRef(null);
  const outerFlanks = useRef(null);
  const innerFlanks = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(
    () => {
      // Main timeline tied to the pinned container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", // 500% scroll depth gives plenty of room for 3 phases
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Update dots based on scroll progress
            if (progress < 0.25) setActiveSlide(0);
            else if (progress < 0.65) setActiveSlide(1);
            else setActiveSlide(2);
          },
        },
      });

      // --- PHASE 1: THE OPENING ZOOM ---
      // Flanks zoom forward and fade out
      tl.to(outerFlanks.current, { opacity: 0, scale: 1.6, duration: 2 }, 0)
        .to(innerFlanks.current, { opacity: 0, scale: 1.4, duration: 2 }, 0.2)
        // Center hero scales up
        .to(".center-hero-img", { scale: 1.7, duration: 2 }, 0)
        // Intro text fades out as we prepare for slide 1
        .to(".intro-text", { opacity: 0, y: -20, duration: 1 }, 1.5);

      // --- PHASE 2: TRANSITION TO SLIDE 1 (Heatmap) ---
      tl.addLabel("slide1", "+=0.5")
        // 1. Crossfade the center image (Hero fades out, Heatmap Guy fades in)
        .to(".center-hero-img", { opacity: 0, duration: 1 }, "slide1")
        .fromTo(
          ".center-img-1",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide1",
        )

        // 2. Fade in Slide 1 Text (Left) and HUD (Right)
        .fromTo(
          ".text-1",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide1+=0.2",
        )
        .fromTo(
          ".hud-1",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide1+=0.2",
        );

      // --- PHASE 3: TRANSITION TO SLIDE 2 (Field App) ---
      tl.addLabel("slide2", "+=1.5") // Notice the pause (+=1.5) so the user can read Slide 1
        // 1. Fade out Slide 1 Text and HUD
        .to(".text-1", { opacity: 0, x: -50, duration: 1 }, "slide2")
        .to(".hud-1", { opacity: 0, x: 50, duration: 1 }, "slide2")

        // 2. Crossfade the center image (Heatmap Guy fades out, Field App Guy fades in)
        .to(".center-img-1", { opacity: 0, duration: 1 }, "slide2")
        .fromTo(
          ".center-img-2",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide2",
        )

        // 3. Fade in Slide 2 Text (Right) and HUD (Left)
        .fromTo(
          ".text-2",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide2+=0.2",
        )
        .fromTo(
          ".hud-2",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide2+=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden z-50 font-sans"
    >
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* --- THE CENTER STAGE (Images overlap perfectly in the center) --- */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Intro Flanks */}
        <div
          ref={outerFlanks}
          className="absolute inset-0 flex justify-center items-center"
        >
          <img
            src="/1.png"
            className="h-[50vh] object-contain opacity-70"
            alt="Outer"
          />
        </div>
        <div
          ref={innerFlanks}
          className="absolute inset-0 flex justify-center items-center"
        >
          <img
            src="/3.png"
            className="h-[55vh] object-contain opacity-80"
            alt="Inner"
          />
        </div>

        {/* The 3 Center Images (Stacked on top of each other) */}
        <div className="relative w-full max-w-lg h-[60vh] flex items-center justify-center">
          {/* Base Hero */}
          <img
            src="/2.png"
            className="center-hero-img absolute h-full object-contain drop-shadow-2xl"
            alt="Center Hero"
          />

          {/* Slide 1 Image (Heatmap) */}
          <img
            src="/ScrollPresentationImage/8.png"
            className="center-img-1 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="Heatmap Image"
          />

          {/* Slide 2 Image (Field App) */}
          <img
            src="/ScrollPresentationImage/11.png"
            className="center-img-2 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="App Image"
          />
        </div>
      </div>

      {/* --- FLOATING UI OVERLAYS (z-index 40) --- */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* Intro Text */}
        <div className="intro-text absolute top-12 left-12 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter leading-tight">
            Creating the modern workforce
          </h1>
          <p className="text-gray-400 text-base">
            We arm field crews with the tools to restore ecosystems at scale.
          </p>
        </div>

        {/* --- SLIDE 1 UI (Text Left, HUD Right) --- */}
        <div className="text-1 absolute left-12 top-1/2 -translate-y-1/2 w-[30%] opacity-0">
          <h2 className="text-lime-400 font-mono text-sm tracking-widest mb-4">
            002 • PREDICTIVE HEATMAPS
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Identify likely invasive hotspots using AI-driven habitat models.
          </p>
          <div className="border-l-2 border-lime-500/50 pl-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Live Tracking
            </h3>
            <p className="text-gray-500 text-xs">
              View real-time guard movements on the site map.
            </p>
          </div>
        </div>

        <div className="hud-1 absolute right-24 top-1/2 -translate-y-1/2 opacity-0">
          <div className="border border-lime-500/30 bg-black/50 backdrop-blur-md p-4 rounded-lg">
            <p className="text-[10px] text-lime-400 font-mono mb-2">
              // DATA SOURCES
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>{" "}
                SATELLITES
              </div>
              <div className="flex items-center gap-3 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>{" "}
                TRAPS
              </div>
            </div>
          </div>
        </div>

        {/* --- SLIDE 2 UI (Text Right, HUD Left) --- */}
        <div className="text-2 absolute right-12 top-1/2 -translate-y-1/2 w-[30%] opacity-0 text-right">
          <h2 className="text-lime-400 font-mono text-sm tracking-widest mb-4">
            003 • FIELD APP
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4 ml-auto">
            Guides field specialists to priority zones, logs captures, and syncs
            data instantly.
          </p>
          <div className="border-r-2 border-lime-500/50 pr-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Attendance Tracking
            </h3>
            <p className="text-gray-500 text-xs">
              Guard scans site QR code to mark attendance and start duty.
            </p>
          </div>
        </div>

        <div className="hud-2 absolute left-24 top-1/2 -translate-y-1/2 opacity-0">
          <div className="border border-lime-500/30 bg-black/50 backdrop-blur-md p-4 rounded-lg w-48">
            <p className="text-[10px] text-lime-400 font-mono mb-2">
              // NOTIFICATION
            </p>
            <div className="bg-white/5 p-2 rounded text-center">
              <p className="text-white text-xs font-bold mb-1">Duty Alert</p>
              <p className="text-gray-400 text-[10px]">
                Please accept to confirm presence.
              </p>
              <button className="mt-2 text-[10px] bg-lime-500 text-black px-4 py-1 rounded w-full font-bold">
                ACCEPT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PAGINATION DOTS (Always on top, z-index 50) --- */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-end">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === i
                  ? "bg-lime-400 scale-[2.5] shadow-[0_0_10px_#4ade80]"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExactCarbonScroll;
