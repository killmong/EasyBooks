import React from "react";
import HeroSection from "./components/HeroSection";
import HeroSection2 from "./components/HeroSection2";
import Parallax from "./components/Parallax/Parallax";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HeroSection2 />
      <Parallax />
    </div>
  );
};

export default Home;
