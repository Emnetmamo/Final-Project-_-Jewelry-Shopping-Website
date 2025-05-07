import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/lgo.png';
import '../assets/css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img
          src={Logo}
          alt="Nomads Logo"
          className="logo-img"
          style={{ width: "250px", height: "100px", borderRadius: '50px' }}
        />
      </Link>

      <div className="order-now-btn ml-auto">
        <Link to="/login">
          <button className="btn btn-warning">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
