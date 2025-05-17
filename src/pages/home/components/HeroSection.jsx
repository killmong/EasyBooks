import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar,Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
    }, 2000);
    return () => clearInterval(interval);
  });

  const slideImages = [
    {
      id: 1,
      img: "/banner/img2.jpg",
    },

    { id: 2, img: "/banner/img3.jpg" },
    {
      id: 3,
      img: "/banner/img4.jpg",
    },
  ];
  return (
    <div className="text-5xl h-screen  font-bold text-center py-20">
      <section className="heroBg h-screen">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} // Make sure Autoplay is imported
          slidesPerView={1}
          navigation
          loop={true} // <-- This enables infinite looping
          autoplay={{ delay: 3000, disableOnInteraction: false }} // <-- This enables autoplay
        >
          {slideImages.map((book) => ( 
            <SwiperSlide key={book.id}>
              <div className="relative bg-violet-600 img-container w-full h-auto overflow-hidden">
                <img className="w-full h-full object-contain" src={book.img} />
              </div>
            </SwiperSlide>
          ))}
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
