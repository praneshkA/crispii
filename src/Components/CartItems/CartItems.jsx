// Fixed CartItems.jsx
import React from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { BASE_API_URL } from '../../config';
import { useNavigate } from "react-router-dom";

const CartItems = ({ cartItems, updateCart, removeFromCart, userId }) => {
  const navigate = useNavigate();
  const [showCrackers, setShowCrackers] = React.useState(false);
  const isInitialMount = React.useRef(true);

  // If user is not logged in, redirect to login page
  React.useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    const uid = userId || sessionStorage.getItem('userId') || 'guest';
    if (!authToken || uid === 'guest') {
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [navigate, userId]);

  // Trigger crackers animation when items are added to cart
  React.useEffect(() => {
    // Skip animation on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only show animation when cart has items
    if (cartItems.length > 0) {
      setShowCrackers(true);
      const timer = setTimeout(() => setShowCrackers(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

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
    <div className="w-full bg-gray-50 min-h-screen pb-6 relative">
      {/* Crackers Animation */}
      {showCrackers && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Confetti particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff69eb'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `confetti ${Math.random() * 2 + 2}s linear ${Math.random() * 0.5}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
          
          {/* Sparkles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                fontSize: `${Math.random() * 20 + 15}px`,
                animation: `sparkle ${Math.random() * 1 + 1}s ease-in-out ${Math.random() * 1}s infinite`
              }}
            >
              ✨
            </div>
          ))}

          {/* Celebration text */}
          <div 
            className="absolute top-1/4 left-1/2 text-center"
            style={{
              transform: 'translate(-50%, -50%)',
              animation: 'bounce-in 0.6s ease-out'
            }}
          >
            <div className="text-4xl font-bold text-yellow-500 drop-shadow-lg">
              🎉 Yay! 🎉
            </div>
            <div className="text-xl font-semibold text-gray-700 mt-2">
              Your cart is ready!
            </div>
          </div>
        </div>
      )}

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
            // Fixed image src logic: Handle absolute URLs, frontend static assets (/static/media/), and server-relative paths
            let src;
            if (imgPath.startsWith("http") || imgPath.includes("/static/media/")) {
              src = imgPath;
            } else {
              src = `${server}${imgPath}`;
            }

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
                        "https://res.cloudinary.com/dzvimdj7w/image/upload/v1759176000/crispii/no-image.png";
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

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl shadow transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItems;
