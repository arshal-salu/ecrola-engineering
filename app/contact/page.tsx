"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
      <Header activePage="contact" />

      {/* Main Content Area */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/909/642/small/modern-elevator-with-wooden-panels-and-lights-free-photo.jpeg"
            alt="Contact Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center z-10 px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase text-white tracking-tight mb-4 drop-shadow-lg animate-fade-in">
              CONTACT
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-blue-500">Contact</span>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 md:py-24 lg:py-28 bg-[#fafbfc] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone / Call Us */}
              <div className="flex flex-col items-center text-center group py-8 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer elevate-card">
                <img
                  src="/images/01 (2).jpg"
                  alt="Call Us"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-slate-500 font-semibold text-sm mb-1">+91 8714 505551</p>
                <p className="text-slate-500 font-semibold text-sm">+91 98959 19742</p>
              </div>

              {/* Email Address */}
              <div className="flex flex-col items-center text-center group py-8 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer elevate-card">
                <img
                  src="/images/02 (3).jpg"
                  alt="Email Address"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
                <p className="text-slate-500 font-semibold text-sm mb-1">info@ecrolaengineering.com</p>
                <p className="text-slate-500 font-semibold text-sm">sales@ecrolaengineering.com</p>
              </div>

              {/* Office Location */}
              <div className="flex flex-col items-center text-center group py-8 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer elevate-card">
                <img
                  src="/images/03 (2).jpg"
                  alt="Office Location"
                  className="w-20 h-20 object-cover rounded-xl mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Location</h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                  HiLiTE Business Park Kozhikode, Pantheeramkavu, Kerala, 673014
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[#ffffff] text-gray-900 border-b border-slate-100">
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


        {/* Google Map Location Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-[#fafbfc] border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-12 text-center">
              <span className="text-blue-500 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase block">
                Find Us On The Map
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#0C0A0A] uppercase tracking-tight mt-2">
                Our Location
              </h2>
            </div>
            <div className="w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
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

      <Footer />
    </>
  );
}
