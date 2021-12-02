import React from "react";
import Header from "../Header/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const customTheme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "Roboto", "Helvetica", "Arial", "sans-serif"],
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Header></Header>
      </div>
    </ThemeProvider>
  );
}

export default App;
