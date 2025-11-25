import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`, // offset for permanent drawer
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Content container */}
        <Box sx={{ flexGrow: 1 }}>{children}</Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 2,
            py: 2,
            textAlign: "center",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          © 2025 ClinicaVoice
        </Box>
      </Box>
    </Box>
  );
}
 