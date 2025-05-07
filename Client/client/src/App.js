import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserNavbar from './components/UserNavbar';  
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import Order from "./pages/Orders"
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/order/:username';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {!hideNavbarFooter && (user ? (
        <UserNavbar username={user.username} onLogout={handleLogout} />
      ) : (
        <Navbar />
      ))}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop/:username" element={<Shop />} />
        <Route path="/order/:username" element={<Order/>} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
