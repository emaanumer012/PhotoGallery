import React, { useState, useEffect } from "react"
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const UsageMonitoring = ({ onChange, id, imageEvent, setImageEvent }) => {
    const [dailyUsage, setDailyUsage] = useState(0)
    const [usageExceeded, setUsageExceeded] = useState(false)
    const [showUsageExceededModal, setShowUsageExceededModal] = useState(false)

    const fetchUsageDetails = async () => {
        console.log("usage details called")
        try {
            const res = await axios.get(
                `http://localhost:3002/users/${id}/usage`
            )
            setDailyUsage(res.data)

            if (parseInt(dailyUsage, 10) >= 25) {
                setShowUsageExceededModal(true)
                setUsageExceeded(true)
                console.log("usage exceeded is " + usageExceeded)
            } else if (parseInt(dailyUsage, 10) < 25) {
                setUsageExceeded(false)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const updateProgressBar = () => {
        fetchUsageDetails()
    }
    useEffect(() => {
        if (imageEvent) {
            updateProgressBar()
        }
        setImageEvent(false)
    }, [imageEvent])

    useEffect(() => {
        fetchUsageDetails()
    }, [id])

    useEffect(() => {
        onChange(usageExceeded)
    }, [usageExceeded])

    const calculateDailyUsageColor = () => {
        if (dailyUsage <= 20) {
            return "bg-success"
        } else if (dailyUsage <= 23) {
            return "bg-warning"
        } else {
            return "bg-danger"
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="usage-tooltip" {...props}>
            {`${dailyUsage} MBs`}
        </Tooltip>
    )

    return (
        <div className="container mt-5">
            <h2>Daily Usage</h2>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
                <div className="progress">
                    <div
                        className={`progress-bar ${calculateDailyUsageColor()}`}
                        role="progressbar"
                        style={{ width: `${(dailyUsage / 25) * 100}%` }}
                        aria-valuenow={dailyUsage}
                        aria-valuemin="0"
                        aria-valuemax="25"
                    ></div>
                </div>
            </OverlayTrigger>

            {/* Usage Exceeded Modal */}
            <Modal
                show={showUsageExceededModal}
                onHide={() => setShowUsageExceededModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Usage Exceeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You've reached your daily limit. Come back tomorrow!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setShowUsageExceededModal(false)}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsageMonitoring
