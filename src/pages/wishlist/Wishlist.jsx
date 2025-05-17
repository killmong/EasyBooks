import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BookContext } from "../../Context/BookContextProvider";
import { getWishlistApi } from "../../api/wishlistApi";
import { removeFromWishlistApi } from "../../api/wishlistApi";
import { addToWishlistApi } from "../../api/wishlistApi";
import "./WishList.css";
const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(LoginContext);
  const { wishlist, setWishlist } = useContext(BookContext);
   
  const{ books} = wishlist 

  // Fetch wishlist data when the component mounts
  useEffect(() => {
    console.log("Fetching wishlist data...");
    console.log("user", user);
    console.log(wishlist);

    const { token, id } = user;
    console.log(token);
    setTimeout(() => {
      const fetchWishlistData = async () => {
        try {
          const response = await getWishlistApi(token, id); // Fetch wishlist data from API
        
          if (response.ok) {
            setWishlist(response.books);
             // Set the wishlist data to state
          } else {
            setError(response.message); // Handle errors (empty wishlist, user not found)
          }
        } catch (err) {
          setError("Failed to load wishlist data.");
          console.error("Error fetching wishlist data:", err);
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      };

      fetchWishlistData();
    }, 2000); // Simulate a delay of 1 second before fetching data
  }, []);

  if (loading) {
    return (
      <div>
        <div class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
          <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
            <svg
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
            </svg>
          </div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
          <div class="flex items-center mt-4">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="w-10 h-10 me-3 text-gray-200 dark:text-gray-400"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
            </svg>
            <div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2"></div>
              <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
            </div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
        .
      </div>
    ); // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }

  return (
    <div className="wishlist-container">
      <h1 className="text-xl">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="flex gap-4 flex-wrap justify-center items-center">
          {wishlist.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="relative bg-violet-600 img-container w-full h-[400px] overflow-hidden">
                <img
                  className="w-full h-full object-contain"
                  src={book.url}
                  alt={book.title}
                />
                <div
                  // onClick={() => toggleWishlist(book._id)} // Toggle wishlist status
                  className="absolute top-5 bg-white rounded-sm right-2 cursor-pointer"
                ></div>
              </div>
              <h3 className="text-2xl text-left text-black font-medium">
                {book.title}
              </h3>
              <p className="text-sm text-left text-gray-500 font-light">
                {book.author}
              </p>
              <p className="text-gray-800 text-2xl relative flex">
                <FaIndianRupeeSign className="text-base" />
                {book.price}
              </p>
              <Link className="cart ">Add To Cart</Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
