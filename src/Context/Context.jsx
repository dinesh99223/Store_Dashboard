import React, { createContext, useState, useEffect } from "react";

// Create a Context
export const DashboardContext = createContext();

// Create a Provider component
export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch or initialize your dashboard data here
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Data.......");
        const response = await fetch(
          "http://localhost:8080/api/getDashboardDetails/1"
        );
        const data = await response.json();
        console.log("Data Fetched: ", data);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data every 10 seconds
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval on unmount
    return () => {
      console.log("Cleaning up interval......");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};
