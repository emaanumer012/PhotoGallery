import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import AboutUsHeroSection from "./AboutUsHeroSection";
import AboutUsStory from "./AboutUsStory";
import OurTeam from "./OurTeam";
import ContactUs from './ContactUs';
import Footer from './Footer';


import 'bootstrap/dist/css/bootstrap.css';

const AboutUs = () => {

    return (
        <div>
          <DashboardNavbar/>
          <AboutUsHeroSection/>
          <AboutUsStory/>
          <OurTeam/>
          <ContactUs/>
          <Footer />
      </div>
    )
}

export default AboutUs
