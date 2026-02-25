import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Building2,
  Landmark,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { ServiceGrid } from "../components/services/ServiceGrid";
import { AboutCTA } from "../components/About/AboutCTA";
import { ServiceHero } from "../components/services/ServiceHero";
const services = [
  {
    id: "manned-guarding",
    title: "Manned Guarding",
    tagline: "Uncompromising Physical Security",
    desc: "Deploying our elite force of rigorously trained professionals to protect your critical assets, personnel, and infrastructure with zero margin for error.",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2000&auto=format&fit=crop",
    icon: <Shield size={32} />,
  },
  {
    id: "facility-management",
    title: "Facility Management",
    tagline: "Intelligent Infrastructure Care",
    desc: "Comprehensive housekeeping, technical maintenance, and operational management to ensure your business environments operate at peak efficiency.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    icon: <Building2 size={32} />,
  },
  {
    id: "banking-security",
    title: "Banking Logistics",
    tagline: "Securing Financial Assets",
    desc: "Pioneers in cash transit and banking security since 1987. We provide impenetrable logistics for high-value assets and financial institutions.",
    image:
      "https://images.unsplash.com/photo-1616803140344-6682afb13cda?q=80&w=2000&auto=format&fit=crop",
    icon: <Landmark size={32} />,
  },
  {
    id: "homeland-security",
    title: "Homeland Security",
    tagline: "Advanced Threat Mitigation",
    desc: "Leveraging cutting-edge technology and tactical expertise to provide high-tier surveillance, command center operations, and elite protection.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=2000&auto=format&fit=crop",
    icon: <ShieldAlert size={32} />,
  },
];
export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  return (
    <>
      <ServiceHero />
      <ServiceGrid />
      <section className="relative h-screen min-h-[800px] bg-slate-950 text-white overflow-hidden font-sans flex flex-col justify-center">
        {/* --- Safely Wrapped Animated Background --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <img
              src={activeService.image}
              alt={activeService.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40 z-0" />

        {/* Main Content */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Side: Navigation List */}
          <div className="w-full lg:w-1/2 space-y-2">
            <div className="mb-10 lg:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">
                  Our Expertise
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter">
                Integrated <br />{" "}
                <span className="text-primary">Solutions.</span>
              </h2>
            </div>

            <div className="flex flex-col w-full border-t border-white/10">
              {services.map((service) => {
                const isActive = activeService.id === service.id;

                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveService(service)}
                    className="group border-b border-white/10 py-5 sm:py-6 cursor-pointer flex items-center justify-between"
                  >
                    <h3
                      className={`text-xl sm:text-2xl lg:text-4xl font-black uppercase tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-primary translate-x-4"
                          : "text-white/50 group-hover:text-white group-hover:translate-x-2"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <div
                      className={`text-primary transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                    >
                      <ArrowUpRight size={28} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Active Content Display Case */}
          <div className="w-full lg:w-1/2 min-h-[350px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-[32px] sm:rounded-[40px] shadow-2xl"
              >
                <div className="text-primary mb-6">{activeService.icon}</div>
                <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
                  {activeService.tagline}
                </h4>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase mb-4 sm:mb-6">
                  {activeService.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-8">
                  {activeService.desc}
                </p>

                <button className="flex items-center gap-3 text-white font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:text-primary transition-colors">
                  Explore Capabilities <ArrowUpRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AboutCTA />
    </>
  );
}
