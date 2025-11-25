import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// Mock reports
const mockReports = [
  { id: "r1", patient: "John Doe", date: "2025-10-31", summary: "General checkup notes" },
  { id: "r2", patient: "Jane Smith", date: "2025-10-30", summary: "Cardiology notes" },
  { id: "r3", patient: "Alice Johnson", date: "2025-10-29", summary: "Neurology notes" },
  { id: "r4", patient: "Bob Martin", date: "2025-10-28", summary: "Pediatrics notes" },
];

export default function Reports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filter reports by patient name or summary
  const filteredReports = mockReports.filter(
    (r) =>
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenTranscription = (reportId) => {
    navigate(`/dashboard/transcribe/${reportId}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports
      </Typography>

      {/* Search bar */}
      <TextField
        fullWidth
        placeholder="Search by patient or summary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Reports grid */}
      <Grid container spacing={3}>
        {filteredReports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card
              sx={{
                transition: "transform .2s, box-shadow .2s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {report.patient}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {report.date}
                </Typography>
                <Typography variant="body2">{report.summary}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenTranscription(report.id)}
                >
                  Open Transcription
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filteredReports.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" color="text.secondary">
              No reports found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
