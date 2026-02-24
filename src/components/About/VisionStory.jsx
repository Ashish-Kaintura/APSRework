import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const VisionStory = () => {
  const sectionRef = useRef();
  const scrollRef = useRef();

  useGSAP(
    () => {
      gsap.to(scrollRef.current, {
        x: "-50%",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: "+=2000",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-slate-900 overflow-hidden flex items-center"
    >
      <div
        ref={scrollRef}
        className="flex gap-20 px-[20vw] items-center whitespace-nowrap"
      >
        {/* 1986 Section */}
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-primary opacity-20">
            1986
          </h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">The Tin Shed Era</h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              Starting with a single Vespa scooter and a passion for solutions,
              one man's vision began to solve India's complex service
              challenges.
            </p>
          </div>
        </div>

        {/* Growth Section */}
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-white opacity-10">
            GROWTH
          </h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">Expanding Horizons</h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              Expansion into 27 states and UTs, building a workforce of over
              42,000 security professionals.
            </p>
          </div>
        </div>

        {/* Present Day */}
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-primary">TODAY</h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">Leading the Industry</h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              A premier integrated service provider with no compromise on
              quality or value of service delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
