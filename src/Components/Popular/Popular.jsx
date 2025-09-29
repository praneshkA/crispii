import React from "react";
import { Link } from "react-router-dom";
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

const Popular = () => (
  <section className="px-2 py-4 max-w-4xl mx-auto">
    <h2 className="text-lg font-semibold mb-4">🔥 Popular Snacks</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {snacks.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          className="rounded-xl overflow-hidden shadow flex flex-col justify-end items-center transition-transform hover:scale-105 h-32 sm:h-40 lg:h-56 relative"
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <span className="absolute top-2 right-2 text-xs rounded-full px-2 py-0.5 shadow bg-black/70 text-yellow-300 font-semibold">
            -{item.discount}
          </span>
          <div className="w-full bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 flex flex-col items-center">
            <p className="text-base font-semibold text-white text-center">
              {item.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Popular;
