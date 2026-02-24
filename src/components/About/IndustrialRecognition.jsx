import React from "react";
import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Trophy } from "lucide-react";

const awards = [
  {
    year: "2018",
    title: "Best Security Company of the Year",
    org: "CAPSI",
    desc: "Earned a large number of Honours and accolades, including the prestigious Security Company of the Year 2018.",
    icon: <Trophy className="text-primary" size={24} />,
  },
  {
    year: "2019",
    title: "Security Personality of the Year",
    org: "CAPSI / India Achiever’s",
    desc: "Mr. Anil Puri (CMD) was declared Security Personality of the Year and received the Business Leadership Award 2020.",
    icon: <Star className="text-primary" size={24} />,
  },
  {
    year: "2020",
    title: "Best Security Company Pan India",
    org: "JLL",
    desc: "Recognized by global real estate leader JLL as the best security partner amongst all national competitors.",
    icon: <ShieldCheck className="text-primary" size={24} />,
  },
  {
    year: "2025",
    title: "Best Security Company",
    org: "Max Life Insurance",
    desc: "Featured on Business Connect Magazine as a prime example of Best Company Culture to inspire business communities.",
    icon: <Award className="text-primary" size={24} />,
  },
];

export const IndustrialRecognition = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 overflow-hidden relative font-sans">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Super Premium */}
        <div className="mb-16 lg:mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
              Legacy of Excellence
            </span>
            <span className="h-[1px] w-12 bg-primary"></span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
            INDUSTRIAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-400">
              RECOGNITION.
            </span>
          </h2>
        </div>

        {/* Awards Grid - Creative Bento-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between min-h-[380px] hover:bg-white/10 transition-all duration-500"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    {award.icon}
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">
                    {award.year}
                  </span>
                </div>

                <h4 className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                  {award.org}
                </h4>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">
                  {award.title}
                </h3>
              </div>

              <p className="relative z-10 text-slate-400 text-xs lg:text-sm leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                {award.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Business Connect Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-12 p-8 lg:p-10 rounded-[40px] bg-gradient-to-r from-primary to-[#ff8e94] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20"
        >
          <div className="text-center lg:text-left">
            <h4 className="text-white font-black italic text-2xl lg:text-3xl tracking-tight">
              "AN EXAMPLE TO INSPIRE BUSINESS COMMUNITIES"
            </h4>
            <p className="text-white/80 text-sm mt-2 uppercase tracking-widest font-bold">
              Featured on the Cover of Business Connect Magazine
            </p>
          </div>
          <div className="shrink-0 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/30 text-white font-black uppercase text-xs tracking-widest">
            August 2021 Edition
          </div>
        </motion.div>
      </div>
    </section>
  );
};
