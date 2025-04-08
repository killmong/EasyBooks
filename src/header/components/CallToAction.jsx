import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
const CallToAction = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link
        className="btn  hover:bg-blue-500 hover:text-white"
        to='/login'
      >
        Login!
      </Link>
      <a href="#" className="underline hover:text-blue-500">
        become a seller!
      </a>
      <FaCartShopping className="text-base text-blue-500 cursor-pointer" />
    </div>
  );
};

export default CallToAction;
