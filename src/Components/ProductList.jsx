//ProductList.jsx
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../config";
import { Package, ShoppingCart, Check } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import BackToHome from "./BackToHome/BackToHome";

const ProductList = ({ category, onCartUpdate, userId = "guest", isMenuOpen }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  // userId is already provided as a prop

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

        setProducts(updated);
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

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          image: product.image,
          selectedQuantity: product.selectedQuantity,
          price: product.prices[product.selectedQuantity],
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show added animation on button
        setAddedToCart((prev) => ({
          ...prev,
          [`${product._id}-${product.selectedQuantity}`]: true,
        }));

        // Show floating notification
        showNotification(product.name);

        // Remove button animation after 2 seconds
        setTimeout(() => {
          setAddedToCart((prev) => ({
            ...prev,
            [`${product._id}-${product.selectedQuantity}`]: false,
          }));
        }, 2000);

        // Notify parent component (Navbar) to update cart count
        if (onCartUpdate) {
          onCartUpdate(data.items.length);
        }
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
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
          {/* Back button - now receives isMenuOpen prop */}
          <BackToHome isMenuOpen={isMenuOpen} />

          {/* Title */}
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
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://res.cloudinary.com/dzvimdj7w/image/upload/v123456/no-image.png";
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
                          <p className="text-base font-bold text-green-600">
                            ₹{p.prices[p.selectedQuantity]}
                          </p>
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