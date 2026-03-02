import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API = "http://localhost:5000/api/services";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(API);
      setServices(data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${confirmDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Service deleted");
      setConfirmDelete(null);
      fetchServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async (service) => {
    await axios.patch(
      `${API}/${service._id}`,
      { status: service.status === "draft" ? "published" : "draft" },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchServices();
  };

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()),
  );

  const perPage = 6;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Service Management</h1>

        <Link to="/addservice">
          {" "}
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            + Create Service
          </button>
          
        </Link>
        
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-3 border rounded-lg"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-6 animate-pulse">Loading services...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((service) => (
                <tr key={service._id} className="border-t">
                  <td className="p-4 font-medium">{service.title}</td>

                  <td>
                    <button
                      onClick={() => toggleStatus(service)}
                      className={`px-3 py-1 rounded text-sm ${
                        service.status === "published"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {service.status}
                    </button>
                  </td>

                  <td className="space-x-3">
                    <button
                      onClick={() => navigate(`/editService/${service._id}`)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setConfirmDelete(service._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                    <button
                     onClick={() => navigate(`/services/view/${service._id}`)}
                      className="text-green-600 "
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(Math.ceil(filtered.length / perPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
