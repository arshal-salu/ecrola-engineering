"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg w-full h-[400px] md:h-[600px] bg-slate-100"
    >
      {/* Standard img tag (avoids Next.js server-side image fetching issues) */}
      <img
        alt="Ecorola Engineering Engineer Working"
        src="/images/01.jpg"
        className="w-full h-full object-cover"
      />

      {/* Blue sliding overlay (renders unconditionally to cover the image initially) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={isInView ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-blue-600 z-10"
      />

      {/* Black Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 bg-black/90 p-6 z-20 max-w-sm border-t border-r border-slate-800 rounded-tr-lg"
      >
        <p className="text-[#eceded] text-base md:text-lg font-medium leading-relaxed">
          Leading Innovators in Lift &amp; Machinery Manufacturing
        </p>
        <a
          href="/about"
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded text-sm mt-3 font-semibold hover:bg-blue-600 transition-colors"
        >
          Read More
          <ArrowRight size={16} className="text-white" />
        </a>
      </motion.div>
    </div>
  );
}
