import React from "react";
import { Link } from "react-router-dom";

const QuickLinksAlt = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "Categories" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/cart", label: "Cart" },
    { path: "/account", label: "My Account" },
  ];

  return (
    <nav className="quick-links">
        <h5 className="pd1">Our Links</h5>
      <ul className="list-inline">
        {links.map((link, index) => (
          <li key={index} className="list-inline-item mx-2">
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default QuickLinksAlt;
