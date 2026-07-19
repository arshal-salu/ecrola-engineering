"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, CheckCircle2, ChevronRight, Eye, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Innovative Lift Systems",
    image_url: "/images/02.jpg",
  },
  {
    id: "gallery-2",
    title: "Advanced Customized Machinery",
    image_url: "/images/02 (2).jpg",
  },
  {
    id: "gallery-3",
    title: "Modern Home Elevators",
    image_url: "/images/12.jpg",
  },
  {
    id: "gallery-4",
    title: "Industrial Freight Elevators",
    image_url: "/images/11.jpg",
  },
  {
    id: "gallery-5",
    title: "Double-Mast Stackers",
    image_url: "/images/05.jpg",
  },
  {
    id: "gallery-6",
    title: "EOT Crane Installations",
    image_url: "/images/06.jpg",
  },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);

  // Fetch gallery from Supabase
  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase.from("gallery").select("*");
        if (error) throw error;
        if (data && data.length > 0) {
          setGallery(data);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    }
    fetchGallery();
  }, []);

  return (
    <>
      <Header activePage="gallery" />

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="Gallery Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-tight mb-4 drop-shadow-lg animate-fade-in">
              GALLERY
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-500">Gallery</span>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section */}
        <section className="py-20 bg-[#fafbfc] px-6 md:px-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block mb-3 animate-fade-in">
                OUR GALLERY
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#0C0A0A] uppercase tracking-tight text-center">
                Discover Elevated Elegance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, index) => {
                const galleryImages = [
                  "/images/02.jpg",
                  "/images/02 (2).jpg",
                  "/images/12.jpg",
                  "/images/11.jpg",
                  "/images/05.jpg",
                  "/images/06.jpg"
                ];
                const imageUrl = galleryImages[index % galleryImages.length];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative elevate-card"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 relative">
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={imageUrl}
                      />
                      {/* Glass overlay icon */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0f4c9c] transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
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
