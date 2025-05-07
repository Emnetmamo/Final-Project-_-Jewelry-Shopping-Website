import React from 'react';
import '../../assets/css/Home/Testimonials.css'
import img1 from "../../assets/images/ppl1.jpg"
import img2 from "../../assets/images/ppl2.jpg"
import img3 from "../../assets/images/ppl3.jpg"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      author: 'Diana james',
      rating: 5,
      comment: '"I absolutely love my purchase from Nomdas! The craftsmanship is superb, and the attention to detail is unmatched. The jewelry pieces are truly works of art."',
      image: img1,
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      comment: '"Nomdas Jewelry exceeded my expectations. The quality, elegance, and uniqueness of their pieces are exceptional. Highly recommended!"',
      image: img2,
    },
    {
        id: 3,
        author: 'Jane Smith',
        rating: 4,
        comment: '"The experience with Nomdas was fantastic. The staff was incredibly helpful, and the selection of jewelry is diverse and stunning. I found the perfect piece for every occasion!"',
        image: img3,
      },
 
  ];

  return (
    <div className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-item">
            <div className="testimonial-header">
              <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`fas fa-star${i <= rating ? ' filled' : ''}`}
        style={{ color: '#FFD700' }} 
      ></i>
    );
  }
  return stars;
}

export default Testimonials;
