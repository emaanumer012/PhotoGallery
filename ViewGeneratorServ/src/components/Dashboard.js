import React from "react"
import DashboardNavbar from "./DashboardNavbar"
import UsageMonitoring from "./UsageMonitoring"
import DashboardHeroSection from "./DashboardHeroSection"
import StorageMonitoring from "./StorageMonitoring"
import Footer from "./Footer"
import ImageGrid from "./ImageGrid"
import axios from "axios"
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';

const Dashboard = (props) => {
    const [images, setImages] = useState([])
    const [isUploadButtonDisabled, setUploadButtonDisabled] = useState(false) // Initial state
    const { id } = props
    let currUsedStorage = 98;
    // const [currUsage, setCurrUsage] = useState()
    // let id = "658e859287ffc8192ad17e18"

    // useEffect(() => {
    //     fetchStorageDetails()
    // }, [id]);

    const handleUsageMonitoringChange = (usageExceeded) => {
        // Enable or disable the upload button based on the usage limit
        setUploadButtonDisabled(usageExceeded)
    }

    const handleStorageMonitoringChange = (storageExceeded) => {
        // Enable or disable the upload button based on the storage limit
        setUploadButtonDisabled(storageExceeded)
    }

    // get an array that is  {fileName, originalURL, signedURL}
    const fetchStorageDetails = async () => {
        try {
           // console.log(id)
            const res = await axios.get(
                `http://localhost:3001/users/${id}/get-images`
            )
            setImages(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchStorageDetails();
    }, [id]);

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <div>
            <div>
                <DashboardNavbar id={id}/>
                <DashboardHeroSection />
            </div>
            <div>
                <UsageMonitoring
                    onChange={handleUsageMonitoringChange}
                    id = {id}
                />
                <StorageMonitoring onChange={handleStorageMonitoringChange} 
                id = {id}/>
            </div>
            <ImageGrid
                images={images}
                updateImages={updateImages}
                isUploadButtonDisabled={isUploadButtonDisabled}
                id = {id}
                currUsedStorage={currUsedStorage}
            />
             <Footer />
        </div>
    )
}

export default Dashboard