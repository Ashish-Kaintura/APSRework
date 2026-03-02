import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function AdminAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      login(data.user, data.token);

      // 🔥 Role Based Redirect
      if (data.user.role === "superadmin") {
        navigate("/userDashboard");
      } else if (data.user.role === "admin") {
        navigate("/");
      } else {
        setError("You are not authorized as Admin.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding Section */}
      <div
        className="hidden md:flex w-1/2 text-white flex-col justify-center items-center p-12"
        style={{ backgroundColor: "#CF2632" }}
      >
        <ShieldCheck size={60} className="mb-6" />
        <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
        <p className="text-lg text-white/90 text-center max-w-md">
          Securely access your dashboard and manage system operations with full
          administrative control.
        </p>
      </div>

      {/* Right Login Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
          <h2
            className="text-3xl font-bold mb-2 text-center"
            style={{ color: "#CF2632" }}
          >
            Admin Login
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your credentials to continue
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CF2632] transition"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#CF2632] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <button
                type="button"
                className="hover:underline"
                style={{ color: "#CF2632" }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: "#CF2632" }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
