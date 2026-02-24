import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "Expert Training",
    desc: "Certified training at our specialized Academy for gold-standard service.",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Pan-India Reach",
    desc: "Opportunities across 27 States and Union Territories.",
    icon: <Briefcase size={20} />,
  },
  {
    title: "Career Growth",
    desc: "Clear pathways for advancement within India's leading integrated service provider.",
    icon: <TrendingUp size={20} />,
  },
];

export const CareersSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left: Content Area */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-8 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                  Work With Us
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
                Build Your Future <br />
                <span className="text-slate-400">With APS Group.</span>
              </h2>
            </div>

            <p className="text-slate-600 text-sm lg:text-base leading-relaxed max-w-lg">
              We believe in the "Power of Dreams". Join our massive workforce of
              42,000+ professionals and be part of an obsession to solve complex
              service challenges across India.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 bg-slate-50 text-primary rounded-lg shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {benefit.title}
                    </h4>
                    <p className="text-slate-500 text-[11px] lg:text-xs mt-1">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Compact CTA Box */}
          <div className="w-full lg:w-1/2">
            <div className="bg-slate-900 rounded-[32px] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 relative z-10 italic">
                Ready to start your <br /> journey with us?
              </h3>
              <p className="text-slate-400 text-sm mb-8 relative z-10">
                We are looking for dedicated individuals to maintain our "No
                compromise with quality" standard.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 relative z-10 transition-colors"
              >
                EXPLORE OPENINGS <ArrowRight size={20} />
              </motion.button>

              {/* Decorative background circle */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-[60px] rounded-full z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
