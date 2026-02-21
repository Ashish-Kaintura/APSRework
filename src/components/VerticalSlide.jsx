import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    { id: "01", title: "BODY CAMS", desc: "Documenting fieldwork with transparency." },
    { id: "02", title: "PREDICTIVE HEATMAP", desc: "AI-driven habitat density models." },
    { id: "03", title: "FIELD APP", desc: "Syncing data instantly with operations." },
];

export default function VerticalSlider() {
    const containerRef = useRef();
    const [activeSlide, setActiveSlide] = useState(0);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${slides.length * 100}%`, // Length based on slide count
                    pin: true,
                    scrub: 1,
                    // Update the pagination state based on progress
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (slides.length - 1));
                        setActiveSlide(index);
                    },
                },
            });

            // Animate slides: Slide 2 and 3 start below and move up
            slides.forEach((_, i) => {
                if (i === 0) return; // First slide is already visible
                tl.fromTo(
                    `.slide-${i}`,
                    { yPercent: 100 },
                    { yPercent: 0, ease: "none" },
                    `+=0.5` // Small pause between transitions
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black text-white overflow-hidden">

            {/* 1. Static Header (Always visible) */}
            <div className="absolute top-12 left-12 z-50">
                <h1 className="text-4xl font-bold uppercase tracking-tighter">Inversa Ops</h1>
            </div>

            {/* 2. Sliding Content */}
            <div className="relative w-full h-full">
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`slide-${i} absolute inset-0 flex items-center justify-start px-20 bg-black`}
                        style={{ zIndex: i + 1 }}
                    >
                        <div className="max-w-md">
                            <span className="text-lime-400 font-mono text-xl">{slide.id} —</span>
                            <h2 className="text-6xl font-bold mt-2 uppercase">{slide.title}</h2>
                            <p className="text-gray-400 mt-6 text-lg">{slide.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Right Side Pagination */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
                {slides.map((_, i) => (
                    <div key={i} className="flex items-center justify-end group cursor-pointer">
                        <span className={`mr-4 text-xs font-mono transition-opacity duration-300 ${activeSlide === i ? "opacity-100" : "opacity-0"}`}>
                            0{i + 1}
                        </span>
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === i ? "bg-lime-400 scale-150" : "bg-gray-600"
                                }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}