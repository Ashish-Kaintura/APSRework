import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiSecurityscorecard } from 'react-icons/si';
import { ArrowUpRight } from 'lucide-react';
import about from "../images/home/home about.jpg";

gsap.registerPlugin(ScrollTrigger);

export const AboutSummary = () => {
    const sectionRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        let mm = gsap.matchMedia(sectionRef);

        // ==========================================
        // DESKTOP ANIMATION (Pinned & Scrubbed)
        // ==========================================
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1.2,
                }
            });

            tl.to(sectionRef.current, { backgroundColor: "#f8fafc", duration: 2 }, 0);
            tl.to(".bg-giant-text", { x: "-30vw", duration: 4 }, 0);

            tl.fromTo(imageRef.current,
                { scale: 1.8, filter: "blur(20px)", y: 100 },
                { scale: 1, filter: "blur(0px)", y: 0, duration: 2, ease: "power2.inOut" },
                0
            );

            tl.fromTo(".frame-decor",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out(1.5)" },
                1
            );

            tl.fromTo(".mask-text",
                { y: 120 },
                { y: 0, stagger: 0.15, duration: 1.5, ease: "power4.out" },
                0.8
            );

            tl.fromTo(badgeRef.current,
                { scale: 0.5, y: 100, opacity: 0, rotation: 15 },
                { scale: 1, y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.7)" },
                1.5
            );
        });

        // ==========================================
        // MOBILE & TABLET ANIMATION (Smooth Scroll Reveal)
        // ==========================================
        mm.add("(max-width: 1023px)", () => {
            // Background color shift on scroll
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: true,
                },
                backgroundColor: "#f8fafc"
            });

            // Image reveal
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 85%",
                },
                scale: 1.2,
                filter: "blur(10px)",
                duration: 1.5,
                ease: "power2.out"
            });

            // Frame and Badge pop in
            gsap.from(".frame-decor, .mobile-badge", {
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 60%",
                },
                scale: 0,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "back.out(1.5)"
            });

            // Text slides up
            gsap.fromTo(".mask-text",
                { y: 100 },
                {
                    scrollTrigger: {
                        trigger: ".text-content-wrapper",
                        start: "top 85%",
                    },
                    y: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power4.out"
                }
            );
        });

        // At the very end of your useEffect in AboutSummary
        ScrollTrigger.sort(); // Force GSAP to calculate triggers in order of appearance
        ScrollTrigger.refresh();

        return () => mm.revert(); // Clean up all media queries on unmount
    }, []);

    return (
        // Removed h-screen to allow natural flow on mobile, added min-h-screen for desktop
        <section ref={sectionRef} className="relative min-h-screen py-20 lg:py-0 bg-white flex items-center overflow-hidden">

            <div className="bg-giant-text absolute top-[10%] lg:top-1/2 lg:-translate-y-1/2 left-0 text-[20vw] lg:text-[18vw] font-black text-slate-100 select-none leading-none z-0 whitespace-nowrap opacity-50">
                ESTD 1986 OBSESSION
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left: Image Container */}
                    <div ref={imageContainerRef} className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
                            <img
                                ref={imageRef}
                                src={about}
                                alt="APS Group Journey"
                                // Adjusted height for mobile (h-[350px]) vs desktop (h-[550px])
                                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Decorative Frames */}
                        <div className="frame-decor absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 border-l-4 border-t-4 border-primary rounded-tl-3xl z-0" />
                        <div className="frame-decor absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 border-r-4 border-b-4 border-primary rounded-br-3xl z-0" />

                        {/* Premium Stats Badge */}
                        <div ref={badgeRef} className="mobile-badge absolute -bottom-6 right-4 lg:-bottom-8 lg:-right-10 bg-slate-900 text-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-2xl flex items-center gap-4 lg:gap-6 border-b-4 lg:border-b-8 border-primary z-20">
                            <div className="bg-primary/20 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                                <SiSecurityscorecard className="text-3xl lg:text-5xl text-primary" />
                            </div>
                            <div>
                                <p className="text-3xl lg:text-5xl font-black leading-none">39+</p>
                                <p className="text-primary text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] mt-1 lg:mt-2">Years of Legacy</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative Content */}
                    <div className="text-content-wrapper w-full lg:w-1/2 space-y-6 lg:space-y-8 z-10 mt-8 lg:mt-0">

                        <div className="space-y-4">
                            <div className="overflow-hidden py-1">
                                <div className="mask-text flex items-center gap-4">
                                    <span className="h-[2px] w-8 lg:w-12 bg-primary"></span>
                                    <span className="text-primary text-xs lg:text-sm font-black uppercase tracking-[0.3em] lg:tracking-[0.4em]">
                                        The APS Story
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-hidden py-2">
                                {/* Scaled text for mobile */}
                                <h2 className="mask-text text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                                    Never Underestimate <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-400">
                                        The Power of Dreams.
                                    </span>
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4 lg:space-y-6 text-slate-600 leading-relaxed text-base lg:text-lg font-medium">
                            <div className="overflow-hidden py-1">
                                <p className="mask-text border-l-4 border-primary/20 pl-4 lg:pl-6 italic">
                                    APS Group's journey began with a <span className="text-slate-900 font-bold">tin shed office and a Vespa scooter.</span> What many saw as obsession, we saw as the fuel to solve India's most complex integrated service challenges.
                                </p>
                            </div>

                            <div className="overflow-hidden py-1">
                                <p className="mask-text pl-4 lg:pl-6">
                                    Today, we stand as a leader in the industry, built on the vision of one man whose perseverance changed the landscape of security and facility management across 27 states.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-hidden pt-4 lg:pt-6 lg:pl-6">
                            <div className="mask-text inline-block">
                                <button className="group flex items-center gap-4 lg:gap-6 bg-slate-900 text-white pl-6 lg:pl-10 pr-2 lg:pr-3 py-2 lg:py-3 rounded-full hover:bg-primary transition-all duration-500 shadow-xl hover:shadow-primary/40">
                                    <span className="font-bold text-xs lg:text-sm uppercase tracking-widest">Learn Our History</span>
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <ArrowUpRight size={20} className="lg:w-6 lg:h-6" />
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};