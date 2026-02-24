import React from "react";
import { ArrowRight } from "lucide-react";

export const AboutCTA = () => {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
          BE PART OF THE <span className="italic">OBSESSION.</span>
        </h2>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 mx-auto hover:bg-white hover:text-black transition-all">
          VIEW OUR SERVICES <ArrowRight />
        </button>
      </div>
    </section>
  );
};
