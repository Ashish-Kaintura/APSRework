import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const FounderNarrative = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Image Parallax & Reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );

      // Text Floating Animation
      gsap.to(".floating-quote", {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Founder Image Container */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
              <img  loading="lazy"
                ref={imageRef}
                src="https://i.postimg.cc/HxhHYbX8/anil-puri.jpg" // Replace with your actual image URL
                alt="Founder"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative Accent using Primary Color */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-primary rounded-bl-3xl z-0" />
          </div>

          {/* Founder Quote & Story */}
          <div className="w-full lg:w-1/2 space-y-8 relative">
            <div className="floating-quote text-primary opacity-10 absolute -top-10 -left-10">
              <Quote size={120} fill="currentColor" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter relative z-10">
              India's Trusted Integrated Service Provider
            </h2>

            <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                What started as a dreams 39 years ago, is now a force to reckon
                with APS Group is a leading Security Company, Facility
                Management Company, HR Outsourcing Company and Homeland
                Security. Surveillance Company and is now a Innovation Hub with
                APS Business Incubator.
              </p>
              <p>
                APS Group, which is now a leading Integrated Service Provider of
                India, was started from humble beginning. The vision &
                perseverance of one man changed the shape of several industries.
                What seemed as obsession at one point in time, is now a reality!
                This all started from a Tin Shed office & a vespa scooter & a
                passion to create Solution for problems. We invite you to be a
                part of such an obsession. Navigate the Solution Segments
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="font-black text-slate-900 uppercase tracking-widest">
                The Founder's & Chairman Mr. Anil Puri
              </p>

              <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">
                Established 1986
              </p>
              <p className="font-black text-slate-900 uppercase tracking-widest">
                Never underestimate the power of your dreams
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
