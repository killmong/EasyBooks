import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51REovXIbsbNexHYgUQDn3A1TU6Ptq2HQYDCQiWhtpzVOxkY7pJwi4e5QqrHvHzQk8TWbwJt4UiMwT9KTtMIexRgd00GYZrIO38"
);

const StripePayment = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user.id;
  const token = user.token;

  const [loading, setLoading] = useState(false);
  const { finalAmount, itemQuantity, getCartBooks } = useCart();
  const navigate = useNavigate();

  console.log(getCartBooks, "getCartBooks in StripePayment");

  const handleCheckout = async () => {
    setLoading(true);

    const product = {
      orderData: getCartBooks.map((item) => ({
        bookid: item._id,
        isbn: item.isbn,
        totalQuantity: itemQuantity[item._id],
        finalAmount: finalAmount, // you can adjust this per item if needed
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: userId,
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (response.ok && data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        console.error("Error creating Stripe checkout session:", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-4 py-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Proceed to Payment
      </h2>
      <button
        className={`w-48 h-12 rounded-lg text-white font-semibold transition duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? (
          <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : (
          "Pay with Stripe"
        )}
      </button>
    </div>
  );
};

export default StripePayment;
