import React, { useState, useContext, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../Context/LoginContext";
import { BookContext } from "../../../Context/BookContextProvider";
import { FaRegUserCircle } from "react-icons/fa";

const CallToAction = () => {
  const { cart, wishlist, setCart, setWishlist } = useContext(BookContext);
  const { user, setUser, setIsLoggedIn, isLoggedIn } = useContext(LoginContext);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const userId = JSON.parse(sessionStorage.getItem("userId"));
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("wishlistCount");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setWishlist([]);

    navigate("/");
  };

  useEffect(() => {
    const cartCount = cart && cart ? cart.length : 0;
    const wishlistCount = wishlist && wishlist ? wishlist.length : 0;

    setCartCount(cartCount);
    setWishlistCount(wishlistCount);

    
  }, [user, cart, wishlist]);

  return (
    <div className="flex gap-4 items-center relative">
      {!isLoggedIn ? (
        <Link className="btn hover:bg-blue-500 hover:text-white" to="/login ">
          Login!
        </Link>
      ) : (
        <Link
          onClick={() => logout()}
          className="btn hover:bg-blue-500 hover:text-white"
        >
          Logout!
        </Link>
      )}
      {isLoggedIn && (
        <Link to={`/profile/${userId}`} className="text-2xl icons">
          <FaRegUserCircle className="icons" />
        </Link>
      )}
      <div className="flex gap-4">
        <Link to="/wishlist" className="relative cursor-pointer">
          <CiHeart className="text-2xl icons" />
          {wishlistCount > 0 && (
            <span className="absolute -top-4 -right-1 pd1 text-white bg-red-600 rounded-full px-1.5 text-sm font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative cursor-pointer">
          <FaCartShopping className="text-2xl icons text-blue-500" />
          {cartCount > 0 && (
            <span className="absolute -top-4 -right-1 text-white bg-red-600 rounded-full pd1 text-sm font-bold">
              <p> {cartCount}</p>
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
