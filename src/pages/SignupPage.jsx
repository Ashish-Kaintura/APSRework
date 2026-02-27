import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, ArrowRight, MapPin, Building, Globe } from "lucide-react";

const SignupPage = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Left Panel Entrance
      tl.from(".signup-brand-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      })
        // Right Panel Form Entrance
        .from(
          ".signup-form-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4 sm:p-6 lg:p-28"
    >
      {/* Main Signup Container */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row-reverse min-h-[750px]">
        {/* =========================================
                    RIGHT SIDE (Visuals): Brand & Trust (Flipped for contrast)
                ========================================= */}
        <div className="w-full lg:w-5/12 relative bg-primary p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
          {/* Abstract Globe/Network Background */}
          <Globe
            size={400}
            className="absolute -bottom-20 -right-20 text-white opacity-10"
            strokeWidth={0.5}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-0" />

          {/* Top Branding */}
          <div className="relative z-10 signup-brand-reveal">
            <div className="text-2xl font-black tracking-tighter text-white mb-2">
              APS <span className="text-slate-900">GROUP</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Partner Onboarding
            </div>
          </div>

          {/* Center Typography */}
          <div className="relative z-10 signup-brand-reveal my-16 lg:my-0">
            <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-[1.1] tracking-tighter mb-6">
              Join The <br />
              <span className="text-slate-900 italic">Elite Standard.</span>
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-medium">
              Register your organization to access India's most advanced
              integrated security and facility management infrastructure.
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 signup-brand-reveal flex flex-col gap-4">
            <div className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-widest">
              <MapPin size={16} className="text-slate-900" /> Pan-India Coverage
            </div>
            <div className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-widest">
              <Building size={16} className="text-slate-900" /> 27 States & UTs
            </div>
          </div>
        </div>

        {/* =========================================
                    LEFT SIDE (Form): Registration Details
                ========================================= */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-20 flex flex-col justify-center bg-white relative">
          <div className="max-w-lg w-full mx-auto">
            <div className="mb-10 signup-form-item">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                Create Account
              </h2>
              <p className="text-slate-500 text-sm">
                Provide your details to establish your enterprise profile.
              </p>
            </div>

            <form className="space-y-8">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 signup-form-item">
                <div className="relative group">
                  <input
                    type="text"
                    id="signup-name"
                    className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="signup-name"
                    className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="signup-phone"
                    className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="signup-phone"
                    className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="relative group signup-form-item">
                <input
                  type="email"
                  id="signup-email"
                  className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="signup-email"
                  className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                >
                  Corporate Email Address
                </label>
              </div>

              {/* Row 3: Address (Textarea for formatting) */}
              <div className="relative group signup-form-item pt-2">
                <textarea
                  id="signup-address"
                  rows="3"
                  className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer resize-none"
                  placeholder=" "
                />
                <label
                  htmlFor="signup-address"
                  className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-5 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                >
                  Complete Address
                </label>
              </div>

              {/* Terms Checkbox */}
              <div className="signup-form-item pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                    I agree to the APS Group{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="signup-form-item pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  Complete Registration <ArrowRight size={16} />
                </motion.button>
              </div>
            </form>

            <div className="pt-8 text-center border-t border-slate-100 mt-8 signup-form-item">
              <p className="text-slate-500 text-sm">
                Already registered?{" "}
                <a
                  href="/login"
                  className="text-primary font-bold hover:underline transition-all"
                >
                  Sign in to your portal
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupPage;
