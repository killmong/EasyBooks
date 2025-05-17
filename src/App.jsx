import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import { BookContextProvider } from "./Context/BookContextProvider";
import { LoginContextProvider } from "./Context/LoginContext";
import UserProfile from "./pages/user/UserProfile";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import CompleteProfile from "./pages/user/completeProfile/CompleteProfile";
import { ToastContainer } from "react-toastify";
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./components/stripe/PaymentSuccess";
import BookDetails from "./pages/book/BookDetails";
import { CartProvider } from "./Context/CartContext";
import PaymentForm from "./components/stripe/PaymentForm";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="flex flex-col justify-between gap-4 h-screen">
      <BookContextProvider>
        <LoginContextProvider>
          <CartProvider>
            <Layout>
              <Routes>
                {" "}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/cart/:id" element={<Cart />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/wishlist/:id" element={<Wishlist />} />
                <Route
                  path="/user/completeprofile"
                  element={<CompleteProfile />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/book/bookDetails/:id" element={<BookDetails />} />
                <Route path="/payment/order" element={<PaymentSuccess />} />
              </Routes>
            </Layout>
          </CartProvider>
        </LoginContextProvider>
      </BookContextProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;
