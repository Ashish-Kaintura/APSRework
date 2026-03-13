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
          // INCREASED SCROLL DEPTH to handle 5 full states
          end: "+=1000%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Update dots based on 5 scroll segments
            if (progress < 0.15) setActiveSlide(0);
            else if (progress < 0.35) setActiveSlide(1);
            else if (progress < 0.55) setActiveSlide(2);
            else if (progress < 0.75) setActiveSlide(3);
            else setActiveSlide(4);
          },
        },
      });

      // --- PHASE 1: THE OPENING ZOOM ---
      tl.to(outerFlanks.current, { opacity: 0, scale: 1.6, duration: 2 }, 0)
        .to(innerFlanks.current, { opacity: 0, scale: 1.4, duration: 2 }, 0.2)
        .to(".center-hero-img", { scale: 1.7, duration: 2 }, 0)
        .to(".intro-text", { opacity: 0, y: -20, duration: 1 }, 1.5);

      // --- PHASE 2: TRANSITION TO SLIDE 1 (Attendance) ---
      tl.addLabel("slide1", "+=0.5")
        // Image crossfade
        .to(".center-hero-img", { opacity: 0, duration: 1 }, "slide1")
        .fromTo(
          ".center-img-1",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide1",
        )
        // Text (Left) & HUD (Right) fade in
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

      // --- PHASE 3: TRANSITION TO SLIDE 2 (Digital Patrolling) ---
      tl.addLabel("slide2", "+=1.5")
        // Fade out previous UI
        .to(".text-1", { opacity: 0, x: -50, duration: 1 }, "slide2")
        .to(".hud-1", { opacity: 0, x: 50, duration: 1 }, "slide2")
        // Image crossfade
        .to(".center-img-1", { opacity: 0, duration: 1 }, "slide2")
        .fromTo(
          ".center-img-2",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide2",
        )
        // Text (Right) & HUD (Left) fade in
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

      // --- PHASE 4: TRANSITION TO SLIDE 3 (Anti-Sleep) ---
      tl.addLabel("slide3", "+=1.5")
        // Fade out previous UI
        .to(".text-2", { opacity: 0, x: 50, duration: 1 }, "slide3")
        .to(".hud-2", { opacity: 0, x: -50, duration: 1 }, "slide3")
        // Image crossfade
        .to(".center-img-2", { opacity: 0, duration: 1 }, "slide3")
        .fromTo(
          ".center-img-3",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide3",
        )
        // Text (Left) & HUD (Right) fade in
        .fromTo(
          ".text-3",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide3+=0.2",
        )
        .fromTo(
          ".hud-3",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide3+=0.2",
        );

      // --- PHASE 5: TRANSITION TO SLIDE 4 (Panic Alert) ---
      tl.addLabel("slide4", "+=1.5")
        // Fade out previous UI
        .to(".text-3", { opacity: 0, x: -50, duration: 1 }, "slide4")
        .to(".hud-3", { opacity: 0, x: 50, duration: 1 }, "slide4")
        // Image crossfade
        .to(".center-img-3", { opacity: 0, duration: 1 }, "slide4")
        .fromTo(
          ".center-img-4",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1.2, duration: 1 },
          "slide4",
        )
        // Text (Right) & HUD (Left) fade in
        .fromTo(
          ".text-4",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide4+=0.2",
        )
        .fromTo(
          ".hud-4",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1 },
          "slide4+=0.2",
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

      {/* --- THE CENTER STAGE --- */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Intro Flanks */}
        <div
          ref={outerFlanks}
          className="absolute inset-0 flex justify-center items-center"
        >
          <img
            src="/outer.png"
            className="h-[50vh] object-contain opacity-70"
            alt="Outer"
          />
        </div>
        <div
          ref={innerFlanks}
          className="absolute inset-0 flex justify-center items-center"
        >
          <img
            src="/inner.png"
            className="h-[55vh] object-contain opacity-80"
            alt="Inner"
          />
        </div>

        {/* The 5 Center Images (Stacked on top of each other) */}
        <div className="relative w-full max-w-lg h-[60vh] flex items-center justify-center">
          <img
            src="/center.png"
            className="center-hero-img absolute h-full object-contain drop-shadow-2xl"
            alt="Center Hero"
          />

          <img
            src="/ScrollPresentationImage/FailProofAttendanceSystem.png"
            className="center-img-1 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="Slide 1"
          />

          <img
            src="/ScrollPresentationImage/Digital Patrolling.png"
            className="center-img-2 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="Slide 2"
          />

          {/* NEW: Anti-Sleep Image */}
          <img
            src="/ScrollPresentationImage/Alertness.png"
            className="center-img-3 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="Slide 3"
          />

          {/* NEW: Panic Alert Image */}
          <img
            src="/ScrollPresentationImage/PanicAlert.png"
            className="center-img-4 absolute h-full object-contain drop-shadow-2xl opacity-0"
            alt="Slide 4"
          />
        </div>
      </div>

      {/* --- FLOATING UI OVERLAYS (z-index 40) --- */}
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center">
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
        <div className="text-1 absolute left-12 w-[30%] opacity-0">
          <h2 className="text-lime-400 font-mono text-sm tracking-widest mb-4">
            001 • Fail-Proof Attendance
          </h2>
          <div className="border-l-2 border-lime-500/50 pl-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Geo-Tagged Location + QR
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              View real-time guard movements on the site map.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Zero Ghost Guards
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              Impossible to mark attendance away from the site.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Instant Reports
            </h3>
            <p className="text-gray-500 text-xs">
              Photos and timestamps for every check
            </p>
          </div>
        </div>

        <div className="hud-1 absolute right-24 opacity-0">
          <div className="animated-border rounded-lg">
            <div className="inner-content">
              <video
                height={400}
                width={300}
                autoPlay
                muted
                loop
                src="/ScrollPresentationImage/punchin video full.mp4"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* --- SLIDE 2 UI (Text Right, HUD Left) --- */}
        <div className="text-2 absolute right-12 w-[30%] opacity-0 text-right">
          <h2 className="text-lime-400 font-mono text-sm tracking-widest mb-4">
            002 • DIGITAL PATROLLING
          </h2>
          <div className="border-r-2 border-lime-500/50 pr-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Geo-Fenced Routes
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              System alerts if a guard deviates from the path.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Live Tracking
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              To create a work breakdown structure, start from your scope
              statement.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Digital Evidence
            </h3>
            <p className="text-gray-500 text-xs">
              Photos and timestamps mapped to locations.
            </p>
          </div>
        </div>

        <div className="hud-2 absolute left-24 opacity-0">
          <div className="border border-lime-500/30 bg-black/50 backdrop-blur-md p-4 rounded-lg w-72 text-center">
            <p className="text-[10px] text-lime-400 font-mono mb-2">
              // GPS TRACKING
            </p>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-white text-lg font-bold mb-1">Route Active</p>
              <div className="w-full h-1 bg-gray-800 rounded mt-2">
                <div className="w-[80%] h-full bg-lime-400 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW: SLIDE 3 UI (Text Left, HUD Right) --- */}
        <div className="text-3 absolute left-12 w-[30%] opacity-0">
          <h2 className="text-lime-400 font-mono text-sm tracking-widest mb-4">
            003 • ANTI-SLEEP TECH
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Keeps guards alert during night shifts with randomized verification
            checks.
          </p>
          <div className="border-l-2 border-lime-500/50 pl-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Guard Acknowledgement
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              Guard receives an alert every 20 mins and must confirm instantly.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              QR Login & Attendance Tracking
            </h3>
            <p className="text-gray-500 text-xs">
              Guard scans site QR code to mark attendance and start duty.
            </p>
            <h3 className="text-white text-sm font-semibold mt-2">
              Missed Alert Escalation & Reporting
            </h3>
            <p className="text-gray-500 text-xs">
              Unanswered alert triggers second alert; supervisors receive missed
              alert reports.
            </p>
          </div>
        </div>

        <div className="hud-3 absolute right-24 opacity-0">
          <div className="border border-lime-500/30 bg-black/50 backdrop-blur-md p-4 rounded-lg w-72 text-center">
            <p className="text-[10px] text-lime-400 font-mono mb-2">
              // NOTIFICATION
            </p>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-white text-lg font-bold mb-1">Duty Alert</p>
              <p className="text-gray-400 text-[10px] mb-2">
                Please accept to confirm presence.
              </p>
              <button className="text-[10px] bg-lime-500 text-black px-4 py-1.5 rounded w-full font-bold">
                ACCEPT
              </button>
            </div>
          </div>
        </div>

        {/* --- NEW: SLIDE 4 UI (Text Right, HUD Left) --- */}
        <div className="text-4 absolute right-12 w-[30%] opacity-0 text-right">
          {/* Using red text to emphasize the "Panic" theme */}
          <h2 className="text-rose-500 font-mono text-sm tracking-widest mb-4">
            004 • PANIC ALERT
          </h2>
          <div className="border-r-2 border-rose-500/50 pr-4 mt-6">
            <h3 className="text-white text-sm font-semibold mb-1">
              Panic Alert Trigger
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              Guard presses panic alert to instantly report threats.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Command Centre Verification
            </h3>
            <p className="text-gray-500 text-xs mb-3">
              Instantly coordinates with nearest police/hospitals.
            </p>

            <h3 className="text-white text-sm font-semibold mb-1">
              Rapid Response Deployment
            </h3>
            <p className="text-gray-500 text-xs">
              QRT team dispatched immediately to site for intervention.
            </p>
          </div>
        </div>

        <div className="hud-4 absolute left-24 opacity-0">
          <div className="border border-rose-500/30 bg-rose-950/40 backdrop-blur-md p-4 rounded-lg w-48 text-center">
            <p className="text-[10px] text-rose-400 font-mono mb-2 animate-pulse">
              // EMERGENCY
            </p>
            <div className="bg-black/50 p-3 rounded border border-rose-500/50">
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center mx-auto mb-2 animate-ping"></div>
              <p className="text-white text-xs font-bold mb-1">SOS Triggered</p>
              <p className="text-gray-300 text-[10px]">Dispatching QRT...</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PAGINATION DOTS (Handles 5 States) --- */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-end">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === i
                  ? i === 4 // Make the final dot red for the Panic Alert
                    ? "bg-rose-500 scale-[2.5] shadow-[0_0_10px_#f43f5e]"
                    : "bg-lime-400 scale-[2.5] shadow-[0_0_10px_#4ade80]"
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
