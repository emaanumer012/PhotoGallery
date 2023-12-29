// AboutUsHeroSection.js
import React from "react";
import dashboardBackground from './Assets/dashboardBackground.png'
import './HeroSection.css';

const AboutUsHeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Story</h1>
        <h4>
          Discover the Journey Behind ImageGallery and Our Passion for Visual Storytelling.
        </h4>
      </div>
      <img src={dashboardBackground} alt="About Us Hero" className="hero-image" />
    </div>
  );
};

export default AboutUsHeroSection;
