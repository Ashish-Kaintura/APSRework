import React from "react";
import { motion } from "framer-motion";
import image1 from "../images/About/logo/Picture4.png";
import image2 from "../images/About/logo/Picture5.png";
import image3 from "../images/About/logo/Picture6.png";
import image4 from "../images/About/logo/Picture7.png";
import image5 from "../images/About/logo/Picture8.png";
import image6 from "../images/About/logo/Picture28.png";
import image7 from "../images/About/logo/Picture32.png";
import image8 from "../images/About/logo/Picture44.png";
import image9 from "../images/About/logo/Picture51.png";
import image10 from "../images/About/logo/Picture34.png";
// Replace these with actual client logo paths from your project
const clientLogos = [
  {
    id: 1,
    name: "Client 1",
    url: image1,
  },
  {
    id: 2,
    name: "Client 2",
    url: image2,
  },
  {
    id: 3,
    name: "Client 3",
    url: image3,
  },
  {
    id: 4,
    name: "Client 4",
    url: image4,
  },
  {
    id: 5,
    name: "Client 5",
    url: image5,
  },
  {
    id: 6,
    name: "Client 6",
    url: image6,
  },
  {
    id: 7,
    name: "Client 7",
    url: image7,
  },
  {
    id: 8,
    name: "Client 8",
    url: image8,
  },
  {
    id: 9,
    name: "Client 9",
    url: image9,
  },
  {
    id: 10,
    name: "Client 10",
    url: image10,
  },
];

export const ClientTicker = () => {
  // We double the array to create a seamless infinite loop
  // Duplicate logos for seamless infinite scroll
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
      <section className="relative py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex"
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
                className="flex-shrink-0 flex items-center justify-center px-10 lg:px-16"
              >
                <img
                  loading="lazy"
                  src={logo.url}
                  alt={logo.name}
                  className="h-12 lg:h-20 w-auto object-contain grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Added Gradient Masks for that "Fade-in/out" Premium Effect */}
      <div className="absolute inset-y-0 left-0 w-20 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
};
