import React, { useState } from "react";
import logogif from "../../assets/logogif.gif";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, auth = null, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-yellow-500 via-violet-900 to-blue-800 w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-20">
        
        {/* Left: Hamburger + Links */}
        <div className="flex items-center">
          {/* Hamburger (mobile) */}
          <button
            className="text-white md:hidden text-2xl mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white font-semibold hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/contact" className="text-white font-semibold hover:text-blue-400 transition">
              Contact Us
            </Link>
            {auth && auth.userId && auth.userId !== "guest" ? (
              <button
                onClick={() => onLogout && onLogout()}
                className="text-white font-semibold hover:text-blue-400 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-white font-semibold hover:text-blue-400 transition">
                Login/Signup
              </Link>
            )}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logogif} alt="Logo" className="h-20 mx-auto" />
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="flex items-center gap-3 relative">
          <Link to="/cart" className="relative text-white text-2xl hover:text-blue-400 transition">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-violet-800 text-white transform transition-transform duration-300 z-40
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col mt-8 space-y-6 px-6">
          <Link to="/" className="text-lg font-semibold hover:text-blue-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/contact" className="text-lg font-semibold hover:text-blue-400" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          {auth && auth.userId && auth.userId !== "guest" ? (
            <button
              onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}
              className="text-lg font-semibold hover:text-blue-400 text-left"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-lg font-semibold hover:text-blue-400" onClick={() => setMenuOpen(false)}>
              Login/Signup
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
