import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";

const API = "http://localhost:5000/api/services";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const ServiceDetailPage = () => {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API}`);
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
              src={"image1"}
              alt="Security Guard"
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
                Uncompromising Protection
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-black text-white uppercase leading-[1.1] tracking-tighter mb-6"
              >
                Elite Man <br />
                <span className="text-primary italic">Guarding</span> <br />
                Services
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-slate-300 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl"
              >
                Setting the gold standard in physical security. Our highly-trained
                personnel provide comprehensive solutions for corporate,
                industrial, and high-profile environments.
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
      {/* INTRO SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <motion.h2 variants={fadeUp} className="text-4xl font-black mb-6">
              {service.subtitle}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 leading-relaxed"
            >
              {service.intro}
            </motion.p>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            <img
              src={service.image1}
              alt=""
              className="rounded-xl object-cover h-[250px] w-full"
            />

            <img
              src={service.image2}
              alt=""
              className="rounded-xl object-cover h-[250px] w-full"
            />
          </div>
        </div>
      </section>

      {/* SECTORS */}
      {service.sectors?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-16">
              Sectors We Protect
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {service.sectors.map((sector, i) => (
                <div
                  key={i}
                  className="bg-white p-8 text-center border rounded-xl shadow-sm"
                >
                  <p className="font-bold uppercase text-sm">{sector.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECIALIZED UNITS */}
      {service.specializedUnits?.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-16">Specialized Units</h2>

          <div className="grid md:grid-cols-4 gap-10">
            {service.specializedUnits.map((unit, i) => (
              <div key={i} className="border-l-4 border-primary pl-6">
                <h3 className="font-black mb-2">{unit.title}</h3>
                <p className="text-sm text-slate-600">{unit.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-16">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6"
                  >
                    <span className="font-bold text-sm uppercase">{faq.q}</span>

                    <ChevronDown
                      className={`transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-6 pt-0 text-slate-600">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-24 text-center text-white">
        <h2 className="text-5xl font-black mb-6">Secure Your Assets Today</h2>

        <p className="mb-10 max-w-xl mx-auto">
          Get a professional risk assessment and security consultation.
        </p>

        <button className="bg-slate-950 px-10 py-5 uppercase font-bold text-xs">
          Request Quote
        </button>
      </section>
    </main>
  );
};
