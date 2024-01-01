import React from "react";
import "./Footer.css"; 
import logo from "./Assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
        <span>L'IAME Vault</span>
      </div>
      <div className="footer-text">
        <p>&copy; 2023 L'IAME Vault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
