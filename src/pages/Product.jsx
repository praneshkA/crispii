import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Our Snacks</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-2 shadow-md text-center">
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover mb-2"
            />
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
