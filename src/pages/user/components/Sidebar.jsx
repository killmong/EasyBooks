import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden focus:outline-none"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-1 bg-black mb-1 transition-all duration-300 origin-center" />
        <div className="w-6 h-1 bg-black mb-1 transition-all duration-300 origin-center" />
        <div className="w-6 h-1 bg-black transition-all duration-300 origin-center" />
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-40
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <ul className="space-y-4">
          <li>
            <Link  className="hover:underline">
              My Orders
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/addresses" className="hover:underline">
              Addresses
            </Link>
          </li>
          <li>
            <Link to="/payment-methods" className="hover:underline">
              Payment Methods
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:underline">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:underline text-red-500">
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
