import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../../images/About/who we are1.png";
import image2 from "../../images/About/ourmission.png";
import image3 from "../../images/About/vision.png";
gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    id: "who-we-are",
    subtitle: "A Legacy of Trust",
    title: "Who We Are",
    text: [
      "Founded 39 years ago, APS Group is a leading Integrated Security Services, Facility Management, HR Outsourcing, Homeland Security, and Surveillance Company in India. From a humble beginning in a tin shed office to becoming a nationally trusted brand, APS Group delivers technology-driven, customizable, and innovative solutions across industries.",
      "With advanced systems like QRT/MRT Emergency Response, State-of-the-Art Command Centres, Digital Attendance, Mobile App–Based Reporting & Monitoring, and Panic Button Support, we ensure safety, efficiency, and operational excellence for our clients.",
      "APS Group is also an Innovation Hub through APS Business Incubator, driving future-ready business solutions.",
    ],
    image: image1,
  },
  {
    id: "vision",
    subtitle: "The Power of Dreams",
    title: "Our Vision",
    text: [
      "To be India’s most trusted integrated security and facility management company, setting benchmarks in technology integration, rapid emergency response, and customized service solutions.",
    ],
    image: image3,
  },
  {
    id: "mission",
    subtitle: "Quality Without Compromise",
    title: "Our Mission",
    text: [
      "Deliver reliable security services and facility management solutions powered by advanced technology.",
      "Provide fast emergency response through QRT/MRT teams and command centres.",
      "Ensure transparency with real-time reporting, digital attendance, and monitoring dashboards.",
      "Empower our workforce through dedicated training facilities and mobile app–based learning.",
      "Create long-term value through innovation, integrity, and operational excellence.",
      "APS Group – India’s Trusted Partner in Security, Facility Management & Integrated Business Solutions.",
    ],
    image: image2,
  },
];

export const LiquidZigZagStory = () => {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia(mainRef);

      // ==========================================
      // DESKTOP: Liquid Traveling Animation
      // ==========================================
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "+=200%", // Controls how long the user scrolls to finish the section
            pin: true,
            scrub: 1.5, // Extremely smooth scrubbing delay
          },
        });

        // Transition 1: Who We Are -> Mission
        tl.to(
          ".traveling-container",
          { xPercent: 100, ease: "sine.inOut", duration: 1 },
          0,
        )
          // Liquid effect spikes up and goes back down
          .to(
            "#liquid-turbulence",
            {
              attr: { baseFrequency: 0.05 },
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            0,
          )
          // Fade images
          .to(".img-0", { opacity: 0, duration: 0.4 }, 0.3)
          .to(".img-1", { opacity: 1, duration: 0.4 }, 0.3)
          // Fade Text
          .to(".text-0", { opacity: 0, y: -30, duration: 0.4 }, 0)
          .fromTo(
            ".text-1",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4 },
            0.6,
          );

        // Transition 2: Mission -> Vision
        tl.to(
          ".traveling-container",
          { xPercent: 0, ease: "sine.inOut", duration: 1 },
          1,
        )
          .to(
            "#liquid-turbulence",
            {
              attr: { baseFrequency: 0.05 },
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            1,
          )
          .to(".img-1", { opacity: 0, duration: 0.4 }, 1.3)
          .to(".img-2", { opacity: 1, duration: 0.4 }, 1.3)
          .to(".text-1", { opacity: 0, y: -30, duration: 0.4 }, 1)
          .fromTo(
            ".text-2",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4 },
            1.6,
          );
      });

      // ==========================================
      // MOBILE: Clean Stacked Layout (Fixes the "too big" bug)
      // ==========================================
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".mobile-section").forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "restart none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        });
      });

      return () => mm.revert();
    },
    { scope: mainRef },
  );

  return (
    <section ref={mainRef} className="bg-white font-sans overflow-hidden">
      {/* --- SVG Filter Definition for Liquid Distortion --- */}
      <svg className="hidden">
        <filter id="liquid-distortion">
          <feTurbulence
            id="liquid-turbulence"
            type="fractalNoise"
            baseFrequency="0"
            numOctaves="1"
            result="warp"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="40"
            in="SourceGraphic"
            in2="warp"
          />
        </filter>
      </svg>

      {/* =========================================
                DESKTOP VIEW (Pinned, Traveling, Liquid)
            ========================================= */}
      <div className="hidden lg:block relative h-screen w-full max-w-7xl mx-auto px-10">
        {/* The Traveling Image Container */}
        <div className="traveling-container absolute top-1/2 -translate-y-1/2 left-10 w-[45%] aspect-[4/5] z-10">
          <div
            className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-slate-100"
            style={{
              filter: "url(#liquid-distortion)",
              transform: "translateZ(0)",
            }}
          >
            {content.map((item, i) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className={`img-${i} absolute inset-0 w-full h-full object-cover ${i === 0 ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        {/* Overlapping Text Containers */}
        <div className="relative w-full h-full flex items-center">
          {content.map((item, i) => (
            <div
              key={item.id}
              className={`text-${i} absolute top-[35%] -translate-y-1/2 w-1/2 px-16 ${i % 2 === 0 ? "right-0" : "left-0"} ${i === 0 ? "opacity-100" : "opacity-0"}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-primary"></span>
                  <span className="text-primary font-black uppercase tracking-widest text-[10px]">
                    {item.subtitle}
                  </span>
                </div>
                <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase mb-6">
                  {item.title}
                </h2>

                {Array.isArray(item.text) ? (
                  item.text.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-slate-500 text-base leading-relaxed font-medium mb-4"
                    >
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
                MOBILE VIEW (Compact, Responsive, Stacked)
            ========================================= */}
      <div className="block lg:hidden py-16 px-6 space-y-16">
        {content.map((item, i) => (
          <div key={item.id} className="mobile-section flex flex-col gap-6">
            {/* Compact Mobile Image */}
            <div className="w-full h-[250px] sm:h-[350px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mobile Text */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[1px] w-6 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-widest text-[9px]">
                  {item.subtitle}
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-3">
                {item.title}
              </h2>

              {Array.isArray(item.text) ? (
                item.text.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-slate-600 text-sm leading-relaxed mb-3"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
