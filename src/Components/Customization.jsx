import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

function Customization() {
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchCustomizationOptions = async () => {
    try {
      const response = await fetch("/MockResponse_01.json");
      const data = await response.json();
      const uniqueTypes = [
        ...new Set(
          data.dashboardDetails.flatMap((detail) =>
            detail.dashboardEvents.map((event) => event.type)
          )
        ),
      ];
      setCustomizationOptions(uniqueTypes);
    } catch (error) {
      console.error("Error fetching customization options:", error);
    }
  };

  useEffect(() => {
    fetchCustomizationOptions();
  }, []);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <div style={{display: "flex", justifyContent: "center",margin: "20px"}}>
      <FormControl style={{ width: "20vw" }}>
        <InputLabel>Customize Dashboard</InputLabel>
        <Select
          multiple
          value={selectedOptions}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {customizationOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Customization;
