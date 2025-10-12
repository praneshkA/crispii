import nendramImg from '../../assets/banana.jpg';
import chocolateBiscuitImg from '../../assets/chocolate  biscut.png';
import kadalaiMittaiImg from '../../assets/kadalai mitati.jpg';

import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from '../../config';
import { motion as Motion } from "framer-motion";
import { createPortal } from "react-dom";

import mixtureImg from '../../assets/mixture.jpeg';
import murukkuImg from '../../assets/mullu re.jpg';
import potatoImg from '../../assets/potato chips.jpg';
import pakkodaImg from '../../assets/Kadalai Pakkoda.jpg';
import chandharakalaImg from '../../assets/chandrakala.jpg';
import coconutBiscuitImg from '../../assets/coconut biscuit.jpg';


const Offers = ({ onCartUpdate }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState("");

  // Add to cart logic (simulate as in ProductList)
  const userId = sessionStorage.getItem('userId') || 'guest';
  const addComboToCart = async (combo) => {
    if (!userId || userId === 'guest') {
      navigate('/login');
      return;
    }
    let comboProduct;
    if (combo === 'Family Combo') {
      comboProduct = {
        _id: 'combo-family',
        name: 'Crispii Family Combo',
        image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760178404/combo_card_e9g46j.jpg',
        selectedQuantity: '250g',
        prices: { '250g': 370 },
        price: 370,
      };
    } else {
      comboProduct = {
        _id: 'combo-premium',
        name: 'Crispii Premium Festive Box',
        image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760178404/combo_card_e9g46j.jpg',
        selectedQuantity: 'Box',
        prices: { 'Box': 700 },
        price: 700,
      };
    }
    try {
      const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: comboProduct._id,
          name: comboProduct.name,
          image: comboProduct.image,
          selectedQuantity: comboProduct.selectedQuantity,
          price: comboProduct.price,
          quantity: 1,
        })
      });
      const data = await response.json();
      if (response.ok) {
        if (onCartUpdate) {
          onCartUpdate();
        }
  setNotification(`${comboProduct.name} added to cart!`);
  setTimeout(() => setNotification("") , 2000);
      } else {
  setNotification(`Failed to add: ${data.error || 'Unknown error'}`);
  setTimeout(() => setNotification("") , 2000);
      }
      console.log('Add to cart response:', data);
    } catch (err) {
  setNotification('Error adding to cart');
  setTimeout(() => setNotification("") , 2000);
      console.error('Add to cart error:', err);
    }
  };

  return (
    <Motion.section
      className="w-full max-w-lg px-6 py-8 bg-white rounded-2xl shadow-md mx-auto my-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      viewport={{ once: true }}
    >

      {/* Notification (render via portal so it's top-center of viewport) */}
      {notification &&
        createPortal(
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[250px] animate-float-up">
              <span className="text-sm font-medium">{notification}</span>
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
        Special Combos <span role="img" aria-label="gift">🎁</span>
      </Motion.h2>

      <Motion.p
        className="text-gray-700 text-base md:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Don't miss out on our limited-time snack deals.
      </Motion.p>

      <div className="mt-6 space-y-8">
  {/* Crispii Family Combo */}
  <div className="border-2 border-yellow-400 rounded-xl bg-yellow-50 p-4 shadow-md">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">🎁 Crispii Family Combo – ₹370 Only</span>
            <span className="text-base text-gray-700 mb-4">Combo Includes:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <img src={mixtureImg} alt="Mixture" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Mixture</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={murukkuImg} alt="Murukku" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Murukku</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={potatoImg} alt="Potato Chips" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Potato Chips</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={pakkodaImg} alt="Kadalai Pakkoda" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Kadalai Pakkoda</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={chandharakalaImg} alt="Chandharakala (Sweet)" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Chandharakala (Sweet)</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={coconutBiscuitImg} alt="Coconut Biscuit" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Coconut Biscuit</div>
                <div className="text-xs text-gray-500">250g</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full shadow"
              onClick={() => addComboToCart("Family Combo")}
            >
              Add to Cart
            </button>
          </div>
        </div>
  {/* CRISPII PREMIUM FESTIVE BOX */}
  <div className="border-2 border-pink-400 rounded-xl bg-pink-50 p-4 shadow-md">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">🥳 CRISPII PREMIUM FESTIVE BOX – ₹700 ONLY</span>
            <span className="text-base text-gray-700 mb-4">Combo Includes:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <img src={mixtureImg} alt="Mixture" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Mixture</div>
                <div className="text-xs text-gray-500">500g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={murukkuImg} alt="Murukku" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Murukku</div>
                <div className="text-xs text-gray-500">500g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={potatoImg} alt="Potato Chips" className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-semibold">Potato Chips</div>
                <div className="text-xs text-gray-500">500g</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={nendramImg} alt="Nendram Chips" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">Nendram Chips</div>
                  <div className="text-xs text-gray-500">500g</div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={pakkodaImg} alt="Kadalai Pakkoda" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">Kadalai Pakkoda</div>
                  <div className="text-xs text-gray-500">500g</div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={chandharakalaImg} alt="Chandharakala" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">Chandharakala</div>
                  <div className="text-xs text-gray-500">250g</div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={chocolateBiscuitImg} alt="Chocolate Biscuit" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">Chocolate Biscuit</div>
                  <div className="text-xs text-gray-500">250g</div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={kadalaiMittaiImg} alt="Kadalai Mittai" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">Kadalai Mittai</div>
                  <div className="text-xs text-gray-500">250g</div>
                </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded-full shadow"
              onClick={() => addComboToCart("Premium Festive Box")}
            >
              Add to Cart
            </button>
          </div>
        </div>
        
      </div>
      
    </Motion.section>
  );
};

export default Offers;