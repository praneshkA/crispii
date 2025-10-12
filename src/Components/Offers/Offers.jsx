// Fixed Offers.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { createPortal } from "react-dom";
import { BASE_API_URL } from "../../config";

// Local images
import mixtureImg from "../../assets/mixture.jpeg";
import murukkuImg from "../../assets/mullu re.jpg";
import potatoImg from "../../assets/potato chips.jpg";
import pakkodaImg from "../../assets/Kadalai Pakkoda.jpg";
import chandharakalaImg from "../../assets/chandrakala.jpg";
import coconutBiscuitImg from "../../assets/coconut biscuit.jpg";
import maravalliImg from "../../assets/maravalli.jpg";
import wheelChipsImg from "../../assets/wheel-Chips.jpg";
import karasevImg from "../../assets/kaarasev.jpg";
import karaboondhiImg from "../../assets/kaaraboondhi.jpg";
import gulabJamunImg from "../../assets/gulab jamun.jpg";
import chocolateBiscuitImg from "../../assets/chocolate  biscut.png";
import kadalaiMittaiImg from "../../assets/kadalai mitati.jpg";
import nendramImg from "../../assets/banana.jpg";

const Offers = ({ onCartUpdate }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState("");

  // 🧾 Combo details centralized
  const comboProducts = {
    "Family Combo": {
      _id: "combo-family",
      name: "Crispii Family Combo",
      // Use local image from first included item for thumbnail (ensures visibility in cart)
      image: mixtureImg,
      selectedQuantity: "Box",
      prices: { Box: 420 },
      price: 420,
      includes: [
        { name: "Mixture", img: mixtureImg, qty: "250g" },
        { name: "Murukku", img: murukkuImg, qty: "250g" },
        { name: "Potato Chips", img: potatoImg, qty: "250g" },
        { name: "Kadalai Pakkoda", img: pakkodaImg, qty: "250g" },
        { name: "Chandharakala (Sweet)", img: chandharakalaImg, qty: "250g" },
        { name: "Coconut Biscuit", img: coconutBiscuitImg, qty: "250g" },
      ],
      color: "yellow",
    },
    "Premium Festive Box": {
      _id: "combo-premium",
      name: "Crispii Premium Festive Box",
      // Use local image from first included item for thumbnail (ensures visibility in cart)
      image: mixtureImg,
      selectedQuantity: "Box",
      prices: { Box: 750 },
      price: 750,
      includes: [
        { name: "Mixture", img: mixtureImg, qty: "500g" },
        { name: "Murukku", img: murukkuImg, qty: "500g" },
        { name: "Potato Chips", img: potatoImg, qty: "500g" },
        { name: "Nendram Chips", img: nendramImg, qty: "500g" },
        { name: "Kadalai Pakkoda", img: pakkodaImg, qty: "500g" },
        { name: "Chandharakala", img: chandharakalaImg, qty: "250g" },
        { name: "Chocolate Biscuit", img: chocolateBiscuitImg, qty: "250g" },
        { name: "Kadalai Mittai", img: kadalaiMittaiImg, qty: "250g" },
      ],
      color: "pink",
    },
    "Crunch Combo": {
      _id: "combo-crunch",
      name: "Family 4-Item Combo",
      // Use local image from first included item for thumbnail (ensures visibility in cart)
      image: mixtureImg,
      selectedQuantity: "Pack",
      prices: { Pack: 399 },
      price: 399,
      includes: [
        { name: "Mixture", img: mixtureImg, qty: "500g" },
        { name: "Kadalai Pakkoda", img: pakkodaImg, qty: "500g" },
        { name: "Maravalli Chips", img: maravalliImg, qty: "500g" },
        { name: "Wheel Chips", img: wheelChipsImg, qty: "500g" },
      ],
      color: "yellow",
    },
    "Starter 4-Item Combo": {
      _id: "combo-starter",
      name: "Starter 4-Item Combo",
      // Use local image from first included item for thumbnail (ensures visibility in cart)
      image: mixtureImg,
      selectedQuantity: "Pack",
      prices: { Pack: 249 },
      price: 249,
      includes: [
        { name: "Mixture", img: mixtureImg, qty: "250g" },
        { name: "Karasev", img: karasevImg, qty: "250g" },
        { name: "Coconut Biscuit", img: coconutBiscuitImg, qty: "250g" },
        { name: "Chocolate Biscuit", img: chocolateBiscuitImg, qty: "250g" },
      ],
      color: "pink",
    },
    "Mega Sweet & Snack 4-Item Combo": {
      _id: "combo-mega",
      name: "Mega Sweet & Snack 4-Item Combo",
      // Use local image from first included item for thumbnail (ensures visibility in cart)
      image: karaboondhiImg,
      selectedQuantity: "Pack",
      prices: { Pack: 449 },
      price: 449,
      includes: [
        { name: "Karaboondhi", img: karaboondhiImg, qty: "500g" },
        { name: "Kadalai", img: kadalaiMittaiImg, qty: "500g" },
        { name: "Chocolate Biscuit", img: chocolateBiscuitImg, qty: "500g" },
        { name: "Gulab Jamun", img: gulabJamunImg, qty: "6 pcs (~250g)" },
      ],
      color: "yellow",
    },
  };

  const userId = sessionStorage.getItem("userId") || "guest";

  const addComboToCart = async (comboKey) => {
    if (!userId || userId === "guest") {
      navigate("/login");
      return;
    }

    const combo = comboProducts[comboKey];
    
    console.log("Adding combo to cart:", {
      productId: combo._id,
      name: combo.name,
      image: combo.image,
      selectedQuantity: combo.selectedQuantity,
      price: combo.price,
      quantity: 1,
    });

    try {
      const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: combo._id,
          name: combo.name,
          image: combo.image,
          selectedQuantity: combo.selectedQuantity,
          prices: combo.prices,
          price: combo.price,
          quantity: 1,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        if (onCartUpdate) onCartUpdate();
        setNotification(`${combo.name} added to cart!`);
      } else {
        setNotification(`Failed to add: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding combo:", err);
      setNotification("Error adding combo to cart");
    }

    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <Motion.section
      className="w-full max-w-3xl px-6 py-8 bg-white rounded-2xl shadow-md mx-auto my-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {notification &&
        createPortal(
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
              {notification}
            </div>
          </div>,
          document.body
        )}

      <Motion.h2
        className="text-2xl font-semibold mb-3 text-gray-900"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Special Combos 🎁
      </Motion.h2>

      <p className="text-gray-700 text-base md:text-lg mb-8">
        Don't miss out on our limited-time snack deals.
      </p>

      {/* 🧩 Auto-render all combos */}
      <div className="space-y-8">
        {Object.entries(comboProducts).map(([key, combo]) => (
          <div
            key={combo._id}
            className={`border-2 rounded-xl p-4 shadow-md ${
              combo.color === "yellow" ? "bg-yellow-50 border-yellow-400" : "bg-pink-50 border-pink-400"
            }`}
          >
            <div className="flex flex-col items-center">
              <img
                src={combo.image}
                alt={combo.name}
                className="w-24 h-24 object-cover rounded-lg mb-3"
              />
              <span className="text-2xl font-bold mb-2">
                🎉 {combo.name} – ₹{combo.price} Only
              </span>
              <span className="text-base text-gray-700 mb-4">
                Combo Includes:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {combo.includes.map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.qty}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                className={`${
                  combo.color === "yellow" 
                    ? "bg-yellow-400 hover:bg-yellow-500" 
                    : "bg-pink-400 hover:bg-pink-500"
                } text-white font-bold py-2 px-6 rounded-full shadow`}
                onClick={() => addComboToCart(key)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Motion.section>
  );
};

export default Offers;
