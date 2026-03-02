import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api/blogs";

export default function BlogPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${API}/${id}`);
        if (isMounted) setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog preview", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-xl font-bold text-center">
        Loading Preview...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10 text-xl font-bold text-center text-red-600">
        Blog not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      {/* HEADER CONTROLS */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium mb-2 hover:underline"
          >
            &larr; Back to Blogs
          </button>
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>
              Status: <strong className="uppercase">{blog.status}</strong>
            </span>
            <span>
              Category: <strong>{blog.category || "Uncategorized"}</strong>
            </span>
            <span>
              Author: <strong>{blog.author || "Unknown"}</strong>
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/editBlog/${blog._id}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Edit Blog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cover & Background Images */}
          {(blog.CoverImage || blog.bgImage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blog.CoverImage && (
                <div className="rounded-xl overflow-hidden shadow border bg-white p-2">
                  <p className="text-xs text-gray-500 font-bold mb-2 uppercase">
                    Cover Image
                  </p>
                  <img
                    src={blog.CoverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              {blog.bgImage && (
                <div className="rounded-xl overflow-hidden shadow border bg-white p-2">
                  <p className="text-xs text-gray-500 font-bold mb-2 uppercase">
                    Background Image
                  </p>
                  <img
                    src={blog.bgImage}
                    alt="Background"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
          )}

          {/* Text Summaries */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            {blog.shortdescription && (
              <p className="text-gray-600 font-medium italic mb-4">
                {blog.shortdescription}
              </p>
            )}
            {blog.description && (
              <p className="text-gray-800 whitespace-pre-wrap">
                {blog.description}
              </p>
            )}
          </div>

          {/* Long Description (Rich HTML Content) */}
          {blog.longdescription && (
            <div className="bg-white p-8 rounded-xl border shadow-sm">
              <h2 className="text-sm font-bold text-red-600 uppercase mb-6 border-b pb-2">
                Main Article Content
              </h2>

              {/* We use dangerouslySetInnerHTML to render the Quill HTML.
                The styles injected here ensure lists, bold text, and headers appear correctly.
              */}
              <div
                className="prose max-w-none text-gray-800"
                style={
                  {
                    /* Quick inline styles to ensure Quill content renders nicely without Tailwind Typography plugin */
                  }
                }
                dangerouslySetInnerHTML={{ __html: blog.longdescription }}
              />
            </div>
          )}

          {/* Secondary Content Images */}
          {(blog.Image || blog.Image2) && (
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-sm font-bold text-red-600 uppercase mb-4">
                Content Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.Image && (
                  <img
                    src={blog.Image}
                    alt="Content 1"
                    className="w-full h-auto object-cover rounded border"
                  />
                )}
                {blog.Image2 && (
                  <img
                    src={blog.Image2}
                    alt="Content 2"
                    className="w-full h-auto object-cover rounded border"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-8">
          {/* Quick Info */}
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-sm font-bold text-gray-500 uppercase mb-4">
              Post Info
            </h2>
            <p>
              <strong>Slug:</strong> {blog.slug}
            </p>
            <p className="mt-2">
              <strong>Created:</strong>{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">
              <strong>Last Updated:</strong>{" "}
              {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </section>

          {/* SEO DATA */}
          <section className="bg-white p-6 rounded-xl border shadow-sm break-words">
            <h2 className="text-sm font-bold text-blue-600 uppercase mb-4">
              SEO Metadata
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="block text-gray-700">Meta Title:</strong>
                <span>{blog.metatitle || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">
                  Meta Description:
                </strong>
                <span className="text-gray-600">
                  {blog.metadescription || "-"}
                </span>
              </div>
              <div>
                <strong className="block text-gray-700">Keywords:</strong>
                <span>{blog.metakeywords || "-"}</span>
              </div>
              <div>
                <strong className="block text-gray-700">Canonical:</strong>
                <span className="text-blue-600">
                  {blog.metacanonical || "-"}
                </span>
              </div>
              {blog.schemaMarkup && (
                <div>
                  <strong className="block text-gray-700">
                    Schema JSON-LD:
                  </strong>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded mt-2 overflow-x-auto text-xs">
                    {typeof blog.schemaMarkup === "object"
                      ? JSON.stringify(blog.schemaMarkup, null, 2)
                      : blog.schemaMarkup}
                  </pre>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Small inline style block to fix Tailwind resetting Quill's lists and headers */}
      <style>{`
        .prose h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; mt-4; }
        .prose h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; mt-4; }
        .prose h3 { font-size: 1.17em; font-weight: bold; margin-bottom: 0.5em; mt-4; }
        .prose ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
        .prose ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
        .prose p { margin-bottom: 1em; }
        .prose a { color: #2563eb; text-decoration: underline; }
        .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; font-style: italic; color: #4b5563; }
      `}</style>
    </div>
  );
}
