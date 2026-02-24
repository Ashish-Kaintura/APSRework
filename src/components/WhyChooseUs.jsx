import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Cpu, Zap, BarChart3, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Improved Counter Logic (Restarts on every visit)
      const counters = gsap.utils.toArray(".stat-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.5,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 95%",
              // toggleActions: "restart none none none" makes it restart every time it enters
              toggleActions: "restart none none none",
            },
          },
        );
      });

      // 2. Bento Grid Entrance (Refined stagger and speed)
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const facts = [
    {
      label: "Experience",
      value: "39",
      sub: "Since 1986",
      icon: <ShieldCheck className="text-primary" size={20} />,
    },
    {
      label: "Professionals",
      value: "42000",
      sub: "42k+ Employees",
      icon: <Zap className="text-primary" size={20} />,
    },
    {
      label: "States Presence",
      value: "27",
      sub: "Across India",
      icon: <BarChart3 className="text-primary" size={20} />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section - More Compact */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                Why Choose APS Group
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Unparalleled Expertise in <br />
              <span className="text-slate-400">Security & Surveillance.</span>
            </h2>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-primary/20">
            CONTACT US <ArrowRight size={16} />
          </button>
        </div>

        {/* Main Bento Grid - Smaller Gap and Padding */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Tech Enabled Card - Reduced min-h and padding */}
          <div className="bento-item md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="text-primary" size={22} />
              </div>
              <h4 className="text-2xl font-bold mb-2">
                Tech-Enabled <br /> Integrated Solutions
              </h4>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Real-time monitoring and insights powered by our proprietary
                intelligent operations center.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Stats Loop - Optimized for "Compact Premium" */}
          {facts.map((fact, i) => (
            <div
              key={i}
              className="bento-item bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
                {fact.icon}
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="stat-number text-3xl font-black text-slate-900"
                    data-target={fact.value}
                  >
                    0
                  </span>
                  <span className="text-primary text-xl font-black">+</span>
                </div>
                <p className="font-bold text-slate-900 mt-1 uppercase tracking-wider text-[10px]">
                  {fact.label}
                </p>
                <p className="text-slate-400 text-[11px]">{fact.sub}</p>
              </div>
            </div>
          ))}

          {/* AI Feature - Streamlined */}
          <div className="bento-item md:col-span-2 bg-primary rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-xl font-black italic tracking-tight">
                AI-POWERED THREAT DETECTION
              </h4>
              <p className="text-white/80 text-sm font-medium">
                Leading security in the banking sector with 24/7 intelligent
                operations.
              </p>
            </div>
            <div className="flex-shrink-0 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <ShieldCheck size={32} />
            </div>
          </div>

          {/* Quality Commitment Card - Clean Minimalist */}
          <div className="bento-item md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-center">
            <h4 className="text-lg font-bold text-slate-900 mb-3 italic leading-snug">
              "No compromise with quality & value of services delivery"
            </h4>
            <div className="h-[1.5px] w-full bg-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-primary w-1/3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
