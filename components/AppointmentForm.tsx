"use client";

import React, { useState } from "react";
import { Send, Calendar, MapPin, User, Phone, Mail, MessageSquare, Briefcase } from "lucide-react";

// Easily configurable WhatsApp Phone Number (Country code + Number, without + or spaces)
const WHATSAPP_NUMBER = "919895919742";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    location: "",
    service: "Turnkey Engineering",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Format message text with bold WhatsApp labels (*Label:*)
    const messageText = `*NEW APPOINTMENT REQUEST*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone || "N/A"}\n` +
      `*Email:* ${formData.email}\n` +
      `*Preferred Date:* ${formData.date || "N/A"}\n` +
      `*Location:* ${formData.location || "N/A"}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*Message:* ${formData.message || "N/A"}`;

    // Construct URL-safe official wa.me link
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a new browser tab
    window.open(waUrl, "_blank");

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        location: "",
        service: "Turnkey Engineering",
        message: "",
      });
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <span className="text-[#25D366] text-xs font-bold uppercase tracking-widest block mb-1">
          Instant WhatsApp Booking
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase">
          Make An Appointment
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Fill in your details below to instantly connect with our engineering team on WhatsApp.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <User size={14} className="text-gray-400" />
              <span>Full Name <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Phone size={14} className="text-gray-400" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Mail size={14} className="text-gray-400" />
              <span>Email Address <span className="text-red-500">*</span></span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              <span>Preferred Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Location / Place */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span>Location / City</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Kozhikode, Kerala"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Service Option */}
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
              <Briefcase size={14} className="text-gray-400" />
              <span>Service Required</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white cursor-pointer"
            >
              <option value="Turnkey Engineering">Turnkey Engineering</option>
              <option value="Home Elevators / Lifts">Home Elevators / Lifts</option>
              <option value="EOT Cranes &amp; Stacker Machines">EOT Cranes &amp; Stacker Machines</option>
              <option value="Customized Machinery">Customized Machinery</option>
              <option value="Safe Lockers">Safe Lockers</option>
              <option value="Safety Inspections">Safety Inspections</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-semibold text-gray-700 uppercase mb-1.5 flex items-center gap-1.5">
            <MessageSquare size={14} className="text-gray-400" />
            <span>Your Message / Requirements</span>
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your project or inquiry..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition text-sm text-gray-900 bg-white resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-sm uppercase tracking-wider active:scale-[0.99] cursor-pointer disabled:opacity-70 mt-4"
        >
          <Send size={18} />
          <span>{submitting ? "Opening WhatsApp..." : "Send via WhatsApp →"}</span>
        </button>
      </form>
    </div>
  );
}
