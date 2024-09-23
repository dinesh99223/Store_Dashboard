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
        // const response = await fetch("/MockResponse_01.json"); // Fetch from the public folder
        const response = await fetch("http://localhost:8080/api/getDashboardDetails/1"); // Fetch from the public folder
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};
