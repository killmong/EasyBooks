export const fetchBooksApi = async () => {
    const response = await fetch("http://localhost:3000/api/books/getBooks");
    return response.json();
  };
  
  export const fetchBookDetailsApi = async (bookId, token, userId) => {
    const response = await fetch(`http://localhost:3000/api/books/getBook/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: userId,
      },
    });
    return response.json();
  };
  