import React from "react";
import { Container, Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: 6 }}>
      <Container maxWidth="lg" sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h2" sx={{ color: "#2E3A59", fontWeight: 800, mb: 1 }}>ClinicaVoice</Typography>
        <Typography variant="h5" sx={{ color: "text.secondary", mb: 3 }}>{t("hero_tagline")}</Typography>
        <Typography sx={{ maxWidth: 800, mx: "auto", color: "text.secondary", mb: 4 }}>{t("hero_description")}</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6 }}>
          <Button component={RouterLink} to="/register" variant="contained" sx={{ bgcolor: "#26A69A", "&:hover": { bgcolor: "#1d8777" } }}>{t("hero_cta1")}</Button>
          <Button component={RouterLink} to="/about" variant="outlined" sx={{ borderColor: "#C62828", color: "#C62828" }}>{t("hero_cta2")}</Button>
        </Box>

        {/* Why ClinicaVoice - 3 columns */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-6px)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2E3A59", fontWeight: 700 }}>{t("why_1_title")}</Typography>
                <Typography variant="body2" color="text.secondary">{t("why_1_text")}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-6px)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2E3A59", fontWeight: 700 }}>{t("why_2_title")}</Typography>
                <Typography variant="body2" color="text.secondary">{t("why_2_text")}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-6px)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2E3A59", fontWeight: 700 }}>{t("why_3_title")}</Typography>
                <Typography variant="body2" color="text.secondary">{t("why_3_text")}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
