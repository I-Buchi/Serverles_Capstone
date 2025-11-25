// /* import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { signIn } from "aws-amplify/auth";

// export default function Login() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login skipped (no AWS backend yet)");
//     console.log("Username:", username);
//     navigate("/dashboard");
//     /* setError("");
//     setLoading(true);
//     try {
//       await signIn({ username: email, password });
//       sessionStorage.setItem("clinica_token", "authenticated");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError(t("signin_error"));
//     } finally {
//       setLoading(false);
//     } */
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "90vh",
//         backgroundColor: "#F9FAFB",
//       }}
//     >
//       <Paper
//         sx={{
//           p: 4,
//           width: 400,
//           boxShadow: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
//           {t("signin_title")}
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label={t("signin_email")}
//             variant="outlined"
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             fullWidth
//             label={t("signin_password")}
//             variant="outlined"
//             type="password"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="error"
//             sx={{ mt: 3, py: 1.5, textTransform: "none" }}
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : t("signin_button")}
//           </Button>
//         </form>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           textAlign="center"
//           mt={2}
//         >
//           {t("signin_noaccount")}{" "}
//           <Button
//             onClick={() => navigate("/register")}
//             variant="text"
//             color="primary"
//             sx={{ textTransform: "none" }}
//           >
//             {t("signin_register")}
//           </Button>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }
//  */

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
} from "@mui/material";
import Auth from "./mockAuth"; // your mock Auth module

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");
    setLoading(true);

    try {
      // Await mock signIn
      const user = await Auth.signIn(email, password);
      console.log("Logged in user:", user);

      // Ensure navigation happens after successful login
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed (mock)", err);
      setError(t("signin_error"));
    } finally {
      setLoading(false);
    }
  };

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
          {t("signin_title")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("signin_email")}
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label={t("signin_password")}
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, py: 1.5, textTransform: "none" }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("signin_button")
            )}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          {t("signin_noaccount")}{" "}
          <Button
            onClick={() => navigate("/register")}
            variant="text"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {t("signin_signup")}
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
