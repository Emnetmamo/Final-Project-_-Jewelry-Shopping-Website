import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../assets/css/Home/CallToAction.css';

const CallToAction = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const navigate = useNavigate();  

  useEffect(() => {
    const interval = setInterval(() => {
     
      setCurrentImage(prevImage => (prevImage % 5) + 1);
    }, 5000); 

   
    return () => clearInterval(interval);
  }, []);

  const handleExploreNowClick = () => {
    navigate('/login');  
  };

  return (
    <div className="call-to-action">
      <button className="cta-button" onClick={handleExploreNowClick}>
        Explore Now
      </button>

      <div className={`cta-background cta-image-${currentImage}`} style={{ height: "400px", marginTop: "-40px" }}></div>
    </div>
  );
}

export default CallToAction;
