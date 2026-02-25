import React from "react";
import { motion } from "framer-motion";

// Organized Leadership Data
const leadershipData = {
  tier1: [
    {
      name: "Anil Puri",
      role: "Chairman",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
  ],
  tier2: [
    {
      name: "Vikas Chadha",
      role: "Group CEO",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Devender Sharma",
      role: "COO – Security Services",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
  ],
  tier3: [
    { name: "Gopa Kumar", role: "Group President" },
    {
      name: "Capt. Ashwin Advani",
      role: "President Surveillance & Command Center Ops",
    },
    { name: "Sanjeev Chopra", role: "Head Finance" },
    { name: "Anand Sagar", role: "Vice President Liasioning" },
    { name: "Tarun Garg", role: "President Operations" },
    { name: "Vikram Mehta", role: "President BD & OPs" },
    { name: "Jyotsana Bhalla", role: "President Corporate Relation" },
    { name: "Narender Rana", role: "Head- Training & Development" },
    { name: "Gaurav Saini", role: "Vice President IFM" },
    { name: "Lata Mishra", role: "Head HR & Compliance" },
    { name: "Nishant Nundy", role: "CTO & Head IT Infrastructure" },
  ],
};

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Reusable Premium Card Component
const ProfileCard = ({ person, size = "normal" }) => {
  const isLarge = size === "large";
  const isMedium = size === "medium";
  const imageSrc =
    person.img ||
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`group relative bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all flex items-center gap-4 sm:gap-6 overflow-hidden
                ${
                  isLarge
                    ? "md:flex-col md:text-center p-6 md:p-10 border-b-4 border-b-primary"
                    : isMedium
                      ? "p-5 sm:p-6"
                      : "p-4"
                }
            `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={`relative shrink-0 rounded-full p-1 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-primary group-hover:to-[#ff8e94] transition-colors duration-500 z-10
                ${
                  isLarge
                    ? "w-24 h-24 sm:w-32 sm:h-32"
                    : isMedium
                      ? "w-20 h-20 sm:w-24 sm:h-24"
                      : "w-14 h-14 sm:w-16 sm:h-16"
                }
            `}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white bg-slate-100">
          <img
            src={imageSrc}
            alt={person.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      <div className={`flex flex-col z-10 ${isLarge ? "md:items-center" : ""}`}>
        <h4
          className={`font-black text-slate-900 group-hover:text-primary transition-colors 
                    ${
                      isLarge
                        ? "text-2xl sm:text-3xl mb-1"
                        : isMedium
                          ? "text-xl sm:text-2xl mb-1"
                          : "text-base sm:text-lg mb-0.5"
                    }
                `}
        >
          {person.name}
        </h4>
        <p
          className={`font-bold uppercase tracking-widest text-slate-500 
                    ${
                      isLarge
                        ? "text-xs sm:text-sm text-primary"
                        : isMedium
                          ? "text-[10px] sm:text-xs"
                          : "text-[9px]"
                    }
                `}
        >
          {person.role}
        </p>
      </div>
    </motion.div>
  );
};

export const LeadershipSection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#fafafa] font-sans overflow-hidden z-0">
      {/* --- ANIMATED BACKGROUND START --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Subtle Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Animated Glowing Orb 1 (Primary Color) */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
        />

        {/* Animated Glowing Orb 2 (Slate/Blue Tone) */}
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 150, -60, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-slate-400/10 rounded-full blur-[120px]"
        />
      </div>
      {/* --- ANIMATED BACKGROUND END --- */}

      {/* Content Container (Needs z-10 to sit above background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-10 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              The Ingredient of our success
            </span>
            <span className="h-[2px] w-10 bg-primary"></span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase">
            APS Group{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-400">
              Leadership.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 sm:space-y-12"
        >
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <ProfileCard person={leadershipData.tier1[0]} size="large" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {leadershipData.tier2.map((person, i) => (
              <ProfileCard key={i} person={person} size="medium" />
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-slate-200/60 max-w-5xl mx-auto"
          >
            <h3 className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">
              Core Leadership Team
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {leadershipData.tier3.map((person, i) => (
                <ProfileCard key={i} person={person} size="normal" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
