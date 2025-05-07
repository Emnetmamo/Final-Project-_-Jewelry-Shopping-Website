import React from 'react';
import '../../assets/css/Home/FeaturedProducts.css';
import img1 from "../../assets/images/jewl.jpg"
import img2 from "../../assets/images/ring.jpg"
import img3 from '../../assets/images/bracelet.jpg';
import img4 from '../../assets/images/earrings.jpg';
import img5 from '../../assets/images/watch.jpg';
import img6 from '../../assets/images/brooch.jpg';
import img7 from '../../assets/images/pendant.jpg';
import img8 from '../../assets/images/cufflinks.jpg';
import img9 from '../../assets/images/tiara.jpg';


const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Elegant Diamond Necklace',
      image: img1,
      price: '$499.99',
    },
    {
      id: 2,
      name: 'Sapphire and Diamond Ring',
      image: img2,
      price: '$699.99',
    },
    {
      id: 3,
      name: 'Stunning Diamond Bracelet',
      image: img3,
      price: '$899.99',
    },
    {
      id: 4,
      name: 'Sparkling Diamond Earrings',
      image: img4,
      price: '$549.99',
    },
    {
      id: 5,
      name: 'Luxury Gold Watch',
      image: img5,
      price: '$1299.99',
    },
    {
      id: 6,
      name: 'Exquisite Diamond Brooch',
      image: img6,
      price: '$749.99',
    },
    {
      id: 7,
      name: 'Elegant Diamond Pendant',
      image: img7,
      price: '$599.99',
    },
    {
      id: 8,
      name: 'Classic Cufflinks Set',
      image: img8,
      price: '$199.99',
    },
    {
      id: 9,
      name: 'Royal Diamond Tiara',
      image: img9,
      price: '$1499.99',
    },

  ];

  return (
    <div className="featured-products">
      <h2 style={{textAlign:"center"}}>Our Featured Products</h2>
      <p style={{textAlign:"center"}}>Explore our handcrafted collection designed for elegance and sophistication.</p>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button style={{borderRadius:"5px", color: "goldenrod", borderColor:"goldenrod", backgroundColor:"#fff"}}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
