import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./HeroSection.css";
import { motion, useScroll, useTransform } from "framer-motion";
import "swiper/css";
const HeroSection2 = () => {
  let M = motion;
  const ref = useRef < HTMLDivElement > null;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.5, 1]
  );
  const translateContent = useTransform(
    scrollYProgress,
    [0, 1],
    ["-200", "200"]
  );
  return (
    <div>
      <M.section className="heroBg2" ref={ref}>
        <div className="h-[650px] w-full md:flex-row flex-col wrapper flex relative">
          <div
            style={{ y: translateContent, opacity: opacityContent }}
            className="flex md:w-[607px] flex-col justify-center items-center md:gap-10 gap-5 md:pl-20 pl-5"
          >
            <h2 className="md:text-5xl text-2xl font-bold text-center py-20 ">
              Echoes of tomorrow
            </h2>
            <M.p className="text-lg font-normal text-[#4B5563]">
              Step into worlds beyond imagination with our handpicked selection
              of science fiction books. From dystopian futures to intergalactic
              adventures, these stories challenge the boundaries of science,
              humanity, and possibility. Whether you're a lifelong fan or a
              curious newcomer, this collection offers something extraordinary
              for every sci-fi enthusiast.
            </M.p>
            <Link className="capitalize flex text-start button">
              read more{" "}
              <span className="flex items-center justify-center  ml-2">
                <FaArrowRightLong />
              </span>
            </Link>
          </div>
          <div className="max-w-[713px] h-auto ">
            <img
              src="/images/Frame1.png"
              className="w-full h-full object-cover"
              alt="Science Fiction"
            />
          </div>
        </div>
      </M.section>
    </div>
  );
};

export default HeroSection2;
