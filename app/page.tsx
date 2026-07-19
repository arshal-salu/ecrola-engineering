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
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <Header activePage="home" />

      {/* Hero Section */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#fafbfc] border-b border-slate-100" id="about">
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
              className="order-2 lg:order-2 space-y-6"
            >
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] block uppercase">
                ABOUT US
              </span>
              <h2 className="font-bold text-2xl sm:text-4xl text-[#0C0A0A] uppercase tracking-tight leading-tight mt-2">
                EXCELLENCE IN EVERY <br className="hidden sm:inline" /> ENGINEERING PROJECT
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                At Ecorola Engineering, we specialize in innovative lift solutions, custom machinery, and cutting-edge production facilities to transform spaces across commercial, industrial, and residential sectors.
              </p>

              {/* Stats Section */}
              <div className="flex flex-row gap-6 items-start flex-wrap pt-6 border-t border-slate-100">
                {/* Left side stat */}
                <div className="flex flex-col min-w-[120px]">
                  <span className="text-4xl sm:text-5xl font-black leading-none text-[#0f4c9c]">
                    2017
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">
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
                      className="flex items-center gap-3 bg-transparent py-0.5"
                    >
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 text-[#0f4c9c]"
                      />
                      <span className="text-slate-700 text-sm sm:text-base font-semibold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/about"
                  className="inline-block bg-[#0f4c9c] hover:bg-[#0c3e80] text-white px-7 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#0f4c9c]/15 hover:shadow-lg hover:shadow-[#0f4c9c]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  LEARN MORE
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 md:py-24 lg:py-28 bg-white border-b border-slate-100" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-16">
            <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block">
              Our Speciality
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] leading-snug md:leading-[61px] text-[#0C0A0A] uppercase mt-2">
              Exceptional Lift & Machinery Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-xl hover:border-slate-200/60 flex flex-col justify-between elevate-card"
                >
                  <a href="/products" className="relative block aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100">
                    <img
                      alt={displayName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={imageUrl}
                    />
                    {/* Blue background number corner badge */}
                    <div className="absolute top-4 left-4 bg-[#0f4c9c] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md z-10 transition-transform duration-300 group-hover:scale-105">
                      {displayNumber}
                    </div>
                  </a>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-[#0C0A0A] group-hover:text-[#0f4c9c] transition-colors duration-300 mb-3">
                        <a href="/products">{displayName}</a>
                      </h3>
                      <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed min-h-[48px]">
                        {displayDesc}
                      </p>
                    </div>
                    <a
                      href="/products"
                      className="inline-flex items-center justify-center bg-[#0f4c9c]/10 text-[#0f4c9c] hover:bg-[#0f4c9c] hover:text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer"
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
        className="bg-[#fafbfc] py-20 md:py-24 lg:py-28 px-6 md:px-20 overflow-hidden border-b border-slate-100"
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
            <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block">
              Work Process
            </span>
            <h2 className="font-bold text-2xl sm:text-4xl text-[#0C0A0A] uppercase tracking-tight mt-2">
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
                  className="bg-white border border-slate-100 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0f4c9c]/30 cursor-pointer group flex flex-col items-center justify-between h-full elevate-card"
                >
                  <div className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-[#0f4c9c] flex items-center justify-center mb-6 group-hover:bg-[#0f4c9c] group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Step Label */}
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-2">
                      {item.step}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0f4c9c] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
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
      <section className="relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] border-b border-slate-100" id="latest-projects">
        {/* Left Side: 60% Width, Black Background */}
        <div className="w-full lg:w-[60%] bg-[#0C0A0A] py-24 px-6 md:px-12 lg:px-20 flex flex-col justify-center z-10">
          <div className="w-full">
            {/* Header */}
            <div className="mb-12">
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block mb-3">
                LATEST PROJECTS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight uppercase tracking-tight">
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
                    className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#0f4c9c]/50 hover:bg-white/10 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl h-full min-h-[220px]"
                  >
                    {/* Centered SVG Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-inner mb-5 group-hover:scale-110 group-hover:bg-[#0f4c9c]/20 transition-all duration-300">
                      <img
                        src={box.iconUrl}
                        alt={box.label}
                        className="w-10 h-10 object-contain filter brightness-0 invert transition-all duration-300"
                      />
                    </div>

                    {/* Centered Counter Value */}
                    <div className="text-4xl font-black text-white leading-none mb-3">
                      <Counter value={parseInt(box.value)} />+
                    </div>

                    {/* Centered Label */}
                    <div className="text-[11px] font-bold text-blue-100 uppercase tracking-wider leading-snug">
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
      <section className="py-24 bg-[#ffffff] text-gray-900 border-b border-slate-100" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Left Side: Image */}
            <div className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-full shadow-2xl">
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
                <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block">
                  Let’s Discuss About Projects
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-2 text-gray-900 tracking-tight">
                  Make An Appointment
                </h2>
              </div>

              <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-2xl text-gray-900 shadow-xl">
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
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-800 outline-none"
                      placeholder="Your Name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Phone No.
                    </label>
                    <input
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-800 outline-none"
                      placeholder="Phone No."
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Select Date
                    </label>
                    <input
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-500 outline-none"
                      placeholder="mm/dd/yyyy"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-800 outline-none"
                      placeholder="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Location / Place
                    </label>
                    <input
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-800 outline-none"
                      placeholder="Your Location / City"
                      type="text"
                      value={formData.place}
                      onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Options
                    </label>
                    <select
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-500 outline-none"
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
                    <label className="font-bold text-[10px] text-slate-500 uppercase mb-2 block tracking-wider">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full border border-slate-200 focus:border-[#0f4c9c] focus:ring-1 focus:ring-[#0f4c9c]/30 rounded-lg p-3.5 text-sm transition-all bg-slate-50/50 text-slate-800 outline-none"
                      placeholder="Your Message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#0f4c9c] hover:bg-[#0c3e80] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-lg active:scale-[0.99] transition-all duration-300 shadow-lg shadow-[#0f4c9c]/20 hover:shadow-xl hover:shadow-[#0f4c9c]/35 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Opening WhatsApp..." : "Make An Appointment →"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
