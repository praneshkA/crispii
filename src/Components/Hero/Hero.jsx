import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const Hero = () => {
  return (
    <Motion.section
      className="bg-gradient-to-br from-pink-700 to-blue-900 rounded-3xl px-6 py-16 mx-4 md:mx-20 lg:mx-40 mb-10 shadow-lg flex flex-col items-center max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Motion.h1
        className="text-3xl md:text-5xl font-extrabold text-white mb-4 text-center leading-tight max-w-3xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Diwali Sale! <span role="img" aria-label="confetti">🎉</span>
      </Motion.h1>

      <Motion.p
        className="text-base md:text-lg text-indigo-100 mb-8 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Up to <span className="font-bold text-yellow-400">50% off</span> on your favorite munchies — Don’t miss out!
      </Motion.p>

      <Motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/kaaram">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-10 rounded-xl text-sm md:text-base shadow transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-300">
            Shop Now
          </button>
        </Link>
      </Motion.div>
    </Motion.section>
  );
};

export default Hero;
