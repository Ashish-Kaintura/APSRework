import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import { Footer } from "./components/Footer";

const PremiumLandingPage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));

/* ==============================
   ✅ This component CAN use useLocation
============================== */
function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(location.pathname === "/");

  /* ===== Home Loader Only ===== */
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsLoading(false);
      return;
    }

    const start = Date.now();
    window.scrollTo(0, 0);
    const handleLoad = () => {
      const loadTime = Date.now() - start;
      const remaining = Math.max(1000 - loadTime, 0);

      setTimeout(() => setIsLoading(false), remaining);
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, [location.pathname]);

  /* ===== Lenis Setup ===== */
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({ duration: 1.2 });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {/* 🔥 Loader Only on Home */}
      {location.pathname === "/" && isLoading && <Preloader />}

      <div
        className={
          location.pathname === "/" && isLoading
            ? "overflow-hidden"
            : "bg-white"
        }
      >
        <CustomCursor />
        <Navbar />

        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6 }}
                  >
                    <PremiumLandingPage />
                  </motion.div>
                }
              />
              <Route
                path="/about-us"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6 }}
                  >
                    <AboutPage />
                  </motion.div>
                }
              />
              <Route
                path="/services"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ServicesPage />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

/* ==============================
   ✅ Router wraps everything
============================== */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
