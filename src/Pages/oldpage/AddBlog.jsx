import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGFmMjNjODIxZGE0Yzg5N2VmODM4NSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzcwNzE0OTgyfQ.4Tlg89eWKocoTXh3Xavpy6PIcj--A5YPnj2-VHbST4U";
  // text fields
  const [form, setForm] = useState({
    title: "",
    url: "",
    author: "",
    shortdescription: "",
    longdescription: "",
    metacanonical: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
  });

  // file fields
  const [files, setFiles] = useState({
    CoverImage: null,
    Image: null,
    Image2: null,
    bgImage: null,
  });

  // existing images (for edit preview)
  const [existingImages, setExistingImages] = useState({});

  // fetch blog if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/blogs/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            title: data.title || "",
            url: data.url || "",
            author: data.author || "",
            shortdescription: data.shortdescription || "",
            longdescription: data.longdescription || "",
            metacanonical: data.metacanonical || "",
            metatitle: data.metatitle || "",
            metadescription: data.metadescription || "",
            metakeywords: data.metakeywords || "",
          });

          setExistingImages({
            CoverImage: data.CoverImage,
            Image: data.Image,
            Image2: data.Image2,
            bgImage: data.bgImage,
          });

          editorRef.current?.setContent(data.longdescription || "");
        })
        .catch(console.error);
    }
  }, [id]);

  // submit handler
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // append text fields
      Object.keys(form).forEach((key) => {
        if (key !== "longdescription") {
          formData.append(key, form[key]);
        }
      });

      // editor content
      formData.append(
        "longdescription",
        editorRef.current?.getContent()
      );

      // append files only if selected
      if (files.CoverImage) formData.append("CoverImage", files.CoverImage);
      if (files.Image) formData.append("Image", files.Image);
      if (files.Image2) formData.append("Image2", files.Image2);
      if (files.bgImage) formData.append("bgImage", files.bgImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${AUTH_TOKEN}` // if required
        },
      };

      if (id) {
        await axios.put(
          `http://localhost:5000/api/blogs/${id}`,
          formData,
          config
        );
        alert("Blog updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/blogs",
          formData,
          config
        );
        alert("Blog created successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error saving blog");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <input
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Author"
            className="w-full p-2 border rounded"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
          />

          <input
            placeholder="Short Description"
            className="w-full p-2 border rounded"
            value={form.shortdescription}
            onChange={(e) =>
              setForm({ ...form, shortdescription: e.target.value })
            }
          />

          {/* Images */}
          <label className="block">
            Cover Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, CoverImage: e.target.files[0] })
              }
              className="w-full mt-1"
            />
            {existingImages.CoverImage && (
              <img
                src={`http://localhost:5000${existingImages.CoverImage}`}
                className="h-20 mt-2 rounded"
                alt=""
              />
            )}
          </label>

          <label className="block">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, Image: e.target.files[0] })
              }
              className="w-full mt-1"
            />
          </label>

          <label className="block">
            Image 2
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, Image2: e.target.files[0] })
              }
              className="w-full mt-1"
            />
          </label>

          <label className="block">
            Background Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFiles({ ...files, bgImage: e.target.files[0] })
              }
              className="w-full mt-1"
            />
          </label>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <input
            placeholder="Meta Title"
            className="w-full p-2 border rounded"
            value={form.metatitle}
            onChange={(e) =>
              setForm({ ...form, metatitle: e.target.value })
            }
          />

          <input
            placeholder="Meta Description"
            className="w-full p-2 border rounded"
            value={form.metadescription}
            onChange={(e) =>
              setForm({ ...form, metadescription: e.target.value })
            }
          />

          <input
            placeholder="Meta Keywords"
            className="w-full p-2 border rounded"
            value={form.metakeywords}
            onChange={(e) =>
              setForm({ ...form, metakeywords: e.target.value })
            }
          />

          <input
            placeholder="Canonical URL"
            className="w-full p-2 border rounded"
            value={form.metacanonical}
            onChange={(e) =>
              setForm({ ...form, metacanonical: e.target.value })
            }
          />

          <input
            placeholder="URL Slug"
            className="w-full p-2 border rounded"
            value={form.url}
            onChange={(e) =>
              setForm({ ...form, url: e.target.value })
            }
          />
        </div>
      </div>

      {/* Editor */}
      <div className="mt-6">
        <Editor
          apiKey="wgm1vxvta95up0cc9mnci5o3b1g3iopvs5le1xh7ay9h64a8"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 400,
            menubar: false,
            plugins:
              "advlist autolink lists link image charmap preview code fullscreen",
            toolbar:
              "undo redo | bold italic underline | align | bullist numlist | link image",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-6"
      >
        {id ? "Update Blog" : "Create Blog"}
      </button>
    </div>
  );
};

export default AddBlog;
