import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

// for 100%, needs to be implementded
const StorageMonitoring = ({ onChange }) => {
    const [totalStorage, setTotalStorage] = useState(0)
    const [storageExceeded, setStorageExceeded] = useState(false)
    const [warning, setWarningGiven] = useState(false)

    // this has to be passed through props
    let id = "658e859287ffc8192ad17e18"

    // use user's id, fetch the current space occupied from the database
    const fetchUsedStorageDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/users/${id}/storage`
            )
            // get the value of storage occupied
            const usedStorage = response.data
            if (usedStorage === 10) {
                alert("You have used 100% of your storage!")
                setStorageExceeded(true)
            } else {
                setStorageExceeded(false)
            }
            //convert it to percnetage (to be adjusted in progess bar)
            setTotalStorage((usedStorage * 10).toFixed(1))
            // if we are at 80% and no warning given yet
            if (usedStorage >= 8 && !warning) {
                alert("Warning! You have used 80% of your storage!")
                // setting it to true so that even if user uploads more photos, the warning only comes once
                setWarningGiven(true)
            } else if (usedStorage < 8 && warning) {
                // set it to false once user goes below 80 so that it can appear again once we hit 80%
                setWarningGiven(false)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchUsedStorageDetails()
    }, [totalStorage])

    useEffect(() => {
        onChange(storageExceeded)
    }, [storageExceeded])

    const calculateTotalStorageColor = () => {
        if (totalStorage <= 60) {
            return "bg-success"
        } else if (totalStorage <= 9) {
            return "bg-warning"
        } else {
            return "bg-danger"
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mt-4">Total Used Storage</h2>
            <div className="progress">
                <div
                    className={`progress-bar ${calculateTotalStorageColor()}`}
                    role="progressbar"
                    style={{ width: `${totalStorage}%` }}
                    aria-valuenow={totalStorage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {totalStorage}%
                </div>
            </div>
        </div>
    )
}

export default StorageMonitoring
