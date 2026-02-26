import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

// reuse the slides from AccordionSlider to keep content in sync
import { slides } from "../AccordionSlider";

// transform slides into the shape HomeBanner expects
const destinations = slides.map((s) => ({
  image: s.image,
  location: s.title,
  tagline: s.label,
  description: s.description,
  highlights: [],
  rating: "", // no rating for these slides
  icon: s.icon,
}));

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
      setImageLoaded(false);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    setImageLoaded(false);
    const timer = setTimeout(() => setImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const current = destinations[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-full h-full transition-transform duration-[8000ms] ease-out ${
                index === currentSlide && imageLoaded
                  ? "scale-110"
                  : "scale-100"
              }`}
            >
              <img
                src={dest.image}
                alt={dest.location}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" /> */}
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-between px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          {/* Rating Badge */}
          {current.rating && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 transition-all duration-700 ${
                imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-white font-semibold">{current.rating}</span>
              <span className="text-white/70 text-sm">Rated Destination</span>
            </div>
          )}

          {/* Location with Icon */}
          <div
            className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
              imageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {current.icon ? (
              React.cloneElement(current.icon, {
                className: "w-8 h-8 text-primary",
              })
            ) : (
              <MapPin className="w-8 h-8 text-primary" />
            )}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
              {current.location}
            </h1>
          </div>

          {/* Tagline */}
          <p
            className={`text-2xl sm:text-3xl lg:text-4xl text-primary font-light mb-6 transition-all duration-700 ${
              imageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {current.tagline}
          </p>

          {/* Description */}
          <p
            className={`text-lg sm:text-xl text-white/80 mb-8 max-w-xl leading-relaxed transition-all duration-700 ${
              imageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {current.description}
          </p>

          {/* Highlights */}
          {current.highlights && current.highlights.length > 0 && (
            <div
              className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${
                imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              {current.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm hover:bg-white/10 transition-colors"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              imageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <button className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden hover:bg-primary/90 transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <FaPhoneAlt className="w-5 h-5" />
                <Link to="tel:+ +919911498262">Book Your Service </Link>
              </span>
            </button>
            {/* <Link to="mailto:info@risezonictravel.com">
              {" "}
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all hover:scale-105">
                Explore More
              </button>
            </Link> */}
          </div>
        </div>

        {/* Right Side - Thumbnail Preview (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-col gap-4">
          {destinations.map((dest, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentSlide
                  ? "ring-4 ring-yellow-500 scale-110"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={dest.image}
                alt={dest.location}
                className="w-full h-full object-cover"
              />
              {index === currentSlide && (
                <div className="absolute inset-0 border-2 border-white/50" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next destination"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentSlide + 1) / destinations.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {destinations.map((dest, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to ${dest.location}`}
                >
                  <div
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-16 h-3 bg-primary"
                        : "w-3 h-3 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                  {index !== currentSlide && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {dest.location}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="text-white/80 font-light text-sm">
              <span className="text-2xl font-bold text-white">
                {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <span className="mx-2">/</span>
              <span>{String(destinations.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-6 sm:right-12 w-px h-24 bg-gradient-to-b from-primary to-transparent" />
    </div>
  );
}
