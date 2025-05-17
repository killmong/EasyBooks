// WISHLIST: Local Storage Key
const WISHLIST_KEY = "wishlist";

// Get wishlist
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

// Save wishlist
export const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

// Toggle book in wishlist (add if not there, remove if there)
export const toggleWishlist = (book) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === book.id);

  let updatedWishlist;
  if (exists) {
    updatedWishlist = wishlist.filter((item) => item.id !== book.id);
  } else {
    updatedWishlist = [...wishlist, book];
  }

  saveWishlist(updatedWishlist);
  return updatedWishlist;
};

// Check if book is in wishlist
export const isInWishlist = (bookId) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === bookId);
};
