import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scrollytelling() {
    const mainRef = useRef();
    const sceneRef = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // The Master Timeline tied to Scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top top",
                    end: "+=6000", // Length of the total scroll experience
                    scrub: 1,      // Smooth scrubbing
                    pin: true,     // Keeps the section locked in view
                    anticipatePin: 1,
                }
            });

            // --- STEP 1: INITIAL REVEAL ---
            tl.from(".svg-character", {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 2
            })
                .from(".main-title", { opacity: 0, y: -20 }, "<");

            // --- STEP 2: ZOOM & PAN TO CHARACTER 1 (Body Cam) ---
            tl.addLabel("step1")
                .to(sceneRef.current, {
                    // Move the scene so Character 1 is centered
                    x: "15%",
                    scale: 2.5,
                    duration: 4,
                    ease: "power2.inOut"
                }, "step1")
                .to(".svg-character:not(.char-1)", { opacity: 0.1 }, "step1")
                .from(".ui-text-1", { opacity: 0, x: -30, duration: 1 }, "step1+=1");

            // --- STEP 3: SLIDE TO CHARACTER 2 (Predictive Heatmap) ---
            tl.addLabel("step2")
                .to(sceneRef.current, {
                    // Pan the stage left to bring character 2 into view
                    x: "0%",
                    duration: 4,
                    ease: "power2.inOut"
                }, "step2")
                .to(".ui-text-1", { opacity: 0, x: 30 }, "step2") // Fade out old UI
                .to(".char-1", { opacity: 0.1 }, "step2")
                .to(".char-2", { opacity: 1 }, "step2")
                .from(".ui-text-2", { opacity: 0, x: -30, duration: 1 }, "step2+=1");

            // --- STEP 4: SLIDE TO CHARACTER 3 (Field App) ---
            tl.addLabel("step3")
                .to(sceneRef.current, {
                    // Pan further left for character 3
                    x: "-15%",
                    duration: 4,
                    ease: "power2.inOut"
                }, "step3")
                .to(".ui-text-2", { opacity: 0 }, "step3")
                .to(".char-2", { opacity: 0.1 }, "step3")
                .to(".char-3", { opacity: 1 }, "step3")
                .from(".ui-text-3", { opacity: 0, x: -30, duration: 1 }, "step3+=1");

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="relative w-full h-screen bg-black text-white overflow-hidden">
            {/* Header */}
            <div className="main-title absolute top-16 left-12 z-50">
                <h1 className="text-5xl font-bold uppercase tracking-tighter">
                    Creating the modern <br /> workforce
                </h1>
                <p className="text-gray-400 mt-4 max-w-xs">We arm field crews with the tools to restore ecosystems at scale.</p>
            </div>

            {/* The Moving Stage */}
            <div ref={sceneRef} className="flex items-end justify-center h-full w-[120%] gap-16 pb-20">
                <div className="svg-character char-1 w-72">
                    <img className="w-96 h-96" src="https://inversa.com/svg/1.svg" alt="Body Cam Specialist"  />
                </div>
                <div className="svg-character char-2 w-72">
                    <img className="w-96 h-96" src="https://inversa.com/svg/1.svg" alt="Heatmap Specialist"  />
                </div>
                {/* <div className="svg-character char-3 w-72">
                    <img className="w-96 h-96" src="https://inversa.com/svg/1.svg" alt="Field App Specialist"  />
                </div> */}
            </div>

            {/* Floating UI Overlays */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="ui-text-1 absolute bottom-32 left-20 opacity-0">
                    <h2 className="text-lime-400 font-mono text-xl">001 • BODY CAMS</h2>
                    <p className="max-w-xs text-sm text-gray-300">Document fieldwork and verify removals for program transparency.</p>
                </div>

                <div className="ui-text-2 absolute bottom-32 left-20 opacity-0">
                    <h2 className="text-lime-400 font-mono text-xl">002 • PREDICTIVE HEATMAP</h2>
                    <p className="max-w-xs text-sm text-gray-300">Identify likely invasive hotspots using AI-driven habitat models.</p>
                </div>

                <div className="ui-text-3 absolute bottom-32 left-20 opacity-0">
                    <h2 className="text-lime-400 font-mono text-xl">003 • FIELD APP</h2>
                    <p className="max-w-xs text-sm text-gray-300">Guides specialists to priority zones and syncs data instantly.</p>
                </div>
            </div>
        </div>
    );
}