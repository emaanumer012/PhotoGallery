import React, { useState } from "react";
import "./TestimonialsSection.css"; // Import the CSS file for styling
import testimonialImage from "./Assets/displayimg.png"; // Import your image file

const testimonialsData = [
  {
    quote: "Your image gallery made sharing memories so easy! Love it.",
    author: "John Doe",
  },
  {
    quote: "Incredible features and a smooth user experience. Highly recommended!",
    author: "Jane Smith",
  },
  // Add more testimonials as needed
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonials-container">
      <div className="testimonial-content">
        <div className="testimonial-text">
          <p className="quote">{testimonialsData[activeIndex].quote}</p>
          <p className="author">{testimonialsData[activeIndex].author}</p>
        </div>
        <div className="navigation">
          <button onClick={handlePrev}>&#9665;</button>
          <button onClick={handleNext}>&#9655;</button>
        </div>
      </div>
      <div className="testimonial-image">
        <img src={testimonialImage} alt="Testimonial" />
      </div>
    </div>
  );
};

export default TestimonialsSection;
