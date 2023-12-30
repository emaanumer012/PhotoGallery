import React, { useState, useEffect } from "react"
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

const StorageMonitoring = ({ onChange, id, imageEvent, setImageEvent }) => {
    const [totalStorage, setTotalStorage] = useState(0)
    const [storageExceeded, setStorageExceeded] = useState(false)
    const [warning, setWarningGiven] = useState(false)
    const [showStorageExceededModal, setShowStorageExceededModal] =
        useState(false)
    const [showWarningModal, setShowWarningModal] = useState(false)

    const fetchUsedStorageDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/users/${id}/storage`
            )
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const currSpace = (response.data * 10).toFixed(1)
            console.log(currSpace)
            setTotalStorage(currSpace)

            if (currSpace == 100.0) {
                console.log("full")
                setStorageExceeded(true)
                setShowStorageExceededModal(true)
            } else if (currSpace >= 80.0 && !warning) {
                setShowWarningModal(true)
                setWarningGiven(true)
            } else if (currSpace < 80.0 && warning) {
                setWarningGiven(false)
            } else {
                setStorageExceeded(false)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const updateProgressBar = () => {
        fetchUsedStorageDetails()
    }
    useEffect(() => {
        if (imageEvent) {
            updateProgressBar()
        }
        setImageEvent(false)
    }, [imageEvent])

    useEffect(() => {
        fetchUsedStorageDetails()
    }, [id])

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
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{`${totalStorage}%`}</Tooltip>}
                >
                    <div
                        className={`progress-bar ${calculateTotalStorageColor()}`}
                        role="progressbar"
                        style={{ width: `${totalStorage}%` }}
                        aria-valuenow={totalStorage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </OverlayTrigger>
            </div>

            {/* Storage Exceeded Modal */}
            <Modal
                show={showStorageExceededModal}
                onHide={() => setShowStorageExceededModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Storage Exceeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You have used 100% of your storage!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setShowStorageExceededModal(false)}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Warning Modal */}
            <Modal
                show={showWarningModal}
                onHide={() => setShowWarningModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Storage Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Warning! You have used 80% of your storage!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setShowWarningModal(false)}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StorageMonitoring
