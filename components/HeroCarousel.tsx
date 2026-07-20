"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  heading: string;
  subtext: string;
  image: string;
}

const slides: Slide[] = [
  {
    heading: "INNOVATION IS THE SPARK THAT SETS PROGRESS IN MOTION",
    subtext: "ECROLA Engineering Excellence in Machine Manufacturing, Shaping the Future with Innovation and Quality",
    image: "/images/01.jpg",
  },
  {
    heading: "DESIGN, BUILD, TEST, REPEAT: THE PATH TO PERFECTION",
    subtext: "Our quality and relentless innovation with machines, ECR Group delivers customized solutions, elevating industries across the world",
    image: "/images/02.jpg",
  },
  {
    heading: "PIONEERING PRECISION IN MACHINE MANUFACTURING",
    subtext: "ECROLA Engineering Delivering Efficiency, Reliability, and Unmatched Industrial Expertise Worldwide",
    image: "/images/03.jpg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative h-[100dvh] min-h-[500px] w-full bg-black overflow-hidden select-none flex items-center"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {/* Full-Bleed Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Standard Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
      </div>

      {/* Vertical Social Media Sidebar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6 hidden md:flex">
        <span className="text-white text-xs tracking-[0.3em] rotate-180 [writing-mode:vertical-rl] font-semibold">
          FOLLOW US
        </span>
        <div className="w-px h-16 bg-white/30" />
        <div className="flex flex-col items-center gap-5 text-white/60">
          <a href="#" aria-label="Facebook" className="hover:text-white transition-colors cursor-pointer">
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition-colors cursor-pointer">
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white transition-colors cursor-pointer">
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors cursor-pointer">
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 md:px-20 lg:px-24 xl:px-28 py-16 sm:py-24 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 text-xs sm:text-sm tracking-[0.25em] font-bold uppercase mb-4 block"
          >
            WELCOME TO ECROLA ENGINEERING
          </motion.span>

          <div className="min-h-[140px] sm:min-h-[180px] flex flex-col justify-center my-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white uppercase leading-[1.1] tracking-tight drop-shadow-md">
                  {slides[currentSlide].heading}
                </h1>
                <p className="text-slate-300 text-xs sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed font-normal">
                  {slides[currentSlide].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 sm:mt-10">
            <a
              href="/contact"
              className="w-full sm:w-auto bg-black/40 backdrop-blur-md text-white border border-white/30 hover:bg-black hover:border-blue-500 px-8 py-4 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider text-center active:scale-95 transition-all duration-300 shadow-lg"
            >
              ABOUT US
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto bg-black/40 backdrop-blur-md text-white border border-white/30 hover:bg-black hover:border-blue-500 px-8 py-4 rounded-md font-bold text-xs sm:text-sm uppercase tracking-wider text-center active:scale-95 transition-all duration-300 shadow-lg"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Standard Slider Controls) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 ${currentSlide === idx
              ? "w-10 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50"
              : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
