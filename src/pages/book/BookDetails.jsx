import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BookContext } from "../../Context/BookContextProvider";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa"; // ⭐️ icons

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { books, addToCart } = useContext(BookContext);
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;
  const book = books.find((b) => b._id === id);

  if (!book) return <p>Book not found</p>;

  const {
    title,
    author,
    description,
    price,
    url,
    isbn,
    category,
    rating,
    publisher,
    language,
    edition,
    format,
    pages,
    stock,
  } = book;

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    try {
      await addToCart(book, userId, quantity);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error("Failed to add book to cart.");
    }
  };

  // Generate star icons based on rating
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= roundedRating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-400" />
        )
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen mx-auto w-[90%] py-10 bg-white flex flex-col lg:flex-row gap-10"
    >
      {/* Left Image Section */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="w-64 h-96 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl mb-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            src={url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Center Book Info Section */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col pd5 justify-between gap-5 max-w-2xl w-full"
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-red-700">{title}</h1>
          <h2 className="text-xl font-semibold">
            <span className="text-gray-600">Author:</span> {author}
          </h2>
          <p className="text-2xl font-bold text-green-600">₹{price}</p>

          <div className="flex gap-2 text-xl">{renderStars()}</div>

          <p className="text-sm text-gray-500">
            <span className="font-semibold">ISBN:</span> {isbn}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Publisher:</span>{" "}
            {publisher || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Language:</span> {language}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Edition:</span>{" "}
            {edition || "Standard"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Format:</span> {format}
          </p> 
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Stock:</span> {stock}
          </p>

          <div className="border-t border-gray-300 pt-4 mt-4">
            <p className="text-base text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Cart Section */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-xs border border-gray-300 rounded-2xl pd6 shadow-sm"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={decrement} className="counter-value">
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button onClick={increment} className="counter-value">
            +
          </button>
        </div>
        <div className="buttons">
          <button onClick={handleAddToCart} className="custom-btn btn-cart">
            Add to Cart
          </button>
          <button onClick={handleAddToCart} className="custom-btn btn-wishlist">
            Add to Wishlist
          </button>
          <button onClick={handleAddToCart} className="custom-btn btn-buy">
            Buy Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookDetails;
