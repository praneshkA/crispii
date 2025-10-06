//favourites.jsx
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { BASE_API_URL } from "../config";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = () => {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(favs);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const removeFavourite = (productId) => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    favs = favs.filter(fav => fav._id !== productId);
    localStorage.setItem('favourites', JSON.stringify(favs));
    setFavourites(favs);
  };

  if (!Array.isArray(favourites) || favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 px-4">
        <FaHeart size={48} className="mb-3 text-pink-500" />
        <p className="text-lg font-semibold">No favourite products yet</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 pb-6 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <FaHeart className="text-pink-500" /> Favourites
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favourites.map((p) => {
            let imgPath = p.image || "";
            let src = imgPath.startsWith("http") ? imgPath : `${BASE_API_URL}${imgPath}`;
            return (
              <div key={p._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                <div className="relative w-full aspect-square bg-gray-100">
                  <img
                    src={src}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://res.cloudinary.com/dzvimdj7w/image/upload/v123456/no-image.png";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeFavourite(p._id)}
                    className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-pink-700 transition"
                  >
                    Remove
                  </button>
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">{p.name}</h3>
                  {p.prices && (
                    <div className="mt-auto">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" value={Object.keys(p.prices)[0]} disabled>
                        {Object.keys(p.prices).map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-base font-bold text-green-600">₹{p.prices[Object.keys(p.prices)[0]]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
