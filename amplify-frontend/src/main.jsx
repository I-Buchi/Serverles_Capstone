import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import "./aws/amplifyConfig"; // Ensure Amplify is configured
import ThemeModeProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
         <I18nextProvider i18n={i18n}>
          <ThemeModeProvider>
            <App />
          </ThemeModeProvider>
         </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
