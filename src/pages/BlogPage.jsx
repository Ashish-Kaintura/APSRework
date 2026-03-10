import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Mail,
  Loader2,
  Search,
} from "lucide-react";

const API = "http://localhost:5000/api/blogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // NEW: Search state
  const containerRef = useRef(null);

  // 1. Fetch Blogs on Component Mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(API);

        // Only keep blogs with status "published"
        const publishedBlogs = data.filter(
          (blog) => blog.status?.toLowerCase() === "published",
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 2. Helper Functions
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (htmlContent) => {
    if (!htmlContent) return "3 min read";
    const text = htmlContent.replace(/<[^>]+>/g, "");
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime === 0 ? 1 : readTime} min read`;
  };

  // 3. Extract unique categories dynamically
  const dynamicCategories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  // 4. COMPOUND FILTER LOGIC (Category + Search Query)
  const sortedPosts = [...blogs]
    .filter((post) => {
      // Check if it matches the active category
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      // Check if title or category matches the search query
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        (post.title && post.title.toLowerCase().includes(searchLower)) ||
        (post.category && post.category.toLowerCase().includes(searchLower)) ||
        (post.shortdescription &&
          post.shortdescription.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort Newest First

  // 5. Assign layout positions
  const featuredPost = sortedPosts[0];
  const gridPosts = sortedPosts.slice(1);

  // Initial Page Animation
  useGSAP(
    () => {
      if (!loading) {
        const tl = gsap.timeline();
        tl.from(".blog-header-element", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef, dependencies: [loading] },
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
          Loading Insights...
        </p>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-white font-sans pt-24 lg:pt-32 pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* --- PAGE HEADER --- */}
        <div className="mb-10 lg:mb-16 text-center lg:text-left">
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

        {/* --- SEARCH & FILTERS --- */}
        <div className="blog-header-element mb-12 border-b border-slate-100 pb-8">
          {/* Real-time Search Bar */}
          <div className="relative max-w-2xl mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm"
              placeholder="Search insights by title, keyword, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Clear Search Button (shows only when typing) */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {dynamicCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchQuery(""); // Optional: Clear search when changing category
                }}
                className={`px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- RESULTS AREA --- */}
        {sortedPosts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              No articles found
            </h3>
            <p className="text-slate-500 font-medium">
              Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 text-primary font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* --- DYNAMIC FEATURED ARTICLE --- */}
            <AnimatePresence mode="wait">
              {featuredPost && (
                <motion.div
                  key={`featured-${featuredPost._id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative w-full h-[450px] lg:h-[600px] rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl shadow-slate-200 mb-10 lg:mb-16"
                >
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="absolute inset-0 z-20"
                  />

                  <img
                    src={
                      featuredPost.CoverImage ||
                      featuredPost.Image ||
                      featuredPost.bgImage ||
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                    }
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90" />

                  <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-end pointer-events-none">
                    <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-6">
                      <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {featuredPost.category || "General"}
                      </span>
                      <div className="flex items-center gap-2 text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        <Calendar size={14} />{" "}
                        {formatDate(featuredPost.createdAt)}
                      </div>
                      <div className="flex items-center gap-1 text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        <Clock size={14} />{" "}
                        {calculateReadTime(featuredPost.longdescription)}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter mb-4 max-w-4xl group-hover:text-primary transition-colors duration-500 line-clamp-3 lg:line-clamp-2">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-2xl font-medium mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 hidden sm:block line-clamp-2">
                      {featuredPost.shortdescription ||
                        featuredPost.description ||
                        "Click to read the full insight."}
                    </p>

                    <div className="flex items-center gap-3 text-white font-bold uppercase text-[10px] sm:text-xs tracking-widest group-hover:text-primary transition-colors">
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
            {gridPosts.length > 0 && (
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
                      key={`grid-${post._id}`}
                      className="group cursor-pointer flex flex-col h-full relative bg-white border border-slate-100 rounded-[24px] hover:shadow-xl hover:shadow-slate-200/50 transition-all p-2"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="absolute inset-0 z-20"
                      />

                      <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-5 bg-slate-100">
                        <img
                          src={
                            post.CoverImage ||
                            post.Image ||
                            post.bgImage ||
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="flex flex-col flex-grow px-4 pb-4 pointer-events-none">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-primary text-[10px] font-black uppercase tracking-widest">
                            {post.category || "General"}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <Clock size={12} />{" "}
                            {calculateReadTime(post.longdescription)}
                          </div>
                        </div>

                        <h3 className="text-lg lg:text-xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {post.shortdescription || post.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-primary/30 transition-colors mt-auto">
                          <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
                            {formatDate(post.createdAt)}
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
            )}
          </>
        )}

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
              placeholder="Corporate email"
              className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-colors">
              Subscribe <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
