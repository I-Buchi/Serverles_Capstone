import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Dashboard, Mic, Description, Settings, NoteAdd } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const { t } = useTranslation();

  const menuItems = [
    { to: "/dashboard", label: t("sidebar_overview"), icon: <Dashboard /> },
    { to: "/dashboard/transcribe", label: t("dashboard_transcribe"), icon: <Mic /> },
    { to: "/dashboard/reports", label: t("dashboard_reports"), icon: <Description /> },
    { to: "/dashboard/templates", label: t("dashboard_templates"), icon: <NoteAdd /> },
    { to: "/dashboard/settings", label: t("dashboard_settings"), icon: <Settings /> },
  ];

  const drawerContent = (
    <Box sx={{ color: "#fff", backgroundColor: "#2E3A59", height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 2, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <img
          src="/logo.jpeg"
          alt="ClinicaVoice logo"
          style={{ width: 36, height: 36, borderRadius: 8, marginRight: 10, objectFit: "cover" }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          ClinicaVoice
        </Typography>
      </Box>

      <List>
        {menuItems.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} style={{ textDecoration: "none", color: "inherit" }}>
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  px: 3,
                  py: 1.5,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
                  backgroundColor: isActive ? "#C62828" : "transparent",
                  borderRadius: "12px",
                  mx: 1,
                  mt: 0.5,
                  "&:hover": {
                    backgroundColor: isActive ? "#C62828" : "rgba(255,255,255,0.08)",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#fff" : "rgba(255,255,255,0.7)", minWidth: 36 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 500 }} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)", my: 1 }} />

      <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
          © 2025 ClinicaVoice<br />
          {t("sidebar_secure")}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Temporary Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
