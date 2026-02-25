import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  ArrowRight,
  Send,
} from "lucide-react";

export const ContactPage = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Header Reveal
      tl.from(".contact-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      })
        // 2. Bento Grid Reveal
        .from(
          ".bento-box",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] font-sans py-24 lg:py-32 overflow-hidden z-0"
    >
      {/* --- Animated Background Elements --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-800/20 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* --- Section Header --- */}
        <div className="mb-16 lg:mb-24 text-center lg:text-left">
          <div className="contact-header flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">
              Initiate a Conversation
            </span>
          </div>
          <h1 className="contact-header text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
            SECURE YOUR <br />
            <span className="text-white/30 italic">FUTURE WITH US.</span>
          </h1>
        </div>

        {/* --- Asymmetrical Bento Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Contact Info & Scale (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* HQ Address Box */}
            <div className="bento-box bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 lg:p-10 hover:bg-white/10 transition-colors duration-500">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-8">
                <Building2 size={24} />
              </div>
              <h3 className="text-white font-black uppercase text-2xl mb-2 tracking-tight">
                Headquarters
              </h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                C1/118, Janakpuri,
                <br />
                New Delhi - 110058
              </p>

              <div className="space-y-4">
                <a
                  href="tel:011-49960000"
                  className="flex items-center gap-4 text-white hover:text-primary transition-colors group"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <span className="font-bold tracking-wider">011-49960000</span>
                </a>
                <a
                  href="mailto:info@apsecuritas.com"
                  className="flex items-center gap-4 text-white hover:text-primary transition-colors group"
                >
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="font-bold tracking-wider">
                    info@apsecuritas.com
                  </span>
                </a>
              </div>
            </div>

            {/* Pan India Presence Box (Brand Color) */}
            <div className="bento-box bg-primary rounded-[32px] p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              {/* Abstract Map Graphic */}
              <Globe
                size={180}
                className="absolute -bottom-10 -right-10 text-white opacity-10"
                strokeWidth={1}
              />

              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 relative z-10">
                PAN INDIA <br />
                PRESENCE
              </h3>
              <ul className="space-y-4 relative z-10 text-sm font-bold">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0" />
                  <span>133+ Branches All Over India</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0" />
                  <span>Active in 27 States & UTs</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0" />
                  <span>Strong presence in Tier 1, 2 & 3 Cities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Premium Contact Form (Spans 7 cols) */}
          <div className="lg:col-span-7 bento-box bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 lg:p-14 flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
                Request a Consultation
              </h3>
              <p className="text-slate-400 text-sm font-medium">
                Provide your operational requirements and our executive team
                will contact you directly from our New Delhi HQ.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Group */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b-2 border-white/20 text-white py-3 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-3 text-slate-500 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/50 cursor-text"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    id="company"
                    className="w-full bg-transparent border-b-2 border-white/20 text-white py-3 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="company"
                    className="absolute left-0 top-3 text-slate-500 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/50 cursor-text"
                  >
                    Company Name
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b-2 border-white/20 text-white py-3 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-slate-500 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/50 cursor-text"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-transparent border-b-2 border-white/20 text-white py-3 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-3 text-slate-500 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/50 cursor-text"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea
                  id="message"
                  rows="3"
                  className="w-full bg-transparent border-b-2 border-white/20 text-white py-3 focus:outline-none focus:border-primary transition-colors peer resize-none"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-6 text-slate-500 font-bold uppercase tracking-widest text-xs transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-white/50 cursor-text"
                >
                  Service Requirements
                </label>
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors"
                  type="button"
                >
                  Send Message <Send size={16} />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
