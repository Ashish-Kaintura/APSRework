import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Globe, Building2, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const NationalPresence = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Animation for the Stat Cards
      gsap.from(".presence-stat", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-slate-50 overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Premium Compact */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] w-8 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                Nationwide Operations
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
              PAN-INDIA <span className="text-slate-400">FOOTPRINT.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs md:text-right border-r-2 border-primary pr-4">
            Delivering gold-standard integrated services with a workforce of
            42,000+ professionals across the nation.
          </p>
        </div>

        {/* Presence Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Main Map Card */}
          <div className="presence-stat lg:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="text-primary" size={22} />
              </div>
              <h4 className="text-2xl font-bold mb-2 uppercase tracking-tighter">
                Command Center Reach
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                Our integrated infrastructure allows for real-time monitoring
                and 24/7 intelligent operations in 27 states.
              </p>
            </div>
            {/* Decorative background element representing India's shape or data flow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary opacity-10 blur-[80px] rounded-full" />
          </div>

          {/* Stats Card 1 */}
          <div className="presence-stat bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-primary transition-colors duration-500 shadow-sm">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
              <MapPin className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900">27</h3>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">
                States / UTs Covered
              </p>
            </div>
          </div>

          {/* Stats Card 2 */}
          <div className="presence-stat bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-primary transition-colors duration-500 shadow-sm">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900">42K+</h3>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">
                Certified Professionals
              </p>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 p-6 bg-slate-900/5 rounded-2xl border-l-4 border-primary">
          <div className="flex items-center gap-4">
            <Building2 size={24} className="text-primary shrink-0" />
            <p className="text-slate-600 text-[11px] lg:text-xs font-medium leading-relaxed uppercase tracking-wider">
              Since its humble beginning in 1986, APS Group has evolved into a
              leader in the banking, industrial, and corporate sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
