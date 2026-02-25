import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import banner from "../../images/About/aboutbanner.png";

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
      className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden"
    >
      {/* --- Shutter Overlay Panels --- */}
      <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
        <div className="shutter-panel w-full h-1/2 bg-slate-900" />
        <div className="shutter-panel w-full h-1/2 bg-primary" />
      </div>

      {/* --- Banner Image Layer --- */}
      <div className="absolute inset-0 z-0">
        <img
          loading="lazy"
          src={banner}
          alt="APS Group Headquarters"
          className="hero-image w-full h-full object-cover"
        />
        {/* Subtle Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- Foreground Content --- */}
      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden">
          <h1 className="hero-line text-5xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter">
            Obsession to <br />
            <span className="text-primary italic">Reality.</span>
          </h1>
        </div>

        <div className="overflow-hidden mt-6">
          <p className="hero-line text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Since 1986, we've been transforming the landscape of India's
            integrated services through unwavering vision and perseverance.
          </p>
        </div>

        <div className="hero-line mt-10">
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300">
            Discover Our Journey
          </button>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 z-10 hidden lg:block">
        <p className="text-white/20 font-black text-6xl rotate-90 origin-left select-none">
          ESTD 1986
        </p>
      </div>
    </section>
  );
};
