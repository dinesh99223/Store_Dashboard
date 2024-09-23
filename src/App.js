import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";
// import Dashboard from "./Components/Dashboard";
import { DashboardProvider } from "./Context/Context";
import DarkModeTransition from "./Components/DarkModeTransition";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Toggle theme handler with animation
  const handleThemeChange = () => {
    if (!animationComplete) return;

    setAnimationComplete(false);
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardProvider>
        {!animationComplete && (
          <DarkModeTransition
            darkMode={darkMode}
            onAnimationEnd={() => setAnimationComplete(true)}
          />
        )}
        <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
        {/* <Dashboard /> */}
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
