// Check if item is in cart



export const isInCart = (cart = [], productId) => {
  return cart.some((item) => item.id === productId);
};

// Add to cart or increase quantity
export const addToCart = (cart = [], product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { ...product, quantity: 1 }];
};

// Remove item from cart
export const removeFromCart = (cart = [], productId) => {
  return cart.filter((item) => item.id !== productId);
};

// Decrease quantity or remove if quantity is 0
export const decrementCartQuantity = (cart = [], productId) => {
  return cart
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0);
};


