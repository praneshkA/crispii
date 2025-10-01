import React, { useState } from "react";
import logogif from "../../assets/logogif.gif";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, onSearch, auth = null, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // For mobile search
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <nav className="bg-gradient-to-br from-yellow-500  via-violet-900 to-blue-800 w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-20">
        
        {/* Left: Hamburger */}
        <div className="flex items-center">
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
            {auth && auth.userId && auth.userId !== 'guest' ? (
              <>
                <button
                  onClick={() => onLogout && onLogout()}
                  className="text-white font-semibold hover:text-blue-400 transition"
                >
                  Logout
                </button>
              </>
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

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-3 relative">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 rounded text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-1 top-1 text-gray-600">
              <FaSearch />
            </button>
          </form>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch />
          </button>

          {/* Mobile Search Input */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="absolute top-20 right-0 w-64 bg-white flex items-center px-2 py-1 rounded shadow-md md:hidden z-50"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow text-sm outline-none"
              />
              <button type="submit" className="ml-1 text-gray-600">
                <FaSearch />
              </button>
            </form>
          )}

          {/* Cart */}
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

      {/* Mobile Menu Sliding */}
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
          {auth && auth.userId && auth.userId !== 'guest' ? (
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
      {(menuOpen || searchOpen) && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
