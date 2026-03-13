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
import Logo from "../images/logo/aps logo white.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setMenuOpen(false);
  // }, [location.pathname]);
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setMobileSubDropdown(null);
  }, [location.pathname]);

  //   💡 Optional (better UX)

  // If you also want the dropdown to close immediately when clicking a link, add this helper:

  // const closeMenus = () => {
  //   setMenuOpen(false);
  //   setOpenDropdown(null);
  //   setActiveDropdown(null);
  //   setActiveSubDropdown(null);
  //   setMobileSubDropdown(null);
  // };

  // Then use it:

  // <NavLink to="/about-us" onClick={closeMenus}></NavLink>

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

  const dropdowns = {
    Services: [
      { name: "Man Guard", path: "/services/man-guard" },
      { name: "IFM", path: "/services/integrated-facility-management" },
      {
        name: "Surveillance",
        path: "/services/surveillance",
        children: [
          {
            name: "Training",
            path: "/services/surveillance/cctv-monitoring",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

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
            <div className="flex justify-between items-center px-4 py-2 hover:bg-indigo-100 text-sm text-gray-700 transition">
              {item.name}
              {item.children && <ChevronDown size={14} />}
            </div>
          </NavLink>

          {item.children && activeSubDropdown === item.name && (
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
      {/* Top Bar */}
      {scrolling && (
        <div className="text-white text-sm w-full md:flex hidden justify-center py-2 bg-black/80">
          <div className="w-full max-w-[1320px] flex justify-between items-center px-6">
            <span>Book Online • You can request appointment 24 hours</span>

            <div className="flex items-center gap-4">
              <span>Phone: +91 92895 95558</span>

              <div className="flex gap-3 text-white text-base">
                <Link
                  to="https://www.facebook.com/starallianceaviationacademy/"
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <FaFacebookF />
                </Link>

                <Link
                  to="https://x.com/staralliance_in"
                  className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center"
                >
                  <FaTwitter />
                </Link>

                <Link
                  to="https://www.linkedin.com/company/starallianceaviationacademy/"
                  className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center"
                >
                  <FaLinkedinIn />
                </Link>

                <Link
                  to="https://www.instagram.com/starallianceaviation/?hl=en"
                  className="w-8 h-8 bg-pink-700 rounded-full flex items-center justify-center"
                >
                  <FaInstagram />
                </Link>

                <Link
                  to="https://in.pinterest.com/starallianceaviationacademy/"
                  className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center"
                >
                  <FaPinterestP />
                </Link>

                <Link
                  to="https://www.youtube.com/@starallianceaviationacademy"
                  className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <div
        className={`hidden md:flex ${
          scrolling ? "w-[1180px]" : "w-full"
        } justify-center bg-gradient-to-r from-primary via-[#a0021c] to-[#a9002d] text-white shadow transition-all duration-300 uppercase`}
      >
        <nav className="flex items-center justify-between w-full max-w-[1320px] px-4 py-2 relative">
          <Link to="/">
            <img src={Logo} alt="logo" className="h-[50px]" />
          </Link>

          <ul className="flex gap-6 text-sm font-medium relative">
            <NavLink to="/">
              <li className="hover:text-Secondary">Home</li>
            </NavLink>

            <NavLink to="/about-us">
              <li className="hover:text-Secondary">About Us</li>
            </NavLink>

            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("Services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 cursor-pointer hover:text-Secondary">
                <NavLink to="/services"> Services</NavLink>
                <ChevronDown size={16} />
              </div>

              {activeDropdown === "Services" && renderDropdown("Services")}
            </li>

            <NavLink to="/blog">
              <li className="hover:text-Secondary">Blog</li>
            </NavLink>

            <NavLink to="/contact-us">
              <li className="hover:text-Secondary">Contact Us</li>
            </NavLink>
          </ul>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-semibold">
                  Hello, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-Secondary px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-Secondary px-4 py-2 rounded text-sm font-semibold"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="w-full md:hidden bg-primary text-white shadow px-4 py-2">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img
              src="https://i.postimg.cc/hvBpty6H/white-logo.png"
              alt="logo"
              className="h-14"
            />
          </NavLink>

          <FaBars
            size={26}
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {menuOpen && (
          <div className="mt-4">
            <ul className="flex flex-col gap-3 text-base font-medium">
              <NavLink to="/">
                <li className="px-3 py-2 hover:bg-gray-100 hover:text-primary rounded">
                  Home
                </li>
              </NavLink>

              <NavLink to="/about-us">
                <li className="px-3 py-2 hover:bg-gray-100 hover:text-primary rounded">
                  About Us
                </li>
              </NavLink>

              {/* Services */}
              <li>
                <button
                  className="flex w-full justify-between items-center px-3 py-2 hover:bg-gray-100 hover:text-primary rounded"
                  onClick={() => toggleDropdown("Services")}
                >
                  <NavLink to="/services" > Services</NavLink>
                  {openDropdown === "Services" ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </button>

                {openDropdown === "Services" && (
                  <ul className="ml-4 mt-2 space-y-2 border-l-2 border-indigo-200 pl-3">
                    {dropdowns.Services.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between items-center">
                          <NavLink to={item.path}>
                            <li className="px-2 py-1 hover:bg-indigo-50 rounded">
                              {item.name}
                            </li>
                          </NavLink>

                          {item.children && (
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
                                <FaChevronUp size={12} />
                              ) : (
                                <FaChevronDown size={12} />
                              )}
                            </button>
                          )}
                        </div>

                        {item.children && mobileSubDropdown === item.name && (
                          <ul className="ml-4 mt-2 space-y-2 border-l pl-3">
                            {item.children.map((child) => (
                              <NavLink key={child.name} to={child.path}>
                                <li className="px-2 py-1 hover:bg-indigo-50 rounded">
                                  {child.name}
                                </li>
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
                <li className="px-3 py-2 hover:bg-gray-100 hover:text-primary rounded">
                  Contact Us
                </li>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
