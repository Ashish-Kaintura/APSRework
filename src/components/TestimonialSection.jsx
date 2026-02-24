import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Vikram Malhotra",
    position: "Operations Director, TechCorp",
    content:
      "APS Group has redefined what we expect from a security partner. Their manned guarding team is disciplined and proactive.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    position: "Facility Manager, Urban Estates",
    content:
      "The transition to their facility management services was seamless. Their 39 years of experience shows in every detail.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rajesh Khanna",
    position: "CEO, Global Logistics",
    content:
      "Their 24/7 monitoring center gave us peace of mind. It's not just security; it's intelligence-driven protection.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
];

export const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const autoPlayRef = useRef(null);

  const animateTransition = useCallback((newIndex) => {
    const tl = gsap.timeline();

    // Exit
    tl.to(contentRef.current, {
      x: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    tl.to(imageRef.current, { scale: 1.1, opacity: 0, duration: 0.3 }, 0);

    tl.call(() => setIndex(newIndex));

    // Enter
    tl.fromTo(
      contentRef.current,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );
    tl.fromTo(
      imageRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" },
      "-=0.4",
    );
  }, []);

  const next = useCallback(
    () => animateTransition((index + 1) % testimonials.length),
    [index, animateTransition],
  );
  const prev = () =>
    animateTransition((index - 1 + testimonials.length) % testimonials.length);

  // Auto-play Effect
  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000); // 5 seconds
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

  const handleManualControl = (action) => {
    clearInterval(autoPlayRef.current); // Reset timer on click
    action();
    autoPlayRef.current = setInterval(next, 5000);
  };

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Text - Scaled down for mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-slate-50 select-none pointer-events-none z-0">
        TRUST
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Image (Made smaller and more responsive) */}
          <div className="w-full max-w-[320px] lg:max-w-sm relative">
            <div className="relative z-10 w-full aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <img
                ref={imageRef}
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Frames - Scaled down */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-4 border-primary/20 rounded-full z-0" />

            {/* Quote Icon - Smaller */}
            <div className="absolute z-20 -bottom-4 -right-4 bg-primary p-4 rounded-2xl shadow-lg text-white">
              <Quote size={24} fill="currentColor" />
            </div>
          </div>

          {/* Right: Content Section */}
          <div className="w-full lg:w-7/12 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-2 lg:space-y-4">
              <div className="flex justify-center lg:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Client Voices
              </h2>
            </div>

            <div
              ref={contentRef}
              className="min-h-[180px] lg:min-h-[200px] flex flex-col justify-center"
            >
              {/* Fluid text size: text-xl for mobile, text-4xl for desktop */}
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight italic">
                "{testimonials[index].content}"
              </p>

              <div className="mt-6">
                <h4 className="text-lg lg:text-xl font-black text-slate-900">
                  {testimonials[index].name}
                </h4>
                <p className="text-primary font-bold uppercase tracking-widest text-[10px] lg:text-xs mt-1">
                  {testimonials[index].position}
                </p>
              </div>
            </div>

            {/* Navigation - Compact */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => handleManualControl(prev)}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleManualControl(next)}
                className="w-16 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all shadow-md"
              >
                <ChevronRight size={24} />
              </button>

              <div className="ml-4 font-bold text-slate-300 text-sm">
                <span className="text-slate-900">0{index + 1}</span> / 0
                {testimonials.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
