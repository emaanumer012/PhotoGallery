import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const StorageMonitoring = () => {
    const [totalStorage, setTotalStorage] = useState(0)
    const id = "658d578948f1f5a5fecd6721"
    const fetchUsedStorageDetails = async () => {
        try {
            const res2 = await axios.get(
                `http://localhost:3001/users/${id}/storage`
            )
            console.log(res2.data)
            setTotalStorage(res2.data * 10)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchUsedStorageDetails()
    }, [totalStorage])

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
