import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const drawerWidth = 240; // same as your Sidebar

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top header */}
      <Header />

      {/* Main section */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth}px`, // space for sidebar
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page content grows to fill space */}
          <Box sx={{ flexGrow: 1 }}>{children}</Box>

          {/* Footer sticks at bottom */}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
