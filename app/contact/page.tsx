"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    email: "",
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
      const details = [
        formData.date ? `Preferred Date: ${formData.date}` : "",
        formData.place ? `Location: ${formData.place}` : "",
        formData.option ? `Selected Option: ${formData.option}` : "",
      ].filter(Boolean).join("\n");

      const combinedMessage = details ? `${formData.message}\n\n--- Additional Details ---\n${details}` : formData.message;

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
      console.error("Error submitting contact form:", err);
      setFormStatus({
        type: "error",
        message: "Failed to submit your message. Please try again later.",
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
          {/* Logo */}
          <a className="flex items-center gap-2" href="/">
            <img src="https://ecrolaengineering.com/assets/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-9 sm:h-10 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer"
                href="/"
              >
                Home
              </a>
              <a
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-black hover:text-primary transition-colors duration-200 cursor-pointer"
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
                className="font-bold text-[13px] sm:text-sm uppercase tracking-widest text-[#0C0A0A] hover:text-primary transition-colors duration-200 cursor-pointer border-b-2 border-primary"
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
              <Menu className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-surface z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="mobile-menu"
      >
        <button
          className="absolute top-4 right-4 text-primary p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-primary" />
        </button>
        <a
          className="text-2xl font-bold text-secondary hover:text-primary transition-colors"
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
          className="text-2xl font-bold text-primary"
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

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[400px] md:h-[500px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="Contact Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white tracking-wider mb-4 drop-shadow-lg">
              CONTACT US
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-400">Contact</span>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-24 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone / Call Us */}
              <div className="flex flex-col items-center text-center group py-4 px-2">
                <img
                  src="https://ecrolaengineering.com/assets/images/contact/01.jpg"
                  alt="Call Us"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-1">+91 98765 43210</p>
                <p className="text-gray-600 text-sm">+91 98765 43211</p>
              </div>

              {/* Email Address */}
              <div className="flex flex-col items-center text-center group py-4 px-2">
                <img
                  src="https://ecrolaengineering.com/assets/images/contact/02.jpg"
                  alt="Email Address"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
                <p className="text-gray-600 text-sm mb-1">info@ecrolaengineering.com</p>
                <p className="text-gray-600 text-sm">sales@ecrolaengineering.com</p>
              </div>

              {/* Office Location */}
              <div className="flex flex-col items-center text-center group py-4 px-2">
                <img
                  src="https://ecrolaengineering.com/assets/images/contact/03.jpg"
                  alt="Office Location"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Location</h3>
                <p className="text-gray-600 text-sm">Industrial Hub, Tower B, 4th Floor</p>
                <p className="text-gray-600 text-sm">Chennai, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-[#ffffff] text-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Left Side: Image */}
              <div className="relative rounded-lg overflow-hidden min-h-[400px] lg:min-h-full shadow-2xl">
                <img
                  src="https://ecrolaengineering.com/assets/images/appoinment/02.jpg"
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
                        className={`col-span-1 md:col-span-2 p-4 rounded-lg font-semibold text-sm ${
                          formStatus.type === "success"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-900"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-900"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-500"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-900"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-900"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-500"
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
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md p-3 text-sm transition-all bg-white text-gray-900"
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

        {/* Google Map Location Section */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-8 text-center">
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider block">
                Find Us On The Map
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase mt-2 text-gray-900">
                Our Location
              </h2>
            </div>
            <div className="w-full h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1849838091516!2d75.83147697377986!3d11.247798588931051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b5c94b8f995%3A0x4357529d9b0a5170!2sHiLITE%20Business%20Park%2C%20near%20Tower%202%2C%20Poovangal%2C%20Pantheeramkavu%2C%20Kerala%20673014!5e0!3m2!1sen!2sin!4v1782545582209!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0C0A0A] border-t border-zinc-900 text-slate-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-20 py-20 max-w-7xl mx-auto">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <a href="/">
              <img src="https://ecrolaengineering.com/assets/images/logo/01.svg" alt="Ecrola Engineering Logo" className="h-10 w-auto filter brightness-0 invert" />
            </a>
            <p className="font-body-md text-slate-400">
              Pioneering mechanical engineering solutions with cutting-edge technology and unmatched precision.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-title-md text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 font-body-md text-slate-400">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/products" className="hover:text-primary transition-colors">Products</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-title-md text-white mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 font-body-md text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Industrial Hub, Tower B, Chennai, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@ecrolaengineering.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-title-md text-white mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="font-body-md text-slate-400 mb-4">Subscribe to our newsletter for the latest engineering updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-l-DEFAULT w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-DEFAULT hover:bg-blue-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 py-6 text-center font-body-sm text-slate-500">
          © {new Date().getFullYear()} Ecrola Engineering. All rights reserved.
        </div>
      </footer>
    </>
  );
}
