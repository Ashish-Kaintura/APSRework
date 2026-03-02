import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setservices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchServices = async () => {
    setLoading(true);
    try {
      // const res = await axios.get("http://localhost:5000/api/services");
      const res = await axios.get(
        "http://localhost:5000/api/services/"
      );
      setservices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
    setLoading(false);
  };

  const deleteservice = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      // await axios.delete(`http://localhost:5000/api/services/${id}`);
      await axios.delete(
        `http://localhost:5000/api/services/${id}`
      );
      fetchServices();
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleServiceStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/services/${id}`,
        {
          isActive: !currentStatus,
        }
      );
      fetchServices(); // refresh the list
    } catch (err) {
      console.error("Failed to update service status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Services List</h2>
        <button
          onClick={() => navigate("/addservice")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add New Service
        </button>
      </div>
      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Img</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Meta Title</th>
              <th className="border px-4 py-2">Meta Description</th>
              <th className="border px-4 py-2">Meta Keyword</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">
                    {service.CoverImage ? (
                      <img
                        src={service.CoverImage}
                        alt={service.title}
                        className="h-12 w-12 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 font-semibold">
                    {service.title}
                  </td>
                  <td className="border px-4 py-2 max-w-xs">
                    <div
                      className="line-clamp-2 text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html:
                          service.longdescription?.slice(0, 100) +
                          (service.longdescription?.length > 100 ? "..." : ""),
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">{service.metatitle}</td>
                  <td className="border px-4 py-2">
                    {service.metadescription}
                  </td>
                  <td className="border px-4 py-2">{service.metakeywords}</td>
                  <td className="border px-4 py-2  space-x-2 flex justify-center">
                    <button
                      onClick={() => navigate(`/editService/${service._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteservice(service._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/services/view/${service._id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        toggleServiceStatus(service._id, service.isActive)
                      }
                      className={`${
                        service.isActive
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-3 py-1 rounded shadow`}
                    >
                      {service.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        service.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
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

export default Services;
