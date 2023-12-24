import React from "react";
import ImageGrid from "./components/ImageGrid";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DashboardNavbar from "./components/DashboardNavbar";
import UsageMonitoring from "./components/UsageMonitoring"



const Dashboard = () => {
  const [images, setImages] = useState([]); 
    const updateImages = (newImages) => {
      setImages(newImages);
    };

  return (
    <div>
      <div>
      <DashboardNavbar/>
      </div>
      <div>
        <UsageMonitoring/>
      </div>
        <ImageGrid images={images} updateImages={updateImages} />
      </div>
  );
};

export default Dashboard;
