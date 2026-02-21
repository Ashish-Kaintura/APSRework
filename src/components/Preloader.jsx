'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = ({ onComplete }) => {
    const container = useRef(null);
    const textRef = useRef(null);
    const [count, setCount] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Counter Animation
        const counterObj = { value: 0 };
        tl.to(counterObj, {
            value: 100,
            duration: 2,
            ease: "expo.out",
            onUpdate: () => setCount(Math.floor(counterObj.value)),
        });

        // 2. Text Reveal
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1.5");

        // 3. Exit Animation (Curtain Up)
        tl.to(container.current, {
            y: '-100%',
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: onComplete // Tell App.jsx we are done
        });

    }, { scope: container });

    return (
        <div ref={container} className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center text-primary">
            <div className="flex flex-col items-center">
                {/* The Counter */}
                <h1 className="text-[15vw] leading-none font-bold serif tabular-nums">
                    {count}%
                </h1>

                {/* The Slogan */}
                <div className="overflow-hidden mt-4">
                    <p ref={textRef} className="opacity-0 translate-y-10 uppercase tracking-widest text-sm">
                        Brewing Excellence
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;