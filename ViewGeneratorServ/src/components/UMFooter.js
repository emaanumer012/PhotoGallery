import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Tooltip } from "bootstrap"
import image from "./Assets/mon.png"

const UMFooter = () => {
    const ColorLegend = () => (
        <div className="legend-container mt-4" style={{ marginLeft: "40px" , paddingLeft:"70px", paddingBottom:"20px"}}>
            <br />
            <br />
            <h3>Color Key</h3>

            <div className="legend-item">
                <div
                    className={`legend-color bg-success`}
                    style={{
                        width: "30px",
                        height: "20px",
                        display: "inline-block",
                        marginRight: "8px",
                    }}
                ></div>
                <span>Plenty of Space</span>
            </div>
            <div className="legend-item">
                <div
                    className={`legend-color bg-warning`}
                    style={{
                        width: "30px",
                        height: "20px",
                        display: "inline-block",
                        marginRight: "8px",
                    }}
                ></div>
                <span>Watch out for Your Usage</span>
            </div>
            <div className="legend-item">
                <div
                    className={`legend-color bg-danger`}
                    style={{
                        width: "30px",
                        height: "20px",
                        display: "inline-block",
                        marginRight: "8px",
                    }}
                ></div>
                <span>Very Little Space Left</span>
            </div>
        </div>
    )

    return (
        <div className="mt-4">
            <ColorLegend />
        </div>
    )
}

export default UMFooter
