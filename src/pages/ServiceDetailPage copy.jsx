import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
const API = "http://localhost:5000/api/services";
const IMAGE_BASE_URL = "http://localhost:5000/";
export const ServiceDetailPage = () => {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API}/slug/${slug}`);

        console.log("services:", data);
        console.log("Slug from URL:", slug);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-20 text-center text-xl font-bold">
        Loading Service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-20 text-center text-red-500 text-xl font-bold">
        Service Not Found
      </div>
    );
  }

  return (
    <main className="bg-white font-sans overflow-hidden pt-16">
      {/* HERO SECTION */}

      <section className="relative h-[85vh] bg-slate-950 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            src={`${IMAGE_BASE_URL}${service?.banner?.bannerImage}`}
            alt={service?.banner?.bannerTitle}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-slate-950/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-6"
            >
              {service?.banner?.bannerKeyword}
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black uppercase leading-[1.1] tracking-tighter mb-6"
            >
              {(() => {
                const words = service?.banner?.bannerTitle?.split(" ") || [];
                const mid = Math.floor(words.length / 2);

                const firstLine = words.slice(0, mid).join(" ");
                const middleWord = words[mid];
                const lastLine = words.slice(mid + 1).join(" ");

                return (
                  <>
                    <span className="block text-white">{firstLine}</span>

                    <span className="block text-primary italic">
                      {middleWord}
                    </span>

                    <span className="block text-white">{lastLine}</span>
                  </>
                );
              })()}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-slate-300 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl"
            >
              {service?.banner?.shortDescription}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-colors">
                Request Free Site Assessment
              </button>
              <button className="border border-white/30 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Call Now 24/7
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* 2. THE HUMAN ELEMENT (Intro) */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Text Content (Remains mostly same) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }} // Added slight margin for better triggers
            variants={staggerContainer}
            className="w-full lg:w-1/2"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter mb-6"
            >
              {(() => {
                const words = service?.shortSummary?.title?.split(" ") || [];
                const half = Math.ceil(words.length / 2);

                const firstHalf = words.slice(0, half).join(" ");
                const secondHalf = words.slice(half).join(" ");

                return (
                  <>
                    <span className="text-slate-900">{firstHalf} </span>
                    <span className="text-primary italic">{secondHalf}</span>
                  </>
                );
              })()}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-600 leading-relaxed mb-4"
            >
              {service?.shortSummary?.paragraph1}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-slate-600 leading-relaxed"
            >
              {service?.shortSummary?.paragraph2}
            </motion.p>
          </motion.div>

          {/* --- NEW, PREMIUM IMAGE LAYOUT DESIGN --- */}
          <div className="w-full lg:w-1/2 relative h-[450px] lg:h-[550px] flex items-center justify-center">
            {/* 1. Primary Focus Image (Human Guard) */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              whileHover={{ scale: 1.02, zIndex: 30 }} // Lifts on hover for premium interaction
              className="relative z-20 w-[60%] h-[70%] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 border-4 border-white cursor-pointer"
            >
              <img
                loading="lazy"
                src={`${IMAGE_BASE_URL}${service?.shortSummary?.image1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                alt="Rigorous Trained Security Guard"
              />
              {/* Subliminal Brand Accent */}
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-full" />
            </motion.div>

            {/* 2. Secondary Context Image (Command Center) - Now Cleanly Structured */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "circOut", delay: 0.6 }} // delayed entrance
              className="absolute top-0 left-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 group bg-white"
            >
              <img
                loading="lazy"
                src={`${IMAGE_BASE_URL}${service?.shortSummary?.image2}`} // Assuming image2 is command center
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt="State-of-the-Art Command Center Operations"
              />
              {/* Subtle glass effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* 3. Decorative Architectural Element for Depth */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-primary rounded-br-3xl opacity-30 z-0"
            />
          </div>
        </div>
      </section>
      {/* 3. SECTORS WE PROTECT */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
              {(() => {
                const words = service?.servicesSection?.title?.split(" ") || [];
                const half = Math.ceil(words.length / 3);

                const firstHalf = words.slice(0, half).join(" ");
                const secondHalf = words.slice(half).join(" ");

                return (
                  <>
                    <span className="text-slate-900">{firstHalf} </span>
                    <span className="text-primary italic">{secondHalf}</span>
                  </>
                );
              })()}
            </h2>
            <p className="text-slate-500 max-w-7xl mx-auto">
              {service.servicesSection.shortSummary}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {" "}
            {service.servicesSection.services.map((item, idx) => {
              const IconComponent =
                FaIcons[item.icon] ||
                SiIcons[item.icon] ||
                GiIcons[item.icon] ||
                MdIcons[item.icon];
              return (
                <motion.div
                  variants={fadeUp}
                  className="bg-white py-10 px-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {IconComponent && <IconComponent size={30} />}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-700">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* 4. SPECIALIZED UNITS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            {service?.specialServicesSection?.title
              ?.split(" ")
              .slice(0, 2)
              .join(" ")}
            <span className="bg-white text-primary px-2 py-1 italic inline-block mt-2 ">
              {service?.specialServicesSection?.title
                ?.split(" ")
                .slice(2, 4)
                .join(" ")}
            </span>
            <span className="bg-white px-2 py-1 italic inline-block mt-2 ">
              {service?.specialServicesSection?.title
                ?.split(" ")
                .slice(4)
                .join(" ")}
            </span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {service.specialServicesSection.services.map((item, idx) => {
            const IconComponent =
              FaIcons[item.icon] ||
              SiIcons[item.icon] ||
              GiIcons[item.icon] ||
              MdIcons[item.icon];
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="pl-6 border-l-4 border-primary"
              >
                {IconComponent && (
                  <IconComponent className="text-red-600" size={40} />
                )}
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
      {/* 5. WHY CHOOSE US */}
      <section className="py-20 lg:py-32 bg-slate-950 text-white">
        {service?.whyUsSection?.points?.length > 0 && (
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                {(() => {
                  const title = service?.whyUsSection?.title || "";
                  const words = title.split(" ");
                  const half = Math.ceil(words.length / 2);

                  const firstHalf = words.slice(0, half).join(" ");
                  const secondHalf = words.slice(half).join(" ");

                  return (
                    <>
                      <span className="text-slate-100">{firstHalf} </span>
                      <span className="text-primary italic">{secondHalf}</span>
                    </>
                  );
                })()}
              </h2>

              <p className="text-slate-200">{service?.whyUsSection?.summary}</p>
            </div>

            {/* Points */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {service?.whyUsSection?.points?.map((item, idx) => (
                <motion.div
                  key={item?.id || idx}
                  variants={fadeUp}
                  className="flex gap-6"
                >
                  {/* Optional Number/Icon */}
                  <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black text-lg px-3">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                      {item?.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item?.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      {service?.faqSection?.faqs?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
                {service?.faqSection?.title?.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-primary italic">
                  {service?.faqSection?.title?.split(" ").slice(2).join(" ")}
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {service?.faqSection?.faqs?.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm uppercase tracking-widest text-slate-700">
                      {faq?.question}
                    </span>

                    <ChevronDown
                      className={`text-primary transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-6 pt-0 text-slate-500 text-sm leading-relaxed">
                          {faq?.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service?.ctaSection?.title && (
        <section className="bg-primary py-24 px-6 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            {service?.ctaSection?.title?.split(" ").slice(0, 3).join(" ")}{" "}
            <br />
            <span className="bg-white text-primary px-4 py-1 italic inline-block mt-2">
              {service?.ctaSection?.title?.split(" ").slice(3).join(" ")}
            </span>
          </h2>

          <p className="text-white/90 font-medium mb-10 max-w-xl">
            {service?.ctaSection?.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-slate-950 text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-colors">
              Request Quote Now
            </button>

            <button className="bg-white text-slate-900 px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Phone size={16} className="text-primary" /> Call Now
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
