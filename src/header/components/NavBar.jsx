import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className="flex w-[600px] items-center gap-4 searchBox ">
      <IoSearchOutline className="text-base text-blue-600"  />
      <input
        type="text"
        placeholder="Search Isbn,author,title"
        className="border-0 outline-0   text-blue-600"
      />
    </nav>
  );
};

export default NavBar;
