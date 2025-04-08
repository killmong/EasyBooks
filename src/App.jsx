import "./App.css";
import Home from "./pages/home/Home";
import {  Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
function App() {
  return (
    <div>
      <Layout>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
