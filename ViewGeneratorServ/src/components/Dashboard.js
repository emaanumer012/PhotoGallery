import React from "react"
import SideMenu from "./sideMenu"

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <SideMenu />
                </div>
                <div className="col-md-9 col-lg-10">
                    {/* Main content goes here */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
