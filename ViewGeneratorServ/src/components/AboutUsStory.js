// AboutUsStory.js
import React from "react";
import aboutImage from "./Assets/imagegallery.webp";
import "./AboutSection.css";

const AboutUsStory = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <h2>Our Vision</h2>
        <p>
          Welcome to the heart of <b>ImageGallery</b>, where our vision unfolds
          in pixels and stories. Our journey began with a simple yet profound
          idea — to create a digital sanctuary for memories, emotions, and
          creativity.
        </p>
        <p>
          At ImageGallery, we believe in the power of every image to convey
          emotion, tell a story, and connect people across boundaries. Our
          platform is crafted with love and commitment to provide you with a
          space where your visual tales find a home.
        </p>
        <p>
          Our motivation is rooted in the belief that every individual has a
          unique story to tell through their lens. Whether you're an aspiring
          photographer, a seasoned artist, or someone capturing everyday
          moments, ImageGallery is designed to be the canvas of your visual
          journey.
        </p>
        <p>
          Join us in celebrating the beauty of diverse narratives, the joy of
          shared memories, and the endless possibilities that unfold when
          images come together. ImageGallery is not just a platform; it's an
          invitation to be part of a global tapestry of visual stories.
        </p>
      </div>
      <img src={aboutImage} alt="About Us" className="about-image" />
    </div>
  );
};

export default AboutUsStory;
