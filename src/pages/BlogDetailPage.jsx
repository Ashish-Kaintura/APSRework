import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Bookmark,
  ChevronRight,
  Mail,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- MOCK ARTICLE DATA ---
const article = {
  category: "Technology",
  date: "March 2, 2025",
  readTime: "8 min read",
  author: "Anil Puri",
  authorRole: "Chairman, APS Group",
  authorImage:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  title: "The Future of AI in 24/7 Command Center Operations",
  subtitle:
    "How predictive analytics and machine learning are revolutionizing real-time threat detection and rapid response protocols across India's infrastructure.",
  heroImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
};

const relatedPosts = [
  {
    id: 2,
    category: "Security Operations",
    date: "Feb 28, 2025",
    readTime: "5 min read",
    title: "5 Essential Protocols for High-Value Asset Transit",
    image:
      "https://images.unsplash.com/photo-1616803140344-6682afb13cda?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Facility Management",
    date: "Feb 24, 2025",
    readTime: "6 min read",
    title: "How Integrated Management Reduces Operational Costs",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
];

export const BlogDetailPage = () => {
  const containerRef = useRef(null);
  const heroImgRef = useRef(null);

  // Reading Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useGSAP(
    () => {
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
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="bg-white font-sans relative">
      {/* --- READING PROGRESS BAR --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-slate-950">
        <img
          ref={heroImgRef}
          src={article.heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

        {/* Back Button Overlay */}
        <div className="absolute top-8 lg:top-12 left-6 lg:left-12 z-20">
          <button className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
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
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Calendar size={14} /> {article.date}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Clock size={14} /> {article.readTime}
            </div>
          </div>

          <h1 className="article-header-elem text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-6">
            {article.title}
          </h1>

          <p className="article-header-elem text-slate-500 text-lg lg:text-xl leading-relaxed font-medium mb-10">
            {article.subtitle}
          </p>

          {/* Author Info */}
          <div className="article-header-elem flex items-center gap-4 pt-8 border-t border-slate-100">
            <img
              src={article.authorImage}
              alt={article.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
            />
            <div>
              <div className="font-black text-slate-900 uppercase tracking-tight">
                {article.author}
              </div>
              <div className="text-primary text-[10px] font-bold uppercase tracking-widest">
                {article.authorRole}
              </div>
            </div>
          </div>
        </header>

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

          {/* Main Content Typography */}
          <article className="article-content-elem flex-grow text-slate-600 text-base lg:text-lg leading-loose font-medium space-y-8">
            <p className="text-xl lg:text-2xl text-slate-900 font-bold leading-relaxed">
              <span className="text-5xl lg:text-7xl font-black text-primary float-left mr-3 mt-2 leading-none">
                I
              </span>
              n the rapidly evolving landscape of integrated security, the
              traditional model of relying solely on physical guards is no
              longer sufficient for high-stakes environments. The modern command
              center is the nervous system of enterprise security.
            </p>

            <p>
              APS Group has pioneered the integration of AI-driven predictive
              analytics into our 24/7 National Command Center. By analyzing vast
              datasets from CCTV feeds, access control points, and ambient
              sensors, our systems can identify anomalies before they escalate
              into critical breaches.
            </p>

            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight mt-12 mb-6">
              The Shift from Reactive to Predictive
            </h2>

            <p>
              Historically, surveillance was used as a post-incident
              investigation tool. Today, our algorithms monitor behavior
              patterns in real-time. If a vehicle idles near a high-value
              transit route for longer than the established baseline, or if
              unauthorized personnel attempt tailgating, the AI instantly flags
              the event to our QRT (Quick Response Team).
            </p>

            {/* Premium Pull Quote */}
            <blockquote className="my-12 py-8 px-8 lg:px-12 bg-slate-50 border-l-4 border-primary rounded-r-3xl relative">
              <div className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none">
                "
              </div>
              <p className="text-xl lg:text-2xl font-black text-slate-900 italic leading-snug relative z-10">
                Technology does not replace the human element; it arms our
                42,000+ professionals with the intelligence needed to act with
                absolute precision.
              </p>
            </blockquote>

            <p>
              As we deploy these advanced systems across our 133+ branches
              covering 27 states, the operational efficiency of our clients has
              surged. False alarms are reduced by 85%, and response times have
              been cut in half.
            </p>
          </article>
        </div>
      </section>

      {/* --- RELATED ARTICLES SECTION --- */}
      <section className="bg-slate-50 py-20 lg:py-32 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
              Continue <span className="text-primary italic">Reading</span>
            </h3>
            <button className="hidden sm:flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors">
              View All Insights <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {relatedPosts.map((post) => (
              <motion.article
                whileHover={{ y: -5 }}
                key={post.id}
                className="group cursor-pointer bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all border border-slate-100 flex flex-col sm:flex-row h-full"
              >
                <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden relative">
                  <img
                    src={post.image}
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
                  <h4 className="text-lg lg:text-xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-auto">
                    <Clock size={12} /> {post.readTime}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER CTA (Reused for consistency) --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20 mt-[-40px] relative z-20">
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
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-colors">
              Subscribe <Mail size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default BlogDetailPage;