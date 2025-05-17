import React from "react";
import HeroSection from "./components/HeroSection";
import HeroSection2 from "./components/HeroSection2";
import Parallax from "./components/Parallax/Parallax";
import BooksReleased from "../../components/booksReleased/BooksReleased";
import BooksCategory from "../../components/category/BooksCategory";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <HeroSection2 />
      <Parallax />
      <BooksReleased />

      
      <BooksCategory category="technology" />
      <BooksCategory category="science-fiction" />
      <BooksCategory category="history" />
    
      <BooksCategory category="novel" />
      
    </div>
  );
};

export default Home;
