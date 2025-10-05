import React from "react";
import logogif from "../../assets/logogif.gif";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, auth = null, onLogout, menuOpen, setMenuOpen }) => {
  return (
    <nav className="bg-gradient-to-br from-pink-700 to-blue-800 w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-20">
        
        {/* Left: Hamburger + Links */}
        <div className="flex items-center">
          {/* Hamburger (mobile) */}
          <button
            className="text-white md:hidden text-2xl mr-2 hover:scale-110 transition-transform duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white font-semibold hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/myorders" className="text-white font-semibold hover:text-blue-400 transition">
              My Orders
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
          <Link to="/cart" className="relative text-white text-2xl hover:text-blue-400 hover:scale-110 transition-all duration-200">
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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-violet-800 to-purple-900 text-white shadow-2xl transform transition-all duration-500 ease-out z-40
          ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        {/* Close button with animation */}
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setMenuOpen(false)} 
            className="text-2xl hover:rotate-90 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Links with staggered animation */}
        <div className="flex flex-col mt-8 space-y-6 px-6">
          <Link 
            to="/" 
            className={`text-lg font-semibold hover:text-blue-300 hover:translate-x-2 transition-all duration-300 transform
              ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
              ${menuOpen ? "transition-delay-100" : ""}`}
            style={{ transitionDelay: menuOpen ? "100ms" : "0ms" }}
            onClick={() => setMenuOpen(false)}
          >
            🏠 Home
          </Link>
          
          <Link 
            to="/myorders" 
            className={`text-lg font-semibold hover:text-blue-300 hover:translate-x-2 transition-all duration-300 transform
              ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
            style={{ transitionDelay: menuOpen ? "200ms" : "0ms" }}
            onClick={() => setMenuOpen(false)}
          >
            📦 My Orders
          </Link>
          
          <Link 
            to="/contact" 
            className={`text-lg font-semibold hover:text-blue-300 hover:translate-x-2 transition-all duration-300 transform
              ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
            style={{ transitionDelay: menuOpen ? "300ms" : "0ms" }}
            onClick={() => setMenuOpen(false)}
          >
            📞 Contact Us
          </Link>
          
          {auth && auth.userId && auth.userId !== "guest" ? (
            <button
              onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}
              className={`text-lg font-semibold hover:text-blue-300 hover:translate-x-2 transition-all duration-300 text-left transform
                ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
            >
              🚪 Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className={`text-lg font-semibold hover:text-blue-300 hover:translate-x-2 transition-all duration-300 transform
                ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              🔐 Login/Signup
            </Link>
          )}
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className={`border-t border-white/20 pt-4 text-center text-sm text-white/60 transform transition-all duration-500
            ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            Menu
          </div>
        </div>
      </div>

      {/* Overlay with fade animation */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 animate-fadeIn"
          onClick={() => setMenuOpen(false)}
          style={{
            animation: "fadeIn 0.3s ease-out"
          }}
        />
      )}

      {/* Add keyframe animation in style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;