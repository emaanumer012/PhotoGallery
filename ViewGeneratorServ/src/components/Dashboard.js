import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import UsageMonitoring from "./UsageMonitoring";
import ImageGrid from "./ImageGrid";
import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import DashboardHeroSection from "./DashboardHeroSection";

const Dashboard = () => {
    const email = "emaanumer012@gmail.com";

    const fetchStorageDetails = async () => {
        try {
            const id = await (
                await axios.get(`http://localhost:3000/users/${email}`)
            ).data.id;
            console.log(id);
            const res = await axios.get(
                `http://localhost:3001/users/${id}/storage`
            );
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchStorageDetails();
    }, []);

    const [images, setImages] = useState([]);
    const updateImages = (newImages) => {
        setImages(newImages);
    };

    return (
        <div>
            <div>
                <DashboardNavbar />
                <DashboardHeroSection />
            </div>
            <div style={dashboardContainerStyle}>
                <ImageGrid images={images} updateImages={updateImages} />
                <br/>
                <br/>
                <br/>
                <Footer />
            </div>
        </div>
    );
};

const dashboardContainerStyle = {
    background: "#f4f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default Dashboard;
