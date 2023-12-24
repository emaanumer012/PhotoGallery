import React from "react"
import SideMenu from "./sideMenu"
import axios from "axios"
import { useEffect } from "react"

const Dashboard = () => {
    const email = "emaanumer012@gmail.com"

    const fetchStorageDetails = async () => {
        try {
            const id = await (
                await axios.get(`http://localhost:3000/users/${email}`)
            ).data.id
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
                    {/* Main content goes here */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
