"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Innovative Lift Systems",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/01.jpg",
  },
  {
    id: "gallery-2",
    title: "Advanced Customized Machinery",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/02.jpg",
  },
  {
    id: "gallery-3",
    title: "Modern Home Elevators",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/03.jpg",
  },
  {
    id: "gallery-4",
    title: "Industrial Freight Elevators",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/04.jpg",
  },
  {
    id: "gallery-5",
    title: "Double-Mast Stackers",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/05.jpg",
  },
  {
    id: "gallery-6",
    title: "EOT Crane Installations",
    image_url: "https://ecrolaengineering.com/assets/images/gallary/06.jpg",
  },
];

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);

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

  // Fetch gallery from Supabase
  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase.from("gallery").select("*");
        if (error) throw error;
        if (data && data.length > 0) {
          setGallery(data);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    }
    fetchGallery();
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
            <img src="https://ecrolaengineering.com/assets/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-9 sm:h-10 w-auto" />
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
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/products"
              >
                Products
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer border-b-2 border-primary"
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
              <Menu className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-surface z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="mobile-menu"
      >
        <button
          className="absolute top-4 right-4 text-primary p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-primary" />
        </button>
        <a
          className="font-headline-lg text-secondary"
          href="/"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </a>
        <a
          className="font-headline-lg text-secondary"
          href="/about"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </a>
        <a
          className="font-headline-lg text-secondary"
          href="/products"
          onClick={() => setMobileMenuOpen(false)}
        >
          Products
        </a>
        <a
          className="font-headline-lg text-primary"
          href="/gallery"
          onClick={() => setMobileMenuOpen(false)}
        >
          Gallery
        </a>
        <a
          className="font-headline-lg text-secondary"
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
        <section className="relative h-[400px] md:h-[500px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="Gallery Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white tracking-wider mb-4 drop-shadow-lg animate-fade-in">
              GALLERY
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-400">Gallery</span>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="py-20 bg-gray-50 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-blue-500 text-sm font-semibold text-center block mb-2 uppercase tracking-widest animate-fade-in">
                Our Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center uppercase tracking-wide">
                Discover Elevated Elegance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={item.image_url}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
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
              <img src="https://ecrolaengineering.com/assets/images/logo/02.png" alt="Ecrola Engineering Logo" className="h-12 w-auto" />
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
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="/products">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Our Products</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group font-semibold text-blue-400" href="/gallery">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
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
