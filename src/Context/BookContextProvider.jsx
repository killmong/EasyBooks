import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const parseJSON = (value) => {
    try {
      if (!value || value === "undefined") return null;
      return JSON.parse(value);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return null;
    }
  };

  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const storedCart = parseJSON(localStorage.getItem("cart")) || [];

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = user?.token;
  const id = user?.id;

  // ✅ State variables
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(storedWishlist);
  const [bookStatus, setBookStatus] = useState({});
  const [cart, setCart] = useState(storedCart);
  console.log("storedCartBooks", books);
  // 🔁 Sync localStorage when cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // ✅ Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/books/getBooks"
        );
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Fetch wishlist (sessionStorage or fallback to localStorage)
  useEffect(() => {
    const fetchWishlist = async () => {
      if (token && id) {
        try {
          const localWishlist = JSON.parse(localStorage.getItem("wishlist"));

          setWishlist(localWishlist || []);
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      } else {
        const storedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (token && id) {
          try {
            const localCart = JSON.parse(localStorage.getItem("cart"));
            setCart(localCart || []);
          } catch (error) {
            console.error("Failed to fetch wishlist:", error);
          }
        } else {
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCart(storedCart); // Update cart in context
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);
  // ✅ Add to Cart

  const addToCart = async (bookData) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const token = user.token;
    console.log("token", token);

    const userid = user.id;
    console.log("userId", userid);
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/addToCart/${bookData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure 'token' is defined
            userid: userid, // Ensure 'id' is defined
          },
          body: JSON.stringify(bookData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        toast.success("Added to cart successfully!");
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart.");
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (bookId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/removeFromCart",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
            bookid: bookId,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCart((prev) => prev.filter((item) => item._id !== bookId));
        setBookStatus((prev) => ({ ...prev, [bookId]: false }));
        toast.success("Removed from cart successfully!");
      } else {
        toast.error(data.message || "Failed to remove from cart.");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("An error occurred while removing from cart.");
    }
  };

  // ✅ Add to Wishlist
  const addToWishlist = async (bookId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/wishlist/addToWishlist",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
            bookid: bookId,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWishlist((prev) => [...prev, data]);
        setBookStatus((prev) => ({ ...prev, [bookId]: true }));
        toast.success("Added to wishlist successfully!");
      } else {
        toast.error(data.message || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error("An error occurred while adding to wishlist.");
    }
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (bookId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/wishlist/removeFromWishlist",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
            bookid: bookId,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== bookId));
        setBookStatus((prev) => ({ ...prev, [bookId]: false }));
        toast.success("Removed from wishlist successfully!");
      } else {
        toast.error(data.message || "Failed to remove from wishlist.");
      }
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      toast.error("An error occurred while removing from wishlist.");
    }
  };

  // ✅ View Book Details
  const viewBookDetails = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/getBook/${bookId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate(`/book/bookDetails/${bookId}`);
      } else {
        toast.error(data.message || "Failed to fetch book details.");
      }
    } catch (error) {
      console.error("Book detail fetch error:", error);
      toast.error("An error occurred while fetching book details.");
    }
  };
// ✅ Fetch books by category
const fetchBooksByCategory = async (category) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/books/getBooksByCategory?category=${category}`
    );
    const data = await response.json();

    if (response.ok) {
      return data.books; // Return the filtered books
    } else {
      toast.error(data.message || "Failed to fetch books by category.");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch books by category:", error);
    toast.error("Error fetching books by category.");
    return [];
  }
};

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        loading,
        wishlist,
        setWishlist,
        cart,
        setCart,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        viewBookDetails,
fetchBooksByCategory,
        bookStatus,
      }}
    >
      {children}
      <ToastContainer />
    </BookContext.Provider>
  );
};

export { BookContext, BookContextProvider };
