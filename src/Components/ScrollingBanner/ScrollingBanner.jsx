// ScrollingBanner.jsx
import React from "react";

const ScrollingBanner = () => {
  const messages = [
    "🚚 Free delivery on orders above ₹399",
    "🥗 No preservatives",
    "🌟 Authentic Taste",
    "🌴 No palm oil",
    "🧑‍🍳 Crafted by Experts",
    "💯 Quality Guaranteed",
    "Time to crunch into your favorites 😋",
  ];

  return (
    <div
      className="bg-black text-white w-full"
      style={{
        borderRadius: "0px",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <marquee
        behavior="scroll"        // ✅ continuous scrolling
        direction="left"         // ✅ moves from right → left
        scrollamount="6"         // ✅ control speed (higher = faster)
        loop="infinite"          // ✅ infinite repeat
        className="text-lg font-semibold"
      >
        {messages.join(" • ")} {/* bullet separator between messages */}
      </marquee>
    </div>
  );
};

export default ScrollingBanner;
