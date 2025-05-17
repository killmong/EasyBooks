import React, { useContext } from "react";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const Checkout = () => {
 const { cartItems, totalPrice, } = useCart();

  return (
    <div className="min-h-screen bg-gray-600 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
    </div>
  );
};

export default Checkout;
