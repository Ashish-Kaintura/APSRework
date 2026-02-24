import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function RouteTransition({ children }) {
  const location = useLocation();
  const containerRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate overlay IN (cover screen)
    tl.set(overlayRef.current, { xPercent: -100 })
      .to(overlayRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "power4.inOut",
      })
      // Animate page content in
      .fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      // Animate overlay OUT
      .to(overlayRef.current, {
        xPercent: 100,
        duration: 0.6,
        ease: "power4.inOut",
      });
  }, [location.pathname]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        // className="fixed inset-0 backdrop-blur-2xl bg-white/30"\
        className="fixed inset-0 bg-black"
        // className="fixed inset-0 bg-black z-[9999] pointer-events-none"
      />

      {/* Page Content */}
      <div ref={containerRef}>{children}</div>
    </>
  );
}
