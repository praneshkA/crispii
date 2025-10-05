import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import cookiesCardImg from "../../assets/cookies_card.jpeg";
import chipsCardImg from "../../assets/potatochip_card.jpeg";
import murukuCardImg from "../../assets/muruku_card.jpg";
import sweetsCardImg from "../../assets/gulabjamun_card.jpeg";

const snacks = [
  { id: 1, name: "Cookies", discount: "30%", path: "/cookies", img: cookiesCardImg },
  { id: 2, name: "Chips", discount: "20%", path: "/chips", img: chipsCardImg },
  { id: 3, name: "Kaaram", discount: "15%", path: "/kaaram", img: murukuCardImg },
  { id: 4, name: "Sweets", discount: "50%", path: "/sweets", img: sweetsCardImg },
];

const parentVariants = {
  animate: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.92 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 310, damping: 24, duration: 0.7 }
  },
  whileHover: {
    scale: 1.08,
    rotate: -2.5,
    boxShadow: "0 12px 32px rgba(0,0,0,0.21)",
    zIndex: 3,
  },
  whileTap: {
    scale: 0.97,
    rotate: 1.8,
    boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
    zIndex: 1,
  },
};

const badgeVariants = {
  initial: { opacity: 0, y: -12, scale: 0.85 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.34, duration: 0.33 } }
};

const infoVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.42, duration: 0.35 } }
};

const Popular = () => (
  <section className="px-2 py-4 max-w-4xl mx-auto">
    <h2 className="text-lg font-semibold mb-4">🔥 Popular Snacks</h2>
    <Motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      variants={parentVariants}
      initial="initial"
      animate="animate"
    >
      {snacks.map((item) => (
        <Motion.div
          key={item.id}
          variants={cardVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            to={item.path}
            className="rounded-xl overflow-hidden shadow-md flex flex-col justify-end items-center h-32 sm:h-40 lg:h-56 relative cursor-pointer"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Motion.span
              className="absolute top-2 right-2 text-xs rounded-full px-2 py-0.5 shadow bg-black/70 text-yellow-300 font-semibold"
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              -{item.discount}
            </Motion.span>
            <Motion.div
              className="w-full bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 flex flex-col items-center"
              variants={infoVariants}
              initial="initial"
              animate="animate"
            >
              <p className="text-base font-semibold text-white text-center">
                {item.name}
              </p>
            </Motion.div>
          </Link>
        </Motion.div>
      ))}
    </Motion.div>
  </section>
);

export default Popular;
