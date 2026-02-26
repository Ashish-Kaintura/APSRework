import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import banner from "../../images/servicesImage/service banner.webp";

export const ServiceHero = () => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Shutter Panels slide out
      tl.to(".shutter-panel", {
        height: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.inOut",
      })
        // 2. Banner Image scales down to its natural size
        .fromTo(
          ".hero-image",
          { scale: 1.3, filter: "brightness(0.5)" },
          { scale: 1, filter: "brightness(1)", duration: 2, ease: "expo.out" },
          "-=1.2",
        )
        // 3. Content slides up
        .from(
          ".hero-line",
          {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.5",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative  flex items-center justify-center bg-slate-900 overflow-hidden"
    >
      {/* --- Shutter Overlay Panels --- */}
      <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
        <div className="shutter-panel w-full h-1/2 bg-slate-900" />
        <div className="shutter-panel w-full h-1/2 bg-primary" />
      </div>

      {/* --- Banner Image Layer --- */}
      <div className="">
        <img
          loading="lazy"
          src={banner}
          alt="APS Group Headquarters"
          className="hero-image w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
