import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Divider,
  Button,
  TextField,
} from "@mui/material";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        {t("dashboard_settings")}
      </Typography>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: "#F9FAFB" }}>
        <Typography variant="h6" gutterBottom>
          {t("account_settings", { defaultValue: "Account Settings" })}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label={t("display_name", { defaultValue: "Display Name" })}
          defaultValue="Dr. Jane Doe"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={t("email_address", { defaultValue: "Email Address" })}
          defaultValue="dr.jane@example.com"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          {t("save_changes", { defaultValue: "Save Changes" })}
        </Button>
      </Paper>

      <Paper sx={{ p: 3, backgroundColor: "#F9FAFB" }}>
        <Typography variant="h6" gutterBottom>
          {t("preferences", { defaultValue: "Preferences" })}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Switch defaultChecked color="primary" />}
          label={t("enable_notifications", { defaultValue: "Enable Notifications" })}
        />
        <br />
        <FormControlLabel
          control={<Switch defaultChecked color="primary" />}
          label={t("dark_mode", { defaultValue: "Enable Dark Mode" })}
        />
      </Paper>
    </Box>
  );
}
