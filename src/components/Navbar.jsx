import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaBars,
  FaYoutube,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import axios from "axios";

import Logo from "../images/logo/aps logo white.png";

const API = "http://localhost:5000/api/services";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({ Services: [] });
  const [scrolling, setScrolling] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setMobileSubDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     FETCH SERVICES + SUBSERVICES
  ========================== */

  const fetchServices = async () => {
    try {
      const res = await axios.get(API);

      const services = res.data
        .filter((service) => service.status === "published")
        .sort((a, b) => a.order - b.order)
        .map((service) => ({
          name: service.title,
          path: `/services/${service.slug}`,
          children:
            service.subServices?.map((sub) => ({
              name: sub.title,
              path: `/services/${service.slug}/${sub.slug}`,
            })) || [],
        }));

      setDropdowns({ Services: services });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  /* =========================
     USER LOGIN
  ========================== */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  /* =========================
     DESKTOP DROPDOWN
  ========================== */

  const renderDropdown = (key) => (
    <div className="absolute top-full left-0 bg-white rounded shadow-md py-2 w-64 z-50">
      {dropdowns[key].map((item) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => setActiveSubDropdown(item.name)}
          onMouseLeave={() => setActiveSubDropdown(null)}
        >
          <NavLink to={item.path}>
            <div className="flex justify-between items-center px-4 py-2 hover:bg-indigo-100 text-sm text-gray-700">
              {item.name}
              {item.children?.length > 0 && <ChevronDown size={14} />}
            </div>
          </NavLink>

          {item.children?.length > 0 && activeSubDropdown === item.name && (
            <div className="absolute left-full top-0 bg-white shadow-md rounded w-60">
              {item.children.map((child) => (
                <NavLink key={child.name} to={child.path}>
                  <div className="px-4 py-2 hover:bg-indigo-100 text-sm text-gray-700">
                    {child.name}
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full font-sans">
      {/* ================= TOP BAR ================= */}

      {scrolling && (
        <div className="text-white text-sm w-full md:flex hidden justify-center py-2 bg-black/80">
          <div className="w-full max-w-[1320px] flex justify-between px-6">
            <span>Book Online • You can request appointment 24 hours</span>

            <div className="flex items-center gap-4">
              <span>Phone: +91 92895 95558</span>

              <div className="flex gap-3">
                <Link to="#">
                  <FaFacebookF />
                </Link>
                <Link to="#">
                  <FaTwitter />
                </Link>
                <Link to="#">
                  <FaLinkedinIn />
                </Link>
                <Link to="#">
                  <FaInstagram />
                </Link>
                <Link to="#">
                  <FaPinterestP />
                </Link>
                <Link to="#">
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESKTOP NAVBAR ================= */}

      <div
        className={`hidden md:flex ${
          scrolling ? "w-[1180px]" : "w-full"
        } justify-center bg-gradient-to-r from-primary via-[#a0021c] to-[#a9002d] text-white shadow uppercase`}
      >
        <nav className="flex items-center justify-between w-full max-w-[1320px] px-4 py-2 relative">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-[50px]" />
          </Link>

          <ul className="flex gap-6 text-sm font-medium">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>

            <NavLink to="/about-us">
              <li>About Us</li>
            </NavLink>

            {/* SERVICES */}

            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("Services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <NavLink to="/services">Services</NavLink>
                <ChevronDown size={16} />
              </div>

              {activeDropdown === "Services" && renderDropdown("Services")}
            </li>

            <NavLink to="/blog">
              <li>Blog</li>
            </NavLink>

            <NavLink to="/contact-us">
              <li>Contact Us</li>
            </NavLink>
          </ul>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span>Hello {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-Secondary px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-Secondary px-4 py-2 rounded">
                Login / Signup
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}

      <div className="w-full md:hidden bg-primary text-white shadow px-4 py-2">
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <img src={Logo} className="h-14" />
          </NavLink>

          <FaBars
            size={26}
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          />
        </div>

        {menuOpen && (
          <div className="mt-4">
            <ul className="flex flex-col gap-3">
              <NavLink to="/">
                <li>Home</li>
              </NavLink>

              <NavLink to="/about-us">
                <li>About Us</li>
              </NavLink>

              {/* MOBILE SERVICES */}

              <li>
                <button
                  className="flex justify-between w-full"
                  onClick={() => toggleDropdown("Services")}
                >
                  Services
                  {openDropdown === "Services" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>

                {openDropdown === "Services" && (
                  <ul className="ml-4 mt-2 border-l pl-3">
                    {dropdowns.Services.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between">
                          <NavLink to={item.path}>
                            <li>{item.name}</li>
                          </NavLink>

                          {item.children?.length > 0 && (
                            <button
                              onClick={() =>
                                setMobileSubDropdown(
                                  mobileSubDropdown === item.name
                                    ? null
                                    : item.name,
                                )
                              }
                            >
                              {mobileSubDropdown === item.name ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                          )}
                        </div>

                        {mobileSubDropdown === item.name && (
                          <ul className="ml-4 mt-2 border-l pl-3">
                            {item.children.map((child) => (
                              <NavLink key={child.name} to={child.path}>
                                <li>{child.name}</li>
                              </NavLink>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </ul>
                )}
              </li>

              <NavLink to="/contact-us">
                <li>Contact Us</li>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
