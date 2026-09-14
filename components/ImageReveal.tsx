"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ImageReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg w-full h-[300px] xs:h-[380px] md:h-[600px] bg-slate-100 group shadow-xl"
    >
      <motion.img
        alt="Ecorola Engineering Engineer Working"
        src="/images/01.jpg"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </motion.div>
  );
}
