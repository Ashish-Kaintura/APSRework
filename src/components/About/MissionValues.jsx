import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Shield } from "lucide-react";

const values = [
  {
    title: "Mission",
    desc: "Solving India's most complex integrated service challenges through intelligent operations.",
    icon: <Target className="text-primary" />,
  },
  {
    title: "Commitment",
    desc: "Zero compromise with quality and value in every service delivery, guaranteed.",
    icon: <Shield className="text-primary" />,
  },
  {
    title: "Philosophy",
    desc: "Viewing our service as an obsession, fueled by the power of dreams.",
    icon: <Heart className="text-primary" />,
  },
];

export const MissionValues = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
              {v.icon}
            </div>
            <h4 className="text-xl font-black mb-4 text-slate-900 uppercase tracking-widest">
              {v.title}
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
