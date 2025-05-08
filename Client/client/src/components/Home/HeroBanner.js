import React, { useState, useEffect } from 'react';
import '../../assets/css/Home/HeroBanner.css';
import jawn from '../../assets/videos/MyJawn (1).mp4';
const HeroBanner = () => {
    const [showText, setShowText] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowText(true);
      }, 5000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <div className="hero-banner">
        <video autoPlay loop muted className="hero-video">
          <source src={jawn} type="video/mp4" />
        </video>
  
        <div className={`hero-text ${showText ? 'show' : ''}`} style={{marginBottom: "150px"}}>
          <h1 style={{fontSize:"70px"}}>NOMADS JEWELERY</h1>
           <h1 style={{fontSize:"50px"}} >Say and we shall create!</h1>  
        </div>
      </div>
    );
  }
  
  export default HeroBanner;