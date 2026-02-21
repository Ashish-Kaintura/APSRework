import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Cpu, Zap, BarChart3, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Counter Animation Logic
            const counters = gsap.utils.toArray(".stat-number");
            counters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-target"));
                gsap.fromTo(counter,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 90%",
                        },
                    }
                );
            });

            // 2. Bento Grid Entrance
            gsap.from(".bento-item", {
                scrollTrigger: {
                    trigger: ".bento-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const facts = [
        {
            label: "Years of Experience",
            value: "39",
            sub: "Established in 1986",
            icon: <ShieldCheck className="text-primary" />
        },
        {
            label: "Security Professionals",
            value: "42000",
            sub: "Workforce of 42k+ employees",
            icon: <Zap className="text-primary" />
        },
        {
            label: "Presence in States",
            value: "27",
            sub: "Across India & UTs",
            icon: <BarChart3 className="text-primary" />
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[2px] w-12 bg-primary"></span>
                            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                                Why Choose APS Group
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
                            Unparalleled Expertise in <br />
                            <span className="text-slate-400">Security & Surveillance.</span>
                        </h2>
                    </div>
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-primary/20">
                        CONTACT US <ArrowRight size={20} />
                    </button>
                </div>

                {/* Main Bento Grid */}
                <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {/* Feature 1: Tech Enabled */}
                    <div className="bento-item md:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                                <Cpu className="text-primary" size={30} />
                            </div>
                            <h4 className="text-3xl font-bold mb-4">Tech-Enabled <br /> Integrated Solutions</h4>
                            <p className="text-slate-400 max-w-sm">
                                Real-time monitoring and insights powered by our proprietary intelligent operations center.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    </div>

                    {/* Stats Loop */}
                    {facts.map((fact, i) => (
                        <div key={i} className="bento-item bg-slate-50 border border-slate-100 rounded-[40px] p-10 flex flex-col justify-between hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-8">
                                {fact.icon}
                            </div>
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="stat-number text-5xl font-black text-slate-900" data-target={fact.value}>0</span>
                                    <span className="text-primary text-2xl font-black">+</span>
                                </div>
                                <p className="font-bold text-slate-900 mt-2 uppercase tracking-widest text-xs">{fact.label}</p>
                                <p className="text-slate-400 text-sm mt-1">{fact.sub}</p>
                            </div>
                        </div>
                    ))}

                    {/* AI Feature: Full Width on Mobile, Col 3-4 on Desktop */}
                    <div className="bento-item md:col-span-2 bg-primary rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4">
                            <h4 className="text-3xl font-black italic">AI-POWERED THREAT DETECTION</h4>
                            <p className="text-white/80 font-medium">
                                Leading the security & surveillance in the banking sector with 24/7 intelligent operations.
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                                <ShieldCheck size={40} />
                            </div>
                        </div>
                    </div>

                    {/* Quality Commitment Card */}
                    <div className="bento-item md:col-span-2 bg-slate-50 border border-slate-100 rounded-[40px] p-10 flex flex-col justify-center">
                        <h4 className="text-2xl font-bold text-slate-900 mb-4 italic">"No compromise with quality & value of services delivery"</h4>
                        <div className="h-[2px] w-full bg-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary w-1/2 animate-shimmer" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};