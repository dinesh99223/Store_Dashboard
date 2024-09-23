import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Switch,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
// import Button from '@mui/joy/Button';
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Utils/logo.svg";
import Customization from "./Customization"; // Import the Customization component
import Dashboard from "./Dashboard"; // Import the Dashboard component

function Navbar({ darkMode, handleThemeChange }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCustomizeClick = (isCustomization) => () => {
    setShowCustomization(isCustomization);
    setDrawerOpen(false);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          
        <ListItem button onClick={handleCustomizeClick(false)}>

          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleCustomizeClick(true)}>
          <ListItemText primary="Customize" />
        </ListItem>
        {/* Other Menu Items */}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>

            <Box component="img" src={Logo} alt="Logo" />
            <Box sx={{ flexGrow: 1 }} />
            <Switch checked={darkMode} onChange={handleThemeChange} />
            <Typography variant="body2" sx={{ color: "inherit", marginLeft: "10px" }}>
              {darkMode ? "Dark" : "Light"} Mode
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Render Customization component or Dashboard based on the state */}
      {showCustomization ? <Customization /> : <Dashboard />}
    </>
  );
}

export default Navbar;
