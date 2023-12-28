import React from "react"
import DashboardNavbar from "./DashboardNavbar"
import UsageMonitoring from "./UsageMonitoring"
import ImageGrid from "./ImageGrid"
import axios from "axios"
import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import StorageMonitoring from "./StorageMonitoring"

const Dashboard = () => {
    const [images, setImages] = useState([])
    const [isUploadButtonDisabled, setUploadButtonDisabled] = useState(false) // Initial state
    let id = "658d578948f1f5a5fecd6721"

    const handleUsageMonitoringChange = (usageExceeded) => {
        // Enable or disable the upload button based on the usage limit
        setUploadButtonDisabled(usageExceeded)
    }

    const handleStorageMonitoringChange = (storageExceeded) => {
        // Enable or disable the upload button based on the storage limit
        setUploadButtonDisabled(storageExceeded)
    }

    const fetchStorageDetails = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/users/${id}/get-images`
            )
            setImages(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchStorageDetails()
    }, [])

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <div>
            <div>
                <DashboardNavbar />
            </div>
            <div>
                <UsageMonitoring />
                <StorageMonitoring />
            </div>
            <ImageGrid images={images} updateImages={updateImages} />
        </div>
    )
}

export default Dashboard
