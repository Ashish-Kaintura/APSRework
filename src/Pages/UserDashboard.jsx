import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../components/context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Search (Debounced)
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [confirmUser, setConfirmUser] = useState(null);

  // 🔥 Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  // ✅ Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUsers(data);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 Filtered Users
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
      .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter));
  }, [users, debouncedSearch, roleFilter]);

  // 🔥 Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // edituser
  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/update/${editUser}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("User updated successfully ✨");
      setEditUser(null);
      fetchUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  // ✅ Delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/delete/${confirmUser}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("User deleted successfully 🔥");
      setUsers(users.filter((u) => u._id !== confirmUser));
      setConfirmUser(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ Make Admin
  const handleMakeAdmin = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/make-admin/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("User promoted to Admin 🚀");
      fetchUsers();
    } catch {
      toast.error("Promotion failed");
    }
  };

  // ✅ Create User
  const handleCreateUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        return toast.error("All fields required");
      }

      await axios.post("http://localhost:5000/api/auth/register", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User created successfully 🎉");
      setShowCreateModal(false);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-[#CF2632] mb-6">
        User Management
      </h1>

      {/* 🔥 Controls */}
      {user?.role === "superadmin" && (
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded-lg w-full md:w-1/4"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Create User
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              {user?.role === "superadmin" && (
                <th className="p-4 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-4 bg-gray-200 h-6"></td>
                  <td className="p-4 bg-gray-200 h-6"></td>
                  <td className="p-4 bg-gray-200 h-6"></td>
                </tr>
              ))
            ) : currentUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 capitalize">{u.role}</td>

                  {user?.role === "superadmin" && (
                    <td className="p-4 text-center space-x-2">
                      {u.role === "user" && (
                        <button
                          onClick={() => handleMakeAdmin(u._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Make Admin
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditUser(u._id);
                          setEditData({
                            name: u.name,
                            email: u.email,
                            role: u.role,
                          });
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      {u.role !== "superadmin" && (
                        <button
                          onClick={() => setConfirmUser(u._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-[#CF2632] text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔥 Delete Modal */}
      {confirmUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete?</h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h2 className="text-lg font-semibold">Create User</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h2 className="text-lg font-semibold">Edit User</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded"
              value={editData.role}
              onChange={(e) =>
                setEditData({ ...editData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
