import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const roadmapData = [
  {
    year: "1986",
    title: "The Beginning",
    desc: "APS GROUP was incorporated with the forming of AP Securitas Pvt. Ltd.",
  },
  {
    year: "1987",
    title: "Pioneering CIT",
    desc: "Launched the First Cash Van in India.",
  },
  {
    year: "1998",
    title: "Innovation",
    desc: "1st Private Bullet Proof Vehicle in India & Entered CIT Industry (Created SECURITRAN).",
  },
  {
    year: "2004",
    title: "Diversification",
    desc: "Entered Records Management (Peninsula Data Secure) & HR Outsourcing (Peninsula Management Services).",
  },
  {
    year: "2007",
    title: "Telecom Entry",
    desc: "Entered the Telecom Sector with the creation of APS Telecom.",
  },
  {
    year: "2009",
    title: "Facility Era",
    desc: "Entered the Facility Management Industry with the acquisition of Proton.",
  },
  {
    year: "2010",
    title: "Homeland Security",
    desc: "Entered Homeland Security (APS Elite) & Acquired Zeus Housekeeping Company.",
  },
  {
    year: "2011",
    title: "Realignment",
    desc: "Divested SECURITRANS to Blackstone (Deal approx. 250 Cr.) & APS Group Strategy Re-aligned.",
  },
  {
    year: "2013",
    title: "M&A Strategy",
    desc: "M&A strategy implemented, leading to further exponential growth.",
  },
  {
    year: "2015",
    title: "Brand Evolution",
    desc: "Brand ‘APS’ revamped and officially launched globally.",
  },
  {
    year: "2016-2021",
    title: "Smart APS®",
    desc: "Launched Smart APS® and acquired SSMS Companies.",
  },
  {
    year: "2026",
    title: "Present Day",
    desc: "Continuing the obsession with solutions as India's leading Integrated Service Provider.",
  },
];

export const JourneyRoadmap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);

  // Optional: Auto-play the timeline (Advances every 4 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === roadmapData.length - 1 ? 0 : current + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Center the active item in the scrollable track
  useEffect(() => {
    if (sliderRef.current) {
      const activeElement = sliderRef.current.children[activeIndex];
      if (activeElement) {
        const scrollLeft =
          activeElement.offsetLeft -
          sliderRef.current.offsetWidth / 2 +
          activeElement.offsetWidth / 2;
        sliderRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const activeItem = roadmapData[activeIndex];

  return (
    <section className="py-24 bg-slate-50 font-sans overflow-hidden">
      {/* Hide Scrollbar CSS injection */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* --- Header --- */}
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="h-[2px] w-8 bg-primary"></span>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                A Legacy of Trust
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
              Journey <span className="text-slate-400 italic">So Far.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-sm max-w-sm lg:text-right">
            Four decades of innovation, acquisitions, and setting the gold
            standard in Indian security.
          </p>
        </div>

        <div
          className="relative bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* --- Interactive Horizontal Track --- */}
          <div className="relative mb-12 lg:mb-16">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 z-0" />

            {/* Scrollable Container */}
            <div
              ref={sliderRef}
              className="relative z-10 flex items-center overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2 scroll-smooth"
            >
              {roadmapData.map((item, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex flex-col items-center justify-center min-w-[120px] lg:min-w-[160px] snap-center focus:outline-none"
                  >
                    {/* The Dot */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 mb-4 z-10
                      ${
                        isActive
                          ? "bg-primary border-primary shadow-[0_0_15px_rgba(236,108,114,0.5)] scale-110"
                          : isPassed
                            ? "bg-slate-900 border-slate-900"
                            : "bg-white border-slate-200 group-hover:border-primary/50"
                      }
                    `}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? "bg-white" : isPassed ? "bg-slate-900" : "bg-transparent"}`}
                      />
                    </div>

                    {/* Connecting Line Fill (Dynamic) */}
                    {index !== 0 && (
                      <div
                        className={`absolute top-4 right-[50%] w-full h-[2px] -z-10 transition-colors duration-500 
                        ${isActive || isPassed ? "bg-slate-900" : "bg-transparent"}`}
                      />
                    )}

                    {/* Year Label */}
                    <span
                      className={`text-xs font-black uppercase tracking-widest transition-colors duration-300
                      ${isActive ? "text-primary scale-110" : isPassed ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}
                    `}
                    >
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- Dynamic Content Display Box --- */}
          <div className="relative min-h-[220px] lg:min-h-[180px] bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 flex items-center overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute -right-5 bottom-0 text-[200px] font-black text-slate-900/[0.03] leading-none pointer-events-none select-none">
              {activeItem.year.split("-")[0]}
            </div> 

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.year}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-full bg"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-center">
                  {/* Left: Large Year Display */}
                  <div className="shrink-0 border-l-4 border-primary pl-6">
                    <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-2">
                      {activeItem.year}
                    </h3>
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                      Milestone Reached
                    </span>
                  </div>

                  {/* Right: Description */}
                  <div className="flex-grow">
                    <h4 className="text-xl lg:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                      {activeItem.title}
                    </h4>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed font-medium max-w-2xl">
                      {activeItem.desc}
                    </p>
                  </div>

                  <button className="shrink-0 w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
