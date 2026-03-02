import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGFmMjNjODIxZGE0Yzg5N2VmODM4NSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzcwNzE0OTgyfQ.4Tlg89eWKocoTXh3Xavpy6PIcj--A5YPnj2-VHbST4U"; // or from your auth context
        // const AUTH_TOKEN = localStorage.getItem("authToken"); // or from your auth context
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AUTH_TOKEN}`
          }
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Error loading blog:", err);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!blog) return <div className="p-6">Blog not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {blog.CoverImage && (
        <img
          // src={`http://localhost:5000${blog.CoverImage}`}
          src={blog.CoverImage}
          alt={blog.title}
          className="mb-4 w-full max-h-[400px] object-cover rounded"
        />
      )}
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.longdescription }}
      />
    </div>
  );
};

export default BlogPreview;
