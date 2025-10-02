import React from "react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-500   to-blue-800 rounded-3xl px-6 py-12 mx-4 text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Address Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">Crispii Pvt. Ltd.</h2>
         
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/return-exchange" className="hover:underline">Return & Exchange Policy</a>
          <a href="/shipping-policy" className="hover:underline">Shipping Policy</a>
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </div>

        {/* Instagram Icon */}
        <div className="flex justify-center md:justify-start pt-2 text-2xl">
          <a href="https://www.instagram.com/crispii_snacks" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left text-white/90 text-sm pt-4">
          © 2025 Crispii. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
