import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2E3A59" }, // soft navy
    secondary: { main: "#26A69A" }, // sea green
    error: { main: "#C62828" }, // maple red
    background: { default: "#F9FAFB", paper: "#ffffff" },
    text: { primary: "#000000" },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
