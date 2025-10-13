import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";

// Import local images from assets
import mixtureImg from "../../assets/mixture.jpeg";
import murukkuImg from "../../assets/mullu re.jpg";
import potatoImg from "../../assets/potato chips.jpg";
import pakkodaImg from "../../assets/Kadalai Pakkoda.jpg";
import chandharakalaImg from "../../assets/chandrakala.jpg";
import coconutBiscuitImg from "../../assets/coconut biscuit.jpg";
import maravalliImg from "../../assets/maravalli.jpg";
import wheelChipsImg from "../../assets/wheel-chips.jpg";
import karasevImg from "../../assets/kaarasev.jpg";
import karaboondhiImg from "../../assets/kaaraboondhi.jpg";
import gulabJamunImg from "../../assets/gulab jamun.jpg";
import chocolateBiscuitImg from "../../assets/chocolate  biscut.png";
import kadalaiMittaiImg from "../../assets/kadalai mitati.jpg";
import nendramImg from "../../assets/banana.jpg";

const Offers = () => {
  const [notification, setNotification] = useState("");
  const [expandedCombo, setExpandedCombo] = useState(null);

  // Product images mapping with imported assets
  const productImages = {
    "Mixture": mixtureImg,
    "Murukku": murukkuImg,
    "Potato Chips": potatoImg,
    "Kadalai Pakkoda": pakkodaImg,
    "Chandharakala (Sweet)": chandharakalaImg,
    "Chandharakala": chandharakalaImg,
    "Coconut Biscuit": coconutBiscuitImg,
    "Nendram Chips": nendramImg,
    "Chocolate Biscuit": chocolateBiscuitImg,
    "Kadalai Mittai": kadalaiMittaiImg,
    "Karasev": karasevImg,
    "Maravalli Chips": maravalliImg,
    "Wheel Chips": wheelChipsImg,
    "Karaboondhi": karaboondhiImg,
    "Kadalai": kadalaiMittaiImg,
    "Gulab Jamun": gulabJamunImg,
  };

  const comboProducts = {
    "Family Combo": {
      _id: "combo-family",
      name: "Crispii Family Combo",
      image: "https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291342/Pink_Yellow_Fun_Comic_Thank_You_Instagram_Post_lxldoz.png",
      price: 420,
      includes: [
        { name: "Mixture", qty: "250g" },
        { name: "Murukku", qty: "250g" },
        { name: "Potato Chips", qty: "250g" },
        { name: "Kadalai Pakkoda", qty: "250g" },
        { name: "Chandharakala (Sweet)", qty: "250g" },
        { name: "Coconut Biscuit", qty: "250g" },
      ],
    },
    "Premium Festive Box": {
      _id: "combo-premium",
      name: "Crispii Premium Festive Box",
      image: "https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291371/Red_Elegance_Valentine_s_Day_Sale_Instagram_Post_koieo0.png",
      price: 750,
      includes: [
        { name: "Mixture", qty: "500g" },
        { name: "Murukku", qty: "500g" },
        { name: "Potato Chips", qty: "500g" },
        { name: "Nendram Chips", qty: "500g" },
        { name: "Kadalai Pakkoda", qty: "500g" },
        { name: "Chandharakala", qty: "250g" },
        { name: "Chocolate Biscuit", qty: "250g" },
        { name: "Kadalai Mittai", qty: "250g" },
      ],
    },
    "Crunch Combo": {
      _id: "combo-crunch",
      name: "Family 4-Item Combo",
      image: "https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291391/Gold_and_Red_Indian_Truck_Art_Indian_Food_Logo_sgjrht.png",
      price: 399,
      includes: [
        { name: "Mixture", qty: "500g" },
        { name: "Kadalai Pakkoda", qty: "500g" },
        { name: "Maravalli Chips", qty: "500g" },
        { name: "Wheel Chips", qty: "500g" },
      ],
    },
    "Starter 4-Item Combo": {
      _id: "combo-starter",
      name: "Starter 4-Item Combo",
      image: "https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291396/Green_and_Orange_Playful_Hand-drawn_Indian_Tea_Stall_Food_Logo_qs30l3.png",
      price: 249,
      includes: [
        { name: "Mixture", qty: "250g" },
        { name: "Karasev", qty: "250g" },
        { name: "Coconut Biscuit", qty: "250g" },
        { name: "Chocolate Biscuit", qty: "250g" },
      ],
    },
    "Mega Sweet & Snack 4-Item Combo": {
      _id: "combo-mega",
      name: "Mega Sweet & Snack 4-Item Combo",
      image: "https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291385/Yellow_and_Orange_Floral_Indian_Fashion_Boutique_Logo_w2y9pz.png",
      price: 449,
      includes: [
        { name: "Karaboondhi", qty: "500g" },
        { name: "Kadalai", qty: "500g" },
        { name: "Chocolate Biscuit", qty: "500g" },
        { name: "Gulab Jamun", qty: "6 pcs (~250g)" },
      ],
    },
  };

  const addComboToCart = (comboName) => {
    setNotification(`${comboName} added to cart!`);
    setTimeout(() => setNotification(""), 2000);
  };

  const toggleCombo = (comboId) => {
    setExpandedCombo(expandedCombo === comboId ? null : comboId);
  };

  return (
    <div className="w-full max-w-3xl px-6 py-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg mx-auto my-6">
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <ShoppingCart size={20} />
            {notification}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          Special Combos 🎁
        </h2>
        <p className="text-gray-700 text-lg">
          Don't miss out on our limited-time snack deals.
        </p>
      </div>

      <div className="space-y-4">
        {Object.values(comboProducts).map((combo) => (
          <div
            key={combo._id}
            className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300"
          >
            {/* Collapsed View - Always Visible */}
            <div className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0 shadow-sm"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {combo.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{combo.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {combo.includes.length} items included
                  </p>
                </div>
              </div>

              {/* Tap for more info button */}
              <button
                onClick={() => toggleCombo(combo._id)}
                className="w-full mt-4 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all"
              >
                <span className="text-base">
                  {expandedCombo === combo._id
                    ? "Hide details"
                    : "Tap for more info"}
                </span>
                {expandedCombo === combo._id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {/* Expanded View - Product Details */}
            {expandedCombo === combo._id && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="pt-4">
                  <p className="text-base text-gray-800 mb-4 font-semibold">
                    📦 Combo Includes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {combo.includes.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                      >
                        <img
                          src={productImages[item.name] || productImages["Mixture"]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-orange-600 font-medium">
                            {item.qty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    onClick={() => addComboToCart(combo.name)}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;