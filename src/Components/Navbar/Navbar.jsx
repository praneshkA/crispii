import React from "react";
import logo from "../../Assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-800 border-gray-200 shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex space-x-6 overflow-x-auto px-1 no-scrollbar items-center py-2">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center mt-2">
          <a
            href="/"
            className="text-lg whitespace-nowrap px-1 py-3 rounded-md text-white hover:text-blue-600 hover:bg-white/10 font-semibold transition"
          >
          Home
          </a>
          <a
            href="/products"
            className="text-lg whitespace-nowrap px-1 py-2 rounded-md text-white hover:text-blue-600 hover:bg-white/10 font-semibold transition"
          >
            Products
          </a>
          <a
            href="/cart"
            className="text-lg whitespace-nowrap px-1 py-2 rounded-md text-white hover:text-blue-600 hover:bg-white/10 font-semibold transition"
          >
            Cart 🛒
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
