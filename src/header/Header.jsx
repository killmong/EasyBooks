import React from "react";
import NavBar from "./components/NavBar";
import CallToAction from "./components/CallToAction";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="wrapper flex  justify-between items-center py-4 px-8  shadow-md">
      <div className="h-[100px] w-[150px]">
        <Link to="/">
          <img src="/logo.png" className="w-full h-full object-cover" alt="" />
        </Link>{" "}
      </div>
      <NavBar />
      <CallToAction />
    </div>
  );
};

export default Header;
