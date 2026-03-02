import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Lock, Mail } from "lucide-react";

const policySections = [
  { id: "collection", title: "1. Information We Collect" },
  { id: "usage", title: "2. How We Use Your Information" },
  { id: "sharing", title: "3. Data Sharing & Disclosure" },
  { id: "security", title: "4. Data Security Protocols" },
  { id: "rights", title: "5. Your Privacy Rights" },
  { id: "contact", title: "6. Contact Information" },
];
const PrivacyPolicyPage = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(policySections[0].id);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Header Reveal
      tl.from(".legal-header-elem", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
        // Content Reveal
        .from(
          ".legal-content-elem",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  // Handle smooth scrolling for the sidebar links
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounts for sticky headers/spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  // Optional: Add Intersection Observer here in a real app to update activeSection on scroll

  return (
    <main
      ref={containerRef}
      className="bg-slate-50 font-sans min-h-screen pt-24 lg:pt-32 pb-20"
    >
      {/* --- LEGAL HEADER --- */}
      <header className="max-w-7xl mx-auto px-6 mb-16 lg:mb-24 text-center lg:text-left">
        <div className="legal-header-elem flex items-center justify-center lg:justify-start gap-3 mb-6">
          <span className="h-[2px] w-12 bg-primary"></span>
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">
            Legal & Compliance
          </span>
        </div>
        <h1 className="legal-header-elem text-4xl lg:text-6xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6">
          Privacy <span className="text-slate-400 italic">Policy.</span>
        </h1>
        <div className="legal-header-elem flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <Lock size={14} className="text-primary" /> End-to-End Encryption
          </span>
          <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
          <span>Last Updated: March 2, 2026</span>
        </div>
      </header>

      {/* --- MAIN CONTENT & SIDEBAR --- */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
        {/* 1. Sticky Navigation Sidebar (Desktop) */}
        <aside className="legal-content-elem hidden lg:block w-72 shrink-0 sticky top-32">
          <div className="bg-white rounded-[24px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <ShieldCheck size={24} className="text-primary" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Contents
              </h3>
            </div>
            <nav className="flex flex-col gap-4">
              {policySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeSection === section.id
                      ? "text-primary translate-x-2"
                      : "text-slate-400 hover:text-slate-900 hover:translate-x-1"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 2. Legal Document Body */}
        <div className="legal-content-elem flex-grow bg-white rounded-[32px] p-8 sm:p-12 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          <div className="mb-12">
            <p className="text-lg lg:text-xl text-slate-900 font-bold leading-relaxed mb-6">
              At APS Group, your privacy and security are our highest
              priorities. This Privacy Policy outlines how we collect, use,
              protect, and handle your personal and corporate information across
              our integrated security and facility management operations.
            </p>
            <p>
              By engaging with our services, visiting our websites, or utilizing
              our Client Portal, you consent to the data practices described in
              this document. We enforce strict compliance with national data
              protection regulations across all our 133+ branches.
            </p>
          </div>

          {/* Section 1 */}
          <div id="collection" className="mb-16 pt-8 scroll-mt-24">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">1.</span> Information We Collect
            </h2>
            <p className="mb-4">
              We collect information necessary to provide elite security and
              facility management services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-500 mb-6">
              <li>
                <strong className="text-slate-700">
                  Corporate Identity Data:
                </strong>{" "}
                Company names, registration details, and authorized
                representative contact information.
              </li>
              <li>
                <strong className="text-slate-700">Operational Data:</strong>{" "}
                Site layouts, operational hours, existing security protocols,
                and specific vulnerabilities shared during consultation.
              </li>
              <li>
                <strong className="text-slate-700">
                  Automated Technical Data:
                </strong>{" "}
                IP addresses, browser types, and usage metrics when accessing
                our Client Portal or website.
              </li>
              <li>
                <strong className="text-slate-700">Surveillance Data:</strong>{" "}
                Video feeds, access logs, and biometric data strictly governed
                by client-specific Service Level Agreements (SLAs) and monitored
                via our 24/7 Command Center.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div
            id="usage"
            className="mb-16 pt-8 scroll-mt-24 border-t border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">2.</span> How We Use Your
              Information
            </h2>
            <p className="mb-4">
              Your data is utilized exclusively for operational excellence and
              service delivery:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-500">
              <li>
                To execute risk assessments and deploy tailored Manned Guarding
                or Facility Management solutions.
              </li>
              <li>
                To provide real-time incident reporting and access to our
                digital tracking dashboards.
              </li>
              <li>
                To process billing, contractual obligations, and administrative
                communications.
              </li>
              <li>
                To improve our AI-driven predictive analytics and emergency
                response times (QRT/MRT).
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div
            id="sharing"
            className="mb-16 pt-8 scroll-mt-24 border-t border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">3.</span> Data Sharing & Disclosure
            </h2>
            <p className="mb-4">
              APS Group operates on a strict zero-trust architecture. We do not
              sell, trade, or rent your corporate or personal data. We only
              share information under the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-500">
              <li>
                <strong className="text-slate-700">
                  Authorized Personnel:
                </strong>{" "}
                Information is restricted to rigorously vetted APS Group
                employees on a strict "need-to-know" basis.
              </li>
              <li>
                <strong className="text-slate-700">Legal Compliance:</strong> We
                may disclose data if required by law enforcement, judicial
                proceedings, or national security mandates in the 27 States/UTs
                we operate within.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div
            id="security"
            className="mb-16 pt-8 scroll-mt-24 border-t border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">4.</span> Data Security Protocols
            </h2>
            <p className="mb-4">
              As a premier security firm, our digital infrastructure mirrors our
              physical protection standards. We employ:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-500">
              <li>
                Military-grade 256-bit AES encryption for all data in transit
                and at rest.
              </li>
              <li>
                Multi-Factor Authentication (MFA) and biometric access controls
                for our Command Center terminals.
              </li>
              <li>
                Routine third-party penetration testing and vulnerability
                assessments on our Client Portal.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div
            id="rights"
            className="mb-16 pt-8 scroll-mt-24 border-t border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">5.</span> Your Privacy Rights
            </h2>
            <p className="mb-4">
              Depending on your jurisdiction, you retain complete authority over
              your corporate data. You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-500">
              <li>
                Request a comprehensive audit of the data we hold regarding your
                enterprise.
              </li>
              <li>
                Demand the correction of inaccurate or incomplete operational
                details.
              </li>
              <li>
                Request the secure deletion of non-essential data post-contract
                termination, in accordance with local retention laws.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div
            id="contact"
            className="pt-8 scroll-mt-24 border-t border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-4">
              <span className="text-primary">6.</span> Contact Information
            </h2>
            <p className="mb-8">
              For inquiries regarding this Privacy Policy or to exercise your
              data rights, please contact our dedicated Data Protection Officer
              at our New Delhi Headquarters:
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2">
                  APS Group Headquarters
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  C1/118, Janakpuri,
                  <br />
                  New Delhi - 110058, India
                </p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2">
                  Direct Contact
                </h4>
                <a
                  href="mailto:privacy@apsecuritas.com"
                  className="flex items-center gap-2 text-primary hover:text-slate-900 transition-colors text-sm font-bold mb-2"
                >
                  <Mail size={14} /> privacy@apsecuritas.com
                </a>
                <p className="text-slate-500 text-sm font-bold">011-49960000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default PrivacyPolicyPage;