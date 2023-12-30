import React from "react"
import DashboardNavbar from "./DashboardNavbar"
import UsageMonitoring from "./UsageMonitoring"
import DashboardHeroSection from "./DashboardHeroSection"
import Footer from "./Footer"
import ImageGrid from "./ImageGrid"
import axios from "axios"
import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import StorageMonitoring from "./StorageMonitoring"

const Dashboard = (props) => {
    const [images, setImages] = useState([])
    const [isUploadButtonDisabled, setUploadButtonDisabled] = useState(false) // Initial state
    const [imageEvent, setImageEvent] = useState(false)
    const { id } = props

    const handleDataFromChildren = (value) => {
        setUploadButtonDisabled(value)
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
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchStorageDetails()
    }, [id])

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <div>
            <div>
                <DashboardNavbar id={id} />
                <DashboardHeroSection />
            </div>
            <div>
                <div>
                    <UsageMonitoring
                        onChange={handleDataFromChildren}
                        id={id}
                        imageEvent={imageEvent}
                        setImageEvent={setImageEvent}
                    />
                    <StorageMonitoring
                        onChange={handleDataFromChildren}
                        id={id}
                        imageEvent={imageEvent}
                        setImageEvent={setImageEvent}
                    />
                </div>
                {/* <UMFooter /> */}
            </div>
            {/* <div>
                <Monitoring
                    id={id}
                    onExceededChange={setUploadButtonDisabled} // Pass the state updater function
                />
            </div> */}
            <ImageGrid
                images={images}
                updateImages={updateImages}
                isUploadButtonDisabled={isUploadButtonDisabled}
                id={id}
                setImageEvent={setImageEvent}
                // currUsedStorage={currUsedStorage}
            />
            <Footer />
        </div>
    )
}

export default Dashboard
