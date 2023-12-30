// AboutSection.js
import React from "react";
import aboutImage from "./Assets/imagegallery.webp";
import  "./AboutSection.css"

const AboutSection = () => {
    return (
      <div className="about-section">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Welcome to <b>L'IAME Vault</b>, a cloud-centric photo gallery where
            every snapshot has a story to tell. We are on a mission to redefine
            the photo-sharing experience by leveraging microservices on the cloud.
          </p>
          <p>
            At <strong>L'IAME</strong>, we've embraced modern software design principles to
            create a seamless, multiuser, multi-tenant photo gallery application.
            Our microservices architecture ensures scalability, independence, and
            an enhanced user experience.
          </p>
          <p>
            Join us in capturing, storing, and sharing your memories with ease. Our
            commitment to user account management, efficient storage utilization,
            and real-time usage monitoring sets us apart. Let your visual journey
            unfold at <strong>L'IAME</strong>.
          </p>
        </div>
        <img src={aboutImage} alt="About Us" className="about-image" />
      </div>
    );
  };
  
  export default AboutSection;