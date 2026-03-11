import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Your exact data untouched
const slideData = [
  {
    id: 0,
    title: "Who We Are",
    description: "",
    point: [{ question: "", answer: "" }],
    image: "/ScrollPresentationImage/0.png",
  },
  {
    id: 1,
    title: "Who We Are",
    description:
      "APS Group is a leading technology-driven security and facility management partner in India.",
    point: [{ question: "", answer: "" }],
    image: "/ScrollPresentationImage/1.png",
  },
  {
    id: 2,
    title: "Who We Are",
    description:
      "APS Group is a leading technology-driven security and facility management partner in India.",
    point: [{ question: "", answer: "" }],
    image: "/ScrollPresentationImage/2.png",
  },
  {
    id: 3,
    title: "Who We Are",
    description:
      "APS Group is a leading technology-driven security and facility management partner in India. We combine trained manpower, AI-powered surveillance, and a 24×7 Central Command Center to deliver proactive, reliable, and fully transparent security solutions for modern businesses. ",
    image: "/ScrollPresentationImage/3.png",
  },
  {
    id: 4,
    title: "Fail-Proof Attendance System",
    description: "",
    image: "/ScrollPresentationImage/4.png",
  },
  {
    id: 5,
    title: "Fail-Proof Attendance System",
    description: "",
    image: "/ScrollPresentationImage/5.png",
  },
  {
    id: 6,
    title: "Fail-Proof Attendance System",
    description: "",
    image: "/ScrollPresentationImage/6.png",
  },
  {
    id: 7,
    title: "Fail-Proof Attendance System",
    point: [
      {
        question: "AI-Based Verification:",
        answer: "Geo-Tagged Location + QR Code",
      },
      {
        question: "Zero Ghost Guards",
        answer: "Impossible to mark attendance away from the site.",
      },
      {
        question: "Instant Reports",
        answer: "Photos and timestamps for every check",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/7.png",
  },
  {
    id: 8,
    title: "Digital Patrolling",
    point: [
      {
        question: "Geo-Fenced Routes",
        answer: "System alerts if a guard deviates from the path.",
      },
      {
        question: "Live Tracking",
        answer:
          "To create a work breakdown structure, start from your scope statement.",
      },
      {
        question: "Digital Evidence",
        answer: "Photos and timestamps for every check",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/8.png",
  },
  {
    id: 9,
    title: "The Alertness System (Anti-Sleep Tech)",
    description: "",
    image: "/ScrollPresentationImage/9.png",
  },
  {
    id: 10,
    title: "The Alertness System (Anti-Sleep Tech)",
    description: "",
    image: "/ScrollPresentationImage/10.png",
  },
  {
    id: 11,
    title: "The Alertness System (Anti-Sleep Tech)",
    point: [
      {
        question: "Guard Acknowledgement",
        answer:
          "Guard receives alert every 20 minutes and must confirm instantly.",
      },
      {
        question: "QR Login & Attendance Tracking",
        answer: "Guard scans site QR code to mark attendance and start duty.",
      },
      {
        question: "Missed Alert Escalation & Reporting",
        answer:
          "Unanswered alert triggers second alert; supervisors receive missed alert reports.",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/11.png",
  },
  {
    id: 13,
    title: "Panic Alert",
    description: "",
    image: "/ScrollPresentationImage/13.png",
  },
  {
    id: 14,
    title: "Panic Alert",
    point: [{ question: "Command Centre Verification", answer: " " }],
    description: "",
    image: "/ScrollPresentationImage/14.png",
  },
  {
    id: 15,
    title: "Panic Alert",
    point: [
      {
        question: "Command Centre Verification",
        answer:
          "Command centre instantly verifies alert and coordinates response with nearest police station and hospitals.",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/15.png",
  },
  {
    id: 16,
    title: "Panic Alert",
    point: [
      {
        question: "Command Centre Verification",
        answer:
          "Command centre instantly verifies alert and coordinates response with nearest police station and hospitals.",
      },
      { question: "Panic Alert Trigger", answer: "" },
    ],
    description: "",
    image: "/ScrollPresentationImage/16.png",
  },
  {
    id: 17,
    title: "Panic Alert",
    point: [
      {
        question: "Command Centre Verification",
        answer:
          "Command centre instantly verifies alert and coordinates response with nearest police station and hospitals.",
      },
      {
        question: "Panic Alert Trigger",
        answer:
          "Guard presses panic alert in the app to immediately report emergency or threat situation.",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/17.png",
  },
  {
    id: 18,
    title: "Panic Alert",
    point: [
      {
        question: "Command Centre Verification",
        answer:
          "Command centre instantly verifies alert and coordinates response with nearest police station and hospitals.",
      },
      {
        question: "Panic Alert Trigger",
        answer:
          "Guard presses panic alert in the app to immediately report emergency or threat situation.",
      },
      { question: "Rapid Response Deployment", answer: "" },
    ],
    description: "",
    image: "/ScrollPresentationImage/18.png",
  },
  {
    id: 19,
    title: "Panic Alert",
    point: [
      {
        question: "Command Centre Verification",
        answer:
          "Command centre instantly verifies alert and coordinates response with nearest police station and hospitals.",
      },
      {
        question: "Panic Alert Trigger",
        answer:
          "Guard presses panic alert in the app to immediately report emergency or threat situation.",
      },
      {
        question: "Rapid Response Deployment",
        answer:
          "QRT team dispatched immediately to site for quick intervention and on-site issue resolution.",
      },
    ],
    description: "",
    image: "/ScrollPresentationImage/19.png",
  },
];

export default function Scrollytelling() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const textSlides = gsap.utils.toArray(".text-slide");
      const imgSlides = gsap.utils.toArray(".img-slide");

      // Set Initial States for ALL slides
      gsap.set(textSlides, { opacity: 0, y: 50 });
      gsap.set(imgSlides, { opacity: 0, scale: 0.85, y: 50 });

      // Initial Page Load Animation for Slide 1
      const introTl = gsap.timeline();
      introTl
        .to(
          textSlides[0],
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          0.2,
        )
        .to(
          imgSlides[0],
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
          0.2,
        );

      // The Main Scrolling Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${slideData.length * 120}%`,
          scrub: 1.5,
          pin: true,
          // onUpdate logic removed
        },
      });

      // Build the Sequence (Overlapping)
      for (let i = 1; i < slideData.length; i++) {
        const step = `step-${i}`;
        tl.addLabel(step);

        // Outgoing slide leaves
        tl.to(
          textSlides[i - 1],
          { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" },
          step,
        ).to(
          imgSlides[i - 1],
          {
            opacity: 0,
            y: -50,
            scale: 1.15,
            duration: 1,
            ease: "power2.inOut",
          },
          step,
        );

        // Incoming slide arrives simultaneously
        tl.fromTo(
          textSlides[i],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
          "<",
        );
        tl.fromTo(
          imgSlides[i],
          { opacity: 0, y: 50, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.inOut" },
          "<",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-[#070707] text-white flex flex-col md:flex-row overflow-hidden relative"
    >
      {/* Progress Indicator UI DIV REMOVED */}

      {/* IMAGE SECTION */}
      <div className="w-full h-[45%] md:w-1/2 md:h-full relative flex items-center justify-center p-6 md:p-12 order-1 md:order-2">
        <div className="relative w-full max-w-sm md:max-w-2xl aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-xl">
          {/* Ambient Background Glow */}
          {/* <div className="absolute inset-0 bg-primary/10 md:bg-primary/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none z-0" /> */}

          {slideData.map((slide) => (
            <img
              key={`img-${slide.id}`}
              src={slide.image}
              alt={slide.title || `Slide ${slide.id}`}
              className="img-slide absolute inset-0 w-full  h-full object-contain will-change-transform z-10"
            />
          ))}
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="w-full h-[55%] md:w-1/2 md:h-full relative flex items-start md:items-center justify-center px-6 md:pl-16 md:pr-8 order-2 md:order-1 pt-4 md:pt-0">
        {slideData.map((slide) => {
          const hasTextContent =
            slide.title ||
            slide.description ||
            (slide.point && slide.point[0]?.question);

          return (
            <div
              key={`text-${slide.id}`}
              className="text-slide absolute w-full max-w-xl px-4 md:px-0"
            >
              {hasTextContent && (
                <div className="flex flex-col justify-start md:justify-center h-full">
                  {slide.title && (
                    <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6 tracking-tight text-white leading-tight">
                      {slide.title}
                    </h2>
                  )}
                  {slide.description && (
                    <p className="text-base md:text-xl text-gray-400 mb-4 md:mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                  )}
                  {slide.point && slide.point.length > 0 && (
                    <div className="space-y-3 md:space-y-6">
                      {slide.point.map((p, i) => (
                        <div
                          key={i}
                          className={`border-l-2 md:border-l-4 border-primary pl-4 ${!p.question ? "hidden" : ""}`}
                        >
                          {p.question && (
                            <h3 className="text-base md:text-xl font-semibold text-primary mb-1 md:mb-2">
                              {p.question}
                            </h3>
                          )}
                          {p.answer && (
                            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                              {p.answer}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
