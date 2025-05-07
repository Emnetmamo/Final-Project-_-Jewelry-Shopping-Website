import React, { useState } from 'react';
import '../../assets/css/Home/NewsletterSignup.css'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Newsletter signup submitted with email: ${email}`);
  };

  return (
    <div className="newsletter-signup">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest trends and exclusive offers.</p>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
