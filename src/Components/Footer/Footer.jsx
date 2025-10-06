import React from "react";
import { Instagram } from "lucide-react";
import { motion as Motion } from "framer-motion";

const Footer = () => {
  return (
    <Motion.footer
      className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-700 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Main Content */}
      <div className="px-8 py-16 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Crispii Pvt Ldt
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Premium snacks delivered with love. Quality you can taste, service you can trust.
            </p>
            <Motion.a
              href="https://www.instagram.com/crispii_snacks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-lg hover:text-pink-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Instagram size={24} />
              <span className="text-sm font-medium">@crispii_snacks</span>
            </Motion.a>
          </Motion.div>

          {/* Quick Links */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/shipping-policy", label: "Shipping Policy" },
              ].map((link, index) => (
                <li key={index}>
                  <Motion.a
                    href={link.href}
                    className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </Motion.a>
                </li>
              ))}
            </ul>
          </Motion.div>

          {/* Policies */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-yellow-300">Legal</h3>
            <ul className="space-y-3">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/return-exchange", label: "Return & Exchange" },
                { href: "/terms-of-service", label: "Terms of Service" },
              ].map((link, index) => (
                <li key={index}>
                  <Motion.a
                    href={link.href}
                    className="text-white/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </Motion.a>
                </li>
              ))}
            </ul>
          </Motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-8"></div>

        {/* Bottom Bar */}
        <Motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>© 2025 Crispii Pvt. Ltd. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </Motion.div>
      </div>
    </Motion.footer>
  );
};

export default Footer;