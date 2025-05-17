import React, { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5"; // Import heart icons

const AddToWishlist = ({ onWishlistToggle }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsInWishlist((prev) => !prev);
    if (onWishlistToggle) {
      onWishlistToggle(!isInWishlist);
    }
  };

  return (
    <div className="flex  absolute top-5 right-5 items-center flex-col mt-4">
      <button onClick={toggleWishlist} className="wishlist-btn">
        {isInWishlist ? (
          <IoHeart className="text-red-600 text-2xl" />
        ) : (
          <IoHeartOutline className="text-gray-600 text-2xl" />
        )}
      </button>
    </div>
  );
};

export default AddToWishlist;
