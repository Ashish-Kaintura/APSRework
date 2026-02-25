import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical progress line
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".roadmap-container",
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      // Animate each roadmap item
      gsap.utils.toArray(".roadmap-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "restart none none none",
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white font-sans overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header - Compact Premium */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
              Road Map
            </span>
            <span className="h-[1px] w-8 bg-primary"></span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
            JOURNEY <span className="text-primary">SO FAR.</span>
          </h2>
        </div>

        {/* Roadmap Container */}
        <div className="roadmap-container relative">
          {/* Vertical Background Line */}
          <div className="absolute left-4 md:left-1/2 top-0 w-[2px] h-full bg-slate-100 -translate-x-1/2 z-0" />

          {/* Animated Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-primary -translate-x-1/2 z-0"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {roadmapData.map((item, i) => (
              <div
                key={i}
                className={`roadmap-item relative flex items-center justify-start md:justify-between w-full ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(236,108,114,0.5)]" />

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-[45%] p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-black text-xl lg:text-2xl italic tracking-tighter">
                      {item.year}
                    </span>
                    <div className="h-[1px] flex-grow bg-slate-200" />
                  </div>
                  <h4 className="text-sm lg:text-base font-black text-slate-900 uppercase tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] lg:text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
