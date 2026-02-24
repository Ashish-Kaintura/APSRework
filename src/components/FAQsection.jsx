import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";

const faqs = [
    {
        question: "What security services does APS Group provide?",
        answer:
            "APS Group provides gold-standard Manned Guarding, 24x7 Monitoring, and Facility Management services. We are a leading Integrated Service Provider in India.",
    },
    {
        question: "How much experience does APS Group have?",
        answer:
            "Established in 1986, APS Group has over 39 years of experience in the security and surveillance industry.",
    },
    {
        question: "What is your operational reach?",
        answer:
            "We have a presence in 27 States and Union Territories across India, supported by a workforce of over 42,000 security professionals.",
    },
    {
        question: "Are your solutions technology-driven?",
        answer:
            "Yes, we provide tech-enabled integrated solutions, including AI-powered threat detection and real-time monitoring insights.",
    },
];

export const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-12 lg:py-16 bg-white overflow-hidden font-sans border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 lg:mb-10 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="h-[1px] w-6 bg-primary"></span>
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                            Resources
                        </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                        ANSWERS TO{" "}
                        <span className="text-primary ">CORE QUESTIONS.</span>
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`overflow-hidden transition-all duration-300 rounded-xl border ${
                                activeIndex === i
                                    ? "border-primary bg-slate-50"
                                    : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                            }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-4 lg:p-5 text-left outline-none"
                            >
                                <span
                                    className={`text-xs lg:text-sm font-bold transition-colors leading-tight ${
                                        activeIndex === i ? "text-primary" : "text-slate-800"
                                    }`}
                                >
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown
                                        size={18}
                                        className={
                                            activeIndex === i ? "text-primary" : "text-slate-400"
                                        }
                                    />
                                </motion.div>
                            </button>

                            {/* Framer Motion Height Transition */}
                            <AnimatePresence initial={false}>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                        }}
                                    >
                                        <div className="px-4 lg:px-5 pb-5">
                                            <div className="h-[1px] w-full bg-slate-200 mb-3 opacity-50" />
                                            <p className="text-slate-500 text-[11px] lg:text-xs leading-relaxed max-w-2xl">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Compact Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-8 flex items-center justify-center gap-3 py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200"
                >
                    <MessageSquare size={14} className="text-primary" />
                    <p className="text-slate-600 text-[10px] font-medium uppercase tracking-wider">
                        Need more details?{" "}
                        <button className="text-primary font-bold hover:underline ml-1">
                            Connect with APS Support
                        </button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
