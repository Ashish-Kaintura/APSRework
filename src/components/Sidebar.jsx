import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaServicestack,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../components/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close sidebar on mobile after clicking a link
  const closeSidebar = () => setIsOpen(false);

  const linkClasses =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium";

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#CF2632] text-white rounded-md shadow-lg transition-transform hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Dark Overlay for Mobile (Click outside to close) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-64 bg-white shadow-xl p-5 h-screen flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#CF2632] mb-6 md:mt-0 mt-8">
            APS Admin Panel
          </h2>

          {/* User Info From Context */}
          {user && (
            <div className="mb-6 p-3 bg-gray-100 rounded-lg">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2">
            <NavLink
              to="/userDashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} bg-[#CF2632] text-white`
                  : `${linkClasses} text-gray-700 hover:bg-gray-100`
              }
            >
              <FaUser />
              Users
            </NavLink>

            <NavLink
              to="/blogs"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} bg-[#CF2632] text-white`
                  : `${linkClasses} text-gray-700 hover:bg-gray-100`
              }
            >
              <FaBlog />
              Blogs
            </NavLink>

            <NavLink
              to="/services"
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? `${linkClasses} bg-[#CF2632] text-white`
                  : `${linkClasses} text-gray-700 hover:bg-gray-100`
              }
            >
              <FaServicestack />
              Services
            </NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-4 border-t pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-3 px-4 py-2 rounded-lg bg-[#CF2632] text-white hover:opacity-90 transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
