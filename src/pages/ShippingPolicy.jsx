import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <p className="text-lg mb-2">
        We strive to deliver your favorite snacks quickly and safely.
      </p>
      <ul className="list-disc list-inside text-lg">
        <li>Orders are processed within 1-2 business days.</li>
        <li>Shipping times vary based on location, typically 3-7 business days within India.</li>
        <li>Tracking information will be provided once your order is shipped.</li>
        <li>Please ensure your shipping address is accurate to avoid delays.</li>
      </ul>
    </div>
  );
};

export default ShippingPolicy;
