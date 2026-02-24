import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import indiaMap from "../images/home/india.png";

const IndiaParticleMap = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = indiaMap; // ✅ FIXED

    const particles = [];
    const particleSize = 2;
    const gap = 4;

    img.onload = () => {
      console.log("Image Loaded");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              originX: x,
              originY: y,
            });
          }
        }
      }

      animate();

      gsap.to(particles, {
        x: (i) => particles[i].originX,
        y: (i) => particles[i].originY,
        duration: 2,
        ease: "power3.out",
        stagger: 0.001,
      });
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <div
      style={{ background: "black", display: "flex", justifyContent: "center" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default IndiaParticleMap;
