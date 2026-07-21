"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import BlackOverlayCard from "@/components/BlackOverlayCard";
import ImageReveal from "@/components/ImageReveal";
import MajorProductsCarousel from "@/components/MajorProductsCarousel";
import HeroCarousel from "@/components/HeroCarousel";
import { Settings, Users, Package, Flag, Award, CheckCircle, CheckCircle2, Briefcase, Calendar, ChevronRight, Phone, Mail, MapPin } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
}

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
}

// Fallback data in case Supabase is empty
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "default-1",
    name: "High-Precision Turbines",
    description: "Aerospace grade components designed for maximum efficiency and thermal resistance in extreme conditions.",
    image_url: "https://ecrolaengineering.com/assets/images/project/01.jpg",
  },
  {
    id: "default-2",
    name: "Automated Robotics",
    description: "State-of-the-art manufacturing automation solutions including robotic arms and integrated control systems.",
    image_url: "https://ecrolaengineering.com/assets/images/project/02.jpg",
  },
  {
    id: "default-3",
    name: "Industrial Valve Systems",
    description: "Heavy-duty fluid control systems engineered for harsh chemical and high-pressure subsea environments.",
    image_url: "https://ecrolaengineering.com/assets/images/project/03.jpg",
  },
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Precision Steel",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMbls6aDkpYNHjsWeomIQT7oYaPj_Aqg49f8VW41_6j47_mAi-qn4mTnPAvZATFpsT8IuGstyjaevoM99OxdSoTlAIkXoS5KjDlSc4bb8mffk_0DKy4j29jThoYS7dLsAvYaEu2U77dsV-AgeWKCBIYNHncAkwoxUJeu941mmVqiyjl7I08aZ8AmUXqfNJhbQJD_csubh-cnDvLPbBsBBH2LWZ9ECrq_2YxexPaF4-I10397TriiplzrZek6huhHnfzFZYiUwCIl8",
  },
  {
    id: "gallery-2",
    title: "High Pressure Valve",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0LrV_nuhGmeWJxcz4Alggme5ApMMfYdYOKXEx5dgtmRwWgLKhuMtzeMstkIphA3MZTK0BTJfaCoxfNNUkFDaXjhjtsH1cfbOSv1WhTmwzKfGsHTRktUSRHVCnjTrporcwFDiaIlXWCWQi6FAlEAWXW8D2faL3mutFkzi_R3imu_0WQ0QpirOZBS3KyaozaIntcOy5sKdqnSNYCgUK97Fhq3q6snqoEFkvlG_Zx7o8dl4FV6jzZh49KqvCFGAEUyTgC5p5JStr3Qs",
  },
  {
    id: "gallery-3",
    title: "Architectural Integrity",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC7BYYAH6SXKwSvsey0grP0jz5FMRSHucOm45WyiQkusDYu5dLdzp3usuGSml0CXswlSBIECE4BTYVpgTibVPBUnGN6K4qwW2Ryz6iUyzPpyAkA6BfwPuX_ItkDOvfbP9I2b3WcPMDKaXStbpKXXTZGyK4n9NkjfiSbzSG0zbulZrUsvMN9lLw6RBNuQv2mFTNVuGIuYJ5pIIhvHEo10z5py_cHrzGw6_S7p14OWICEJPX8q7UeTA3l2L_r_8WZL-zJ78RCdfajMo",
  },
  {
    id: "gallery-4",
    title: "Turbine Component",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiZW1oI57iZSLM69MlMFlh3DB51NPWbcGlOzskwjWlpUjE6EcXnhPIqK44rhUwTUi8791WfP1g3uu2nEPpajSUbQ8WRHnwSR-LGQ1fIodml-ZAppQe4rycu_-OBLyDBRHwCc3NBPYeGLI6jDYMiZkIEnPTxlHVxykX-4RzQmq05T6JVGDBFYprKP9XT2L7OOkmHDJRsUBV4Q3cDrFNH3J22xqlqzMzhe-5RkEDcTSU42VKHVlWhxWrWEwSsvzovv9z4dMgty9HjzQ",
  },
  {
    id: "gallery-5",
    title: "Robotic Precision",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Lygr8HFvB3yFFZYXq-MwMPfWw9_J5dAGdaBSX2JqrzAqiBtniqGWdj-b36eDxJ0LEArZlw6Y0RHd6Q6tbZ_P_Dv-2vUewwY9hQoEfe7RMJ0cS6cHY_x-UttloaaJZ7TIUUbg7kCggzpL-guHtNf7a2XUSAhBtx1RcLdcwEiQrZIYlQf4OwIoN-jxaw_35puktjBNMDNc4wdAeLqb0lb7rzTHtlVx8-ML7PUiuljBuof7CxahE7XDImdsBwyPjqOcpF_sD533nkE",
  },
];

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const totalMiliseconds = duration * 1000;
          const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Hero cycling text states
  const [currentLine, setCurrentLine] = useState(0);
  const heroLines = [
    "INNOVATION IS THE SPARK THAT SETS PROGRESS",
    "DESIGN. BUILD. TEST. REPEAT. THE PATH TO"
  ];

  // Background carousel state
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
    "https://img.freepik.com/premium-photo/piece-paper-with-gears-gears-it_1034303-453189.jpg",
    "https://thumbs.dreamstime.com/b/technical-blueprint-robot-arm-mechanical-details-futuristic-design-elements-ideal-showcasing-engineering-327721785.jpg",
    "https://as2.ftcdn.net/v2/jpg/07/12/73/43/1000_F_712734300_l86HY1dfL6WxCd7re6GtGmlYnxsYjdbd.jpg"
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentLine((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => {
      clearInterval(textTimer);
      clearInterval(bgTimer);
    };
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    place: "",
    option: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

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

  // Navigation menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetching data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const { data: fetchedProducts, error: productsError } = await supabase
          .from("products")
          .select("*");

        if (productsError) throw productsError;
        if (fetchedProducts && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }

        // Fetch gallery
        const { data: fetchedGallery, error: galleryError } = await supabase
          .from("gallery")
          .select("*");

        if (galleryError) throw galleryError;
        if (fetchedGallery && fetchedGallery.length > 0) {
          setGallery(fetchedGallery);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: null, message: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields (Name, Email, and message).",
      });
      setSubmitting(false);
      return;
    }

    try {
      const combinedMessage = `
Date: ${formData.date}
Location: ${formData.place}
Option/Service: ${formData.option}

Message:
${formData.message}
      `.trim();

      // Construct formatted message for WhatsApp (connected to 9895919742)
      const waText = `Hello Ecrola Engineering, I would like to book an appointment:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "N/A"}\n*Location:* ${formData.place || "N/A"}\n*Preferred Date:* ${formData.date || "N/A"}\n*Service Option:* ${formData.option || "N/A"}\n*Message:* ${formData.message}`;
      const waUrl = `https://wa.me/919895919742?text=${encodeURIComponent(waText)}`;

      // Insert record into Supabase database
      await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: combinedMessage,
        },
      ]);

      setFormStatus({
        type: "success",
        message: "Redirecting to WhatsApp to send your appointment details...",
      });

      // Direct navigation guarantees mobile/desktop app opening without popup blocker
      window.location.href = waUrl;
    } catch (err: any) {
      console.error("Submission error:", err);
      setFormStatus({
        type: "error",
        message: err.message || "Failed to submit inquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* TopNavBar */}
      <header
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-md transition-all duration-300"
        id="main-nav"
      >
        <div className="w-full flex justify-between items-center h-16 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
          <a className="flex items-center gap-2" href="#">
            <img src="/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-9 sm:h-10 w-auto" />
          </a>

          {/* Menu items and button grouped together on the right */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/"
              >
                Home
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer"
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
        className={`fixed inset-0 bg-surface z-[60] flex flex-col items-center justify-start gap-6 pt-24 pb-12 overflow-y-auto transition-transform duration-300 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
          className="text-2xl font-bold text-primary"
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
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
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

      {/* Hero Section */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* Left Column - Image with Overlay (60% width) */}
            <div className="order-1 lg:order-1 w-full">
              <ImageReveal />
            </div>

            {/* Right Column - Content (40% width) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-2"
            >
              <span className="text-blue-500 text-sm font-semibold tracking-widest block uppercase">
                ABOUT US
              </span>
              <h2 className="font-bold text-3xl sm:text-[40px] leading-tight sm:leading-[50px] text-[#0C0A0A] uppercase mt-[5px] flex flex-col">
                <span className="block sm:whitespace-nowrap">EXCELLENCE IN EVERY</span>
                <span className="block sm:whitespace-nowrap">ENGINEERING PROJECT</span>
              </h2>
              <p className="text-gray-500 mt-4 text-base leading-relaxed">
                At Ecorola Engineering, we specialize in innovative lift solutions, custom machinery, and cutting-edge production facilities to transform spaces across commercial, industrial, and residential sectors.
              </p>

              {/* Stats Section */}
              <div className="flex flex-row gap-6 items-start flex-wrap mt-7 pt-6 border-t border-gray-100">
                {/* Left side stat */}
                <div className="flex flex-col min-w-[120px]">
                  <span
                    className="text-4xl sm:text-5xl font-bold leading-none"
                    style={{ color: "lab(28 21.42 -65.74)" }}
                  >
                    2017
                  </span>
                  <span className="text-xs font-semibold text-gray-600 uppercase mt-2 tracking-wider">
                    STARTED JOURNEY
                  </span>
                </div>

                {/* Right side points */}
                <div className="flex flex-col gap-3.5 flex-1 min-w-[200px]">
                  {[
                    "Reliable solutions anytime",
                    "Service for 8 years",
                    "Expert & Dedicated Team"
                  ].map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white p-0"
                    >
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: "lab(28 21.42 -65.74)" }}
                      />
                      <span className="text-gray-700 text-sm sm:text-base font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <a
                  href="#about"
                  className="inline-block bg-primary text-white px-7 py-3 rounded-md text-xs sm:text-sm font-semibold uppercase tracking-wider active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 btn-slide-up"
                >
                  ABOUT US
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-surface-container-low" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-16">
            <span className="font-semibold text-[16px] leading-[24px] tracking-[0.1em] text-[#0f4c9c] uppercase block">
              Our Speciality
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] leading-snug md:leading-[61px] text-[#0C0A0A] uppercase mt-[5px]">
              Exceptional Lift & Machinery Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map((product, index) => {
              const projectImages = [
                "/images/01 (1).jpg",
                "/images/02.jpg",
                "/images/03 (1).jpg",
              ];
              const projectNames = [
                "Innovative Lift Systems",
                "Advanced Machinery",
                "Custom Home Elevators",
              ];
              const projectDescriptions = [
                "High-performance elevators designed for optimal functionality and modern aesthetics",
                "Durable machinery tailored to meet the highest standards in industrial environments.",
                "Bespoke home lift systems blending innovation, safety, and personalized design.",
              ];

              const imageUrl = projectImages[index % projectImages.length];
              const displayName = projectNames[index % projectNames.length];
              const displayDesc = projectDescriptions[index % projectDescriptions.length];
              const displayNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200 overflow-hidden group transition-all duration-300"
                >
                  <a href="/products" className="relative block aspect-square overflow-hidden bg-slate-50">
                    <img
                      alt={displayName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={imageUrl}
                    />
                    {/* Blue background number corner badge */}
                    <div className="absolute top-4 left-4 bg-[#0f4c9c] text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-md z-10">
                      {displayNumber}
                    </div>
                  </a>
                  <div className="p-8">
                    <h3 className="font-bold text-2xl text-[#0C0A0A] group-hover:text-[#0f4c9c] transition-colors duration-300 mb-3">
                      <a href="/products">{displayName}</a>
                    </h3>
                    <p className="text-on-surface-variant font-body-md text-body-md mb-6 min-h-[48px]">
                      {displayDesc}
                    </p>
                    <a
                      href="/products"
                      className="inline-block bg-primary text-white px-6 py-2 rounded-DEFAULT font-label-md uppercase tracking-wider text-center active:scale-95 transition-all duration-200 btn-slide-up"
                    >
                      VIEW SERVICE
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MajorProductsCarousel />


      {/* Work Process Section */}
      <motion.section
        className="bg-white py-20 px-6 md:px-20 overflow-hidden"
        id="process"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-blue-500 text-sm font-semibold uppercase tracking-wider block">
              Work Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Follow 4 Easy Work Steps
            </h2>
          </div>

          {/* Grid of 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "PROCESS 1",
                title: "Project Research",
                desc: "This includes the use of robots & computer solution",
                icon: Settings,
              },
              {
                step: "PROCESS 2",
                title: "Start Working",
                desc: "We Have Expert Team To Deliver Cutting Edge Solution With Latest Technology",
                icon: Users,
              },
              {
                step: "PROCESS 3",
                title: "Quality Products",
                desc: "We Make Many Quality Checks To Maintain The Quality And Safety",
                icon: Package,
              },
              {
                step: "PROCESS 4",
                title: "Quality Finished",
                desc: "Deliver The Product To The Site Of Customers With Our Timely Maintenance Policy",
                icon: Flag,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="bg-gray-50 rounded-lg p-8 text-center transition-all duration-300 hover:bg-gray-900 hover:text-white hover:shadow-2xl hover:-translate-y-2 cursor-pointer group flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Icon Circle */}
                    <div className="w-20 h-20 rounded-full bg-white mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 shadow-sm">
                      <IconComponent className="w-8 h-8 text-blue-500 transition-all duration-300 group-hover:text-white" />
                    </div>

                    {/* Step Label */}
                    <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300 uppercase block tracking-wider font-semibold">
                      {item.step}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mt-2 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 group-hover:text-gray-300 text-sm mt-3 transition-colors duration-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Latest Projects / Stats Section */}
      <section className="relative overflow-hidden flex flex-col lg:flex-row min-h-[600px]" id="latest-projects">
        {/* Left Side: 60% Width, Black Background */}
        <div className="w-full lg:w-[60%] bg-[#0C0A0A] py-20 px-6 md:px-20 flex flex-col justify-center z-10">
          <div className="w-full">
            {/* Header */}
            <div className="mb-12">
              <span className="text-blue-500 text-sm font-semibold uppercase tracking-wider block mb-2">
                LATEST PROJECTS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase">
                EXCELLENCE DRIVEN FOR GETTING UNRIVALED RESULTS.
              </h2>
            </div>

            {/* Grid of 4 Blue Boxes (Single Row on Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                {
                  value: "8",
                  label: "Years Of Experiences",
                  iconUrl: "https://ecrolaengineering.com/assets/images/fun-facts/icon/01.svg",
                },
                {
                  value: "100",
                  label: "Completed Projects",
                  iconUrl: "https://ecrolaengineering.com/assets/images/fun-facts/icon/04.svg",
                },
                {
                  value: "30",
                  label: "Team Members",
                  iconUrl: "https://ecrolaengineering.com/assets/images/fun-facts/icon/03.svg",
                },
                {
                  value: "56",
                  label: "Upcoming Projects",
                  iconUrl: "https://ecrolaengineering.com/assets/images/fun-facts/icon/05.svg",
                },
              ].map((box, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group bg-[#0f4c9c] hover:bg-blue-600 transition-all duration-300 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-xl h-full min-h-[220px]"
                  >
                    {/* Centered SVG Icon Container */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner mb-5 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300">
                      <img
                        src={box.iconUrl}
                        alt={box.label}
                        className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert transition-all duration-300"
                      />
                    </div>

                    {/* Centered Counter Value */}
                    <div className="text-4xl md:text-5xl font-black text-white leading-none mb-3">
                      <Counter value={parseInt(box.value)} />+
                    </div>

                    {/* Centered Label */}
                    <div className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-wide leading-snug">
                      {box.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: 40% Width, Background Image */}
        <div className="hidden lg:block lg:w-[40%] lg:min-h-full relative">
          <img
            src="https://th.bing.com/th/id/R.a4c7f55872c9f55a1bd8d81b7f97debc?rik=APR%2bbr%2fznI9cSA&riu=http%3a%2f%2fwww.level10.com.au%2fassets%2fclient%2fimages%2fbanner%2fbanner-level10.jpg&ehk=H1Gb60rAsP0%2f5oimqNtNAJJVKhq1rLdSoAdugcNSe%2bE%3d&risl=&pid=ImgRaw&r=0"
            alt="Latest Projects Excellence"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay to blend with the black section on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0C0A0A] via-transparent to-transparent opacity-60 lg:opacity-80" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#ffffff] text-gray-900" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Side: Image */}
            <div className="relative rounded-lg overflow-hidden min-h-[400px] lg:min-h-full shadow-2xl">
              <img
                src="/images/02 (1).jpg"
                alt="Make An Appointment"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right Side: Form & Header */}
            <div>
              <div className="mb-8">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider block">
                  Let’s Discuss About Projects
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-2 text-gray-900">
                  Make An Appointment
                </h2>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 rounded-lg text-gray-900 shadow-2xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                  {formStatus.type && (
                    <div
                      className={`col-span-1 md:col-span-2 p-4 rounded-lg font-semibold text-sm ${formStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                    >
                      {formStatus.message}
                    </div>
                  )}
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-900"
                      placeholder="Your Name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Phone No.
                    </label>
                    <input
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-900"
                      placeholder="Phone No."
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Select Date
                    </label>
                    <input
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-500"
                      placeholder="mm/dd/yyyy"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-900"
                      placeholder="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Location / Place
                    </label>
                    <input
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-900"
                      placeholder="Your Location / City"
                      type="text"
                      value={formData.place}
                      onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Options
                    </label>
                    <select
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-500"
                      value={formData.option}
                      onChange={(e) => setFormData({ ...formData, option: e.target.value })}
                    >
                      <option value="">Select an option</option>
                      <option value="Industrial Design">Industrial Design</option>
                      <option value="Turnkey Engineering">Turnkey Engineering</option>
                      <option value="Quality Safety Inspections">Quality Safety Inspections</option>
                      <option value="Other Consultation">Other Consultation</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="font-semibold text-xs text-gray-700 uppercase mb-2 block">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-gray-50 text-gray-900"
                      placeholder="Your Message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary text-white font-label-md text-label-md uppercase tracking-wider py-4 rounded-DEFAULT active:scale-95 transition-all duration-200 btn-slide-up disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Make An Appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="flex items-center gap-4 mt-4">
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
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="#gallery">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  <span>Gallery</span>
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 group" href="#contact">
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
              © 2024 Ecrola Engineering. All rights reserved. &bull; <a href="/admin" className="hover:text-blue-400 transition-colors">Admin Portal</a>
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
