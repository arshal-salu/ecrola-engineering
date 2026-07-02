"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  image: string;
}

const baseProducts: ProductItem[] = [
  { id: "1", name: "EOT Crane", image: "https://ecrolaengineering.com/assets/images/project/11.jpg" },
  { id: "2", name: "Safe Lockers", image: "https://ecrolaengineering.com/assets/images/project/12.jpg" },
  { id: "3", name: "Home Elevator", image: "https://ecrolaengineering.com/assets/images/project/03.jpg" },
  { id: "4", name: "Advanced Machinery", image: "https://ecrolaengineering.com/assets/images/project/13.jpg" },
];

// Clone first 3 items to the end for smooth infinite loop
const products: ProductItem[] = [
  ...baseProducts,
  ...baseProducts.slice(0, 3).map((item, idx) => ({ ...item, id: `clone-${idx}` })),
];

export default function MajorProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isPaused = useRef(false);

  const totalItems = baseProducts.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  // Handle infinite loop reset without visible glitch
  useEffect(() => {
    if (currentIndex >= totalItems) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, totalItems]);

  // Auto-slide every 3 seconds with pause-on-hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-50 py-16 px-0 select-none" id="gallery">
      <div className="max-w-full px-4 md:px-8 mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block font-semibold mb-1">
              OUR PRODUCTS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase">
              OUR MAJOR PRODUCTS
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer active:scale-95 z-10"
              aria-label="Previous product"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer active:scale-95 z-10"
              aria-label="Next product"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="overflow-hidden w-full relative"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          <div
            className="carousel-track"
            style={{
              "--carousel-index": currentIndex,
              transition: isTransitioning
                ? "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)"
                : "none",
            } as React.CSSProperties}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.75rem)] h-[280px] md:h-[320px] rounded-lg overflow-hidden relative group cursor-pointer flex-shrink-0 bg-gray-200"
              >
                {/* Edge-to-Edge Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                  loading="eager"
                />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

                {/* Title */}
                <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg drop-shadow-md z-20">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
