import React from "react";
import "./ContactUs.css"; 
import movingImage from "./Assets/contact.png"; 
import logo1 from "./Assets/logo1.png"; 
import logo2 from "./Assets/logo2.jpg"; 
import logo3 from "./Assets/logo3.png"; 
const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="moving-image">
        <img src={movingImage} alt="Moving Image" />
      </div>
      <div className="contact-cards">
        <div className="contact-card">
          <img src={logo1} alt="Logo 1" />
          <p>Contact Us at info@liamevault.com</p>
        </div>
        <div className="contact-card">
          <img src={logo2} alt="Logo 2" />
          <p>Contact Us at L'IAME Vault</p>
        </div>
        <div className="contact-card">
          <img src={logo3} alt="Logo 3" />
          <p>Contact Us at L'IAME Vault</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
