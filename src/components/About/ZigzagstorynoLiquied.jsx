import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    id: 0,
    title: "Who We Are",
    subtitle: "A Legacy of Trust",
    text: "Starting from a tin shed and a Vespa scooter in 1986, APS Group has evolved into a powerhouse with 42,000+ professionals. We are the obsession that solves India's most complex service challenges.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Our Mission",
    subtitle: "Quality Without Compromise",
    text: "No compromise with quality or value of service delivery. Our mission is to protect assets and empower businesses through intelligence-driven integrated solutions across 27 states.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Our Vision",
    subtitle: "The Power of Dreams",
    text: "To be the gold standard in integrated services. We envision a future where technology and human expertise create an impenetrable shield of security.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  },
];

export const ZigZagStory = () => {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".content-block");

      // Pinning the image container while text scrolls
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".image-container-wrapper",
        pinSpacing: false,
      });

      // Swapping images and shifting the container side-to-side
      sections.forEach((section, i) => {
        const isEven = i % 2 === 0;
        const nextImage = content[i].image;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        // Move the image container to the opposite side
        tl.to(
          ".image-container-wrapper",
          {
            x: isEven ? "100%" : "0%",
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        );

        // Change the image source smoothly
        tl.to(
          ".traveling-img",
          {
            attr: { src: nextImage },
            duration: 0.1,
          },
          0.5,
        );
      });
    },
    { scope: mainRef },
  );

  return (
    <section ref={mainRef} className="relative bg-white font-sans">
      {/* The Traveling Image Container */}
      <div className="image-container-wrapper absolute top-0 left-0 w-full h-screen pointer-events-none z-10 hidden lg:flex items-center px-20">
        <div className="w-1/2 aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl bg-slate-100">
          <img
            src={content[0].image}
            alt="Traveling Visual"
            className="traveling-img w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Scrolling Content Blocks */}
      <div className="max-w-7xl mx-auto">
        {content.map((item, i) => (
          <div
            key={item.id}
            className={`content-block min-h-screen flex items-center px-6 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div className="w-full lg:w-1/2 space-y-6 lg:p-20">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="text-primary font-black uppercase tracking-widest text-xs">
                  {item.subtitle}
                </span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
                {item.title}
              </h2>
              <p className="text-slate-500 text-sm lg:text-lg leading-relaxed font-medium">
                {item.text}
              </p>

              {/* Mobile Image (Visible only on small screens) */}
              <div className="lg:hidden w-full aspect-square rounded-3xl overflow-hidden my-8">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
