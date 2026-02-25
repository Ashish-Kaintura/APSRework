import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, ShieldCheck, Activity, Globe, ArrowRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "MANNED",
        subtitle: "GUARDING",
        description: "42,000+ elite professionals providing gold-standard physical security across 27 states.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "24X7",
        subtitle: "MONITORING",
        description: "State-of-the-art Command Center offering real-time surveillance and rapid response.",
        image: "https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "FACILITY",
        subtitle: "MANAGEMENT",
        description: "Integrated solutions for corporate ecosystems via Proton Facility Services.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
    }
];

const APSBannerSlider = () => {
    const [index, setIndex] = useState(0);
    const progressRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const autoPlayRef = useRef(null);

    const SLIDE_DURATION = 5; // Seconds

    const runProgressBar = useCallback(() => {
        gsap.fromTo(progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: SLIDE_DURATION, ease: "none", transformOrigin: "left" }
        );
    }, []);

    const changeSlide = useCallback((direction = 'next') => {
        const tl = gsap.timeline();

        tl.to([textRef.current, imageRef.current], {
            x: direction === 'next' ? -100 : 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                if (direction === 'next') {
                    setIndex((prev) => (prev + 1) % slides.length);
                } else {
                    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
                }
                // Reset entrance position
                gsap.set([textRef.current, imageRef.current], { x: direction === 'next' ? 100 : -100 });
            }
        });

        tl.to([textRef.current, imageRef.current], {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
        });

        runProgressBar();
    }, [runProgressBar]);

    // Auto Play Effect
    useEffect(() => {
        runProgressBar();
        autoPlayRef.current = setInterval(() => {
            changeSlide('next');
        }, SLIDE_DURATION * 1000);

        return () => clearInterval(autoPlayRef.current);
    }, [changeSlide, runProgressBar]);

    // Manual Click Interruption
    const handleManualChange = (dir) => {
        clearInterval(autoPlayRef.current);
        changeSlide(dir);
        autoPlayRef.current = setInterval(() => changeSlide('next'), SLIDE_DURATION * 1000);
    };

    return (
        <div className="relative h-screen w-full bg-black overflow-hidden text-white font-sans">

            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
                <img  loading="lazy"
                    ref={imageRef}
                    src={slides[index].image}
                    className="w-full h-full object-cover grayscale-[50%]"
                    alt="APS Service"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
                <div ref={textRef} className="max-w-5xl">
                    <div className="flex items-center gap-3 ">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="tracking-[0.3em] text-xs font-bold uppercase text-primary">
                            Security & Intelligence
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-5xl font-black leading-none mt-6 ">
                        {slides[index].title} <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px primary' }}>
                            {slides[index].subtitle}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-4 leading-relaxed border-l-4 border-primary pl-6">
                        {slides[index].description}
                    </p>
{/* 
                    <button className="bg-primary hover:bg-white hover:text-black text-white px-10 py-5 font-black text-sm uppercase tracking-tighter transition-all duration-300 flex items-center gap-4 group">
                        Consult Our Experts <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button> */}
                </div>
            </div>

            {/* Bottom Controls UI */}
            <div className="absolute bottom-0 left-0 w-full z-30 grid grid-cols-1 md:grid-cols-2 items-end p-10 md:p-20">

                {/* Progress Bar & Slide Counter */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-end gap-4 font-black ">
                        <span className="text-5xl text-primary">0{index + 1}</span>
                        <span className="text-xl text-white/30 mb-1">/ 0{slides.length}</span>
                    </div>
                    <div className="w-full max-w-md h-[4px] bg-white/10 relative">
                        <div
                            ref={progressRef}
                            className="absolute top-0 left-0 h-full bg-primary"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-end gap-2 mt-10 md:mt-0">
                    <button
                        onClick={() => handleManualChange('prev')}
                        className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                    >
                        <ChevronLeft size={30} className="group-active:scale-90 transition-transform" />
                    </button>
                    <button
                        onClick={() => handleManualChange('next')}
                        className="w-16 h-16 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                    >
                        <ChevronRight size={30} className="group-active:scale-90 transition-transform" />
                    </button>
                </div>

            </div>

            {/* Side Decorative Text */}
            <div className="hidden lg:block absolute top-1/2 right-[-100px] -rotate-90 origin-center">
                <span className="text-xs tracking-[5px] font-bold text-white/70 uppercase">
                    APS GROUP INDIA • ESTABLISHED 1986
                </span>
            </div>
        </div>
    );
};

export default APSBannerSlider;