import React from "react";
import { FaInstagram } from "react-icons/fa";
import { motion as Motion } from "framer-motion";

const Footer = () => {
  return (
    <Motion.footer
      className="bg-gradient-to-br from-pink-500 to-blue-800 rounded-3xl px-6 py-12 mx-4 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Company Name */}
        <Motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-1">Crispii Pvt. Ltd.</h2>
        </Motion.div>

        {/* Links Section */}
        <Motion.div
          className="flex flex-wrap justify-center md:justify-start gap-4 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact Us" },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/return-exchange", label: "Return & Exchange Policy" },
            { href: "/shipping-policy", label: "Shipping Policy" },
            { href: "/terms-of-service", label: "Terms of Service" },
          ].map((link, index) => (
            <Motion.a
              key={index}
              href={link.href}
              className="hover:underline hover:text-yellow-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              {link.label}
            </Motion.a>
          ))}
        </Motion.div>

        {/* Instagram Icon */}
        <Motion.div
          className="flex justify-center md:justify-start pt-2 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Motion.a
            href="https://www.instagram.com/crispii_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors duration-300"
            whileHover={{ rotate: 10, scale: 1.2 }}
          >
            <FaInstagram />
          </Motion.a>
        </Motion.div>

        {/* Copyright */}
        <Motion.div
          className="text-center md:text-left text-white/90 text-sm pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          © 2025 Crispii. All rights reserved.
        </Motion.div>
      </div>
    </Motion.footer>
  );
};

export default Footer;
