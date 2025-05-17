import React, { useState } from "react";
const AddToCart = ({AddToCart}) => {
  const [quantity, setQuantity] = useState(1);
  

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex items-center flex-col space-x-4 mt-4">
      <div className="flex items-center border w-full   border-gray-300 rounded-md">
        <button onClick={decrement} className="counter">
          -
        </button>
        <span className="counter-value">{quantity}</span>
        <button onClick={increment} className="counter">
          +
        </button>
      </div>

      <button

      onClick={() => {AddToCart(quantity)}}
        className="cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
