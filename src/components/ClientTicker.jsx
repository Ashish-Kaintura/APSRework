import React from "react";
import { motion } from "framer-motion";

// Replace these with actual client logo paths from your project
const clientLogos = [
  {
    id: 1,
    name: "Client 1",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 2,
    name: "Client 2",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 3,
    name: "Client 3",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    id: 4,
    name: "Client 4",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg",
  },
  {
    id: 5,
    name: "Client 5",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Samsung_Logo.svg",
  },
  {
    id: 6,
    name: "Client 6",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png",
  },
];

export const ClientTicker = () => {
  // We double the array to create a seamless infinite loop
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className=" relative py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-6 bg-primary"></span>
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
            Trusted By Leaders
          </span>
          <span className="h-[1px] w-6 bg-primary"></span>
        </div>
        <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight uppercase">
          PROUDLY SERVING INDIA'S{" "}
          <span className=" text-primary">FINEST INSTITUTIONS.</span>
        </h2>
      </div>

      {/* The Infinite Slider Container */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-10 lg:px-16"
            >
              <img  loading="lazy"
                src={logo.url}
                alt={logo.name}
                className="h-8 lg:h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Added Gradient Masks for that "Fade-in/out" Premium Effect */}
      <div className="absolute inset-y-0 left-0 w-20 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
};
