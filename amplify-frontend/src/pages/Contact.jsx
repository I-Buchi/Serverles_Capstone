import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  Grow,
  Fade,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocationOn, Phone, Email } from "@mui/icons-material";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Grow in={true} timeout={600}>
          <Box>
            <Typography
              variant="h3"
              align="center"
              fontWeight={700}
              sx={{ mb: 2, color: "#2E3A59" }}
            >
              {t("contact_title")}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: 700, mx: "auto" }}
            >
              {t("contact_subtitle")}
            </Typography>
          </Box>
        </Grow>

        <Grid container spacing={6} alignItems="stretch">
          {/* Left Info Panel */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                height: "100%",
                background: "linear-gradient(135deg, #E3F2F1, #F8FBFB)",
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3, color: "#2E3A59" }}>
                {t("contact_getintouch")}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ color: "#C62828", mr: 1 }} />
                <Typography variant="body1">
                  Fanshawe College – London South Campus, 1060 Wellington Rd, London, ON N6E 3W5, Canada
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ color: "#C62828", mr: 1 }} />
                <Typography variant="body1">+1 (519) 452-4430</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Email sx={{ color: "#C62828", mr: 1 }} />
                <Typography variant="body1">info@clinicavoice.ca</Typography>
              </Box>

              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  height: 240,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                <iframe
                  title="Fanshawe College London South Campus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2935.189188160766!2d-81.23431382400293!3d42.933233999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ee520b7cb62d1%3A0xa960fbac155b6f38!2sFanshawe%20College%20-%20London%20South%20Campus!5e0!3m2!1sen!2sca!4v1730406577363!5m2!1sen!2sca"
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right Contact Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={700}>
              <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={4}
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight={600} sx={{ color: "#2E3A59" }}>
                  {t("contact_formtitle")}
                </Typography>

                <TextField
                  label={t("contact_name")}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label={t("contact_email_label")}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label={t("contact_message")}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={5}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{
                    mt: 1,
                    py: 1.2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  {t("contact_send")}
                </Button>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("contact_success")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
