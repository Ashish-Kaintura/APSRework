import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Vikram Malhotra",
        position: "Operations Director, TechCorp",
        content: "APS Group has redefined what we expect from a security partner. Their manned guarding team is disciplined, tech-savvy, and incredibly proactive.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ananya Sharma",
        position: "Facility Manager, Urban Estates",
        content: "The transition to their facility management services was seamless. The 39 years of experience really shows in their attention to detail.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Rajesh Khanna",
        position: "CEO, Global Logistics",
        content: "Their 24/7 monitoring center gave us the peace of mind we needed. It's not just security; it's intelligence-driven protection.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
    }
];

export const TestimonialSection = () => {
    const [index, setIndex] = useState(0);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const bgTextRef = useRef(null);

    const animateTransition = (newIndex) => {
        const tl = gsap.timeline();

        // Exit: Content slides down, Image slides up
        tl.to(contentRef.current, { y: 50, opacity: 0, duration: 0.4, ease: "power2.in" });
        tl.to(imageRef.current, { scale: 1.2, filter: "blur(10px)", opacity: 0, duration: 0.4 }, 0);

        tl.call(() => setIndex(newIndex));

        // Enter: Content slides from up, Image slides from down
        tl.fromTo(contentRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );
        tl.fromTo(imageRef.current,
            { scale: 0.8, filter: "blur(10px)", opacity: 0 },
            { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "expo.out" },
            "-=0.5"
        );
    };

    const next = () => animateTransition((index + 1) % testimonials.length);
    const prev = () => animateTransition((index - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="relative py-32 bg-slate-50 overflow-hidden min-h-[800px] flex items-center">
            {/* Huge Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-200/40 select-none pointer-events-none z-0">
                TRUST
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left: Image with Frame */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="relative z-10 w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                            <img
                                ref={imageRef}
                                src={testimonials[index].image}
                                alt={testimonials[index].name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Rings */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-[12px] border-primary/10 rounded-full z-0" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full z-0" />

                        {/* Quote Icon Badge */}
                        <div className="absolute z-10 top-10 -right-8 bg-primary p-6 rounded-3xl shadow-xl text-white">
                            <Quote size={40} fill="currentColor" />
                        </div>
                    </div>

                    {/* Right: Content Section */}
                    <div className="w-full lg:w-7/12 space-y-10">
                        <div className="space-y-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-primary text-primary" />
                                ))}
                            </div>
                            <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
                                Client Testimonials
                            </h2>
                        </div>

                        <div ref={contentRef} className="space-y-8">
                            <p className="text-3xl md:text-5xl font-medium text-slate-900 leading-[1.2] italic tracking-tight">
                                "{testimonials[index].content}"
                            </p>

                            <div>
                                <h4 className="text-2xl font-black text-slate-900">{testimonials[index].name}</h4>
                                <p className="text-primary font-bold uppercase tracking-widest text-sm mt-1">
                                    {testimonials[index].position}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-6 pt-10">
                            <button
                                onClick={prev}
                                className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 group"
                            >
                                <ChevronLeft className="group-active:scale-75 transition-transform" />
                            </button>
                            <button
                                onClick={next}
                                className="w-24 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all duration-500 group shadow-xl"
                            >
                                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Slide Counter */}
                            <div className="ml-auto font-black text-slate-300">
                                <span className="text-slate-900 text-2xl">0{index + 1}</span> / 0{testimonials.length}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};