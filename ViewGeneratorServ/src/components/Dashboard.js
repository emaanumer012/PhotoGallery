import React from "react"
import DashboardNavbar from "./DashboardNavbar"
import UsageMonitoring from "./UsageMonitoring"
import ImageGrid from "./ImageGrid"
import axios from "axios"
import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"

const Dashboard = () => {
    const [images, setImages] = useState([])
    const fetchStorageDetails = async () => {
        try {
            // const resp = await axios.get(`http://localhost:3000/user`)
            // console.log(resp.data.token)
            // let id = resp.data.user.id
            // console.log(id)
            const res = await axios.get(
                `http://localhost:3001/users/${"658bd8481aec4a2cc7271634"}/storage`
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
            </div>
            <ImageGrid images={images} updateImages={updateImages} />
        </div>
    )
}

export default Dashboard
