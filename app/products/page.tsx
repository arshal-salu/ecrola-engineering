"use client";

import { useState, useEffect } from "react";
import { Settings, Users, Package, Flag, Award, CheckCircle2, Briefcase, Calendar, ChevronRight, Phone, Mail, MapPin, Check, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  return (
    <>
      <Header activePage="products" />

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="Products Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-tight mb-4 drop-shadow-lg animate-fade-in">
              PRODUCTS
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-500">Products</span>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[#fafbfc] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="text-center mb-16">
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
                OUR PRODUCTS
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#0C0A0A] uppercase tracking-tight">
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
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 group cursor-pointer relative flex flex-col justify-between elevate-card"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img
                        alt={displayName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={imageUrl}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-bold text-xl text-[#0C0A0A] group-hover:text-[#0f4c9c] transition-colors duration-300 mb-3">
                          {displayName}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
                          {displayDesc}
                        </p>
                      </div>
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center bg-[#0f4c9c]/10 text-[#0f4c9c] hover:bg-[#0f4c9c] hover:text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer"
                      >
                        INQUIRE NOW
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global Services Section */}
        <section className="bg-white py-20 md:py-24 lg:py-28 px-6 md:px-20 lg:px-24 overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto bg-[#fafbfc] border border-slate-100 p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div className="flex flex-col">
                {/* Header */}
                <div className="flex flex-col mb-10">
                  <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
                    Ecorola Global Services
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-10 leading-tight uppercase tracking-tight">
                    We know how to <br />manage business <br />globally
                  </h2>
                </div>

                {/* Timeline List */}
                <div className="relative pl-2">
                  {/* Vertical Dotted Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-200 z-0" />

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
                            <div className="w-4 h-4 border-2 border-slate-300 rounded-full bg-white transition-colors group-hover:border-[#0f4c9c]" />

                            {/* Active Dot with layoutId for smooth transition */}
                            {isActive && (
                              <motion.div
                                layoutId="activeTimelineDot"
                                className="absolute w-4 h-4 bg-[#0f4c9c] rounded-full scale-125 shadow-lg shadow-[#0f4c9c]/50 z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div>
                            <h4 className={`text-lg md:text-xl font-bold transition-colors duration-200 ${isActive ? 'text-[#0f4c9c]' : 'text-gray-900 group-hover:text-gray-700'}`}>
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
                                  <p className="text-slate-500 font-medium text-sm sm:text-base mt-2 leading-relaxed">
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
              <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[450px] md:h-[620px] relative shadow-xl border border-slate-100">
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

      <Footer />
    </>
  );
}
