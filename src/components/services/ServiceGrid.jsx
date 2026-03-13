import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Building2, Cctv, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Map backend icon names to actual components
const iconMap = {
  Shield: Shield,
  Building2: Building2,
  Cctv: Cctv,
};

export const ServiceGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort(); // abort request if it takes too long
      }, 10000); // 10 seconds timeout

      try {
        const resp = await fetch(API, { signal: controller.signal });
        if (!resp.ok) {
          throw new Error(`API returned status ${resp.status}`);
        }                                                 
        const data = await resp.json();
        setServices(data);
      } catch (err) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again later.");
        } else {
          setError("Failed to fetch services. Please try again later.");
        }
        console.error("Error fetching data:", err);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-primary font-bold text-lg">
          Loading Services...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-600 font-bold text-lg">{error}</span>
      </div>
    );

  const publishedServices = services.filter(
    (service) => service.status === "published",
  );

  if (publishedServices.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-slate-600 font-medium text-lg">
          No services available at the moment.
        </span>
      </div>
    );

  return (
    <section className="py-20 lg:py-32 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                Core Capabilities
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
              Integrated <br /> <span className="text-primary">Solutions.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-sm md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary pl-4 md:pl-0 md:pr-4">
            Tailored operational excellence designed to protect and elevate your
            enterprise across India.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {publishedServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Shield; // fallback icon
            return (
              <motion.div
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                variants={cardVariants}
                className="group relative h-[450px] lg:h-[550px] rounded-[32px] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={`${IMAGE_BASE_URL}${service.image}`}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                  {/* Top Icon */}
                  <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <IconComponent size={24} />
                  </div>

                  <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="text-2xl lg:text-3xl font-black text-white uppercase leading-tight mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {service.banner?.shortDescription}
                    </p>

                    {/* Bottom Line & Arrow */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/20 group-hover:border-primary/50 transition-colors duration-500">
                      <span className="text-white uppercase font-bold text-[10px] tracking-[0.2em]">
                        Explore Service
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Red Accent Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
