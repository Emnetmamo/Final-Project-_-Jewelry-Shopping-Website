import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import CallToAction from '../components/Home/CallToAction';
import Testimonials from '../components/Home/Testimonials';
import NewsletterSignup from '../components/Home/NewsletterSignup';

const Home = () => {
  return (
    <div>
     
      <HeroBanner /> 
      <CallToAction />
      <FeaturedProducts />
      <Testimonials />
      <NewsletterSignup />
    </div>
  );
}

export default Home;
