import React from "react"
import DashboardNavbar from "./DashboardNavbar"

import Footer from "./Footer"
import UsageMonitoring from "./UsageMonitoring"
import StorageMonitoring from "./StorageMonitoring"
import UMFooter from "./UMFooter"



const Monitoring = (props) => {
  const {id} = props;
    return <div>
        <DashboardNavbar/>
        <div>
                <UsageMonitoring
                    onChange={handleUsageMonitoringChange}
                    id = {id}
                />
                <StorageMonitoring onChange={handleStorageMonitoringChange} 
                id = {id}/>
            </div>
        <UMFooter/>
        <Footer/>
    </div>
}

export default Monitoring