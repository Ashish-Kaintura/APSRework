import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const AboutHero = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-[80vh] flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Parallax Background Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute text-[25vw] font-black text-slate-900 whitespace-nowrap select-none"
      >
        LEGACY
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden">
          <h1 className="hero-line text-5xl md:text-8xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
            Obsession to <br />
            <span className="text-primary italic">Reality.</span>
          </h1>
        </div>
        <div className="overflow-hidden mt-6">
          <p className="hero-line text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Since 1986, we've been transforming the landscape of India's
            integrated services through unwavering vision and perseverance.
          </p>
        </div>
      </div>
    </section>
  );
};
