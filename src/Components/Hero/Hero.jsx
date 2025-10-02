import React from "react";
import { Link } from "react-router-dom"; 
const Hero = () => {
  return (
    <section className="bg-gradient-to-br   from-pink-700   to-blue-900  rounded-3xl px-6 py-16 mx-4 md:mx-20 lg:mx-40 mb-10 shadow-lg flex flex-col items-center animate-fadeInUp max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 text-center leading-tight max-w-3xl">
        Diwali Sale! <span role="img" aria-label="confetti">🎉</span>
      </h1>
      <p className="text-base md:text-lg text-indigo-100 mb-8 text-center max-w-xl">
        Up to <span className="font-bold text-yellow-400">50% off</span> on your favorite munchies — Don’t miss out!
      </p>
      <Link to="/kaaram">
  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-10 rounded-xl text-sm md:text-base shadow transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-300">
    Shop Now
  </button>
</Link>
    </section>
  );
};

export default Hero;
