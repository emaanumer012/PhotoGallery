// ImageGrid.js
import React, { useState, useRef, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import ImageViewer from "./ImageViewer"
import "typeface-montserrat"
import axios from "axios"
import "./ImageGrid.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"

const ImageGrid = ({
    images,
    updateImages,
    isUploadButtonDisabled,
    id,
    setImageEvent,
    setUploadButtonDisabled,
    disableDelete,
    // currUsedStorage
}) => {
    const [newImage, setNewImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null) // Keeps track of the index of the selected image in the gallery
    const [showImageViewer, setShowImageViewer] = useState(false) //Controls the visibility of the image viewer modal
    const fileInputRef = useRef(null) // A reference to the file input element used for uploading images
    // const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(false)
    //let id = "658e859287ffc8192ad17e18"

    useEffect(() => {
        // Handle the upload to the server or storage after newImage is updated
        if (newImage) {
            updateImages([...images, newImage])
            setNewImage(null)
        }
    }, [newImage, images, updateImages, id])

    // Triggered on image file selection: reads file as data URL and sets newImage state with URL and default title
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                // Set newImage state with selected image data
                setNewImage({
                    signedUrl: reader.result,
                    fileName: file.name,
                })
            }
            reader.readAsDataURL(file)
        }
    }

    // Function to trigger file input dialog when the Upload Image button is clicked
    const handleUpload = () => {
        // Clear the file input value before triggering the click
        fileInputRef.current.value = null
        fileInputRef.current.click()
    }

    // Function to handle file input change, typically for image upload to server or storage
    const handleFileInputChange = async (event) => {
        // Check if a file was selected
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            const spaceOccupied = (
                await axios.get(`http://liamevault.com/users/${id}/storage`)
            ).data
            const fileSizeMB = file.size / (1024 * 1024)
            if (fileSizeMB + spaceOccupied > 10) {
                alert("Error! Not enough storage available")
            } else {
                setUploadButtonDisabled(false)
                // Handle the selected file by calling handleImageChange
                handleImageChange(event)
                const formData = new FormData()
                formData.append("image", file)
                formData.append("id", id)
                formData.append("size", file.size)
                await axios.post("http://liamevault.com/add-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                setImageEvent(true)
                toast.success("Image added sucessfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            console.log("isUploadttonDisabled" + isUploadButtonDisabled)
            // For simplicity, we'll just add the new image to the existing images array.
            if (newImage) {
                // Update the images state with the new image data
                updateImages([...images, newImage])
                // Reset the newImage state after handling the upload.
                setNewImage(null)
                window.location.reload()
            }
        }
    }

    const handleDelete = async (event) => {
        if (selectedImage !== null && selectedImage < images.length) {
            const updatedImages = images.filter((_, index) => index !== selectedImage);
            setSelectedImage(null);
            updateImages(updatedImages);
    
            let imageToDelete = images[selectedImage];
            imageToDelete["id"] = id;
    
            const res = await axios.post(
                "http://liamevault.com/delete-image",
                imageToDelete,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            setImageEvent(true);
    
            toast.success("Image deleted successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    
    const handleView = (index) => {
        setSelectedImage(index)
        setShowImageViewer(true)
    }

    const handleImageClick = (index) => {
        // Update the selectedImage state when an image is clicked
        setSelectedImage(index === selectedImage ? null : index)
    }

    const handleCloseImageViewer = () => {
        setSelectedImage(null)
        setShowImageViewer(false)
    }

    const handleDownload = (index) => {
        const image = images[index];
        const link = document.createElement("a");
        link.href = image.signedUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = `Image_${index + 1}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-md-6">
                    <h3
                        className="mt-6 mb-4"
                        style={{ paddingTop: "40px", fontWeight: "bold" }}
                    >
                        Gallery Highlights
                    </h3>
                </div>
                <div
                    className="col-md-6 text-right"
                    style={{ paddingLeft: "400px", marginTop: "35px" }}
                >
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                        <button
                            className="btn btn-lg custom-button"
                            onClick={handleUpload}
                            disabled={isUploadButtonDisabled}
                        >
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>
            <br/>
            <br/>

            <div className="row" style={{ marginTop: "30px" }}>
                {images.map((image, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div
                            className="card"
                            style={{ width: "22rem", marginbottom: "15px" }}
                        >
                            <img
                                src={image.signedUrl}
                                className="card-img-top"
                                alt={`Image ${index}`}
                                style={{ height: "220px", objectFit: "cover" }}
                                onClick={() => handleImageClick(index)}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    {image.fileName}
                                </h5>
                                {selectedImage === index && (
                                    <div className="d-flex justify-content-between mt-4">
                                        <button
                                            className="btn custom-button mr-6"
                                            onClick={handleDelete}
                                            disabled={disableDelete}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn custom-button mr-2"
                                            onClick={() => handleView(index)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn custom-button"
                                            onClick={() =>
                                                handleDownload(index)
                                            }
                                        >
                                            Download
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {newImage && (
                    <div className="col-md-4 mb-3">
                        <div
                            className="card"
                            style={{ width: "22rem", marginbottom: "15px" }}
                        >
                            <img
                                src={newImage.signedUrl}
                                className="card-img-top"
                                alt={newImage.fileName}
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    {newImage.fileName}
                                </h5>
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className={`modal ${showImageViewer ? "show" : ""}`}
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: showImageViewer ? "block" : "none" }}
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {selectedImage !== null && (
                                    <ImageViewer
                                        imageUrl={
                                            images[selectedImage].signedUrl
                                        }
                                        ImagefileName={
                                            images[selectedImage].fileName
                                        }
                                        onClose={handleCloseImageViewer}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageGrid
