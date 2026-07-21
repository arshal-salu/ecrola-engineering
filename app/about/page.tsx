"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Users, Package, Flag, Award, CheckCircle2, Briefcase, Calendar, ChevronRight, Phone, Mail, MapPin, Check, Sparkles, Cpu, Clock, Layers, ShieldCheck, ArrowUp, Headphones, PenTool, Globe, FileCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";

// Animated stats counter component using framer-motion useInView
function StatCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
        setShowSuffix(true);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}{showSuffix ? "+" : ""}
    </span>
  );
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(0);

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("main-nav");
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add("bg-white/90", "shadow-lg", "backdrop-blur-2xl");
          nav.classList.remove("bg-white/70", "backdrop-blur-xl");
        } else {
          nav.classList.add("bg-white/70", "backdrop-blur-xl");
          nav.classList.remove("bg-white/90", "shadow-lg", "backdrop-blur-2xl");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TopNavBar */}
      <header
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-md transition-all duration-300"
        id="main-nav"
      >
        <div className="w-full flex justify-between items-center h-16 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
          {/* Logo */}
          <a className="flex items-center gap-2" href="/">
            <img src="/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-9 sm:h-10 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/"
              >
                Home
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer border-b-2 border-primary"
                href="/about"
              >
                About
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/products"
              >
                Products
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/gallery"
              >
                Gallery
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/contact"
              >
                Contact
              </a>
            </nav>
            <a
              href="/contact"
              className="bg-primary text-white px-5 py-2 rounded-md font-label-md text-xs uppercase tracking-wider active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 btn-slide-up"
            >
              SEND MESSAGE
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              className="text-primary p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-surface z-[60] flex flex-col items-center justify-center gap-8 overflow-y-auto transition-transform duration-300 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        id="mobile-menu"
      >
        <button
          className="absolute top-4 right-4 text-primary p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <a
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
          href="/"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </a>
        <a
          className="text-2xl font-bold text-primary"
          href="/about"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </a>
        <a
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
          href="/products"
          onClick={() => setMobileMenuOpen(false)}
        >
          Products
        </a>
        <a
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
          href="/gallery"
          onClick={() => setMobileMenuOpen(false)}
        >
          Gallery
        </a>
        <a
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
          href="/contact"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </a>
        <a
          href="/contact"
          className="bg-primary text-white px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-wider transition-all duration-200 btn-slide-up"
          onClick={() => setMobileMenuOpen(false)}
        >
          SEND MESSAGE
        </a>
      </div>

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="About Us Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-wider mb-4 drop-shadow-lg animate-fade-in">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-400">About</span>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left Column: 40% Width Image & Button */}
              <div className="w-full lg:w-[40%] flex flex-col gap-6">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="/images/04.jpg"
                    alt="Lift & Machinery Experts"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                {/* ECROLA Profile Button */}
                <div>
                  <a
                    href="#"
                    className="inline-block bg-primary text-white px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-wider active:scale-95 transition-all duration-200 btn-slide-up w-full text-center"
                  >
                    ECROLA PROFILE
                  </a>
                </div>
              </div>

              {/* Right Column: 60% Width Content */}
              <div className="w-full lg:w-[60%] space-y-6">
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontFamily: "var(--font-primary)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#0C0A0A"
                    }}
                    className="block"
                  >
                    LIFT & MACHINERY EXPERTS
                  </span>
                  <h2
                    className="font-semibold text-2xl sm:text-3xl md:text-[48px] leading-tight md:leading-[58px] text-[#0C0A0A] mt-3"
                  >
                    Innovative Solutions <br className="hidden sm:inline" />
                    for Modern <br className="hidden sm:inline" />
                    Lifts & Machinery.
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: "var(--font-size-b2)",
                    lineHeight: "var(--line-height-b2)",
                    fontWeight: "var(--p-regular)",
                    color: "var(--color-body)",
                    margin: "0 0 40px"
                  }}
                >
                  At ECROLA Engineering, we specialize in revolutionizing the lift and machinery industry with cutting-edge technology, expert craftsmanship, and customized solutions. We design and manufacture lifts, EOC cranes, stackers, and unique hidden lockers that redefine efficiency and style in every space. Our commitment to innovation drives us to continuously enhance our products, ensuring they meet the highest safety and performance standards. With a dedicated team of professionals, we tailor each project to suit commercial, industrial, and residential needs, providing reliable and durable machinery solutions that elevate everyday operations. Experience the future of lift technology with ECROLA Engineering, where quality meets innovation.
                </p>

                {/* 2-Column Grid of features with tick sign */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  {[
                    "Top Quality Manufacturing",
                    "Custom Lift Designs",
                    "Professional Expertise",
                    "Innovative Machinery Solutions",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span
                        style={{
                          marginBottom: 0,
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "27px",
                          color: "#0C0A0A",
                          fontFamily: "var(--font-primary)"
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-[#1a1f2e] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: 50% Width Image Container */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full aspect-square relative rounded-lg overflow-hidden shadow-2xl group"
              >
                <img
                  src="https://ecrolaengineering.com/assets/images/service/13.jpg"
                  alt="Why Choose Ecrola"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Diagonal stripes and gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 10px, transparent 10px, transparent 20px)'
                  }}
                />
              </motion.div>

              {/* Right Column: 50% Width Content */}
              <div className="w-full space-y-6">
                <div>
                  <span className="text-blue-400 text-xs font-semibold tracking-widest block uppercase">
                    CORE FEATURES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">
                    Why Choose Ecrola
                  </h2>
                </div>

                {/* Features Grid */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {[
                    {
                      title: "Innovative Lift Solutions",
                      icon: ArrowUp
                    },
                    {
                      title: "State-of-the-Art Machinery",
                      icon: Settings
                    },
                    {
                      title: "24/7 Expert Support",
                      icon: Headphones
                    },
                    {
                      title: "Customized Lift Designs",
                      icon: PenTool
                    },
                    {
                      title: "Quality Assurance",
                      icon: ShieldCheck
                    },
                    {
                      title: "On-Time Project Delivery",
                      icon: Clock
                    }
                  ].map((feat, idx) => {
                    const IconComponent = feat.icon;
                    const isActive = activeCard === idx;
                    return (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                        }}
                        key={idx}
                        className={`aspect-square flex flex-col items-center justify-center text-center p-4 rounded-lg transition-all duration-300 cursor-pointer ${isActive
                          ? 'bg-blue-600 border-blue-600 shadow-xl scale-[1.03]'
                          : 'bg-transparent border border-gray-700 hover:border-blue-500'
                          }`}
                        onMouseEnter={() => setActiveCard(idx)}
                      >
                        <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-white mb-3 md:mb-4" />
                        <h3 className="text-white text-xs md:text-sm font-semibold leading-snug">
                          {feat.title}
                        </h3>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Service Section */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            {/* Headers */}
            <div className="mb-12">
              <h1
                style={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0C0A0A",
                  fontFamily: "var(--font-primary)"
                }}
                className="uppercase tracking-widest"
              >
                our service
              </h1>
              <h2
                className="font-semibold text-3xl sm:text-[48px] leading-tight sm:leading-[60px] text-[#0C0A0A] mt-2"
              >
                What We Offer
              </h2>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Safe Lockers",
                  image: "/images/12.jpg",
                  desc: "Protect your valuables with Ecoral’s safe lockers—secure, stylish, and built to safeguard what matters."
                },
                {
                  title: "EOT Crane Solutions",
                  image: "/images/11.jpg",
                  desc: "Efficient and reliable cranes for material handling and heavy-duty operations."
                },
                {
                  title: "Customized Home Elevator",
                  image: "/images/03 (1).jpg",
                  desc: "Bespoke home lift systems blending innovation, safety, and personalized design."
                }
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/5] cursor-pointer"
                >
                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Default subtle bottom dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Default Title */}
                  <div className="absolute bottom-6 left-6 right-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover Overlay containing full text & View Service CTA */}
                  <div className="absolute inset-0 bg-[#00236f]/90 flex flex-col justify-center items-center text-center p-8 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/95 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <span className="bg-white text-[#00236f] px-6 py-2 rounded-DEFAULT font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-200 shadow-lg">
                      view service
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="py-20 bg-[#0C0A0A] px-6 md:px-20 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  target: 8,
                  label: "Years of Experience. Urban design draws together the many standers of place-making",
                  icon: Award
                },
                {
                  target: 100,
                  label: "Projects completed Successfully. Urban design draws together the many standers of place-making",
                  icon: FileCheck
                },
                {
                  target: 30,
                  label: "Team members for Support. Urban design draws together the many standers of place-making",
                  icon: Users
                },
                {
                  target: 56,
                  label: "Countries. We Worked. Urban design draws together the many standers of place-making",
                  icon: Globe
                }
              ].map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="flex flex-col">
                    {/* Top Row: Icon circle + Big number */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-5xl font-bold text-white ml-4">
                        <StatCounter target={stat.target} />
                      </div>
                    </div>
                    {/* Bottom: Description */}
                    <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0C0A0A] border-t border-zinc-900 text-slate-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-20 py-20 max-w-7xl mx-auto">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <a className="flex items-center gap-2" href="#">
              <img src="/images/logo/02.png" alt="Ecrola Engineering Logo" className="h-12 w-auto" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              Pioneering mechanical engineering solutions with cutting-edge technology and unmatched precision.
            </p>
            <div className="flex items-center gap-4 mt-4 justify-center lg:justify-start">
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-blue-600 transition-all flex items-center justify-center text-slate-400 hover:text-white" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-blue-400 transition-all flex items-center justify-center text-slate-400 hover:text-white" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-red-600 transition-all flex items-center justify-center text-slate-400 hover:text-white" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-blue-700 transition-all flex items-center justify-center text-slate-400 hover:text-white" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-lg uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group font-semibold text-blue-400" href="/about">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Our Products</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/#gallery">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Gallery</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/#contact">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div>
            <h4 className="font-bold text-white text-lg uppercase tracking-wider mb-6">
              Our Products
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all uppercase flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>elevator /lift</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all uppercase flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>customized machinery</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all uppercase flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>EOT Crane& Stacker Machines</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all uppercase flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Safe Lockers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-white text-lg uppercase tracking-wider mb-6">
              Contact Info
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
                    Phone Number
                  </p>
                  <p className="text-slate-400">+91 8714 505551</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
                    Email address
                  </p>
                  <a href="mailto:info@ecrolaengineering.com" className="text-slate-400 hover:text-blue-400 transition-all">
                    info@ecrolaengineering.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
                    Location
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Ecrola Engineering Phase 2,2nd floor, HiLiTE Business Park Kozhikode,Pantheeramkavu, Kerala,673014
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 bg-black/40 py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div>
              © 2024 Ecrola Engineering. All rights reserved.
            </div>
            <div>
              Designed by Arshal sallu
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
