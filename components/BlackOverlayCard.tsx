"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BlackOverlayCardProps {
  title?: string;
  buttonText?: string;
  href?: string;
}

export default function BlackOverlayCard({
  title = "Leading Innovators in Lift & Machinery Manufacturing",
  buttonText = "Read More",
  href = "#about"
}: BlackOverlayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute bottom-0 left-0 bg-black/90 backdrop-blur-sm p-6 md:p-8 w-[90%] sm:w-full max-w-sm z-30 border-t border-r border-slate-800 rounded-tr-lg rounded-br-lg"
    >
      <p className="text-[#eceded] text-base md:text-lg font-medium leading-relaxed">
        {title}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={href}
          className="flex items-center gap-3 group"
        >
          <span className="text-white text-sm font-medium hover:underline">
            {buttonText}
          </span>
          <span className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
            <ArrowRight size={16} color="white" />
          </span>
        </a>
      </div>
    </motion.div>
  );
}
