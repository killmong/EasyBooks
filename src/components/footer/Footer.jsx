import React from "react";
import { Link } from "react-router-dom";
import Cards from "./components/Cards";
import { motion } from "framer-motion";

import "./Footer.css";
import QuickLinks from "./components/QuickLinks";
import QuickLinksAlt from "./components/OurLinks";
import SocialLinks from "./components/SocialLinks";
import USP from "./components/USP";
const Footer = () => {
  const svg = [
    {
      id: 1,
      src: "/Free-Delivery.svg",
      alt: "Free Delivery",
      text: "Free Delivery",
    },
    {
      id: 2,
      src: "svg/Replacement-icon.svg",
      alt: "Replacement",
      text: "Easy Replacement",
    },
    {
      id: 3,
      src: "svg/cash-Delivery.svg",
      alt: "Cash on Delivery",
      text: "Cash on Delivery",
    },
    {
      id: 4,
      src: "svg/Original-Products.svg",
      alt: "Original Products",
      text: "Original Products",
    },
  ];

  return (
    <div className=" text-white  ">
      <div className="bg-[#3CAB88] mx-auto flex justify-center pad ">
        {svg.map((item) => (
          <div key={item.id} className="services">
            <img src={item.src} alt={item.alt} className="w-[32px] h-[22px]" />
            <p className="animated-underline font-bold">{item.text}</p>
            <span className="border border-dashed h-10 mx " ></span>
          </div>
        ))}
      </div>

      <div className="w-full  pd5  bg-gray-800">
        <section className="footer">
          <div className="flex justify-between mx5">
            <div className="flex flex-col gap-4">
            <SocialLinks />
             <USP />
            </div>
            <QuickLinks />
            <QuickLinksAlt />
          </div>
        </section>
        <section className="flex mx5 justify-between">
          <div className="flex justify-center items-center gap-4">
            <p>© 2025 BookStore. All rights reserved.</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
          <Cards />
        </section>
      </div>
    </div>
  );
};

export default Footer;
