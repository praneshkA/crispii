//ScrollingBanner.jsx
import React from "react";

const ScrollingBanner = () => {
  const messages = [
    "Time to crunch into your favorites 😋",
    "🚚 Free delivery on orders above ₹399",
    "🥗 No preservatives",
    "🌟 Authentic Taste",
    "🌴 No palm oil",
    "🧑‍🍳 Crafted by Experts",
    "💯 Quality Guaranteed"
  ];

  return (
  <div className="overflow-hidden bg-black text-white px-2 py-0.5 w-full h-8" style={{ borderRadius: '0px', height: '2.5rem', minHeight: '2.5rem', margin: 0, padding: 0 }}>
      <div
        className="inline-block whitespace-nowrap animate-scroll px-4 py-2"
        style={{ display: "flex", gap: "4rem" }}
      >
        {messages.map((msg, idx) => (
          <span key={idx} className="font-semibold text-lg">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
