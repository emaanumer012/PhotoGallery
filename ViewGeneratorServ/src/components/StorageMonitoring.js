import React, { useState, useEffect } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const StorageMonitoring = ({ onChange }) => {
  const [totalStorage, setTotalStorage] = useState(0);
  const [storageExceeded, setStorageExceeded] = useState(false);
  const [warning, setWarningGiven] = useState(false);
  const [showStorageExceededModal, setShowStorageExceededModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  let id = "658e859287ffc8192ad17e18";

  const fetchUsedStorageDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${id}/storage`
      );
      const usedStorage = response.data;

      if (usedStorage === 10) {
        setStorageExceeded(true);
        setShowStorageExceededModal(true);
      } else {
        setStorageExceeded(false);
      }

      setTotalStorage((usedStorage * 10).toFixed(1));

      if (usedStorage >= 8 && !warning) {
        setShowWarningModal(true);
        setWarningGiven(true);
      } else if (usedStorage < 8 && warning) {
        setWarningGiven(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUsedStorageDetails();
  }, [totalStorage]);

  useEffect(() => {
    onChange(storageExceeded);
  }, [storageExceeded]);

  

  const calculateTotalStorageColor = () => {
    if (totalStorage <= 60) {
      return "bg-success";
    } else if (totalStorage <= 9) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  };

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
      <Modal show={showStorageExceededModal} onHide={() => setShowStorageExceededModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Storage Exceeded</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have used 100% of your storage!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowStorageExceededModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Warning Modal */}
      <Modal show={showWarningModal} onHide={() => setShowWarningModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Storage Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Warning! You have used 80% of your storage!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowWarningModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StorageMonitoring;
