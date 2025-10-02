// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { BASE_API_URL } from "./config";
import Hero from "./Components/Hero/Hero";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Components/CheckOut/CheckOut.jsx";

// Pages
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnExchange from "./pages/ReturnExchange";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsOfService from "./pages/TermsOfService";
import LoginSignup from "./pages/LoginSignUP.jsx";
import Payment from "./pages/Payment.jsx";

// Product List Component
import ProductList from "./Components/ProductList.jsx";
import CartItems from "./Components/CartItems/CartItems.jsx"; // fixed folder typo
import ScrollingBanner from "./Components/ScrollingBanner/ScrollingBanner.jsx";
import WhatsAppButton from "./Components/WhatsAppButton/WhatsAppButton.jsx";
// Home page content
const HomePage = () => (
  <>
    <ScrollingBanner />
    <Popular />
    <Hero />
    <Offers />
    <WhatsAppButton />
  </>
);

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [auth, setAuth] = useState({
    token: sessionStorage.getItem("authToken") || null,
    userId: sessionStorage.getItem("userId") || "guest",
  });
  const userId = auth.userId || "guest";

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/cart/${userId}`);
      const data = await response.json();
      setCartItems(data);
      setCartCount(data.length);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const updateCart = async (productId, selectedQuantity, quantity) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/cart/${userId}/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, selectedQuantity, quantity }),
        }
      );
      if (response.ok) fetchCartItems();
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const removeFromCart = async (productId, selectedQuantity) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/cart/${userId}/remove`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, selectedQuantity }),
        }
      );
      if (response.ok) fetchCartItems();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleCartUpdate = (count) => {
    setCartCount(count);
    fetchCartItems();
  };

  const handleAuth = ({ token, userId }) => {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userId", userId);
    setAuth({ token, userId });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    setAuth({ token: null, userId: "guest" });
  };

  // Category pages
  const ChipsPage = () => (
    <ProductList
      category="Chips"
      onCartUpdate={handleCartUpdate}
      userId={userId}
    />
  );
  const CookiesPage = () => (
    <ProductList
      category="Cookies / Biscuits"
      onCartUpdate={handleCartUpdate}
      userId={userId}
    />
  );
  const KaaramPage = () => (
    <ProductList
      category="Kaaram"
      onCartUpdate={handleCartUpdate}
      userId={userId}
    />
  );
  const SweetPage = () => (
    <ProductList
      category="Sweets / Mithai"
      onCartUpdate={handleCartUpdate}
      userId={userId}
    />
  );
  const AllProductsPage = () => (
    <ProductList category={null} onCartUpdate={handleCartUpdate} userId={userId} />
  );

  // Cart page
  const CartPage = () => (
    <CartItems
      cartItems={cartItems}
      updateCart={updateCart}
      removeFromCart={removeFromCart}
      userId={userId} // pass userId if needed
    />
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} auth={auth} onLogout={handleLogout} />
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
        <Route path="/login" element={<LoginSignup onAuthSuccess={handleAuth} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
