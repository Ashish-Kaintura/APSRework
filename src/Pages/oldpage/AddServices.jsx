import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const AddService = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    intro: "",
     shortdescription: "",
    description: "",
    longdescription: "",
    CoverImage: "",
    bgImage: "",
    img: "",
    url: "",
    metacanonical: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
    SubServices: [],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubChange = (index, field, value) => {
    const updated = [...formData.SubServices];
    updated[index][field] = value;
    setFormData({ ...formData, SubServices: updated });
  };

  const addSubService = () =>
    setFormData({
      ...formData,
      SubServices: [...formData.SubServices, {}],
    });

  const removeSubService = (index) => {
    const updated = [...formData.SubServices];
    updated.splice(index, 1);
    setFormData({ ...formData, SubServices: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/services/`,
        formData
      );
      navigate("/services");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
       <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "title",
          "intro",
          "shortdescription",
          "description",

          <div>
            <label className="block font-medium capitalize">
              Long Description
            </label>
            <Editor
              value={formData.longdescription}
              apiKey="wgm1vxvta95up0cc9mnci5o3b1g3iopvs5le1xh7ay9h64a8"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat",
              }}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, longdescription: content }))
              }
            />
          </div>,
          "CoverImage",
          "bgImage",
          "img",
          "url",
          " metacanonical",
          "metatitle",
          "metadescription",
          "metakeywords",
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <div>
          <h3 className="text-lg font-semibold">Sub Services</h3>
          <button
            type="button"
            onClick={addSubService}
            className="bg-blue-600 text-white px-3 py-1 my-2 rounded"
          >
            + Add SubService
          </button>
          {formData.SubServices.map((sub, index) => (
            <div key={index} className="p-4 border rounded mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">SubService {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeSubService(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              {[
                "title",
                "intro",
                "description",
                "shortdescription",
                "longdescription",
                "CoverImage",
                "bgImage",
                "img",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm">{field}</label>
                  <input
                    type="text"
                    value={sub[field] || ""}
                    onChange={(e) =>
                      handleSubChange(index, field, e.target.value)
                    }
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddService;
