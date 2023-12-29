// DashboardHeroSection.js
import React from "react";
import dashboardBackground from './Assets/dashboardBackground.png'
import './HeroSection.css';

const DashboardHeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Your Visual Dashboard</h1>
        <h4>
        Explore, Organize, and Enjoy Your Captured Moments.
        </h4>
      </div>
      <img src={dashboardBackground} alt="Dashboard Hero" className="hero-image" />
    </div>
  );
};

export default DashboardHeroSection;
