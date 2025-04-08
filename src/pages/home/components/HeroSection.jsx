import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";


const HeroSection = () => {
  const spanText = [
    {
      text: "read",
      id: 1,
    },
    {
      text: "know",
      id: 2,
    },
    {
      text: "live",
      id: 3,
    },
  ];

  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % spanText.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  
  return (
    <div
     
      className="text-5xl h-screen  font-bold text-center py-20"
    >
      <section className="heroBg h-screen">
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="w-full  h-full relative">
              <img
                src="/banner/banner1.webp"
                className="w-full h-full object-cover "
                alt="banner1"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-full  h-full relative">
              <img
                src="/banner/banner2.webp"
                alt="banner2"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full  h-full relative">
              <img
                src="/banner/banner3.webp"
                alt="banner3"
                className="w-full  h-full object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="pd10 ">
          <h1 className="text-7xl underline capitalize text-black   ">
            <span className="tagline ">
              <span className="">{spanText[index].text}</span>
            </span>
            more.
          </h1>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
