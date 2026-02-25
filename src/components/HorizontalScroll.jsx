import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import service1 from "../images/home/aps_systems_page.jpg";
import service2 from "../images/home/guard1.jpg";
import service3 from "../images/home/s.jpg";
import service4 from "../images/home/proton_bg.jpg";
import { ArrowUpRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Man Guarding",
    subtitle:
      "AP Securitas was incorporated in 1986  has offices across length & amp; breadth of the country.",
    img: service1,
  },
  {
    id: 2,
    title: "Survelliance",
    subtitle:
      "Aps Tech support Is one of the leading? Electronic security and surveillance solutions provider in India and is a part of APS group. ",
    img: service3,
  },
  {
    id: 3,
    title: "Traning",
    subtitle:
      "APS Training Academy The vertical of AP securitas was established in 2014. It provides solution of training, security, audit and consolation.",
    img: service2,
  },
  {
    id: 4,
    title: "Facility management ",
    subtitle:
      "Proton is a part of APS group and is one of the leading integrant facility management solution provider in the country ",
    img: service4,
  },
];

const HorizontalScroll = () => {
  const container = useRef(null);
  const slider = useRef(null);

  useGSAP(
    () => {
      let panels = gsap.utils.toArray(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          // Use a specific pixel value for better control
          end: () => "+=" + container.current.offsetWidth * (panels.length - 1),
          invalidateOnRefresh: true, // Crucial for responsive resizing
          anticipatePin: 1, // Smooths out the pinning jump
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-screen bg-[#050404] text-[white] overflow-hidden"
    >
      <div className="absolute md:top-32 top-6 left-12 z-10 ">
        <h3 className="text-sm uppercase tracking-widest border-b border-black pb-2">
          Main services
        </h3>
        <p className="text-2xl font-sans font-semibold">
          Leaders in Security,{" "}
          <span className="font-sans text-primary">
            {" "}
            Electronic <br /> Surveillance and Facility Management.{" "}
          </span>
        </p>
      </div>

      <div
        ref={slider}
        className="flex h-full"
        style={{ width: `${slides.length * 100}%` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="panel w-screen h-full flex items-center justify-center p-24 flex-shrink-0 relative"
          >
            {/* Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full h-full items-center pt-36 ">
              {/* Image Side */}
              <div className="md:h-[60vh] overflow-hidden relative group">
                <img
                  loading="lazy"
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>

              {/* Text Side */}
              <div className="space-y-4">
                <span className="text-9xl opacity-10 font-bold absolute top-20 right-20 pointer-events-none serif">
                  0{slide.id}
                </span>
                <h2 className="text-6xl md:text-8xl serif tracking-tighter">
                  {slide.title}
                </h2>
                <p className="text-xl uppercase ">{slide.subtitle}</p>
                {/* <p className="max-w-md text-black/60 pt-8 leading-relaxed">
                                    Harvested at peak ripeness to ensure a complex profile of deep cocoa, bright acidity, and a lingering floral finish.
                                </p> */}
                <div className="overflow-hidden pt-4 lg:pt-6 lg:pl-6">
                  <div className="mask-text inline-block">
                    <button className="group flex items-center gap-4 lg:gap-6 bg-white text-primary pl-6 lg:pl-10 pr-2 lg:pr-3 py-2 lg:py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-xl hover:shadow-primary/40">
                      <span className="font-bold text-xs lg:text-sm uppercase tracking-widest">
                        Learn Our History
                      </span>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowUpRight size={20} className="lg:w-6 lg:h-6" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
