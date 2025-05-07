import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const { name, image, price } = product;

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
