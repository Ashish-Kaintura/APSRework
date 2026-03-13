import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "/src/images/About/clinet1.webp";
import img2 from "/src/images/About/client2.webp";

const slides = [
  {
    id: 1,
    title: "APS securityas services",
    image: img,
  },
  {
    id: 2,
    title: "APS securityas services",
    image: img2,
  },
];

export const SubBannerSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play logic (Changes slide every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[500px] my-8 lg:h-[100vh]  overflow-hidden font-sans">
      {/* --- SLIDER IMAGES --- */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            /* CHANGED HERE: object-cover is now object-contain */
            className="w-full h-full object-contain r origin-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* --- PROGRESS INDICATORS --- */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-4 w-full max-w-md">
            {slides.map((slide, index) => {
              const isActive = index === current;
              return (
                <div
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                  className="relative h-1.5 flex-grow bg-white/20 rounded-full overflow-hidden cursor-pointer group"
                >
                  {/* The animated fill bar */}
                  {isActive && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute top-0 left-0 h-full bg-primary"
                    />
                  )}
                  {/* Hover preview line */}
                  <div className="absolute top-0 left-0 h-full w-full bg-white/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
