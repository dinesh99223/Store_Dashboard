import React, { useContext, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DashboardContext } from "../Context/Context";

const AlertSummary = ({ selectedStoreId }) => {
  const { dashboardData } = useContext(DashboardContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  // Ensure hooks are not called conditionally
  const allEvents = useMemo(() => {
    if (!dashboardData) return [];
    return dashboardData.dashboardDetails.flatMap((detail) =>
      detail.dashboardEvents.map((event) => ({
        id: event.id,
        time: new Date(event.createdDate).toLocaleTimeString(),
        severity: event.status,
        issueId: event.id.toString(),
        storeId: event.storeId,
        title: event.title,
        description: event.eventDescription,
        createdBy: event.updatedBy,
      }))
    );
  }, [dashboardData]);

  const filteredEvents = useMemo(() => {
    return selectedStoreId
      ? allEvents.filter((event) => event.storeId === selectedStoreId)
      : allEvents;
  }, [allEvents, selectedStoreId]);

  // Filter events based on severity
  const criticalEvents = filteredEvents
    .filter((event) => event.severity === "Critical")
    .slice(0, 4);
  const moderateEvents = filteredEvents.filter(
    (event) => event.severity === "Moderate"
  );
  const displayEvents = criticalEvents.length ? criticalEvents : moderateEvents;

  const handleClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle loading state below
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 2 }} marginBottom={6}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {displayEvents.map((event) => (
          <Card
            key={event.id}
            sx={{
              minWidth: 200,
              backgroundColor:
                event.severity === "Critical" ? "#F44336" : "#19A0FB",
              color: "#fff",
              cursor: "pointer",
              "&:hover": {
                backgroundColor:
                  event.severity === "Critical" ? "#C62828" : "#0288D1",
                transform: "translateY(-10px)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              },
              flex: "1 1 200px", // Allow the card to grow and shrink
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for hover effect
            }}
            onClick={() => handleClick(event)}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h5">{event.severity}{" - "}{event.storeId}</Typography>
                <span className="material-symbols-outlined Heading">
                  notifications
                </span>
              </div>
              <Typography variant="body1">{event.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent sx={{ backgroundColor: "#333", color: "#fff" }}>
          {selectedEvent && (
            <Box>
              <Typography variant="h6">Title: {selectedEvent.title}</Typography>
              <Typography variant="body1">
                Store ID: {selectedEvent.storeId}
              </Typography>
              <Typography variant="body1">
                Severity: {selectedEvent.severity}
              </Typography>
              <Typography variant="body1">
                Event Description: {selectedEvent.description}
              </Typography>
              <Typography variant="body1">
                Created By: {selectedEvent.createdBy}
              </Typography>
              <Typography variant="body1">
                Time Created: {selectedEvent.time}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AlertSummary;
