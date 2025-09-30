// frontend/src/Components/CartItems.jsx
import React from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { BASE_API_URL } from '../../config';

const CartItems = ({ cartItems, updateCart, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const increaseQuantity = (item) => {
    updateCart(item.productId, item.selectedQuantity, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCart(item.productId, item.selectedQuantity, item.quantity - 1);
    } else {
      removeFromCart(item.productId, item.selectedQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 px-4">
        <ShoppingBag size={64} className="mb-4 text-gray-300" />
        <p className="text-xl font-semibold mb-2">Your cart is empty</p>
        <p className="text-sm text-gray-400">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm mb-4 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-sm text-gray-500">{cartItems.length} items</p>
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto">
        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {cartItems.map((item) => {
            const server = BASE_API_URL;
            let imgPath = item.image || "";
            let src = imgPath.startsWith("/upload/images")
              ? `${server}${imgPath}`
              : `${server}/upload/images/${imgPath}`;
            src = encodeURI(src);

            return (
              <div
                key={`${item.productId}-${item.selectedQuantity}`}
                className="bg-white rounded-lg shadow p-3 flex gap-3"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={src}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src =
    "https://res.cloudinary.com/dzvimdj7w/image/upload/v123456/no-image.png";
}}

                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-sm mb-1 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    Quantity: {item.selectedQuantity}
                  </p>
                  <p className="text-green-600 font-bold">
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId, item.selectedQuantity)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-2 border rounded-full px-2 py-1">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow p-4 sticky bottom-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-xl font-bold text-gray-800">
              ₹{calculateTotal().toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;