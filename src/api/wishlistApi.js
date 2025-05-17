export const getWishlistApi = async (token, id) => {
    const response = await fetch("http://localhost:3000/api/wishlist/getWishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
      },
    });
    return response.json();
  };
  
  export const addToWishlistApi = async (bookId, token, id) => {
    const response = await fetch("http://localhost:3000/api/wishlist/addToWishlist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
        bookid: bookId,
      },
    });
    return response.json();
  };
  
  export const removeFromWishlistApi = async (bookId, token, id) => {
    const response = await fetch("http://localhost:3000/api/wishlist/removeFromWishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
        bookid: bookId,
      },
    });
    return response.json();
  };
  