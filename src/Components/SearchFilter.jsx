import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchFilter = ({ onSearch, onReset }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleResetClick = () => {
    setInputValue("");
    onReset();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for any attribute or value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Box>
      <IconButton color="primary" onClick={handleResetClick}>
        <FilterListIcon />
      </IconButton>
    </Box>
  );
};

export default SearchFilter;
