export const addToCartApi = async (bookData, token, bookId, userId) => {
  const response = await fetch(
    `http://localhost:3000/api/cart/addToCart/${bookId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: userId,
      },
      body: JSON.stringify(bookData),
    }
  );

  return response.json();
};

export const getCartApi = async (token, id) => {
  const response = await fetch("http://localhost:3000/api/cart/getCart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      id: id,
    },
  });
  return response.json();
};

export const removeFromCartApi = async (bookId, token, userId) => {
  const response = await fetch(
    "http://localhost:3000/api/cart/removeFromCart",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: userId,
        bookid: bookId,
      },
    }
  );
  return response.json();
};
