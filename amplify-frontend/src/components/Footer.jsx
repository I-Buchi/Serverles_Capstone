import React from "react";
import { Box, Container, Typography, Grid, Link as MuiLink } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: "#2E3A59", color: "#fff", mt: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* --- Product Section --- */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t("footer_product")}
            </Typography>
            <Typography variant="body2">
              <MuiLink href="/transcription" color="inherit" underline="hover">
                Transcription
              </MuiLink>{" "}
              •{" "}
              <MuiLink href="/templates" color="inherit" underline="hover">
                Templates
              </MuiLink>{" "}
              •{" "}
              <MuiLink href="/integrations" color="inherit" underline="hover">
                Integrations
              </MuiLink>
            </Typography>
          </Grid>

          {/* --- Company Section --- */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t("footer_company")}
            </Typography>
            <Typography variant="body2">
              <MuiLink href="/about" color="inherit" underline="hover">
                About
              </MuiLink>{" "}
              •{" "}
              <MuiLink
                href="https://www.fanshawec.ca/programs"
                color="inherit"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Careers
              </MuiLink>{" "}
              •{" "}
              <MuiLink href="/contact" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Typography>
          </Grid>

          {/* --- Support Section --- */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t("footer_support")}
            </Typography>
            <Typography variant="body2">
              <MuiLink href="/help" color="inherit" underline="hover">
                Help Center
              </MuiLink>{" "}
              •{" "}
              <MuiLink href="/privacy" color="inherit" underline="hover">
                Privacy
              </MuiLink>{" "}
              •{" "}
              <MuiLink href="/terms" color="inherit" underline="hover">
                Terms
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>

        {/* --- Footer Bottom Text --- */}
        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ mt: 3, opacity: 0.85 }}
        >
          {t("footer_disclaimer")}
        </Typography>
      </Container>
    </Box>
  );
}
