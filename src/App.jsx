// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { BASE_API_URL } from "./config";
import Hero from "./Components/Hero/Hero";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import Footer from "./Components/Footer/Footer";

// Pages
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnExchange from "./pages/ReturnExchange";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsOfService from "./pages/TermsOfService";

// Product List Component
import ProductList from "./Components/ProductList.jsx";
import CartItems from "./Components/CarItems/CartItems.jsx";

// Home page content
const HomePage = () => (
  <>
    <Popular />
    <Hero />
    <Offers />
  </>
);

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const userId = 'guest'; // Replace with actual user ID when you implement authentication

  // Fetch cart items on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
  const response = await fetch(`${BASE_API_URL}/api/cart/${userId}`);
      const data = await response.json();
      setCartItems(data);
      setCartCount(data.length);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateCart = async (productId, selectedQuantity, quantity) => {
    try {
  const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, selectedQuantity, quantity }),
      });

      if (response.ok) {
        fetchCartItems();
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const removeFromCart = async (productId, selectedQuantity) => {
    try {
  const response = await fetch(`${BASE_API_URL}/api/cart/${userId}/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, selectedQuantity }),
      });

      if (response.ok) {
        fetchCartItems();
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleCartUpdate = (count) => {
    setCartCount(count);
    fetchCartItems();
  };

  // Category pages using ProductList with cart functionality
  const ChipsPage = () => <ProductList category="Chips" onCartUpdate={handleCartUpdate} />;
  const CookiesPage = () => <ProductList category="Cookies / Biscuits" onCartUpdate={handleCartUpdate} />;
  const KaaramPage = () => <ProductList category="Kaaram" onCartUpdate={handleCartUpdate} />;
  const SweetPage = () => <ProductList category="Sweets / Mithai" onCartUpdate={handleCartUpdate} />;
  const AllProductsPage = () => <ProductList category={null} onCartUpdate={handleCartUpdate} />;

  // Cart page
  const CartPage = () => (
    <CartItems
      cartItems={cartItems}
      updateCart={updateCart}
      removeFromCart={removeFromCart}
    />
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/chips" element={<ChipsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/kaaram" element={<KaaramPage />} />
        <Route path="/sweets" element={<SweetPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-exchange" element={<ReturnExchange />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;