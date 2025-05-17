import React from "react";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import AddToWishlist from "./AddToWishlist";

const BookCard = ({ book, cssClass }) => {
  const navigate = useNavigate();

  return (
    <div className=" bookwrap">
      <div className={cssClass}>
        <div >
          <img
            className="w-full h-full object-contain  transition-transform duration-300 cursor-pointer"
            src={book.url}
            onClick={() => navigate(`/book/bookDetails/${book._id}`)}
            alt={book.title}
          />
        </div>
        <div className="flex flex-col gap-2 pd4 ">
          {" "}
          <h3 className="text-xl text-center text-black font-medium">
            {book.title}
          </h3>
          <p className="text-sm text-center text-gray-500 font-light">
            {book.author}
          </p>
          <p className="text-gray-800  text-2xl relative  flex justify-center  gap-1">
            <FaIndianRupeeSign className="text-base" />
            {book.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
