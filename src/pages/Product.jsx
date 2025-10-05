import React, { useEffect, useState } from "react";
import { BASE_API_URL } from '../config';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-4 relative">
      {/* Back-to-home arrow */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
      >
        <FaArrowLeft className="text-xl text-gray-700" />
        <span className="hidden sm:block text-gray-700 font-medium">Home</span>
      </button>

      <h1 className="text-2xl font-bold text-center mb-6">Our Snacks</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-2 shadow-md text-center">
            {
              (() => {
                const server = BASE_API_URL;
                let imgPath = p.image || "";
                let src = imgPath.startsWith("http")
                  ? imgPath
                  : imgPath.startsWith("/upload/images")
                    ? `${server}${imgPath}`
                    : `${server}/upload/images/${imgPath}`;
                src = encodeURI(src);
                return (
                  <img
                    src={src}
                    alt={p.name}
                    className="h-32 w-full object-cover mb-2"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/150x100?text=No+Image";
                    }}
                  />
                );
              })()
            }
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="mt-1">₹{p.prices["250g"]} (250g)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
