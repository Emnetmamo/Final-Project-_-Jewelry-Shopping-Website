import React from 'react';
import '../assets/css/Footer.css'
import logo from "../assets/images/lgo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
      <div className="social-icons" style={{marginTop:"120px"}}>
      <h4><i className="fas fa-map-marker-alt"></i> Address</h4>
      </div>
        <p style={{fontSize:"18px"}}>Buna Board Saris, Addis Ababa, Ethiopia </p>
      </div>

      <div className="footer-section footer-center">
        <img src={logo} alt="Nomdas Logo" className="footer-logo" />
        <p className='p'>Providing elegance and style in every piece.</p>
      </div>

      <div className="footer-section footer-right" style={{fontSize: "18px", marginTop:"90px"}}>
        <h4>Contact Us</h4>
        <p>
          <i className="fas fa-phone"></i> +251975649898<br />
          <i className="fas fa-envelope"></i> emnetmk@gmail.com
        </p>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Nomdas Jewelry. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
