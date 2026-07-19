"use client";

import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C0A0A] border-t border-zinc-900 text-slate-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto">
        {/* Column 1: Logo & Tagline */}
        <div className="space-y-6">
          <a className="flex items-center gap-2 transition-transform duration-300 hover:scale-102" href="/">
            <img src="/images/logo/02.png" alt="Ecrola Engineering Logo" className="h-11 w-auto" />
          </a>
          <p className="text-slate-400 text-sm leading-relaxed">
            Pioneering mechanical engineering solutions with cutting-edge technology and unmatched precision.
          </p>
          {/* Social Icons with micro-interactions */}
          <div className="flex items-center gap-4 mt-6">
            {[
              {
                aria: "Facebook",
                hoverBg: "hover:bg-blue-600",
                path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z",
              },
              {
                aria: "Twitter",
                hoverBg: "hover:bg-blue-400",
                path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
              },
              {
                aria: "YouTube",
                hoverBg: "hover:bg-red-600",
                path: "M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
              },
              {
                aria: "LinkedIn",
                hoverBg: "hover:bg-blue-700",
                path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className={`w-9 h-9 rounded-full bg-zinc-900 ${social.hoverBg} transition-all duration-300 flex items-center justify-center text-slate-400 hover:text-white hover:-translate-y-0.5 cursor-pointer shadow-md`}
                aria-label={social.aria}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Our Products", href: "/products" },
              { label: "Gallery", href: "/gallery" },
              { label: "Contact Us", href: "/contact" },
            ].map((link, idx) => (
              <li key={idx}>
                <a className="text-slate-400 hover:text-[#0f4c9c] transition-all flex items-center gap-2 group" href={link.href}>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#0f4c9c] group-hover:translate-x-0.5 transition-all duration-300" />
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">
            Our Products
          </h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: "elevator / lift", href: "/products" },
              { label: "customized machinery", href: "/products" },
              { label: "EOT Crane & Stacker", href: "/products" },
              { label: "Safe Lockers", href: "/products" },
            ].map((link, idx) => (
              <li key={idx}>
                <a className="text-slate-400 hover:text-[#0f4c9c] transition-all uppercase flex items-center gap-2 group" href={link.href}>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#0f4c9c] group-hover:translate-x-0.5 transition-all duration-300" />
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-6">
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">
            Contact Info
          </h4>
          <div className="space-y-4.5 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4.5 h-4.5 text-[#0f4c9c]" />
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                  Phone Number
                </p>
                <p className="text-slate-400 font-medium">+91 8714 505551</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4.5 h-4.5 text-[#0f4c9c]" />
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                  Email address
                </p>
                <a href="mailto:info@ecrolaengineering.com" className="text-slate-400 hover:text-[#0f4c9c] font-medium transition-colors duration-300">
                  info@ecrolaengineering.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4.5 h-4.5 text-[#0f4c9c]" />
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[10px] mb-0.5">
                  Location
                </p>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Ecrola Engineering, Phase 2, 2nd floor, HiLiTE Business Park Kozhikode, Kerala, 673014
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-900 bg-[#060505] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="font-medium">
            © 2026 Ecrola Engineering. All rights reserved. &bull; <a href="/admin" className="hover:text-[#0f4c9c] transition-colors duration-300">Admin Portal</a>
          </div>
          <div className="font-medium text-slate-600">
            Designed by Arshal sallu
          </div>
        </div>
      </div>
    </footer>
  );
}
