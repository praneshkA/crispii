// components/ScrollingBanner.jsx
import React from "react";

const ScrollingBanner = () => {
  const messages = ["Free delivery on orders above 349","No preservatives","100% Authentic Taste", "No palm oil", "100% Natural"]; // Add your messages

  return (
    <div className="overflow-hidden bg-[#FFFDD0] text-black rounded-3xl px-1 py-1 mx-1 md:mx-10 ">
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
