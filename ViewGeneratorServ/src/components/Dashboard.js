import React from "react"
import SideMenu from "./sideMenu"
import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const email = "emaanumer012@gmail.com"
    const [selectedFile, setSelectedFile] = useState(null)
    let id = ""

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
        const formData = new FormData()
        formData.append("image", file)
        formData.append("id", id)
        formData.append("size", file.size)
        const res = await axios.post(
            "http://localhost:3001/add-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        console.log(res.data)
    }

    const fetchStorageDetails = async () => {
        try {
            const resp = await axios.get(`http://localhost:3000/users/${email}`)
            id = resp.data.id
            // setid(resp)
            console.log(id)
            const res = await axios.get(
                `http://localhost:3001/users/${id}/storage`
            )
            console.log(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchStorageDetails()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <SideMenu />
                </div>
                <div className="col-md-9 col-lg-10">
                    <input type="file" onChange={handleFileChange} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
