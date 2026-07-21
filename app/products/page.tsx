"use client";

import { useState, useEffect } from "react";
import { Settings, Users, Package, Flag, Award, CheckCircle2, Briefcase, Calendar, ChevronRight, Phone, Mail, MapPin, Check, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductItem {
  name: string;
  image: string;
  description: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    name: "Home Elevator / Lift",
    image: "https://ecrolaengineering.com/assets/images/project/03.jpg",
    description: "Bespoke home lift systems blending innovation, safety, and personalized design to elevate modern living."
  },
  {
    name: "Advanced Customized Machinery",
    image: "https://ecrolaengineering.com/assets/images/project/13.jpg",
    description: "Tailored industrial machinery solutions engineered for optimal performance, durability, and customized workflows."
  },
  {
    name: "EOT Crane Solutions",
    image: "https://ecrolaengineering.com/assets/images/project/11.jpg",
    description: "Efficient and reliable overhead traveling cranes designed for heavy-duty material handling and warehouse operations."
  },
  {
    name: "Safe Lockers",
    image: "https://ecrolaengineering.com/assets/images/project/12.jpg",
    description: "State-of-the-art secure safe lockers built with robust materials to protect your assets and valuables."
  },
];

export default function ProductsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

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
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/about"
              >
                About
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer border-b-2 border-primary"
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
        className={`mobile-menu-custom lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
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
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
          href="/about"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </a>
        <a
          className="text-2xl font-bold text-primary"
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
            alt="Products Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-wider mb-4 drop-shadow-lg animate-fade-in">
              PRODUCTS
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-400">Product</span>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="text-center mb-12">
              <span className="text-blue-500 text-sm font-semibold text-center block mb-2 uppercase tracking-widest">
                Our Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Explore Our Valuable Products
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4].map((index) => {
                const projectImages = [
                  "/images/01 (1).jpg",
                  "/images/02.jpg",
                  "/images/03 (1).jpg",
                  "/images/11.jpg",
                  "/images/12.jpg"
                ];
                const projectNames = [
                  "Innovative Lift Systems",
                  "Advanced Machinery",
                  "Custom Home Elevators",
                  "EOT Crane & Stackers",
                  "Industrial Elevator"
                ];
                const projectDescriptions = [
                  "High-performance elevators designed for optimal functionality and modern aesthetics",
                  "Durable machinery tailored to meet the highest standards in industrial environments.",
                  "Bespoke home lift systems blending innovation, safety, and personalized design.",
                  "Optimize operations with Ecoral’s EOT cranes and stackers—durable, efficient, and customized for your lifting needs",
                  "Boost efficiency with Ecoral's industrial elevators—reliable, robust, and tailored to your operational service and needs"
                ];

                const imageUrl = projectImages[index];
                const displayName = projectNames[index];
                const displayDesc = projectDescriptions[index];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="bg-white rounded-lg overflow-hidden border border-transparent shadow-sm hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group cursor-pointer relative flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        alt={displayName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={imageUrl}
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mt-4 px-6">
                        {displayName}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 px-6 line-clamp-3 flex-grow">
                        {displayDesc}
                      </p>
                      <div className="px-6 pb-6 mt-4">
                        <a
                          href="/#contact"
                          className="inline-block bg-white text-primary border border-primary px-6 py-2 rounded-DEFAULT text-xs font-bold uppercase tracking-wider text-center active:scale-95 transition-all duration-200 btn-slide-up hover:text-white"
                        >
                          CONTACT US
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Services Section */}
        <section className="bg-gray-50 pt-0 pb-28 px-6 md:px-20 lg:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto bg-white p-6 sm:p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

              <div className="flex flex-col">
                {/* Header */}
                <div className="flex flex-col mb-10">
                  <span className="text-gray-500 text-base font-bold tracking-wider uppercase">
                    Ecorola Global Services
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-10 leading-tight">
                    We know how to <br />manage business <br />globally
                  </h2>
                </div>

                {/* Timeline List */}
                <div className="relative pl-2">
                  {/* Vertical Dotted Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-gray-300 z-0" />

                  <div className="space-y-6">
                    {[
                      {
                        title: "Expertise in global elevator solutions.",
                        desc: "We provide specialized knowledge in elevator systems, offering innovative solutions for diverse international building requirements and standards",
                      },
                      {
                        title: "Facilitating seamless vertical transportation growth.",
                        desc: "Our services ensure smooth integration and expansion of elevator systems, enhancing efficiency and accessibility in all types of properties",
                      },
                      {
                        title: "Tailored solutions for every building need.",
                        desc: "We customize elevator systems to meet the unique requirements of residential, commercial, and industrial buildings, ensuring optimal performance and design",
                      },
                      {
                        title: "Advanced elevator systems and maintenance services.",
                        desc: "Offering cutting-edge elevator technologies and comprehensive maintenance plans, we ensure your systems operate reliably and stay up to date with industry standards",
                      },
                      {
                        title: "Efficient project management and installation.",
                        desc: "From planning to execution, our project management team oversees every detail, ensuring timely and precise installation of elevator systems",
                      },
                    ].map((item, index) => {
                      const isActive = index === activeTimelineIndex;
                      return (
                        <div
                          key={index}
                          onClick={() => setActiveTimelineIndex(index)}
                          className="pl-8 relative cursor-pointer select-none group flex flex-col mb-4"
                        >
                          {/* Dot Placeholder */}
                          <div className="absolute left-0 top-1.5 flex items-center justify-center w-[16px] h-[16px]">
                            {/* Inactive Dot */}
                            <div className="w-4 h-4 border-2 border-orange-500 rounded-full bg-white transition-colors group-hover:border-orange-600" />

                            {/* Active Dot with layoutId for smooth transition */}
                            {isActive && (
                              <motion.div
                                layoutId="activeTimelineDot"
                                className="absolute w-4 h-4 bg-blue-600 rounded-full scale-125 shadow-lg shadow-blue-500/50 z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div>
                            <h4 className={`text-lg md:text-xl font-bold transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-900 group-hover:text-gray-700'}`}>
                              {item.title}
                            </h4>

                            <AnimatePresence initial={false}>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-gray-600 text-base mt-2 leading-relaxed">
                                    {item.desc}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Image container */}
              <div className="rounded-lg overflow-hidden h-[300px] sm:h-[450px] md:h-[620px] relative shadow-lg">
                <img
                  src="/images/H-services1.jpg"
                  alt="Global Services"
                  className="w-full h-full object-cover"
                />
              </div>

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
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/about">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group font-semibold text-blue-400" href="/products">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
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
