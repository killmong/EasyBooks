
import React from "react";

const Cards = () => {
  const cards = [
    { id: 1, src: "cards/ma_symbol.svg", alt: "Mastercard" },
    { id: 2, src: "cards/icons8-rupay-48.png", alt: "Rupaycard" },
    { id: 3, src: "cards/icons8-visa-card-50.png", alt: "Visa" },
    { id: 4, src: "cards/icons8-american-express-48.png", alt: "Amexcard" },
  ];
  return (
    <div class="payment-logos flex">
      {cards.map((card) => (
        <img src={card.src} alt={card.alt} key={card.id} />
      ))}
    </div>
  );
};

export default Cards;
