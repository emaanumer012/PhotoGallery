import React from "react";
import "./Footer.css"; // Import the CSS file for styling
import logo from "./Assets/logo.png"; // Import your logo image

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
        <span>Image Gallery</span>
      </div>
      <div className="footer-text">
        <p>&copy; 2023 Your Image Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
