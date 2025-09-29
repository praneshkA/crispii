import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

function CartSummary() {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div>
      <h2>Total Items: {Object.keys(cartItems).length}</h2>
      <h2>Total Amount: ₹{getTotalCartAmount()}</h2>
    </div>
  );
}

export default CartSummary;
