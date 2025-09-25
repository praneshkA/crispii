import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Popular from "./Components/Popular/Popular";
import Offers from "./Components/Offers/Offers";
import Footer from "./Components/Footer/Footer";

// Define component placeholders for snack category pages
const HomePage = () => (
  <>
   <Popular />

    <Hero />
   
    <Offers />
  </>
);

const CookiesPage = () => <div>Cookies content</div>;
const ChipsPage = () => <div>Chips content</div>;
const MurukuPage = () => <div>Muruku content</div>;
const SweetsPage = () => <div>Sweets content</div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/chips" element={<ChipsPage />} />
        <Route path="/muruku" element={<MurukuPage />} />
        <Route path="/sweets" element={<SweetsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
