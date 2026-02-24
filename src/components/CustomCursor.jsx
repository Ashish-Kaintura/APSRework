'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0
            });
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Slight lag for "liquid" feel
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover effects for links/buttons
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(followerRef.current, { scale: 3, opacity: 0.5, mixBlendMode: "difference" });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(followerRef.current, { scale: 1, opacity: 1, mixBlendMode: "normal" });
            });
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <>
            {/* The tiny sharp dot */}
            <div ref={cursorRef} className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2" />
            {/* The larger lagging circle */}
            <div ref={followerRef} className="fixed w-8 h-8 border border-primary rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform" />
        </>
    );
};

export default CustomCursor;