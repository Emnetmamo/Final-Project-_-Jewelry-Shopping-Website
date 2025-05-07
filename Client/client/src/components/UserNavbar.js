import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/lgo.png';
import "../assets/css/UserNavbar.css";

const UserNavbar = ({ username, onLogout }) => {
  return (
    <nav className="user-navbar">
      <div className="navbar-left">
        <Link className="navbar-brand" to={`/shop/${username}`}>
          <img
            src={Logo}
            alt="Nomads Logo"
            className="logo-img"
            style={{ width: "250px", height: "100px", borderRadius: '50px' }}
          />
        </Link>
      </div>
      <div className="navbar-right">
        <Link to={`/order/${username}`} className="btn btn-link">My Orders</Link>
        <button className="btn btn-link" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default UserNavbar;
