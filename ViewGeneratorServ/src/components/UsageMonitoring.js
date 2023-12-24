import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UsageMonitoring = () => {
  const [dailyUsage, setDailyUsage] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);

  const calculateDailyUsageColor = () => {
    if (dailyUsage <= 20) {
      return "bg-success";
    } else if (dailyUsage <= 23) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  };

  const calculateTotalStorageColor = () => {
    if (totalStorage <= 60) {
      return "bg-success";
    } else if (totalStorage <= 90) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  };

  return (
    <div className="container mt-5">
      <h2>Daily Usage</h2>
      <div className="progress">
        <div
          className={`progress-bar ${calculateDailyUsageColor()}`}
          role="progressbar"
          style={{ width: `${(dailyUsage / 25) * 100}%` }}
          aria-valuenow={dailyUsage}
          aria-valuemin="0"
          aria-valuemax="25"
        >
          {dailyUsage} MBs
        </div>
      </div>

      <h2 className="mt-4">Total Storage</h2>
      <div className="progress">
        <div
          className={`progress-bar ${calculateTotalStorageColor()}`}
          role="progressbar"
          style={{ width: `${totalStorage}%` }}
          aria-valuenow={totalStorage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {totalStorage}%
        </div>
      </div>
    </div>
  );
};

export default UsageMonitoring;
