import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const API = "http://localhost:5000/api/services";

export default function CreateServicePage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const tabs = [
    "basic",
    "seo",
    "banner",
    "shortSummary",
    "services",
    "specialServices",
    "whyUs",
    "faq",
    "cta",
  ];

  const [activeTab, setActiveTab] = useState("basic");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    order: 0,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      metaCanonical: "",
      schemaMarkup: "",
    },
    banner: {
      bannerTitle: "",
      bannerKeyword: "",
      shortDescription: "",
      paragraph: "",
    },
    shortSummary: { title: "", paragraph1: "", paragraph2: "" },
    servicesSection: { title: "", shortSummary: "", services: [] },
    specialServicesSection: { title: "", services: [] },
    whyUsSection: { title: "", summary: "", points: [] },
    faqSection: { title: "", faqs: [] },
    ctaSection: { title: "", summary: "" },
  });

  // Keep all files in one state object to manage them easily
  const [files, setFiles] = useState({
    image: null,
    bannerImage: null,
    portraitImage: null,
    image1: null,
    image2: null,
  });

  const [loading, setLoading] = useState(false);

  // ========= INPUT HANDLERS =========
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (!section) {
      setForm({ ...form, [name]: value });
    } else {
      setForm({
        ...form,
        [section]: { ...form[section], [name]: value },
      });
    }
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // ========= DYNAMIC ARRAY ADDERS =========
  const addItem = (section, key) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [key]: [...(form[section][key] || []), {}],
      },
    });
  };

  const updateArrayItem = (section, key, index, field, value) => {
    const updated = [...form[section][key]];
    updated[index][field] = value;
    setForm({
      ...form,
      [section]: { ...form[section], [key]: updated },
    });
  };

  const removeArrayItem = (section, key, index) => {
    const updated = [...form[section][key]];
    updated.splice(index, 1);
    setForm({
      ...form,
      [section]: { ...form[section], [key]: updated },
    });
  };

  // ========= SUBMIT =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append text data
      Object.keys(form).forEach((key) => {
        if (typeof form[key] === "object" && form[key] !== null) {
          formData.append(key, JSON.stringify(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      });

      // Append all selected files
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Service Created Successfully");
      navigate("/services");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error creating service");
    } finally {
      setLoading(false);
    }
  };

  // ========= UI =========
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-3xl font-bold">Create Service</h1>
        <button
          onClick={() => navigate("/services")}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Cancel & Go Back
        </button>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 rounded font-medium transition-colors ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow">
        {/* ================= BASIC TAB ================= */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <input
              name="title"
              value={form.title}
              placeholder="Service Title *"
              className="w-full p-3 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="slug"
              value={form.slug}
              placeholder="Custom Slug (Optional)"
              className="w-full p-3 border rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              name="order"
              value={form.order}
              placeholder="Display Order (e.g., 0)"
              className="w-full p-3 border rounded"
              onChange={handleChange}
            />
            <div className="p-3 border rounded bg-gray-50">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Main Feature Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <select
              name="status"
              value={form.status}
              className="w-full p-3 border rounded"
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        )}

        {/* ================= SEO TAB ================= */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <input
              name="metaTitle"
              value={form.seo.metaTitle}
              placeholder="Meta Title"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "seo")}
            />
            <textarea
              name="metaDescription"
              value={form.seo.metaDescription}
              placeholder="Meta Description"
              className="w-full p-3 border rounded"
              rows="3"
              onChange={(e) => handleChange(e, "seo")}
            />
            <input
              name="metaKeywords"
              value={form.seo.metaKeywords}
              placeholder="Meta Keywords (comma separated)"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "seo")}
            />
            <input
              name="metaCanonical"
              value={form.seo.metaCanonical}
              placeholder="Canonical URL"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "seo")}
            />
            <textarea
              name="schemaMarkup"
              value={form.seo.schemaMarkup}
              placeholder="Schema Markup (JSON-LD)"
              className="w-full p-3 border rounded font-mono text-sm"
              rows="5"
              onChange={(e) => handleChange(e, "seo")}
            />
          </div>
        )}

        {/* ================= BANNER TAB ================= */}
        {activeTab === "banner" && (
          <div className="space-y-4">
            <input
              name="bannerTitle"
              value={form.banner.bannerTitle}
              placeholder="Banner Title"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "banner")}
            />
            <input
              name="bannerKeyword"
              value={form.banner.bannerKeyword}
              placeholder="Banner Keyword"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "banner")}
            />
            <textarea
              name="shortDescription"
              value={form.banner.shortDescription}
              placeholder="Short Description"
              className="w-full p-3 border rounded"
              rows="2"
              onChange={(e) => handleChange(e, "banner")}
            />
            <textarea
              name="paragraph"
              value={form.banner.paragraph}
              placeholder="Banner Paragraph"
              className="w-full p-3 border rounded"
              rows="4"
              onChange={(e) => handleChange(e, "banner")}
            />

            {/* New Banner Image Inputs */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 border rounded bg-gray-50">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Banner Image
                </label>
                <input
                  type="file"
                  name="bannerImage"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
              </div>
              <div className="p-3 border rounded bg-gray-50">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Portrait Image
                </label>
                <input
                  type="file"
                  name="portraitImage"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SHORT SUMMARY TAB ================= */}
        {activeTab === "shortSummary" && (
          <div className="space-y-4">
            <input
              name="title"
              value={form.shortSummary.title}
              placeholder="Section Title"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "shortSummary")}
            />
            <textarea
              name="paragraph1"
              value={form.shortSummary.paragraph1}
              placeholder="Paragraph 1"
              className="w-full p-3 border rounded"
              rows="3"
              onChange={(e) => handleChange(e, "shortSummary")}
            />
            <textarea
              name="paragraph2"
              value={form.shortSummary.paragraph2}
              placeholder="Paragraph 2"
              className="w-full p-3 border rounded"
              rows="3"
              onChange={(e) => handleChange(e, "shortSummary")}
            />

            {/* New Short Summary Image Inputs */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 border rounded bg-gray-50">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Image 1
                </label>
                <input
                  type="file"
                  name="image1"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
              </div>
              <div className="p-3 border rounded bg-gray-50">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Image 2
                </label>
                <input
                  type="file"
                  name="image2"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === "services" && (
          <div>
            <div className="space-y-4 mb-6 p-4 bg-gray-50 border rounded">
              <input
                name="title"
                value={form.servicesSection.title}
                placeholder="Services Section Title"
                className="w-full p-3 border rounded"
                onChange={(e) => handleChange(e, "servicesSection")}
              />
              <textarea
                name="shortSummary"
                value={form.servicesSection.shortSummary}
                placeholder="Services Section Short Summary"
                className="w-full p-3 border rounded"
                rows="2"
                onChange={(e) => handleChange(e, "servicesSection")}
              />
            </div>
            <button
              type="button"
              onClick={() => addItem("servicesSection", "services")}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Service Item
            </button>
            {form.servicesSection.services?.map((item, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem("servicesSection", "services", i)
                  }
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  X
                </button>
                <input
                  value={item.name || ""}
                  placeholder="Service Name *"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) =>
                    updateArrayItem(
                      "servicesSection",
                      "services",
                      i,
                      "name",
                      e.target.value,
                    )
                  }
                  required
                />
                <input
                  value={item.icon || ""}
                  placeholder="Icon (Class or URL)"
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    updateArrayItem(
                      "servicesSection",
                      "services",
                      i,
                      "icon",
                      e.target.value,
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= SPECIAL SERVICES TAB ================= */}
        {activeTab === "specialServices" && (
          <div>
            <div className="mb-6 p-4 bg-gray-50 border rounded">
              <input
                name="title"
                value={form.specialServicesSection.title}
                placeholder="Special Services Section Title"
                className="w-full p-3 border rounded"
                onChange={(e) => handleChange(e, "specialServicesSection")}
              />
            </div>
            <button
              type="button"
              onClick={() => addItem("specialServicesSection", "services")}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Special Service
            </button>
            {form.specialServicesSection.services?.map((item, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem("specialServicesSection", "services", i)
                  }
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  X
                </button>
                <input
                  value={item.title || ""}
                  placeholder="Title *"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) =>
                    updateArrayItem(
                      "specialServicesSection",
                      "services",
                      i,
                      "title",
                      e.target.value,
                    )
                  }
                  required
                />
                <textarea
                  value={item.description || ""}
                  placeholder="Description"
                  className="w-full p-2 border rounded mb-2"
                  rows="2"
                  onChange={(e) =>
                    updateArrayItem(
                      "specialServicesSection",
                      "services",
                      i,
                      "description",
                      e.target.value,
                    )
                  }
                />
                <input
                  value={item.icon || ""}
                  placeholder="Icon (Class or URL)"
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    updateArrayItem(
                      "specialServicesSection",
                      "services",
                      i,
                      "icon",
                      e.target.value,
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= WHY US TAB ================= */}
        {activeTab === "whyUs" && (
          <div>
            <div className="space-y-4 mb-6 p-4 bg-gray-50 border rounded">
              <input
                name="title"
                value={form.whyUsSection.title}
                placeholder="Why Us Section Title"
                className="w-full p-3 border rounded"
                onChange={(e) => handleChange(e, "whyUsSection")}
              />
              <textarea
                name="summary"
                value={form.whyUsSection.summary}
                placeholder="Why Us Section Summary"
                className="w-full p-3 border rounded"
                rows="2"
                onChange={(e) => handleChange(e, "whyUsSection")}
              />
            </div>
            <button
              type="button"
              onClick={() => addItem("whyUsSection", "points")}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Why Us Point
            </button>
            {form.whyUsSection.points?.map((item, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem("whyUsSection", "points", i)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  X
                </button>
                <input
                  value={item.title || ""}
                  placeholder="Point Title *"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) =>
                    updateArrayItem(
                      "whyUsSection",
                      "points",
                      i,
                      "title",
                      e.target.value,
                    )
                  }
                  required
                />
                <textarea
                  value={item.summary || ""}
                  placeholder="Point Summary"
                  className="w-full p-2 border rounded mb-2"
                  rows="2"
                  onChange={(e) =>
                    updateArrayItem(
                      "whyUsSection",
                      "points",
                      i,
                      "summary",
                      e.target.value,
                    )
                  }
                />
                <input
                  value={item.icon || ""}
                  placeholder="Icon (Class or URL)"
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    updateArrayItem(
                      "whyUsSection",
                      "points",
                      i,
                      "icon",
                      e.target.value,
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= FAQ TAB ================= */}
        {activeTab === "faq" && (
          <div>
            <div className="mb-6 p-4 bg-gray-50 border rounded">
              <input
                name="title"
                value={form.faqSection.title}
                placeholder="FAQ Section Title"
                className="w-full p-3 border rounded"
                onChange={(e) => handleChange(e, "faqSection")}
              />
            </div>
            <button
              type="button"
              onClick={() => addItem("faqSection", "faqs")}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add FAQ
            </button>
            {form.faqSection.faqs?.map((faq, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem("faqSection", "faqs", i)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  X
                </button>
                <input
                  value={faq.question || ""}
                  placeholder="Question *"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) =>
                    updateArrayItem(
                      "faqSection",
                      "faqs",
                      i,
                      "question",
                      e.target.value,
                    )
                  }
                  required
                />
                <textarea
                  value={faq.answer || ""}
                  placeholder="Answer *"
                  className="w-full p-2 border rounded"
                  rows="3"
                  onChange={(e) =>
                    updateArrayItem(
                      "faqSection",
                      "faqs",
                      i,
                      "answer",
                      e.target.value,
                    )
                  }
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= CTA TAB ================= */}
        {activeTab === "cta" && (
          <div className="space-y-4">
            <input
              name="title"
              value={form.ctaSection.title}
              placeholder="CTA Title"
              className="w-full p-3 border rounded"
              onChange={(e) => handleChange(e, "ctaSection")}
            />
            <textarea
              name="summary"
              value={form.ctaSection.summary}
              placeholder="CTA Summary"
              className="w-full p-3 border rounded"
              rows="3"
              onChange={(e) => handleChange(e, "ctaSection")}
            />
          </div>
        )}

        {/* SAVE BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            {loading ? "Saving..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
