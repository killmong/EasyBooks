// BooksCategory.jsx or .tsx
import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCard from "../../common/components/BookCard";
import { BookContext } from "../../Context/BookContextProvider";

const BooksCategory = ({ category = "" }) => {
  const { fetchBooksByCategory } = useContext(BookContext);
  const [categoryBooks, setCategoryBooks] = useState([]);

  useEffect(() => {
    const getCategoryBooks = async () => {
      const books = await fetchBooksByCategory(category);
      setCategoryBooks(books);
    };

    getCategoryBooks();
  }, [category]);

  if (!categoryBooks.length) return <div>No books found for {category}</div>;

  return (
    <div className="books-category-container my-6">
      <h2 className="text-2xl font-bold pd5 mx-3.5  mb-4">{category} Books</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={6}
        navigation
      >
        {categoryBooks.map((book) => (
          <SwiperSlide key={book._id} >
            <BookCard book={book} cssClass={"book-card"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksCategory;
