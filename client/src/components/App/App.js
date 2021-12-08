import React from "react";
import Header from "../Header/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const customTheme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  palette: {
    background: {
      default: "#ffffff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
}

export default App;
