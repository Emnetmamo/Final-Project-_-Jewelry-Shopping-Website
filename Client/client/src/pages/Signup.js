import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/Signup.css'; 
import Logo from '../assets/images/lgo.png';  

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);  
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data)); 
      }
      alert('Signup successful! You can now login.');
      navigate('/login');  
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left" />
      <div className="signup-form-container">
        <div className="signup-card shadow">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="Nomads Logo"
              className="logo-img"
              style={{ width: "250px", height: "100px", borderRadius: '50px', marginBottom: '30px', marginLeft: '40px' }}
            />
          </Link>
          
          <h2 className="text-center mb-5">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-user text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="input-group mb-4">
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn signup-btn w-100 mb-3">
              Sign Up
            </button>
          </form>

          <div className="signup-footer">
            <p className="text-muted">Already have an account?</p>
            <Link to="/login" className="btn btn-outline-dark">
              Login Here
            </Link>
          </div>
        </div>
      </div>
      <div className="signup-right" />
    </div>
  );
};

export default Signup;
