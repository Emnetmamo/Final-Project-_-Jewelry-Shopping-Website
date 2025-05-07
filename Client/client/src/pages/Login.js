import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import '../assets/css/Login.css';
import Logo from '../assets/images/lgo.png';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', form);
    setError('');
    try {
      const res = await API.post('/auth/login', form, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      console.log('Login response:', res.data); 
  
      if (res.data.token && res.data.user && res.data.user.username) {
        localStorage.setItem('user', JSON.stringify(res.data)); 
        navigate(`/shop/${res.data.user.username}`); 
        setTimeout(() => {
          window.location.reload();
        }, 1);
      } else {
        setError('Login failed. Missing user data.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Error response:', err.response);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-left" />
      <div className="login-form-container">
        <div className="login-card shadow">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="Nomads Logo"
              className="logo-img"
              style={{ width: "250px", height: "100px", borderRadius: '50px', marginLeft: '40px' }}
            />
          </Link>

          <h2 className="text-center mb-5">Welcome Back</h2>
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

            <button type="submit" className="btn btn-dark w-100 mb-3">
              Login
            </button>
          </form>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="text-center">
            <p className="text-muted">Don't have an account?</p>
            <Link to="/signup" className="btn btn-outline-dark">
              Create an Account to Buy Our Products
            </Link>
          </div>
        </div>
      </div>
      <div className="login-right" />
    </div>
  );
};

export default Login;
