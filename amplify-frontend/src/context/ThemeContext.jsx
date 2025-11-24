// src/context/ThemeContext.jsx
import React, { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#26A69A", // ClinicaVoice teal
          contrastText: "#fff",
        },
        secondary: {
          main: mode === "light" ? "#2E3A59" : "#90A4AE",
        },
        background: {
          default: mode === "light" ? "#F4F6F8" : "#121212",
          paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
        },
        text: {
          primary: mode === "light" ? "#1A1A1A" : "#FFFFFF",
          secondary: mode === "light" ? "#4F4F4F" : "#BDBDBD",
        },
      },
      typography: {
        fontFamily: "Inter, Roboto, Arial, sans-serif",
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor:
                mode === "light" ? "#2E3A59" : "#1E1E1E",
              color: "#fff",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: "none",
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
