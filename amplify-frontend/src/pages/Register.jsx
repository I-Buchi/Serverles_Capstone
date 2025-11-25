import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { signUp, confirmSignUp } from "aws-amplify/auth";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    userType: "patient" 
  });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signUp({
        username: form.email,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
            name: form.name,
            'custom:user_type': form.userType
          },
        },
      });
      
      setSuccess("Registration successful! Please check your email for confirmation code.");
      setNeedsConfirmation(true);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmSignUp({
        username: form.email,
        confirmationCode: confirmationCode,
      });
      
      setSuccess("Email confirmed! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Confirmation failed:", err);
      setError(err.message || "Confirmation failed");
    } finally {
      setLoading(false);
    }
  };

  if (needsConfirmation) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          backgroundColor: "#F9FAFB",
        }}
      >
        <Paper sx={{ p: 4, width: 400, boxShadow: 4, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
            Confirm Email
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <form onSubmit={handleConfirmSignUp}>
            <TextField
              fullWidth
              label="Confirmation Code"
              variant="outlined"
              margin="normal"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, textTransform: "none" }}
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Email"}
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#F9FAFB",
      }}
    >
      <Paper sx={{ p: 4, width: 400, boxShadow: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          {t("signup_title")}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSignUp}>
          <TextField
            fullWidth
            name="name"
            label={t("signup_name")}
            variant="outlined"
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="email"
            label={t("signup_email")}
            variant="outlined"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="password"
            label={t("signup_password")}
            variant="outlined"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              label="User Type"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="clinician">Clinician</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, py: 1.5, textTransform: "none" }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("signup_button")
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}