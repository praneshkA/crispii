import React, { useState, useEffect } from "react";
import logogif from "../../assets/logogif.gif";
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { BASE_API_URL } from "../../config";

const Navbar = ({ cartCount = 0, auth = null, onLogout, menuOpen, setMenuOpen }) => {
  // Favourites count from localStorage
  const [favouriteCount, setFavouriteCount] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites"))?.length || 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        setFavouriteCount(JSON.parse(localStorage.getItem("favourites"))?.length || 0);
      } catch {
        setFavouriteCount(0);
      }
    };
    window.addEventListener("storage", handleStorage);
    // Also update on mount
    handleStorage();
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  // Modal search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchOpen) {
      setLoading(true);
      fetch(`${BASE_API_URL}/api/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }
  }, [searchOpen]);

  return (
    <nav className="bg-gradient-to-br from-pink-700 to-blue-800 w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-20">
        <div className="grid grid-cols-3 items-center h-full">
          {/* Left: Hamburger + Mobile favourites (Mobile) / Desktop Links (Desktop) */}
          <div className="flex items-center justify-start">
            {/* Hamburger (mobile only) */}
            <button
              className="text-white md:hidden text-2xl mr-4 hover:scale-110 transition-transform duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile: favourites on the left (hidden on md+) */}
            <div className="md:hidden">
              <Link to="/favourites" className="relative text-pink-500 text-2xl mx-2" aria-label="Favourites">
                <FaHeart />
                {favouriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {favouriteCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-5 items-center">
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
          <div className="flex justify-center">
            <Link to="/">
              <img src={logogif} alt="Logo" className="h-20" />
            </Link>
          </div>

          {/* Right: Search (button), Favourites (desktop), Cart */}
          <div className="flex items-center gap-6 justify-end">
            {/* Search Icon triggers modal (visible on all sizes, placed on the right) */}
            <button
              className="text-white text-2xl hover:text-blue-400 hover:scale-110 transition-all duration-200 focus:outline-none"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* Heart Icon for favourites (desktop only) */}
            <Link to="/favourites" className="hidden md:inline-flex relative text-pink-500 text-2xl hover:text-pink-600 hover:scale-110 transition-all duration-200" aria-label="Favourites">
              <FaHeart />
              {favouriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {favouriteCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
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
      </div>

      {/* Modal Search Bar */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 z-[101] flex flex-col">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSearchOpen(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Search Products</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="border rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring focus:border-blue-400 mb-4"
              autoFocus
            />
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {products.length === 0 ? (
                  <div className="text-gray-500 text-center py-6">No products found</div>
                ) : (
                  products
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((p) => (
                      <Link
                        key={p._id}
                        to="/products"
                        onClick={() => setSearchOpen(false)}
                        className="px-3 py-2 rounded hover:bg-blue-100 transition flex items-center gap-3"
                      >
                        <img
                          src={p.image && p.image.startsWith("http") ? p.image : `${BASE_API_URL}${p.image}`}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://res.cloudinary.com/dzvimdj7w/image/upload/v123456/no-image.png";
                          }}
                        />
                        <span className="font-medium text-gray-800">{p.name}</span>
                      </Link>
                    ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
      <style>{`
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
}

export default Navbar;