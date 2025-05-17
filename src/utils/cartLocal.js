// CART: Local Storage Key
const CART_KEY = "bookstore_cart";

// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Add book to cart
export const addToCart = (book) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === book.id);

  let updatedCart;
  if (existing) {
    updatedCart = cart.map((item) =>
      item.id === book.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...cart, { ...book, quantity: 1 }];
  }

  saveCart(updatedCart);
  return updatedCart;
};

// Remove book from cart
export const removeFromCart = (bookId) => {
  const cart = getCart().filter((item) => item.id !== bookId);
  saveCart(cart);
  return cart;
};

// Decrease quantity or remove
export const decrementCartItem = (bookId) => {
  const cart = getCart();
  const updatedCart = cart
    .map((item) =>
      item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);
  saveCart(updatedCart);
  return updatedCart;
};

// Check if book is in cart
export const isInCart = (bookId) => {
  const cart = getCart();
  return cart.some((item) => item.id === bookId);
};

