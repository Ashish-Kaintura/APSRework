import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, ShieldCheck, Activity, Globe } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "MANNED",
        subtitle: "GUARDING",
        description: "42,000+ elite professionals providing gold-standard physical security across 27 states.",
        icon: <ShieldCheck size={32} />,
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2000&auto=format&fit=crop", // Security Guard Concept
    },
    {
        id: 2,
        title: "24X7",
        subtitle: "MONITORING",
        description: "State-of-the-art Command Center offering real-time surveillance and rapid response.",
        icon: <Activity size={32} />,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", // Tech/CCTV Concept
    },
    {
        id: 3,
        title: "FACILITY",
        subtitle: "MANAGEMENT",
        description: "Integrated solutions for corporate ecosystems via Proton Facility Services.",
        icon: <Globe size={32} />,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", // Modern Building Concept
    }
];

const PremiumSlider = () => {
    const [index, setIndex] = useState(0);
    const slideRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    const animateSlide = (direction) => {
        const tl = gsap.timeline();

        // 1. Exit Animation (Slide out current content)
        tl.to([textRef.current, imageRef.current], {
            y: direction === 'next' ? -50 : 50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                // Update State
                if (direction === 'next') {
                    setIndex((prev) => (prev + 1) % slides.length);
                } else {
                    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
                }
            }
        });

        // 2. Entrance Animation (Slide in new content)
        tl.fromTo(imageRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" }
        );
        tl.fromTo(textRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.8"
        );
    };

    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden text-white">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    ref={imageRef}
                    src={slides[index].image}
                    className="w-full h-full object-cover opacity-40 transition-transform"
                    alt="Security Service"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-24">
                <div ref={textRef} className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-600 rounded-lg text-white">
                            {slides[index].icon}
                        </div>
                        <span className="tracking-[0.5em] text-sm font-bold text-blue-500 uppercase">
                            APS Group Excellence
                        </span>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 select-none italic">
                        {slides[index].title} <br />
                        <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>
                            {slides[index].subtitle}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
                        {slides[index].description}
                    </p>

                    <button className="group relative overflow-hidden bg-white text-black px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-sm transition-all">
                        <span className="relative z-10">Discover More</span>
                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-4">
                <button
                    onClick={() => animateSlide('prev')}
                    className="p-4 border border-white/20 hover:bg-white hover:text-black transition-all rounded-full"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => animateSlide('next')}
                    className="p-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-full"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-12 left-24 z-20 flex items-center gap-8">
                <div className="text-4xl font-black opacity-20">0{index + 1}</div>
                <div className="w-40 h-[2px] bg-white/10 relative">
                    <div
                        className="absolute h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${((index + 1) / slides.length) * 100}%` }}
                    />
                </div>
                <div className="text-sm font-bold tracking-widest">0{slides.length}</div>
            </div>
        </div>
    );
};

export default PremiumSlider;