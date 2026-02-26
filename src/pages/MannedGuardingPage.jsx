import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  Home,
  Warehouse,
  Factory,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Gem,
  ChevronDown,
  ArrowRight,
  Phone,
  Shield,
} from "lucide-react";
import image1 from "../images/servicesImage/mangurd.png";
import image2 from "../images/servicesImage/1.png";
import image3 from "../images/servicesImage/4.png";
// --- DATA ARRAYS ---
const sectors = [
  { name: "Corporate Offices", icon: <Building size={32} /> },
  { name: "Residential", icon: <Home size={32} /> },
  { name: "Warehouses", icon: <Warehouse size={32} /> },
  { name: "Industrial", icon: <Factory size={32} /> },
  { name: "Retail", icon: <ShoppingBag size={32} /> },
  { name: "Healthcare", icon: <HeartPulse size={32} /> },
  { name: "Education", icon: <GraduationCap size={32} /> },
  { name: "High Value", icon: <Gem size={32} /> },
];

const specializedUnits = [
  {
    title: "Static Guarding",
    desc: "Dedicated onsite presence focused on perimeter integrity and entry-point security.",
  },
  {
    title: "Roaming Patrols",
    desc: "Systematic and unpredictable movements to maximize coverage across large facilities.",
  },
  {
    title: "Access Control",
    desc: "Rigorous management of visitors, contractors, and staff to prevent unauthorized entry.",
  },
  {
    title: "Event Security",
    desc: "Crowd management and high-visibility deterrence for corporate and public events.",
  },
  {
    title: "Emergency Response",
    desc: "First responder capabilities for fires, medical emergencies, and security breaches.",
  },
  {
    title: "VIP Escort",
    desc: "Discreet and professional protection for executives and high-net-worth individuals.",
  },
  {
    title: "Mobile Patrols",
    desc: "Rapid response vehicular patrols for multi-site complexes and expansive grounds.",
  },
  {
    title: "Detailed Reporting",
    desc: "Transparency through digital logs, incident reports, and real-time client dashboards.",
  },
];

const whyChooseUs = [
  {
    num: "01",
    title: "Rigorous Vetting",
    desc: "Exhaustive background checks and psychological profiling ensure only the most reliable personnel wear our uniform.",
  },
  {
    num: "02",
    title: "Continuous Training",
    desc: "Regular upskilling in de-escalation, first aid, and advanced surveillance techniques.",
  },
  {
    num: "03",
    title: "Tech-Enabled Monitoring",
    desc: "Our guards use real-time reporting apps and body-worn cameras for total transparency.",
  },
  {
    num: "04",
    title: "Rapid Response",
    desc: "Integrated communication with our 24/7 National Command Center for immediate backup.",
  },
  {
    num: "05",
    title: "Fully Licensed",
    desc: "Strict compliance with all national security regulations and industry certification standards.",
  },
  {
    num: "06",
    title: "Total Transparency",
    desc: "Clients have 24/7 access to patrol logs, incident reports, and guard performance metrics.",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Consultation",
    desc: "Detailed risk assessment of your site and specific requirements.",
  },
  {
    step: "2",
    title: "Strategy",
    desc: "Design of custom standard operating procedures and patrol routes.",
  },
  {
    step: "3",
    title: "Selection",
    desc: "Deployment of guards best suited to your industry and culture.",
  },
  {
    step: "4",
    title: "Activation",
    desc: "Live deployment with 24/7 supervision and reporting.",
  },
];

const faqs = [
  {
    q: "How do you ensure the quality of your guards?",
    a: "We employ a rigorous 5-step vetting process followed by mandatory training at our specialized academy before deployment.",
  },
  {
    q: "Can you provide guards on short notice?",
    a: "Yes, our extensive network of 42,000+ professionals allows us to fulfill rapid deployment requests.",
  },
  {
    q: "How are the guards monitored?",
    a: "Through our 24/7 Command Center, GPS tracking, and digital reporting applications.",
  },
  {
    q: "Do you offer services in multiple regions?",
    a: "Absolutely. We operate across 27 States and Union Territories across India.",
  },
  {
    q: "What kind of reports will I receive?",
    a: "Daily patrol logs, incident reports, and monthly security audits accessible via our client dashboard.",
  },
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// --- MAIN COMPONENT ---
export const MannedGuardingPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="bg-white font-sans overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] bg-slate-950 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            src={image1}
            alt="Security Guard"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-slate-950/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-6"
            >
              Uncompromising Protection
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black text-white uppercase leading-[1.1] tracking-tighter mb-6"
            >
              Elite Man <br />
              <span className="text-primary italic">Guarding</span> <br />
              Services
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-slate-300 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl"
            >
              Setting the gold standard in physical security. Our highly-trained
              personnel provide comprehensive solutions for corporate,
              industrial, and high-profile environments.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-colors">
                Request Free Site Assessment
              </button>
              <button className="border border-white/30 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Call Now 24/7
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE HUMAN ELEMENT (Intro) */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-1/2"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black text-slate-900 uppercase leading-tight tracking-tighter mb-6"
            >
              The Human Element of <br />
              <span className="text-primary italic">Absolute Security</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-600 leading-relaxed mb-4"
            >
              In an increasingly digital world, the physical presence of a
              trained security professional remains the single most effective
              deterrent against crime. Our Manned Guarding services go beyond
              simple surveillance; we provide a proactive layer of defense that
              adapts in real-time to emerging threats.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-slate-600 leading-relaxed"
            >
              By combining human intuition with rigorous training and
              state-of-the-art technology, we ensure that your personnel,
              assets, and reputation are protected around the clock. Every guard
              we deploy is a carefully vetted professional committed to
              maintaining the integrity of your site.
            </motion.p>
          </motion.div>
          <div className="w-full lg:w-1/2 relative h-[400px]">
            <img
              loading="lazy"
              src={image2}
              className="absolute top-0 right-10 w-2/3 h-[300px] object-cover shadow-2xl"
              alt="Command Center"
            />
            <img
              loading="lazy"
              src={image3}
              className="absolute bottom-0 left-0 w-2/3 h-[300px] object-cover shadow-2xl border-4 border-white"
              alt="Security Guard"
            />
          </div>
        </div>
      </section>

      {/* 3. SECTORS WE PROTECT */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
              Sectors We <span className="text-primary italic">Protect</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Tailored security protocols for diverse environments, ensuring
              specialized knowledge for every industry.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white py-10 px-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {sector.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-700">
                  {sector.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SPECIALIZED UNITS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            Our <span className="text-primary italic">Specialized</span> Units
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {specializedUnits.map((unit, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="pl-6 border-l-4 border-primary"
            >
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                {unit.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {unit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 lg:py-32 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Why Choose{" "}
              <span className="text-primary italic">APS Securitas</span>
            </h2>
            <p className="text-slate-400">
              Beyond just providing a presence, we provide peace of mind through
              excellence.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black text-lg">
                    {item.num}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. DEPLOYMENT PROCESS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            Deployment <span className="text-primary italic">Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-slate-100 z-0" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl mb-6 shadow-xl border-4 border-white">
                  {step.step}
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
              Frequently Asked{" "}
              <span className="text-primary italic">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm uppercase tracking-widest text-slate-700">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-slate-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="bg-primary py-24 px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
          Secure Your Assets <br />
          <span className="bg-white text-primary px-4 py-1 italic inline-block mt-2">
            With the best in the industry
          </span>
        </h2>
        <p className="text-white/90 font-medium mb-10 max-w-xl">
          Don't wait for a security breach to happen. Get a professional risk
          assessment today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="bg-slate-950 text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-colors">
            Request Quote Now
          </button>
          <button className="bg-white text-slate-900 px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <Phone size={16} className="text-primary" /> 1-800-SECURE
          </button>
        </div>
      </section>
    </main>
  );
};
