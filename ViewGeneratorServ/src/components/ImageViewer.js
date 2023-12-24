// ImageViewer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div
      className="image-viewer-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="image-viewer-container"
        style={{
          background: '#f5faff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          maxWidth: '800px',
          width: '90%', 
          textAlign: 'center',
          transition: '0.3s ease-in-out', 
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="modal-title" style={{ marginBottom: '20px' }}>
            Enlarged View
          </h3>
          <button
            className="btn btn-primary"
            onClick={onClose}
            style={{
              marginBottom: '17px',
              transition: '0.3s ease-in-out', // Added transition effect
            }}
          >
            Close
          </button>
        </div>
        <img
          src={imageUrl}
          alt="Enlarged View"
          className="enlarged-image img-fluid"
          style={{
            objectFit: 'cover',
            maxWidth: '100%',
            maxHeight: '400px',
            borderRadius: '8px', 
            transition: '0.3s ease-in-out', 
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
