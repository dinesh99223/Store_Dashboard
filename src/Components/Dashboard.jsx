import React, { useContext, useState, useMemo } from "react";
import { Box } from "@mui/material";
import AlertSummary from "../Components/AlertSummery";
import SearchFilter from "../Components/SearchFilter";
import AlertsTable from "../Components/AlertTable";
import { DashboardContext } from "../Context/Context";

const Dashboard = () => {
  const { dashboardData } = useContext(DashboardContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedStoreId, setSelectedStoreId] = useState("");

  // Prepare alert summary
  const alertSummary = useMemo(() => {
    if (!dashboardData) return []; // Guard clause for empty data
    return dashboardData.dashboardDetails.flatMap((detail) =>
      detail.dashboardEvents.reduce((summary, event) => {
        const existing = summary.find((s) => s.title === event.status);
        if (existing) {
          existing.count += 1;
        } else {
          summary.push({
            title: event.status,
            count: 1,
            color: event.status === "Critical" ? "#F44336" : "#19A0FB",
          });
        }
        return summary;
      }, [])
    );
  }, [dashboardData]);

  // Prepare store options
  const storeOptions = useMemo(() => {
    if (!dashboardData) return []; // Guard clause for empty data
    const stores = new Set();
    dashboardData.dashboardDetails.forEach(detail =>
      detail.dashboardEvents.forEach(event => stores.add(event.storeId))
    );
    return Array.from(stores);
  }, [dashboardData]);

  // Prepare alert data with store filtering
  const alertData = useMemo(() => {
    if (!dashboardData) return []; // Guard clause for empty data
    const filteredData = dashboardData.dashboardDetails.flatMap((detail) =>
      detail.dashboardEvents.map((event) => ({
        id: event.id,
        time: new Date(event.createdDate).toLocaleTimeString(),
        severity: event.status,
        issueId: event.id.toString(),
        storeId: event.storeId,
        title: event.title,
        description: event.eventDescription,
        state: "Action",
        assigned: event.updatedBy,
      }))
    );
    return selectedStoreId
      ? filteredData.filter((event) => event.storeId === selectedStoreId)
      : filteredData;
  }, [dashboardData, selectedStoreId]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: "asc" });
    setSelectedStoreId("");
  };

  const handleStoreSelect = (storeId) => {
    setSelectedStoreId(storeId);
  };

  if (!dashboardData) {
    return <div>Loading...</div>; // Moved the loading return after hooks
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <AlertSummary alertSummary={alertSummary} selectedStoreId={selectedStoreId} />
      <SearchFilter onSearch={handleSearch} onReset={handleReset} />
      <AlertsTable
        alertData={alertData}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        onStoreSelect={handleStoreSelect}
        storeOptions={storeOptions}
        selectedStoreId={selectedStoreId}
      />
    </Box>
  );
};

export default Dashboard;
