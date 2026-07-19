"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Users, Package, Flag, Award, CheckCircle2, Briefcase, Calendar, ChevronRight, Phone, Mail, MapPin, Check, Sparkles, Cpu, Clock, Layers, ShieldCheck, ArrowUp, Headphones, PenTool, Globe, FileCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [activeCard, setActiveCard] = useState<number>(0);

  return (
    <>
      <Header activePage="about" />

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="About Us Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-tight mb-4 drop-shadow-lg">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-500">About</span>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[#fafbfc] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left Column: 40% Width Image & Button */}
              <div className="w-full lg:w-[40%] flex flex-col gap-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
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
                    className="inline-block bg-[#0f4c9c] hover:bg-[#0c3e80] text-white py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 w-full text-center shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                  >
                    ECROLA PROFILE
                  </a>
                </div>
              </div>

              {/* Right Column: 60% Width Content */}
              <div className="w-full lg:w-[60%] space-y-6">
                <div>
                  <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] block uppercase">
                    LIFT & MACHINERY EXPERTS
                  </span>
                  <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] leading-tight text-[#0C0A0A] mt-3 tracking-tight">
                    Innovative Solutions <br className="hidden sm:inline" />
                    for Modern Lifts & Machinery.
                  </h2>
                </div>

                <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mt-4 mb-8">
                  At ECROLA Engineering, we specialize in revolutionizing the lift and machinery industry with cutting-edge technology, expert craftsmanship, and customized solutions. We design and manufacture lifts, EOC cranes, stackers, and unique hidden lockers that redefine efficiency and style in every space. Our commitment to innovation drives us to continuously enhance our products, ensuring they meet the highest safety and performance standards. With a dedicated team of professionals, we tailor each project to suit commercial, industrial, and residential needs, providing reliable and durable machinery solutions that elevate everyday operations. Experience the future of lift technology with ECROLA Engineering, where quality meets innovation.
                </p>

                {/* 2-Column Grid of features with tick sign */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {[
                    "Top Quality Manufacturing",
                    "Custom Lift Designs",
                    "Professional Expertise",
                    "Innovative Machinery Solutions",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-transparent py-1">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />
                      </div>
                      <span className="font-bold text-sm sm:text-base text-slate-800">
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
        <section className="py-20 md:py-24 lg:py-28 bg-[#0A0A0A] relative overflow-hidden border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: 50% Width Image Container */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-2xl group border border-white/5"
              >
                <img
                  src="https://ecrolaengineering.com/assets/images/service/13.jpg"
                  alt="Why Choose Ecrola"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Diagonal stripes and gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 10px, transparent 10px, transparent 20px)'
                  }}
                />
              </motion.div>

              {/* Right Column: 50% Width Content */}
              <div className="w-full space-y-6">
                <div>
                  <span className="text-blue-500 text-xs font-bold tracking-[0.2em] block uppercase mb-3">
                    CORE FEATURES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-8 tracking-tight">
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
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
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
                        className={`aspect-square flex flex-col items-center justify-center text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${isActive
                            ? 'bg-[#0f4c9c] border-[#0f4c9c] shadow-xl scale-[1.03] text-white'
                            : 'bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/10 text-slate-300'
                          }`}
                        onMouseEnter={() => setActiveCard(idx)}
                      >
                        <IconComponent className={`w-8 h-8 md:w-10 md:h-10 mb-4 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-blue-500'}`} />
                        <h3 className="text-xs md:text-sm font-bold leading-snug uppercase tracking-wider">
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
        <section className="py-20 md:py-24 lg:py-28 bg-white relative border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            {/* Headers */}
            <div className="mb-12">
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] block uppercase mb-3">
                OUR SERVICES
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] leading-tight text-[#0C0A0A] mt-2 tracking-tight">
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
                  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5] cursor-pointer"
                >
                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Default subtle bottom dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300" />

                  {/* Default Title */}
                  <div className="absolute bottom-6 left-6 right-6 transition-all duration-300 group-hover:translate-y-[-10px]">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover Overlay containing full text & View Service CTA */}
                  <div className="absolute inset-0 bg-[#0f4c9c]/90 flex flex-col justify-center items-center text-center p-8 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <span className="bg-white text-[#0f4c9c] px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-200 shadow-md">
                      VIEW SERVICE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="py-20 md:py-24 bg-[#0C0A0A] px-6 md:px-20 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  target: 8,
                  label: "Years of Experience. Leading with technology and passion.",
                  icon: Award
                },
                {
                  target: 100,
                  label: "Projects completed successfully with global client satisfaction.",
                  icon: FileCheck
                },
                {
                  target: 30,
                  label: "Team members dedicated to engineering breakthroughs.",
                  icon: Users
                },
                {
                  target: 56,
                  label: "Projects Delivered. Spanning cities and industries.",
                  icon: Globe
                }
              ].map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-[#0f4c9c]/50 transition-all duration-300">
                    {/* Top Row: Icon + Big number */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-[#0f4c9c]/20 border border-[#0f4c9c]/30 flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="text-4xl font-black text-white ml-4">
                        <StatCounter target={stat.target} />
                      </div>
                    </div>
                    {/* Bottom: Description */}
                    <p className="text-xs font-semibold text-slate-400 mt-4 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
