import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  /* ================= LOGIN STATE ================= */
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /* ================= REGISTER STATE ================= */
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    companyname: "",
    requirements: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= GSAP ANIMATION ================= */
  useGSAP(
    () => {
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

  /* ================= INPUT HANDLERS ================= */
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  /* ================= LOGIN SUBMIT ================= */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER SUBMIT ================= */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful. Please login.");
      setIsLogin(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORM ANIMATION ================= */
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-slate-50 p-6"
    >
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-5/12 bg-slate-950 p-12 text-white flex flex-col justify-between">
          <div className="auth-brand-reveal">
            <h1 className="text-4xl font-black">APS GROUP</h1>
            <p className="text-primary text-xs uppercase tracking-widest mt-2">
              Client Portal
            </p>
          </div>

          <div className="auth-brand-reveal">
            <h2 className="text-3xl font-bold mt-10">
              Secure Your Operations.
            </h2>
            <p className="text-slate-400 mt-4 text-sm">
              Monitor deployments, logs and manage your services securely.
            </p>
          </div>

          <div className="auth-brand-reveal text-xs flex items-center gap-2">
            <Lock size={14} /> 256-bit Encryption
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-7/12 p-12 flex flex-col justify-center auth-form-reveal">
          <div className="max-w-md mx-auto w-full">
            <AnimatePresence mode="wait">
              {/* ================= LOGIN ================= */}
              {isLogin ? (
                <motion.form
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleLoginSubmit}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-black">Welcome Back</h2>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>

                  <p className="text-sm text-center">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setIsLogin(false);
                      }}
                      className="text-primary font-bold"
                    >
                      Register
                    </button>
                  </p>
                </motion.form>
              ) : (
                /* ================= REGISTER ================= */
                <motion.form
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleRegisterSubmit}
                  className="space-y-5"
                >
                  <h2 className="text-3xl font-black">Request Access</h2>

                  {/* Full Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  {/* Company */}
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Company Name"
                    value={registerData.companyname}
                    onChange={handleRegisterChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                  />

                  {/* Requirement */}
                  <textarea
                    name="requirements"
                    placeholder="Tell us about your requirement..."
                    value={registerData.requirements}
                    onChange={handleRegisterChange}
                    rows="3"
                    className="w-full border-b-2 py-3 focus:outline-none resize-none"
                  />
                  {/* Password */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="w-full border-b-2 py-3 focus:outline-none"
                    required
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold transition hover:bg-primary"
                  >
                    {loading ? "Submitting..." : "Submit Request"}
                  </button>

                  <p className="text-sm text-center">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setIsLogin(true);
                      }}
                      className="text-primary font-bold"
                    >
                      Sign In
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
