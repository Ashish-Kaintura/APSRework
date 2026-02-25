import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PARTICLE_COUNT = 3800; // High density for map detail
const MOUSE_RADIUS = 80; // How close mouse must be to push dots
const PUSH_STRENGTH = 0.15; // Speed of the push-back
const MAP_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Kt0En5cFgVQH8X99zE_wRQRhjF6RiH4DVA&s";

export default function InteractiveIndiaMap() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothP = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const sampleMapPoints = useCallback((W, H) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = MAP_IMAGE_URL;

    img.onload = () => {
      const samplingCanvas = document.createElement("canvas");
      const sCtx = samplingCanvas.getContext("2d");
      const sampleW = 220;
      const sampleH = 240;
      samplingCanvas.width = sampleW;
      samplingCanvas.height = sampleH;

      sCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imageData = sCtx.getImageData(0, 0, sampleW, sampleH).data;

      const validPoints = [];
      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4;
          if (imageData[idx] < 128 && imageData[idx + 3] > 128) {
            validPoints.push({ x: x / sampleW, y: y / sampleH });
          }
        }
      }

      particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(
        (_, i) => {
          const pt =
            validPoints[Math.floor(Math.random() * validPoints.length)];

          // Final map coordinates
          const tx = W * 0.45 + pt.x * (W * 0.48);
          const ty = H * 0.05 + pt.y * (H * 0.85);

          // Wave start coordinates
          const sx = (i / PARTICLE_COUNT) * W;
          const sy = H * 0.9 + Math.sin(i * 0.15) * 15;

          return {
            sx,
            sy,
            tx,
            ty,
            x: sx,
            y: sy, // Current pos
            vx: 0,
            vy: 0, // Velocity for mouse physics
            size: 1 + Math.random() * 2,
            gray: Math.floor(40 + Math.random() * 80),
            delay: (i / PARTICLE_COUNT) * 0.3,
          };
        },
      );
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w: W, h: H };
      sampleMapPoints(W, H);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      const progress = smoothP.get();
      const { w, h } = sizeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f8f8f6";
      ctx.fillRect(0, 0, w, h);

      if (imageLoaded) {
        particlesRef.current.forEach((p) => {
          const localP = Math.max(0, Math.min(1, (progress - p.delay) / 0.7));
          const eased = 1 - Math.pow(1 - localP, 4);

          // 1. Calculate base animated position
          const targetX = p.sx + (p.tx - p.sx) * eased;
          const targetY = p.sy + (p.ty - p.sy) * eased;

          // 2. Add Mouse Interaction (Repulsion)
          const dx = targetX - mx;
          const dy = targetY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * PUSH_STRENGTH;
            p.vy += (dy / dist) * force * PUSH_STRENGTH;
          }

          // Friction to bring particles back to home
          p.vx *= 0.9;
          p.vy *= 0.9;

          p.x = targetX + p.vx * 50;
          p.y = targetY + p.vy * 50;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.gray}, ${p.gray}, ${p.gray}, ${0.2 + eased * 0.8})`;
          ctx.fill();
        });
      }
      requestAnimationFrame(render);
    };

    const raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageLoaded, smoothP, sampleMapPoints]);

  return (
    <div ref={wrapperRef} style={{ height: "450vh", background: "#f8f8f6" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", cursor: "none" }}
        />

        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "35%",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "4.5vw",
              fontWeight: 800,
              color: "#111",
            }}
          >
            Assembling <br /> India.
          </h1>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#666",
              maxWidth: "80%",
            }}
          >
            Move your cursor over the map to interact with the training data.
            Scroll down to see the revolution take shape.
          </p>
        </div>
      </div>
    </div>
  );
}
