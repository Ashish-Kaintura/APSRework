import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blog List</h2>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Blog
        </button>
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Img</th>
              <th className="border px-4 py-2">Title</th>
              {/* <th className="border px-4 py-2">Meta Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Meta Description</th> */}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">
                    {blog.CoverImage ? (
                      <img
                        src={blog.CoverImage}
                        alt={blog.title}
                        className="h-12 w-12 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 font-semibold">
                    {blog.title}
                  </td>
                  {/* <td className="border px-4 py-2">{blog.metatitle}</td>
                  <td className="border px-4 py-2 max-w-xs">
                    <div
                      className="line-clamp-2 text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.longdescription?.slice(0, 100) +
                          (blog.longdescription?.length > 100 ? "..." : ""),
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">{blog.metadescription}</td>
                  <td className="border px-4 py-2">{blog.metakeywords}</td> */}
                  <td className="border px-4 py-2 space-y-2">
                    <button
                      onClick={() => navigate(`/edit/${blog._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/view/${blog._id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
