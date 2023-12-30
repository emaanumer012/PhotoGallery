import React, { useState } from "react"
import UsageMonitoring from "./UsageMonitoring"
import StorageMonitoring from "./StorageMonitoring"
import UMFooter from "./UMFooter"

const Monitoring = (props) => {
    const [exceeded, setExceeded] = useState(false)
    const { id, onExceededChange } = props

    const handleDataFromChildren = (value) => {
        setExceeded(value)
        onExceededChange(value)
    }
    return (
        <div>
            <div>
                <UsageMonitoring onChange={handleDataFromChildren} id={id} />
                <StorageMonitoring onChange={handleDataFromChildren} id={id} />
            </div>
            {/* <UMFooter /> */}
        </div>
    )
}

export default Monitoring
