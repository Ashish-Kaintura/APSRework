import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./components/context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import SalesChart from "./Pages/SalesChart";
import UserDashboard from "./Pages/UserDashboard";
import AdminAuth from "./Pages/AdminAuth";
import Dashboard from "./Pages/Dashboard";
import ServicePage from "./Pages/ServicePage";
import CreateServicePage from "./Pages/CreateServicePage";
import ServicePreviewPage from "./Pages/ServicePreviewPage";
import EditServicePage from "./Pages/EditServicePage";
import BlogPage from "./Pages/BlogPage";
import CreateBlogPage from "./Pages/CreateBlogPage";
import EditBlogPage from "./Pages/EditBlogPage";
import BlogPreviewPage from "./Pages/BlogPreviewPage";

function Layout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {user && <Sidebar />}
      <main className="flex-1  h-screen  overflow-y-auto">
        <Toaster position="top-right" />
        <Routes>
          {/* Dashboard - Admin + SuperAdmin */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 🔥 SuperAdmin Only Route */}
          <Route
            path="/userDashboard"
            element={
              <ProtectedRoute role="superadmin">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Blogs */}
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addblog"
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <ProtectedRoute>
                <EditBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/view/:id"
            element={
              <ProtectedRoute>
                <BlogPreviewPage />
              </ProtectedRoute>
            }
          />

          {/* Services */}
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addservice"
            element={
              <ProtectedRoute>
                <CreateServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editService/:id"
            element={
              <ProtectedRoute>
                <EditServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/view/:id"
            element={
              <ProtectedRoute>
                <ServicePreviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesChart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/adminlogin" element={<AdminAuth />} />

          {/* Protected Layout */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
