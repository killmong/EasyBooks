import React, { useState, useEffect, useContext } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { BookContext } from "../../Context/BookContextProvider";
import { motion } from "framer-motion";
import BookCard from "../../common/components/BookCard";
import { useCart } from "../../Context/CartContext";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
const Cart = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Navigate based on selection
    if (value === "card") {
      setTimeout(() => {
        navigate("/payment");
      }, 1000);
    } else if (value === "cod") {
      setTimeout(() => {
        navigate("/placeOrder");
      }, 1000);
    }
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user?.token;
  const id = user?.id;
  const { cart = [], setCart, books } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    totalItems,
    totalPrice,
    discountAmount,
    discountPercent,
    getCartBooks,
    setGetCartBooks,
    itemQuantity,
    setItemQuantity,
    shippingCharge,
    finalAmount,
  } = useCart();

  const [UserData, setUserData] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { address, city, state, country, zip } = UserData || {};
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/getuser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id, token]);

  const decrementQuantity = (bookId) => {
    setItemQuantity((prev) => {
      const newQuantity = { ...prev };
      if (newQuantity[bookId] > 1) {
        newQuantity[bookId] -= 1;
      } else {
        delete newQuantity[bookId];
      }
      return newQuantity;
    });
  };

  const incrementQuantity = (bookId) => {
    setItemQuantity((prev) => {
      const newQuantity = { ...prev };
      if (newQuantity[bookId]) {
        newQuantity[bookId] += 1;
      } else {
        newQuantity[bookId] = 1;
      }
      return newQuantity;
    });
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cart/getCart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: id,
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data.books) {
          setCart(data.books);
          const mergedBooks = books
            .map((book) => {
              const matchedCartItem = data.books.find((cartItem) => {
                const cartBookId =
                  typeof cartItem.book === "string"
                    ? cartItem.book
                    : cartItem.book._id;
                return book._id === cartBookId;
              });

              if (matchedCartItem) {
                return { ...book, quantity: matchedCartItem.quantity };
              }
              return null;
            })
            .filter(Boolean);

          setGetCartBooks(mergedBooks);

          const qtyMap = {};
          mergedBooks.forEach((book) => {
            qtyMap[book._id] = book.quantity || 1;
          });
          setItemQuantity(qtyMap);
        } else {
          setError(data.message || "Unable to load cart");
        }
      } catch (err) {
        console.log("Cart fetch error:", err);
        setError("Failed to load cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [id, token, setCart, books]);

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading...</p>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  return (
    <motion.div
      className="h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-center text-violet-700 mb-6">
        🛒 Your Cart
      </h1>

      {getCartBooks.length === 0 && (
        <motion.div
          className="empty-cart-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <motion.div
            className="cart-svg"
            animate={{
              y: [0, -5, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="120" height="100" viewBox="0 0 64 64" fill="none">
              <path
                d="M2 6H10L16 40H52L60 14H16"
                stroke="#555"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="20" cy="52" r="4" fill="#555" />
              <circle cx="48" cy="52" r="4" fill="#555" />
            </svg>
          </motion.div>
          <p className="empty-text text-gray-600 text-shadow-emerald-300 text-shadow text-xl font-medium">
            Your cart is empty
          </p>
        </motion.div>
      )}

      {getCartBooks.length > 0 && (
        <motion.div
          className="flex gap-6 w-[80%] mx-auto mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <div className="rounded-lg shadow-md pd6 w-[300px] lg:w-[800px] flex flex-col gap-2">
            {getCartBooks.map((book) => (
              <motion.div
                key={book._id}
                className=" flex bg-red-500"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <div className="flex justify-between gap-5">
                  <BookCard book={book} cssClass={"checkout-card"} />
                  <div className="flex justify-center w-[200px] items-center flex-row gap-2">
                    <button
                      onClick={() => decrementQuantity(book._id)}
                      className="border border-black px6 py2 rounded-full"
                    >
                      -
                    </button>
                    <p className="text-sm text-gray-600">
                      {itemQuantity[book._id] || 1}
                    </p>
                    <button
                      onClick={() => incrementQuantity(book._id)}
                      className="border border-black px6 py2 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <Link to="/checkout" className="mt-1 button-primary">
              Go To Checkout
            </Link>
          </div>

          <motion.div
            className="summary-container pd10 mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md h-screen w-[500px] max-w-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          >
            <div
              className="accordion-header cursor-pointer flex justify-between items-center border-b py-2"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            >
              <h2 className="text-2xl font-semibold text-violet-700">
                🧾 Order Summary
              </h2>
              {isSummaryOpen ? (
                <FaArrowUp className="text-violet-700" />
              ) : (
                <FaArrowDown className="text-violet-700" />
              )}
            </div>
            {isSummaryOpen && (
              <div className="accordion-content border-b py-4">
                <div className="text-lg text-gray-700 mb-2 flex justify-between">
                  <span>Total Products:</span>
                  <span>{totalItems}</span>
                </div>

                <div className="text-lg text-gray-700 mb-2 flex justify-between">
                  <span>Total Price:</span>
                  <span className="flex items-center gap-1">
                    <FaRupeeSign className="text-base" />
                    {totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="text-lg text-green-700 mb-2 flex justify-between">
                  <span>Discount ({discountPercent}%):</span>
                  <span className="flex items-center gap-1">
                    -<FaRupeeSign className="text-base" />
                    {discountAmount.toFixed(2)}
                  </span>
                </div>

                <div className="text-lg text-gray-700 mb-2 flex justify-between">
                  <span>Shipping Charges:</span>
                  <span className="flex items-center gap-1">
                    <FaRupeeSign className="text-base" />
                    {shippingCharge.toFixed(2)}
                  </span>
                </div>

                <hr className="my-4" />

                <div className="text-xl font-bold text-gray-900 flex justify-between">
                  <span>Final Amount:</span>
                  <span className="flex items-center gap-1 text-violet-700">
                    <FaRupeeSign className="text-base" />
                    {finalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mt-4 border-t pt-4">
                  <p>
                    Discount applied{" "}
                    <span className="text-lime-600">successfully!</span>.
                    Shipping is free on orders above ₹500. You can modify
                    quantity from this page.
                  </p>
                </div>
              </div>
            )}

            <div
              className="accordion-header cursor-pointer flex justify-between items-center border-b py-2 mt-4"
              onClick={() => setIsAddressOpen(!isAddressOpen)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Delivery Address
              </h3>
              {isAddressOpen ? (
                <FaArrowUp className="text-gray-800" />
              ) : (
                <FaArrowDown className="text-gray-800" />
              )}
            </div>
            {isAddressOpen && (
              <div className="accordion-content border-b py-4">
                <p className="text-base text-gray-600">
                  {UserData.address.address}, {UserData.address.city},{" "}
                  {UserData.address.state}, {UserData.address.country} -{" "}
                  {UserData.address.zip}
                </p>
              </div>
            )}

            <div
              className="accordion-header cursor-pointer flex justify-between items-center border-b py-2 mt-4"
              onClick={() => setIsPaymentOpen(!isPaymentOpen)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Payment Method
              </h3>
              {isPaymentOpen ? (
                <FaArrowUp className="text-gray-800" />
              ) : (
                <FaArrowDown className="text-gray-800" />
              )}
            </div>
            {isPaymentOpen && (
              <div className="accordion-content border-b pd4 space-y-2">
                <label className="text-xl text-gray-600 flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="card"
                    checked={selectedOption === "card"}
                    onChange={handleOptionChange}
                  />
                  Credit/Debit Card
                </label>

                <label className="text-xl text-gray-600 flex items-center gap-2">
                  <input
                    type="checkbox"
                    value="cod"
                    checked={selectedOption === "cod"}
                    onChange={handleOptionChange}
                  />
                  Cash On Delivery
                </label>
              </div>
            )}

            <div className="text-center pd5 mt-4">
              <Link to="/checkout" className="button-primary w-full">
                Continue to Payment!
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cart;
