import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className="quick-links">
      <h5 className="pd1">Quick Links</h5>
      <ul className="list-unstyled">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/faq">FAQs</Link>
        </li>
        <li>
          <Link to="/terms">Terms & Conditions</Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
