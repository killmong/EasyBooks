import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // or 'next/navigation' in Next.js
import {useCart } from "../../Context/CartContext" // update path as per your setup

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart() // Adjust if you're using Redux or other global state

  useEffect(() => {
    // Clear cart and redirect after 5 seconds
    clearCart();
    const timer = setTimeout(() => {
      navigate("/cart");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-green-800">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center animate-fade-in">
        <svg
          className="w-24 h-24 text-green-500 mb-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-lg mb-4">Thank you for your purchase. 🎉</p>
        <p className="text-sm text-gray-600">Redirecting you to cart page...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
