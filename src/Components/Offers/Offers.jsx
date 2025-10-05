import React from "react";
import { motion as Motion } from "framer-motion";

const Offers = () => {
  return (
    <Motion.section
      className="w-full max-w-lg px-6 py-8 bg-white rounded-2xl shadow-md mx-auto my-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      viewport={{ once: true }}
    >
      <Motion.h2
        className="text-2xl font-semibold mb-3 text-gray-900"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Special Offers <span role="img" aria-label="gift">🎁</span>
      </Motion.h2>

      <Motion.p
        className="text-gray-700 text-base md:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Don’t miss out on our limited-time snack deals.
      </Motion.p>
    </Motion.section>
  );
};

export default Offers;
