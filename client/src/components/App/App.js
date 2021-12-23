import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../pages/Home/Home";
import Post from "../../pages/Post/Post";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let customTheme = createTheme({
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

customTheme = responsiveFontSizes(customTheme);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
