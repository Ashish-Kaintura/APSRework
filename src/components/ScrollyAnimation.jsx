import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const TechScroll = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".panel");

      // Create the horizontal scroll timeline
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Slide images left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, // PINS the section so it doesn't move up
          scrub: 1, // Links animation progress to scrollbar
          snap: 1 / (sections.length - 1), // Optional: snaps to each image
          end: () => "+=" + containerRef.current.offsetWidth * 2, // Scroll duration
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-black overflow-hidden">
      {/* Horizontal Track */}
      <div ref={scrollRef} className="flex w-[300vw] h-screen items-center">
        {/* SECTION 1 */}
        <section className="panel w-screen h-full flex items-center justify-center relative">
          <div className="absolute top-10 left-10 font-mono text-lime-400 text-sm">
            001 // TARGET_ID
          </div>
          <img
            src="/ScrollPresentationImage/1.png"
            className="w-1/2 object-contain"
            alt="Image 1"
          />
          <h2 className="absolute bottom-20 text-white font-mono text-4xl tracking-tighter">
            DETECTION
          </h2>
        </section>

        {/* SECTION 2 */}
        <section className="panel w-screen h-full flex items-center justify-center relative">
          <div className="absolute top-10 left-10 font-mono text-lime-400 text-sm">
            002 // SURVEILLANCE
          </div>
          <img
            src="/ScrollPresentationImage/2.png"
            className="w-1/2 object-contain"
            alt="Image 2"
          />
          <h2 className="absolute bottom-20 text-white font-mono text-4xl tracking-tighter">
            ANALYSIS
          </h2>
        </section>

        {/* SECTION 3 */}
        <section className="panel w-screen h-full flex items-center justify-center relative">
          <div className="absolute top-10 left-10 font-mono text-lime-400 text-sm">
            003 // TERMINATE
          </div>
          <img
            src="/ScrollPresentationImage/3.png"
            className="w-1/2 object-contain"
            alt="Image 3"
          />
          <h2 className="absolute bottom-20 text-white font-mono text-4xl tracking-tighter">
            EXECUTION
          </h2>
        </section>
      </div>
    </div>
  );
};

export default TechScroll;
