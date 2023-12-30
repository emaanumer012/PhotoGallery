// HeroSection.js
import React from "react"
import heroImage from "./Assets/background.jpg"
import "./HeroSection.css"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Unleash Your Visual Story</h1>
                <p>
                    Discover, Share, and Experience the Beauty of Moments
                    Captured.
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/login")}
                >
                    Explore Gallery
                </button>
            </div>
            <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
    )
}

export default HeroSection
