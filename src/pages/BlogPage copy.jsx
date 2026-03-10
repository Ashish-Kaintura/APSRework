import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Calendar, Clock, ChevronRight, Mail } from "lucide-react";

// --- MOCK DATA (All in one array, dates set to 2025) ---
const categories = [
  "All",
  "Security Operations",
  "Facility Management",
  "Technology",
  "Corporate News",
];

const blogPosts = [
  {
    id: 1,
    category: "Technology",
    date: "March 2, 2025", // Newest - will automatically become Featured
    readTime: "8 min read",
    title: "The Future of AI in 24/7 Command Center Operations",
    excerpt:
      "How predictive analytics and machine learning are revolutionizing real-time threat detection and rapid response protocols across our 133+ branches.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Security Operations",
    date: "Feb 28, 2025",
    readTime: "5 min read",
    title: "5 Essential Protocols for High-Value Asset Transit",
    excerpt:
      "Securing financial logistics requires more than just armored vehicles. It requires impenetrable strategy.",
    image:
      "https://images.unsplash.com/photo-1616803140344-6682afb13cda?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Facility Management",
    date: "Feb 24, 2025",
    readTime: "6 min read",
    title: "How Integrated Management Reduces Operational Costs",
    excerpt:
      "Consolidating your housekeeping, maintenance, and security under one vendor drastically improves efficiency.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Corporate News",
    date: "Feb 15, 2025",
    readTime: "4 min read",
    title: "APS Group Expands Presence in Southern Tier-2 Cities",
    excerpt:
      "Strengthening our Pan-India network by opening 12 new operational hubs across Karnataka and Tamil Nadu.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Technology",
    date: "Feb 10, 2025",
    readTime: "7 min read",
    title: "The Role of Drones in Industrial Perimeter Defense",
    excerpt:
      "Deploying automated aerial surveillance to monitor expansive manufacturing plants and warehousing facilities.",
    image:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Security Operations",
    date: "Feb 02, 2025",
    readTime: "5 min read",
    title: "Psychological Profiling in Elite Guard Recruitment",
    excerpt:
      "Inside the rigorous 5-step vetting process that ensures only the most reliable personnel wear the APS uniform.",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop",
  },
];

 const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);

  // 1. Filter posts based on active category
  // 2. Sort them by Date (Newest first)
  const sortedPosts = [...blogPosts]
    .filter(
      (post) => activeCategory === "All" || post.category === activeCategory,
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 3. Automatically assign the latest post to the Featured spot, and the rest to the Grid
  const featuredPost = sortedPosts[0];
  const gridPosts = sortedPosts.slice(1);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Page Load Animation
      tl.from(".blog-header-element", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-white font-sans pt-24 lg:pt-32 pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 lg:mb-20 text-center lg:text-left">
          <div className="blog-header-element flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">
              Thought Leadership
            </span>
          </div>
          <h1 className="blog-header-element text-5xl lg:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6">
            Insights & <br />
            <span className="text-slate-400 italic">Intelligence.</span>
          </h1>
          <p className="blog-header-element text-slate-500 text-sm lg:text-base leading-relaxed max-w-2xl font-medium">
            Explore industry-leading perspectives, operational strategies, and
            the latest innovations shaping the future of security and facility
            management in India.
          </p>
        </div>

        {/* --- CATEGORY FILTERS --- */}
        <div className="blog-header-element flex flex-wrap items-center gap-3 mb-12 border-b border-slate-200 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC FEATURED ARTICLE --- */}
        <AnimatePresence mode="wait">
          {featuredPost && (
            <motion.div
              key={`featured-${featuredPost.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl shadow-slate-200 mb-16"
            >
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />

              <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-wider">
                    <Calendar size={14} /> {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} /> {featuredPost.readTime}
                  </div>
                </div>

                <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter mb-4 max-w-4xl group-hover:text-primary transition-colors duration-500">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-2xl font-medium mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden sm:block">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 text-white font-bold uppercase text-xs tracking-widest group-hover:text-primary transition-colors">
                  Read Full Article{" "}
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- DYNAMIC ARTICLE GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {gridPosts.map((post) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={`grid-${post.id}`}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={12} /> {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Bottom Read More Line */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-primary/30 transition-colors mt-auto">
                    <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
                      {post.date}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- NEWSLETTER CTA --- */}
        <div className="mt-32 bg-slate-950 rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Stay Ahead of the{" "}
              <span className="text-primary italic">Curve.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Join 10,000+ industry leaders who receive our monthly briefings on
              security infrastructure and facility management innovations.
            </p>
          </div>

          <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your corporate email"
              className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-colors whitespace-nowrap">
              Subscribe <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlogPage;