import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackToHome = ({ isMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className={`fixed top-25 left-3 z-50 flex items-center gap-2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition ${
        isMenuOpen ? "hidden" : ""
      }`}
    >
      <FaArrowLeft className="text-xl text-gray-700" />
      <span className="hidden sm:block text-gray-700 font-medium">Home</span>
    </button>
  );
};

export default BackToHome;