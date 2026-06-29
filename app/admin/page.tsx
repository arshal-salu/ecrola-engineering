"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Lock, 
  Mail, 
  Package, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  LogOut,
  Database
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<"contacts" | "products" | "gallery">("contacts");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  // Data states
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // New item form states
  const [newProduct, setNewProduct] = useState({ name: "", description: "", image_url: "" });
  const [newGallery, setNewGallery] = useState({ title: "", image_url: "" });

  // Passkey login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");

    setTimeout(() => {
      // Accepts admin passkeys (admin123, ecrola2026, 123456, or any valid 4+ char PIN)
      if (
        pinInput === "admin123" || 
        pinInput === "ecrola2026" || 
        pinInput === "123456" ||
        pinInput.length >= 4
      ) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Invalid passkey. Minimum 4 characters required.");
      }
      setIsSubmitting(false);
    }, 500);
  };

  // Fetch Data from Supabase
  const fetchData = async () => {
    setLoading(true);
    setStatusMsg({ type: null, text: "" });

    try {
      if (activeTab === "contacts") {
        const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setContacts(data || []);
      } else if (activeTab === "products") {
        const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } else if (activeTab === "gallery") {
        const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setGallery(data || []);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: err.message || "Failed to fetch database records." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  // Add Product to DB
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.image_url) {
      setStatusMsg({ type: "error", text: "Product Name and Image URL are required." });
      return;
    }

    try {
      const { error } = await supabase.from("products").insert([
        {
          name: newProduct.name,
          description: newProduct.description || null,
          image_url: newProduct.image_url,
        },
      ]);
      if (error) throw error;

      setStatusMsg({ type: "success", text: "Product added successfully to database!" });
      setNewProduct({ name: "", description: "", image_url: "" });
      fetchData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to add product." });
    }
  };

  // Add Gallery Item to DB
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.image_url) {
      setStatusMsg({ type: "error", text: "Title and Image URL are required." });
      return;
    }

    try {
      const { error } = await supabase.from("gallery").insert([
        {
          title: newGallery.title,
          image_url: newGallery.image_url,
        },
      ]);
      if (error) throw error;

      setStatusMsg({ type: "success", text: "Gallery item added successfully to database!" });
      setNewGallery({ title: "", image_url: "" });
      fetchData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to add gallery item." });
    }
  };

  // Delete Record from DB
  const handleDelete = async (table: "contacts" | "products" | "gallery", id: string) => {
    if (!confirm(`Are you sure you want to delete this record from ${table}?`)) return;

    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setStatusMsg({ type: "success", text: "Record deleted successfully!" });
      fetchData();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to delete record." });
    }
  };

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2 tracking-wide whitespace-nowrap">
            ADMIN PORTAL
          </h1>

          <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed max-w-[280px] mx-auto">
            Enter database access passkey to manage Ecrola DB
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">
                PASSKEY / PIN
              </label>
              <input
                type="password"
                placeholder="••••••"
                required
                minLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setLoginError("");
                }}
                className={`w-full px-4 py-3 rounded-lg border ${
                  loginError ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-center tracking-[0.5em] text-lg font-mono text-gray-900 bg-white`}
              />
              {loginError && (
                <p className="text-red-500 text-xs text-center mt-2 font-medium">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <RefreshCw className="w-5 h-5 animate-spin text-white" />
              ) : (
                <span>Access Dashboard &rarr;</span>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eceded] py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <header className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-sm border border-white/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md">
              <Database size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase">Supabase DB Manager</h1>
              <p className="text-xs text-gray-500">Live database control for Ecrola Engineering</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border border-red-200"
            >
              <LogOut size={16} />
              <span>Exit Portal</span>
            </button>
          </div>
        </header>

        {/* Status Alert Banner */}
        {statusMsg.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${
              statusMsg.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {statusMsg.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab Navigation Buttons */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "contacts"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Mail size={18} />
            <span>Contacts &amp; Inquiries ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Package size={18} />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "gallery"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <ImageIcon size={18} />
            <span>Gallery Items ({gallery.length})</span>
          </button>
        </div>

        {/* TAB 1: CONTACTS MANAGEMENT */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 uppercase">Received Form Submissions</h2>
              <span className="text-xs text-gray-500 font-medium">{contacts.length} total messages</span>
            </div>

            {contacts.length === 0 ? (
              <div className="p-12 text-center text-gray-500 text-sm">
                No contact form submissions found in the database.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Sender Details</th>
                      <th className="py-4 px-6">Message Content</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap text-xs text-gray-500">
                          {new Date(c.created_at).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-semibold text-gray-900">{c.name}</div>
                          <div className="text-xs text-blue-600">{c.email}</div>
                          {c.phone && <div className="text-xs text-gray-500">{c.phone}</div>}
                        </td>
                        <td className="py-4 px-6 min-w-[300px]">
                          <p className="text-gray-700 whitespace-pre-line text-xs leading-relaxed max-h-28 overflow-y-auto">
                            {c.message}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete("contacts", c.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete submission"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-600" />
                <span>Add New Product</span>
              </h2>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EOT Crane"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter product features and details..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-blue-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Save Product to DB
                </button>
              </form>
            </div>

            {/* Products List Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Existing Products ({products.length})</h2>
              {products.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                  No products found in database. Add one using the form.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 relative group">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h3 className="font-bold text-gray-900 text-base truncate">{p.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description || "No description provided."}</p>
                      </div>
                      <button
                        onClick={() => handleDelete("products", p.id)}
                        className="absolute top-3 right-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY MANAGEMENT */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Gallery Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-600" />
                <span>Add Gallery Item</span>
              </h2>

              <form onSubmit={handleAddGallery} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Industrial Crane Installation"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/gallery-photo.jpg"
                    value={newGallery.image_url}
                    onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Save to Gallery DB
                </button>
              </form>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">Existing Gallery Photos ({gallery.length})</h2>
              {gallery.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                  No gallery items found in database. Add one using the form.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative group">
                      <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                        <img src={g.image_url} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <button
                          onClick={() => handleDelete("gallery", g.id)}
                          className="absolute top-2 right-2 p-2 bg-white/90 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer shadow-md"
                          title="Delete photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-xs truncate">{g.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
