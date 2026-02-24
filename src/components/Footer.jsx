import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUp,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid: Brand & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter">
              APS <span className="text-primary">GROUP</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A leading Integrated Service Provider in India since 1986,
              dedicated to unparalleled security and facility excellence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "var(--primary)" }}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Services
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">
                Manned Guarding
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Facility Management
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Banking Security
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                24x7 Monitoring
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Company
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">
                Our Story
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Presence in 27 States
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Careers
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Serving 27 States across India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={18} className="text-primary shrink-0" />
                <span>Connect with APS Support</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@apsgroupindia.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] lg:text-xs uppercase tracking-widest text-center">
            © {currentYear} APS Group India. 39 Years of Unmatched Protection.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-primary p-3 rounded-full text-white shadow-lg shadow-primary/20"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
