import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Card,
  CardContent,
  Modal,
  Paper,
} from "@mui/material";

// Mock API
const getStats = async () => ({
  activePatients: 124,
  recentTranscriptions: 87,
  pendingReviews: 12,
});
const getActivityChart = async () => [
  { date: "2025-10-01", transcriptions: 5 },
  { date: "2025-10-02", transcriptions: 8 },
  { date: "2025-10-03", transcriptions: 4 },
  { date: "2025-10-04", transcriptions: 10 },
  { date: "2025-10-05", transcriptions: 7 },
];

export default function DashboardOverview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [activityChart, setActivityChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsData = await getStats();
        const activityData = await getActivityChart();
        setStats(statsData);
        setActivityChart(activityData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleNewTranscription = () => {
    navigate("/dashboard/transcribe");
  };

  const handleUploadAudio = () => {
    setUploadOpen(true);
  };

  const handleExportReport = () => {
    // Mock export
    const csvContent = "data:text/csv;charset=utf-8,Patient,Date,Status\nDr. Jane Doe,2025-10-01,Transcribed";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transcriptions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditTemplates = () => {
    navigate("/dashboard/templates");
  };

  return (
    <Box className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-8 gap-6">
      <Sidebar />

      <Box className="flex-1">
        <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
          {t("dashboard_overview")}
        </Typography>

        {loading ? (
          <Typography textAlign="center" sx={{ py: 20, color: "#999" }}>
            {t("loading")}...
          </Typography>
        ) : (
          <>
            {/* Top Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid item xs={12} md={4}>
                <DashboardCard title={t("dashboard_patients")} value={stats.activePatients} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DashboardCard title={t("dashboard_transcriptions")} value={stats.recentTranscriptions} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DashboardCard title={t("dashboard_reviews")} value={stats.pendingReviews} />
              </Grid>
            </Grid>

            {/* Activity Chart */}
            <Card sx={{ p: 3, mb: 6 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                {t("dashboard_activity")}
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="transcriptions" stroke="#C62828" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Notes */}
            <Card sx={{ p: 3, mb: 6 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                {t("dashboard_recentNotes")}
              </Typography>
              <Box>
                <ul style={{ paddingLeft: 20, color: "#555" }}>
                  <li>
                    Dr. Jane Doe — <Chip label={t("transcribed")} color="success" size="small" /> (2025-10-01)
                  </li>
                  <li>
                    Dr. Samuel K — <Chip label={t("pendingReview")} color="warning" size="small" /> (2025-10-02)
                  </li>
                  <li>
                    Dr. Peter Lin — <Chip label={t("reviewed")} color="info" size="small" /> (2025-10-03)
                  </li>
                </ul>
              </Box>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                {t("dashboard_quickActions")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleNewTranscription}>
                  {t("action_newTranscription")}
                </Button>
                <Button variant="outlined" onClick={handleUploadAudio}>
                  {t("action_uploadAudio")}
                </Button>
                <Button variant="outlined" onClick={handleExportReport}>
                  {t("action_exportReport")}
                </Button>
                <Button variant="outlined" onClick={handleEditTemplates}>
                  {t("action_editTemplates")}
                </Button>
              </Box>
            </Card>

            {/* Upload Modal */}
            <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
              <Paper
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  p: 4,
                  width: 400,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {t("action_uploadAudio")}
                </Typography>
                <input type="file" accept="audio/*" />
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button variant="outlined" onClick={() => setUploadOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="contained">{t("upload")}</Button>
                </Box>
              </Paper>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
}
