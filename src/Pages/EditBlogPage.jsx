import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

// Using the modern, maintained fork!
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const API = "http://localhost:5000/api/blogs";

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const tabs = ["basic", "content", "images", "seo"];
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Flat state structure
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

  // Hold currently saved images from the database
  const [currentFiles, setCurrentFiles] = useState({
    CoverImage: null,
    Image: null,
    Image2: null,
    bgImage: null,
  });

  // Hold new files selected by the user
  const [newFiles, setNewFiles] = useState({
    CoverImage: null,
    Image: null,
    Image2: null,
    bgImage: null,
  });

  // ========= FETCH EXISTING DATA =========
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${API}/${id}`);

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          status: data.status || "draft",
          category: data.category || "",
          author: data.author || "",
          shortdescription: data.shortdescription || "",
          description: data.description || "",
          longdescription: data.longdescription || "",
          metatitle: data.metatitle || "",
          metadescription: data.metadescription || "",
          metakeywords: data.metakeywords || "",
          metacanonical: data.metacanonical || "",
          // Ensure schemaMarkup is stringified if it comes back as an object
          schemaMarkup:
            typeof data.schemaMarkup === "object"
              ? JSON.stringify(data.schemaMarkup)
              : data.schemaMarkup || "",
        });

        setCurrentFiles({
          CoverImage: data.CoverImage || null,
          Image: data.Image || null,
          Image2: data.Image2 || null,
          bgImage: data.bgImage || null,
        });
      } catch (err) {
        toast.error("Failed to fetch blog data");
        console.error(err);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ========= INPUT HANDLERS =========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditorChange = (value) => {
    setForm({ ...form, longdescription: value });
  };

  const handleFileChange = (e) => {
    setNewFiles({ ...newFiles, [e.target.name]: e.target.files[0] });
  };

  // ========= QUILL EDITOR CONFIG =========
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  // ========= SUBMIT =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // Only append files that have been newly selected
      Object.keys(newFiles).forEach((key) => {
        if (newFiles[key]) {
          formData.append(key, newFiles[key]);
        }
      });

      await axios.put(`${API}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Updated Successfully");
      navigate("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="p-10 text-center text-xl font-bold">
        Loading Blog Data...
      </div>
    );
  }

  // ========= UI =========
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
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
        className="bg-white p-8 rounded-xl shadow border border-gray-100"
      >
        {/* ================= BASIC TAB ================= */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <input
              name="title"
              value={form.title}
              placeholder="Blog Title *"
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
              required
            />
            <input
              name="slug"
              value={form.slug}
              placeholder="Custom Slug"
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="category"
                value={form.category}
                placeholder="Category"
                className="w-full p-3 border rounded bg-gray-50"
                onChange={handleChange}
              />
              <input
                name="author"
                value={form.author}
                placeholder="Author Name"
                className="w-full p-3 border rounded bg-gray-50"
                onChange={handleChange}
              />
            </div>
            <select
              name="status"
              value={form.status}
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        )}

        {/* ================= CONTENT TAB ================= */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <textarea
              name="shortdescription"
              value={form.shortdescription}
              placeholder="Short Description / Excerpt"
              className="w-full p-3 border rounded bg-gray-50"
              rows="3"
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={form.description}
              placeholder="Main Description"
              className="w-full p-3 border rounded bg-gray-50"
              rows="4"
              onChange={handleChange}
            />

            <div className="bg-white rounded">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Long Description (Blog Content)
              </label>
              <ReactQuill
                theme="snow"
                value={form.longdescription}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className="h-64 mb-12"
              />
            </div>
          </div>
        )}

        {/* ================= IMAGES TAB ================= */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded bg-gray-50">
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Cover Image
              </label>
              {currentFiles.CoverImage && !newFiles.CoverImage && (
                <img
                  src={currentFiles.CoverImage}
                  alt="Cover"
                  className="h-24 object-cover rounded border mb-3"
                />
              )}
              <input
                type="file"
                name="CoverImage"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>

            <div className="p-4 border rounded bg-gray-50">
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Background Image
              </label>
              {currentFiles.bgImage && !newFiles.bgImage && (
                <img
                  src={currentFiles.bgImage}
                  alt="Background"
                  className="h-24 object-cover rounded border mb-3"
                />
              )}
              <input
                type="file"
                name="bgImage"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>

            <div className="p-4 border rounded bg-gray-50">
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Content Image 1
              </label>
              {currentFiles.Image && !newFiles.Image && (
                <img
                  src={currentFiles.Image}
                  alt="Content 1"
                  className="h-24 object-cover rounded border mb-3"
                />
              )}
              <input
                type="file"
                name="Image"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>

            <div className="p-4 border rounded bg-gray-50">
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Content Image 2
              </label>
              {currentFiles.Image2 && !newFiles.Image2 && (
                <img
                  src={currentFiles.Image2}
                  alt="Content 2"
                  className="h-24 object-cover rounded border mb-3"
                />
              )}
              <input
                type="file"
                name="Image2"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </div>
          </div>
        )}

        {/* ================= SEO TAB ================= */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <input
              name="metatitle"
              value={form.metatitle}
              placeholder="Meta Title"
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
            />
            <textarea
              name="metadescription"
              value={form.metadescription}
              placeholder="Meta Description"
              className="w-full p-3 border rounded bg-gray-50"
              rows="3"
              onChange={handleChange}
            />
            <input
              name="metakeywords"
              value={form.metakeywords}
              placeholder="Meta Keywords (comma separated)"
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
            />
            <input
              name="metacanonical"
              value={form.metacanonical}
              placeholder="Canonical URL"
              className="w-full p-3 border rounded bg-gray-50"
              onChange={handleChange}
            />
            <textarea
              name="schemaMarkup"
              value={form.schemaMarkup}
              placeholder="Schema Markup (JSON-LD)"
              className="w-full p-3 border rounded bg-gray-50 font-mono text-sm"
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
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
