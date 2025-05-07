import React, { useState } from 'react';
import ProductCard from './ProductCard';
import API from '../api';
import '../assets/css/shop/Shop.css';

import img1 from '../assets/images/bracelet.jpg';
import img2 from "../assets/images/neck.jpg";
import img3 from '../assets/images/fff.jpg';
import img4 from '../assets/images/r.jpg';
import img5 from '../assets/images/ww.jpg';
import img6 from '../assets/images/ee.jpg';
import img7 from '../assets/images/as.jpg';
import img8 from '../assets/images/cufflinks.jpg';

const products = [
  { id: 1, name: 'Elegant Golden Ring', image: img1, price: 499.99 },
  { id: 2, name: 'Sapphire and Diamond Ring', image: img2, price: 699.99 },
  { id: 3, name: 'Elegant Flower Necklace', image: img3, price: 499.99 },
  { id: 4, name: 'Diamond Earrings', image: img4, price: 699.99 },
  { id: 5, name: 'Golden Vintage Watch', image: img5, price: 499.99 },
  { id: 6, name: 'Sea Shell Earrings', image: img6, price: 699.99 },
  { id: 7, name: 'Elegant Diamond Necklace', image: img7, price: 499.99 },
  { id: 8, name: 'Golden Cafflin', image: img8, price: 699.99 },
];

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleItemAdded = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleSendOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      const response = await API.post('/orders/addOrder', {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
      });

      alert(response.data.message);
      setCartItems([]);
    } catch (err) {
      console.error('Order sending failed:', err.response || err);
      alert('Failed to send order.');
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h2>Explore Our Collection</h2>
        {cartItems.length > 0 && (
          <div className="cart-controls">
            <span className="cart-icon">🛒: {cartItems.length} item selected </span>
            <button className="send-order-btn" onClick={handleSendOrder}>
              Send Order
            </button>
          </div>
        )}
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleItemAdded(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
