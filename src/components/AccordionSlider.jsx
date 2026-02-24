import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, Eye, Building2, ArrowRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Manned Guarding",
        label: "Physical Security",
        description: "Expertly trained security personnel for corporate, industrial, and residential protection.",
        image: "https://i.postimg.cc/QCgvVHVd/03.jpg", // Security Guard Concept
        icon: <Shield size={24} />,
    },
    {
        id: 2,
        title: "24x7 Monitoring",
        label: "Surveillance",
        description: "Advanced electronic surveillance and real-time threat detection from our command center.",
        image: "https://i.postimg.cc/T1jBhphY/00.jpg", // Tech/CCTV Concept
        icon: <Eye size={24} />,
    },
    {
        id: 3,
        title: "Facility Management",
        label: "Proton Services",
        description: "Integrated facility solutions ensuring a safe and productive environment for your assets.",
        image: "https://i.postimg.cc/nrKNMCML/04.jpg",
        icon: <Building2 size={24} />,
    },
   
];

const AccordionSlider = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const autoPlayRef = useRef(null);
    const SLIDE_DURATION = 4000; // 4 seconds

    // Auto-play logic
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            setExpandedIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => clearInterval(autoPlayRef.current);
    }, []);

    const handleManualClick = (index) => {
        clearInterval(autoPlayRef.current);
        setExpandedIndex(index);
        // Restart autoplay after interaction
        autoPlayRef.current = setInterval(() => {
            setExpandedIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
    };

    return (
        <section className="bg-secondary py-20 px-2 min-h-[700px] flex flex-col justify-center">
            <div className="w-full">

                {/* Accordion Container */}
                <div className="flex flex-col md:flex-row md:h-[600px] h-screen gap-2 mt-4">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            onClick={() => handleManualClick(i)}
                            className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl group ${expandedIndex === i ? 'flex-[12]' : 'flex-[1]'
                                }`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ${expandedIndex === i ? 'scale-110' : 'scale-100 grayscale'
                                        }`}
                                />
                                {/* Overlays */}
                                <div className={`absolute inset-0 transition-opacity duration-700 ${expandedIndex === i ? 'bg-gradient-to-t from-black via-black/20 to-transparent' : 'bg-black/80'
                                    }`} />
                                {/* Brand Color Accent (when collapsed) */}
                                <div className={`absolute top-0 left-0 w-1 h-full bg-primary transition-opacity duration-500 ${expandedIndex === i ? 'opacity-0' : 'opacity-100'
                                    }`} />
                            </div>

                            {/* Content when Expanded */}
                            <div className={`relative z-10 h-full p-2 flex flex-col justify-end transition-opacity duration-500 ${expandedIndex === i ? 'opacity-100 delay-300' : 'opacity-0'
                                }`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="p-2 bg-primary text-white rounded-lg">
                                        {slide.icon}
                                    </span>
                                    <div className="h-[1px] w-12 bg-white/30" />
                                </div>
                                <h4 className="text-3xl md:text-5xl font-bold text-white mb-4 italic uppercase">
                                    {slide.title}
                                </h4>
                                <p className="text-white/70 max-w-md mb-6 leading-relaxed">
                                    {slide.description}
                                </p>
                                <button className="flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                                    Learn More <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Sidebar Content when Collapsed */}
                            <div className={`absolute w-19 inset-0 z-10 p-6 flex flex-col justify-center items-center transition-opacity duration-500 ${expandedIndex === i ? 'opacity-0' : 'opacity-100'
                                }`}>
                                <div className="rotate-90 origin-center whitespace-nowrap">
                                    <span className="text-white text-xl tracking-widest uppercase opacity-90">
                                        {slide.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar (Global) */}
                <div className="mt-6 flex gap-2 justify-center">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 transition-all duration-500 rounded-full ${expandedIndex === i ? 'w-12 bg-primary' : 'w-4 bg-black/20'}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AccordionSlider;