// src/utils/wishlistUtils.js

// Check if product is in wishlist
export const isInWishlist = (wishlist = [], productId) => {
    return wishlist.some((item) => item.id === productId);
  };
  
  // Toggle wishlist item (add/remove)
  export const toggleWishlist = (wishlist = [], product) => {
    const exists = isInWishlist(wishlist, product.id);
    if (exists) {
      return wishlist.filter((item) => item.id !== product.id);
    }
    return [...wishlist, product];
  };
  