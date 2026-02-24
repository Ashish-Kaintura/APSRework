import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageTransition({ children }) {
  const el = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    });

    return () => ctx.revert();
  }, []);

  return <div ref={el}>{children}</div>;
}
