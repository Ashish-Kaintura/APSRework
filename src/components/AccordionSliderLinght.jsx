import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, Eye, Building2, ArrowRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Manned Guarding",
        label: "Physical Security",
        description: "Expertly trained security personnel for corporate, industrial, and residential protection.",
        image: "https://images.unsplash.com/photo-1533561052604-c3deb6d8ea64?q=80&w=1200&auto=format&fit=crop",
        icon: <Shield size={24} />,
    },
    {
        id: 2,
        title: "24x7 Monitoring",
        label: "Surveillance",
        description: "Advanced electronic surveillance and real-time threat detection from our command center.",
        image: "https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=1200&auto=format&fit=crop",
        icon: <Eye size={24} />,
    },
    {
        id: 3,
        title: "Facility Management",
        label: "Proton Services",
        description: "Integrated facility solutions ensuring a safe and productive environment for your assets.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        icon: <Building2 size={24} />,
    }
];

const AccordionSliderLight = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const autoPlayRef = useRef(null);
    const SLIDE_DURATION = 4000;

    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            setExpandedIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => clearInterval(autoPlayRef.current);
    }, []);

    const handleManualClick = (index) => {
        clearInterval(autoPlayRef.current);
        setExpandedIndex(index);
        autoPlayRef.current = setInterval(() => {
            setExpandedIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
    };

    return (
        // Changed bg-black to bg-slate-50 for a clean, light look
        <section className="bg-slate-50 py-24 px-6 min-h-screen flex flex-col justify-center font-sans">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header - Clean Dark Text */}
                <div className="mb-16 flex items-end justify-between border-b border-slate-200 pb-8">
                    <div>
                        <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3">Our Core Services</h2>
                        <h3 className="text-slate-900 text-4xl md:text-6xl font-black tracking-tighter">
                            PREMIUM <span className="text-slate-400">PROTECTION.</span>
                        </h3>
                    </div>
                    <div className="hidden md:block text-slate-400 text-sm font-medium tracking-widest uppercase">
                        APS Group • Since 1986
                    </div>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col md:flex-row h-[550px] gap-6">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            onClick={() => handleManualClick(i)}
                            className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-3xl shadow-xl shadow-slate-200 group ${expandedIndex === i ? 'flex-[5]' : 'flex-[1]'
                                }`}
                        >
                            {/* Image & Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ${expandedIndex === i ? 'scale-105' : 'scale-110 grayscale brightness-75'
                                        }`}
                                />
                                {/* Light Overlay for Expanded, Darker for Collapsed */}
                                <div className={`absolute inset-0 transition-all duration-700 ${expandedIndex === i
                                        ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                                        : 'bg-primary/10'
                                    }`} />
                            </div>

                            {/* Content when Expanded */}
                            <div className={`relative z-10 h-full p-10 flex flex-col justify-end transition-all duration-500 ${expandedIndex === i ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'
                                }`}>
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="p-3 bg-white text-primary rounded-2xl shadow-lg">
                                        {slide.icon}
                                    </div>
                                    <span className="text-white/80 font-bold uppercase tracking-widest text-xs">
                                        {slide.label}
                                    </span>
                                </div>

                                <h4 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
                                    {slide.title}
                                </h4>

                                <p className="text-white/80 max-w-lg mb-8 text-lg leading-relaxed">
                                    {slide.description}
                                </p>

                                <button className="w-fit bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary hover:text-white transition-all group/btn">
                                    View Details
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Sidebar Title when Collapsed */}
                            <div className={`absolute inset-0 z-10 flex flex-col justify-center items-center transition-opacity duration-500 ${expandedIndex === i ? 'opacity-0' : 'opacity-100'
                                }`}>
                                <div className="-rotate-90 origin-center whitespace-nowrap">
                                    <span className="text-white font-black text-2xl tracking-[0.2em] uppercase">
                                        {slide.title.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Light Progress Indicators */}
                <div className="mt-12 flex gap-3 justify-center items-center">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleManualClick(i)}
                            className={`h-2 transition-all duration-500 rounded-full ${expandedIndex === i ? 'w-16 bg-primary' : 'w-2 bg-slate-300 hover:bg-primary/50'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AccordionSliderLight;