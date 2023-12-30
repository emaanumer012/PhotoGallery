import React from "react";
import "./ContactUs.css"; // Import the CSS file for styling
import movingImage from "./Assets/contact.png"; // Import your moving image
import logo1 from "./Assets/logo1.png"; // Import your first logo
import logo2 from "./Assets/logo2.jpg"; // Import your second logo
import logo3 from "./Assets/logo3.png"; // Import your third logo

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
