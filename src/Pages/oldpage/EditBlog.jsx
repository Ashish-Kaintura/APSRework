import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    CoverImage: "",
    Image: "",
    author: "",
    shortdescription: "",
    longdescription: "",
    metacanonical: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error loading blog:", err);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData);
      navigate("/");
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
       <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ← Back
      </button>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Edit Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </span>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </span>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Page URL
              </span>
              <input
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Page URL"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </span>
              <input
                name="shortdescription"
                value={formData.shortdescription}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </span>
              <input
                name="CoverImage"
                value={formData.CoverImage}
                onChange={handleChange}
                placeholder="Cover Image URL"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </span>
              <input
                name="Image"
                value={formData.Image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </span>
              <input
                name="metatitle"
                value={formData.metatitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </span>
              <input
                name="metadescription"
                value={formData.metadescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords
              </span>
              <input
                name="metakeywords"
                value={formData.metakeywords}
                onChange={handleChange}
                placeholder="Meta Keywords"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Meta Canonical
              </span>
              <input
                name="metacanonical"
                value={formData.metacanonical}
                onChange={handleChange}
                placeholder="Meta Canonical URL"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Long Description
          </label>
          <Editor
            apiKey="wgm1vxvta95up0cc9mnci5o3b1g3iopvs5le1xh7ay9h64a8"
            value={formData.longdescription}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) =>
              setFormData((prev) => ({ ...prev, longdescription: content }))
            }
          />
        </div>
         {/* <h2>
            Preview
          </h2> */}

        {/* Preview of longdescription with dangerouslySetInnerHTML */}
        {/* <div className="border p-2 rounded bg-gray-50">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: formData.longdescription }}
          />
        </div> */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
