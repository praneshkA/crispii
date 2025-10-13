//ProductList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../config";

import { Package, ShoppingCart, Check } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import BackToHome from "./BackToHome/BackToHome";

const ProductList = ({ category, onCartUpdate, userId = "guest", isMenuOpen }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, _setAddedToCart] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(favs);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = category
          ? `${BASE_API_URL}/api/products?category=${category}`
          : `${BASE_API_URL}/api/products`;
        const res = await fetch(url);
        const data = await res.json();

        const updated = data.map((p) => {
          const firstKey = p.prices ? Object.keys(p.prices)[0] : null;
          return { ...p, selectedQuantity: firstKey };
        });

        // Only add combo products if not in a category (main page)
        if (!category) {
          const comboProducts = [
            {
              _id: 'combo-family',
              name: '🎁 Crispii Family Combo',
              description: 'Mixture, Murukku, Potato Chips, Kadalai Pakkoda, Chandharakala (Sweet), Coconut Biscuit (each 250g)',
              image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291342/Pink_Yellow_Fun_Comic_Thank_You_Instagram_Post_lxldoz.png',
              prices: { 'Pack': 420 },
              selectedQuantity: 'Pack',
              isCombo: true,
            },
            {
              _id: 'combo-premium',
              name: 'CRISPII PREMIUM FESTIVE BOX',
              description: 'Mixture, Murukku, Potato Chips, Nendram Chips, Kadalai Pakkoda, Chandharakala, Chocolate Biscuit, Kadalai Mittai (500g each except 250g for sweets)',
              image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291371/Red_Elegance_Valentine_s_Day_Sale_Instagram_Post_koieo0.png',
              prices: { 'Pack': 750 },
              selectedQuantity: 'Pack',
              isCombo: true,
            },
            {
              _id: 'combo-crunch',
              name: '🎉 Family 4-Item Combo',
              description: 'Mixture, Kadalai Pakkoda, Maravalli Chips, Wheel Chips (each 500g)',
              image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291391/Gold_and_Red_Indian_Truck_Art_Indian_Food_Logo_sgjrht.png',
              prices: { 'Pack': 399 },
              selectedQuantity: 'Pack',
              isCombo: true,
            },
            {
              _id: 'combo-starter',
              name: '🌟 Starter 4-Item Combo',
              description: 'Mixture, Karasev, Coconut Biscuit, Chocolate Biscuit (each 250g)',
              image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291396/Green_and_Orange_Playful_Hand-drawn_Indian_Tea_Stall_Food_Logo_qs30l3.png',
              prices: { 'Pack': 249 },
              selectedQuantity: 'Pack',
              isCombo: true,
            },
            {
              _id: 'combo-mega',
              name: '🍬 Sweet & Snack 4-Item Combo',
              description: 'Karaboondhi, Kadalai, Chocolate Biscuit (500g each), Gulab Jamun (6 pcs ~250g)',
              image: 'https://res.cloudinary.com/dzvimdj7w/image/upload/v1760291385/Yellow_and_Orange_Floral_Indian_Fashion_Boutique_Logo_w2y9pz.png',
              prices: { 'Pack': 449 },
              selectedQuantity: 'Pack',
              isCombo: true,
            },
          ];
          setProducts([...comboProducts, ...updated]);
        } else {
          setProducts(updated);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const handleQuantityChange = (id, quantity) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, selectedQuantity: quantity } : p
      )
    );
  };

  const showNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 2000);
  };

  const toggleFavourite = async (product) => {
    if (!userId || userId === "guest" || userId === "" || userId === null || userId === "undefined") {
      navigate("/login");
      return;
    }
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (favs.some(fav => fav._id === product._id)) {
      favs = favs.filter(fav => fav._id !== product._id);
      showNotification(`${product.name} removed from favourites`);
    } else {
      favs.push({
        _id: product._id,
        name: product.name,
        image: product.image,
        selectedQuantity: product.selectedQuantity,
        prices: product.prices
      });
      showNotification(`${product.name} added to favourites`);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
    setFavourites(favs);
  };

  async function addToCart(product) {
    if (!userId || userId === "guest" || userId === "" || userId === null || userId === "undefined") {
      navigate("/login");
      return;
    }
    try {
      const payload = {
        productId: product._id,
        name: product.name,
        image: product.image,
        selectedQuantity: product.selectedQuantity,
        price: product.prices[product.selectedQuantity],
        quantity: 1,
      };

      const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (onCartUpdate) {
          onCartUpdate();
        }
        const itemKey = `${product._id}-${product.selectedQuantity}`;
        _setAddedToCart((prev) => ({ ...prev, [itemKey]: true }));
        showNotification(`${product.name} added to cart`);
      } else {
        showNotification(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      showNotification('Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 px-4">
        <Package size={48} className="mb-3" />
        <p className="text-lg font-semibold">No products found</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 pb-6 relative">
      {/* Floating Notifications Container */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="mb-2 animate-float-up"
            style={{
              animation: "floatUp 3s ease-out forwards",
            }}
          >
            <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[250px]">
              <div className="bg-white/20 rounded-full p-1">
                <Check size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Header with Back Arrow */}
      <div className="w-full bg-white/70 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center px-4 py-3 sm:py-5">
          <BackToHome isMenuOpen={isMenuOpen} />
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 ml-9 truncate">
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "All Products"}
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full bg-white/70 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center px-4 py-3 sm:py-5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-full max-w-md text-sm focus:outline-none focus:ring focus:border-blue-400"
            style={{ marginRight: "1rem" }}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products
            .filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((p) => {
              const server = BASE_API_URL;
              let imgPath = p.image || "";
              let src = imgPath.startsWith("http")
                ? imgPath
                : `${server}${imgPath}`;

              const itemKey = `${p._id}-${p.selectedQuantity}`;
              const isAdded = addedToCart[itemKey];

              return (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-gray-100">
                    <img
                      src={src}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (!e.currentTarget.src.includes('no-image.png')) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://res.cloudinary.com/dzvimdj7w/image/upload/v123456/no-image.png";
                        }
                      }}
                    />
                    {/* Heart Icon */}
                    <button
                      type="button"
                      onClick={() => toggleFavourite(p)}
                      className="absolute top-2 right-2 text-xl focus:outline-none"
                      style={{ color: favourites.some(fav => fav._id === p._id) ? '#e0245e' : '#ccc' }}
                      aria-label={favourites.some(fav => fav._id === p._id) ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">
                      {p.name}
                    </h3>

                    {/* Quantity Selector */}
                    {p.prices && (
                      <div className="mt-auto">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Quantity
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          value={p.selectedQuantity}
                          onChange={(e) =>
                            handleQuantityChange(p._id, e.target.value)
                          }
                        >
                          {Object.keys(p.prices).map((q) => (
                            <option key={q} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>

                        {/* Price and Add to Cart Button */}
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center">
                            {(() => {
                              const price = Number(p.prices[p.selectedQuantity]) || 0;
                              const offerPrice = price;
                              const original = Math.round(price * 1.3) || 0;
                              return (
                                <>
                                  <span className="text-gray-400 text-sm line-through mr-1">₹{original}</span>
                                  <span className="text-base font-bold text-green-600">₹{offerPrice}</span>
                                </>
                              );
                            })()}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(p);
                            }}
                            disabled={isAdded}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-semibold transition-all ${
                              isAdded
                                ? "bg-green-500 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={14} />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={14} />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;