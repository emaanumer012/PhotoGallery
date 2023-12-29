import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomAlertModal = ({ show, variant, message, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`alert alert-${variant}`} role="alert">
          {message}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomAlertModal;


// how to use
// <div className="container mt-5">
// {/* Use CustomAlertModal component for Storage Exceeded Alert */}
// <CustomAlertModal
//   show={showStorageExceededAlert}
//   variant="danger"
//   message="You have used 100% of your storage!"
//   onClose={() => setShowStorageExceededAlert(false)}
// />