// frontend/src/Components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../config";
import { Package, ShoppingCart, Check } from "lucide-react";

const ProductList = ({ category, onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const userId = 'guest'; // You can replace this with actual user ID from authentication

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

  const addToCart = async (product) => {
    try {
  const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          image: product.image,
          selectedQuantity: product.selectedQuantity,
          price: product.prices[product.selectedQuantity],
          quantity: 1
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Show added animation
        setAddedToCart(prev => ({
          ...prev,
          [`${product._id}-${product.selectedQuantity}`]: true
        }));

        // Remove animation after 2 seconds
        setTimeout(() => {
          setAddedToCart(prev => ({
            ...prev,
            [`${product._id}-${product.selectedQuantity}`]: false
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
    
    return false;
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
    <div className="w-full bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm mb-4">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
          </h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((p) => {
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
                            return false;
                          }}
                          disabled={isAdded}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-semibold transition-all ${
                            isAdded
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
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