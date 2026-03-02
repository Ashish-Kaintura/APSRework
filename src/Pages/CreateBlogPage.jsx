import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const API = "http://localhost:5000/api/blogs";

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const tabs = ["basic", "content", "images", "seo"];
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);

  // Flat state structure matching your Mongoose Schema
  const [form, setForm] = useState({
    title: "",
    slug: "",
    status: "draft",
    category: "",
    author: "",
    shortdescription: "",
    description: "",
    longdescription: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
    metacanonical: "",
    schemaMarkup: "",
  });

  // Hold new files selected by the user
  const [files, setFiles] = useState({
    CoverImage: null,
    Image: null,
    Image2: null,
    bgImage: null,
  });

  // ========= INPUT HANDLERS =========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (value) => {
    setForm((prev) => ({ ...prev, longdescription: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  // ========= QUILL CONFIG =========
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // ========= SUBMIT =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append selected files
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Created Successfully!");
      navigate("/blogs"); // Redirect to the blogs list
    } catch (err) {
      toast.error(err.response?.data?.error || "Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  // ========= UI =========
  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <button
          onClick={() => navigate("/blogs")}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          Cancel & Go Back
        </button>
      </div>

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
            {tab}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-xl shadow border border-gray-100"
      >
        {/* BASIC TAB */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <input
              name="title"
              value={form.title}
              placeholder="Blog Title *"
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
              required
            />
            <input
              name="slug"
              value={form.slug}
              placeholder="Custom Slug (leave blank to auto-generate)"
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="category"
                value={form.category}
                placeholder="Category"
                className="w-full p-3 border rounded bg-white"
                onChange={handleChange}
              />
              <input
                name="author"
                value={form.author}
                placeholder="Author Name"
                className="w-full p-3 border rounded bg-white"
                onChange={handleChange}
              />
            </div>
            <select
              name="status"
              value={form.status}
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <textarea
              name="shortdescription"
              value={form.shortdescription}
              placeholder="Short Description / Excerpt"
              className="w-full p-3 border rounded bg-white"
              rows="3"
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={form.description}
              placeholder="Main Description"
              className="w-full p-3 border rounded bg-white"
              rows="4"
              onChange={handleChange}
            />

            <div className="bg-white rounded">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Long Description (Blog Content)
              </label>
              <ReactQuill
                theme="snow"
                value={form.longdescription || ""}
                onChange={handleEditorChange}
                modules={quillModules}
                className="h-64 mb-12"
              />
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Cover Image", name: "CoverImage" },
              { label: "Background Image", name: "bgImage" },
              { label: "Content Image 1", name: "Image" },
              { label: "Content Image 2", name: "Image2" },
            ].map((imgField) => (
              <div key={imgField.name} className="p-4 border rounded bg-white">
                <label className="block text-sm font-bold mb-3 text-gray-700">
                  {imgField.label}
                </label>
                <input
                  type="file"
                  name={imgField.name}
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <input
              name="metatitle"
              value={form.metatitle}
              placeholder="Meta Title"
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
            />
            <textarea
              name="metadescription"
              value={form.metadescription}
              placeholder="Meta Description"
              className="w-full p-3 border rounded bg-white"
              rows="3"
              onChange={handleChange}
            />
            <input
              name="metakeywords"
              value={form.metakeywords}
              placeholder="Meta Keywords (comma separated)"
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
            />
            <input
              name="metacanonical"
              value={form.metacanonical}
              placeholder="Canonical URL"
              className="w-full p-3 border rounded bg-white"
              onChange={handleChange}
            />
            <textarea
              name="schemaMarkup"
              value={form.schemaMarkup}
              placeholder="Schema Markup (JSON-LD)"
              className="w-full p-3 border rounded bg-white font-mono text-sm"
              rows="5"
              onChange={handleChange}
            />
          </div>
        )}

        {/* SAVE BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:bg-red-400"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
