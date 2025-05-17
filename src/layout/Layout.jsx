import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const pathname = useLocation().pathname;

  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex flex-col justify-between gap-4  bg-gray-100">
      {!hideLayout && <Header />}
      <main>{children}</main>
      <div className="paddingWrapper"></div>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Layout;
