import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import StaticNavbar from './StaticNavbar';
import HeroSection from "./heroSection";
import AboutSection from './AboutSection';
import FeaturesSection from './FeatureSection';
import ContactUs from './ContactUs';
import Footer from './Footer';
import SignUp from "./SignUp";
import Login from "./Login";


import 'bootstrap/dist/css/bootstrap.css';

const StaticPage = () => {

    return (
        <div>
          <StaticNavbar/>
          <HeroSection/>
          <AboutSection/>
          <FeaturesSection/>
          <ContactUs/>
          <Footer />
      </div>
    )
}

export default StaticPage
