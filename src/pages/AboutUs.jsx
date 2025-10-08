//about us
import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-2">
        Welcome to Crispii Pvt. Ltd., your one-stop destination for the finest savory snacks.
      </p>
      <p className="text-lg mb-2">
        Founded in 2025, we are committed to delivering fresh, high-quality snacks made from traditional recipes with a modern touch.
      </p>
      <p className="text-lg mb-2">
        We source bulk snacks directly from a reputed company and offer them to you at affordable prices. Acting as distributors, we make it easy for you to enjoy a wide variety of snacks without breaking the bank.
      </p>
      <p className="text-lg mb-2">
        <strong>FSSAI License Number:</strong> 1242502800327
      </p>
      <p className="text-lg gap-2">
        Our mission is to bring joy to snack lovers everywhere by offering delicious treats crafted with care and packed with flavor.
      </p>
      <p className="text-lg mb-2">
  📩 For any questions or assistance, please email us at{" "}
  <a
    href="mailto:info@crispii.live"
    className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
  >
    info@crispii.live
  </a>
  — we’re happy to help!
</p>
    </div>
  );
};

export default AboutUs;
