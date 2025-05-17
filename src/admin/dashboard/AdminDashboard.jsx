import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // Holds the values for a book.
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    stock: "",
    isbn: "",
  });

  // Holds the book ID used for update or delete
  const [bookId, setBookId] = useState("");

  // This state is used to display messages from our server.
  const [message, setMessage] = useState("");

  // Update the form data as user types.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define headers common for our API calls.
  const headers = {
    "Content-Type": "application/json",
    // Ensure these are set appropriately (for example, from sessionStorage or another auth storage)
    id: sessionStorage.getItem("userId") || "",
    Authorization: `Bearer ${sessionStorage.getItem("adminToken") || ""}`,
  };

  // Function to call the addBook API
  const handleAddBook = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getBooks", {
        method: "GET",
        headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message);

      if (response.status === 201) {
        // Optionally clear the form or do some other action.
        alert("Book added successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Failed to add book");
      alert("Failed to add book");
    }
  };

  // Function to call the updateBook API.
  const handleUpdateBook = async () => {
    if (!bookId) {
      setMessage("Please enter a book ID to update");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/updateBook/${bookId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      alert(data.message);
    } catch (error) {
      console.error("Error updating book:", error);
      setMessage("Failed to update book");
      alert("Failed to update book");
    }
  };

  // Function to call the deleteBook API.
  const handleDeleteBook = async () => {
    if (!bookId) {
      setMessage("Please enter a book ID to delete");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/deleteBook/${bookId}`,
        {
          method: "DELETE",
          headers,
        }
      );
      const data = await response.json();
      setMessage(data.message);
      alert(data.message || "Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      setMessage("Failed to delete book");
      alert("Failed to delete book");
    }
  };

  return (
    <div className="adminWrapper">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📚 Admin Book Manager
      </h2>

      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {Object.keys(formData).map((field) => (
          <div className="flex flex-col gap-1" key={field}>
            <label htmlFor={field} className="capitalize text-base">
              {field}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="mb-2 w-full adminInput border rounded hover:border-blue-500 outline-0"
            />
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Book ID (for update/delete)"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded"
      />

      <div className="flex gap-3 justify-between">
        <button
          onClick={handleAddBook}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Book
        </button>
        <button
          onClick={handleUpdateBook}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Book
        </button>
        <button
          onClick={handleDeleteBook}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
