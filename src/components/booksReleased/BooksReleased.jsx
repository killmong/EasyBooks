import React, { useContext, } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { BookContext } from "../../Context/BookContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "./BooksReleased.css";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "react-toastify/dist/ReactToastify.css";
import BookCard from "../../common/components/BookCard";

const BooksReleased = () => {
  const { books } = useContext(BookContext);

  return (
    <div className="books-released-container">
      <Swiper
        // Install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={4}
        navigation
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <BookCard book={book} cssClass={"book-card"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksReleased;
