import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const UsageMonitoring = () => {
    const [dailyUsage, setDailyUsage] = useState(0)
    const id = "658d578948f1f5a5fecd6721"

    const fetchUsageDetails = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3002/users/${id}/usage`
            )
            const currentUsage = res.data
            setDailyUsage(currentUsage)
            // if (parseInt(currentUsage, 10) == 6) {
            //     alert("You've reached your daily limit. Come back tomorrow!")
            // }
            console.log(res.data)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchUsageDetails()
    }, [dailyUsage])

    const calculateDailyUsageColor = () => {
        if (dailyUsage <= 20) {
            return "bg-success"
        } else if (dailyUsage <= 23) {
            return "bg-warning"
        } else {
            return "bg-danger"
        }
    }

    return (
        <div className="container mt-5">
            <h2>Daily Usage</h2>
            <div className="progress">
                <div
                    className={`progress-bar ${calculateDailyUsageColor()}`}
                    role="progressbar"
                    style={{ width: `${(dailyUsage / 25) * 100}%` }}
                    aria-valuenow={dailyUsage}
                    aria-valuemin="0"
                    aria-valuemax="25"
                >
                    {dailyUsage} MBs
                </div>
            </div>
        </div>
    )
}

export default UsageMonitoring
