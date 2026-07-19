"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

interface HeaderProps {
  activePage: "home" | "about" | "products" | "gallery" | "contact" | "admin";
}

export default function Header({ activePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/about", id: "about" },
    { name: "Products", href: "/products", id: "products" },
    { name: "Gallery", href: "/gallery", id: "gallery" },
    { name: "Contact", href: "/contact", id: "contact" },
  ];

  return (
    <>
      {/* Sticky Navigation Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md shadow-slate-100/50 backdrop-blur-md h-16 border-b border-slate-100"
            : "bg-white/80 backdrop-blur-sm h-20 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo */}
          <a className="flex items-center gap-2 transition-transform duration-300 hover:scale-102" href="/">
            <img src="/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-8 sm:h-9 w-auto" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`font-semibold text-xs uppercase tracking-widest transition-colors duration-300 nav-link-underline py-1.5 ${
                      isActive
                        ? "text-[#0f4c9c] after:scale-x-100 after:origin-bottom-left"
                        : "text-slate-800 hover:text-[#0f4c9c]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
            <a
              href="/contact"
              className="bg-[#0f4c9c] text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#0c3e80] hover:shadow-lg hover:shadow-[#0f4c9c]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              SEND MESSAGE
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              className="text-[#0f4c9c] p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Premium Slide-Out Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[60] flex flex-col justify-between p-6 transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        {/* Top bar inside menu */}
        <div className="flex justify-between items-center w-full">
          <img src="/images/logo/02.png" alt="Logo" className="h-8 w-auto brightness-110" />
          <button
            className="text-white hover:text-red-400 p-2 border border-white/10 hover:border-red-400/20 rounded-full transition-all duration-300 hover:rotate-90 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col gap-6 my-auto max-w-sm mx-auto w-full text-center">
          {navLinks.map((link, index) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-2xl font-bold uppercase tracking-wider py-2 transition-all duration-300 ${
                  isActive ? "text-[#3b82f6] scale-105" : "text-white/80 hover:text-white"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="/contact"
            className="bg-[#0f4c9c] text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#0c3e80] shadow-lg shadow-[#0f4c9c]/30 text-sm mt-4 inline-block text-center cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            SEND MESSAGE
          </a>
        </div>

        {/* Bottom bar inside menu */}
        <div className="text-center text-xs text-white/40 border-t border-white/5 pt-4">
          <p>© 2026 Ecrola Engineering. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
