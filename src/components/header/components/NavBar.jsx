import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        // Split the search query into potential fields
        const queryParts = searchQuery.split(",").map((part) => part.trim());

        // Construct the query object based on input
        const queryObject = {};
        queryParts.forEach((part) => {
          if (part) {
            if (part.match(/^\d+$/)) {
              queryObject.isbn = part; // Assume numeric input is ISBN
            } else if (part.includes(" ")) {
              queryObject.title = part; // Assume spaces indicate a title
            } else {
              queryObject.author = part; // Default to author if no spaces
              queryObject.category = part; // Also consider as category
            }
          }
        });

        const queryString = new URLSearchParams(queryObject).toString();

        const response = await fetch(
          `http://localhost:3000/api/books/searchBooks?${queryString}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Search results:", data.books);
        // Handle the search results (e.g., update state to display results)
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <nav className="flex w-[600px] active:shadow active:shadow-gray-400 hover:shadow-md hover:shadow-green-300 items-center gap-4 searchBox">
      <IoSearchOutline className="text-base text-blue-600" />
      <input
        type="text"
        placeholder="Search by ISBN, author, title"
        className="border-0 outline-0 w-full text-blue-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
    </nav>
  );
};

export default NavBar;
