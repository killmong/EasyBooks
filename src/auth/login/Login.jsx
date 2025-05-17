import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../common/components/Button";
import { LoginContext } from "../../Context/LoginContext";
import { BookContext } from "../../Context/BookContextProvider";
import { loginUser } from "../../api/authApi";
import { motion} from "framer-motion";
import { getCartApi } from "../../api/cartApi";
import { getWishlistApi } from "../../api/wishlistApi";
import { saveWishlist } from "../../utils/wishlistlocal";
import "./Login.css";
const Login = () => {
  const { user, setUser, isLoggedIn } = useContext(LoginContext);

  const { cart, setCart, wishlist, setWishlist } = useContext(BookContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const userData = await loginUser(data.username, data.password);
      console.log("userData", userData);
      if (userData) {
        const { role, token, id } = userData;

        const wishlistData = await getWishlistApi(token, id);
        const { books: wishlistBooks } = wishlistData;

        saveWishlist(wishlistBooks); // ✅ Save array only
        setWishlist(wishlistBooks); // ✅ Set array in state
        localStorage.setItem("wishlist", JSON.stringify(wishlistBooks)); // ✅ Store array only

        console.log(wishlist);

        const cartData = await getCartApi(token, id);
        console.log("cartData", cartData);
        if (cartData) {
          const { books : cartBooks } = cartData;
          setCart(cartData);
          localStorage.setItem("cart", JSON.stringify(cartBooks)); // ✅ Store array only
        } else {
          console.log("No cart data found for this user.");
        }

        sessionStorage.setItem("userId", JSON.stringify(id));
        setUser(userData);

        if (role === "admin") {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
          sessionStorage.setItem("adminToken", JSON.stringify(token));
          sessionStorage.setItem("admin", JSON.stringify(token));
          navigate("/admin/dashboard");
        } else if (role === "user") {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
          sessionStorage.setItem("user", JSON.stringify(token));
          navigate("/");
        } else if (role === "seller") {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
          sessionStorage.setItem("seller", JSON.stringify(token));
          navigate("/seller/dashboard");
        }
        alert("Login successful!");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  console.log("user", wishlist);
  console.log(cart);
  return (
    <div className="flex relative justify-center items-center pd10">
      <div className="absolute top-3 left-5">
        <Button navigateLink={"/"} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex border-2 rounded-4xl border-blue-400 flex-row justify-between login-container"
      >
        <motion.div
          className="left-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.img
            src="vite.svg"
            className="w-[100px] h-[50px]"
            alt=""
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
          />

          <h2 className="text-2xl text-blue-400 bg-gradient-to-r capitalize">
            login. <span>curl up</span>
          </h2>

          <p className="text-neutral-800 capitalize text-xl">
            Dive Into! a world full of stories
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col input-container">
              <label htmlFor="username" className="text-shadow text-shadow-black">username</label>
              <input
                type="text" 
  
                placeholder="Enter username"
                className="focus:shadow-md focus:shadow-blue-400 hover:shadow-sm hover:shadow-blue-100"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-red-500">Username is required</span>
              )}
            </div>

            <div className="flex flex-col gap-1 input-container mt-4">
              <label htmlFor="password">password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="focus:shadow-md focus:shadow-blue-400 hover:shadow-sm hover:shadow-blue-100"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            <div className="input-container">
              <div className="flex justify-between">
                <span className="text-base">
                  <input type="checkbox" /> Remember me
                </span>
                <Link className="hover:text-blue-400">Forgot Password!</Link>
              </div>

              <button
                className="button w-full shadow-md shadow-gray-400 hover:shadow-sm hover:shadow-blue-400 hover:bg-gray-100 hover:text-black" 
                type="submit"
               >
                Login
              </button>
            </div>

            <span className="flex mt-2">
              <p className="capitalize">not registered yet? </p>
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-500 ml-1"
              >
                Create an account
              </Link>
            </span>
          </form>
        </motion.div>

        <motion.div
          className="w-[60%] bg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
