import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Cinematic entrance on page load
      gsap.from(".auth-brand-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".auth-form-reveal", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "circOut",
        delay: 0.5,
      });
    },
    { scope: containerRef },
  );

  // Framer Motion variants for the form swap
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4 sm:p-6 lg:p-28"
    >
      {/* Main Auth Container */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        {/* =========================================
                    LEFT SIDE: Brand Showcase (Dark Mode)
                ========================================= */}
        <div className="w-full lg:w-5/12 relative bg-slate-950 p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
          {/* Background Image with Dark Gradient */}
          <img
            src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=1000&auto=format&fit=crop"
            alt="APS Command Center"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950 z-0" />

          {/* Top Branding */}
          <div className="relative z-10 auth-brand-reveal">
            <div className="text-2xl font-black tracking-tighter text-white mb-2">
              APS <span className="text-primary">GROUP</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Client Portal
            </div>
          </div>

          {/* Center Typography */}
          <div className="relative z-10 auth-brand-reveal my-16 lg:my-0">
            <h1 className="text-4xl lg:text-5xl font-black text-white uppercase leading-[1.1] tracking-tighter mb-6">
              Secure Your <br />
              <span className="text-primary italic">Operations.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Access your dedicated command center dashboard. Monitor
              deployments, review real-time logs, and manage your integrated
              services seamlessly.
            </p>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 auth-brand-reveal flex items-center gap-4 text-white/40 text-[10px] uppercase font-bold tracking-widest">
            <Lock size={14} /> End-to-End 256-bit Encryption
          </div>
        </div>

        {/* =========================================
                    RIGHT SIDE: Dynamic Form Area
                ========================================= */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-20 flex flex-col justify-center bg-white auth-form-reveal relative">
          <div className="max-w-md w-full mx-auto relative h-[500px]">
            <AnimatePresence mode="wait">
              {/* --- LOGIN FORM --- */}
              {isLogin ? (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Enter your credentials to access your dashboard.
                    </p>
                  </div>

                  <form className="space-y-6 flex-grow">
                    <div className="relative group">
                      <input
                        type="email"
                        id="login-email"
                        className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-3 focus:outline-none focus:border-primary transition-colors peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="login-email"
                        className="absolute left-0 top-3 text-slate-400 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="password"
                        id="login-password"
                        className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-3 focus:outline-none focus:border-primary transition-colors peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="login-password"
                        className="absolute left-0 top-3 text-slate-400 font-bold uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                      >
                        Password
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <span className="text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                          Remember device
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-xs font-bold text-primary hover:text-slate-900 transition-colors"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="button"
                      className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-900 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 mt-8"
                    >
                      Sign In to Portal <ArrowRight size={16} />
                    </button>
                  </form>

                  <div className="pt-8 text-center border-t border-slate-100 mt-auto">
                    <p className="text-slate-500 text-sm">
                      Don't have an enterprise account?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-primary font-bold hover:underline transition-all"
                      >
                        Request Access
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* --- REGISTER FORM --- */
                <motion.div
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                      Request Access
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Create an account to manage your security services.
                    </p>
                  </div>

                  <form className="space-y-6 flex-grow">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative group">
                        <input
                          type="text"
                          id="reg-name"
                          className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="reg-name"
                          className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                        >
                          Full Name
                        </label>
                      </div>
                      <div className="relative group">
                        <input
                          type="text"
                          id="reg-company"
                          className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="reg-company"
                          className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                        >
                          Company Name
                        </label>
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        id="reg-email"
                        className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="reg-email"
                        className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                      >
                        Corporate Email
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="password"
                        id="reg-password"
                        className="w-full bg-transparent border-b-2 border-slate-200 text-slate-900 py-2 focus:outline-none focus:border-primary transition-colors peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="reg-password"
                        className="absolute left-0 top-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-slate-400 cursor-text"
                      >
                        Create Password
                      </label>
                    </div>

                    <button
                      type="button"
                      className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 mt-6"
                    >
                      Submit Request <Mail size={16} />
                    </button>
                  </form>

                  <div className="pt-8 text-center border-t border-slate-100 mt-auto">
                    <p className="text-slate-500 text-sm">
                      Already registered?{" "}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-primary font-bold hover:underline transition-all"
                      >
                        Sign In Here
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthPage;