import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiSecurityscorecard } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import about from "../images/home/home about.jpg";

gsap.registerPlugin(ScrollTrigger);

export const AboutSummary = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia(sectionRef);

    // ==========================================
    // DESKTOP ANIMATION (Pinned & Scrubbed)
    // ==========================================
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
        },
      });

      tl.to(sectionRef.current, { backgroundColor: "#f8fafc", duration: 2 }, 0);
      tl.to(".bg-giant-text", { x: "-30vw", duration: 4 }, 0);

      tl.fromTo(
        imageRef.current,
        { scale: 1.8, filter: "blur(20px)", y: 100 },
        {
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        0,
      );

      tl.fromTo(
        ".frame-decor",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.5)",
        },
        1,
      );

      tl.fromTo(
        ".mask-text",
        { y: 120 },
        { y: 0, stagger: 0.15, duration: 1.5, ease: "power4.out" },
        0.8,
      );

      tl.fromTo(
        badgeRef.current,
        { scale: 0.5, y: 100, opacity: 0, rotation: 15 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.7)",
        },
        1.5,
      );
    });

    // ==========================================
    // MOBILE & TABLET ANIMATION (Smooth Scroll Reveal)
    // ==========================================
    mm.add("(max-width: 1023px)", () => {
      // Background color shift on scroll
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        },
        backgroundColor: "#f8fafc",
      });

      // Image reveal
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 85%",
        },
        scale: 1.2,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.out",
      });

      // Frame and Badge pop in
      gsap.from(".frame-decor, .mobile-badge", {
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 60%",
        },
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)",
      });

      // Text slides up
      gsap.fromTo(
        ".mask-text",
        { y: 100 },
        {
          scrollTrigger: {
            trigger: ".text-content-wrapper",
            start: "top 85%",
          },
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
        },
      );
    });

    // At the very end of your useEffect in AboutSummary
    ScrollTrigger.sort(); // Force GSAP to calculate triggers in order of appearance
    ScrollTrigger.refresh();

    return () => mm.revert(); // Clean up all media queries on unmount
  }, []);

  return (
    // Removed h-screen to allow natural flow on mobile, added min-h-screen for desktop
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-0 bg-white flex items-center overflow-hidden"
    >
      {/* Background Text - Scaled down to prevent overflow */}
      <div className="bg-giant-text absolute top-[15%] lg:top-1/2 lg:-translate-y-1/2 left-0 text-[15vw] lg:text-[12vw] font-black text-slate-50 select-none leading-none z-0 whitespace-nowrap opacity-60 pointer-events-none uppercase">
        ESTD 1986 OBSESSION
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full sm:mt-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left: Compact Image Container */}
          <div ref={imageContainerRef} className="w-full lg:w-[45%] relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg group">
              <img
                ref={imageRef}
                src={about}
                loading="lazy"
                alt="APS Group Journey"
                // Smaller heights for a compact look
                className="w-full h-[280px] md:h-[350px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Decorative Frames - Smaller */}
            <div className="frame-decor absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-16 h-16 lg:w-24 lg:h-24 border-l-2 border-t-2 border-primary rounded-tl-2xl z-0" />
            <div className="frame-decor absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 w-16 h-16 lg:w-24 lg:h-24 border-r-2 border-b-2 border-primary rounded-br-2xl z-0" />

            {/* Stats Badge - Compact Padding */}
            <div
              ref={badgeRef}
              className="mobile-badge absolute -bottom-4 right-4 lg:-bottom-6 lg:-right-8 bg-slate-900 text-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl flex items-center gap-4 border-b-4 border-primary z-20"
            >
              <div className="bg-primary/20 p-2 lg:p-3 rounded-lg">
                <SiSecurityscorecard className="text-2xl lg:text-4xl text-primary" />
              </div>
              <div>
                <p className="text-2xl lg:text-4xl font-black leading-none">
                  39+
                </p>
                <p className="text-primary text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mt-1">
                  Years of Legacy
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Content - Scaled down Typography */}
          <div className="text-content-wrapper w-full lg:w-[50%] space-y-5 lg:space-y-6 z-10">
            <div className="space-y-3">
              <div className="overflow-hidden py-1">
                <div className="mask-text flex items-center gap-3">
                  <span className="h-[1px] w-6 lg:w-10 bg-primary"></span>
                  <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]">
                    About APS
                  </span>
                </div>
              </div>

              <div className="overflow-hidden py-1">
                <h2 className="mask-text text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                  Power of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-400">
                    Dreams.
                  </span>
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
              <div className="overflow-hidden">
                <p className="mask-text border-l-2 border-primary/30 pl-4 italic">
                  The vision & perseverance of one{" "}
                  <span className="text-slate-900 font-bold">
                    man changed the shape of several industries.
                  </span>{" "}
                  The vision & perseverance of one man changed the shape of
                  several industries. What seemed as obsession at one point in
                  time, is now a reality! This all started from a Tin Shed
                  office & a vespa scooter & a passion to create Solution for
                  problems. We invite you to be a part of such an obsession.
                  Navigate the Solution Segments & Our Companies by clicking
                  below button.
                </p>
              </div>

              <div className="overflow-hidden">
                <p className="mask-text pl-4">
                  Today, we stand as an industry leader, built on vision and
                  perseverance across 27 states in India.
                </p>
              </div>
            </div>

            <div className="overflow-hidden pt-2">
              <div className="mask-text inline-block">
                <button className="group flex items-center gap-3 bg-slate-900 text-white pl-6 pr-1.5 py-1.5 rounded-full hover:bg-primary transition-all duration-300 shadow-lg">
                  <span className="font-bold text-[10px] lg:text-xs uppercase tracking-widest">
                    Learn Our History
                  </span>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
