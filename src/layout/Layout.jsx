import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {


  const pathname = useLocation().pathname;
  return (
    <div>{ pathname == "/login" && pathname !== "/register" ? null : <Header />}
      <main>{children}</main>
      { pathname == "/login" && pathname !== "/register" ? null : <Footer />}
    </div>
  );
};

export default Layout;
