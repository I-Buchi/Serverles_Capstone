import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function DashboardCard({ title, value, icon }) {
  return (
    <Card elevation={1}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" sx={{ mt: 1, color: "#2E3A59" }}>{value}</Typography>
          </Box>
          {icon && <Box>{icon}</Box>}
        </Box>
      </CardContent>
    </Card>
  );
}
