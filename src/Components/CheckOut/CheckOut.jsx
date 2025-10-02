import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems = [] }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    phone: "",
  });

  const navigate = useNavigate();

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const totalAmount = safeCartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation (optional but if provided, check length)
    if (formData.lastName && formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // PIN code validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (safeCartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Pass data to Payment page
    navigate("/payment", {
      state: {
        formData,
        cartItems: safeCartItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded">
      <h1 className="text-lg font-semibold mb-2">Crispii Snacks</h1>

      {/* Order Summary */}
      <div className="border rounded mb-4">
        <button
          type="button"
          onClick={() => setShowSummary(!showSummary)}
          className="w-full flex justify-between px-3 py-2 text-left"
        >
          <span>Order summary</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </button>

        {showSummary && (
          <div className="px-3 py-2 border-t text-sm">
            {safeCartItems.length > 0 ? (
              safeCartItems.map((item) => {
                const qty = item.quantity || 1;
                const variant = item.selectedQuantity || "";
                const lineTotal = (item.price || 0) * qty;
                const key =
                  item._id ||
                  item.productId ||
                  `${item.name}-${variant}-${qty}`;
                return (
                  <div
                    key={key}
                    className="flex justify-between py-1 items-center"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      {variant && (
                        <span className="text-xs text-gray-500">{variant}</span>
                      )}
                      <span className="text-xs text-gray-500">
                        Qty: {qty}
                      </span>
                    </div>
                    <div className="text-right">
                      <div>₹{lineTotal.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        ₹{(item.price || 0).toFixed(2)} each
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        )}
      </div>

      {/* Delivery Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-semibold text-2xl mt-8">Delivery</h3>

        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border rounded px-2 py-1 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border rounded px-2 py-1 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border rounded px-2 py-1 ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* Apartment */}
        <div>
          <label className="block text-sm mb-1">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full border rounded px-2 py-1 ${errors.city ? 'border-red-500' : ''}`}
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm mb-1">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option>Tamil Nadu</option>
            <option>Kerala</option>
            <option>Karnataka</option>
            <option>Andhra Pradesh</option>
            <option>Telangana</option>
          </select>
        </div>

        {/* PIN Code */}
        <div>
          <label className="block text-sm mb-1">PIN code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength="6"
            className={`w-full border rounded px-2 py-1 ${errors.pincode ? 'border-red-500' : ''}`}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Phone number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            className={`w-full border rounded px-2 py-1 ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border rounded px-4 py-2 mt-4 font-medium bg-green-600 text-white hover:bg-green-700"
          disabled={safeCartItems.length === 0}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;