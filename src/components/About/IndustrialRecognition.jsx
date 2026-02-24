import React from "react";
import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Trophy, ChevronRight } from "lucide-react";
import image1 from "../../images/About/Picture1.png";
import image2 from "../../images/About/Picture2 (1).png";
import image3 from "../../images/About/Picture3.png";
import image4 from "../../images/About/Picture4.jpg";
const primaryAwards = [
  {
    year: "2018",
    title: "Best Security Company of the Year",
    org: "CAPSI",
    desc: "The company has earned a large number of Honours, awards, and accolades including this prestigious title.",
    image: image1,
  },
  {
    year: "2019",
    title: "Security Personality of the Year",
    org: "Mr. Anil Puri (CMD)",
    desc: "Declared Security Personality of the Year by CAPSI and received the India Achiever’s Award for Business Leadership in 2020.",
    image: image2,
  },
  {
    year: "2019-20",
    title: "Best Security Company Pan India",
    org: "JLL",
    desc: "Various clients have recognized us as the top security partner amongst all regional and national competitors.",
    image: image3,
  },
];

export const IndustrialRecognition = () => {
  return (
    <section className="py-16 lg:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 border-l-4 border-primary pl-6">
          <span className="text-primary font-black uppercase tracking-widest text-xs">
            Industry Leadership
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2">
            INDUSTRIAL{" "}
            <span className="text-primary">RECOGNITION.</span>
          </h2>
        </div>

        {/* 1. Static Grid: Core Accolades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {primaryAwards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-2xl shadow-lg border border-slate-100">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-primary">
                  {award.year}
                </div>
              </div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">
                {award.org}
              </h4>
              <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-primary transition-colors">
                {award.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed text-justify">
                {award.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 2. Featured Recognition: Magazine Spotlight (Compact Carousel Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-slate-900 rounded-[32px] p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center gap-10 shadow-2xl"
        >
          <div className="w-full lg:w-1/3">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white/5">
              <img
                src={image4}
                alt="Business Connect Magazine"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-primary" />
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
                Featured Coverage 2025
              </span>
            </div>
            <h3 className="text-2xl lg:text-4xl font-black italic tracking-tight">
              "An Example to Inspire <br /> Business Communities"
            </h3>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
              APS Group figured on the cover page of the{" "}
              <strong>Business Connect Magazine (August 21)</strong> as the Best
              Company Culture Example. Recently honored as the Best Security
              Company 2025 by Max Life Insurance.
            </p>
            <button className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:text-white transition-colors">
              Read Full Feature <ChevronRight size={16} />
            </button>
          </div>

          {/* Subtle Background Mark */}
          <div className="absolute -bottom-10 -right-10 text-[10vw] font-black text-white/[0.03] select-none uppercase">
            Legacy
          </div>
        </motion.div>
      </div>
    </section>
  );
};
