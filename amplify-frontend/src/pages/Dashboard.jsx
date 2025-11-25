// Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Overview from "../pages/dashboard/Overview";
import Transcribe from "../pages/dashboard/Transcribe";
import Reports from "../pages/dashboard/Reports";
import Settings from "../pages/dashboard/Settings";
import TemplateBuilder from "../pages/dashboard/TemplateBuilder";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="transcribe/:id?" element={<Transcribe />} />
        <Route path="reports" element={<Reports />} />
        <Route path="templates" element={<TemplateBuilder />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
