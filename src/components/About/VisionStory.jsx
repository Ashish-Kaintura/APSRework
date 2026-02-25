import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const VisionStory = () => {
  const sectionRef = useRef();
  const scrollRef = useRef();

  useGSAP(
    () => {
      gsap.to(scrollRef.current, {
        x: "-60%",
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
            <h3 className="text-4xl font-bold mb-4">Compliance Excellence</h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              We follow all major statutory requirements and maintain
              transparent, reliable workforce processes across every site
            </p>
          </div>
        </div>

        {/* Growth Section */}
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-white opacity-10">
            GROWTH
          </h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">
              Strong Liaisoning Support
            </h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              A dedicated team coordinates with local authorities to ensure
              smooth operations, timely clearances, and quick issue resolution.
            </p>
          </div>
        </div>

        {/* Present Day */}
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-primary">APS</h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">
              Training & Skill Development
            </h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              Modern training programs prepare our personnel in safety,
              protocols, technology use, and service delivery—ensuring high
              performance on every site.
            </p>
          </div>
        </div>
        <div className="w-[60vw] flex-shrink-0">
          <h2 className="text-[12vw] font-black text-white opacity-10">
            Strength
          </h2>
          <div className="text-white -mt-20 ml-10">
            <h3 className="text-4xl font-bold mb-4">
              Technology Enabled Operations
            </h3>
            <p className="text-slate-400 max-w-md whitespace-normal leading-relaxed">
              Risk & threat mitigation powered by: 24/7 Command Center AI-driven
              surveillance Digital patrolling and reporting Smart guarding
              solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
