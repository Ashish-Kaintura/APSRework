import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Bookmark,
  ChevronRight,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const API = "http://localhost:5000/api/blogs";

export const BlogDetailPage = () => {
  const { slug } = useParams(); // Assuming your route is /blog/:slug
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const heroImgRef = useRef(null);

  // Reading Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        // Fetch all blogs (or use a specific /slug endpoint if you built one)
        const { data } = await axios.get(API);

        // Find the specific blog by slug
        const currentBlog = data.find((b) => b.slug === slug);

        if (!currentBlog) {
          navigate("/blogs"); // Redirect if not found
          return;
        }

        setBlog(currentBlog);

        // Find related posts (same category, exclude current, max 2)
        const related = data
          .filter(
            (b) =>
              b.category === currentBlog.category && b._id !== currentBlog._id,
          )
          .slice(0, 2);

        setRelatedPosts(related);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, navigate]);

  // --- HELPERS ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (htmlContent) => {
    if (!htmlContent) return "3 min read";
    const text = htmlContent.replace(/<[^>]+>/g, "");
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime === 0 ? 1 : readTime} min read`;
  };

  // --- ANIMATIONS ---
  useGSAP(
    () => {
      if (!loading && blog) {
        const tl = gsap.timeline();

        // 1. Initial Page Load Animations
        tl.from(heroImgRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        })
          .from(
            ".article-header-elem",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=1",
          )
          .from(
            ".article-content-elem",
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.5",
          );

        // 2. Hero Image Parallax on Scroll
        gsap.to(heroImgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [loading, blog] },
  );

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
          Loading Article...
        </p>
      </div>
    );
  }

  if (!blog) return null;

  const heroImageSrc =
    blog.CoverImage ||
    blog.Image ||
    blog.bgImage ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop";

  return (
    <main ref={containerRef} className="bg-white font-sans relative">
      {/* Dynamic styles to beautifully format the raw HTML coming from your database */}
      <style>{`
        .dynamic-html-content h2 { font-size: 1.875rem; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -0.025em; margin-top: 3rem; margin-bottom: 1.5rem; }
        .dynamic-html-content h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; }
        .dynamic-html-content p { margin-bottom: 1.5rem; }
        .dynamic-html-content strong { color: #0f172a; font-weight: 800; }
        .dynamic-html-content blockquote { margin: 3rem 0; padding: 2rem 2rem 2rem 3rem; background-color: #f8fafc; border-left: 4px solid #ef4444; border-top-right-radius: 1.5rem; border-bottom-right-radius: 1.5rem; font-size: 1.25rem; font-weight: 900; color: #0f172a; font-style: italic; position: relative; }
        .dynamic-html-content blockquote::before { content: '"'; position: absolute; top: 1rem; left: 1.5rem; font-size: 4rem; color: rgba(239, 68, 68, 0.2); font-family: serif; line-height: 1; }
        .dynamic-html-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .dynamic-html-content li { margin-bottom: 0.5rem; }
      `}</style>

      {/* --- READING PROGRESS BAR --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-slate-950">
        <img
          ref={heroImgRef}
          src={heroImageSrc}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

        {/* Back Button Overlay */}
        <div className="absolute top-8 lg:top-12 left-6 lg:left-12 z-20">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={16} /> Back to Insights
          </button>
        </div>
      </section>

      {/* --- OVERLAPPING CONTENT AREA --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 -mt-32 lg:-mt-48 mb-20">
        {/* 1. Article Header Box */}
        <header className="bg-white rounded-[32px] p-8 lg:p-16 shadow-2xl shadow-slate-200/50 mb-12 lg:mb-16">
          <div className="article-header-elem flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
              {blog.category || "General"}
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Calendar size={14} /> {formatDate(blog.createdAt)}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Clock size={14} /> {calculateReadTime(blog.description)}
            </div>
          </div>

          <h1 className="article-header-elem text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-6">
            {blog.title}
          </h1>

          {blog.shortdescription && (
            <p className="article-header-elem text-slate-500 text-lg lg:text-xl leading-relaxed font-medium mb-10">
              {blog.shortdescription}
            </p>
          )}

          {/* Author Info */}
          <div className="article-header-elem flex items-center gap-4 pt-8 border-t border-slate-100">
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-primary font-black text-xl uppercase">
              {blog.author ? blog.author.charAt(0) : "A"}
            </div>
            <div>
              <div className="font-black text-slate-900 uppercase tracking-tight">
                {blog.author || "APS Group"}
              </div>
              <div className="text-primary text-[10px] font-bold uppercase tracking-widest">
                Author & Contributor
              </div>
            </div>
          </div>
        </header>
        {/* Secondary Content Images */}
        {blog.Image && (
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-center">
              {blog.Image && (
                <img
                  src={blog.Image}
                  alt={blog.title}
                  className="w-full h-auto object-cover rounded border"
                />
              )}
            </div>
          </div>
        )}
        {blog.description && (
          <p className="mb-3 whitespace-pre-wrap p-10 text-slate-900">
            {blog.description}
          </p>
        )}
        {/* 2. Article Body & Sidebar Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Sticky Social Share Sidebar (Desktop) */}
          <aside className="hidden lg:block w-16 shrink-0">
            <div className="sticky top-32 flex flex-col gap-4 items-center">
              <span
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 rotate-180"
                style={{ writingMode: "vertical-rl" }}
              >
                Share Article
              </span>
              <div className="w-[1px] h-12 bg-slate-200 mb-2" />
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors">
                <Linkedin size={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors">
                <Twitter size={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors">
                <Facebook size={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors mt-4">
                <Bookmark size={16} />
              </button>
            </div>
          </aside>

          {/* Main Content Rendered from DB HTML */}
          <article
            className="article-content-elem flex-grow text-slate-600 text-base lg:text-lg leading-loose font-medium dynamic-html-content break-words overflow-hidden max-w-full"
            dangerouslySetInnerHTML={{ __html: blog.longdescription }}
          />
        </div>
      </section>

      {/* --- RELATED ARTICLES SECTION --- */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-20 lg:py-32 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Continue <span className="text-primary italic">Reading</span>
              </h3>
              <Link
                to="/blogs"
                className="hidden sm:flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
              >
                View All Insights <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {relatedPosts.map((post) => (
                <motion.article
                  whileHover={{ y: -5 }}
                  key={post._id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group cursor-pointer bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all border border-slate-100 flex flex-col sm:flex-row h-full"
                >
                  <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden relative">
                    <img
                      src={
                        post.CoverImage ||
                        post.Image ||
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 sm:p-8 w-full sm:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary text-[9px] font-black uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                    <h4 className="text-lg lg:text-xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-auto">
                      <Clock size={12} />{" "}
                      {calculateReadTime(post.shortdescription)}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- NEWSLETTER CTA --- */}
      <section
        className={`max-w-7xl mx-auto px-6 pb-20 relative z-20 ${relatedPosts.length > 0 ? "mt-[-40px]" : "mt-20"}`}
      >
        <div className="bg-slate-950 rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Stay Ahead of the{" "}
              <span className="text-primary italic">Curve.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Join 10,000+ industry leaders who receive our monthly briefings on
              security infrastructure and facility management.
            </p>
          </div>
          <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Corporate email"
              className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-colors whitespace-nowrap">
              Subscribe <Mail size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailPage;
